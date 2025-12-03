const { ccclass, property } = cc._decorator;
import Params from "./Params";
import PDef from "./PDef";
import CCEngine from "./CCEngine";
import { Property } from "./Property";

export const CHANNEL = {
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

@ccclass
export default class PlatformA {
    private androidChannel: string = "";
    private channel: string = CHANNEL.web;
    private engine: string = "cc";
    private label: any = null;
    private area: any = null;
    private platform: any = null;
    private wx: any = null;
    private systemInfo: any = {
        appName: "Platform.systemInfo default",
        windowWidth: 720,
        windowHeight: 1280,
        platform: window.cc ? "creator" : window.Laya || window.laya ? "laya" : "none"
    };
    private llaburl: string = null;
    private myLocation: string = null;
    private params: any = null;
    private cparam: any = null;
    private labData: any = {};
    private initChannelTimeout: any = null;
    private gameStartMS: number = Date.now();
    private adSecondMax: number = 90;
    private adSecondNow: number = 90;
    private outRewardVideoCb: Function = null;
    private canShowInterstitial60Second: boolean = false;
    private interstitial60Timeout: any = null;
    private adTimeout: any = null;
    private launchOptions: any = null;

    constructor() {
        this.params = Params;
        this.cparam = Params.web;
        this.platform = new PDef();
        
        (window as any).lplatform = this;
        lplatform.plog("plog open");
        
        this.checkEngine();
        this.checkChannel();
        this.resetInterstitialPer60Second();
    }

    private checkSystemInfoAndAppName(e: any): void {
        this.wx = e;
        if (this.wx && typeof this.wx.getSystemInfoSync === 'function') {
            this.systemInfo = this.wx.getSystemInfoSync();
        }
        if (this.wx && typeof this.wx.getLaunchOptionsSync === 'function') {
            this.launchOptions = this.wx.getLaunchOptionsSync();
        }
    }

    private checkEngine(): void {
        if (window.cc && cc.director) {
            this.engine = "cc";
            this.uiEngine = new CCEngine();
        } else if (window.Laya || window.laya) {
            this.engine = "laya";
            this.uiEngine = new LayaEngine();
        }
    }

    private checkChannel(): void {
        if (window.tt) {
            this.checkSystemInfoAndAppName(window.tt);
            this.channel = "TT";
            this.cparam = Params.tt;
        } else if (window.qg) {
            this.checkSystemInfoAndAppName(window.qg);
            const brand = this.wx.getSystemInfoSync().brand;
            if (brand) {
                const brandLower = brand.toLowerCase();
                this.channel = "Oppo";
                this.cparam = Params.oppo;
                
                if (brandLower.indexOf("oppo") >= 0 || brandLower.indexOf("OPPO") >= 0 || 
                    brandLower.indexOf("Oppo") >= 0 || brandLower.indexOf("REALME") >= 0 || 
                    brandLower.indexOf("Realme") >= 0) {
                    this.channel = "Oppo";
                    this.cparam = Params.oppo;
                } else if (brandLower.indexOf("vivo") >= 0 || brandLower.indexOf("Vivo") >= 0 || 
                           brandLower.indexOf("VIVO") >= 0 || brandLower.indexOf("iqoo") >= 0 || 
                           brandLower.indexOf("IQOO") >= 0) {
                    this.channel = "vivoGame";
                    this.cparam = Params.vivo;
                } else if (brandLower.indexOf("huawei") >= 0 || brandLower.indexOf("honor") >= 0 || 
                           brandLower.indexOf("Huawei") >= 0 || brandLower.indexOf("HuaWei") >= 0 || 
                           brandLower.indexOf("HONOR") >= 0) {
                    this.channel = "huaWei";
                    this.cparam = Params.huawei;
                }
            }
        } else if (window.swan) {
            this.checkSystemInfoAndAppName(window.swan);
            this.channel = "BaiDu";
            this.cparam = Params.baidu;
        } else if (window.qq) {
            this.checkSystemInfoAndAppName(window.qq);
            this.channel = "qq";
            this.cparam = Params.qq;
        } else if (window.hasOwnProperty("gamebox")) {
            this.checkSystemInfoAndAppName((window as any).gamebox);
            this.channel = "gb4399";
            this.cparam = Params.gb4399;
        } else if ((window as any).h5api) {
            this.checkSystemInfoAndAppName((window as any).h5api);
            this.channel = "h54399";
            this.cparam = Params.h54399;
        } else if (window.ks || (window as any).kwaigame) {
            this.checkSystemInfoAndAppName(window.ks);
            this.channel = "ks";
            this.cparam = Params.ks;
        } else if (typeof uc !== "undefined") {
            this.checkSystemInfoAndAppName(uc);
            this.channel = "uc";
            this.cparam = Params.uc;
        } else if (window.wx) {
            this.checkSystemInfoAndAppName(window.wx);
            this.channel = "wx";
            this.cparam = Params.wx;
        } else if (this.engine === "cc" || (this.engine === "laya" && Laya.Browser.onAndroid)) {
            this.channel = "Android";
            this.cparam = Params.native;
        } else if (this.engine === "laya" && Laya.Browser.onIOS) {
            this.channel = "iOS";
            this.cparam = Params.native;
        }

        if (this.channel === "web") {
            if (window.android) {
                this.channel = "Android";
                this.cparam = Params.native;
            } else if (window.webkit && window.webkit.messageHandlers && 
                       window.webkit.messageHandlers.jsToOcWithPrams && 
                       window.webkit.messageHandlers.jsToOcWithPrams.postMessage) {
                (window as any).ios = {};
                this.channel = "iOS";
                this.cparam = Params.native;
            } else if (window.minigame) {
                this.channel = "MiniGame";
            }
        }

        if (this.channel === CHANNEL.android) {
            this.channel += this.androidChannel;
        }

        lplatform.plog("checkChannel:" + this.channel);
    }

    public initChannel(): void {
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
                this.platform = new PDef();
                break;
            case "Android":
            case "Android233":
                this.platform = new PNative();
                break;
            default:
                if (this.engine === "cc") {
                    console.log("cocos web内嵌");
                    this.platform = new PNative();
                } else if (this.engine === "laya") {
                    if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                        this.platform = new PNative();
                    } else {
                        console.log("使用laya web内嵌");
                        this.platform = new PNative();
                    }
                }
                break;
        }
    }

    public getArea(): void {
        const A = "PlatForm===>>>";
        this.plog(A, "getArea", Params.AreaUrl);
        
        if (Params.AreaUrl !== "") {
            this.httpRequest(Params.AreaUrl, (t: any, o: any, n: any) => {
                if (t) {
                    lplatform.plog("getArea res:" + t);
                } else {
                    const a = this.channel === CHANNEL.qq ? n : JSON.parse(n);
                    if (a) {
                        this.myLocation = a.cityCode + "," + a.proCode;
                    }
                    lplatform.plog("getArea this.myLocation:" + this.myLocation);
                }
                this.getLabel();
            });
        }
    }

    public getLabel(): void {
        const t = Params.llabHost + Params.llabName + "/lab" + this.channel + this.cparam.llabVer + ".json";
        lplatform.plog("getLabel llaburl:" + t);
        
        this.httpRequest(t, (t: any, o: any, n: any) => {
            if (t) {
                lplatform.plog("getLabel error:" + JSON.stringify(t));
            } else {
                const a = this.channel === CHANNEL.qq ? n : JSON.parse(n);
                this.labData = a || {};
                lplatform.plog("getLabel this.labData:" + JSON.stringify(this.labData));
            }
            
            if (this.initChannelTimeout) {
                clearTimeout(this.initChannelTimeout);
            }
            this.startLabWhenGet();
            this.platform.initAD();
            this.ipReg();
        });
    }

    private startLabWhenGet(): void {
        if (!this.labData) return;

        let e = false;
        if (this.labData.locationList || this.labData.province) {
            this.labData.locationList = this.labData.province;
            for (let t = 0; t < this.labData.locationList.length; t++) {
                if (this.myLocation && this.myLocation.indexOf(this.labData.locationList[t]) >= 0) {
                    e = true;
                    break;
                }
            }
        }

        if (e) {
            this.labData = {};
        }

        const o = new Date();
        const n = o.getHours();
        const a = o.getMinutes();

        if (this.labData.time) {
            let i = false;
            for (const r in this.labData.time) {
                const s = this.labData.time[r][0].split(":");
                const c = this.labData.time[r][1].split(":");
                
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
            if (this.channel === CHANNEL.uc) {
                this.showRewardedVideo();
            } else if (this.channel === CHANNEL.qq) {
                for (let l = 0; l < this.cparam.startVideoSceneID.length; l++) {
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
        } else {
            if (this.labData.openIntervalBanner) {
                setInterval(() => {
                    this.showBanner();
                }, 1000 * this.labData.openIntervalBanner);
            }

            if (this.labData.openIntervalInterstitial) {
                setInterval(() => {
                    this.showInterstitial();
                }, 1000 * this.labData.openIntervalInterstitial);
            }

            if (this.labData.openIntervalVideo) {
                setInterval(() => {
                    this.showRewardedVideo();
                }, 1000 * this.labData.openIntervalVideo);
            }

            for (const d in this.labData) {
                if (lplatform.cparam[d] !== undefined && (!this.labData[d] || this.labData[d] === 0)) {
                    lplatform.cparam[d] = this.labData[d];
                }
            }
        }

        if (this.labData.pushDelay !== null) {
            Property.PUSH_TIME_DELAY = this.labData.pushDelay;
        }
        if (this.labData.pushDelay_zjd !== null) {
            Property.PUSH_ZJD_TIME_INTERVAL = this.labData.pushDelay_zjd;
        }
        if (this.labData.pushTime_zjd !== null) {
            Property.PUSH_ZJD_TIME = this.labData.pushTime_zjd;
        }

        if (this.channel === CHANNEL.qq) {
            const h = this.launchOptions.scene;
            console.log("PlatForm===>>>", "Scene" + h);
            
            if (this.labData.zjd_AD_Progress !== null) {
                Property.ZJD_AD_PROGRESS = this.labData.zjd_AD_Progress;
            }
            
            if (this.labData.scene_zjd !== null && this.labData.openZjd !== null && this.labData.openZjd === 1) {
                for (let u = 0; u < this.labData.scene_zjd.length; u++) {
                    if (this.launchOptions.scene === this.labData.scene_zjd[u]) {
                        console.log("sceneID hit zjd");
                        break;
                    }
                }
            }
        }

        this.resetTimeVideoAd();
        lplatform.plog("Over---labData:" + JSON.stringify(this.labData));
    }

    public httpRequest(e: string, t: Function, o?: number, n?: string, a?: any, i?: any, r?: any): void {
        if (o === undefined) o = 3000;
        
        if (typeof this.platform.httpRequest === 'function') {
            this.platform.httpRequest(e, t, o, n, a, i, r);
        } else {
            const s = new XMLHttpRequest();
            s.timeout = o;
            s.onreadystatechange = () => {
                if (s.readyState === 4) {
                    if (s.status >= 200 && s.status < 400) {
                        t(null, s.response, s.responseText);
                    } else {
                        t(s.status, null, null);
                    }
                }
            };
            s.open(n || "GET", e, true);
            s.send(a);
        }
    }

    public native2JsEvent(e: string): void {
        lplatform.plog("native2JsEvent str:" + e + " window.vcb:" + (window as any).vcb);
        
        if (e === "playADSuccess") {
            if ((window as any).vcb) {
                (window as any).vcb(true);
                (window as any).vcb = null;
            }
            lplatform.resumeGame();
        } else if (e === "playADFailed") {
            if ((window as any).vcb) {
                (window as any).vcb(false);
                (window as any).vcb = null;
            }
            lplatform.resumeGame();
        }
    }

    public js2NativeEvent(e: string): boolean {
        console.log("PlatForm===>>>", "js2NativeEvent", e);
        let t = true;

        if (window.android) {
            console.log("PlatForm===>>>", "is Have window.android");
            window.android.js2NativeEvent(e);
        } else if ((window as any).ios) {
            if (window.webkit && window.webkit.messageHandlers && 
                window.webkit.messageHandlers.jsToOcWithPrams && 
                window.webkit.messageHandlers.jsToOcWithPrams.postMessage) {
                window.webkit.messageHandlers.jsToOcWithPrams.postMessage({
                    params: e
                });
            } else {
                console.error(this.engine + "ios微端 未实现webkit.messageHandlers以外，其他的js-原生通信方式");
            }
        } else if (this.engine === "cc") {
            console.log("CC_JSB or jsb.reflection is undefined");
            t = false;
        } else if (this.engine === "laya") {
            if (window.webkit && window.webkit.messageHandlers && 
                window.webkit.messageHandlers.jsToOcWithPrams && 
                window.webkit.messageHandlers.jsToOcWithPrams.postMessage) {
                window.webkit.messageHandlers.jsToOcWithPrams.postMessage({
                    params: e
                });
            } else {
                console.error(this.engine + " 未实现webkit.messageHandlers以外，其他的js-原生通信方式");
            }
        } else {
            console.error(this.engine + " 未实现js2NativeEvent");
        }

        return t;
    }

    public pauseGame(): void {
        if (window.cc) {
            cc.audioEngine.pauseAll();
            cc.director.pause();
        } else if (window.Laya) {
            Laya.SoundManager.setMusicVolume(0);
            Laya.SoundManager.setSoundVolume(0);
        }
    }

    public resumeGame(): void {
        if (window.cc) {
            cc.audioEngine.resumeAll();
            cc.director.resume();
        } else if (window.Laya) {
            Laya.SoundManager.setMusicVolume(1);
            Laya.SoundManager.setSoundVolume(1);
        }
    }

    public analytics(e: string, t: any): void {
        this.platform.analytics(e, t);
    }

    public showFavoriteGuide(): void {
        this.platform.showFavoriteGuide();
    }

    public showBanner(): void {
        this.platform.showBanner();
    }

    public showDelayBanner(e?: number): number {
        e = e || 2000;
        return setTimeout(() => {
            this.showBanner();
        }, e) as any;
    }

    public hideBanner(): void {
        this.platform.hideBanner();
    }

    public showInterstitial(): void {
        this.resetInterstitialPer60Second();
        this.platform.showInterstitial();
    }

    public showDelayInterstitial(e?: number): number {
        e = e || 2000;
        return setTimeout(() => {
            this.showInterstitial();
        }, e) as any;
    }

    public showInterstitialPer60Second(): void {
        if (this.canShowInterstitial60Second) {
            this.showInterstitial();
        }
    }

    public showDelayInterstitialPer60Second(e?: number): number {
        if (this.canShowInterstitial60Second) {
            return this.showDelayInterstitial(e);
        }
        return null;
    }

    public resetInterstitialPer60Second(e?: number): void {
        if (e === undefined) e = 10;
        
        this.canShowInterstitial60Second = false;
        
        if (this.interstitial60Timeout) {
            clearTimeout(this.interstitial60Timeout);
            this.interstitial60Timeout = null;
        }
        
        this.interstitial60Timeout = setTimeout(() => {
            this.canShowInterstitial60Second = true;
        }, 1000 * e);
    }

    public hideInterstitial(): void {
        this.platform.hideInterstitial();
    }

    public showInterstitialVideo(): void {
        if (this.channel === CHANNEL.android233) {
            this.platform.showInterstitialVideo();
        }
    }

    public showRanRewardedVideo(e?: Function, t?: Function): void {
        const A = "PlatForm===>>>";
        this.plog(A, "showRanRewardedVideo", this.labData.playVideo);
        
        if (this.labData.playVideo !== null) {
            const o = Math.random();
            console.log("ran=" + o);
            if (o < this.labData.playVideo) {
                this.showRewardedVideo(e);
            } else {
                if (e) e();
            }
        } else {
            this.showRewardedVideo(e, t);
        }
    }

    public showRewardedVideo(e?: Function, t?: Function): void {
        const A = "PlatForm===>>>";
        this.plog(A, "showRewardedVideo");
        
        this.platform.showRewardedVideo((n: boolean) => {
            this.plog(A, "Video Close", n ? "finish" : "no-finish ");
            
            if (n) {
                if (e) e();
                this.resetTimeVideoAd();
            } else {
                if (t) t();
            }
        });
    }

    public hideRewardedVideo(): void {
        this.platform.hideRewardedVideo();
    }

    public createMoreGamePortal(): void {
        this.platform.createMoreGamePortal();
    }

    public createMoreGameBanner(): void {
        this.platform.createMoreGameBanner(true, true);
    }

    public canRecord(): boolean {
        return this.platform.canRecord();
    }

    public canShareRecord(): boolean {
        return this.platform.canShareRecord();
    }

    public makeShareUI(e: any, t: any, o: any, n?: number, a?: boolean): void {
        if (n === undefined) n = 0;
        if (a === undefined) a = false;
        
        this.platform.makeShareUI(e, t, o, n, a);
    }

    public startRecord(e: Function): void {
        this.platform.startRecord(e);
    }

    public pauseRecord(): void {
        this.platform.pauseRecord();
    }

    public stopRecord(e: Function): void {
        this.platform.stopRecord(e);
    }

    public shareRecord(e: any, t: Function): void {
        this.platform.shareRecord(e, t);
    }

    public resetRecord(): void {
        this.platform.resetRecord();
    }

    public shareInnerRecord(e: any, t: Function): void {
        this.platform.shareInnerRecord(e, t);
    }

    public createMoreGameButton(): void {
        this.platform.createMoreGameButton();
    }

    public goToGameOrGameList(e: string): void {
        this.platform.goToGameOrGameList(e);
    }

    public followAccount(): void {
        this.platform.followAccount();
    }

    public openAwemeUserProfile(): void {
        this.platform.openAwemeUserProfile();
    }

    public createGameClub(): void {
        this.platform.createGameClub();
    }

    public navigateToMiniProgram(e: string): void {
        this.platform.navigateToMiniProgram(e);
    }

    public shareMessageToFriend(): void {
        this.platform.shareMessageToFriend();
    }

    public sendMsgToOpenDataProject(e: any): void {
        this.platform.sendMsgToOpenDataProject(e);
    }

    public plog(...args: any[]): void {
        if (this.cparam.showLog) {
            console.log.apply(console, args);
        }
    }

    public showLoading(e: string): void {
        this.platform.showLoading(e);
    }

    public hideLoading(): void {
        this.platform.hideLoading();
    }

    public pRewradVideoCb(e: boolean): void {
        if (this.outRewardVideoCb) {
            this.outRewardVideoCb(e);
            this.outRewardVideoCb = null;
        }
        this.resetTimeVideoAd();
    }

    public timeVideoAd(e: Function): boolean {
        let t = false;
        
        this.adSecondMax = lplatform.labData.interstitial90RealTime || this.adSecondMax;
        console.log("timeVideoAd adSecondNow:" + this.adSecondNow + " this.adSecondMax:" + this.adSecondMax);
        
        if (lplatform.labData.interstitial90RealTime && this.adSecondNow === 0) {
            this.resetTimeVideoAd();
            
            if (lplatform.channel === "iOS" || lplatform.channel === "Android") {
                lplatform.showInterstitial();
                e(false);
            } else {
                lplatform.showRewardedVideo(e || (() => {}));
            }
            
            t = true;
            lplatform.analytics("timeVideoAd", {});
        } else {
            e(false);
        }
        
        return t;
    }

    public resetTimeVideoAd(): void {
        this.adSecondMax = lplatform.labData.interstitial90RealTime || this.adSecondMax;
        console.log("resetTimeVideoAd adSecondMax:" + this.adSecondMax);
        
        this.adSecondNow = this.adSecondMax;
        
        if (this.adTimeout) {
            clearTimeout(this.adTimeout);
        }
        
        this.adTimeout = setTimeout(() => {
            this.adSecondNow = 0;
        }, 1000 * this.adSecondMax);
    }

    public showRandVideo(e: Function, t: Function): void {
        if (this.labData.playVideo && Math.random() <= this.labData.playVideo) {
            this.showRewardedVideo((o: boolean) => {
                if (o) {
                    if (e) e();
                } else {
                    if (t) t();
                }
            });
        } else {
            if (t) t();
        }
    }

    public ipReg(): void {
        if (this.labData.getIP && window.wx) {
            wx.request({
                url: "",
                data: {},
                header: {
                    "content-type": "application/json"
                },
                success: () => {},
                fail: () => {}
            });
        }
    }
}
