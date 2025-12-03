const { ccclass, property } = cc._decorator;
import layerBase from "./layerBase";
import EventManager from "./EventManager";
@ccclass
export default class layerScore extends layerBase {

    start() {
        EventManager.instance.EventWinAndFail();
        super.start();
    }
}