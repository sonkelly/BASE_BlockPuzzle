const { ccclass } = cc._decorator;

@ccclass
export default class PNative extends cc.Component {
    
    public init(): void {}
    
    public initAD(): void {}
    
    public release(): void {}
    
    public loadBanner(): void {}
    
    public onBannerLoad(): void {}
    
    public onBannerError(): void {}
    
    public onBannerResize(): void {}
    
    public showBanner(): void {
        const data = {
            name: "showBanner",
            data: {}
        };
        const jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
    }
    
    public hideBanner(immediate: boolean = false): void {
        const data = {
            name: "closeBanner",
            data: {}
        };
        const jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
    }
    
    public loadInterstitial(): void {}
    
    public onInterstitialLoad(): void {}
    
    public onInterstitialError(): void {}
    
    public onInterstitialClose(): void {}
    
    public showInterstitial(): void {
        const data = {
            name: "showChaPing",
            data: {}
        };
        const jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
    }
    
    public hideInterstitial(): void {}
    
    public showInterstitialVideo(): void {
        console.log("PNative===>>>showRewardedVideo");
        const data = {
            name: "showVideoChaPing",
            data: {}
        };
        const jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
    }
    
    public createRewardedVideo(): void {}
    
    public loadRewardedVideo(): void {}
    
    public onRewardedVideoLoad(): void {}
    
    public onRewardedVideoError(): void {}
    
    public onRewardedVideoClose(): void {}
    
    public showRewardedVideo(callback?: Function): void {
        console.log("PNative===>>>", "showRewardedVideo");
        
        if (callback) {
            window.vcb = callback;
            if (window.android) {
                window.android.videoRewardCb = function(): void {
                    lplatform.resumeGame();
                    callback(true);
                };
                
                window.android.videoFailCb = function(): void {
                    lplatform.resumeGame();
                    callback(false);
                };
            }
        }
        
        const data = {
            name: "showvideoAD",
            data: {}
        };
        const jsonData = JSON.stringify(data);
        lplatform.js2NativeEvent(jsonData);
        lplatform.pauseGame();
    }
    
    public resetRewardedVideo(resetLoad: boolean = false, resetShow: boolean = false): void {}
    
    public shareAppMessage(): void {}
    
    public canRecord(): boolean {
        return false;
    }
    
    public canShareRecord(): boolean {
        return false;
    }
    
    public startRecord(): void {}
    
    public onGameRecordStart(): void {}
    
    public onGameRecordError(): void {}
    
    public onGameRecordStop(): void {}
    
    public pauseRecord(): void {}
    
    public resumeRecord(): void {}
    
    public stopRecord(): void {}
    
    public shareRecord(): void {}
    
    public resetRecord(): void {}
    
    public shareInnerRecord(): void {}
    
    public createMoreGameButton(): void {}
    
    public showFavoriteGuide(): void {}
    
    public followAccount(): void {}
    
    public goToGameOrGameList(): void {
        this.env.showMoreGamesModal({
            appLaunchOptions: [],
            success: function(result: any): void {
                console.log("success", result.errMsg);
            },
            fail: function(error: any): void {
                console.log("fail", error.errMsg);
            }
        });
    }
    
    public openAwemeUserProfile(): void {}
    
    public createMoreGameBanner(): void {}
    
    public createMoreGamePortal(): void {}
    
    public analytics(eventName: string, data: any): void {
        const eventData = {
            name: eventName,
            data: data
        };
        lplatform.js2NativeEvent(JSON.stringify(eventData));
    }
    
    public showLoading(): void {}
    
    public hideLoading(): void {}
    
    public createGameClub(): void {}
    
    public navigateToMiniProgram(): void {}
    
    public shareMessageToFriend(): void {}
    
    public sendMsgToOpenDataProject(): void {}
    
    public makeShareUI(data: any, successCallback: Function, failCallback: Function, type: number = 0, immediate: boolean = false): void {
        if (successCallback) {
            successCallback();
        }
    }
    
    public httpRequest(url: string, callback: Function, timeout: number, method?: string, data?: any): void {
        const xhr = new XMLHttpRequest();
        xhr.timeout = timeout;
        
        xhr.onreadystatechange = (): void => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    callback(null, xhr.response, xhr.responseText);
                } else {
                    callback(xhr.status, null, null);
                }
            }
        };
        
        xhr.open(method || "GET", url, true);
        xhr.send(data);
    }
}