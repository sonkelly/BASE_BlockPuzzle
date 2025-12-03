const { ccclass, property } = cc._decorator;
import Common from "./Common";
import EventManager from "./EventManager";
import ExtendScript from "./ExtendScript";
import { CHANNEL } from "./PlatformA";
import Utils from "./Utils";
@ccclass
export default class PushTeach extends ExtendScript {
    @property(cc.Node)
    btnCloseQQ: cc.Node = null;

    @property(cc.Node)
    btn_lookAD: cc.Node = null;

    @property(cc.Node)
    btn_change: cc.Node = null;

    private callback: Function = null;

    onLoad() {
        this.node.active = false;
        
        if (lplatform.channel == CHANNEL.qq && 
            lplatform.labData.changePosition && 
            lplatform.labData.changePosition == 1 && 
            Math.random() > 0.5) {
            Utils.exchangePosition(this.btn_change, this.btnCloseQQ);
        }
        if (lplatform.channel == CHANNEL.oppo && 
            lplatform.labData.changePosition && 
            lplatform.labData.changePosition == 1 && 
            Math.random() > 0.5) {
            Utils.exchangePosition(this.btn_change, this.btn_lookAD);
        }
    }

    start() {
        EventManager.instance.EventInterstitial();
    }

    initial(e: Function) {
        this.callback = e;
    }

    onClickBack() {
        this.clean();
        Common.instance.toMenu();
    }

    onClickLookAD() {
        if (window.ClickAdCallback != null) {
            window.ClickAdCallback();
        }
    }

    onClickClose() {
        if (this.callback) {
            this.callback();
        }
        this.clean();
    }

    clean() {
        this.node.active = false;
    }
}