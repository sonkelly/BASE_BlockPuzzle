const { ccclass, property } = cc._decorator;

@ccclass
export default class PWX extends (cc.Class as any) {
    private env: any;
    private info: any;
    private bh: number = 0;
    private bw: number = 0;
    private gameRecorderManager: any;
    private logined: boolean = false;
    private insterstitialAd: any;
    private nativeGridAd: any;
    private gridAd: any;
    private gameRecordShareBtn: any = null;
    private moreGamePortal: any = null;
    private bannerAd: any;
    private moreGameBanner: any;
    private recordStartCb: (() => void) | null = null;
    private recordStopCb: ((videoPath: string | null) => void) | null = null;
    private videoPath: string | null = null;
    private gameRecordStartTime: number = 0;
    private gameRecordStopTime: number = 0;
    private btop: number = 0;

    public init(): void {
        this.env = window.wx;
        this.info = (window.lplatform && (window as any).lplatform.systemInfo) || this.env.getSystemInfoSync();
        this.bh = (window as any).lplatform.cparam.bannerHeight || 170;
        this.bw = (window as any).lplatform.cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        this.gameRecorderManager = this.env.getGameRecorder();
        this.createGameClub();
        this.showShareMenu();
        this.checkLogin();
    }

    public initAD(): void {
        this.loadBanner(false);
        this.loadInterstitial(false);
        this.createRewardedVideo(false);
    }

    private checkLogin(): void {
        const self = this;
        this.env.checkSession({
            success: function() {
                self.logined = true;
            },
            fail: function() {
                self.env.login({
                    success: function(t: any) {
                        if (t.code) {
                            self.logined = true;
                        } else {
                            console.log("登录失败！" + t.errMsg);
                        }
                    }
                });
            }
        });
    }

    public loadInterstitial(show: boolean): void {
        this.hideInterstitial();
        if (this.insterstitialAd) {
            this.insterstitialAd.load();
        } else {
            this.insterstitialAd = this.env.createInterstitialAd({
                adUnitId: (window as any).lplatform.cparam.interstitialID
            });
            this.insterstitialAd.onLoad(this.onInterstitialLoad.bind(this));
            this.insterstitialAd.onError(this.onInterstitialError.bind(this));
            this.insterstitialAd.onClose(this.onInterstitialClose.bind(this));
        }
        if (show) {
            this.showInterstitial();
        }
    }

    private onInterstitialError(): void {}

    private onInterstitialClose(): void {}

    public showInterstitial(): void {
        const self = this;
        if (this.insterstitialAd) {
            this.insterstitialAd.show().catch(function(t: any) {
                (window as any).lplatform.plog("showInterstitial cache:" + JSON.stringify(t));
                self.createMoreGamePortal(true, true);
            });
        } else {
            this.loadInterstitial(true);
        }
        this.createNativeGridAd();
    }

    public hideInterstitial(): void {
        if (this.nativeGridAd) {
            this.nativeGridAd.hide();
        }
    }

    private createGridAd(): void {
        if (this.gridAd) {
            this.gridAd.destroy();
        }
        const width = this.info.windowWidth - 100;
        const left = this.info.windowWidth / 2 - width / 2;
        const top = this.info.windowHeight / 2 - width / 2;
        
        this.gridAd = this.env.createGridAd({
            adUnitId: (window as any).lplatform.cparam.gridID,
            adIntervals: 30,
            gridCount: 5,
            style: {
                left: left,
                top: top,
                width: width,
                opacity: 0.8
            }
        });
        this.gridAd.show();
    }

    public showGridAd(): void {
        if (this.gridAd) {
            this.gridAd.show();
        } else {
            this.createGridAd();
        }
    }

    private createNativeGridAd(): void {
        if (this.nativeGridAd) {
            this.nativeGridAd.destroy();
        }
        const width = this.info.windowWidth;
        const left = this.info.windowWidth / 2 - width / 2;
        
        this.nativeGridAd = (window as any).wx.createCustomAd({
            adUnitId: (window as any).lplatform.cparam.nativeID,
            style: {
                left: left,
                top: 0,
                width: width,
                fixed: true
            }
        });
        this.nativeGridAd.show();
    }

