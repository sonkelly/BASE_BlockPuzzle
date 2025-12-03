"use strict";
cc._RF.push(module, 'd8b71i+yCdKlJNjZ29oQx6N', 'PVivo');
// Scripts/PVivo.ts

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
var PVivo = /** @class */ (function (_super) {
    __extends(PVivo, _super);
    function PVivo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bh = 170;
        _this.bw = 0;
        _this.btop = 0;
        _this.bannerAd = null;
        _this.bannerAutoShow = false;
        _this.customAd = null;
        _this.moreGameBanner = null;
        _this.moreGamePortal = null;
        _this.rewardedVideoAd = null;
        return _this;
    }
    PVivo.prototype.init = function () {
        this.env = window['qg'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
    };
    PVivo.prototype.initAD = function () {
        var _this = this;
        this.loadInterstitial(false);
        this.createRewardedVideo(false);
        setTimeout(function () {
            _this.createMoreGamePortal(false, true);
        }, 10000);
    };
    PVivo.prototype.loadBanner = function (show) {
        this.hideBanner(true);
        if (!this.bannerAd) {
            this.btop = 0;
            if (window['lplatform'].cparam.bannerOnBottom) {
                this.btop = this.info.windowHeight - this.bh;
            }
            window['lplatform'].plog("loadBanner this.bh:" + this.bh + " this.btop:" + this.btop + " this.bw:" + this.bw + " lplatform.cparam.bannerID:" + window['lplatform'].cparam.bannerID);
            this.bannerAd = this.env.createBannerAd({
                posId: window['lplatform'].cparam.bannerID,
                adIntervals: 30,
                style: {}
            });
            this.bannerAd.onLoad(this.onBannerLoad.bind(this));
            this.bannerAd.onError(this.onBannerError.bind(this));
            this.bannerAd.onSize(this.onBannerResize.bind(this));
        }
        this.bannerAutoShow = show;
        if (show) {
            this.bannerAd.show();
        }
    };
    PVivo.prototype.showBanner = function () {
        this.loadBanner(true);
    };
    PVivo.prototype.showVivoInterstitial = function () {
        var _this = this;
        console.log("showVivoInterstitial");
        var ad = window['qg'].createInterstitialAd({
            posId: window['lplatform'].cparam.interstitialID
        });
        ad.onError(function (error) {
            console.log("插屏广告加载失败", JSON.stringify(error));
        });
        ad.show().then(function () {
            console.log("插屏广告展示完成");
            if (_this.customAd) {
                _this.customAd.destroy();
            }
        }).catch(function (error) {
            console.log("插屏广告展示失败", JSON.stringify(error));
        });
    };
    PVivo.prototype.loadInterstitial = function (show) {
        var _this = this;
        if (this.customAd) {
            this.customAd.destroy();
        }
        var ad = this.env.createCustomAd({
            posId: window['lplatform'].cparam.nativeID[0],
            style: {
                left: (this.info.windowWidth - 1080) / 2,
                top: (this.info.windowHeight - 720) / 2
            }
        });
        ad.onLoad(function () { });
        ad.onError(function (error) {
            console.log("createCustomAd Error", JSON.stringify(error));
            _this.showVivoInterstitial();
        });
        ad.onClose(function () {
            _this.loadInterstitial(false);
        });
        this.customAd = ad;
        if (show) {
            this.customAd.show();
        }
    };
    PVivo.prototype.showInterstitial = function () {
        this.loadInterstitial(true);
    };
    PVivo.prototype.createMoreGameBanner = function () {
        var _this = this;
        if (window['lplatform'].cparam.moreGameBannerId) {
            if (!this.moreGameBanner) {
                this.moreGameBanner = this.env.createBoxBannerAd({
                    posId: window['lplatform'].cparam.moreGameBannerId
                });
                this.moreGameBanner.onError(function (error, info) {
                    window['lplatform'].plog("\u76D1\u542C\u4E8B\u4EF6:" + JSON.stringify(error) + " " + JSON.stringify(info));
                });
            }
            this.moreGameBanner.show();
            if (window['lplatform'].cparam.moreGameBannerAutoCloseTime > 0) {
                setTimeout(function () {
                    _this.moreGameBanner.hide();
                }, window['lplatform'].cparam.moreGameBannerAutoCloseTime);
            }
        }
    };
    PVivo.prototype.createMoreGamePortal = function (destroyPrev, show) {
        if (destroyPrev === void 0) { destroyPrev = false; }
        if (show === void 0) { show = false; }
        if (typeof this.env.createBoxPortalAd === 'function') {
            if (destroyPrev && this.moreGamePortal) {
                window['lplatform'].plog("createMoreGamePortal destroyPrev");
                this.moreGamePortal.destroy();
                this.moreGamePortal = null;
            }
            if (!this.moreGamePortal) {
                var index = Math.floor(Math.random() * window['lplatform'].cparam.spreadBoxID.length);
                var posId = window['lplatform'].cparam.spreadBoxID[index];
                window['lplatform'].plog("createMoreGamePortal:" + posId);
                this.moreGamePortal = this.env.createBoxPortalAd({
                    posId: posId,
                    image: window['lplatform'].cparam.moreGamePortalIconUrl,
                    marginTop: window['lplatform'].cparam.moreGamePortalMarginTop
                });
            }
            if (show) {
                this.moreGamePortal.show().then(function () { }).catch(function (error) {
                    window['lplatform'].plog("createMoreGamePortal show fail:" + JSON.stringify(error));
                });
            }
        }
    };
    PVivo.prototype.createRewardedVideo = function (show) {
        if (window['lplatform'].cparam.rewardedVideoID && typeof this.env.createRewardedVideoAd === 'function') {
            if (!this.rewardedVideoAd) {
                this.rewardedVideoAd = this.env.createRewardedVideoAd({
                    posId: window['lplatform'].cparam.rewardedVideoID
                });
                this.rewardedVideoAd.onError(this.onRewardedVideoError.bind(this));
                this.rewardedVideoAd.onClose(this.onRewardedVideoClose.bind(this));
                this.rewardedVideoAd.onLoad(this.onRewardedVideoLoad.bind(this));
            }
            if (show) {
                this.showRewardedVideo(window['vcb']);
                cc.audioEngine.setMusicVolume(0);
                cc.audioEngine.setEffectsVolume(0);
            }
        }
    };
    PVivo.prototype.goToGameOrGameList = function () {
        window['lplatform'].plog("vivoGame未实现 goToGameOrGameList");
    };
    PVivo.prototype.showFavoriteGuide = function () {
        var _this = this;
        this.env.hasShortcutInstalled({
            success: function (result) {
                if (result === 0) {
                    _this.env.installShortcut({
                        success: function () { },
                        fail: function () { },
                        complete: function () { }
                    });
                }
                else {
                    _this.env.showToast({
                        message: "已创建桌面图标"
                    });
                }
            },
            fail: function () { },
            complete: function () { }
        });
    };
    PVivo.prototype.canRecord = function () {
        return false;
    };
    PVivo.prototype.canShareRecord = function () {
        return false;
    };
    PVivo.prototype.startRecord = function () { };
    PVivo.prototype.pauseRecord = function () { };
    PVivo.prototype.resumeRecord = function () { };
    PVivo.prototype.stopRecord = function () { };
    PVivo.prototype.shareRecord = function (data, callback) {
        if (callback) {
            callback();
        }
    };
    PVivo.prototype.resetRecord = function () { };
    PVivo.prototype.httpRequest = function (url, callback, timeout, method, data, headers, dataType) {
        if (dataType === void 0) { dataType = "text"; }
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
    PVivo.prototype.onBannerLoad = function () {
        // Banner广告加载回调
    };
    PVivo.prototype.onBannerError = function (error) {
        // Banner广告错误回调
    };
    PVivo.prototype.onBannerResize = function (size) {
        // Banner广告尺寸变化回调
    };
    PVivo.prototype.onRewardedVideoError = function (error) {
        // 激励视频错误回调
    };
    PVivo.prototype.onRewardedVideoClose = function () {
        // 激励视频关闭回调
    };
    PVivo.prototype.onRewardedVideoLoad = function () {
        // 激励视频加载回调
    };
    PVivo.prototype.hideBanner = function (immediate) {
        if (this.bannerAd) {
            this.bannerAd.hide();
        }
    };
    PVivo.prototype.showRewardedVideo = function (callback) {
        if (this.rewardedVideoAd) {
            this.rewardedVideoAd.show();
        }
    };
    PVivo = __decorate([
        ccclass
    ], PVivo);
    return PVivo;
}(cc.Class));
exports.default = PVivo;

cc._RF.pop();