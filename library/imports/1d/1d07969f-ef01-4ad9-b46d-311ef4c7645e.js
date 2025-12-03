"use strict";
cc._RF.push(module, '1d079af7wFK2bRtMR70x2Re', 'PWX');
// Scripts/PWX.ts

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
var PWX = /** @class */ (function (_super) {
    __extends(PWX, _super);
    function PWX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bh = 0;
        _this.bw = 0;
        _this.logined = false;
        _this.gameRecordShareBtn = null;
        _this.moreGamePortal = null;
        _this.recordStartCb = null;
        _this.recordStopCb = null;
        _this.videoPath = null;
        _this.gameRecordStartTime = 0;
        _this.gameRecordStopTime = 0;
        _this.btop = 0;
        return _this;
    }
    PWX.prototype.init = function () {
        this.env = window.wx;
        this.info = (window.lplatform && window.lplatform.systemInfo) || this.env.getSystemInfoSync();
        this.bh = window.lplatform.cparam.bannerHeight || 170;
        this.bw = window.lplatform.cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        this.gameRecorderManager = this.env.getGameRecorder();
        this.createGameClub();
        this.showShareMenu();
        this.checkLogin();
    };
    PWX.prototype.initAD = function () {
        this.loadBanner(false);
        this.loadInterstitial(false);
        this.createRewardedVideo(false);
    };
    PWX.prototype.checkLogin = function () {
        var self = this;
        this.env.checkSession({
            success: function () {
                self.logined = true;
            },
            fail: function () {
                self.env.login({
                    success: function (t) {
                        if (t.code) {
                            self.logined = true;
                        }
                        else {
                            console.log("登录失败！" + t.errMsg);
                        }
                    }
                });
            }
        });
    };
    PWX.prototype.loadInterstitial = function (show) {
        this.hideInterstitial();
        if (this.insterstitialAd) {
            this.insterstitialAd.load();
        }
        else {
            this.insterstitialAd = this.env.createInterstitialAd({
                adUnitId: window.lplatform.cparam.interstitialID
            });
            this.insterstitialAd.onLoad(this.onInterstitialLoad.bind(this));
            this.insterstitialAd.onError(this.onInterstitialError.bind(this));
            this.insterstitialAd.onClose(this.onInterstitialClose.bind(this));
        }
        if (show) {
            this.showInterstitial();
        }
    };
    PWX.prototype.onInterstitialError = function () { };
    PWX.prototype.onInterstitialClose = function () { };
    PWX.prototype.showInterstitial = function () {
        var self = this;
        if (this.insterstitialAd) {
            this.insterstitialAd.show().catch(function (t) {
                window.lplatform.plog("showInterstitial cache:" + JSON.stringify(t));
                self.createMoreGamePortal(true, true);
            });
        }
        else {
            this.loadInterstitial(true);
        }
        this.createNativeGridAd();
    };
    PWX.prototype.hideInterstitial = function () {
        if (this.nativeGridAd) {
            this.nativeGridAd.hide();
        }
    };
    PWX.prototype.createGridAd = function () {
        if (this.gridAd) {
            this.gridAd.destroy();
        }
        var width = this.info.windowWidth - 100;
        var left = this.info.windowWidth / 2 - width / 2;
        var top = this.info.windowHeight / 2 - width / 2;
        this.gridAd = this.env.createGridAd({
            adUnitId: window.lplatform.cparam.gridID,
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
    };
    PWX.prototype.showGridAd = function () {
        if (this.gridAd) {
            this.gridAd.show();
        }
        else {
            this.createGridAd();
        }
    };
    PWX.prototype.createNativeGridAd = function () {
        if (this.nativeGridAd) {
            this.nativeGridAd.destroy();
        }
        var width = this.info.windowWidth;
        var left = this.info.windowWidth / 2 - width / 2;
        this.nativeGridAd = window.wx.createCustomAd({
            adUnitId: window.lplatform.cparam.nativeID,
            style: {
                left: left,
                top: 0,
                width: width,
                fixed: true
            }
        });
        this.nativeGridAd.show();
    };
    PWX.prototype.showNativeGridAd = function () {
        if (this.nativeGridAd) {
            this.nativeGridAd.show();
        }
        else {
            this.createNativeGridAd();
        }
    };
    PWX.prototype.createGameClub = function () {
        this.env.createGameClubButton({
            icon: "green",
            style: {
                left: window.lplatform.cparam.gameClubLeft * window.lplatform.systemInfo.windowWidth,
                top: window.lplatform.cparam.gameClubTop * window.lplatform.systemInfo.windowHeight,
                width: 40,
                height: 40
            }
        });
    };
    PWX.prototype.showShareMenu = function () {
        if (typeof this.env.showShareMenu === "function") {
            this.env.showShareMenu({
                withShareTicket: true,
                menus: ["shareAppMessage", "shareTimeline"]
            });
        }
        this.env.onShareAppMessage(function () {
            return {
                title: window.lplatform.cparam.shareAppTitle,
                imageUrl: window.lplatform.uiEngine.getCanvas().toTempFilePathSync({
                    destWidth: 500,
                    destHeight: 400
                })
            };
        });
    };
    PWX.prototype.shareAppMessage = function () {
        this.env.shareAppMessage({
            title: window.lplatform.cparam.shareAppTitle
        });
    };
    PWX.prototype.navigateToMiniProgram = function () { };
    PWX.prototype.shareMessageToFriend = function () { };
    PWX.prototype.showFavoriteGuide = function () {
        console.log("微信未实现showFavoriteGuide");
    };
    PWX.prototype.subscribeAppMsg = function () {
        this.env.subscribeAppMsg({
            tmplIds: window.lplatform.cparam.tmplIds,
            subscribe: true,
            success: function (e) {
                console.log("----subscribeAppMsg----success", e);
            },
            fail: function (e) {
                console.log("----subscribeAppMsg----fail", e);
            }
        });
    };
    PWX.prototype.sendMsgToOpenDataProject = function (msg) {
        if (this.logined) {
            this.env.getOpenDataContext().postMessage(msg);
        }
        else {
            this.checkLogin();
        }
    };
    PWX.prototype.setUserCloudStorage = function (data) {
        this.sendMsgToOpenDataProject({
            name: "setUserCloudStorage",
            kvdata: data
        });
    };
    PWX.prototype.canRecord = function () {
        if (!this.gameRecorderManager || !this.gameRecorderManager.isFrameSupported()) {
            console.log("不支持录制游戏画面");
            return false;
        }
        return true;
    };
    PWX.prototype.startRecord = function (callback) {
        if (this.canRecord()) {
            window.lplatform.plog("startRecord");
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
            var self_1 = this;
            this.env.onShow(function () {
                window.lplatform.plog("startRecord this.env.onShow");
                self_1.resumeRecord();
            });
            this.env.onHide(function () {
                window.lplatform.plog("startRecord this.env.onHide");
                self_1.pauseRecord();
            });
        }
    };
    PWX.prototype.onGameRecordStart = function () {
        this.gameRecordStartTime = Date.now();
        if (this.recordStartCb) {
            this.recordStartCb();
            this.recordStartCb = null;
        }
    };
    PWX.prototype.onGameRecordError = function (error) {
        window.lplatform.plog("onGameRecordError:" + JSON.stringify(error), "error");
    };
    PWX.prototype.onGameRecordStop = function () {
        window.lplatform.plog("onGameRecordStop this.recordStopCb:" + this.recordStopCb);
        this.gameRecordStopTime = Date.now();
        if (this.gameRecordStopTime - this.gameRecordStartTime > 4500) {
            this.videoPath = "res.videoPath";
        }
        else {
            window.lplatform.plog("onGameRecordStop 实际录屏时间少于5秒就有可能分享失败");
        }
        if (this.recordStopCb) {
            this.recordStopCb(this.videoPath);
            this.recordStopCb = null;
        }
    };
    PWX.prototype.pauseRecord = function () {
        this.gameRecorderManager.pause();
    };
    PWX.prototype.resumeRecord = function () {
        this.gameRecorderManager.resume();
    };
    PWX.prototype.stopRecord = function (callback) {
        if (this.canRecord()) {
            window.lplatform.plog("stopRecord cb:" + callback);
            this.recordStopCb = callback;
            this.gameRecorderManager.stop();
        }
    };
    PWX.prototype.shareRecord = function () {
        this.shareAppMessage();
    };
    PWX.prototype.resetRecord = function () {
        this.stopRecord(function () { });
        this.videoPath = null;
    };
    PWX.prototype.shareInnerRecord = function () { };
    PWX.prototype.makeShareUI = function (e, t, o, n, a) {
        var _this = this;
        if (n === void 0) { n = 0; }
        if (a === void 0) { a = false; }
        var self = this;
        window.lplatform.uiEngine.CreateShareK(function () {
            this.shareRecord(e, t);
        }.bind(this), function () {
            if (t)
                t();
            if (this.gameRecordShareBtn) {
                this.gameRecordShareBtn.hide();
            }
        }.bind(this), o, n, a);
        if (!this.gameRecordShareBtn) {
            this.gameRecordShareBtn = this.env.createGameRecorderShareButton({
                style: {
                    left: window.lplatform.cparam.shareRecordBtnLeft * window.lplatform.systemInfo.windowWidth - window.lplatform.systemInfo.windowWidth / 3.5,
                    top: window.lplatform.cparam.shareRecordBtnTop * window.lplatform.systemInfo.windowHeight - window.lplatform.cparam.shareRecordBtnHeight / 2,
                    height: window.lplatform.cparam.shareRecordBtnHeight,
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
            this.gameRecordShareBtn.onTap(function (e) {
                console.error(JSON.stringify(e));
                window.lplatform.uiEngine.closeToYou();
                _this.gameRecordShareBtn.hide();
            });
        }
        if (window.lplatform.cparam.showVideoShareBtn) {
            this.gameRecordShareBtn.show();
        }
        else {
            this.gameRecordShareBtn.hide();
        }
    };
    PWX.prototype.showBanner = function () {
        this.hideBanner();
        if (window.lplatform.labData.mainSwitch) {
            if (Math.random() <= window.lplatform.cparam.moreGameBannerPercent) {
                this.createMoreGameBanner();
            }
            else {
                if (this.bannerAd) {
                    this.bannerAd.show().then(function () { }).catch(function (e) {
                        window.lplatform.plog(e);
                    });
                }
                else {
                    this.loadBanner(true);
                }
            }
        }
    };
    PWX.prototype.createMoreGameBanner = function () {
        if (typeof this.env.createGameBanner === "function") {
            var randomIndex = Math.floor(Math.random() * window.lplatform.cparam.moreGameBannerAppId.length);
            var appId = window.lplatform.cparam.moreGameBannerAppId[randomIndex];
            this.btop = 0;
            if (window.lplatform.cparam.bannerOnBottom) {
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
    };
    PWX.prototype.createMoreGamePortal = function (show, flag) {
        if (show === void 0) { show = false; }
        if (flag === void 0) { flag = false; }
    };
    PWX.prototype.goToGameOrGameList = function () {
        this.createMoreGamePortal(true, true);
    };
    PWX.prototype.httpRequest = function (url, callback, timeout, method, data, headers, dataType) {
        this.env.request({
            url: url,
            data: data,
            header: headers,
            timeout: timeout,
            method: method,
            dataType: dataType,
            success: function (response) {
                callback(null, response.data, response.data);
            },
            fail: function (error) {
                callback(error, null, null);
            }
        });
    };
    PWX.prototype.loadBanner = function (show) {
        // Banner广告加载逻辑
    };
    PWX.prototype.createRewardedVideo = function (show) {
        // 激励视频广告创建逻辑
    };
    PWX.prototype.hideBanner = function () {
        // Banner广告隐藏逻辑
    };
    PWX.prototype.onInterstitialLoad = function () {
        // 插屏广告加载完成回调
    };
    PWX = __decorate([
        ccclass
    ], PWX);
    return PWX;
}(cc.Class));
exports.default = PWX;

cc._RF.pop();