const { ccclass, property } = cc._decorator;
import Common from "./Common";
import EventManager from "./EventManager";
import ExtendScript from "./ExtendScript";
import { Property } from "./Property";
import { GameData } from "./GameData";
import { CHANNEL } from "./PlatformA";
import Utils from "./Utils";

@ccclass
export default class PushChange extends ExtendScript {
    @property(cc.Node)
    btnCloseQQ: cc.Node = null;

    @property(cc.Node)
    btn_lookAD: cc.Node = null;

    @property(cc.Node)
    btn_change: cc.Node = null;

    private callback: Function = null;
    private callback2: Function = null;
    private blockType: any = null;

    onLoad(): void {
        if (lplatform.channel == CHANNEL.qq && lplatform.labData.changePosition && 
            lplatform.labData.changePosition == 1 && Math.random() > 0.5) {
            Utils.exchangePosition(this.btn_change, this.btnCloseQQ);
        }
        
        if (lplatform.channel == CHANNEL.oppo && lplatform.labData.changePosition && 
            lplatform.labData.changePosition == 1 && Math.random() > 0.5) {
            Utils.exchangePosition(this.btn_change, this.btn_lookAD);
        }
    }

    start(): void {
        EventManager.instance.EventInterstitial();
    }

    initial(e: Function, t: Function): void {
        this.callback = e;
        this.callback2 = t;
    }

    onClickChange(): void {
        if (lplatform.channel == CHANNEL.oppo || lplatform.channel == CHANNEL.vivo) {
            this.videoFinish();
        } else {
            EventManager.instance.showRewardedVideo(() => {
                return this.videoFinish();
            });
        }
    }

    videoFinish(): void {
        if (this.callback) {
            this.callback(this.blockType);
        }
        this.clean();
    }

    onClickLookAD(): void {
        if (window.ClickAdCallback != null) {
            window.ClickAdCallback();
        }
    }

    onClickClose(): void {
        if (this.callback2) {
            this.callback2();
        }
        this.clean();
    }

    clean(): void {
        Common.instance.pushChangeTime();
        GameData.pushChange_Time = Property.PUSH_TIME;
        GameData.pushChangeCount--;
        GameData.resume();
        this.node.destroy();
    }
}