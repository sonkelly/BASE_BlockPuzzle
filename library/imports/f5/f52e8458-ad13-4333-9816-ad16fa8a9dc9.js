"use strict";
cc._RF.push(module, 'f52e8RYrRNDM5gWrRb6ip3J', 'POppo');
// Scripts/POppo.ts

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
var PTT_1 = require("./PTT");
var POppo = /** @class */ (function (_super) {
    __extends(POppo, _super);
    function POppo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.yuanshengIndex = 0;
        _this.yuanshengADK = null;
        _this.env = null;
        _this.info = null;
        _this.bh = 0;
        _this.bw = 0;
        _this.gameRecorderManager = null;
        _this.rewardedVideoAd = null;
        _this.rewardedVideoIsLoaded = false;
        _this.moreGamePortal = null;
        _this.moreGameBanner = null;
        _this.btop = 0;
        _this.nativeAd = null;
        _this.customAd = null;
        return _this;
    }
    POppo.prototype.init = function () {
        this.env = window['qg'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        if (typeof this.env.getGameRecorder === 'function') {
            this.gameRecorderManager = this.env.getGameRecorder();
        }
    };
    POppo.prototype.initAD = function () {
        this.loadBanner(false);
        this.createRewardedVideo(false);
        this.loadMoreGamePortal(false);
    };
    POppo.prototype.createRewardedVideo = function (show) {
        if (window['lplatform'].cparam.rewardedVideoID) {
            if (!this.rewardedVideoAd && typeof this.env.createRewardedVideoAd === 'function') {
                this.rewardedVideoAd = this.env.createRewardedVideoAd({
                    adUnitId: window['lplatform'].cparam.rewardedVideoID
                });
                this.rewardedVideoAd.onError(this.onRewardedVideoError.bind(this));
                this.rewardedVideoAd.onClose(this.onRewardedVideoClose.bind(this));
                this.rewardedVideoAd.onLoad(this.onRewardedVideoLoad.bind(this));
            }
            if (show) {
                this.showRewardedVideo(window['vcb']);
            }
        }
    };
    POppo.prototype.showRewardedVideo = function (callback) {
        var _this = this;
        if (callback) {
            window['vcb'] = callback;
        }
        if (this.rewardedVideoAd) {
            window['lplatform'].plog("showRewardedVideo this.rewardedVideoIsLoaded:" + this.rewardedVideoIsLoaded);
            this.rewardedVideoAd.show().then(function () {
                window['lplatform'].plog("oppo的rewardedVideo.show().then()在视频结束时才调用，shit.");
            }).catch(function (error) {
                window['lplatform'].plog("showRewardedVideo catch:" + JSON.stringify(error));
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
    POppo.prototype.onRewardedVideoError = function (error, code) {
        _super.prototype.onRewardedVideoError.call(this, error, code);
        this.env.showToast({
            message: "广告展示失败，请稍后重试！"
        });
    };
    POppo.prototype.onRewardedVideoClose = function (data) {
        _super.prototype.onRewardedVideoClose.call(this, data);
    };
    POppo.prototype.showFavoriteGuide = function () {
        var _this = this;
        this.env.hasShortcutInstalled({
            success: function (result) {
                if (result === 0) {
                    _this.env.installShortcut({
                        success: function () {
                            _this.showToast("添加成功！");
                        },
                        fail: function () {
                            _this.showToast("添加失败！请稍后再试！");
                        },
                        complete: function () { }
                    });
                }
                else {
                    _this.showToast("桌面图标已存在！请勿重复创建");
                }
            },
            fail: function () {
                _this.showToast("添加失败！请稍后再试！");
            },
            complete: function () { }
        });
    };
    POppo.prototype.showToast = function (message) {
        this.env.showToast({
            title: message,
            icon: "none"
        });
    };
    POppo.prototype.createMoreGamePortal = function (show, load) {
        var _this = this;
        if (show === void 0) { show = false; }
        if (load === void 0) { load = false; }
        if (this.moreGamePortal) {
            console.log("直接显示", JSON.stringify(this.moreGamePortal));
            this.moreGamePortal.show().then(function () {
                console.log("show success");
            }).catch(function (error) {
                console.log("show fail with:" + error.errCode + "," + error.errMsg);
                if (window['moreGameButton']) {
                    window['moreGameButton'].active = false;
                }
                _this.moreGamePortal.destroy();
                _this.loadMoreGamePortal(true);
            });
        }
        else {
            console.log("加载后直接显示");
            this.loadMoreGamePortal(true);
        }
    };
    POppo.prototype.loadMoreGamePortal = function (show) {
        var _this = this;
        if (this.moreGamePortal) {
            this.moreGamePortal.destroy();
            this.moreGamePortal = null;
        }
        this.moreGamePortal = this.env.createGamePortalAd({
            adUnitId: window['lplatform'].cparam.spreadBoxID[0]
        });
        this.moreGamePortal.onLoad(function () {
            console.log("互推盒子九宫格广告加载成功");
            if (window['moreGameButton']) {
                window['moreGameButton'].active = true;
            }
            if (show) {
                _this.moreGamePortal.show().then(function () {
                    console.log("show success");
                }).catch(function (error) {
                    console.log("show fail with:" + error.errCode + "," + error.errMsg);
                    if (window['moreGameButton']) {
                        window['moreGameButton'].active = false;
                    }
                });
            }
        });
        this.moreGamePortal.onClose(function () {
            console.log("互推盒子九宫格广告关闭");
            _this.moreGamePortal.destroy().then(function () {
                console.log("destroy success");
            }).catch(function (error) {
                console.log("destroy fail with:" + error.errCode + "," + error.errMsg);
            });
            _this.loadMoreGamePortal(false);
        });
        this.moreGamePortal.onError(function (error) {
            if (window['moreGameButton']) {
                window['moreGameButton'].active = false;
            }
            console.log("\u4E92\u63A8\u76D2\u5B50\u4E5D\u5BAB\u683C\u52A0\u8F7D\u5931\u8D25" + JSON.stringify(error));
        });
    };
    POppo.prototype.createMoreGameButton = function () {
        // 空实现
    };
    POppo.prototype.createMoreGameBanner = function () {
        var _this = this;
        if (window['lplatform'].cparam.moreGameBannerId) {
            if (!this.moreGameBanner) {
                var height = window['lplatform'].cparam.moreGameBannerHeight;
                this.btop = 0;
                if (window['lplatform'].cparam.bannerOnBottom) {
                    this.btop = this.info.windowHeight - height;
                }
                this.moreGameBanner = this.env.createGameBannerAd({
                    adUnitId: window['lplatform'].cparam.moreGameBannerId
                });
                this.moreGameBanner.onError(function (error, code) {
                    window['lplatform'].plog("\u76D1\u542C\u4E8B\u4EF6:" + JSON.stringify(error) + " " + JSON.stringify(code));
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
    POppo.prototype.showShareMenu = function () {
        // 空实现
    };
    POppo.prototype.shareAppMessage = function () {
        // 空实现
    };
    POppo.prototype.canRecord = function () {
        if (this.gameRecorderManager && window['lplatform'].cparam.canRecord) {
            return true;
        }
        window['lplatform'].plog("POppo,不支持录制游戏画面");
        return false;
    };
    POppo.prototype.canShareRecord = function () {
        return false;
    };
    POppo.prototype.startRecord = function () {
        // 空实现
    };
    POppo.prototype.onGameRecordStart = function () {
        // 空实现
    };
    POppo.prototype.onGameRecordError = function () {
        // 空实现
    };
    POppo.prototype.pauseRecord = function () {
        // 空实现
    };
    POppo.prototype.resumeRecord = function () {
        // 空实现
    };
    POppo.prototype.stopRecord = function () {
        // 空实现
    };
    POppo.prototype.resetRecord = function () {
        // 空实现
    };
    POppo.prototype.shareInnerRecord = function () {
        // 空实现
    };
    POppo.prototype.showBanner = function () {
        _super.prototype.showBanner.call(this);
    };
    POppo.prototype.loadInterstitial = function () {
        var _this = this;
        window['lplatform'].plog("createNativeAd lplatform.cparam.nativeID:" + window['lplatform'].cparam.nativeID);
        var nativeIDs = window['lplatform'].cparam.nativeID;
        this.yuanshengIndex += 1;
        if (this.yuanshengIndex >= nativeIDs.length) {
            this.yuanshengIndex = 0;
        }
        if (this.nativeAd) {
            this.nativeAd.destroy();
            this.nativeAd = null;
        }
        var nativeAd = this.env.createNativeAd({
            adUnitId: nativeIDs[this.yuanshengIndex]
        });
        this.nativeAd = nativeAd;
        nativeAd.onLoad(function (data) {
            window['lplatform'].plog("nativeAd.onLoad:" + JSON.stringify(data));
            nativeAd.reportAdShow({
                adId: data.adList[0].adId
            });
            if (_this.yuanshengADK && _this.yuanshengADK.destroy) {
                //window['lplatform'].plog(`onLoad this.yuanshengADK.destroy:${this.yuanshengADK.destroy}`);
                _this.yuanshengADK.destroy();
            }
            if (window['lplatform'].labData.mainSwitch) {
                _this.yuanshengADK = window['lplatform'].uiEngine.createChaping(data.adList[0], function () {
                    _this.yuanshengADK = null;
                }, function () {
                    nativeAd.reportAdClick({
                        adId: data.adList[0].adId
                    });
                    _this.yuanshengADK = null;
                });
            }
        });
        nativeAd.onError(function (error) {
            console.log("nativeAd.onError:" + JSON.stringify(error));
            _this.loadNativeTemplate(true);
            nativeAd.destroy();
            if (_this.yuanshengADK && _this.yuanshengADK.destroy) {
                //window['lplatform'].plog(`onError this.yuanshengADK.destroy:${this.yuanshengADK.destroy}`);
                _this.yuanshengADK.destroy();
            }
        });
        nativeAd.load();
    };
    POppo.prototype.loadNativeTemplate = function (show) {
        if (window['lplatform'].cparam.nativeTemplateID) {
            var width = Math.min(this.info.windowWidth, this.info.windowHeight);
            var height = 9 * width / 16;
            var screenWidth = this.info.windowWidth;
            var customAd = this.env.createCustomAd({
                adUnitId: window['lplatform'].cparam.nativeTemplateID,
                style: {
                    top: (this.info.windowHeight - height) / 2,
                    left: 0.5 * screenWidth - 0.8 * width / 2,
                    width: 0.8 * width
                }
            });
            this.customAd = customAd;
            if (show) {
                customAd.show().then(function () {
                    console.log("show success");
                }).catch(function (error) {
                    console.log("show fail with:" + error.errCode + "," + error.errMsg);
                });
            }
        }
    };
    POppo.prototype.onInterstitialLoad = function () {
        // 空实现
    };
    POppo.prototype.onInterstitialError = function (code, message) {
        window['lplatform'].plog("onInterstitialError code:" + code + " msg:" + message);
    };
    POppo.prototype.onInterstitialClose = function () {
        // 空实现
    };
    POppo.prototype.showInterstitial = function () {
        if (window['lplatform'].labData.mainSwitch && window['lplatform'].labData.mainSwitch === 1) {
            this.loadInterstitial();
        }
    };
    POppo.prototype.hideInterstitial = function () {
        // 空实现
    };
    POppo.prototype.onGameRecordStop = function (data) {
        _super.prototype.onGameRecordStop.call(this, data);
        this.gameRecorderManager.saveToAlbum();
    };
    POppo.prototype.shareRecord = function () {
        // 空实现
    };
    POppo.prototype.makeShareUI = function (data, success, fail, type, show) {
        if (type === void 0) { type = 0; }
        if (show === void 0) { show = false; }
        if (success) {
            success();
        }
    };
    POppo.prototype.analytics = function () {
        // 空实现
    };
    POppo.prototype.httpRequest = function (url, callback, timeout, method, data) {
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
    POppo.prototype.goToGameOrGameList = function () {
        window['lplatform'].plog("Oppo未实现 goToGameOrGameList");
    };
    // 需要从父类继承的方法
    POppo.prototype.loadBanner = function (show) {
        // 实现逻辑
    };
    POppo.prototype.onRewardedVideoLoad = function () {
        // 实现逻辑
    };
    POppo.prototype.loadRewardedVideo = function (show) {
        // 实现逻辑
    };
    POppo = __decorate([
        ccclass
    ], POppo);
    return POppo;
}(PTT_1.default));
exports.default = POppo;

cc._RF.pop();