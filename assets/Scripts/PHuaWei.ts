const { ccclass, property } = cc._decorator;

@ccclass
export default class PHuaWei{
    private env: any;
    private info: any;
    private bh: number = 170;
    private bw: number = 0;
    private btop: number = 0;
    private bannerAd: any = null;
    private moreGameBanner: any = null;
    private yuanshengIndex: number = 0;
    private yuanshengADK: any = null;
    private rewardedVideoAd: any = null;
    private gameRecordShareBtn: any = null;
    
    public onRewardedVideoError: Function = null;
    public onRewardedVideoClose: Function = null;
    public onRewardedVideoLoad: Function = null;

    public init(): void {
        this.env = window['qg'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
    }

    public initAD(): void {
        window['lplatform'].plog("PHuaWei constructor initAD");
        this.env.setUnderAgeOfPromise(false);
        this.env.setNonPersonalizedAd(false);
        this.createRewardedVideo(false);
    }

    public loadBanner(): void {
        this.hideBanner(false);
        
        if (!this.bannerAd) {
            this.btop = 0;
            if (window['lplatform'].cparam.bannerOnBottom) {
                this.btop = this.info.windowHeight - this.bh;
            }
            
            window['lplatform'].plog(`loadBanner this.bh:${this.bh} this.btop:${this.btop} this.bw:${this.bw}`);
            
            this.bannerAd = this.env.createBannerAd({
                adUnitId: window['lplatform'].cparam.bannerID,
                adIntervals: 60,
                style: {
                    width: this.bw,
                    height: this.bh,
                    left: 0,
                    top: 720
                }
            });
            
            this.bannerAd.onError((e: any) => {
                console.log("bannerAd 广告加载出错", e);
            });
            
            this.bannerAd.onLoad(() => {
                console.log("bannerAd 广告加载成功");
            });
            
            this.bannerAd.onClose(() => {
                console.log("bannerAd 广告关闭");
            });
        }
        
        this.bannerAd.show();
    }

    public showBanner(): void {
        this.hideBanner();
        if (window['lplatform'].labData.mainSwitch) {
            this.loadBanner();
        }
    }

    public hideBanner(e: boolean = false): void {
        if (this.bannerAd) {
            this.bannerAd.hide();
            if (e) {
                this.bannerAd.offLoad(this.onBannerLoad);
                this.bannerAd.offError(this.onBannerError);
                this.bannerAd.offResize(this.onBannerResize);
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
        
        if (this.moreGameBanner) {
            this.moreGameBanner.hide();
        }
    }

    private onBannerLoad(): void {}
    private onBannerError(): void {}
    private onBannerResize(): void {}

    public loadInterstitial(): void {
        this.createMoreGamePortal(false, true);
        window['lplatform'].plog(`createNativeAd lplatform.cparam.nativeID:${window['lplatform'].cparam.nativeID}`);
        
        const nativeIDs: string[] = window['lplatform'].cparam.nativeID;
        this.yuanshengIndex += 1;
        if (this.yuanshengIndex >= nativeIDs.length) {
            this.yuanshengIndex = 0;
        }
        
        const nativeAd = this.env.createNativeAd({
            adUnitId: nativeIDs[this.yuanshengIndex],
            success: (e: any) => {
                console.log(`loadNativeAd loadNativeAd : success ${e}`);
            },
            fail: (e: any, t: any) => {
                console.log(`loadNativeAd loadNativeAd fail: ${e},${t}`);
            },
            complete: () => {
                nativeAd.load();
            }
        });
        
        nativeAd.onLoad((t: any) => {
            window['lplatform'].plog(`nativeAd.onLoad:${JSON.stringify(t)}`);
            nativeAd.reportAdShow({
                adId: t.adList[0].adId
            });
            
            if (this.yuanshengADK) {
                //window['lplatform'].plog(`this.yuanshengADK.destroy:${this.yuanshengADK.destroy}`);
                this.yuanshengADK.destroy();
            }
            
            this.yuanshengADK = window['lplatform'].uiEngine.createChaping(t.adList[0], 
                () => {
                    this.yuanshengADK = null;
                }, 
                () => {
                    nativeAd.reportAdClick({
                        adId: t.adList[0].adId
                    });
                    this.yuanshengADK = null;
                }
            );
            
            this.env.onShow((n: any) => {
               // console.log(`lyn qg.onShow:${JSON.stringify(n)} nativeAd:${nativeAd} ts.yuanshengADK:${this.yuanshengADK}`);
                if (nativeAd && this.yuanshengADK) {
                    console.log(`qg.onShow reportAdShow:${t.adList[0].adId}`);
                    nativeAd.reportAdShow({
                        adId: t.adList[0].adId
                    });
                }
            });
            
            this.env.onHide(() => {});
        });
        
        nativeAd.onError((t: any) => {
            console.log(`nativeAd.onError:${JSON.stringify(t)}`);
            this.showBanner();
        });
    }

    public createRewardedVideo(e: boolean): void {
        if (!window['lplatform'].cparam.rewardedVideoID) return;
        
        if (!this.rewardedVideoAd && typeof this.env.createRewardedVideoAd === 'function') {
            this.rewardedVideoAd = this.env.createRewardedVideoAd({
                adUnitId: window['lplatform'].cparam.rewardedVideoID,
                success: () => {},
                fail: (e: any, t: any) => {
                    console.log(`loadAndShowVideoAd createRewardedVideoAd fail: ${e},${t}`);
                    if (this.onRewardedVideoError) {
                        this.onRewardedVideoError({
                            msg: "createRewardedVideoAd fail"
                        }, "createRewardedVideoAd fail");
                    }
                },
                complete: () => {
                    this.rewardedVideoAd.load();
                    if (e) {
                        this.showRewardedVideo(window['vcb']);
                    }
                }
            });
            
            this.rewardedVideoAd.onError(this.onRewardedVideoError.bind(this));
            this.rewardedVideoAd.onClose(this.onRewardedVideoClose.bind(this));
            this.rewardedVideoAd.onLoad(this.onRewardedVideoLoad.bind(this));
        }
    }

    public canRecord(): boolean {
        if (this.gameRecorderManager && window['lplatform'].cparam.canRecord) {
            return true;
        }
        window['lplatform'].plog("huaWei,不支持录制游戏画面");
        return false;
    }

    public shareAppMessage(): void {
        this.env.serviceShare({
            shareType: 0,
            title: window['lplatform'].cparam.shareAppTitle,
            summary: window['lplatform'].cparam.shareAppTitle,
            imagePath: window['lplatform'].cparam.shareAppImgUrl,
            targetUrl: window['lplatform'].cparam.shareAppImgUrl,
            mediaUrl: window['lplatform'].cparam.shareAppImgUrl,
            platforms: "",
            fail: (e: any, t: any) => {
                console.log(`service share fail:${t}${e}`);
            },
            cancel: () => {
                console.log("cancel");
            }
        });
    }

    public makeShareUI(e: any, t: Function, o: any, n: number = 0, a: boolean = false): void {
        window['lplatform'].uiEngine.CreateShareK(
            () => {
                this.shareRecord(e, t);
            },
            () => {
                if (t) t();
                if (this.gameRecordShareBtn) {
                    this.gameRecordShareBtn.hide();
                }
            },
            o,
            n,
            a
        );
    }

    public shareRecord(e?: any, t?: Function): void {
        this.shareAppMessage();
    }

    public createMoreGameButton(): void {}
    public createMoreGameBanner(): void {}
    public createMoreGamePortal(e?: boolean, t?: boolean): void {}
    
    public goToGameOrGameList(): void {
        //window['lplatform'].plog("huaWei未实现 goToGameOrGameList");
    }

    private showRewardedVideo(callback: Function): void {
        // Implementation for showing rewarded video
    }

    private gameRecorderManager: any = null;
}