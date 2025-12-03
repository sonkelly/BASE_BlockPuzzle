const { ccclass } = cc._decorator;

@ccclass
export default class PDef {
    public init(): void {}

    public initAD(): void {}

    public release(): void {}

    public loadBanner(): void {}

    public showBanner(): void {}

    public hideBanner(): void {}

    public loadInterstitial(): void {}

    public showInterstitial(): void {}

    public hideInterstitial(): void {}

    public createRewardedVideo(): void {}

    public loadRewardedVideo(): void {}

    public showRewardedVideo(callback?: (success: boolean) => void): void {
        callback && callback(true);
    }

    public hideRewardedVideo(): void {}

    public shareAppMessage(): void {}

    public canRecord(): boolean {
        return false;
    }

    public canShareRecord(): boolean {
        return false;
    }

    public startRecord(): void {}

    public pauseRecord(): void {}

    public stopRecord(): void {}

    public shareRecord(): void {}

    public resetRecord(): void {}

    public shareInnerRecord(): void {}

    public createMoreGameButton(): void {}

    public createMoreGameBanner(): void {}

    public createMoreGamePortal(): void {}

    public goToGameOrGameList(): void {}

    public showFavoriteGuide(): void {}

    public followAccount(): void {}

    public openAwemeUserProfile(): void {}

    public analytics(): void {}

    public showLoading(): void {
        this.hideLoading();
    }

    public hideLoading(): void {}

    public createGameClub(): void {}

    public navigateToMiniProgram(): void {}

    public shareMessageToFriend(): void {}

    public sendMsgToOpenDataProject(): void {}

    public makeShareUI(
        callback?: () => void, 
        param1?: any, 
        param2?: any, 
        param3: number = 0, 
        param4: boolean = false
    ): void {
        void 0 === param3 && (param3 = 0);
        void 0 === param4 && (param4 = false);
        callback && callback();
    }
}