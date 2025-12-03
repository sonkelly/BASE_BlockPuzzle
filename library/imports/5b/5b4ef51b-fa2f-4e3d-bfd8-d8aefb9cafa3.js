"use strict";
cc._RF.push(module, '5b4efUb+i9OPb/Y2K77nK+j', 'Params');
// Scripts/Params.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Params = /** @class */ (function () {
    function Params() {
    }
    Params.tdappid = "";
    Params.AreaUrl = "";
    Params.llabHost = "";
    Params.llabName = "";
    Params.web = {
        showLog: true
    };
    Params.oppo = {
        appName: "",
        llabVer: "",
        packageName: "",
        bannerID: "",
        nativeTemplateID: "",
        rewardedVideoID: "",
        nativeID: [],
        spreadBoxID: [],
        moreGameBannerId: "",
        useNativeAd: true,
        showLog: true,
        bannerWidth: 1080,
        bannerHeight: 300,
        nativeInterstitialLeft: 0,
        nativeInterstitialTop: 0,
        nativeInterstitialWidth: 600,
        nativeInterstitialHeight: 200,
        bannerOnBottom: true,
        canRecord: false,
        closeBtnScale: 1,
        moreGameBannerPercent: 0,
        moreGamePortalPercent: 0,
        canShareReward: false,
        moreGameBannerWidth: 720,
        moreGameBannerHeight: 260
    };
    Params.vivo = {
        appName: "",
        llabVer: "",
        package: "",
        bannerID: "",
        interstitialID: "",
        rewardedVideoID: "",
        nativeID: [""],
        spreadBoxID: [""],
        moreGameBannerId: "",
        showLog: true,
        bannerWidth: 1080,
        bannerHeight: 0,
        bannerOnBottom: true,
        canRecord: false,
        closeBtnScale: 1,
        moreGameBannerPercent: 0,
        moreGamePortalPercent: 0,
        moreGameBannerWidth: 720,
        moreGameBannerHeight: 0,
        moreGamePortalIconUrl: null,
        moreGamePortalMarginTop: 100,
        needPushPrivacy: true
    };
    Params.wx = {
        llabVer: "103",
        bannerID: "",
        interstitialID: "",
        rewardedVideoID: "",
        nativeID: "",
        useNativeAd: false,
        showLog: true,
        bannerOnBottom: true,
        gameClubLeft: 0.85,
        gameClubTop: 0.12,
        shareRecordBtnHeight: 50,
        shareRecordBtnLeft: 0.5,
        shareRecordBtnTop: 0.695,
        shareAppTitle: "",
        showVideoShareBtn: false,
        moreGameBannerAppId: [""],
        moreGameBannerPercent: 0,
        moreGamePortalAppId: [""],
        moreGamePortalPercent: 0,
        canShareReward: false,
        needPushPrivacy: false
    };
    Params.qq = {
        appid: "",
        llabVer: "",
        bannerID: "",
        interstitialID: "",
        rewardedVideoID: "",
        nativeID: "",
        useNativeAd: false,
        showLog: true,
        bannerOnBottom: true,
        gameClubLeft: 0.85,
        gameClubTop: 0.12,
        shareRecordBtnHeight: 50,
        shareRecordBtnLeft: 0.5,
        shareRecordBtnTop: 0.695,
        shareAppTitle: "",
        showVideoShareBtn: false,
        moreGameBannerAppId: [""],
        moreGameBannerPercent: 0,
        moreGamePortalAppId: [""],
        moreGamePortalPercent: 0,
        shareAppImgUrl: "",
        startVideoSceneID: [],
        mmgPos: [{ x: 0.1, y: 0.35 }],
        mmgSize: [3],
        mmgOrientation: ["vertical"],
        mmgId: [""],
        tmplIds: [""],
        canShareReward: true,
        needPushPrivacy: false
    };
    Params.tt = {
        llabVer: "",
        ttID: "",
        bannerID: "",
        interstitialID: "",
        rewardedVideoID: "",
        shareID: "",
        videoTopics: [],
        useNativeAd: false,
        showLog: true,
        bannerHeight: 70,
        bannerOnBottom: true,
        followBtnLeft: 0,
        followBtnTop: 0.15,
        moreGameLeft: 0,
        moreGameTop: 0.23,
        moreGameBannerAppId: [""],
        moreGameBannerAutoCloseTime: 0,
        moreGameBannerPercent: 0,
        moreGamePortalPercent: 0,
        canShareReward: true,
        needPushPrivacy: false
    };
    Params.huawei = {
        llabVer: "",
        bannerID: "",
        interstitialID: "",
        rewardedVideoID: "",
        nativeID: [""],
        spreadBoxID: [""],
        shareAppTitle: "",
        shareAppImgUrl: "",
        useNativeAd: true,
        showLog: true,
        bannerOnBottom: true,
        closeBtnScale: 1,
        moreGameBannerPercent: 0,
        moreGamePortalPercent: 0,
        bannerWidth: 360,
        bannerHeight: 57,
        nativeInterstitialWidth: 600,
        nativeInterstitialHeight: 372,
        canRecord: false,
        canShareReward: true,
        needPushPrivacy: true
    };
    Params.baidu = {
        llabVer: "",
        bannerOnBottom: true,
        appSid: "",
        bannerID: "",
        interstitialID: "",
        rewardedVideoID: "",
        moreGameLeft: 0.85,
        moreGameTop: 0.12,
        bannerHeight: 100,
        shareAppImgUrl: "",
        showLog: true,
        canRecord: false,
        moreGameBannerPercent: 0,
        moreGamePortalPercent: 0,
        navigateToId: [""],
        canShareReward: true,
        needPushPrivacy: true
    };
    Params.native = {
        llabVer: "100",
        bannerOnBottom: true,
        showLog: true,
        moreGameBannerPercent: 0,
        moreGamePortalPercent: 0,
        canShareReward: false
    };
    Params.gb4399 = {
        llabVer: "",
        bannerID: "noNeed",
        interstitialID: "noNeed",
        rewardedVideoID: "noNeed",
        nativeID: "noNeed",
        useNativeAd: false,
        showLog: true,
        bannerOnBottom: true,
        gameClubLeft: 0,
        gameClubTop: 0.23,
        shareRecordBtnHeight: 50,
        shareRecordBtnLeft: 0.5,
        shareRecordBtnTop: 0.695,
        shareAppTitle: "",
        showVideoShareBtn: false,
        moreGameBannerAppId: ["noNeed"],
        moreGameBannerPercent: 0,
        moreGamePortalAppId: ["noNeed"],
        moreGamePortalPercent: 0,
        canShareReward: false,
        needPushPrivacy: true
    };
    Params.h54399 = {
        llabVer: "noNeed",
        bannerID: "noNeed",
        interstitialID: "noNeed",
        rewardedVideoID: "noNeed",
        nativeID: "noNeed",
        useNativeAd: false,
        showLog: true,
        bannerOnBottom: true,
        gameClubLeft: 0,
        gameClubTop: 0.23,
        shareRecordBtnHeight: 50,
        shareRecordBtnLeft: 0.5,
        shareRecordBtnTop: 0.695,
        shareAppTitle: "",
        showVideoShareBtn: false,
        moreGameBannerAppId: ["noNeed"],
        moreGameBannerPercent: 0,
        moreGamePortalAppId: ["noNeed"],
        moreGamePortalPercent: 0,
        canShareReward: false,
        needPushPrivacy: true
    };
    Params.ks = {
        llabVer: "",
        bannerID: "",
        interstitialID: "",
        rewardedVideoID: "",
        shareID: "",
        videoTopics: [""],
        useNativeAd: false,
        showLog: true,
        bannerHeight: 70,
        bannerOnBottom: true,
        followBtnLeft: 0,
        followBtnTop: 0.15,
        moreGameLeft: -1,
        moreGameTop: 0.23,
        moreGameBannerAppId: [""],
        moreGameBannerAutoCloseTime: 0,
        moreGameBannerPercent: 0,
        moreGamePortalPercent: 0,
        canShareReward: true,
        needPushPrivacy: false
    };
    Params.uc = {
        llabVer: "100",
        bannerID: "noNeed",
        interstitialID: "noNeed",
        rewardedVideoID: "noNeed",
        nativeID: "noNeed",
        showLog: true,
        bannerWidth: 1080,
        bannerHeight: 200,
        needPushPrivacy: true
    };
    Params.loadLLabTryCount = 3;
    Params.randVideoLoopCountMax = 0;
    Params.randVideoLoopCount = 0;
    Params.bannerWidth = 640;
    Params.defBannerMoveDelay = 1200;
    Params.defInterstitialDelay = 1200;
    Params.usrClickDelay = 1200;
    Params.autoShareOnLttrStop = false;
    Params.autoStartOnLttrClose = false;
    Params.followBtnLeft = 0;
    Params.followBtnTop = 0;
    Params.showRecordBtn = false;
    Params.uiGroupIndex = 0;
    Params.uiGroup = "default";
    Params = __decorate([
        ccclass
    ], Params);
    return Params;
}());
exports.default = Params;

cc._RF.pop();