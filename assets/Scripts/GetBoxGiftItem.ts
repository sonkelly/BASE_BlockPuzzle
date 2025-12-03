const { ccclass, property } = cc._decorator;
import EventListener from "./event_listener";
import { Property } from "./Property";
@ccclass
export default class GetBoxGiftItem extends cc.Component {
    @property(cc.Node)
    m_n_freebtn: cc.Node = null;

    @property(cc.Node)
    m_n_sharebtn: cc.Node = null;

    @property(cc.Node)
    m_n_box: cc.Node = null;

    private _onshowback: boolean = false;
    private _callback: Function = null;

    start() {
        EventListener.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
    }

    showView(callback: Function) {
        this._callback = callback;
        this.m_n_freebtn.active = !window.BOX_SHARE;
        this.m_n_sharebtn.active = window.BOX_SHARE;
        
        this.m_n_box.runAction(cc.sequence(
            cc.repeat(cc.sequence(
                cc.rotateTo(.1, -10),
                cc.rotateTo(.1, 10)
            ), 3),
            cc.rotateTo(.1, 0)
        ));
    }

    onDestroy() {
        EventListener.instance.off(window.ON_SHOW_BACK, this);
    }

    onshowback(time: number) {
        if (this._onshowback) {
            if (time >= window.SHARE_TIME) {
                this.onFreeGet();
            } else {
                r.default.showShareFailTips();
            }
            this._onshowback = false;
        }
    }

    onClose() {
        if (this._callback) {
            this._callback();
            this._callback = null;
        }
        this.node.active = false;
    }

    onFreeGet() {
        const self = this;
        lplatform.showRanRewardedVideo(() => {
            const items: number[] = [1, 20];
            const index: number = a.random(0, 1500) > 750 ? 0 : 1;
            
            a.showGetItem(items[index], index, null, 0, 0);
            
            if (index === 0) {
                window.INIT_GAME_SAVE_DATA.tool[0] += items[index];
            } else {
                window.INIT_GAME_SAVE_DATA.gold_num += items[index];
            }
            
            if (Property.GAME_CONTROL) {
                Property.GAME_CONTROL.BoxReward(index);
            }
            
            self.onClose();
        });
    }

    onShareGet() {
        this._onshowback = true;
        s.shareAppMessage({
            title: "我就看着你，直到你打开宝箱为止",
            imageUrl: window.tempFileURL[3]
        });
    }
}