const { ccclass, property } = cc._decorator;
import { Property } from "./Property";
@ccclass
export default class BombEffectItem extends cc.Component {

    start(): void {
    }

    bombFinish(): void {
        if (Property.GAME_CONTROL) {
            Property.GAME_CONTROL.bombFinish();
        }
    }
}