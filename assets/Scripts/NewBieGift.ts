import EventListener from "./event_listener";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBieGift extends cc.Component {
    @property(cc.Node)
    m_n_newpanel: cc.Node = null;

    @property(cc.Node)
    m_n_newpanel_success: cc.Node = null;

    @property(cc.Button)
    m_btn_getreward: cc.Button = null;

    @property(cc.Label)
    m_l_desc: cc.Label = null;

    private _onshowback: boolean = false;

    start(): void {
        this.m_n_newpanel.active = false;
        this.m_n_newpanel_success.active = false;
        EventListener.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
        this.updateData();
    }

    onEnable(): void {}

    onDisable(): void {}

    onDestroy(): void {
        EventListener.instance.off(window.ON_SHOW_BACK, this);
    }

    private onshowback(): void {
        if (this._onshowback) {
            this._onshowback = false;
            if (this.m_n_newpanel_success.active) {
                this.m_n_newpanel_success.active = false;
            }
        }
    }

    private autoShowRewardPage(): void {
        if (this.getState() === 1) {
            if (!window.firststart) {
                this.onBtnNewBieClick();
                window.firststart = true;
            }
        }
    }

    private getState(): number {
        let state = 1;
        const loginTime = window.INIT_GAME_SAVE_DATA.login_time;
        
        if (loginTime && loginTime !== "null" && loginTime !== "") {
            const loginDate = loginTime.split("/");
            const currentDateInfo = this.getCurrentDate();
            const currentDate = currentDateInfo[1];
            state = this.judgeTime(loginDate, currentDate);
        }
        
        return state;
    }

    private getCurrentDate(): [string, string[]] {
        const now = new Date();
        const dateStr = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
        const dateArr = dateStr.split("/");
        return [dateStr, dateArr];
    }

    private judgeTime(loginDate: string[], currentDate: string[]): number {
        const loginYear = parseInt(loginDate[0]);
        const currentYear = parseInt(currentDate[0]);
        
        if (loginYear < currentYear) return 1;
        if (loginYear > currentYear) return -1;
        
        const loginMonth = parseInt(loginDate[1]);
        const currentMonth = parseInt(currentDate[1]);
        
        if (loginMonth < currentMonth) return 1;
        if (loginMonth > currentMonth) return -1;
        
        const loginDay = parseInt(loginDate[2]);
        const currentDay = parseInt(currentDate[2]);
        
        let result = 0;
        if (loginDay < currentDay) {
            result = 1;
        } else if (loginDay > currentDay) {
            result = -1;
        }
        
        return result;
    }

    private updateData(): void {
        this.autoShowRewardPage();
        
        if (this.getState() === 1) {
            this.m_btn_getreward.interactable = true;
            this.m_l_desc.string = "每天可领一次";
        } else {
            this.m_btn_getreward.interactable = false;
            const btnLabel = this.m_btn_getreward.node.getComponent(cc.Label);
            if (btnLabel) {
                btnLabel.string = "明天再来吧~";
            }
            this.m_l_desc.string = "每天可领一次(已领取)";
        }
    }

    private onBtnNewBieClick(): void {
        const Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        
        this.m_n_newpanel.active = true;
        
        if (this.getState() === 1) {
            this.m_btn_getreward.interactable = true;
            this.m_l_desc.string = "每天可领一次";
        } else {
            this.m_btn_getreward.interactable = false;
            const btnLabel = this.m_btn_getreward.node.getComponent(cc.Label);
            if (btnLabel) {
                btnLabel.string = "明天再来吧~";
            }
            this.m_l_desc.string = "每天可领一次(已领取)";
        }
    }

    private onBackBtnClick(): void {
        const Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        
        this.m_n_newpanel.active = false;
        this.m_n_newpanel_success.active = false;
    }

    private onRewardBackBtnClick(): void {
        const Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        
        this.m_n_newpanel.active = false;
        this.m_n_newpanel_success.active = false;
    }

    private onBtnGetRewardClick(): void {
        const Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        
        this.m_n_newpanel.active = false;
        this.m_n_newpanel_success.active = true;
        
        const currentDate = this.getCurrentDate()[0];
        this._onshowback = true;
        
        window.INIT_GAME_SAVE_DATA.login_time = currentDate;
        window.INIT_GAME_SAVE_DATA.tool[0] += 1;
        window.INIT_GAME_SAVE_DATA.gold_num += 10;
        
        this.updateData();
        
        if (window.GAME_MENU) {
            window.GAME_MENU.updateGold();
        }
    }

    private onShareBtnClick(): void {
        const Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        
        const ShareSdk = cc.js.getClassByName("ShareSdk");
        const self = this;
        
        ShareSdk.shareAppMessage({
            title: "炸弹，金币每天领，快来领取吧",
            imageUrl: window.tempFileURL[0],
            success: function() {
                //self.m_n_sharenode.active = true;
            },
            fail: function() {},
            complete: function() {}
        });
    }
}