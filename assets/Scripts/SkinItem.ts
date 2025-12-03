import EventListener from "./event_listener";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinItem extends cc.Component {
    @property(cc.Label)
    m_l_goldlabel: cc.Label = null;

    @property(cc.Sprite)
    m_sp_blockstyle: cc.Sprite = null;

    @property(cc.Node)
    m_n_isready: cc.Node = null;

    @property(cc.Button)
    m_btn_suitup: cc.Button = null;

    @property(cc.Label)
    m_l_sharetext: cc.Label = null;

    private _data: any = null;
    private _state: number = 0;
    private _index: number = 0;
    private _onshowback: boolean = false;

    start(): void {
        EventListener.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
    }

    onDestroy(): void {
        EventListener.instance.off(window.ON_SHOW_BACK, this);
    }

    updateData(index: number, data: any, spriteFrame: cc.SpriteFrame): void {
        this._index = index;
        this._data = data;
        const skinData = window.INIT_GAME_SAVE_DATA.skin[index];
        this._state = skinData || 0;

        this.m_sp_blockstyle.spriteFrame = spriteFrame;
        this.m_n_isready.active = this._state >= 2;
        this.m_btn_suitup.node.active = this._state < 2;
        this.m_l_goldlabel.string = data.price.toString();

        if (this._state === 0) {
            if (data.way === 1 && window.SKIN_SHARE) {
                this.m_l_sharetext.node.active = true;
                this.m_l_goldlabel.node.parent.active = false;
                this.m_btn_suitup.interactable = true;
            } else {
                this.m_l_sharetext.node.active = false;
                this.m_l_goldlabel.node.parent.active = true;
                this.m_btn_suitup.interactable = window.INIT_GAME_SAVE_DATA.gold_num >= data.price;
            }
            this.m_btn_suitup.node.y = -145;
        } else if (this._state === 1) {
            this.m_l_sharetext.node.active = false;
            this.m_l_goldlabel.node.parent.active = false;
            this.m_btn_suitup.interactable = true;
            this.m_btn_suitup.node.y = -74;
        } else {
            this.m_l_sharetext.node.active = false;
            this.m_l_goldlabel.node.parent.active = false;
        }
    }

    onshowback(count: number): void {
        if (this._onshowback) {
            if (count >= window.SHARE_TIME) {
                this.onSuitUp();
            } else {
                // Assuming Common_CommonUtil is imported as CommonUtil
                CommonUtil.showShareFailTips();
            }
            this._onshowback = false;
        }
    }

    onSuitUp(): void {
        if (!this.m_btn_suitup.interactable) return;

        const skinData = window.INIT_GAME_SAVE_DATA.skin;
        for (let i = 0; i < skinData.length; i++) {
            if (skinData[i] === 2) {
                skinData[i] = 1;
                skinData[this._index] = 2;
                break;
            }
        }

        if (this._state === 0) {
            if (this._data.way !== 0 && window.SKIN_SHARE) {
                this._onshowback = true;
                // Assuming ShareSdk is imported
                ShareSdk.shareAppMessage({
                    title: "获得了一个怪兽皮肤，快来看看吧",
                    imageUrl: window.tempFileURL[1]
                });
            } else {
                window.INIT_GAME_SAVE_DATA.gold_num -= this._data.price;
                EventListener.instance.fire(window.GAME_UPDATE_DATA);
            }
        }

        EventListener.instance.fire(window.GAME_SAVE_HANDLER);
    }
}