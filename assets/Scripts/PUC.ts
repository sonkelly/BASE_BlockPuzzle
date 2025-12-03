const { ccclass } = cc._decorator;

@ccclass
export default class PUC{
    private env: any = null;
    private bannerAd: any = null;
    private rewardedVideoAd: any = null;
    private rewardedVideoLoadTimeout: number = 0;
    private rewardedVideoIAutoShow: boolean = false;
    private rewardedVideoIsLoaded: boolean = false;
    private rewardedVideoTimeMax: number = 30000;

    public init(): void {
        this.env = uc;
    }

    public initAD(): void {}

    public loadBanner(show: boolean = false): void {
        if (!this.bannerAd) {
            const config = {
                style: {
                    width: lplatform.cparam.bannerWidth,
                    height: lplatform.cparam.bannerHeight,
                    gravity: 7
                }
            };
            
            this.bannerAd = uc.createBannerAd(config);
            this.bannerAd.onLoad(() => {});
            this.bannerAd.onError(() => {});
            
            if (show) {
                this.bannerAd.show();
            }
        }
    }

    public showBanner(): void {
        this.hideBanner();
        if (this.bannerAd) {
            this.bannerAd.show();
        } else {
            this.loadBanner(true);
        }
    }

    public hideBanner(): void {
        if (this.bannerAd) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
    }

    public hideInterstitial(): void {}

    public createRewardedVideo(autoShow: boolean = false): void {
        if (lplatform.cparam.rewardedVideoID) {
            if (!this.rewardedVideoAd && typeof this.env.createRewardedVideoAd === 'function') {
                this.rewardedVideoAd = this.env.createRewardedVideoAd({
                    adUnitId: lplatform.cparam.rewardedVideoID
                });
                
                this.rewardedVideoAd.onError(this.onRewardedVideoError.bind(this));
                this.rewardedVideoAd.onClose(this.onRewardedVideoClose.bind(this));
                this.rewardedVideoAd.onLoad(this.onRewardedVideoLoad.bind(this));
            }
            
            if (autoShow) {
                this.showRewardedVideo(window.vcb);
            }
        }
    }

    public loadRewardedVideo(autoShow: boolean = false): void {
        this.createRewardedVideo(autoShow);
        lplatform.plog("loadRewardedVideo this.rewardedVideoAd.load()");
    }

    private onRewardedVideoLoad(): void {
        lplatform.plog("onRewardedVideoLoad this.rewardedVideoIAutoShow:" + this.rewardedVideoIAutoShow);
    }

    private onRewardedVideoError(error: any, message: string): void {
        lplatform.plog("onRewardedVideoError code:" + JSON.stringify(error) + " msg:" + message);
        this.resetRewardedVideo();
    }

    private onRewardedVideoClose(result: any): void {
        lplatform.plog("onRewardedVideoClose res.isEnded:" + result.isEnded);
        
        if (result.isEnded) {
            lplatform.plog("onRewardedVideoClose window.vcb:" + window.vcb);
            if (window.vcb) {
                window.vcb(result.isEnded);
            }
            this.resetRewardedVideo(false, true);
            this.loadRewardedVideo(false);
        } else if (lplatform.labData.openSecondTipVideo) {
            const self = this;
            self.env.showModal({
                title: "继续吗",
                content: "观看完视频才能获得奖励哦",
                success: function(response: any) {
                    if (response.confirm) {
                        self.showRewardedVideo(window.vcb);
                    } else if (response.cancel) {
                        if (window.vcb) {
                            window.vcb(result.isEnded);
                        }
                        self.resetRewardedVideo(false, true);
                        self.loadRewardedVideo(false);
                    }
                }
            });
        }
    }

    public showRewardedVideo(callback: Function): void {
        lplatform.plog("showRewardedVideo vcb:" + callback);
        
        if (callback) {
            window.vcb = callback;
        }
        
        if (this.rewardedVideoAd) {
            this.showLoading();
            
            this.rewardedVideoLoadTimeout = setTimeout(() => {
                lplatform.plog("rewardedVideoLoadTimeout 广告超时 timeMax:" + this.rewardedVideoTimeMax);
                clearTimeout(this.rewardedVideoLoadTimeout);
                if (window.vcb) {
                    window.vcb(false, "广告超时");
                }
                this.resetRewardedVideo(true, true);
            }, this.rewardedVideoTimeMax);
            
            lplatform.plog("showRewardedVideo this.rewardedVideoIsLoaded:" + this.rewardedVideoIsLoaded);
            
            this.rewardedVideoAd.show().then(() => {
                lplatform.plog("showRewardedVideo then ");
                this.hideLoading();
                clearTimeout(this.rewardedVideoLoadTimeout);
            }).catch((error: any) => {
                lplatform.plog("showRewardedVideo catch:" + JSON.stringify(error));
                this.hideLoading();
                clearTimeout(this.rewardedVideoLoadTimeout);
                
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

    public resetRewardedVideo(destroyAd: boolean = false, clearCallback: boolean = false): void {
        if (this.rewardedVideoAd && destroyAd) {
            this.rewardedVideoAd.offLoad(this.onRewardedVideoLoad);
            this.rewardedVideoAd.offError(this.onRewardedVideoError);
            this.rewardedVideoAd.offClose(this.onRewardedVideoClose);
            this.rewardedVideoAd = null;
        }
        
        if (clearCallback) {
            window.vcb = null;
        }
        
        if (this.rewardedVideoLoadTimeout) {
            clearTimeout(this.rewardedVideoLoadTimeout);
        }
        
        this.hideLoading();
    }

    public shareAppMessage(): void {}

    public makeShareUI(title: string, callback: Function, image: string, type: number = 0, force: boolean = false): void {
        if (callback) {
            callback();
        }
    }

    public analytics(): void {}

    public showFavoriteGuide(): void {}

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

    public shareRecord(title: string, callback: Function): void {
        if (callback) {
            callback();
        }
    }

    public resetRecord(): void {}

    private showLoading(): void {
        // Implement loading show logic
    }

    private hideLoading(): void {
        // Implement loading hide logic
    }
}