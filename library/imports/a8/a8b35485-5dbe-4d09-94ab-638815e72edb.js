"use strict";
cc._RF.push(module, 'a8b35SFXb5NCZSrY4gV5y7b', 'PHuaWei');
// Scripts/PHuaWei.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PHuaWei = /** @class */ (function () {
    function PHuaWei() {
        this.bh = 170;
        this.bw = 0;
        this.btop = 0;
        this.bannerAd = null;
        this.moreGameBanner = null;
        this.yuanshengIndex = 0;
        this.yuanshengADK = null;
        this.rewardedVideoAd = null;
        this.gameRecordShareBtn = null;
        this.onRewardedVideoError = null;
        this.onRewardedVideoClose = null;
        this.onRewardedVideoLoad = null;
        this.gameRecorderManager = null;
    }
    PHuaWei.prototype.init = function () {
        this.env = window['qg'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
    };
    PHuaWei.prototype.initAD = function () {
        window['lplatform'].plog("PHuaWei constructor initAD");
        this.env.setUnderAgeOfPromise(false);
        this.env.setNonPersonalizedAd(false);
        this.createRewardedVideo(false);
    };
    PHuaWei.prototype.loadBanner = function () {
        this.hideBanner(false);
        if (!this.bannerAd) {
            this.btop = 0;
            if (window['lplatform'].cparam.bannerOnBottom) {
                this.btop = this.info.windowHeight - this.bh;
            }
            window['lplatform'].plog("loadBanner this.bh:" + this.bh + " this.btop:" + this.btop + " this.bw:" + this.bw);
            this.bannerAd = this.env.createBannerAd({
                adUnitId: window['lplatform'].cparam.bannerID,
                adIntervals: 60,
                style: {
                    width: this.bw,
                    height: this.bh,
                    left: 0,
                    top: 720
                }
            });
            this.bannerAd.onError(function (e) {
                console.log("bannerAd 广告加载出错", e);
            });
            this.bannerAd.onLoad(function () {
                console.log("bannerAd 广告加载成功");
            });
            this.bannerAd.onClose(function () {
                console.log("bannerAd 广告关闭");
            });
        }
        this.bannerAd.show();
    };
    PHuaWei.prototype.showBanner = function () {
        this.hideBanner();
        if (window['lplatform'].labData.mainSwitch) {
            this.loadBanner();
        }
    };
    PHuaWei.prototype.hideBanner = function (e) {
        if (e === void 0) { e = false; }
        if (this.bannerAd) {
            this.bannerAd.hide();
            if (e) {
                this.bannerAd.offLoad(this.onBannerLoad);
                this.bannerAd.offError(this.onBannerError);
                this.bannerAd.offResize(this.onBannerResize);
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
        if (this.moreGameBanner) {
            this.moreGameBanner.hide();
        }
    };
    PHuaWei.prototype.onBannerLoad = function () { };
    PHuaWei.prototype.onBannerError = function () { };
    PHuaWei.prototype.onBannerResize = function () { };
    PHuaWei.prototype.loadInterstitial = function () {
        var _this = this;
        this.createMoreGamePortal(false, true);
        window['lplatform'].plog("createNativeAd lplatform.cparam.nativeID:" + window['lplatform'].cparam.nativeID);
        var nativeIDs = window['lplatform'].cparam.nativeID;
        this.yuanshengIndex += 1;
        if (this.yuanshengIndex >= nativeIDs.length) {
            this.yuanshengIndex = 0;
        }
        var nativeAd = this.env.createNativeAd({
            adUnitId: nativeIDs[this.yuanshengIndex],
            success: function (e) {
                console.log("loadNativeAd loadNativeAd : success " + e);
            },
            fail: function (e, t) {
                console.log("loadNativeAd loadNativeAd fail: " + e + "," + t);
            },
            complete: function () {
                nativeAd.load();
            }
        });
        nativeAd.onLoad(function (t) {
            window['lplatform'].plog("nativeAd.onLoad:" + JSON.stringify(t));
            nativeAd.reportAdShow({
                adId: t.adList[0].adId
            });
            if (_this.yuanshengADK) {
                //window['lplatform'].plog(`this.yuanshengADK.destroy:${this.yuanshengADK.destroy}`);
                _this.yuanshengADK.destroy();
            }
            _this.yuanshengADK = window['lplatform'].uiEngine.createChaping(t.adList[0], function () {
                _this.yuanshengADK = null;
            }, function () {
                nativeAd.reportAdClick({
                    adId: t.adList[0].adId
                });
                _this.yuanshengADK = null;
            });
            _this.env.onShow(function (n) {
                // console.log(`lyn qg.onShow:${JSON.stringify(n)} nativeAd:${nativeAd} ts.yuanshengADK:${this.yuanshengADK}`);
                if (nativeAd && _this.yuanshengADK) {
                    console.log("qg.onShow reportAdShow:" + t.adList[0].adId);
                    nativeAd.reportAdShow({
                        adId: t.adList[0].adId
                    });
                }
            });
            _this.env.onHide(function () { });
        });
        nativeAd.onError(function (t) {
            console.log("nativeAd.onError:" + JSON.stringify(t));
            _this.showBanner();
        });
    };
    PHuaWei.prototype.createRewardedVideo = function (e) {
        var _this = this;
        if (!window['lplatform'].cparam.rewardedVideoID)
            return;
        if (!this.rewardedVideoAd && typeof this.env.createRewardedVideoAd === 'function') {
            this.rewardedVideoAd = this.env.createRewardedVideoAd({
                adUnitId: window['lplatform'].cparam.rewardedVideoID,
                success: function () { },
                fail: function (e, t) {
                    console.log("loadAndShowVideoAd createRewardedVideoAd fail: " + e + "," + t);
                    if (_this.onRewardedVideoError) {
                        _this.onRewardedVideoError({
                            msg: "createRewardedVideoAd fail"
                        }, "createRewardedVideoAd fail");
                    }
                },
                complete: function () {
                    _this.rewardedVideoAd.load();
                    if (e) {
                        _this.showRewardedVideo(window['vcb']);
                    }
                }
            });
            this.rewardedVideoAd.onError(this.onRewardedVideoError.bind(this));
            this.rewardedVideoAd.onClose(this.onRewardedVideoClose.bind(this));
            this.rewardedVideoAd.onLoad(this.onRewardedVideoLoad.bind(this));
        }
    };
    PHuaWei.prototype.canRecord = function () {
        if (this.gameRecorderManager && window['lplatform'].cparam.canRecord) {
            return true;
        }
        window['lplatform'].plog("huaWei,不支持录制游戏画面");
        return false;
    };
    PHuaWei.prototype.shareAppMessage = function () {
        this.env.serviceShare({
            shareType: 0,
            title: window['lplatform'].cparam.shareAppTitle,
            summary: window['lplatform'].cparam.shareAppTitle,
            imagePath: window['lplatform'].cparam.shareAppImgUrl,
            targetUrl: window['lplatform'].cparam.shareAppImgUrl,
            mediaUrl: window['lplatform'].cparam.shareAppImgUrl,
            platforms: "",
            fail: function (e, t) {
                console.log("service share fail:" + t + e);
            },
            cancel: function () {
                console.log("cancel");
            }
        });
    };
    PHuaWei.prototype.makeShareUI = function (e, t, o, n, a) {
        var _this = this;
        if (n === void 0) { n = 0; }
        if (a === void 0) { a = false; }
        window['lplatform'].uiEngine.CreateShareK(function () {
            _this.shareRecord(e, t);
        }, function () {
            if (t)
                t();
            if (_this.gameRecordShareBtn) {
                _this.gameRecordShareBtn.hide();
            }
        }, o, n, a);
    };
    PHuaWei.prototype.shareRecord = function (e, t) {
        this.shareAppMessage();
    };
    PHuaWei.prototype.createMoreGameButton = function () { };
    PHuaWei.prototype.createMoreGameBanner = function () { };
    PHuaWei.prototype.createMoreGamePortal = function (e, t) { };
    PHuaWei.prototype.goToGameOrGameList = function () {
        //window['lplatform'].plog("huaWei未实现 goToGameOrGameList");
    };
    PHuaWei.prototype.showRewardedVideo = function (callback) {
        // Implementation for showing rewarded video
    };
    PHuaWei = __decorate([
        ccclass
    ], PHuaWei);
    return PHuaWei;
}());
exports.default = PHuaWei;

cc._RF.pop();