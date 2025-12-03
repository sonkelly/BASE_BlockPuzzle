const { ccclass, property } = cc._decorator;

@ccclass
export default class PTT extends cc.Component {
    public bannerAd: any = null;
    public insterstitialAd: any = null;
    public rewardedVideoAd: any = null;
    public gameRecorderManager: any = null;
    public info: any = null;
    public bw: number = 0;
    public bh: number = 0;
    public btop: number = 0;
    public videoPath: string = null;
    public gameRecordStartTime: number = 0;
    public gameRecordStopTime: number = 0;
    public recordStartCb: Function = null;
    public recordStopCb: Function = null;
    public rewardedVideoTimeMax: number = 5000;
    public rewardedVideoLoadTimeout: any = null;
    public rewardedVideoIsLoaded: boolean = false;
    public moreGameBanner: any = null;
    public moreGameBtn: any = null;
    public followBtn: any = null;
    public env: any = null;
    public centerBanner: any = null;
    public bannerAutoShow: boolean = false;
    public rewardedVideoIAutoShow: boolean = false;

    public init(): void {
        this.env = tt;
        this.info = (window['lplatform'] && lplatform.systemInfo) || this.env.getSystemInfoSync();
        this.bh = lplatform.cparam.bannerHeight || 170;
        this.bw = lplatform.cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        this.gameRecorderManager = this.env.getGameRecorderManager();
    }

    public initAD(): void {
        this.loadBanner(false);
        this.loadInterstitial(false);
        this.createRewardedVideo(false);
        
        if (lplatform.labData.openVideo && lplatform.labData.openVideo == 1) {
            const scene = this.env.getLaunchOptionsSync().scene;
            if (scene !== "023001" && scene !== "023002" && scene !== "013002" && scene !== "013003") {
                this.showRewardedVideo();
            }
        }
    }

    public checkOpenSceneValue(): boolean {
        let result = true;
        if (typeof this.env.getLaunchOptionsSync === "function") {
            const sceneValue = this.env.getLaunchOptionsSync().scene;
            console.log("sceneValue:" + sceneValue);
            this.recordSceneValue(sceneValue);
            
            if (!lplatform.labData.openSceneValues || lplatform.labData.openSceneValues.indexOf(sceneValue) < 0) {
                result = false;
            }
        }
        return result;
    }

    public release(): void {
        this.hideBanner(true);
        this.hideInterstitial();
        this.hideRewardedVideo();
        this.hideLoading();
        
        if (this.moreGameBanner) {
            this.moreGameBanner.destroy();
        }
        
        if (this.followBtn) {
            this.followBtn.destroy();
        }
    }

