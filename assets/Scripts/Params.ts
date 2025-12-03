const { ccclass, property } = cc._decorator;

@ccclass
export default class Params {
    public static readonly tdappid: string = "";
    public static readonly AreaUrl: string = "";
    public static readonly llabHost: string = "";
    public static readonly llabName: string = "";
    
    public static readonly web: any = {
        showLog: true
    };

    public static readonly oppo: any = {
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

    public static readonly vivo: any = {
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

    public static readonly wx: any = {
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

    public static readonly qq: any = {
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

    public static readonly tt: any = {
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

    public static readonly huawei: any = {
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

    public static readonly baidu: any = {
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

    public static readonly native: any = {
        llabVer: "100",
        bannerOnBottom: true,
        showLog: true,
        moreGameBannerPercent: 0,
        moreGamePortalPercent: 0,
        canShareReward: false
    };

    public static readonly gb4399: any = {
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

    public static readonly h54399: any = {
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

    public static readonly ks: any = {
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

    public static readonly uc: any = {
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

    public static readonly loadLLabTryCount: number = 3;
    public static readonly randVideoLoopCountMax: number = 0;
    public static readonly randVideoLoopCount: number = 0;
    public static readonly bannerWidth: number = 640;
    public static readonly defBannerMoveDelay: number = 1200;
    public static readonly defInterstitialDelay: number = 1200;
    public static readonly usrClickDelay: number = 1200;
    public static readonly autoShareOnLttrStop: boolean = false;
    public static readonly autoStartOnLttrClose: boolean = false;
    public static readonly followBtnLeft: number = 0;
    public static readonly followBtnTop: number = 0;
    public static readonly showRecordBtn: boolean = false;
    public static readonly uiGroupIndex: number = 0;
    public static readonly uiGroup: string = "default";
}