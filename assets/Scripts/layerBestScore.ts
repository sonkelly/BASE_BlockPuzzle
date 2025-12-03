const { ccclass, property } = cc._decorator;
import EventManager from "./EventManager";
import layerBase from "./layerBase";
@ccclass
export default class layerBestScore extends layerBase {
    start(): void {
        EventManager.instance.EventInterstitial();
    }
}