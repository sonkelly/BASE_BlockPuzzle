const { ccclass, property } = cc._decorator;
import { CHANNEL } from "./PlatformA";
import { Property } from "./Property";
@ccclass
export default class EventManager extends cc.Component {
    private static _instance: EventManager = new EventManager();
    
    public static get instance(): EventManager {
        return this._instance;
    }

    onLoad() {
        if (EventManager._instance === null) {
            EventManager._instance = this;
        }
    }

    EventLoad(): void {
        switch (lplatform.channel) {
            case CHANNEL.oppo:
            case CHANNEL.qq:
            case CHANNEL.android:
                this.WhileBanner();
                break;
            case CHANNEL.ios:
                Property.PUSH_ZJD_TIME_INTERVAL = 180;
                Property.PUSH_ZJD_TIME = 180;
                this.WhileBanner();
                break;
        }
    }

    WhileBanner(): void {
        console.log("WhileBanner", lplatform.labData.bannerRefresh);
        this.showBanner();
        
        if (lplatform.labData.bannerRefresh != null) {
            this.scheduleOnce(() => {
                this.WhileBanner();
            }, lplatform.labData.bannerRefresh);
        } else {
            this.scheduleOnce(() => {
                this.WhileBanner();
            }, 30);
        }
    }

    EventMenu(): void {
        switch (lplatform.channel) {
            case CHANNEL.vivo:
                this.moreGame();
                this.showBanner();
                break;
            case CHANNEL.tt:
                this.showBanner();
                break;
            case CHANNEL.miniGame:
                this.hideBanner();
                this.showBanner();
                break;
        }
    }

    EventMenuToGame(): void {
        switch (lplatform.channel) {
            case CHANNEL.tt:
                this.hideBanner();
                this.startRecord();
                break;
            case CHANNEL.oppo:
            case CHANNEL.vivo:
            case CHANNEL.qq:
                if (lplatform.labData.sendToTable && lplatform.labData.sendToTable == 1) {
                    this.showFavoriteGuide();
                }
                break;
        }
    }

    EventInterstitial(): void {
        console.log("EventInterstitial");
        
        switch (lplatform.channel) {
            case CHANNEL.oppo:
            case CHANNEL.vivo:
            case CHANNEL.qq:
            case CHANNEL.tt:
            case CHANNEL.android:
            case CHANNEL.android233:
                console.log("AllInter", lplatform.labData.allInter);
                if (!lplatform.labData.allInter || lplatform.labData.allInter != 1) {
                    return;
                }
                this.showInterstitial();
                break;
            case CHANNEL.ios:
                window.iosInterstitialDelay = window.iosInterstitialDelay || 0;
                window.iosInterstitialDelay++;
                if (window.iosInterstitialDelay >= 3) {
                    window.iosInterstitialDelay = 0;
                    lplatform.showInterstitial();
                }
                break;
            case CHANNEL.miniGame:
                this.showInterstitial();
                break;
        }
    }

    EventInterstitialVideo(): void {
        console.log("EventManager===>>>", "EventInterstitialVideo");
        
        switch (lplatform.channel) {
            case CHANNEL.android233:
                console.log("AllInter", lplatform.labData.allInter);
                if (!lplatform.labData.allInter || lplatform.labData.allInter != 1) {
                    return;
                }
                lplatform.showInterstitialVideo();
                break;
            case CHANNEL.ios:
                lplatform.showInterstitial();
                break;
        }
    }

    EventWinAndFail(): void {
        switch (lplatform.channel) {
            case CHANNEL.tt:
                this.stopRecord();
                break;
        }
    }

    showBanner(): void {
        if (!window.MiniGameAds) return;
        
        if (MiniGameAds.isBannerReady()) {
            MiniGameAds.showBanner()
                .then(() => {
                    console.info("新接口播放横幅广告: 成功");
                })
                .catch((error: any) => {
                    console.error("新接口播放横幅广告: 失败，原因: " + error.message);
                });
        } else {
            console.info("横幅广告没有加载成功，无法播放");
        }
    }

    hideBanner(): void {
        if (!window.MiniGameAds) return;
        
        MiniGameAds.hideBanner()
            .then(() => {
                console.info("新接口隐藏激励广告: 成功");
            })
            .catch((error: any) => {
                console.error("新接口隐藏激励广告: 失败，原因: " + error.message);
            });
    }

    showInterstitial(): void {
        if (!window.MiniGameAds) return;
        
        if (MiniGameAds.isInterstitialReady()) {
            MiniGameAds.showInterstitial()
                .then(() => {
                    console.info("新接口播放插屏广告: 成功");
                })
                .catch((error: any) => {
                    console.error("新接口播放插屏广告: 失败，原因: " + error.message);
                });
        } else {
            console.info("插屏广告没有加载成功，无法播放");
        }
    }

    showRewardedVideo(callback?: Function): void {
        if (!window.MiniGameAds) {
            callback && callback();
            return;
        }
        
        if (MiniGameAds.isRewardvideoReady()) {
            this.audioManager.pauseMusic();
            
            MiniGameAds.showRewardedVideo()
                .then(() => {
                    console.info("新接口播放激励广告: 成功");
                    callback && callback();
                    this.audioManager.resumeMusic();
                })
                .catch((error: any) => {
                    console.error("新接口播放激励广告: 失败，原因: " + error.message);
                    this.audioManager.resumeMusic();
                });
        } else {
            console.info("激励视频没有加载成功，无法播放");
        }
    }

    gameEvent(event: string, data: any): void {
        console.log("gameEvent===>>>", event, data);
        if (window.MiniGameAnalytics) {
            MiniGameAnalytics.onGameEvent(event, data);
        }
    }

    canRecord(): void {
        lplatform.canRecord();
    }

    startRecord(): void {
        lplatform.startRecord();
    }

    stopRecord(): void {
        lplatform.stopRecord();
    }

    shareRecord(): void {
        lplatform.shareRecord();
    }

    showFavoriteGuide(): void {
        lplatform.showFavoriteGuide();
    }

    moreGame(): void {
        // 需要在具体平台实现
    }
}