    public showNativeGridAd(): void {
        if (this.nativeGridAd) {
            this.nativeGridAd.show();
        } else {
            this.createNativeGridAd();
        }
    }

    private createGameClub(): void {
        this.env.createGameClubButton({
            icon: "green",
            style: {
                left: (window as any).lplatform.cparam.gameClubLeft * (window as any).lplatform.systemInfo.windowWidth,
                top: (window as any).lplatform.cparam.gameClubTop * (window as any).lplatform.systemInfo.windowHeight,
                width: 40,
                height: 40
            }
        });
    }

    private showShareMenu(): void {
        if (typeof this.env.showShareMenu === "function") {
            this.env.showShareMenu({
                withShareTicket: true,
                menus: ["shareAppMessage", "shareTimeline"]
            });
        }
        
        this.env.onShareAppMessage(() => {
            return {
                title: (window as any).lplatform.cparam.shareAppTitle,
                imageUrl: (window as any).lplatform.uiEngine.getCanvas().toTempFilePathSync({
                    destWidth: 500,
                    destHeight: 400
                })
            };
        });
    }

    public shareAppMessage(): void {
        this.env.shareAppMessage({
            title: (window as any).lplatform.cparam.shareAppTitle
        });
    }

    public navigateToMiniProgram(): void {}

    public shareMessageToFriend(): void {}

    public showFavoriteGuide(): void {
        console.log("微信未实现showFavoriteGuide");
    }

    public subscribeAppMsg(): void {
        this.env.subscribeAppMsg({
            tmplIds: (window as any).lplatform.cparam.tmplIds,
            subscribe: true,
            success: function(e: any) {
                console.log("----subscribeAppMsg----success", e);
            },
            fail: function(e: any) {
                console.log("----subscribeAppMsg----fail", e);
            }
        });
    }

    public sendMsgToOpenDataProject(msg: any): void {
        if (this.logined) {
            this.env.getOpenDataContext().postMessage(msg);
        } else {
            this.checkLogin();
        }
    }

    public setUserCloudStorage(data: any): void {
        this.sendMsgToOpenDataProject({
            name: "setUserCloudStorage",
            kvdata: data
        });
    }

    public canRecord(): boolean {
        if (!this.gameRecorderManager || !this.gameRecorderManager.isFrameSupported()) {
            console.log("不支持录制游戏画面");
            return false;
        }
        return true;
    }

    public startRecord(callback: () => void): void {
        if (this.canRecord()) {
            (window as any).lplatform.plog("startRecord");
            this.recordStartCb = callback;
            this.videoPath = null;
            
            this.gameRecorderManager.start({
                fps: 24,
                bitrate: 1000,
                hookBgm: false,
                duration: 30
            });
            
            this.gameRecorderManager.on("start", this.onGameRecordStart.bind(this));
            this.gameRecorderManager.on("error", this.onGameRecordError.bind(this));
            this.gameRecorderManager.on("stop", this.onGameRecordStop.bind(this));
            
            const self = this;
            this.env.onShow(() => {
                (window as any).lplatform.plog("startRecord this.env.onShow");
                self.resumeRecord();
            });
            
            this.env.onHide(() => {
                (window as any).lplatform.plog("startRecord this.env.onHide");
                self.pauseRecord();
            });
        }
    }

    private onGameRecordStart(): void {
        this.gameRecordStartTime = Date.now();
        if (this.recordStartCb) {
            this.recordStartCb();
            this.recordStartCb = null;
        }
    }

    private onGameRecordError(error: any): void {
        (window as any).lplatform.plog("onGameRecordError:" + JSON.stringify(error), "error");
    }

