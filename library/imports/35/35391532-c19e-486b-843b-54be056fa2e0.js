"use strict";
cc._RF.push(module, '35391UywZ5Ia4Q7VL4Fb6Lg', 'PNative');
// Scripts/PNative.ts

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
var ccclass = cc._decorator.ccclass;
var PNative = /** @class */ (function (_super) {
    __extends(PNative, _super);
    function PNative() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PNative.prototype.init = function () { };
    PNative.prototype.initAD = function () { };
    PNative.prototype.release = function () { };
    PNative.prototype.loadBanner = function () { };
    PNative.prototype.onBannerLoad = function () { };
    PNative.prototype.onBannerError = function () { };
    PNative.prototype.onBannerResize = function () { };
    PNative.prototype.showBanner = function () {
        var data = {
            name: "showBanner",
            data: {}
        };
        var jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
    };
    PNative.prototype.hideBanner = function (immediate) {
        if (immediate === void 0) { immediate = false; }
        var data = {
            name: "closeBanner",
            data: {}
        };
        var jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
    };
    PNative.prototype.loadInterstitial = function () { };
    PNative.prototype.onInterstitialLoad = function () { };
    PNative.prototype.onInterstitialError = function () { };
    PNative.prototype.onInterstitialClose = function () { };
    PNative.prototype.showInterstitial = function () {
        var data = {
            name: "showChaPing",
            data: {}
        };
        var jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
    };
    PNative.prototype.hideInterstitial = function () { };
    PNative.prototype.showInterstitialVideo = function () {
        console.log("PNative===>>>showRewardedVideo");
        var data = {
            name: "showVideoChaPing",
            data: {}
        };
        var jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
    };
    PNative.prototype.createRewardedVideo = function () { };
    PNative.prototype.loadRewardedVideo = function () { };
    PNative.prototype.onRewardedVideoLoad = function () { };
    PNative.prototype.onRewardedVideoError = function () { };
    PNative.prototype.onRewardedVideoClose = function () { };
    PNative.prototype.showRewardedVideo = function (callback) {
        console.log("PNative===>>>", "showRewardedVideo");
        if (callback) {
            window.vcb = callback;
            if (window.android) {
                window.android.videoRewardCb = function () {
                    lplatform.resumeGame();
                    callback(true);
                };
                window.android.videoFailCb = function () {
                    lplatform.resumeGame();
                    callback(false);
                };
            }
        }
        var data = {
            name: "showvideoAD",
            data: {}
        };
        var jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
        lplatform.pauseGame();
    };
    PNative.prototype.resetRewardedVideo = function (resetLoad, resetShow) {
        if (resetLoad === void 0) { resetLoad = false; }
        if (resetShow === void 0) { resetShow = false; }
    };
    PNative.prototype.shareAppMessage = function () { };
    PNative.prototype.canRecord = function () {
        return false;
    };
    PNative.prototype.canShareRecord = function () {
        return false;
    };
    PNative.prototype.startRecord = function () { };
    PNative.prototype.onGameRecordStart = function () { };
    PNative.prototype.onGameRecordError = function () { };
    PNative.prototype.onGameRecordStop = function () { };
    PNative.prototype.pauseRecord = function () { };
    PNative.prototype.resumeRecord = function () { };
    PNative.prototype.stopRecord = function () { };
    PNative.prototype.shareRecord = function () { };
    PNative.prototype.resetRecord = function () { };
    PNative.prototype.shareInnerRecord = function () { };
    PNative.prototype.createMoreGameButton = function () { };
    PNative.prototype.showFavoriteGuide = function () { };
    PNative.prototype.followAccount = function () { };
    PNative.prototype.goToGameOrGameList = function () {
        this.env.showMoreGamesModal({
            appLaunchOptions: [],
            success: function (result) {
                console.log("success", result.errMsg);
            },
            fail: function (error) {
                console.log("fail", error.errMsg);
            }
        });
    };
    PNative.prototype.openAwemeUserProfile = function () { };
    PNative.prototype.createMoreGameBanner = function () { };
    PNative.prototype.createMoreGamePortal = function () { };
    PNative.prototype.analytics = function (eventName, data) {
        var eventData = {
            name: eventName,
            data: data
        };
        lplatform.js2NativeEvent(JSON.stringify(eventData));
    };
    PNative.prototype.showLoading = function () { };
    PNative.prototype.hideLoading = function () { };
    PNative.prototype.createGameClub = function () { };
    PNative.prototype.navigateToMiniProgram = function () { };
    PNative.prototype.shareMessageToFriend = function () { };
    PNative.prototype.sendMsgToOpenDataProject = function () { };
    PNative.prototype.makeShareUI = function (data, successCallback, failCallback, type, immediate) {
        if (type === void 0) { type = 0; }
        if (immediate === void 0) { immediate = false; }
        if (successCallback) {
            successCallback();
        }
    };
    PNative.prototype.httpRequest = function (url, callback, timeout, method, data) {
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
    PNative = __decorate([
        ccclass
    ], PNative);
    return PNative;
}(cc.Component));
exports.default = PNative;

cc._RF.pop();