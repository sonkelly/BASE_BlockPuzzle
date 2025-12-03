const { ccclass, property } = cc._decorator;
import PTT from "./PTT";
@ccclass
export default class POppo extends PTT{
    public yuanshengIndex: number = 0;
    public yuanshengADK: any = null;
    public env: any = null;
    public info: any = null;
    public bh: number = 0;
    public bw: number = 0;
    public gameRecorderManager: any = null;
    public rewardedVideoAd: any = null;
    public rewardedVideoIsLoaded: boolean = false;
    public moreGamePortal: any = null;
    public moreGameBanner: any = null;
    public btop: number = 0;
    public nativeAd: any = null;
    public customAd: any = null;

    public init(): void {
        this.env = window['qg'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        
        if (typeof this.env.getGameRecorder === 'function') {
            this.gameRecorderManager = this.env.getGameRecorder();
        }
    }

    public initAD(): void {
        this.loadBanner(false);
        this.createRewardedVideo(false);
        this.loadMoreGamePortal(false);
    }

    public createRewardedVideo(show: boolean): void {
        if (window['lplatform'].cparam.rewardedVideoID) {
            if (!this.rewardedVideoAd && typeof this.env.createRewardedVideoAd === 'function') {
                this.rewardedVideoAd = this.env.createRewardedVideoAd({
                    adUnitId: window['lplatform'].cparam.rewardedVideoID
                });
                this.rewardedVideoAd.onError(this.onRewardedVideoError.bind(this));
                this.rewardedVideoAd.onClose(this.onRewardedVideoClose.bind(this));
                this.rewardedVideoAd.onLoad(this.onRewardedVideoLoad.bind(this));
            }
            if (show) {
                this.showRewardedVideo(window['vcb']);
            }
        }
    }

    public showRewardedVideo(callback?: Function): void {
        if (callback) {
            window['vcb'] = callback;
        }
        
        if (this.rewardedVideoAd) {
            window['lplatform'].plog(`showRewardedVideo this.rewardedVideoIsLoaded:${this.rewardedVideoIsLoaded}`);
            this.rewardedVideoAd.show().then(() => {
                window['lplatform'].plog("oppo的rewardedVideo.show().then()在视频结束时才调用，shit.");
            }).catch((error: any) => {
                window['lplatform'].plog(`showRewardedVideo catch:${JSON.stringify(error)}`);
                this.rewardedVideoAd.load().then(() => {
                    this.rewardedVideoAd.show();
                }).catch(() => {
                    this.loadRewardedVideo(false);
                });
            });
        } else {
            this.createRewardedVideo(true);
        }
    }

    public onRewardedVideoError(error: any, code: any): void {
        super.onRewardedVideoError(error, code);
        this.env.showToast({
            message: "广告展示失败，请稍后重试！"
        });
    }

    public onRewardedVideoClose(data: any): void {
        super.onRewardedVideoClose(data);
    }

    public showFavoriteGuide(): void {
        this.env.hasShortcutInstalled({
            success: (result: any) => {
                if (result === 0) {
                    this.env.installShortcut({
                        success: () => {
                            this.showToast("添加成功！");
                        },
                        fail: () => {
                            this.showToast("添加失败！请稍后再试！");
                        },
                        complete: () => {}
                    });
                } else {
                    this.showToast("桌面图标已存在！请勿重复创建");
                }
            },
            fail: () => {
                this.showToast("添加失败！请稍后再试！");
            },
            complete: () => {}
        });
    }

    public showToast(message: string): void {
        this.env.showToast({
            title: message,
            icon: "none"
        });
    }

    public createMoreGamePortal(show: boolean = false, load: boolean = false): void {
        if (this.moreGamePortal) {
            console.log("直接显示", JSON.stringify(this.moreGamePortal));
            this.moreGamePortal.show().then(() => {
                console.log("show success");
            }).catch((error: any) => {
                console.log(`show fail with:${error.errCode},${error.errMsg}`);
                if (window['moreGameButton']) {
                    window['moreGameButton'].active = false;
                }
                this.moreGamePortal.destroy();
                this.loadMoreGamePortal(true);
            });
        } else {
            console.log("加载后直接显示");
            this.loadMoreGamePortal(true);
        }
    }

    public loadMoreGamePortal(show: boolean): void {
        if (this.moreGamePortal) {
            this.moreGamePortal.destroy();
            this.moreGamePortal = null;
        }

        this.moreGamePortal = this.env.createGamePortalAd({
            adUnitId: window['lplatform'].cparam.spreadBoxID[0]
        });

        this.moreGamePortal.onLoad(() => {
            console.log("互推盒子九宫格广告加载成功");
            if (window['moreGameButton']) {
                window['moreGameButton'].active = true;
            }
            if (show) {
                this.moreGamePortal.show().then(() => {
                    console.log("show success");
                }).catch((error: any) => {
                    console.log(`show fail with:${error.errCode},${error.errMsg}`);
                    if (window['moreGameButton']) {
                        window['moreGameButton'].active = false;
                    }
                });
            }
        });

        this.moreGamePortal.onClose(() => {
            console.log("互推盒子九宫格广告关闭");
            this.moreGamePortal.destroy().then(() => {
                console.log("destroy success");
            }).catch((error: any) => {
                console.log(`destroy fail with:${error.errCode},${error.errMsg}`);
            });
            this.loadMoreGamePortal(false);
        });

        this.moreGamePortal.onError((error: any) => {
            if (window['moreGameButton']) {
                window['moreGameButton'].active = false;
            }
            console.log(`互推盒子九宫格加载失败${JSON.stringify(error)}`);
        });
    }

    public createMoreGameButton(): void {
        // 空实现
    }

    public createMoreGameBanner(): void {
        if (window['lplatform'].cparam.moreGameBannerId) {
            if (!this.moreGameBanner) {
                const height = window['lplatform'].cparam.moreGameBannerHeight;
                this.btop = 0;
                if (window['lplatform'].cparam.bannerOnBottom) {
                    this.btop = this.info.windowHeight - height;
                }
                
                this.moreGameBanner = this.env.createGameBannerAd({
                    adUnitId: window['lplatform'].cparam.moreGameBannerId
                });
                
                this.moreGameBanner.onError((error: any, code: any) => {
                    window['lplatform'].plog(`监听事件:${JSON.stringify(error)} ${JSON.stringify(code)}`);
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

    public showShareMenu(): void {
        // 空实现
    }

    public shareAppMessage(): void {
        // 空实现
    }

    public canRecord(): boolean {
        if (this.gameRecorderManager && window['lplatform'].cparam.canRecord) {
            return true;
        }
        window['lplatform'].plog("POppo,不支持录制游戏画面");
        return false;
    }

    public canShareRecord(): boolean {
        return false;
    }

    public startRecord(): void {
        // 空实现
    }

    public onGameRecordStart(): void {
        // 空实现
    }

    public onGameRecordError(): void {
        // 空实现
    }

    public pauseRecord(): void {
        // 空实现
    }

    public resumeRecord(): void {
        // 空实现
    }

    public stopRecord(): void {
        // 空实现
    }

    public resetRecord(): void {
        // 空实现
    }

    public shareInnerRecord(): void {
        // 空实现
    }

    public showBanner(): void {
        super.showBanner();
    }

    public loadInterstitial(): void {
        window['lplatform'].plog(`createNativeAd lplatform.cparam.nativeID:${window['lplatform'].cparam.nativeID}`);
        const nativeIDs = window['lplatform'].cparam.nativeID;
        
        this.yuanshengIndex += 1;
        if (this.yuanshengIndex >= nativeIDs.length) {
            this.yuanshengIndex = 0;
        }
        
        if (this.nativeAd) {
            this.nativeAd.destroy();
            this.nativeAd = null;
        }
        
        const nativeAd = this.env.createNativeAd({
            adUnitId: nativeIDs[this.yuanshengIndex]
        });
        
        this.nativeAd = nativeAd;
        
        nativeAd.onLoad((data: any) => {
            window['lplatform'].plog(`nativeAd.onLoad:${JSON.stringify(data)}`);
            nativeAd.reportAdShow({
                adId: data.adList[0].adId
            });
            
            if (this.yuanshengADK && this.yuanshengADK.destroy) {
                //window['lplatform'].plog(`onLoad this.yuanshengADK.destroy:${this.yuanshengADK.destroy}`);
                this.yuanshengADK.destroy();
            }
            
            if (window['lplatform'].labData.mainSwitch) {
                this.yuanshengADK = window['lplatform'].uiEngine.createChaping(data.adList[0], () => {
                    this.yuanshengADK = null;
                }, () => {
                    nativeAd.reportAdClick({
                        adId: data.adList[0].adId
                    });
                    this.yuanshengADK = null;
                });
            }
        });
        
        nativeAd.onError((error: any) => {
            console.log(`nativeAd.onError:${JSON.stringify(error)}`);
            this.loadNativeTemplate(true);
            nativeAd.destroy();
            
            if (this.yuanshengADK && this.yuanshengADK.destroy) {
                //window['lplatform'].plog(`onError this.yuanshengADK.destroy:${this.yuanshengADK.destroy}`);
                this.yuanshengADK.destroy();
            }
        });
        
        nativeAd.load();
    }

    public loadNativeTemplate(show: boolean): void {
        if (window['lplatform'].cparam.nativeTemplateID) {
            const width = Math.min(this.info.windowWidth, this.info.windowHeight);
            const height = 9 * width / 16;
            const screenWidth = this.info.windowWidth;
            
            const customAd = this.env.createCustomAd({
                adUnitId: window['lplatform'].cparam.nativeTemplateID,
                style: {
                    top: (this.info.windowHeight - height) / 2,
                    left: 0.5 * screenWidth - 0.8 * width / 2,
                    width: 0.8 * width
                }
            });
            
            this.customAd = customAd;
            
            if (show) {
                customAd.show().then(() => {
                    console.log("show success");
                }).catch((error: any) => {
                    console.log(`show fail with:${error.errCode},${error.errMsg}`);
                });
            }
        }
    }

    public onInterstitialLoad(): void {
        // 空实现
    }

    public onInterstitialError(code: any, message: any): void {
        window['lplatform'].plog(`onInterstitialError code:${code} msg:${message}`);
    }

    public onInterstitialClose(): void {
        // 空实现
    }

    public showInterstitial(): void {
        if (window['lplatform'].labData.mainSwitch && window['lplatform'].labData.mainSwitch === 1) {
            this.loadInterstitial();
        }
    }

    public hideInterstitial(): void {
        // 空实现
    }

    public onGameRecordStop(data: any): void {
        super.onGameRecordStop(data);
        this.gameRecorderManager.saveToAlbum();
    }

    public shareRecord(): void {
        // 空实现
    }

    public makeShareUI(data: any, success: Function, fail: Function, type: number = 0, show: boolean = false): void {
        if (success) {
            success();
        }
    }

    public analytics(): void {
        // 空实现
    }

    public httpRequest(url: string, callback: Function, timeout: number, method?: string, data?: any): void {
        const xhr = new XMLHttpRequest();
        xhr.timeout = timeout;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    callback(null, xhr.response, xhr.responseText);
                } else {
                    callback(xhr.status, null, null);
                }
            }
        };
        xhr.open(method || "GET", url, true);
        xhr.send(data);
    }

    public goToGameOrGameList(): void {
        window['lplatform'].plog("Oppo未实现 goToGameOrGameList");
    }

    // 需要从父类继承的方法
    public loadBanner(show: boolean): void {
        // 实现逻辑
    }

    public onRewardedVideoLoad(): void {
        // 实现逻辑
    }

    public loadRewardedVideo(show: boolean): void {
        // 实现逻辑
    }
}