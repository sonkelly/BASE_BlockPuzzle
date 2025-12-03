const { ccclass, property } = cc._decorator;
import EventManager from "./EventManager";
import layerBase from "./layerBase";
@ccclass
export default class layerWin extends layerBase {

    start(): void {
        EventManager.instance.EventInterstitial();
        EventManager.instance.EventWinAndFail();
    }
}