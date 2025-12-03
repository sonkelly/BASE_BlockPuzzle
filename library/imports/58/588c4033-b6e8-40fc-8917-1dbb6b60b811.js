"use strict";
cc._RF.push(module, '588c4AztuhA/IkXHbtrYLgR', 'EventManager');
// Scripts/EventManager.ts

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
var PlatformA_1 = require("./PlatformA");
var Property_1 = require("./Property");
var EventManager = /** @class */ (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventManager_1 = EventManager;
    Object.defineProperty(EventManager, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    EventManager.prototype.onLoad = function () {
        if (EventManager_1._instance === null) {
            EventManager_1._instance = this;
        }
    };
    EventManager.prototype.EventLoad = function () {
        switch (lplatform.channel) {
            case PlatformA_1.CHANNEL.oppo:
            case PlatformA_1.CHANNEL.qq:
            case PlatformA_1.CHANNEL.android:
                this.WhileBanner();
                break;
            case PlatformA_1.CHANNEL.ios:
                Property_1.Property.PUSH_ZJD_TIME_INTERVAL = 180;
                Property_1.Property.PUSH_ZJD_TIME = 180;
                this.WhileBanner();
                break;
        }
    };
    EventManager.prototype.WhileBanner = function () {
        var _this = this;
        console.log("WhileBanner", lplatform.labData.bannerRefresh);
        this.showBanner();
        if (lplatform.labData.bannerRefresh != null) {
            this.scheduleOnce(function () {
                _this.WhileBanner();
            }, lplatform.labData.bannerRefresh);
        }
        else {
            this.scheduleOnce(function () {
                _this.WhileBanner();
            }, 30);
        }
    };
    EventManager.prototype.EventMenu = function () {
        switch (lplatform.channel) {
            case PlatformA_1.CHANNEL.vivo:
                this.moreGame();
                this.showBanner();
                break;
            case PlatformA_1.CHANNEL.tt:
                this.showBanner();
                break;
            case PlatformA_1.CHANNEL.miniGame:
                this.hideBanner();
                this.showBanner();
                break;
        }
    };
    EventManager.prototype.EventMenuToGame = function () {
        switch (lplatform.channel) {
            case PlatformA_1.CHANNEL.tt:
                this.hideBanner();
                this.startRecord();
                break;
            case PlatformA_1.CHANNEL.oppo:
            case PlatformA_1.CHANNEL.vivo:
            case PlatformA_1.CHANNEL.qq:
                if (lplatform.labData.sendToTable && lplatform.labData.sendToTable == 1) {
                    this.showFavoriteGuide();
                }
                break;
        }
    };
    EventManager.prototype.EventInterstitial = function () {
        console.log("EventInterstitial");
        switch (lplatform.channel) {
            case PlatformA_1.CHANNEL.oppo:
            case PlatformA_1.CHANNEL.vivo:
            case PlatformA_1.CHANNEL.qq:
            case PlatformA_1.CHANNEL.tt:
            case PlatformA_1.CHANNEL.android:
            case PlatformA_1.CHANNEL.android233:
                console.log("AllInter", lplatform.labData.allInter);
                if (!lplatform.labData.allInter || lplatform.labData.allInter != 1) {
                    return;
                }
                this.showInterstitial();
                break;
            case PlatformA_1.CHANNEL.ios:
                window.iosInterstitialDelay = window.iosInterstitialDelay || 0;
                window.iosInterstitialDelay++;
                if (window.iosInterstitialDelay >= 3) {
                    window.iosInterstitialDelay = 0;
                    lplatform.showInterstitial();
                }
                break;
            case PlatformA_1.CHANNEL.miniGame:
                this.showInterstitial();
                break;
        }
    };
    EventManager.prototype.EventInterstitialVideo = function () {
        console.log("EventManager===>>>", "EventInterstitialVideo");
        switch (lplatform.channel) {
            case PlatformA_1.CHANNEL.android233:
                console.log("AllInter", lplatform.labData.allInter);
                if (!lplatform.labData.allInter || lplatform.labData.allInter != 1) {
                    return;
                }
                lplatform.showInterstitialVideo();
                break;
            case PlatformA_1.CHANNEL.ios:
                lplatform.showInterstitial();
                break;
        }
    };
    EventManager.prototype.EventWinAndFail = function () {
        switch (lplatform.channel) {
            case PlatformA_1.CHANNEL.tt:
                this.stopRecord();
                break;
        }
    };
    EventManager.prototype.showBanner = function () {
        if (!window.MiniGameAds)
            return;
        if (MiniGameAds.isBannerReady()) {
            MiniGameAds.showBanner()
                .then(function () {
                console.info("新接口播放横幅广告: 成功");
            })
                .catch(function (error) {
                console.error("新接口播放横幅广告: 失败，原因: " + error.message);
            });
        }
        else {
            console.info("横幅广告没有加载成功，无法播放");
        }
    };
    EventManager.prototype.hideBanner = function () {
        if (!window.MiniGameAds)
            return;
        MiniGameAds.hideBanner()
            .then(function () {
            console.info("新接口隐藏激励广告: 成功");
        })
            .catch(function (error) {
            console.error("新接口隐藏激励广告: 失败，原因: " + error.message);
        });
    };
    EventManager.prototype.showInterstitial = function () {
        if (!window.MiniGameAds)
            return;
        if (MiniGameAds.isInterstitialReady()) {
            MiniGameAds.showInterstitial()
                .then(function () {
                console.info("新接口播放插屏广告: 成功");
            })
                .catch(function (error) {
                console.error("新接口播放插屏广告: 失败，原因: " + error.message);
            });
        }
        else {
            console.info("插屏广告没有加载成功，无法播放");
        }
    };
    EventManager.prototype.showRewardedVideo = function (callback) {
        var _this = this;
        if (!window.MiniGameAds) {
            callback && callback();
            return;
        }
        if (MiniGameAds.isRewardvideoReady()) {
            this.audioManager.pauseMusic();
            MiniGameAds.showRewardedVideo()
                .then(function () {
                console.info("新接口播放激励广告: 成功");
                callback && callback();
                _this.audioManager.resumeMusic();
            })
                .catch(function (error) {
                console.error("新接口播放激励广告: 失败，原因: " + error.message);
                _this.audioManager.resumeMusic();
            });
        }
        else {
            console.info("激励视频没有加载成功，无法播放");
        }
    };
    EventManager.prototype.gameEvent = function (event, data) {
        console.log("gameEvent===>>>", event, data);
        if (window.MiniGameAnalytics) {
            MiniGameAnalytics.onGameEvent(event, data);
        }
    };
    EventManager.prototype.canRecord = function () {
        lplatform.canRecord();
    };
    EventManager.prototype.startRecord = function () {
        lplatform.startRecord();
    };
    EventManager.prototype.stopRecord = function () {
        lplatform.stopRecord();
    };
    EventManager.prototype.shareRecord = function () {
        lplatform.shareRecord();
    };
    EventManager.prototype.showFavoriteGuide = function () {
        lplatform.showFavoriteGuide();
    };
    EventManager.prototype.moreGame = function () {
        // 需要在具体平台实现
    };
    var EventManager_1;
    EventManager._instance = new EventManager_1();
    EventManager = EventManager_1 = __decorate([
        ccclass
    ], EventManager);
    return EventManager;
}(cc.Component));
exports.default = EventManager;

cc._RF.pop();