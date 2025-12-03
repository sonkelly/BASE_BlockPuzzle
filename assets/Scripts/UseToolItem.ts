import EventListener from "./event_listener";
import { Property } from "./Property";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UseToolItem extends cc.Component {
    @property(cc.Sprite)
    m_sp_tool: cc.Sprite = null;

    @property(cc.Node)
    m_n_get: cc.Node = null;

    @property
    _tag: number = 0;

    @property([cc.Node])
    m_sp_desclist: cc.Node[] = [];

    @property(cc.Node)
    m_n_shareget: cc.Node = null;

    private _onshowback: boolean = false;
    private m_videoAd: any = null;

    start() {
        EventListener.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
        this.m_n_shareget.active = window.BOX_SHARE && !window.firstshare;
    }

    initToolInfo(tag: number, e: number) {
        this._tag = tag;
        this.m_n_get.active = e <= 0;
    }

    onCloseClick() {
        this.node.active = false;
    }

    onUseClick() {
        if (this._tag === 0 || (this._tag === 1 && Property.GAME_CONTROL)) {
            Property.GAME_CONTROL.onUseStrong();
            this.onCloseClick();
        }
    }

    onAdBtnClick(t: any, e: any) {
        const i = this;
        lplatform.showRanRewardedVideo(function() {
            i.videoReward(e);
        });
    }

    videoReward() {
        window.INIT_GAME_SAVE_DATA.tool[this._tag] += 1;
        o.showGetItem(1, 0, null, 0, 0);
        if (Property.GAME_CONTROL) {
            Property.GAME_CONTROL.updateToolsNum();
        }
    }

    onshowback(t: number) {
        if (this._onshowback) {
            if (t >= window.SHARE_TIME) {
                window.firstshare = true;
                this.m_n_shareget.active = window.BOX_SHARE && !window.firstshare;
                this.videoReward();
            } else {
                n.default.showShareFailTips();
            }
            this._onshowback = false;
        }
    }

    onGetClick() {
        if (window.INIT_GAME_SAVE_DATA.gold_num >= 20) {
            o.showGetItem(1, 0, null, 0, 0);
            window.INIT_GAME_SAVE_DATA.gold_num -= 20;
            window.INIT_GAME_SAVE_DATA.tool[this._tag] += 1;
            if (Property.GAME_CONTROL) {
                Property.GAME_CONTROL.updateToolsNum();
            }
        } else {
            o.showTipsText("no enough gold", null, 0, 0, 60, cc.Color.WHITE);
        }
    }

    onDestroy() {
        EventListener.instance.off(window.ON_SHOW_BACK, this);
        if (this.m_videoAd) {
            this.m_videoAd.destroy();
            this.m_videoAd = null;
        }
    }

    onShareGet() {
        this._onshowback = true;
        c.shareAppMessage({
            title: "Hold this bomb, it's about to explode! It's about to explode!",
            imageUrl: window.tempFileURL[3]
        });
    }
}