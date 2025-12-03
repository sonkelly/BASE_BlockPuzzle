const { ccclass, property } = cc._decorator;

@ccclass
export default class PKuaiShou extends cc.Component {

    @property(cc.Node)
    gameRecordShareBtn: cc.Node = null;

    @property(cc.Node)
    moreGamePortal: cc.Node = null;

    private env: any = null;
    private info: any = null;
    private bh: number = 0;
    private bw: number = 0;
    private gameRecorderManager: any = null;
    private recordStartCb: Function = null;
    private recordStopCb: Function = null;
    private videoPath: string = null;
    private gameRecordStartTime: number = 0;
    private gameRecordStopTime: number = 0;
    private insterstitialAd: any = null;

    init(): void {
        this.env = window['ks'] || window['kwaigame'] || window['wx'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        
        if (typeof this.env.getGameRecorder === 'function') {
            this.gameRecorderManager = this.env.getGameRecorder();
        }
    }

    initAD(): void {
        this.createRewardedVideo(false);
    }

    private createRewardedVideo(show: boolean): void {
        // Implementation for rewarded video
    }

    createGameClub(): void {
        // Empty implementation
    }

    showShareMenu(): void {
        // Empty implementation
    }

    shareAppMessage(): void {
        // Empty implementation
    }

    navigateToMiniProgram(): void {
        // Empty implementation
    }

    shareMessageToFriend(): void {
        // Empty implementation
    }

    showFavoriteGuide(): void {
        console.log("快手未实现showFavoriteGuide");
    }

    sendMsgToOpenDataProject(): void {
        // Empty implementation
    }

    canRecord(): boolean {
        if (this.gameRecorderManager) {
            return true;
        }
        console.log("不支持录制游戏画面");
        return false;
    }

    startRecord(callback: Function): void {
        window['lplatform'].plog("startRecord");
        this.recordStartCb = callback;
        this.videoPath = null;
        
        this.gameRecorderManager.start({
            duration: 30
        });
        
        this.gameRecorderManager.on("start", this.onGameRecordStart.bind(this));
        this.gameRecorderManager.on("error", this.onGameRecordError.bind(this));
        this.gameRecorderManager.on("stop", this.onGameRecordStop.bind(this));

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

    private onGameRecordStart(): void {
        this.gameRecordStartTime = Date.now();
        if (this.recordStartCb) {
            this.recordStartCb();
            this.recordStartCb = null;
        }
    }

    private onGameRecordError(error: any): void {
        window['lplatform'].plog("onGameRecordError:" + JSON.stringify(error), "error");
    }

    private onGameRecordStop(): void {
        window['lplatform'].plog("onGameRecordStop this.recordStopCb:" + this.recordStopCb);
        this.gameRecordStopTime = Date.now();
        
        if (this.gameRecordStopTime - this.gameRecordStartTime > 4500) {
            this.videoPath = "res.videoPath";
        } else {
            window['lplatform'].plog("onGameRecordStop 实际录屏时间少于5秒就有可能分享失败");
        }
        
        if (this.recordStopCb) {
            this.recordStopCb(this.videoPath);
            this.recordStopCb = null;
        }
    }

    pauseRecord(): void {
        this.gameRecorderManager.pause();
    }

    resumeRecord(): void {
        this.gameRecorderManager.resume();
    }

    stopRecord(callback: Function): void {
        if (this.canRecord()) {
            window['lplatform'].plog("stopRecord cb:" + callback);
            this.recordStopCb = callback;
            this.gameRecorderManager.stop();
        }
    }

    shareRecord(successCallback: Function, failCallback: Function): void {
        this.gameRecorderManager.publishVideo({
            callback: (result: any) => {
                if (result != null) {
                    console.log("分享录屏失败: " + JSON.stringify(result));
                    if (failCallback) {
                        failCallback();
                    }
                } else {
                    console.log("分享录屏成功");
                    if (successCallback) {
                        successCallback();
                    }
                }
            }
        });
    }

    resetRecord(): void {
        this.stopRecord(null);
        this.videoPath = null;
    }

    shareInnerRecord(): void {
        // Empty implementation
    }

    makeShareUI(successCallback: Function, failCallback: Function, type: any, param1: number = 0, param2: boolean = false): void {
        if (this.canRecord()) {
            window['lplatform'].uiEngine.CreateShareK(
                () => {
                    this.shareRecord(successCallback, failCallback);
                },
                () => {
                    if (failCallback) {
                        failCallback();
                    }
                },
                type,
                param1,
                param2
            );
        } else if (failCallback) {
            failCallback();
        }
    }

    loadBanner(): void {
        // Empty implementation
    }

    onBannerLoad(): void {
        // Empty implementation
    }

    onBannerError(): void {
        // Empty implementation
    }

    onBannerResize(): void {
        // Empty implementation
    }

    showBanner(): void {
        // Empty implementation
    }

    hideBanner(destroy: boolean = false): void {
        // Empty implementation
    }

    loadInterstitial(show: boolean): void {
        this.hideInterstitial();
        console.log("KS loadInterstitial:" + window['lplatform'].cparam.interstitialID);
        
        this.insterstitialAd = this.env.createInterstitialAd({
            adUnitId: window['lplatform'].cparam.interstitialID
        });
        
        this.insterstitialAd.onError(this.onInterstitialError.bind(this));
        this.insterstitialAd.onClose(this.onInterstitialClose.bind(this));
        
        if (show && this.insterstitialAd) {
            console.log("KS insterstitialAd show");
            this.insterstitialAd.show().catch((error: any) => {
                console.log("KS insterstitialAd show error:" + JSON.stringify(error));
            });
        }
    }

    onInterstitialLoad(): void {
        // Empty implementation
    }

    private onInterstitialError(error: any, message: string): void {
        window['lplatform'].plog("onInterstitialError code:" + JSON.stringify(error) + " msg:" + message);
    }

    private onInterstitialClose(): void {
        this.loadInterstitial(false);
    }

    showInterstitial(): void {
        this.loadInterstitial(true);
    }

    hideInterstitial(): void {
        if (this.insterstitialAd) {
            this.insterstitialAd.offError(this.onInterstitialError);
            this.insterstitialAd.offClose(this.onInterstitialClose);
            this.insterstitialAd.destroy();
            this.insterstitialAd = null;
        }
    }

    createMoreGameBanner(): void {
        // Empty implementation
    }

    createMoreGamePortal(param1: boolean = false, param2: boolean = false): void {
        // Empty implementation
    }

    goToGameOrGameList(): void {
        this.createMoreGamePortal();
    }

    analytics(): void {
        // Empty implementation
    }

    httpRequest(
        url: string, 
        callback: Function, 
        timeout: number, 
        method: string, 
        data: any, 
        headers: any, 
        dataType: string
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
}