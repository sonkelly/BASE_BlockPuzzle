const { ccclass } = cc._decorator;
import PWX from "./PWX";
@ccclass
export default class PBaiDu extends PWX {
    private env: any;
    private info: any;
    private bh: number = 0;
    private bw: number = 0;
    private btop: number = 0;
    private bannerAd: any = null;
    private bannerAutoShow: boolean = false;
    private rewardedVideoAd: any = null;
    private gameRecorderManager: any = null;
    private recordStartCb: Function | null = null;
    private recordStopCb: Function | null = null;
    private videoPath: string | null = null;
    private gameRecordStartTime: number = 0;
    private gameRecordStopTime: number = 0;
    private moreGameBtn: any = null;

    public init(): void {
        this.env = window['swan'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        this.gameRecorderManager = this.env.getVideoRecorderManager();
        this.createMoreGameButton();
        this.showShareMenu();
    }

    public initAD(): void {
        this.loadBanner(false);
        this.createRewardedVideo(false);
    }

    public loadBanner(autoShow: boolean): void {
        this.hideBanner(true);
        if (!this.bannerAd) {
            this.btop = 0;
            if (window['lplatform'].cparam.bannerOnBottom) {
                this.btop = this.info.windowHeight - this.bh;
            }
            
            this.bannerAd = this.env.createBannerAd({
                adUnitId: window['lplatform'].cparam.bannerID,
                appSid: window['lplatform'].cparam.appSid,
                adIntervals: 30,
                style: {
                    width: this.bw,
                    height: this.bh,
                    left: (this.info.windowWidth - this.bw) / 2,
                    top: this.btop
                }
            });
            
            this.bannerAd.onLoad(this.onBannerLoad.bind(this));
            this.bannerAd.onError(this.onBannerError.bind(this));
            this.bannerAd.onResize(this.onBannerResize.bind(this));
        }
        this.bannerAutoShow = autoShow;
    }

    private onBannerLoad(): void {
        // Banner广告加载成功处理
    }

    private onBannerError(error: any): void {
        // Banner广告错误处理
    }

    private onBannerResize(res: any): void {
        this.btop = 0;
        if (window['lplatform'].cparam.bannerOnBottom) {
            this.btop = this.info.windowHeight - res.height;
        }
        this.bannerAd.style.top = this.btop;
        this.bannerAd.style.left = 0;
    }

    public hideBanner(destroy: boolean): void {
        if (this.bannerAd) {
            this.bannerAd.hide();
            if (destroy) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
    }

    public createRewardedVideo(autoShow: boolean): void {
        if (window['lplatform'].cparam.rewardedVideoID && !this.rewardedVideoAd && 
            typeof this.env.createRewardedVideoAd === 'function') {
            
            this.rewardedVideoAd = this.env.createRewardedVideoAd({
                adUnitId: window['lplatform'].cparam.rewardedVideoID,
                appSid: window['lplatform'].cparam.appSid
            });
            
            this.rewardedVideoAd.onError(this.onRewardedVideoError.bind(this));
            this.rewardedVideoAd.onClose(this.onRewardedVideoClose.bind(this));
            this.rewardedVideoAd.onLoad(this.onRewardedVideoLoad.bind(this));
        }
        
        if (autoShow) {
            this.showRewardedVideo(window['vcb']);
        }
    }

    public showRewardedVideo(callback: Function): void {
        window['lplatform'].pauseGame();
        super.showRewardedVideo(callback);
    }

    private onRewardedVideoError(error: any, info: any): void {
        super.onRewardedVideoError(error, info);
        window['lplatform'].resumeGame();
    }

    private onRewardedVideoClose(res: any): void {
        super.onRewardedVideoClose(res);
        window['lplatform'].resumeGame();
    }

    public loadInterstitial(): void {
        // 插屏广告加载
    }

    public onInterstitialClose(): void {
        // 插屏广告关闭处理
    }

    public showInterstitial(): void {
        // 显示插屏广告
    }

    public hideInterstitial(): void {
        // 隐藏插屏广告
    }

    public showFavoriteGuide(): void {
        window['lplatform'].plog("PBaiDu,showFavoriteGuide");
        if (typeof this.env.showFavoriteGuide === 'function') {
            this.env.showFavoriteGuide({
                type: "tip",
                content: "一键添加到我的小程序"
            });
        }
    }

    public showAddToDesktopGuide(): void {
        if (typeof this.env.showAddToDesktopGuide === 'function') {
            this.env.showAddToDesktopGuide({
                type: "bar-autohide",
                content: "一键添加到我的桌面",
                success: (res: any) => {
                    console.log("添加成功：", res);
                },
                fail: (err: any) => {
                    console.log("添加失败：", err);
                }
            });
        }
    }

    public showShareMenu(): void {
        if (typeof this.env.showShareMenu === 'function') {
            this.env.showShareMenu({
                success: () => {},
                fail: () => {},
                complete: () => {}
            });
        }
        
        this.env.onShareAppMessage(() => {
            return {
                title: window['lplatform'].cparam.shareAppTitle,
                imageUrl: window['lplatform'].cparam.shareAppImgUrl,
                query: "key1=1&key2=2&key3=3",
                success: (res: any) => {
                    window['lplatform'].plog("onShareAppMessage share success", JSON.stringify(res));
                },
                fail: (err: any) => {
                    window['lplatform'].plog("onShareAppMessage share fail", JSON.stringify(err));
                }
            };
        });
    }

    public shareAppMessage(): void {
        this.env.shareAppMessage({
            title: window['lplatform'].cparam.shareAppTitle,
            imageUrl: window['lplatform'].cparam.shareAppImgUrl
        });
    }

    public canRecord(): boolean {
        if (this.gameRecorderManager && window['lplatform'].cparam.canRecord) {
            return true;
        }
        window['lplatform'].plog("PBaiDu,不支持录制游戏画面");
        return false;
    }

    public startRecord(callback: Function): void {
        if (this.canRecord()) {
            window['lplatform'].plog("startRecord");
            this.recordStartCb = callback;
            this.videoPath = null;
            this.gameRecorderManager.start({ duration: 30 });
            
            this.gameRecorderManager.onStart(this.onGameRecordStart.bind(this));
            this.gameRecorderManager.onError(this.onGameRecordError.bind(this));
            this.gameRecorderManager.onStop(this.onGameRecordStop.bind(this));
            
            const self = this;
            this.env.onShow(() => {
                window['lplatform'].plog("startRecord this.env.onShow");
                self.resumeRecord();
            });
            
            this.env.onHide(() => {
                window['lplatform'].plog("startRecord this.env.onHide");
                self.pauseRecord();
            });
        }
    }

    private onGameRecordStart(): void {
        window['lplatform'].plog("PBaiDu,onGameRecordStart");
        this.gameRecordStartTime = Date.now();
        if (this.recordStartCb) {
            this.recordStartCb();
            this.recordStartCb = null;
        }
    }

    private onGameRecordError(error: any): void {
        window['lplatform'].plog("onGameRecordError:" + JSON.stringify(error), "error");
    }

    private onGameRecordStop(res: any): void {
        window['lplatform'].plog("onGameRecordStop this.recordStopCb:" + this.recordStopCb);
        this.gameRecordStopTime = Date.now();
        
        if (this.gameRecordStopTime - this.gameRecordStartTime > 4500) {
            this.videoPath = res.videoPath;
        } else {
            window['lplatform'].plog("onGameRecordStop 实际录屏时间少于5秒就有可能分享失败");
        }
        
        if (this.recordStopCb) {
            this.recordStopCb(this.videoPath);
            this.recordStopCb = null;
        }
    }

    public pauseRecord(): void {
        this.gameRecorderManager.pause();
    }

    public resumeRecord(): void {
        this.gameRecorderManager.resume();
    }

    public stopRecord(callback: Function): void {
        window['lplatform'].plog("stopRecord cb:" + callback);
        if (this.canRecord()) {
            this.recordStopCb = callback;
            this.gameRecorderManager.stop();
        }
    }

    public shareRecord(successCallback?: Function, failCallback?: Function): void {
        window['lplatform'].plog("PBaiDu,shareRecord videoPath:" + this.videoPath);
        
        if (this.canShareRecord()) {
            this.env.shareVideo({
                videoPath: this.videoPath,
                success: () => {
                    successCallback && successCallback();
                },
                fail: (error: any) => {
                    failCallback && failCallback(error);
                }
            });
        } else {
            this.shareAppMessage();
        }
    }

    public resetRecord(): void {
        this.stopRecord(() => {});
        this.videoPath = null;
    }

    public createMoreGameButton(): void {
        this.createRecommendationButton();
    }

    public createMoreGameBanner(): void {
        // 创建更多游戏横幅
    }

    public createMoreGamePortal(): void {
        // 创建更多游戏入口
    }

    private createRecommendationButton(): void {
        if (typeof this.env.createRecommendationButton === 'function') {
            if (this.moreGameBtn) {
                this.moreGameBtn.show();
            } else {
                this.moreGameBtn = this.env.createRecommendationButton({
                    type: "list",
                    style: {
                        left: window['lplatform'].cparam.moreGameLeft * window['lplatform'].systemInfo.windowWidth,
                        top: window['lplatform'].cparam.moreGameTop * window['lplatform'].systemInfo.windowHeight
                    }
                });
                
                const self = this;
                this.moreGameBtn.onLoad(() => {
                    self.moreGameBtn.show();
                    self.moreGameBtn.offLoad(() => {});
                });
                
                this.moreGameBtn.load();
            }
        }
    }

    public makeShareUI(successCallback: Function, failCallback: Function, type: any, delay: number = 0, autoHide: boolean = false): void {
        window['lplatform'].uiEngine.CreateShareK(
            () => {
                this.shareRecord(successCallback, failCallback);
            },
            () => {
                failCallback && failCallback();
                if (this.gameRecordShareBtn) {
                    this.gameRecordShareBtn.hide();
                }
            },
            type,
            delay,
            autoHide
        );
    }

    public goToGameOrGameList(): void {
        this.navigateToMiniProgram();
    }

    public navigateToMiniProgram(appKey?: string): void {
        this.env.navigateToMiniProgram({
            appKey: appKey || window['lplatform'].cparam.navigateToId[0],
            path: "/path/page/0",
            extraData: {},
            success: (res: any) => {
                console.log("navigateToMiniProgram success", res);
            },
            fail: (err: any) => {
                console.log("navigateToMiniProgram fail", err);
            }
        });
    }

    private canShareRecord(): boolean {
        return !!this.videoPath;
    }
}