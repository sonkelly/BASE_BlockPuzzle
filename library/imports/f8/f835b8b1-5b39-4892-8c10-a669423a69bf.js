"use strict";
cc._RF.push(module, 'f835bixWzlIkowQpmlCOmm/', 'PBaiDu');
// Scripts/PBaiDu.ts

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
var PWX_1 = require("./PWX");
var PBaiDu = /** @class */ (function (_super) {
    __extends(PBaiDu, _super);
    function PBaiDu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bh = 0;
        _this.bw = 0;
        _this.btop = 0;
        _this.bannerAd = null;
        _this.bannerAutoShow = false;
        _this.rewardedVideoAd = null;
        _this.gameRecorderManager = null;
        _this.recordStartCb = null;
        _this.recordStopCb = null;
        _this.videoPath = null;
        _this.gameRecordStartTime = 0;
        _this.gameRecordStopTime = 0;
        _this.moreGameBtn = null;
        return _this;
    }
    PBaiDu.prototype.init = function () {
        this.env = window['swan'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        this.gameRecorderManager = this.env.getVideoRecorderManager();
        this.createMoreGameButton();
        this.showShareMenu();
    };
    PBaiDu.prototype.initAD = function () {
        this.loadBanner(false);
        this.createRewardedVideo(false);
    };
    PBaiDu.prototype.loadBanner = function (autoShow) {
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
    };
    PBaiDu.prototype.onBannerLoad = function () {
        // Banner广告加载成功处理
    };
    PBaiDu.prototype.onBannerError = function (error) {
        // Banner广告错误处理
    };
    PBaiDu.prototype.onBannerResize = function (res) {
        this.btop = 0;
        if (window['lplatform'].cparam.bannerOnBottom) {
            this.btop = this.info.windowHeight - res.height;
        }
        this.bannerAd.style.top = this.btop;
        this.bannerAd.style.left = 0;
    };
    PBaiDu.prototype.hideBanner = function (destroy) {
        if (this.bannerAd) {
            this.bannerAd.hide();
            if (destroy) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
    };
    PBaiDu.prototype.createRewardedVideo = function (autoShow) {
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
    };
    PBaiDu.prototype.showRewardedVideo = function (callback) {
        window['lplatform'].pauseGame();
        _super.prototype.showRewardedVideo.call(this, callback);
    };
    PBaiDu.prototype.onRewardedVideoError = function (error, info) {
        _super.prototype.onRewardedVideoError.call(this, error, info);
        window['lplatform'].resumeGame();
    };
    PBaiDu.prototype.onRewardedVideoClose = function (res) {
        _super.prototype.onRewardedVideoClose.call(this, res);
        window['lplatform'].resumeGame();
    };
    PBaiDu.prototype.loadInterstitial = function () {
        // 插屏广告加载
    };
    PBaiDu.prototype.onInterstitialClose = function () {
        // 插屏广告关闭处理
    };
    PBaiDu.prototype.showInterstitial = function () {
        // 显示插屏广告
    };
    PBaiDu.prototype.hideInterstitial = function () {
        // 隐藏插屏广告
    };
    PBaiDu.prototype.showFavoriteGuide = function () {
        window['lplatform'].plog("PBaiDu,showFavoriteGuide");
        if (typeof this.env.showFavoriteGuide === 'function') {
            this.env.showFavoriteGuide({
                type: "tip",
                content: "一键添加到我的小程序"
            });
        }
    };
    PBaiDu.prototype.showAddToDesktopGuide = function () {
        if (typeof this.env.showAddToDesktopGuide === 'function') {
            this.env.showAddToDesktopGuide({
                type: "bar-autohide",
                content: "一键添加到我的桌面",
                success: function (res) {
                    console.log("添加成功：", res);
                },
                fail: function (err) {
                    console.log("添加失败：", err);
                }
            });
        }
    };
    PBaiDu.prototype.showShareMenu = function () {
        if (typeof this.env.showShareMenu === 'function') {
            this.env.showShareMenu({
                success: function () { },
                fail: function () { },
                complete: function () { }
            });
        }
        this.env.onShareAppMessage(function () {
            return {
                title: window['lplatform'].cparam.shareAppTitle,
                imageUrl: window['lplatform'].cparam.shareAppImgUrl,
                query: "key1=1&key2=2&key3=3",
                success: function (res) {
                    window['lplatform'].plog("onShareAppMessage share success", JSON.stringify(res));
                },
                fail: function (err) {
                    window['lplatform'].plog("onShareAppMessage share fail", JSON.stringify(err));
                }
            };
        });
    };
    PBaiDu.prototype.shareAppMessage = function () {
        this.env.shareAppMessage({
            title: window['lplatform'].cparam.shareAppTitle,
            imageUrl: window['lplatform'].cparam.shareAppImgUrl
        });
    };
    PBaiDu.prototype.canRecord = function () {
        if (this.gameRecorderManager && window['lplatform'].cparam.canRecord) {
            return true;
        }
        window['lplatform'].plog("PBaiDu,不支持录制游戏画面");
        return false;
    };
    PBaiDu.prototype.startRecord = function (callback) {
        if (this.canRecord()) {
            window['lplatform'].plog("startRecord");
            this.recordStartCb = callback;
            this.videoPath = null;
            this.gameRecorderManager.start({ duration: 30 });
            this.gameRecorderManager.onStart(this.onGameRecordStart.bind(this));
            this.gameRecorderManager.onError(this.onGameRecordError.bind(this));
            this.gameRecorderManager.onStop(this.onGameRecordStop.bind(this));
            var self_1 = this;
            this.env.onShow(function () {
                window['lplatform'].plog("startRecord this.env.onShow");
                self_1.resumeRecord();
            });
            this.env.onHide(function () {
                window['lplatform'].plog("startRecord this.env.onHide");
                self_1.pauseRecord();
            });
        }
    };
    PBaiDu.prototype.onGameRecordStart = function () {
        window['lplatform'].plog("PBaiDu,onGameRecordStart");
        this.gameRecordStartTime = Date.now();
        if (this.recordStartCb) {
            this.recordStartCb();
            this.recordStartCb = null;
        }
    };
    PBaiDu.prototype.onGameRecordError = function (error) {
        window['lplatform'].plog("onGameRecordError:" + JSON.stringify(error), "error");
    };
    PBaiDu.prototype.onGameRecordStop = function (res) {
        window['lplatform'].plog("onGameRecordStop this.recordStopCb:" + this.recordStopCb);
        this.gameRecordStopTime = Date.now();
        if (this.gameRecordStopTime - this.gameRecordStartTime > 4500) {
            this.videoPath = res.videoPath;
        }
        else {
            window['lplatform'].plog("onGameRecordStop 实际录屏时间少于5秒就有可能分享失败");
        }
        if (this.recordStopCb) {
            this.recordStopCb(this.videoPath);
            this.recordStopCb = null;
        }
    };
    PBaiDu.prototype.pauseRecord = function () {
        this.gameRecorderManager.pause();
    };
    PBaiDu.prototype.resumeRecord = function () {
        this.gameRecorderManager.resume();
    };
    PBaiDu.prototype.stopRecord = function (callback) {
        window['lplatform'].plog("stopRecord cb:" + callback);
        if (this.canRecord()) {
            this.recordStopCb = callback;
            this.gameRecorderManager.stop();
        }
    };
    PBaiDu.prototype.shareRecord = function (successCallback, failCallback) {
        window['lplatform'].plog("PBaiDu,shareRecord videoPath:" + this.videoPath);
        if (this.canShareRecord()) {
            this.env.shareVideo({
                videoPath: this.videoPath,
                success: function () {
                    successCallback && successCallback();
                },
                fail: function (error) {
                    failCallback && failCallback(error);
                }
            });
        }
        else {
            this.shareAppMessage();
        }
    };
    PBaiDu.prototype.resetRecord = function () {
        this.stopRecord(function () { });
        this.videoPath = null;
    };
    PBaiDu.prototype.createMoreGameButton = function () {
        this.createRecommendationButton();
    };
    PBaiDu.prototype.createMoreGameBanner = function () {
        // 创建更多游戏横幅
    };
    PBaiDu.prototype.createMoreGamePortal = function () {
        // 创建更多游戏入口
    };
    PBaiDu.prototype.createRecommendationButton = function () {
        if (typeof this.env.createRecommendationButton === 'function') {
            if (this.moreGameBtn) {
                this.moreGameBtn.show();
            }
            else {
                this.moreGameBtn = this.env.createRecommendationButton({
                    type: "list",
                    style: {
                        left: window['lplatform'].cparam.moreGameLeft * window['lplatform'].systemInfo.windowWidth,
                        top: window['lplatform'].cparam.moreGameTop * window['lplatform'].systemInfo.windowHeight
                    }
                });
                var self_2 = this;
                this.moreGameBtn.onLoad(function () {
                    self_2.moreGameBtn.show();
                    self_2.moreGameBtn.offLoad(function () { });
                });
                this.moreGameBtn.load();
            }
        }
    };
    PBaiDu.prototype.makeShareUI = function (successCallback, failCallback, type, delay, autoHide) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (autoHide === void 0) { autoHide = false; }
        window['lplatform'].uiEngine.CreateShareK(function () {
            _this.shareRecord(successCallback, failCallback);
        }, function () {
            failCallback && failCallback();
            if (_this.gameRecordShareBtn) {
                _this.gameRecordShareBtn.hide();
            }
        }, type, delay, autoHide);
    };
    PBaiDu.prototype.goToGameOrGameList = function () {
        this.navigateToMiniProgram();
    };
    PBaiDu.prototype.navigateToMiniProgram = function (appKey) {
        this.env.navigateToMiniProgram({
            appKey: appKey || window['lplatform'].cparam.navigateToId[0],
            path: "/path/page/0",
            extraData: {},
            success: function (res) {
                console.log("navigateToMiniProgram success", res);
            },
            fail: function (err) {
                console.log("navigateToMiniProgram fail", err);
            }
        });
    };
    PBaiDu.prototype.canShareRecord = function () {
        return !!this.videoPath;
    };
    PBaiDu = __decorate([
        ccclass
    ], PBaiDu);
    return PBaiDu;
}(PWX_1.default));
exports.default = PBaiDu;

cc._RF.pop();