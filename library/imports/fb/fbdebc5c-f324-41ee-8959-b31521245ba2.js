"use strict";
cc._RF.push(module, 'fbdebxc8yRB7olZsxUhJFui', 'PUC');
// Scripts/PUC.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ccclass = cc._decorator.ccclass;
var PUC = /** @class */ (function () {
    function PUC() {
        this.env = null;
        this.bannerAd = null;
        this.rewardedVideoAd = null;
        this.rewardedVideoLoadTimeout = 0;
        this.rewardedVideoIAutoShow = false;
        this.rewardedVideoIsLoaded = false;
        this.rewardedVideoTimeMax = 30000;
    }
    PUC.prototype.init = function () {
        this.env = uc;
    };
    PUC.prototype.initAD = function () { };
    PUC.prototype.loadBanner = function (show) {
        if (show === void 0) { show = false; }
        if (!this.bannerAd) {
            var config = {
                style: {
                    width: lplatform.cparam.bannerWidth,
                    height: lplatform.cparam.bannerHeight,
                    gravity: 7
                }
            };
            this.bannerAd = uc.createBannerAd(config);
            this.bannerAd.onLoad(function () { });
            this.bannerAd.onError(function () { });
            if (show) {
                this.bannerAd.show();
            }
        }
    };
    PUC.prototype.showBanner = function () {
        this.hideBanner();
        if (this.bannerAd) {
            this.bannerAd.show();
        }
        else {
            this.loadBanner(true);
        }
    };
    PUC.prototype.hideBanner = function () {
        if (this.bannerAd) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
    };
    PUC.prototype.hideInterstitial = function () { };
    PUC.prototype.createRewardedVideo = function (autoShow) {
        if (autoShow === void 0) { autoShow = false; }
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
    };
    PUC.prototype.loadRewardedVideo = function (autoShow) {
        if (autoShow === void 0) { autoShow = false; }
        this.createRewardedVideo(autoShow);
        lplatform.plog("loadRewardedVideo this.rewardedVideoAd.load()");
    };
    PUC.prototype.onRewardedVideoLoad = function () {
        lplatform.plog("onRewardedVideoLoad this.rewardedVideoIAutoShow:" + this.rewardedVideoIAutoShow);
    };
    PUC.prototype.onRewardedVideoError = function (error, message) {
        lplatform.plog("onRewardedVideoError code:" + JSON.stringify(error) + " msg:" + message);
        this.resetRewardedVideo();
    };
    PUC.prototype.onRewardedVideoClose = function (result) {
        lplatform.plog("onRewardedVideoClose res.isEnded:" + result.isEnded);
        if (result.isEnded) {
            lplatform.plog("onRewardedVideoClose window.vcb:" + window.vcb);
            if (window.vcb) {
                window.vcb(result.isEnded);
            }
            this.resetRewardedVideo(false, true);
            this.loadRewardedVideo(false);
        }
        else if (lplatform.labData.openSecondTipVideo) {
            var self_1 = this;
            self_1.env.showModal({
                title: "继续吗",
                content: "观看完视频才能获得奖励哦",
                success: function (response) {
                    if (response.confirm) {
                        self_1.showRewardedVideo(window.vcb);
                    }
                    else if (response.cancel) {
                        if (window.vcb) {
                            window.vcb(result.isEnded);
                        }
                        self_1.resetRewardedVideo(false, true);
                        self_1.loadRewardedVideo(false);
                    }
                }
            });
        }
    };
    PUC.prototype.showRewardedVideo = function (callback) {
        var _this = this;
        lplatform.plog("showRewardedVideo vcb:" + callback);
        if (callback) {
            window.vcb = callback;
        }
        if (this.rewardedVideoAd) {
            this.showLoading();
            this.rewardedVideoLoadTimeout = setTimeout(function () {
                lplatform.plog("rewardedVideoLoadTimeout 广告超时 timeMax:" + _this.rewardedVideoTimeMax);
                clearTimeout(_this.rewardedVideoLoadTimeout);
                if (window.vcb) {
                    window.vcb(false, "广告超时");
                }
                _this.resetRewardedVideo(true, true);
            }, this.rewardedVideoTimeMax);
            lplatform.plog("showRewardedVideo this.rewardedVideoIsLoaded:" + this.rewardedVideoIsLoaded);
            this.rewardedVideoAd.show().then(function () {
                lplatform.plog("showRewardedVideo then ");
                _this.hideLoading();
                clearTimeout(_this.rewardedVideoLoadTimeout);
            }).catch(function (error) {
                lplatform.plog("showRewardedVideo catch:" + JSON.stringify(error));
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
    PUC.prototype.resetRewardedVideo = function (destroyAd, clearCallback) {
        if (destroyAd === void 0) { destroyAd = false; }
        if (clearCallback === void 0) { clearCallback = false; }
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
    };
    PUC.prototype.shareAppMessage = function () { };
    PUC.prototype.makeShareUI = function (title, callback, image, type, force) {
        if (type === void 0) { type = 0; }
        if (force === void 0) { force = false; }
        if (callback) {
            callback();
        }
    };
    PUC.prototype.analytics = function () { };
    PUC.prototype.showFavoriteGuide = function () { };
    PUC.prototype.canRecord = function () {
        return false;
    };
    PUC.prototype.canShareRecord = function () {
        return false;
    };
    PUC.prototype.startRecord = function () { };
    PUC.prototype.pauseRecord = function () { };
    PUC.prototype.resumeRecord = function () { };
    PUC.prototype.stopRecord = function () { };
    PUC.prototype.shareRecord = function (title, callback) {
        if (callback) {
            callback();
        }
    };
    PUC.prototype.resetRecord = function () { };
    PUC.prototype.showLoading = function () {
        // Implement loading show logic
    };
    PUC.prototype.hideLoading = function () {
        // Implement loading hide logic
    };
    PUC = __decorate([
        ccclass
    ], PUC);
    return PUC;
}());
exports.default = PUC;

cc._RF.pop();