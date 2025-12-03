import { Property } from "./Property";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideManager extends cc.Component {
    @property(cc.Node)
    m_n_mask: cc.Node = null;

    @property(cc.Node)
    m_n_guide_circle: cc.Node = null;

    @property(cc.Node)
    m_n_bubble1: cc.Node = null;

    @property(cc.Node)
    m_n_bubble2: cc.Node = null;

    @property(cc.Node)
    m_n_confirm: cc.Node = null;

    @property(cc.Node)
    m_sp_maskbg: cc.Node = null;

    private m_cur_tag: number = 0;
    private m_cur_index: number = 0;
    private _guide_data: any = null;
    private _confirm: boolean = false;

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    showGuide(t: number, e: number) {
        if (window.GUIDE_LEVEL >= t) return;

        this.m_cur_tag = t;
        this.m_cur_index = e;

        if (!window.CONFIG_GUIDE[t][e]) {
            this.node.active = false;
            window.GUIDE_LEVEL += 1;
            cc.sys.localStorage.setItem("guideinfo", "" + window.GUIDE_LEVEL);
            return;
        }

        this._guide_data = window.CONFIG_GUIDE[t][e];
        this.setGuideInfo(this._guide_data);
        
        if (!this.node.active) {
            this.node.active = true;
        }
    }

    private touchStart(t: cc.Event.EventTouch) {
        if (this._guide_data.type === 2) {
            t.stopPropagation();
            return;
        }

        if (!Property.GAME_CONTROL) {
            this.node.active = false;
            return;
        }

        const e = t.touch.getLocation();
        if (Property.GAME_CONTROL.getTouchIndex(e) !== this._guide_data.target) {
            this._confirm = false;
            t.stopPropagation();
            return;
        }

        this._confirm = true;
    }

    private touchEnd() {
        if (this._guide_data.type !== 2 && this._confirm) {
            this.showNextGuide();
        }
        this._confirm = false;
    }

    private showNextGuide() {
        this._guide_data.target = -2;
        this._guide_data.type = -1;

        setTimeout(() => {
            this.m_cur_index += 1;
            this.showGuide(this.m_cur_tag, this.m_cur_index);
        }, window.CONFIG_GUIDE[this.m_cur_tag][this.m_cur_index].delaytime);
    }

    private onConfirmClick() {
        const Utils3 = cc.find("Utils3").getComponent("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        this.showNextGuide();
    }

    private setGuideInfo(t: any) {
        this.m_n_bubble1.active = t.dir === 1;
        this.m_n_bubble2.active = t.dir === 2;

        const e = t.dir === 1 ? this.m_n_bubble1 : this.m_n_bubble2;
        const i = cc.find("l_guide_desc", e);
        const n = t.dir === 1 ? -1 : 1;

        i.width = t.descsize[0];
        i.height = t.descsize[1];
        i.getComponent(cc.Label).string = t.desc;

        e.width = t.descsize[0] + 100;
        e.height = t.descsize[1] + 50;
        cc.find("sp_mon", e).y = e.height / 2;

        if (typeof t.target === "string") {
            const o = cc.find(t.target);
            this.m_n_mask.position = o.position;
            this.m_n_mask.width = o.width + 10;
            this.m_n_mask.height = o.height + 10;

            e.x = this.m_n_mask.x + n * this.m_n_mask.width / 2;
            e.y = this.m_n_mask.y + this.m_n_mask.height / 2 + t.offsetY;

            this.m_n_guide_circle.width = this.m_n_mask.width + 30;
            this.m_n_guide_circle.height = this.m_n_mask.height + 30;
            this.m_n_guide_circle.getComponent(cc.Animation).play();
            this.m_n_guide_circle.position = this.m_n_mask.position;

            this.m_sp_maskbg.x = -this.m_n_mask.x;
            this.m_sp_maskbg.y = -this.m_n_mask.y;
        } else if (typeof t.target === "number") {
            if (t.target === -1) {
                this.m_n_mask.width = 0;
                this.m_n_mask.height = 0;
                this.m_n_guide_circle.width = 0;
                e.y = 0;
                e.x = 0;
            } else if (Property.GAME_CONTROL) {
                const c = Property.GAME_CONTROL.getTargetGridInfo(t.target);
                this.m_n_mask.position = c.position;
                this.m_n_mask.width = c.width + 10;
                this.m_n_mask.height = c.height + 10;

                e.x = this.m_n_mask.x + n * this.m_n_mask.width / 2;
                e.y = this.m_n_mask.y + this.m_n_mask.height / 2 + t.offsetY;

                this.m_n_guide_circle.width = this.m_n_mask.width + 30;
                this.m_n_guide_circle.height = this.m_n_mask.height + 30;
                this.m_n_guide_circle.getComponent(cc.Animation).play();
                this.m_n_guide_circle.position = this.m_n_mask.position;

                this.m_sp_maskbg.x = -this.m_n_mask.x;
                this.m_sp_maskbg.y = -this.m_n_mask.y;
            }
        }

        if (t.type === 2) {
            this.m_n_confirm.active = true;
            this.m_n_confirm.x = e.x + n * e.width / 2;
            this.m_n_confirm.y = e.y - 40;
        } else {
            this.m_n_confirm.active = false;
        }
    }
}