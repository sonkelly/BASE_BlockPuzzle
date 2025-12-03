const { ccclass, property } = cc._decorator;
import ExtendScript from "./ExtendScript";
import Utils from "./Utils";
@ccclass
export default class EffectBomb extends ExtendScript {
    @property({
        type: dragonBones.ArmatureDisplay,
        tooltip: "特效龙骨动画"
    })
    aniNode: dragonBones.ArmatureDisplay = null;

    initial(e: number, t: cc.Vec2): void {
        const o = this;
        console.log(e, t);
        
        if (e === 1) {
            Utils.playAniCall(this.aniNode, "newAnimation", function() {
                o.node.destroy();
            });
        } else if (e === 2) {
            Utils.playAniCall(this.aniNode, "newAnimation", function() {
                o.node.destroy();
            });
            this.aniNode.node.x = -t.x;
        } else if (e === 3) {
            Utils.playAniCall(this.aniNode, "newAnimation", function() {
                o.node.destroy();
            });
            this.aniNode.node.angle = -90;
            this.aniNode.node.y = -t.y;
        }
    }
}