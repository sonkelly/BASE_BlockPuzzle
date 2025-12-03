"use strict";
cc._RF.push(module, '3495e5Cy6FIkIQLe6eMqn4M', 'PKuaiShou');
// Scripts/PKuaiShou.ts

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
var PKuaiShou = /** @class */ (function (_super) {
    __extends(PKuaiShou, _super);
    function PKuaiShou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameRecordShareBtn = null;
        _this.moreGamePortal = null;
        _this.env = null;
        _this.info = null;
        _this.bh = 0;
        _this.bw = 0;
        _this.gameRecorderManager = null;
        _this.recordStartCb = null;
        _this.recordStopCb = null;
        _this.videoPath = null;
        _this.gameRecordStartTime = 0;
        _this.gameRecordStopTime = 0;
        _this.insterstitialAd = null;
        return _this;
    }
    PKuaiShou.prototype.init = function () {
        this.env = window['ks'] || window['kwaigame'] || window['wx'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        if (typeof this.env.getGameRecorder === 'function') {
            this.gameRecorderManager = this.env.getGameRecorder();
        }
    };
    PKuaiShou.prototype.initAD = function () {
        this.createRewardedVideo(false);
    };
    PKuaiShou.prototype.createRewardedVideo = function (show) {
        // Implementation for rewarded video
    };
    PKuaiShou.prototype.createGameClub = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.showShareMenu = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.shareAppMessage = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.navigateToMiniProgram = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.shareMessageToFriend = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.showFavoriteGuide = function () {
        console.log("快手未实现showFavoriteGuide");
    };
    PKuaiShou.prototype.sendMsgToOpenDataProject = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.canRecord = function () {
        if (this.gameRecorderManager) {
            return true;
        }
        console.log("不支持录制游戏画面");
        return false;
    };
    PKuaiShou.prototype.startRecord = function (callback) {
        window['lplatform'].plog("startRecord");
        this.recordStartCb = callback;
        this.videoPath = null;
        this.gameRecorderManager.start({
            duration: 30
        });
        this.gameRecorderManager.on("start", this.onGameRecordStart.bind(this));
        this.gameRecorderManager.on("error", this.onGameRecordError.bind(this));
        this.gameRecorderManager.on("stop", this.onGameRecordStop.bind(this));
        var self = this;
        this.env.onShow(function () {
            window['lplatform'].plog("startRecord this.env.onShow");
            self.resumeRecord();
        });
        this.env.onHide(function () {
            window['lplatform'].plog("startRecord this.env.onHide");
            self.pauseRecord();
        });
    };
    PKuaiShou.prototype.onGameRecordStart = function () {
        this.gameRecordStartTime = Date.now();
        if (this.recordStartCb) {
            this.recordStartCb();
            this.recordStartCb = null;
        }
    };
    PKuaiShou.prototype.onGameRecordError = function (error) {
        window['lplatform'].plog("onGameRecordError:" + JSON.stringify(error), "error");
    };
    PKuaiShou.prototype.onGameRecordStop = function () {
        window['lplatform'].plog("onGameRecordStop this.recordStopCb:" + this.recordStopCb);
        this.gameRecordStopTime = Date.now();
        if (this.gameRecordStopTime - this.gameRecordStartTime > 4500) {
            this.videoPath = "res.videoPath";
        }
        else {
            window['lplatform'].plog("onGameRecordStop 实际录屏时间少于5秒就有可能分享失败");
        }
        if (this.recordStopCb) {
            this.recordStopCb(this.videoPath);
            this.recordStopCb = null;
        }
    };
    PKuaiShou.prototype.pauseRecord = function () {
        this.gameRecorderManager.pause();
    };
    PKuaiShou.prototype.resumeRecord = function () {
        this.gameRecorderManager.resume();
    };
    PKuaiShou.prototype.stopRecord = function (callback) {
        if (this.canRecord()) {
            window['lplatform'].plog("stopRecord cb:" + callback);
            this.recordStopCb = callback;
            this.gameRecorderManager.stop();
        }
    };
    PKuaiShou.prototype.shareRecord = function (successCallback, failCallback) {
        this.gameRecorderManager.publishVideo({
            callback: function (result) {
                if (result != null) {
                    console.log("分享录屏失败: " + JSON.stringify(result));
                    if (failCallback) {
                        failCallback();
                    }
                }
                else {
                    console.log("分享录屏成功");
                    if (successCallback) {
                        successCallback();
                    }
                }
            }
        });
    };
    PKuaiShou.prototype.resetRecord = function () {
        this.stopRecord(null);
        this.videoPath = null;
    };
    PKuaiShou.prototype.shareInnerRecord = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.makeShareUI = function (successCallback, failCallback, type, param1, param2) {
        var _this = this;
        if (param1 === void 0) { param1 = 0; }
        if (param2 === void 0) { param2 = false; }
        if (this.canRecord()) {
            window['lplatform'].uiEngine.CreateShareK(function () {
                _this.shareRecord(successCallback, failCallback);
            }, function () {
                if (failCallback) {
                    failCallback();
                }
            }, type, param1, param2);
        }
        else if (failCallback) {
            failCallback();
        }
    };
    PKuaiShou.prototype.loadBanner = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.onBannerLoad = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.onBannerError = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.onBannerResize = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.showBanner = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.hideBanner = function (destroy) {
        if (destroy === void 0) { destroy = false; }
        // Empty implementation
    };
    PKuaiShou.prototype.loadInterstitial = function (show) {
        this.hideInterstitial();
        console.log("KS loadInterstitial:" + window['lplatform'].cparam.interstitialID);
        this.insterstitialAd = this.env.createInterstitialAd({
            adUnitId: window['lplatform'].cparam.interstitialID
        });
        this.insterstitialAd.onError(this.onInterstitialError.bind(this));
        this.insterstitialAd.onClose(this.onInterstitialClose.bind(this));
        if (show && this.insterstitialAd) {
            console.log("KS insterstitialAd show");
            this.insterstitialAd.show().catch(function (error) {
                console.log("KS insterstitialAd show error:" + JSON.stringify(error));
            });
        }
    };
    PKuaiShou.prototype.onInterstitialLoad = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.onInterstitialError = function (error, message) {
        window['lplatform'].plog("onInterstitialError code:" + JSON.stringify(error) + " msg:" + message);
    };
    PKuaiShou.prototype.onInterstitialClose = function () {
        this.loadInterstitial(false);
    };
    PKuaiShou.prototype.showInterstitial = function () {
        this.loadInterstitial(true);
    };
    PKuaiShou.prototype.hideInterstitial = function () {
        if (this.insterstitialAd) {
            this.insterstitialAd.offError(this.onInterstitialError);
            this.insterstitialAd.offClose(this.onInterstitialClose);
            this.insterstitialAd.destroy();
            this.insterstitialAd = null;
        }
    };
    PKuaiShou.prototype.createMoreGameBanner = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.createMoreGamePortal = function (param1, param2) {
        if (param1 === void 0) { param1 = false; }
        if (param2 === void 0) { param2 = false; }
        // Empty implementation
    };
    PKuaiShou.prototype.goToGameOrGameList = function () {
        this.createMoreGamePortal();
    };
    PKuaiShou.prototype.analytics = function () {
        // Empty implementation
    };
    PKuaiShou.prototype.httpRequest = function (url, callback, timeout, method, data, headers, dataType) {
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
    __decorate([
        property(cc.Node)
    ], PKuaiShou.prototype, "gameRecordShareBtn", void 0);
    __decorate([
        property(cc.Node)
    ], PKuaiShou.prototype, "moreGamePortal", void 0);
    PKuaiShou = __decorate([
        ccclass
    ], PKuaiShou);
    return PKuaiShou;
}(cc.Component));
exports.default = PKuaiShou;

cc._RF.pop();