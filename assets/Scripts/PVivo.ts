const { ccclass } = cc._decorator;

@ccclass
export default class PVivo extends (cc.Class as any) {
    private env: any;
    private info: any;
    private bh: number = 170;
    private bw: number = 0;
    private btop: number = 0;
    private bannerAd: any = null;
    private bannerAutoShow: boolean = false;
    private customAd: any = null;
    private moreGameBanner: any = null;
    private moreGamePortal: any = null;
    private rewardedVideoAd: any = null;

    public init(): void {
        this.env = window['qg'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
    }

    public initAD(): void {
        this.loadInterstitial(false);
        this.createRewardedVideo(false);
        setTimeout(() => {
            this.createMoreGamePortal(false, true);
        }, 10000);
    }

    public loadBanner(show: boolean): void {
        this.hideBanner(true);
        
        if (!this.bannerAd) {
            this.btop = 0;
            if (window['lplatform'].cparam.bannerOnBottom) {
                this.btop = this.info.windowHeight - this.bh;
            }
            
            window['lplatform'].plog(`loadBanner this.bh:${this.bh} this.btop:${this.btop} this.bw:${this.bw} lplatform.cparam.bannerID:${window['lplatform'].cparam.bannerID}`);
            
            this.bannerAd = this.env.createBannerAd({
                posId: window['lplatform'].cparam.bannerID,
                adIntervals: 30,
                style: {}
            });
            
            this.bannerAd.onLoad(this.onBannerLoad.bind(this));
            this.bannerAd.onError(this.onBannerError.bind(this));
            this.bannerAd.onSize(this.onBannerResize.bind(this));
        }
        
        this.bannerAutoShow = show;
        if (show) {
            this.bannerAd.show();
        }
    }

    public showBanner(): void {
        this.loadBanner(true);
    }

    public showVivoInterstitial(): void {
        console.log("showVivoInterstitial");
        const ad = window['qg'].createInterstitialAd({
            posId: window['lplatform'].cparam.interstitialID
        });
        
        ad.onError((error: any) => {
            console.log("插屏广告加载失败", JSON.stringify(error));
        });
        
        ad.show().then(() => {
            console.log("插屏广告展示完成");
            if (this.customAd) {
                this.customAd.destroy();
            }
        }).catch((error: any) => {
            console.log("插屏广告展示失败", JSON.stringify(error));
        });
    }

    public loadInterstitial(show: boolean): void {
        if (this.customAd) {
            this.customAd.destroy();
        }
        
        const ad = this.env.createCustomAd({
            posId: window['lplatform'].cparam.nativeID[0],
            style: {
                left: (this.info.windowWidth - 1080) / 2,
                top: (this.info.windowHeight - 720) / 2
            }
        });
        
        ad.onLoad(() => {});
        ad.onError((error: any) => {
            console.log("createCustomAd Error", JSON.stringify(error));
            this.showVivoInterstitial();
        });
        ad.onClose(() => {
            this.loadInterstitial(false);
        });
        
        this.customAd = ad;
        if (show) {
            this.customAd.show();
        }
    }

    public showInterstitial(): void {
        this.loadInterstitial(true);
    }

    public createMoreGameBanner(): void {
        if (window['lplatform'].cparam.moreGameBannerId) {
            if (!this.moreGameBanner) {
                this.moreGameBanner = this.env.createBoxBannerAd({
                    posId: window['lplatform'].cparam.moreGameBannerId
                });
                
                this.moreGameBanner.onError((error: any, info: any) => {
                    window['lplatform'].plog(`监听事件:${JSON.stringify(error)} ${JSON.stringify(info)}`);
                });
            }
            
            this.moreGameBanner.show();
            
            if (window['lplatform'].cparam.moreGameBannerAutoCloseTime > 0) {
                setTimeout(() => {
                    this.moreGameBanner.hide();
                }, window['lplatform'].cparam.moreGameBannerAutoCloseTime);
            }
        }
    }

    public createMoreGamePortal(destroyPrev: boolean = false, show: boolean = false): void {
        if (typeof this.env.createBoxPortalAd === 'function') {
            if (destroyPrev && this.moreGamePortal) {
                window['lplatform'].plog("createMoreGamePortal destroyPrev");
                this.moreGamePortal.destroy();
                this.moreGamePortal = null;
            }
            
            if (!this.moreGamePortal) {
                const index = Math.floor(Math.random() * window['lplatform'].cparam.spreadBoxID.length);
                const posId = window['lplatform'].cparam.spreadBoxID[index];
                
                window['lplatform'].plog(`createMoreGamePortal:${posId}`);
                
                this.moreGamePortal = this.env.createBoxPortalAd({
                    posId: posId,
                    image: window['lplatform'].cparam.moreGamePortalIconUrl,
                    marginTop: window['lplatform'].cparam.moreGamePortalMarginTop
                });
            }
            
            if (show) {
                this.moreGamePortal.show().then(() => {}).catch((error: any) => {
                    window['lplatform'].plog(`createMoreGamePortal show fail:${JSON.stringify(error)}`);
                });
            }
        }
    }

    public createRewardedVideo(show: boolean): void {
        if (window['lplatform'].cparam.rewardedVideoID && typeof this.env.createRewardedVideoAd === 'function') {
            if (!this.rewardedVideoAd) {
                this.rewardedVideoAd = this.env.createRewardedVideoAd({
                    posId: window['lplatform'].cparam.rewardedVideoID
                });
                
                this.rewardedVideoAd.onError(this.onRewardedVideoError.bind(this));
                this.rewardedVideoAd.onClose(this.onRewardedVideoClose.bind(this));
                this.rewardedVideoAd.onLoad(this.onRewardedVideoLoad.bind(this));
            }
            
            if (show) {
                this.showRewardedVideo(window['vcb']);
                cc.audioEngine.setMusicVolume(0);
                cc.audioEngine.setEffectsVolume(0);
            }
        }
    }

    public goToGameOrGameList(): void {
        window['lplatform'].plog("vivoGame未实现 goToGameOrGameList");
    }

    public showFavoriteGuide(): void {
        this.env.hasShortcutInstalled({
            success: (result: any) => {
                if (result === 0) {
                    this.env.installShortcut({
                        success: () => {},
                        fail: () => {},
                        complete: () => {}
                    });
                } else {
                    this.env.showToast({
                        message: "已创建桌面图标"
                    });
                }
            },
            fail: () => {},
            complete: () => {}
        });
    }

    public canRecord(): boolean {
        return false;
    }

    public canShareRecord(): boolean {
        return false;
    }

    public startRecord(): void {}

    public pauseRecord(): void {}

    public resumeRecord(): void {}

    public stopRecord(): void {}

    public shareRecord(data: any, callback?: Function): void {
        if (callback) {
            callback();
        }
    }

    public resetRecord(): void {}

    public httpRequest(
        url: string, 
        callback: Function, 
        timeout: number, 
        method: string, 
        data: any, 
        headers: any, 
        dataType: string = "text"
    ): void {
        this.env.request({
            url: url,
            data: data,
            header: headers,
            timeout: timeout,
            method: method,
            dataType: dataType,
            success: (response: any) => {
                callback(null, response.data, response.data);
            },
            fail: (error: any) => {
                callback(error, null, null);
            }
        });
    }

    private onBannerLoad(): void {
        // Banner广告加载回调
    }

    private onBannerError(error: any): void {
        // Banner广告错误回调
    }

    private onBannerResize(size: any): void {
        // Banner广告尺寸变化回调
    }

    private onRewardedVideoError(error: any): void {
        // 激励视频错误回调
    }

    private onRewardedVideoClose(): void {
        // 激励视频关闭回调
    }

    private onRewardedVideoLoad(): void {
        // 激励视频加载回调
    }

    private hideBanner(immediate: boolean): void {
        if (this.bannerAd) {
            this.bannerAd.hide();
        }
    }

    private showRewardedVideo(callback: Function): void {
        if (this.rewardedVideoAd) {
            this.rewardedVideoAd.show();
        }
    }
}