    public loadBanner(autoShow: boolean): void {
        this.hideBanner(true);
        
        if (!this.bannerAd) {
            this.btop = 0;
            if (lplatform.cparam.bannerOnBottom) {
                this.btop = this.info.windowHeight - this.bh;
            }
            
            lplatform.plog("loadBanner this.bh:" + this.bh + " this.btop:" + this.btop + " this.bw:" + this.bw);
            
            this.bannerAd = this.env.createBannerAd({
                adUnitId: lplatform.cparam.bannerID,
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
        if (this.bannerAutoShow) {
            this.bannerAd.show();
        }
    }

    public onBannerLoad(): void {
        // Banner load callback
    }

    public onBannerError(err: any, msg: string): void {
        lplatform.plog("onBannerError code:" + JSON.stringify(err) + " msg:" + msg);
    }

    public onBannerResize(size: any): void {
        this.btop = 0;
        if (lplatform.cparam.bannerOnBottom) {
            this.btop = this.info.windowHeight - size.height;
        }
        
        this.bannerAd.style.top = this.btop;
        this.bannerAd.style.left = (this.info.windowWidth - size.width) / 2;
        
        lplatform.plog("onBannerResize this.bannerAd.style.top:" + this.bannerAd.style.top + " .left:" + this.bannerAd.style.left + " lplatform.cparam.bannerOnBottom:" + lplatform.cparam.bannerOnBottom);
    }

    public showBanner(): void {
        if (this.bannerAd) {
            this.bannerAd.show().then(() => {}).catch((err: any) => {
                lplatform.plog(err);
            });
        } else {
            this.loadBanner(true);
        }
    }

    public hideBanner(destroy: boolean = false): void {
        if (this.bannerAd) {
            this.bannerAd.hide();
            if (destroy) {
                this.bannerAd.offLoad(this.onBannerLoad);
                this.bannerAd.offError(this.onBannerError);
                this.bannerAd.offResize(this.onBannerResize);
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
        
        if (this.moreGameBanner) {
            this.moreGameBanner.hide();
            if (destroy && typeof this.moreGameBanner.destroy === "function") {
                this.moreGameBanner.destroy();
            }
        }
    }

    public showCenterBanner(): void {
        if (!this.centerBanner) {
            this.btop = 0;
            if (lplatform.cparam.bannerOnBottom) {
                this.btop = this.info.windowHeight - this.bh;
            }
            
            this.centerBanner = this.env.createBannerAd({
                adUnitId: lplatform.cparam.bannerID,
                adIntervals: 30,
                style: {
                    width: this.bw,
                    height: this.bh,
                    left: 0,
                    top: this.btop
                }
            });
            
            const self = this;
            this.centerBanner.onLoad(() => {});
            this.centerBanner.onError((err: any, msg: string) => {
                lplatform.plog("centerBanner code:" + JSON.stringify(err) + " msg:" + msg);
            });
            this.centerBanner.onResize((size: any) => {
                self.centerBanner.style.left = 0;
                self.centerBanner.style.top = self.info.windowHeight - size.height;
            });
        }
        
        this.centerBanner.show();
    }

    public hideCenterBanner(destroy: boolean = false): void {
        if (this.centerBanner) {
            this.centerBanner.hide();
            if (destroy) {
                this.centerBanner.offLoad(() => {});
                this.centerBanner.offError(() => {});
                this.centerBanner.offResize(() => {});
                this.centerBanner.destroy();
                this.centerBanner = null;
            }
        }
    }

    public loadInterstitial(autoShow: boolean): void {
        this.hideInterstitial();
        
        this.insterstitialAd = this.env.createInterstitialAd({
            adUnitId: lplatform.cparam.interstitialID
        });
        
        this.insterstitialAd.onLoad(this.onInterstitialLoad.bind(this));
        this.insterstitialAd.onError(this.onInterstitialError.bind(this));
        this.insterstitialAd.onClose(this.onInterstitialClose.bind(this));
        this.insterstitialAd.load();
        
        if (autoShow) {
            this.showInterstitial();
        }
    }

    public onInterstitialLoad(): void {
        // Interstitial load callback
    }

    public onInterstitialError(err: any, msg: string): void {
        lplatform.plog("onInterstitialError code:" + err + " msg:" + msg);
    }

    public onInterstitialClose(): void {
        this.loadInterstitial(false);
    }

    public showInterstitial(): void {
        if (this.insterstitialAd) {
            this.insterstitialAd.show();
        } else {
            this.loadInterstitial(true);
        }
    }

    public hideInterstitial(): void {
        if (this.insterstitialAd) {
            this.insterstitialAd.offLoad(this.onInterstitialLoad);
            this.insterstitialAd.offError(this.onInterstitialError);
            this.insterstitialAd.offClose(this.onInterstitialClose);
            this.insterstitialAd.destroy();
        }
    }

    public createRewardedVideo(autoShow: boolean): void {
        if (lplatform.cparam.rewardedVideoID) {
            if (!this.rewardedVideoAd && typeof this.env.createRewardedVideoAd === "function") {
                this.rewardedVideoAd = this.env.createRewardedVideoAd({
                    adUnitId: lplatform.cparam.rewardedVideoID
                });
                
                this.rewardedVideoAd.onError(this.onRewardedVideoError.bind(this));
                this.rewardedVideoAd.onClose(this.onRewardedVideoClose.bind(this));
                this.rewardedVideoAd.onLoad(this.onRewardedVideoLoad.bind(this));
            }
            
            if (autoShow) {
                this.showRewardedVideo(window['vcb']);
            }
        }
    }

    public loadRewardedVideo(autoShow: boolean): void {
        this.createRewardedVideo(autoShow);
        lplatform.plog("loadRewardedVideo this.rewardedVideoAd.load()");
        this.rewardedVideoAd.load();
    }

    public onRewardedVideoLoad(): void {
        lplatform.plog("onRewardedVideoLoad this.rewardedVideoIAutoShow:" + this.rewardedVideoIAutoShow);
    }

    public onRewardedVideoError(err: any, msg: string): void {
        lplatform.plog("onRewardedVideoError code:" + JSON.stringify(err) + " msg:" + msg);
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
        this.resetRewardedVideo();
    }

    public onRewardedVideoClose(res: any): void {
        lplatform.plog("onRewardedVideoClose res.isEnded:" + res.isEnded);
        
        if (res.isEnded) {
            if (window['vcb']) {
                window['vcb'](res.isEnded);
            }
            this.resetRewardedVideo(false, true);
            this.loadRewardedVideo(false);
        } else if (lplatform.labData.openSecondTipVideo) {
            const self = this;
            self.env.showModal({
                title: "继续吗",
                content: "观看完视频才能获得奖励哦",
                success: (result: any) => {
                    if (result.confirm) {
                        self.showRewardedVideo(window['vcb']);
                    } else if (result.cancel) {
                        if (window['vcb']) {
                            window['vcb'](res.isEnded);
                        }
                        this.resetRewardedVideo(false, true);
                        this.loadRewardedVideo(false);
                    }
                }
            });
        } else {
            if (window['vcb']) {
                window['vcb'](res.isEnded);
            }
        }
        
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
    }

    public showRewardedVideo(callback?: Function): void {
        if (callback) {
            window['vcb'] = callback;
        }
        
        if (this.rewardedVideoAd) {
            this.showLoading();
            
            this.rewardedVideoLoadTimeout = setTimeout(() => {
                lplatform.plog("rewardedVideoLoadTimeout 广告超时 timeMax:" + this.rewardedVideoTimeMax);
                clearTimeout(this.rewardedVideoLoadTimeout);
                if (window['vcb']) {
                    window['vcb'](false, "广告超时");
                }
                this.resetRewardedVideo(true, true);
            }.bind(this), this.rewardedVideoTimeMax);
            
            lplatform.plog("showRewardedVideo this.rewardedVideoIsLoaded:" + this.rewardedVideoIsLoaded);
            
            this.rewardedVideoAd.show().then(() => {
                lplatform.plog("showRewardedVideo then ");
                this.hideLoading();
                clearTimeout(this.rewardedVideoLoadTimeout);
            }).catch((err: any) => {
                lplatform.plog("showRewardedVideo catch:" + JSON.stringify(err));
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

    public resetRewardedVideo(destroy: boolean = false, clearCallback: boolean = false): void {
        if (this.rewardedVideoAd && destroy) {
            this.rewardedVideoAd.offLoad(this.onRewardedVideoLoad);
            this.rewardedVideoAd.offError(this.onRewardedVideoError);
            this.rewardedVideoAd.offClose(this.onRewardedVideoClose);
            this.rewardedVideoAd.destroy();
            this.rewardedVideoAd = null;
        }
        
        if (clearCallback) {
            window['vcb'] = null;
        }
        
        if (this.rewardedVideoLoadTimeout) {
            clearTimeout(this.rewardedVideoLoadTimeout);
        }
        
        this.hideLoading();
    }

    public shareAppMessage(): void {
        this.env.shareAppMessage({
            templateId: lplatform.cparam.shareID,
            query: "",
            success: () => {},
            fail: (err: any) => {
                lplatform.plog("分享失败:" + err);
            }
        });
    }

    public canRecord(): boolean {
        return !!this.gameRecorderManager;
    }

    public canShareRecord(): boolean {
        return !!this.videoPath;
    }

    public startRecord(callback: Function): void {
        lplatform.plog("startRecord");
        this.recordStartCb = callback;
        this.videoPath = null;
        
        this.gameRecorderManager.start({
            duration: 30
        });
        
        this.gameRecorderManager.onStart(this.onGameRecordStart.bind(this));
        this.gameRecorderManager.onError(this.onGameRecordError.bind(this));
        this.gameRecorderManager.onStop(this.onGameRecordStop.bind(this));
        
        const self = this;
        this.env.onShow(() => {
            lplatform.plog("startRecord this.env.onShow");
            self.resumeRecord();
        });
        
        this.env.onHide(() => {
            lplatform.plog("startRecord this.env.onHide");
            self.pauseRecord();
        });
    }

    public onGameRecordStart(): void {
        this.gameRecordStartTime = Date.now();
        if (this.recordStartCb) {
            this.recordStartCb();
            this.recordStartCb = null;
        }
    }

    public onGameRecordError(err: any): void {
        lplatform.plog("onGameRecordError:" + err, "error");
    }

    public onGameRecordStop(res: any): void {
        lplatform.plog("onGameRecordStop this.recordStopCb:" + this.recordStopCb);
        this.gameRecordStopTime = Date.now();
        
        if (this.gameRecordStopTime - this.gameRecordStartTime > 4500) {
            this.videoPath = res.videoPath;
        } else {
            lplatform.plog("onGameRecordStop 实际录屏时间少于5秒就有可能分享失败");
            this.env.showToast({
                title: "录制时间太短，可能无法分享。",
                icon: "none",
                duration: 1000,
                mask: false,
                success: () => {},
                fail: (err: any) => {
                    lplatform.plog(err);
                }
            });
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
        lplatform.plog("stopRecord cb:" + callback);
        this.recordStopCb = callback;
        this.gameRecorderManager.stop();
    }

    public shareRecord(successCallback?: Function, failCallback?: Function): void {
        if (this.videoPath) {
            const self = this;
            this.env.shareAppMessage({
                channel: "video",
                extra: {
                    videoPath: this.videoPath,
                    videoTopics: lplatform.cparam.videoTopics,
                    hashtag_list: lplatform.cparam.videoTopics,
                    createChallenge: true
                },
                success: () => {
                    if (successCallback) {
                        successCallback();
                    }
                },
                fail: (err: any) => {
                    let msg = null;
                    const errStr = JSON.stringify(err);
                    
                    if (errStr.indexOf("cancel") >= 0) {
                        msg = "您取消了本次分享";
                    } else if (errStr.indexOf("21105") >= 0) {
                        msg = "视频太短，无法进行分享";
                    }
                    
                    if (msg) {
                        self.env.showToast({
                            title: msg,
                            icon: "none",
                            duration: 1000,
                            mask: false,
                            success: () => {},
                            fail: (toastErr: any) => {
                                lplatform.plog(toastErr);
                            }
                        });
                    }
                    
                    if (failCallback) {
                        failCallback();
                    }
                }
            });
        } else {
            this.env.showToast({
                title: "暂无可分享的视频",
                icon: "none",
                duration: 1000,
                mask: false,
                success: () => {},
                fail: (err: any) => {
                    lplatform.plog(err);
                }
            });
            
            if (failCallback) {
                failCallback();
            }
        }
    }

    public resetRecord(): void {
        this.stopRecord(null);
        this.videoPath = null;
    }

    public shareInnerRecord(): void {
        // Implementation for inner record sharing
    }

    public createMoreGameButton(): void {
        this.moreGameBtn = this.env.createMoreGamesButton({
            type: "image",
            image: "moreGame.png",
            actionType: "box",
            style: {
                left: lplatform.cparam.moreGameLeft * lplatform.systemInfo.windowWidth,
                top: lplatform.cparam.moreGameTop * lplatform.systemInfo.windowHeight,
                width: 49.5,
                height: 39.9,
                lineHeight: 1,
                backgroundColor: "#00000000",
                textColor: "#ffffff",
                textAlign: "center",
                fontSize: 16,
                borderRadius: 1,
                borderWidth: 0,
                borderColor: "#ff0000"
            },
            appLaunchOptions: [],
            onNavigateToMiniGame: (result: any) => {
                lplatform.plog("跳转其他小游戏", result);
            }
        });
        
        this.moreGameBtn.onTap(() => {
            lplatform.plog("点击更多游戏");
        });
    }

    public showFavoriteGuide(): void {
        this.env.showFavoriteGuide({
            type: "bar",
            content: "一键加关注，从此不迷路!",
            position: "bottom",
            success: () => {},
            fail: (err: any) => {
                lplatform.plog("showFavoriteGuide fail:" + err);
            }
        });
    }

    public followAccount(): void {
        if (typeof this.env.checkFollowState === "function") {
            const self = this;
            self.env.checkFollowState({
                success: (result: any) => {
                    if (result.errMsg) {
                        lplatform.plog("checkFollowState success, but has errMsg:" + result.errMsg);
                    }
                    
                    if (!result.result && self.env.createFollowButton) {
                        self.followBtn = self.env.createFollowButton({
                            type: "image",
                            image: "follow_btn.png",
                            style: {
                                left: lplatform.cparam.followBtnLeft * lplatform.systemInfo.windowWidth,
                                top: lplatform.cparam.followBtnTop * lplatform.systemInfo.windowHeight,
                                width: 49.5,
                                height: 39.9,
                                lineHeight: 40,
                                backgroundColor: "#ff0000",
                                textColor: "#ffffff",
                                textAlign: "center",
                                fontSize: 16,
                                borderRadius: 4,
                                borderWidth: 1,
                                borderColor: "#ff0000"
                            }
                        });
                    }
                },
                fail: (err: any) => {
                    lplatform.plog("followAccount fail:" + err);
                }
            });
        } else if (typeof this.env.openAwemeUserProfile === "function") {
            this.env.openAwemeUserProfile();
        }
    }

    public goToGameOrGameList(): void {
        this.env.showMoreGamesModal({
            appLaunchOptions: [],
            success: (result: any) => {
                console.log("success", result.errMsg);
            },
            fail: (err: any) => {
                console.log("fail", err.errMsg);
            }
        });
    }

    public openAwemeUserProfile(): void {
        // Implementation for opening user profile
    }

    public createMoreGameBanner(): void {
        if (lplatform.cparam.moreGameBannerAppId) {
            const randomIndex = Math.floor(Math.random() * lplatform.cparam.moreGameBannerAppId.length);
            const appId = lplatform.cparam.moreGameBannerAppId[randomIndex];
            
            if (!this.moreGameBanner) {
                this.btop = 0;
                if (lplatform.cparam.bannerOnBottom) {
                    this.btop = this.info.windowHeight - 104;
                }
                
                this.moreGameBanner = this.env.createMoreGamesBanner({
                    style: {
                        width: 300,
                        height: 104,
                        left: 0,
                        top: this.btop
                    },
                    appLaunchOptions: [{
                        appId: appId,
                        query: "foo=bar&baz=qux",
                        extraData: {}
                    }]
                });
                
                const eventCallback = (event: any, data: any) => {
                    lplatform.plog("监听事件:" + JSON.stringify(event) + " " + JSON.stringify(data));
                };
                
                this.moreGameBanner.onResize(function(this: any, size: any) {
                    this.moreGameBanner.style.top = this.info.windowHeight - 104;
                    this.moreGameBanner.style.left = (this.info.windowWidth - 300) / 2;
                    lplatform.plog("moreGameBanner size.width:" + size.width + " size.height:" + size.height + " lplatform.cparam.bannerOnBottom:" + lplatform.cparam.bannerOnBottom);
                }.bind(this));
                
                this.moreGameBanner.onTap(eventCallback);
                this.moreGameBanner.onError(eventCallback);
            }
            
            this.moreGameBanner.show();
            
            if (lplatform.cparam.moreGameBannerAutoCloseTime > 0) {
                setTimeout(function(this: any) {
                    this.moreGameBanner.hide();
                }.bind(this), lplatform.cparam.moreGameBannerAutoCloseTime);
            }
        }
    }

    public createMoreGamePortal(): void {
        if (this.info.platform !== "ios") {
            tt.showMoreGamesModal({
                appLaunchOptions: [{
                    appId: "ttXXXXXX",
                    query: "foo=bar&baz=qux",
                    extraData: {}
                }],
                success: (result: any) => {
                    console.log("success", result.errMsg);
                },
                fail: (err: any) => {
                    console.log("fail", err.errMsg);
                }
            });
        } else {
            tt.showToast({
                title: " iOS不支持此功能"
            });
        }
    }

    public analytics(eventName: string, data: any): void {
        if (typeof this.env.reportAnalytics === "function") {
            this.env.reportAnalytics(eventName, data);
        }
    }

    public showLoading(title?: string): void {
        this.hideLoading();
        
        if (typeof this.env.showLoading === "function") {
            this.env.showLoading({
                title: title || "处理中，请稍候...",
                success: () => {},
                fail: (err: any) => {
                    lplatform.plog("showLoading调用失败:" + err);
                }
            });
        }
    }

    public hideLoading(): void {
        const self = this;
        if (typeof this.env.hideLoading === "function") {
            this.env.hideLoading({
                success: () => {},
                fail: (err: any) => {
                    lplatform.plog("hideLoading调用失败:" + err);
                    setTimeout(() => {
                        self.env.hideLoading({
                            success: () => {},
                            fail: (retryErr: any) => {
                                lplatform.plog("hideLoading二次调用失败:" + retryErr);
                            }
                        });
                    }, 1000);
                }
            });
        }
    }

    public createGameClub(): void {
        // Implementation for game club
    }

    public navigateToMiniProgram(): void {
        // Implementation for navigation to mini program
    }

    public shareMessageToFriend(): void {
        // Implementation for sharing message to friend
    }

    public sendMsgToOpenDataProject(): void {
        // Implementation for sending message to open data project
    }

    public makeShareUI(successCallback: Function, failCallback: Function, type: any, delay: number = 0, autoClose: boolean = false): void {
        lplatform.uiEngine.CreateShareK(() => {
            this.shareRecord(successCallback, failCallback);
        }, () => {
            if (failCallback) {
                failCallback();
            }
        }, type, delay, autoClose);
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

    public recordSceneValue(sceneValue: string): void {
        if (lplatform.labData.recordSceneValue) {
            this.env.request({
                data: {
                    sceneValue: sceneValue
                },
                header: {
                    "content-type": "application/json"
                },
                success: () => {},
                fail: () => {}
            });
        }
    }
}