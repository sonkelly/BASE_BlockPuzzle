"use strict";
cc._RF.push(module, '3ac7509q0dF/IA1T8OypSp4', 'PH54399');
// Scripts/PH54399.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PH54399 = /** @class */ (function () {
    function PH54399() {
    }
    PH54399.prototype.init = function () {
        this.env = window.h5api;
    };
    PH54399.prototype.initAD = function () {
        this.createRewardedVideo(false);
    };
    PH54399.prototype.loadBanner = function () {
        // Implementation empty
    };
    PH54399.prototype.showBanner = function () {
        // Implementation empty
    };
    PH54399.prototype.hideBanner = function () {
        // Implementation empty
    };
    PH54399.prototype.loadInterstitial = function () {
        // Implementation empty
    };
    PH54399.prototype.showInterstitial = function () {
        // Implementation empty
    };
    PH54399.prototype.hideInterstitial = function () {
        // Implementation empty
    };
    PH54399.prototype.createRewardedVideo = function () {
        // Implementation empty
    };
    PH54399.prototype.loadRewardedVideo = function () {
        // Implementation empty
    };
    PH54399.prototype.showRewardedVideo = function (callback) {
        var _this = this;
        this.env.canPlayAd(function (result) {
            console.log("是否可播放广告", result.canPlayAd, "剩余次数", result.remain);
            if (result.canPlayAd) {
                _this.env.playAd(function (adResult) {
                    console.log("代码:" + adResult.code + ",消息:" + adResult.message);
                    if (adResult.code === 10000 || adResult.code === 10001) {
                        callback && callback(true);
                    }
                    else {
                        console.log("广告异常");
                    }
                });
            }
        });
    };
    PH54399.prototype.hideRewardedVideo = function () {
        // Implementation empty
    };
    PH54399.prototype.shareAppMessage = function () {
        // Implementation empty
    };
    PH54399.prototype.makeShareUI = function (title, successCallback, failCallback, offsetX, showClose) {
        if (offsetX === void 0) { offsetX = 0; }
        if (showClose === void 0) { showClose = false; }
        successCallback && successCallback();
    };
    PH54399.prototype.analytics = function () {
        // Implementation empty
    };
    PH54399.prototype.httpRequest = function (url, callback) {
        callback && callback("h54399不允许外网连接", null, null);
    };
    return PH54399;
}());
exports.default = PH54399;

cc._RF.pop();