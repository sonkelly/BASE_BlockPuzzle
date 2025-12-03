import ExtendScript from "./ExtendScript";
import Utils from "./Utils";

const { ccclass, property } = cc._decorator;

const POP_NAMES: Record<number, string> = {
    2: "popFlatter1",
    3: "popFlatter2",
    4: "popFlatter3",
    5: "popFlatter4",
    6: "popFlatter5",
};

interface PlayEliminateData {
    pos: cc.Vec2;
    disLine: number;
    colorType: string;
}

interface PlayComboData {
    pos: cc.Vec2;
    pos2: cc.Vec2;
    comTimes: number;
    score: number;
}

@ccclass
export default class PlayEffect extends ExtendScript {
    @property(cc.Prefab)
    popFlatter: cc.Prefab = null;

    @property(cc.Prefab)
    popCombo: cc.Prefab = null;

    @property(cc.Prefab)
    popComboScore: cc.Prefab = null;

    @property(cc.Prefab)
    popEliminateScore: cc.Prefab = null;

    playEliminate(data: PlayEliminateData) {
        const node = cc.instantiate(this.popEliminateScore);
        const parent = this.node;

        const PopEliminate = cc.Class({
            extends: cc.Component,
            initial(e: PlayEliminateData) {
                this.node.parent = parent;
                this.node.setPosition(e.pos);

                const lineNode = this.node.children[e.disLine - 1];
                if (!lineNode) return;
                lineNode.active = true;

                const loadDigit = (index: number) => {
                    const digitNode = lineNode.children[index];
                    cc.resources.load(
                        `image/number/${e.colorType}_${digitNode.name}`,
                        cc.SpriteFrame,
                        (err: Error, spriteFrame: cc.SpriteFrame) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            digitNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        }
                    );
                };

                for (let i = 0; i < lineNode.children.length; i++) {
                    loadDigit(i);
                }

                cc.tween(this.node)
                    .to(0.3, { scale: 1 })
                    .delay(0.5)
                    .call(() => this.clean())
                    .start();
            },
            clean() {
                this.node.destroy();
            },
        });

        node.addComponent(PopEliminate);
        (node.getComponent(PopEliminate) as any).initial(data);
    }

    playCombo(data: PlayComboData) {
        const comboNode = cc.instantiate(this.popCombo);
        comboNode.parent = this.node;
        comboNode.position = data.pos;

        // Giới hạn vị trí X
        comboNode.x = Math.max(-140, Math.min(150, comboNode.x));

        comboNode.getChildByName("combo1").active = data.comTimes < 2;
        comboNode.getChildByName("combo").active = data.comTimes > 1;
        comboNode.getChildByName("combo_ske").scale = data.comTimes > 1 ? 1 : 0;
        comboNode.getChildByName("Label_combo").active = data.comTimes > 1;

        const comboLabel = comboNode
            .getChildByName("Label_combo")
            .getComponent(cc.Label);
        comboLabel.string = data.comTimes.toString();

        this.scheduleOnce(() => {
            comboNode.destroy();
            this.playComboScore(data.score, data.pos2);
        }, 1.67);
    }

    playComboScore(score: number, pos: cc.Vec2) {
        const scoreNode = cc.instantiate(this.popComboScore);
        scoreNode.parent = this.node;
        scoreNode.position = pos;

        const label = scoreNode
            .getChildByName("Label_score")
            .getComponent(cc.Label);
        label.string = `+${score}`;

        (Utils as any).nodePlayAnimationCall(scoreNode, null, () => {
            cc.tween(scoreNode)
                .to(0.2, { x: 0, y: 410 })
                .call(() => scoreNode.destroy())
                .start();
        });
    }

    playMultiRow(row: number, pos: cc.Vec2) {
        if (row < 2) return;

        const flatterNode = cc.instantiate(this.popFlatter);
        flatterNode.parent = this.node;
        flatterNode.position = pos;

        (Utils as any).nodePlayAnimationCall(flatterNode, POP_NAMES[row], () => {
            flatterNode.destroy();
        });
    }
}
