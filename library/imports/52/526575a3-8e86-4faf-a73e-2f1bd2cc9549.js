"use strict";
cc._RF.push(module, '52657WjjoZPr6c+LxvSzJVJ', 'PTT');
// Scripts/PTT.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PTT = /** @class */ (function (_super) {
    __extends(PTT, _super);
    function PTT() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bannerAd = null;
        _this.insterstitialAd = null;
        _this.rewardedVideoAd = null;
        _this.gameRecorderManager = null;
        _this.info = null;
        _this.bw = 0;
        _this.bh = 0;
        _this.btop = 0;
        _this.videoPath = null;
        _this.gameRecordStartTime = 0;
        _this.gameRecordStopTime = 0;
        _this.recordStartCb = null;
        _this.recordStopCb = null;
        _this.rewardedVideoTimeMax = 5000;
        _this.rewardedVideoLoadTimeout = null;
        _this.rewardedVideoIsLoaded = false;
        _this.moreGameBanner = null;
        _this.moreGameBtn = null;
        _this.followBtn = null;
        _this.env = null;
        _this.centerBanner = null;
        _this.bannerAutoShow = false;
        _this.rewardedVideoIAutoShow = false;
        return _this;
    }
    PTT.prototype.init = function () {
        this.env = tt;
        this.info = (window['lplatform'] && lplatform.systemInfo) || this.env.getSystemInfoSync();
        this.bh = lplatform.cparam.bannerHeight || 170;
        this.bw = lplatform.cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        this.gameRecorderManager = this.env.getGameRecorderManager();
    };
    PTT.prototype.initAD = function () {
        this.loadBanner(false);
        this.loadInterstitial(false);
        this.createRewardedVideo(false);
        if (lplatform.labData.openVideo && lplatform.labData.openVideo == 1) {
            var scene = this.env.getLaunchOptionsSync().scene;
            if (scene !== "023001" && scene !== "023002" && scene !== "013002" && scene !== "013003") {
                this.showRewardedVideo();
            }
        }
    };
    PTT.prototype.checkOpenSceneValue = function () {
        var result = true;
        if (typeof this.env.getLaunchOptionsSync === "function") {
            var sceneValue = this.env.getLaunchOptionsSync().scene;
            console.log("sceneValue:" + sceneValue);
            this.recordSceneValue(sceneValue);
            if (!lplatform.labData.openSceneValues || lplatform.labData.openSceneValues.indexOf(sceneValue) < 0) {
                result = false;
            }
        }
        return result;
    };
    PTT.prototype.release = function () {
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
    };
    PTT.prototype.loadBanner = function (autoShow) {
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
    };
    PTT.prototype.onBannerLoad = function () {
        // Banner load callback
    };
    PTT.prototype.onBannerError = function (err, msg) {
        lplatform.plog("onBannerError code:" + JSON.stringify(err) + " msg:" + msg);
    };
    PTT.prototype.onBannerResize = function (size) {
        this.btop = 0;
        if (lplatform.cparam.bannerOnBottom) {
            this.btop = this.info.windowHeight - size.height;
        }
        this.bannerAd.style.top = this.btop;
        this.bannerAd.style.left = (this.info.windowWidth - size.width) / 2;
        lplatform.plog("onBannerResize this.bannerAd.style.top:" + this.bannerAd.style.top + " .left:" + this.bannerAd.style.left + " lplatform.cparam.bannerOnBottom:" + lplatform.cparam.bannerOnBottom);
    };
    PTT.prototype.showBanner = function () {
        if (this.bannerAd) {
            this.bannerAd.show().then(function () { }).catch(function (err) {
                lplatform.plog(err);
            });
        }
        else {
            this.loadBanner(true);
        }
    };
    PTT.prototype.hideBanner = function (destroy) {
        if (destroy === void 0) { destroy = false; }
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
    };
    PTT.prototype.showCenterBanner = function () {
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
            var self_1 = this;
            this.centerBanner.onLoad(function () { });
            this.centerBanner.onError(function (err, msg) {
                lplatform.plog("centerBanner code:" + JSON.stringify(err) + " msg:" + msg);
            });
            this.centerBanner.onResize(function (size) {
                self_1.centerBanner.style.left = 0;
                self_1.centerBanner.style.top = self_1.info.windowHeight - size.height;
            });
        }
        this.centerBanner.show();
    };
    PTT.prototype.hideCenterBanner = function (destroy) {
        if (destroy === void 0) { destroy = false; }
        if (this.centerBanner) {
            this.centerBanner.hide();
            if (destroy) {
                this.centerBanner.offLoad(function () { });
                this.centerBanner.offError(function () { });
                this.centerBanner.offResize(function () { });
                this.centerBanner.destroy();
                this.centerBanner = null;
            }
        }
    };
    PTT.prototype.loadInterstitial = function (autoShow) {
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
    };
    PTT.prototype.onInterstitialLoad = function () {
        // Interstitial load callback
    };
    PTT.prototype.onInterstitialError = function (err, msg) {
        lplatform.plog("onInterstitialError code:" + err + " msg:" + msg);
    };
    PTT.prototype.onInterstitialClose = function () {
        this.loadInterstitial(false);
    };
    PTT.prototype.showInterstitial = function () {
        if (this.insterstitialAd) {
            this.insterstitialAd.show();
        }
        else {
            this.loadInterstitial(true);
        }
    };
    PTT.prototype.hideInterstitial = function () {
        if (this.insterstitialAd) {
            this.insterstitialAd.offLoad(this.onInterstitialLoad);
            this.insterstitialAd.offError(this.onInterstitialError);
            this.insterstitialAd.offClose(this.onInterstitialClose);
            this.insterstitialAd.destroy();
        }
    };
    PTT.prototype.createRewardedVideo = function (autoShow) {
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
    };
    PTT.prototype.loadRewardedVideo = function (autoShow) {
        this.createRewardedVideo(autoShow);
        lplatform.plog("loadRewardedVideo this.rewardedVideoAd.load()");
        this.rewardedVideoAd.load();
    };
    PTT.prototype.onRewardedVideoLoad = function () {
        lplatform.plog("onRewardedVideoLoad this.rewardedVideoIAutoShow:" + this.rewardedVideoIAutoShow);
    };
    PTT.prototype.onRewardedVideoError = function (err, msg) {
        lplatform.plog("onRewardedVideoError code:" + JSON.stringify(err) + " msg:" + msg);
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
        this.resetRewardedVideo();
    };
    PTT.prototype.onRewardedVideoClose = function (res) {
        var _this = this;
        lplatform.plog("onRewardedVideoClose res.isEnded:" + res.isEnded);
        if (res.isEnded) {
            if (window['vcb']) {
                window['vcb'](res.isEnded);
            }
            this.resetRewardedVideo(false, true);
            this.loadRewardedVideo(false);
        }
        else if (lplatform.labData.openSecondTipVideo) {
            var self_2 = this;
            self_2.env.showModal({
                title: "继续吗",
                content: "观看完视频才能获得奖励哦",
                success: function (result) {
                    if (result.confirm) {
                        self_2.showRewardedVideo(window['vcb']);
                    }
                    else if (result.cancel) {
                        if (window['vcb']) {
                            window['vcb'](res.isEnded);
                        }
                        _this.resetRewardedVideo(false, true);
                        _this.loadRewardedVideo(false);
                    }
                }
            });
        }
        else {
            if (window['vcb']) {
                window['vcb'](res.isEnded);
            }
        }
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
    };
    PTT.prototype.showRewardedVideo = function (callback) {
        var _this = this;
        if (callback) {
            window['vcb'] = callback;
        }
        if (this.rewardedVideoAd) {
            this.showLoading();
            this.rewardedVideoLoadTimeout = setTimeout(function () {
                lplatform.plog("rewardedVideoLoadTimeout 广告超时 timeMax:" + _this.rewardedVideoTimeMax);
                clearTimeout(_this.rewardedVideoLoadTimeout);
                if (window['vcb']) {
                    window['vcb'](false, "广告超时");
                }
                _this.resetRewardedVideo(true, true);
            }, bind(this), this.rewardedVideoTimeMax);
            lplatform.plog("showRewardedVideo this.rewardedVideoIsLoaded:" + this.rewardedVideoIsLoaded);
            this.rewardedVideoAd.show().then(function () {
                lplatform.plog("showRewardedVideo then ");
                _this.hideLoading();
                clearTimeout(_this.rewardedVideoLoadTimeout);
            }).catch(function (err) {
                lplatform.plog("showRewardedVideo catch:" + JSON.stringify(err));
                _this.hideLoading();
                clearTimeout(_this.rewardedVideoLoadTimeout);
                _this.rewardedVideoAd.load().then(function () {
                    _this.rewardedVideoAd.show();
                }).catch(function () {
                    _this.loadRewardedVideo(false);
                });
            });
        }
        else {
            this.createRewardedVideo(true);
        }
    };
    PTT.prototype.resetRewardedVideo = function (destroy, clearCallback) {
        if (destroy === void 0) { destroy = false; }
        if (clearCallback === void 0) { clearCallback = false; }
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
    };
    PTT.prototype.shareAppMessage = function () {
        this.env.shareAppMessage({
            templateId: lplatform.cparam.shareID,
            query: "",
            success: function () { },
            fail: function (err) {
                lplatform.plog("分享失败:" + err);
            }
        });
    };
    PTT.prototype.canRecord = function () {
        return !!this.gameRecorderManager;
    };
    PTT.prototype.canShareRecord = function () {
        return !!this.videoPath;
    };
    PTT.prototype.startRecord = function (callback) {
        lplatform.plog("startRecord");
        this.recordStartCb = callback;
        this.videoPath = null;
        this.gameRecorderManager.start({
            duration: 30
        });
        this.gameRecorderManager.onStart(this.onGameRecordStart.bind(this));
        this.gameRecorderManager.onError(this.onGameRecordError.bind(this));
        this.gameRecorderManager.onStop(this.onGameRecordStop.bind(this));
        var self = this;
        this.env.onShow(function () {
            lplatform.plog("startRecord this.env.onShow");
            self.resumeRecord();
        });
        this.env.onHide(function () {
            lplatform.plog("startRecord this.env.onHide");
            self.pauseRecord();
        });
    };
    PTT.prototype.onGameRecordStart = function () {
        this.gameRecordStartTime = Date.now();
        if (this.recordStartCb) {
            this.recordStartCb();
            this.recordStartCb = null;
        }
    };
    PTT.prototype.onGameRecordError = function (err) {
        lplatform.plog("onGameRecordError:" + err, "error");
    };
    PTT.prototype.onGameRecordStop = function (res) {
        lplatform.plog("onGameRecordStop this.recordStopCb:" + this.recordStopCb);
        this.gameRecordStopTime = Date.now();
        if (this.gameRecordStopTime - this.gameRecordStartTime > 4500) {
            this.videoPath = res.videoPath;
        }
        else {
            lplatform.plog("onGameRecordStop 实际录屏时间少于5秒就有可能分享失败");
            this.env.showToast({
                title: "录制时间太短，可能无法分享。",
                icon: "none",
                duration: 1000,
                mask: false,
                success: function () { },
                fail: function (err) {
                    lplatform.plog(err);
                }
            });
        }
        if (this.recordStopCb) {
            this.recordStopCb(this.videoPath);
            this.recordStopCb = null;
        }
    };
    PTT.prototype.pauseRecord = function () {
        this.gameRecorderManager.pause();
    };
    PTT.prototype.resumeRecord = function () {
        this.gameRecorderManager.resume();
    };
    PTT.prototype.stopRecord = function (callback) {
        lplatform.plog("stopRecord cb:" + callback);
        this.recordStopCb = callback;
        this.gameRecorderManager.stop();
    };
    PTT.prototype.shareRecord = function (successCallback, failCallback) {
        if (this.videoPath) {
            var self_3 = this;
            this.env.shareAppMessage({
                channel: "video",
                extra: {
                    videoPath: this.videoPath,
                    videoTopics: lplatform.cparam.videoTopics,
                    hashtag_list: lplatform.cparam.videoTopics,
                    createChallenge: true
                },
                success: function () {
                    if (successCallback) {
                        successCallback();
                    }
                },
                fail: function (err) {
                    var msg = null;
                    var errStr = JSON.stringify(err);
                    if (errStr.indexOf("cancel") >= 0) {
                        msg = "您取消了本次分享";
                    }
                    else if (errStr.indexOf("21105") >= 0) {
                        msg = "视频太短，无法进行分享";
                    }
                    if (msg) {
                        self_3.env.showToast({
                            title: msg,
                            icon: "none",
                            duration: 1000,
                            mask: false,
                            success: function () { },
                            fail: function (toastErr) {
                                lplatform.plog(toastErr);
                            }
                        });
                    }
                    if (failCallback) {
                        failCallback();
                    }
                }
            });
        }
        else {
            this.env.showToast({
                title: "暂无可分享的视频",
                icon: "none",
                duration: 1000,
                mask: false,
                success: function () { },
                fail: function (err) {
                    lplatform.plog(err);
                }
            });
            if (failCallback) {
                failCallback();
            }
        }
    };
    PTT.prototype.resetRecord = function () {
        this.stopRecord(null);
        this.videoPath = null;
    };
    PTT.prototype.shareInnerRecord = function () {
        // Implementation for inner record sharing
    };
    PTT.prototype.createMoreGameButton = function () {
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
            onNavigateToMiniGame: function (result) {
                lplatform.plog("跳转其他小游戏", result);
            }
        });
        this.moreGameBtn.onTap(function () {
            lplatform.plog("点击更多游戏");
        });
    };
    PTT.prototype.showFavoriteGuide = function () {
        this.env.showFavoriteGuide({
            type: "bar",
            content: "一键加关注，从此不迷路!",
            position: "bottom",
            success: function () { },
            fail: function (err) {
                lplatform.plog("showFavoriteGuide fail:" + err);
            }
        });
    };
    PTT.prototype.followAccount = function () {
        if (typeof this.env.checkFollowState === "function") {
            var self_4 = this;
            self_4.env.checkFollowState({
                success: function (result) {
                    if (result.errMsg) {
                        lplatform.plog("checkFollowState success, but has errMsg:" + result.errMsg);
                    }
                    if (!result.result && self_4.env.createFollowButton) {
                        self_4.followBtn = self_4.env.createFollowButton({
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
                fail: function (err) {
                    lplatform.plog("followAccount fail:" + err);
                }
            });
        }
        else if (typeof this.env.openAwemeUserProfile === "function") {
            this.env.openAwemeUserProfile();
        }
    };
    PTT.prototype.goToGameOrGameList = function () {
        this.env.showMoreGamesModal({
            appLaunchOptions: [],
            success: function (result) {
                console.log("success", result.errMsg);
            },
            fail: function (err) {
                console.log("fail", err.errMsg);
            }
        });
    };
    PTT.prototype.openAwemeUserProfile = function () {
        // Implementation for opening user profile
    };
    PTT.prototype.createMoreGameBanner = function () {
        if (lplatform.cparam.moreGameBannerAppId) {
            var randomIndex = Math.floor(Math.random() * lplatform.cparam.moreGameBannerAppId.length);
            var appId = lplatform.cparam.moreGameBannerAppId[randomIndex];
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
                var eventCallback = function (event, data) {
                    lplatform.plog("监听事件:" + JSON.stringify(event) + " " + JSON.stringify(data));
                };
                this.moreGameBanner.onResize(function (size) {
                    this.moreGameBanner.style.top = this.info.windowHeight - 104;
                    this.moreGameBanner.style.left = (this.info.windowWidth - 300) / 2;
                    lplatform.plog("moreGameBanner size.width:" + size.width + " size.height:" + size.height + " lplatform.cparam.bannerOnBottom:" + lplatform.cparam.bannerOnBottom);
                }.bind(this));
                this.moreGameBanner.onTap(eventCallback);
                this.moreGameBanner.onError(eventCallback);
            }
            this.moreGameBanner.show();
            if (lplatform.cparam.moreGameBannerAutoCloseTime > 0) {
                setTimeout(function () {
                    this.moreGameBanner.hide();
                }.bind(this), lplatform.cparam.moreGameBannerAutoCloseTime);
            }
        }
    };
    PTT.prototype.createMoreGamePortal = function () {
        if (this.info.platform !== "ios") {
            tt.showMoreGamesModal({
                appLaunchOptions: [{
                        appId: "ttXXXXXX",
                        query: "foo=bar&baz=qux",
                        extraData: {}
                    }],
                success: function (result) {
                    console.log("success", result.errMsg);
                },
                fail: function (err) {
                    console.log("fail", err.errMsg);
                }
            });
        }
        else {
            tt.showToast({
                title: " iOS不支持此功能"
            });
        }
    };
    PTT.prototype.analytics = function (eventName, data) {
        if (typeof this.env.reportAnalytics === "function") {
            this.env.reportAnalytics(eventName, data);
        }
    };
    PTT.prototype.showLoading = function (title) {
        this.hideLoading();
        if (typeof this.env.showLoading === "function") {
            this.env.showLoading({
                title: title || "处理中，请稍候...",
                success: function () { },
                fail: function (err) {
                    lplatform.plog("showLoading调用失败:" + err);
                }
            });
        }
    };
    PTT.prototype.hideLoading = function () {
        var self = this;
        if (typeof this.env.hideLoading === "function") {
            this.env.hideLoading({
                success: function () { },
                fail: function (err) {
                    lplatform.plog("hideLoading调用失败:" + err);
                    setTimeout(function () {
                        self.env.hideLoading({
                            success: function () { },
                            fail: function (retryErr) {
                                lplatform.plog("hideLoading二次调用失败:" + retryErr);
                            }
                        });
                    }, 1000);
                }
            });
        }
    };
    PTT.prototype.createGameClub = function () {
        // Implementation for game club
    };
    PTT.prototype.navigateToMiniProgram = function () {
        // Implementation for navigation to mini program
    };
    PTT.prototype.shareMessageToFriend = function () {
        // Implementation for sharing message to friend
    };
    PTT.prototype.sendMsgToOpenDataProject = function () {
        // Implementation for sending message to open data project
    };
    PTT.prototype.makeShareUI = function (successCallback, failCallback, type, delay, autoClose) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (autoClose === void 0) { autoClose = false; }
        lplatform.uiEngine.CreateShareK(function () {
            _this.shareRecord(successCallback, failCallback);
        }, function () {
            if (failCallback) {
                failCallback();
            }
        }, type, delay, autoClose);
    };
    PTT.prototype.httpRequest = function (url, callback, timeout, method, data) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = timeout;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    callback(null, xhr.response, xhr.responseText);
                }
                else {
                    callback(xhr.status, null, null);
                }
            }
        };
        xhr.open(method || "GET", url, true);
        xhr.send(data);
    };
    PTT.prototype.recordSceneValue = function (sceneValue) {
        if (lplatform.labData.recordSceneValue) {
            this.env.request({
                data: {
                    sceneValue: sceneValue
                },
                header: {
                    "content-type": "application/json"
                },
                success: function () { },
                fail: function () { }
            });
        }
    };
    PTT = __decorate([
        ccclass
    ], PTT);
    return PTT;
}(cc.Component));
exports.default = PTT;

cc._RF.pop();