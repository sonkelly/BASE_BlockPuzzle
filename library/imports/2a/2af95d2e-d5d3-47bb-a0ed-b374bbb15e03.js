"use strict";
cc._RF.push(module, '2af950u1dNHu6Dts3S7sV4D', 'PlatformA');
// Scripts/PlatformA.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANNEL = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Params_1 = require("./Params");
var PDef_1 = require("./PDef");
var CCEngine_1 = require("./CCEngine");
var Property_1 = require("./Property");
exports.CHANNEL = {
    web: "web",
    oppo: "Oppo",
    vivo: "vivoGame",
    tt: "TT",
    qq: "qq",
    w4399: "h54399",
    uc: "uc",
    android: "Android",
    android233: "Android233",
    ios: "iOS",
    miniGame: "MiniGame"
};
var PlatformA = /** @class */ (function () {
    function PlatformA() {
        this.androidChannel = "";
        this.channel = exports.CHANNEL.web;
        this.engine = "cc";
        this.label = null;
        this.area = null;
        this.platform = null;
        this.wx = null;
        this.systemInfo = {
            appName: "Platform.systemInfo default",
            windowWidth: 720,
            windowHeight: 1280,
            platform: window.cc ? "creator" : window.Laya || window.laya ? "laya" : "none"
        };
        this.llaburl = null;
        this.myLocation = null;
        this.params = null;
        this.cparam = null;
        this.labData = {};
        this.initChannelTimeout = null;
        this.gameStartMS = Date.now();
        this.adSecondMax = 90;
        this.adSecondNow = 90;
        this.outRewardVideoCb = null;
        this.canShowInterstitial60Second = false;
        this.interstitial60Timeout = null;
        this.adTimeout = null;
        this.launchOptions = null;
        this.params = Params_1.default;
        this.cparam = Params_1.default.web;
        this.platform = new PDef_1.default();
        window.lplatform = this;
        lplatform.plog("plog open");
        this.checkEngine();
        this.checkChannel();
        this.resetInterstitialPer60Second();
    }
    PlatformA.prototype.checkSystemInfoAndAppName = function (e) {
        this.wx = e;
        if (this.wx && typeof this.wx.getSystemInfoSync === 'function') {
            this.systemInfo = this.wx.getSystemInfoSync();
        }
        if (this.wx && typeof this.wx.getLaunchOptionsSync === 'function') {
            this.launchOptions = this.wx.getLaunchOptionsSync();
        }
    };
    PlatformA.prototype.checkEngine = function () {
        if (window.cc && cc.director) {
            this.engine = "cc";
            this.uiEngine = new CCEngine_1.default();
        }
        else if (window.Laya || window.laya) {
            this.engine = "laya";
            this.uiEngine = new LayaEngine();
        }
    };
    PlatformA.prototype.checkChannel = function () {
        if (window.tt) {
            this.checkSystemInfoAndAppName(window.tt);
            this.channel = "TT";
            this.cparam = Params_1.default.tt;
        }
        else if (window.qg) {
            this.checkSystemInfoAndAppName(window.qg);
            var brand = this.wx.getSystemInfoSync().brand;
            if (brand) {
                var brandLower = brand.toLowerCase();
                this.channel = "Oppo";
                this.cparam = Params_1.default.oppo;
                if (brandLower.indexOf("oppo") >= 0 || brandLower.indexOf("OPPO") >= 0 ||
                    brandLower.indexOf("Oppo") >= 0 || brandLower.indexOf("REALME") >= 0 ||
                    brandLower.indexOf("Realme") >= 0) {
                    this.channel = "Oppo";
                    this.cparam = Params_1.default.oppo;
                }
                else if (brandLower.indexOf("vivo") >= 0 || brandLower.indexOf("Vivo") >= 0 ||
                    brandLower.indexOf("VIVO") >= 0 || brandLower.indexOf("iqoo") >= 0 ||
                    brandLower.indexOf("IQOO") >= 0) {
                    this.channel = "vivoGame";
                    this.cparam = Params_1.default.vivo;
                }
                else if (brandLower.indexOf("huawei") >= 0 || brandLower.indexOf("honor") >= 0 ||
                    brandLower.indexOf("Huawei") >= 0 || brandLower.indexOf("HuaWei") >= 0 ||
                    brandLower.indexOf("HONOR") >= 0) {
                    this.channel = "huaWei";
                    this.cparam = Params_1.default.huawei;
                }
            }
        }
        else if (window.swan) {
            this.checkSystemInfoAndAppName(window.swan);
            this.channel = "BaiDu";
            this.cparam = Params_1.default.baidu;
        }
        else if (window.qq) {
            this.checkSystemInfoAndAppName(window.qq);
            this.channel = "qq";
            this.cparam = Params_1.default.qq;
        }
        else if (window.hasOwnProperty("gamebox")) {
            this.checkSystemInfoAndAppName(window.gamebox);
            this.channel = "gb4399";
            this.cparam = Params_1.default.gb4399;
        }
        else if (window.h5api) {
            this.checkSystemInfoAndAppName(window.h5api);
            this.channel = "h54399";
            this.cparam = Params_1.default.h54399;
        }
        else if (window.ks || window.kwaigame) {
            this.checkSystemInfoAndAppName(window.ks);
            this.channel = "ks";
            this.cparam = Params_1.default.ks;
        }
        else if (typeof uc !== "undefined") {
            this.checkSystemInfoAndAppName(uc);
            this.channel = "uc";
            this.cparam = Params_1.default.uc;
        }
        else if (window.wx) {
            this.checkSystemInfoAndAppName(window.wx);
            this.channel = "wx";
            this.cparam = Params_1.default.wx;
        }
        else if (this.engine === "cc" || (this.engine === "laya" && Laya.Browser.onAndroid)) {
            this.channel = "Android";
            this.cparam = Params_1.default.native;
        }
        else if (this.engine === "laya" && Laya.Browser.onIOS) {
            this.channel = "iOS";
            this.cparam = Params_1.default.native;
        }
        if (this.channel === "web") {
            if (window.android) {
                this.channel = "Android";
                this.cparam = Params_1.default.native;
            }
            else if (window.webkit && window.webkit.messageHandlers &&
                window.webkit.messageHandlers.jsToOcWithPrams &&
                window.webkit.messageHandlers.jsToOcWithPrams.postMessage) {
                window.ios = {};
                this.channel = "iOS";
                this.cparam = Params_1.default.native;
            }
            else if (window.minigame) {
                this.channel = "MiniGame";
            }
        }
        if (this.channel === exports.CHANNEL.android) {
            this.channel += this.androidChannel;
        }
        lplatform.plog("checkChannel:" + this.channel);
    };
    PlatformA.prototype.initChannel = function () {
        if (this.platform) {
            this.platform.release();
            this.platform = null;
        }
        switch (this.channel) {
            case "TT":
                this.platform = new PTT();
                break;
            //case "gb4399":
            //this.platform = new PGameBox4399();
            //break;
            case "h54399":
                this.platform = new PH54399();
                break;
            case "ks":
                this.platform = new PKuaiShou();
                break;
            case "wx":
                this.platform = new PWX();
                break;
            case "qq":
                this.platform = new PQQ();
                break;
            case "BaiDu":
                this.platform = new PBaiDu();
                break;
            case "Oppo":
                this.platform = new POppo();
                break;
            case "vivoGame":
                this.platform = new PVivo();
                break;
            case "huaWei":
                this.platform = new PHuaWei();
                break;
            case "uc":
                this.platform = new PUC();
                break;
            case "web":
                this.platform = new PDef_1.default();
                break;
            case "Android":
            case "Android233":
                this.platform = new PNative();
                break;
            default:
                if (this.engine === "cc") {
                    console.log("cocos web内嵌");
                    this.platform = new PNative();
                }
                else if (this.engine === "laya") {
                    if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                        this.platform = new PNative();
                    }
                    else {
                        console.log("使用laya web内嵌");
                        this.platform = new PNative();
                    }
                }
                break;
        }
    };
    PlatformA.prototype.getArea = function () {
        var _this = this;
        var A = "PlatForm===>>>";
        this.plog(A, "getArea", Params_1.default.AreaUrl);
        if (Params_1.default.AreaUrl !== "") {
            this.httpRequest(Params_1.default.AreaUrl, function (t, o, n) {
                if (t) {
                    lplatform.plog("getArea res:" + t);
                }
                else {
                    var a = _this.channel === exports.CHANNEL.qq ? n : JSON.parse(n);
                    if (a) {
                        _this.myLocation = a.cityCode + "," + a.proCode;
                    }
                    lplatform.plog("getArea this.myLocation:" + _this.myLocation);
                }
                _this.getLabel();
            });
        }
    };
    PlatformA.prototype.getLabel = function () {
        var _this = this;
        var t = Params_1.default.llabHost + Params_1.default.llabName + "/lab" + this.channel + this.cparam.llabVer + ".json";
        lplatform.plog("getLabel llaburl:" + t);
        this.httpRequest(t, function (t, o, n) {
            if (t) {
                lplatform.plog("getLabel error:" + JSON.stringify(t));
            }
            else {
                var a = _this.channel === exports.CHANNEL.qq ? n : JSON.parse(n);
                _this.labData = a || {};
                lplatform.plog("getLabel this.labData:" + JSON.stringify(_this.labData));
            }
            if (_this.initChannelTimeout) {
                clearTimeout(_this.initChannelTimeout);
            }
            _this.startLabWhenGet();
            _this.platform.initAD();
            _this.ipReg();
        });
    };
    PlatformA.prototype.startLabWhenGet = function () {
        var _this = this;
        if (!this.labData)
            return;
        var e = false;
        if (this.labData.locationList || this.labData.province) {
            this.labData.locationList = this.labData.province;
            for (var t = 0; t < this.labData.locationList.length; t++) {
                if (this.myLocation && this.myLocation.indexOf(this.labData.locationList[t]) >= 0) {
                    e = true;
                    break;
                }
            }
        }
        if (e) {
            this.labData = {};
        }
        var o = new Date();
        var n = o.getHours();
        var a = o.getMinutes();
        if (this.labData.time) {
            var i = false;
            for (var r in this.labData.time) {
                var s = this.labData.time[r][0].split(":");
                var c = this.labData.time[r][1].split(":");
                if ((n >= parseInt(s[0]) && n < parseInt(c[0]) && a >= parseInt(s[1])) ||
                    (n >= parseInt(s[0]) && n === parseInt(c[0]) && a >= parseInt(s[1]) && a < parseInt(c[1]))) {
                    i = true;
                    break;
                }
            }
            if (!i) {
                this.labData = {};
            }
        }
        if (!this.labData.mainSwitch) {
            this.labData = {};
        }
        if (this.labData.openVideo && this.labData.openVideo === 1) {
            if (this.channel === exports.CHANNEL.uc) {
                this.showRewardedVideo();
            }
            else if (this.channel === exports.CHANNEL.qq) {
                for (var l = 0; l < this.cparam.startVideoSceneID.length; l++) {
                    if (this.launchOptions.scene === this.cparam.startVideoSceneID[l]) {
                        console.log("scene hit startVideo");
                        this.showRewardedVideo();
                        break;
                    }
                }
            }
        }
        if (this.labData.lockLocation) {
            if (e) {
                this.startLabWhenGet();
            }
        }
        else {
            if (this.labData.openIntervalBanner) {
                setInterval(function () {
                    _this.showBanner();
                }, 1000 * this.labData.openIntervalBanner);
            }
            if (this.labData.openIntervalInterstitial) {
                setInterval(function () {
                    _this.showInterstitial();
                }, 1000 * this.labData.openIntervalInterstitial);
            }
            if (this.labData.openIntervalVideo) {
                setInterval(function () {
                    _this.showRewardedVideo();
                }, 1000 * this.labData.openIntervalVideo);
            }
            for (var d in this.labData) {
                if (lplatform.cparam[d] !== undefined && (!this.labData[d] || this.labData[d] === 0)) {
                    lplatform.cparam[d] = this.labData[d];
                }
            }
        }
        if (this.labData.pushDelay !== null) {
            Property_1.Property.PUSH_TIME_DELAY = this.labData.pushDelay;
        }
        if (this.labData.pushDelay_zjd !== null) {
            Property_1.Property.PUSH_ZJD_TIME_INTERVAL = this.labData.pushDelay_zjd;
        }
        if (this.labData.pushTime_zjd !== null) {
            Property_1.Property.PUSH_ZJD_TIME = this.labData.pushTime_zjd;
        }
        if (this.channel === exports.CHANNEL.qq) {
            var h = this.launchOptions.scene;
            console.log("PlatForm===>>>", "Scene" + h);
            if (this.labData.zjd_AD_Progress !== null) {
                Property_1.Property.ZJD_AD_PROGRESS = this.labData.zjd_AD_Progress;
            }
            if (this.labData.scene_zjd !== null && this.labData.openZjd !== null && this.labData.openZjd === 1) {
                for (var u = 0; u < this.labData.scene_zjd.length; u++) {
                    if (this.launchOptions.scene === this.labData.scene_zjd[u]) {
                        console.log("sceneID hit zjd");
                        break;
                    }
                }
            }
        }
        this.resetTimeVideoAd();
        lplatform.plog("Over---labData:" + JSON.stringify(this.labData));
    };
    PlatformA.prototype.httpRequest = function (e, t, o, n, a, i, r) {
        if (o === undefined)
            o = 3000;
        if (typeof this.platform.httpRequest === 'function') {
            this.platform.httpRequest(e, t, o, n, a, i, r);
        }
        else {
            var s_1 = new XMLHttpRequest();
            s_1.timeout = o;
            s_1.onreadystatechange = function () {
                if (s_1.readyState === 4) {
                    if (s_1.status >= 200 && s_1.status < 400) {
                        t(null, s_1.response, s_1.responseText);
                    }
                    else {
                        t(s_1.status, null, null);
                    }
                }
            };
            s_1.open(n || "GET", e, true);
            s_1.send(a);
        }
    };
    PlatformA.prototype.native2JsEvent = function (e) {
        lplatform.plog("native2JsEvent str:" + e + " window.vcb:" + window.vcb);
        if (e === "playADSuccess") {
            if (window.vcb) {
                window.vcb(true);
                window.vcb = null;
            }
            lplatform.resumeGame();
        }
        else if (e === "playADFailed") {
            if (window.vcb) {
                window.vcb(false);
                window.vcb = null;
            }
            lplatform.resumeGame();
        }
    };
    PlatformA.prototype.js2NativeEvent = function (e) {
        console.log("PlatForm===>>>", "js2NativeEvent", e);
        var t = true;
        if (window.android) {
            console.log("PlatForm===>>>", "is Have window.android");
            window.android.js2NativeEvent(e);
        }
        else if (window.ios) {
            if (window.webkit && window.webkit.messageHandlers &&
                window.webkit.messageHandlers.jsToOcWithPrams &&
                window.webkit.messageHandlers.jsToOcWithPrams.postMessage) {
                window.webkit.messageHandlers.jsToOcWithPrams.postMessage({
                    params: e
                });
            }
            else {
                console.error(this.engine + "ios微端 未实现webkit.messageHandlers以外，其他的js-原生通信方式");
            }
        }
        else if (this.engine === "cc") {
            console.log("CC_JSB or jsb.reflection is undefined");
            t = false;
        }
        else if (this.engine === "laya") {
            if (window.webkit && window.webkit.messageHandlers &&
                window.webkit.messageHandlers.jsToOcWithPrams &&
                window.webkit.messageHandlers.jsToOcWithPrams.postMessage) {
                window.webkit.messageHandlers.jsToOcWithPrams.postMessage({
                    params: e
                });
            }
            else {
                console.error(this.engine + " 未实现webkit.messageHandlers以外，其他的js-原生通信方式");
            }
        }
        else {
            console.error(this.engine + " 未实现js2NativeEvent");
        }
        return t;
    };
    PlatformA.prototype.pauseGame = function () {
        if (window.cc) {
            cc.audioEngine.pauseAll();
            cc.director.pause();
        }
        else if (window.Laya) {
            Laya.SoundManager.setMusicVolume(0);
            Laya.SoundManager.setSoundVolume(0);
        }
    };
    PlatformA.prototype.resumeGame = function () {
        if (window.cc) {
            cc.audioEngine.resumeAll();
            cc.director.resume();
        }
        else if (window.Laya) {
            Laya.SoundManager.setMusicVolume(1);
            Laya.SoundManager.setSoundVolume(1);
        }
    };
    PlatformA.prototype.analytics = function (e, t) {
        this.platform.analytics(e, t);
    };
    PlatformA.prototype.showFavoriteGuide = function () {
        this.platform.showFavoriteGuide();
    };
    PlatformA.prototype.showBanner = function () {
        this.platform.showBanner();
    };
    PlatformA.prototype.showDelayBanner = function (e) {
        var _this = this;
        e = e || 2000;
        return setTimeout(function () {
            _this.showBanner();
        }, e);
    };
    PlatformA.prototype.hideBanner = function () {
        this.platform.hideBanner();
    };
    PlatformA.prototype.showInterstitial = function () {
        this.resetInterstitialPer60Second();
        this.platform.showInterstitial();
    };
    PlatformA.prototype.showDelayInterstitial = function (e) {
        var _this = this;
        e = e || 2000;
        return setTimeout(function () {
            _this.showInterstitial();
        }, e);
    };
    PlatformA.prototype.showInterstitialPer60Second = function () {
        if (this.canShowInterstitial60Second) {
            this.showInterstitial();
        }
    };
    PlatformA.prototype.showDelayInterstitialPer60Second = function (e) {
        if (this.canShowInterstitial60Second) {
            return this.showDelayInterstitial(e);
        }
        return null;
    };
    PlatformA.prototype.resetInterstitialPer60Second = function (e) {
        var _this = this;
        if (e === undefined)
            e = 10;
        this.canShowInterstitial60Second = false;
        if (this.interstitial60Timeout) {
            clearTimeout(this.interstitial60Timeout);
            this.interstitial60Timeout = null;
        }
        this.interstitial60Timeout = setTimeout(function () {
            _this.canShowInterstitial60Second = true;
        }, 1000 * e);
    };
    PlatformA.prototype.hideInterstitial = function () {
        this.platform.hideInterstitial();
    };
    PlatformA.prototype.showInterstitialVideo = function () {
        if (this.channel === exports.CHANNEL.android233) {
            this.platform.showInterstitialVideo();
        }
    };
    PlatformA.prototype.showRanRewardedVideo = function (e, t) {
        var A = "PlatForm===>>>";
        this.plog(A, "showRanRewardedVideo", this.labData.playVideo);
        if (this.labData.playVideo !== null) {
            var o = Math.random();
            console.log("ran=" + o);
            if (o < this.labData.playVideo) {
                this.showRewardedVideo(e);
            }
            else {
                if (e)
                    e();
            }
        }
        else {
            this.showRewardedVideo(e, t);
        }
    };
    PlatformA.prototype.showRewardedVideo = function (e, t) {
        var _this = this;
        var A = "PlatForm===>>>";
        this.plog(A, "showRewardedVideo");
        this.platform.showRewardedVideo(function (n) {
            _this.plog(A, "Video Close", n ? "finish" : "no-finish ");
            if (n) {
                if (e)
                    e();
                _this.resetTimeVideoAd();
            }
            else {
                if (t)
                    t();
            }
        });
    };
    PlatformA.prototype.hideRewardedVideo = function () {
        this.platform.hideRewardedVideo();
    };
    PlatformA.prototype.createMoreGamePortal = function () {
        this.platform.createMoreGamePortal();
    };
    PlatformA.prototype.createMoreGameBanner = function () {
        this.platform.createMoreGameBanner(true, true);
    };
    PlatformA.prototype.canRecord = function () {
        return this.platform.canRecord();
    };
    PlatformA.prototype.canShareRecord = function () {
        return this.platform.canShareRecord();
    };
    PlatformA.prototype.makeShareUI = function (e, t, o, n, a) {
        if (n === undefined)
            n = 0;
        if (a === undefined)
            a = false;
        this.platform.makeShareUI(e, t, o, n, a);
    };
    PlatformA.prototype.startRecord = function (e) {
        this.platform.startRecord(e);
    };
    PlatformA.prototype.pauseRecord = function () {
        this.platform.pauseRecord();
    };
    PlatformA.prototype.stopRecord = function (e) {
        this.platform.stopRecord(e);
    };
    PlatformA.prototype.shareRecord = function (e, t) {
        this.platform.shareRecord(e, t);
    };
    PlatformA.prototype.resetRecord = function () {
        this.platform.resetRecord();
    };
    PlatformA.prototype.shareInnerRecord = function (e, t) {
        this.platform.shareInnerRecord(e, t);
    };
    PlatformA.prototype.createMoreGameButton = function () {
        this.platform.createMoreGameButton();
    };
    PlatformA.prototype.goToGameOrGameList = function (e) {
        this.platform.goToGameOrGameList(e);
    };
    PlatformA.prototype.followAccount = function () {
        this.platform.followAccount();
    };
    PlatformA.prototype.openAwemeUserProfile = function () {
        this.platform.openAwemeUserProfile();
    };
    PlatformA.prototype.createGameClub = function () {
        this.platform.createGameClub();
    };
    PlatformA.prototype.navigateToMiniProgram = function (e) {
        this.platform.navigateToMiniProgram(e);
    };
    PlatformA.prototype.shareMessageToFriend = function () {
        this.platform.shareMessageToFriend();
    };
    PlatformA.prototype.sendMsgToOpenDataProject = function (e) {
        this.platform.sendMsgToOpenDataProject(e);
    };
    PlatformA.prototype.plog = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.cparam.showLog) {
            console.log.apply(console, args);
        }
    };
    PlatformA.prototype.showLoading = function (e) {
        this.platform.showLoading(e);
    };
    PlatformA.prototype.hideLoading = function () {
        this.platform.hideLoading();
    };
    PlatformA.prototype.pRewradVideoCb = function (e) {
        if (this.outRewardVideoCb) {
            this.outRewardVideoCb(e);
            this.outRewardVideoCb = null;
        }
        this.resetTimeVideoAd();
    };
    PlatformA.prototype.timeVideoAd = function (e) {
        var t = false;
        this.adSecondMax = lplatform.labData.interstitial90RealTime || this.adSecondMax;
        console.log("timeVideoAd adSecondNow:" + this.adSecondNow + " this.adSecondMax:" + this.adSecondMax);
        if (lplatform.labData.interstitial90RealTime && this.adSecondNow === 0) {
            this.resetTimeVideoAd();
            if (lplatform.channel === "iOS" || lplatform.channel === "Android") {
                lplatform.showInterstitial();
                e(false);
            }
            else {
                lplatform.showRewardedVideo(e || (function () { }));
            }
            t = true;
            lplatform.analytics("timeVideoAd", {});
        }
        else {
            e(false);
        }
        return t;
    };
    PlatformA.prototype.resetTimeVideoAd = function () {
        var _this = this;
        this.adSecondMax = lplatform.labData.interstitial90RealTime || this.adSecondMax;
        console.log("resetTimeVideoAd adSecondMax:" + this.adSecondMax);
        this.adSecondNow = this.adSecondMax;
        if (this.adTimeout) {
            clearTimeout(this.adTimeout);
        }
        this.adTimeout = setTimeout(function () {
            _this.adSecondNow = 0;
        }, 1000 * this.adSecondMax);
    };
    PlatformA.prototype.showRandVideo = function (e, t) {
        if (this.labData.playVideo && Math.random() <= this.labData.playVideo) {
            this.showRewardedVideo(function (o) {
                if (o) {
                    if (e)
                        e();
                }
                else {
                    if (t)
                        t();
                }
            });
        }
        else {
            if (t)
                t();
        }
    };
    PlatformA.prototype.ipReg = function () {
        if (this.labData.getIP && window.wx) {
            wx.request({
                url: "",
                data: {},
                header: {
                    "content-type": "application/json"
                },
                success: function () { },
                fail: function () { }
            });
        }
    };
    PlatformA = __decorate([
        ccclass
    ], PlatformA);
    return PlatformA;
}());
exports.default = PlatformA;

cc._RF.pop();