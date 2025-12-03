import layerBase from "./layerBase";
import EventManager from "./EventManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerLose extends layerBase{
    start() {
        EventManager.instance.EventInterstitial();
        EventManager.instance.EventWinAndFail();
        super.start();
    }
}