const { ccclass, property } = cc._decorator;
import { CommonPrefab } from "./Property";
@ccclass
export default class Prefab extends cc.Component {

    @property(cc.Prefab)
    endWinPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    endLosePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    iceBlock: cc.Prefab = null;

    @property(cc.Prefab)
    newScore: cc.Prefab = null;

    @property(cc.Prefab)
    unbelievable: cc.Prefab = null;

    @property(cc.Prefab)
    boomPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    rainbowPrefab: cc.Prefab = null;

    onLoad(): void {
        if (!CommonPrefab.endWinPrefab) {
            CommonPrefab.endWinPrefab = this.endWinPrefab;
        }
        if (!CommonPrefab.endLosePrefab) {
            CommonPrefab.endLosePrefab = this.endLosePrefab;
        }
        if (!CommonPrefab.iceBlock) {
            CommonPrefab.iceBlock = this.iceBlock;
        }
        if (!CommonPrefab.newScore) {
            CommonPrefab.newScore = this.newScore;
        }
        if (!CommonPrefab.unbelievable) {
            CommonPrefab.unbelievable = this.unbelievable;
        }
        if (!CommonPrefab.boomPrefab) {
            CommonPrefab.boomPrefab = this.boomPrefab;
        }
        if (!CommonPrefab.rainbowPrefab) {
            CommonPrefab.rainbowPrefab = this.rainbowPrefab;
        }
    }
}