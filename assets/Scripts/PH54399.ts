export default class PH54399{
    private env: any;

    protected init(): void {
        this.env = window.h5api;
    }

    protected initAD(): void {
        this.createRewardedVideo(false);
    }

    protected loadBanner(): void {
        // Implementation empty
    }

    protected showBanner(): void {
        // Implementation empty
    }

    protected hideBanner(): void {
        // Implementation empty
    }

    protected loadInterstitial(): void {
        // Implementation empty
    }

    protected showInterstitial(): void {
        // Implementation empty
    }

    protected hideInterstitial(): void {
        // Implementation empty
    }

    protected createRewardedVideo(): void {
        // Implementation empty
    }

    protected loadRewardedVideo(): void {
        // Implementation empty
    }

    protected showRewardedVideo(callback?: (success: boolean) => void): void {
        this.env.canPlayAd((result: any) => {
            console.log("是否可播放广告", result.canPlayAd, "剩余次数", result.remain);
            
            if (result.canPlayAd) {
                this.env.playAd((adResult: any) => {
                    console.log("代码:" + adResult.code + ",消息:" + adResult.message);
                    
                    if (adResult.code === 10000 || adResult.code === 10001) {
                        callback && callback(true);
                    } else {
                        console.log("广告异常");
                    }
                });
            }
        });
    }

    protected hideRewardedVideo(): void {
        // Implementation empty
    }

    protected shareAppMessage(): void {
        // Implementation empty
    }

    protected makeShareUI(
        title: string, 
        successCallback?: () => void, 
        failCallback?: () => void, 
        offsetX: number = 0, 
        showClose: boolean = false
    ): void {
        successCallback && successCallback();
    }

    protected analytics(): void {
        // Implementation empty
    }

    protected httpRequest(url: string, callback?: (error: string, data: any, response: any) => void): void {
        callback && callback("h54399不允许外网连接", null, null);
    }
}