    private onGameRecordStop(): void {
        (window as any).lplatform.plog("onGameRecordStop this.recordStopCb:" + this.recordStopCb);
        this.gameRecordStopTime = Date.now();
        
        if (this.gameRecordStopTime - this.gameRecordStartTime > 4500) {
            this.videoPath = "res.videoPath";
        } else {
            (window as any).lplatform.plog("onGameRecordStop 实际录屏时间少于5秒就有可能分享失败");
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

    public stopRecord(callback: (videoPath: string | null) => void): void {
        if (this.canRecord()) {
            (window as any).lplatform.plog("stopRecord cb:" + callback);
            this.recordStopCb = callback;
            this.gameRecorderManager.stop();
        }
    }

    public shareRecord(): void {
        this.shareAppMessage();
    }

    public resetRecord(): void {
        this.stopRecord(() => {});
        this.videoPath = null;
    }

    public shareInnerRecord(): void {}

    public makeShareUI(e: any, t: any, o: any, n: number = 0, a: boolean = false): void {
        const self = this;
        
        (window as any).lplatform.uiEngine.CreateShareK(
            function() {
                this.shareRecord(e, t);
            }.bind(this),
            function() {
                if (t) t();
                if (this.gameRecordShareBtn) {
                    this.gameRecordShareBtn.hide();
                }
            }.bind(this),
            o, n, a
        );

        if (!this.gameRecordShareBtn) {
            this.gameRecordShareBtn = this.env.createGameRecorderShareButton({
                style: {
                    left: (window as any).lplatform.cparam.shareRecordBtnLeft * (window as any).lplatform.systemInfo.windowWidth - (window as any).lplatform.systemInfo.windowWidth / 3.5,
                    top: (window as any).lplatform.cparam.shareRecordBtnTop * (window as any).lplatform.systemInfo.windowHeight - (window as any).lplatform.cparam.shareRecordBtnHeight / 2,
                    height: (window as any).lplatform.cparam.shareRecordBtnHeight,
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: 16,
                    borderRadius: 4,
                    iconMarginRight: 16,
                    paddingLeft: 1,
                    paddingRight: 30
                },
                text: "分享你的神操作",
                share: {
                    query: "a=1&b=2",
                    bgm: "bgm.mp3",
                    timeRange: [[0, 30000]]
                }
            });

            this.gameRecordShareBtn.onTap((e: any) => {
                console.error(JSON.stringify(e));
                (window as any).lplatform.uiEngine.closeToYou();
                this.gameRecordShareBtn.hide();
            });
        }

        if ((window as any).lplatform.cparam.showVideoShareBtn) {
            this.gameRecordShareBtn.show();
        } else {
            this.gameRecordShareBtn.hide();
        }
    }

    public showBanner(): void {
        this.hideBanner();
        if ((window as any).lplatform.labData.mainSwitch) {
            if (Math.random() <= (window as any).lplatform.cparam.moreGameBannerPercent) {
                this.createMoreGameBanner();
            } else {
                if (this.bannerAd) {
                    this.bannerAd.show().then(() => {}).catch((e: any) => {
                        (window as any).lplatform.plog(e);
                    });
                } else {
                    this.loadBanner(true);
                }
            }
        }
    }

    private createMoreGameBanner(): void {
        if (typeof this.env.createGameBanner === "function") {
            const randomIndex = Math.floor(Math.random() * (window as any).lplatform.cparam.moreGameBannerAppId.length);
            const appId = (window as any).lplatform.cparam.moreGameBannerAppId[randomIndex];
            
            this.btop = 0;
            if ((window as any).lplatform.cparam.bannerOnBottom) {
                this.btop = this.info.windowHeight - 104;
            }
            
            if (this.moreGameBanner) {
                this.moreGameBanner.destroy();
            }
            
            this.moreGameBanner = this.env.createGameBanner({
                adUnitId: appId,
                style: {
                    left: (this.info.windowWidth - 300) / 2,
                    top: this.btop
                }
            });
            this.moreGameBanner.show();
        }
    }

    private createMoreGamePortal(show: boolean = false, flag: boolean = false): void {}

    public goToGameOrGameList(): void {
        this.createMoreGamePortal(true, true);
    }

    public httpRequest(url: string, callback: any, timeout: number, method: string, data: any, headers: any, dataType: string): void {
        this.env.request({
            url: url,
            data: data,
            header: headers,
            timeout: timeout,
            method: method,
            dataType: dataType,
            success: function(response: any) {
                callback(null, response.data, response.data);
            },
            fail: function(error: any) {
                callback(error, null, null);
            }
        });
    }

    private loadBanner(show: boolean): void {
        // Banner广告加载逻辑
    }

    private createRewardedVideo(show: boolean): void {
        // 激励视频广告创建逻辑
    }

    private hideBanner(): void {
        // Banner广告隐藏逻辑
    }

    private onInterstitialLoad(): void {
        // 插屏广告加载完成回调
    }
}