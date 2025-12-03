const { ccclass, property } = cc._decorator;
import { GameData } from "./GameData";
@ccclass
export default class BlockScore extends cc.Component {
    
    public init(score: string, duration: number, targetPosition: cc.Vec3): void {
        const label = this.node.getComponent(cc.Label);
        if (label) {
            label.string = score;
        }

        cc.tween(this.node)
            .to(duration, {
                position: targetPosition,
                scale: 0.5
            })
            .call(() => {
                this.node.removeFromParent();
                if (GameData.gameDataBind && GameData.gameDataBind.addScore) {
                    GameData.gameDataBind.addScore(score);
                }
            })
            .start();
    }
}