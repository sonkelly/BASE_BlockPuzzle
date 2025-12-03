"use strict";
cc._RF.push(module, 'c36c2p25N1JG7bxkPuos/DM', 'PQQ');
// Scripts/PQQ.ts

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
var PQQ = /** @class */ (function (_super) {
    __extends(PQQ, _super);
    function PQQ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moreGamePortal = null;
        _this.moreGameBanner = null;
        _this.moreGameBannerLeft = 16;
        _this.moreGameBannerTop = 16;
        _this.multiMoreGameBanner = [];
        _this.bh = 0;
        _this.bw = 0;
        _this.logined = false;
        return _this;
    }
    PQQ.prototype.onLoad = function () {
        this.init();
    };
    PQQ.prototype.init = function () {
        this.env = window['qq'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.sceneID = this.env.getLaunchOptionsSync().scene;
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        this.logined = false;
        this.showShareMenu();
        this.checkLogin();
    };
    PQQ.prototype.initAD = function () {
        this.loadBanner(false);
        this.loadInterstitial(false);
        this.createRewardedVideo(false);
    };
    PQQ.prototype.checkLogin = function () {
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
    PQQ.prototype.showFavoriteGuide = function () {
        this.env.addToFavorites({
            title: "加关注，不迷路。",
            imageUrl: "",
            query: "a=1&b=2",
            success: function () { },
            fail: function (e) {
                console.log("addToFavorites fail", e);
            },
            complete: function () { }
        });
        setTimeout(function () {
            this.saveAppToDesktop();
        }.bind(this), 15000);
        setTimeout(function () {
            this.addRecentColorSign();
        }.bind(this), 100000);
    };
    PQQ.prototype.showShareMenu = function () {
        if (typeof this.env.showShareMenu === 'function') {
            this.env.showShareMenu({
                showShareItems: ["qq", "qzone", "wechatFriends", "wechatMoment"]
            });
        }
        this.env.onShareAppMessage(function () {
            window['lplatform'].plog("onShareAppMessage lplatform.cparam.shareAppImgUrl:" + window['lplatform'].cparam.shareAppImgUrl);
            return {
                title: window['lplatform'].cparam.shareAppTitle,
                imageUrl: window['lplatform'].cparam.shareAppImgUrl
            };
        });
    };
    PQQ.prototype.shareAppMessage = function (successCallback, failCallback) {
        window['lplatform'].plog("shareAppMessage lplatform.cparam.shareAppImgUrl:" + window['lplatform'].cparam.shareAppImgUrl);
        this.env.shareAppMessage({
            title: window['lplatform'].cparam.shareAppTitle,
            imageUrl: window['lplatform'].cparam.shareAppImgUrl,
            success: function () {
                successCallback && successCallback();
            },
            fail: function () {
                failCallback && failCallback();
            }
        });
    };
    PQQ.prototype.shareRecord = function (successCallback, failCallback) {
        this.shareAppMessage(successCallback, failCallback);
    };
    PQQ.prototype.makeShareUI = function (successCallback, failCallback, type, delay, autoHide) {
        if (delay === void 0) { delay = 0; }
        if (autoHide === void 0) { autoHide = false; }
        window['lplatform'].uiEngine.CreateShareK(function () {
            this.shareRecord(successCallback, failCallback);
        }.bind(this), function () {
            failCallback && failCallback();
            this.gameRecordShareBtn && this.gameRecordShareBtn.hide();
        }.bind(this), type, delay, false);
    };
    PQQ.prototype.showInterstitial = function () {
        var self = this;
        if (window['lplatform'].labData.mainSwitch && window['lplatform'].labData.mainSwitch === 1) {
            if (this.insterstitialAd) {
                this.insterstitialAd.show().catch(function (t) {
                    window['lplatform'].plog("showInterstitial cache:" + JSON.stringify(t));
                    self.createMoreGamePortal(true, true);
                });
            }
            else {
                this.loadInterstitial(true);
            }
        }
    };
    PQQ.prototype.hideInterstitial = function () {
        if (this.moreGamePortal) {
            this.moreGamePortal.destroy();
        }
    };
    PQQ.prototype.createMoreGamePortal = function (forceCreate, autoShow) {
        if (forceCreate === void 0) { forceCreate = false; }
        if (autoShow === void 0) { autoShow = true; }
        var self = this;
        if (typeof this.env.createAppBox === 'function' &&
            window['lplatform'].cparam.moreGamePortalAppId &&
            window['lplatform'].cparam.moreGamePortalAppId.length > 0) {
            if (forceCreate && this.moreGamePortal) {
                this.moreGamePortal.destroy();
                this.moreGamePortal = null;
            }
            if (!this.moreGamePortal) {
                var randomIndex = Math.floor(Math.random() * window['lplatform'].cparam.moreGamePortalAppId.length);
                var appId = window['lplatform'].cparam.moreGamePortalAppId[randomIndex];
                window['lplatform'].plog("QQ createMoreGamePortal baid:" + appId);
                this.moreGamePortal = this.env.createAppBox({
                    adUnitId: appId
                });
            }
            window['lplatform'].plog("QQ createMoreGamePortal autoShow:" + autoShow);
            this.moreGamePortal.load().then(function () {
                if (autoShow) {
                    self.moreGamePortal.show();
                }
            }).catch(function (e) {
                window['lplatform'].plog("moreGamePortal load catch:" + JSON.stringify(e));
                self.env.showToast({
                    title: "暂无广告",
                    icon: "none",
                    duration: 2000
                });
            });
        }
    };
    PQQ.prototype.showRealBanner = function () {
        if (this.bannerAd) {
            console.log("is have Banner");
            this.bannerAd.show();
        }
        else {
            console.log("no Banner");
            this.loadBanner(true);
        }
    };
    PQQ.prototype.showBanner = function () {
        this.hideBanner();
        if (window['lplatform'].labData.mainSwitch) {
            if (Math.random() <= window['lplatform'].cparam.moreGameBannerPercent) {
                this.createMoreGameBanner(true, true);
            }
            else {
                this.showRealBanner();
            }
        }
    };
    PQQ.prototype.hideBanner = function (destroy) {
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
        }
    };
    PQQ.prototype.hideMoreGameBanner = function () {
        if (this.moreGameBanner) {
            this.moreGameBanner.offResize(function () { });
            this.moreGameBanner.offLoad(function () { });
            this.moreGameBanner.offError(function () { });
            this.moreGameBanner.destroy();
            this.moreGameBanner = null;
        }
    };
    PQQ.prototype.createMoreGameBanner = function (forceCreate, autoShow) {
        if (forceCreate === void 0) { forceCreate = false; }
        if (autoShow === void 0) { autoShow = false; }
        if (typeof this.env.createBlockAd === 'function' && window['lplatform'].cparam.moreGameBannerAppId) {
            var self_1 = this;
            if (forceCreate && this.moreGameBanner) {
                this.moreGameBanner.offResize(function () { });
                this.moreGameBanner.offLoad(function () { });
                this.moreGameBanner.offError(function () { });
                this.moreGameBanner.destroy();
                this.moreGameBanner = null;
            }
            if (!this.moreGameBanner) {
                var randomIndex = Math.floor(Math.random() * window['lplatform'].cparam.moreGameBannerAppId.length);
                var appId = window['lplatform'].cparam.moreGameBannerAppId[randomIndex];
                window['lplatform'].plog("QQ createMoreGameBanner baid:" + appId + " this.moreGameBannerLeft:" + this.moreGameBannerLeft + " this.moreGameBannerTop:" + this.moreGameBannerTop);
                this.moreGameBanner = this.env.createBlockAd({
                    adUnitId: appId,
                    style: {
                        left: Math.max(0, this.moreGameBannerLeft),
                        top: Math.max(0, this.moreGameBannerTop)
                    },
                    size: 5,
                    orientation: "vertical"
                });
                this.moreGameBanner.onResize(function (e) {
                    self_1.moreGameBannerTop = 0;
                    self_1.moreGameBanner.style.top = Math.max(0, (self_1.info.windowHeight - e.height) / 2);
                    self_1.moreGameBanner.style.left = 10;
                    window['lplatform'].plog("QQ createMoreGameBanner onResize size:" + JSON.stringify(e) + " top:" + self_1.moreGameBanner.style.top + " left:" + self_1.moreGameBanner.style.left);
                });
                this.moreGameBanner.onLoad(function () {
                    window['lplatform'].plog("QQ createMoreGameBanner onLoad autoShow:" + autoShow);
                    if (autoShow) {
                        self_1.moreGameBanner.show();
                    }
                });
                this.moreGameBanner.onError(function (e) {
                    window['lplatform'].plog("QQ createmoreGameBanner onError res:" + JSON.stringify(e));
                });
            }
        }
    };
    PQQ.prototype.createOutMoreGameBanner = function (position, size, orientation, appId) {
        var x = position.x;
        var y = position.y;
        var banner = this.env.createBlockAd({
            adUnitId: appId,
            style: {
                left: x,
                top: y
            },
            size: size || 1,
            orientation: orientation || "vertical"
        });
        banner.onResize(function (resizeInfo) {
            banner.style.left = Math.max(0, position.x - resizeInfo.width / 2 / 1);
            banner.style.top = 10;
        });
        banner.onLoad(function () {
            banner.show();
        });
        banner.onError(function (e) {
            window['lplatform'].plog("QQ createOutMoreGameBanner onError res:" + JSON.stringify(e));
        });
        return banner;
    };
    PQQ.prototype.createMultiMoreGameBanner = function () {
        for (var i = 0; i < window['lplatform'].cparam.mmgPos.length; i++) {
            if (this.multiMoreGameBanner[i]) {
                this.multiMoreGameBanner[i].offResize(function () { });
                this.multiMoreGameBanner[i].offLoad(function () { });
                this.multiMoreGameBanner[i].offError(function () { });
                this.multiMoreGameBanner[i].destroy();
                this.multiMoreGameBanner[i] = null;
            }
            if (!this.multiMoreGameBanner[i]) {
                var position = {
                    x: this.info.windowWidth * window['lplatform'].cparam.mmgPos[i].x,
                    y: this.info.windowHeight * window['lplatform'].cparam.mmgPos[i].y
                };
                var size = window['lplatform'].cparam.mmgSize[i];
                var orientation = window['lplatform'].cparam.mmgOrientation[i];
                var appId = window['lplatform'].cparam.mmgId[i];
                this.multiMoreGameBanner[i] = this.createOutMoreGameBanner(position, size, orientation, appId);
            }
        }
    };
    PQQ.prototype.canRecord = function () {
        console.log("不支持录制游戏画面");
        return false;
    };
    PQQ.prototype.canShareRecord = function () {
        return true;
    };
    PQQ.prototype.goToGameOrGameList = function () {
        window['lplatform'].plog("qq未实现 goToGameOrGameList");
    };
    PQQ.prototype.shareMessageToFriend = function () { };
    PQQ.prototype.saveAppToDesktop = function () {
        this.env.saveAppToDesktop({
            success: function () { },
            fail: function () { },
            complete: function () { }
        });
    };
    PQQ.prototype.subscribeAppMsg = function () {
        this.env.subscribeAppMsg({
            tmplIds: window['lplatform'].cparam.tmplIds,
            subscribe: true,
            success: function (e) {
                console.log("----subscribeAppMsg----success", e);
            },
            fail: function (e) {
                console.log("----subscribeAppMsg----fail", e);
            }
        });
    };
    PQQ.prototype.sendMsgToOpenDataProject = function (msg) {
        if (this.logined) {
            _super.prototype.sendMsgToOpenDataProject.call(this, msg);
        }
        else {
            this.checkLogin();
        }
    };
    PQQ.prototype.setUserCloudStorage = function (data) {
        this.sendMsgToOpenDataProject({
            name: "setUserCloudStorage",
            kvdata: data
        });
    };
    PQQ.prototype.addRecentColorSign = function () {
        this.env.addRecentColorSign({
            query: "a=1&b=2",
            success: function () { },
            fail: function (e) {
                console.log("addRecentColorSign fail: ", e);
            },
            complete: function () { }
        });
    };
    PQQ.prototype.loadBanner = function (show) {
        // Implementation for loading banner
    };
    PQQ.prototype.loadInterstitial = function (show) {
        // Implementation for loading interstitial
    };
    PQQ.prototype.createRewardedVideo = function (show) {
        // Implementation for creating rewarded video
    };
    PQQ.prototype.onBannerLoad = function () {
        // Banner load callback
    };
    PQQ.prototype.onBannerError = function () {
        // Banner error callback
    };
    PQQ.prototype.onBannerResize = function () {
        // Banner resize callback
    };
    __decorate([
        property
    ], PQQ.prototype, "moreGamePortal", void 0);
    __decorate([
        property
    ], PQQ.prototype, "moreGameBanner", void 0);
    __decorate([
        property
    ], PQQ.prototype, "moreGameBannerLeft", void 0);
    __decorate([
        property
    ], PQQ.prototype, "moreGameBannerTop", void 0);
    __decorate([
        property([cc.Node])
    ], PQQ.prototype, "multiMoreGameBanner", void 0);
    PQQ = __decorate([
        ccclass
    ], PQQ);
    return PQQ;
}(cc.Component));
exports.default = PQQ;

cc._RF.pop();