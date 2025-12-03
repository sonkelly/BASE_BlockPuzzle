const { ccclass, property } = cc._decorator;
import ExtendScript from "./ExtendScript";
import AudioManager, { AudioID } from "./AudioManager";
import { GameMode, BlockConfig, PROP_BOMB, PROP_RAINBOW ,MODE, CommonPrefab } from "./Property";
import { GameData } from "./GameData";

@ccclass
export default class KuaiFrame extends ExtendScript {
    @property([cc.SpriteFrame])
    ksf: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    ksp: cc.Sprite = null;

    @property(cc.Node)
    kOpacity: cc.Node = null;

    private isHaveFK: boolean = null;
    private simulateFK: any = null;
    private index: number = 0;
    private putState: boolean = false;
    private row: number = 0;
    private col: number = 0;

    onLoad() {
        this.isHaveFK = null;
        this.simulateFK = null;
        this.index = 0;
        this.putState = false;
    }

    initial(e: any) {
        this.row = e.row;
        this.col = e.col;
        this.index = e.index;
        this.node.width = e.wh;
        this.node.height = e.wh;
        this.node.x = -e.fristPos + e.row * e.wh;
        this.node.y = e.fristPos - e.col * e.wh;
    }

    showOpacity() {
        if ((GameMode == MODE.TEACH && GameData.teachingXS < 3) || 
            (GameMode == MODE.JINGDIAN && GameData.teaching < 3)) {
            return;
        }
        this.kOpacity.active = true;
        this.kOpacity.scale = BlockConfig[GameMode].wh / BlockConfig.normalWH;
    }

    hideOpacity() {
        this.kOpacity.active = false;
    }

    showColor(e: number) {
        this.ksp.spriteFrame = this.ksf[e];
        this.ksp.node.opacity = 100;
        this.node.scale = BlockConfig[GameMode].wh / BlockConfig.normalWH;
    }

    hideColor() {
        this.ksp.node.opacity = 0;
    }

    revertData(e: cc.Prefab, t: any) {
        this.isHaveFK = t.isHaveFK;
        this.index = t.index;
        this.putState = t.putState;
        this.simulateFK = t.simulateFK;
        this.row = t.row;
        this.col = t.col;

        const o = cc.instantiate(e);
        o.parent = this.node;
        o.x = t.knData.x;
        o.y = t.knData.y;
        o.scale = t.knData.scale;
        o.zIndex = t.knData.zIndex;
        o.getComponent("block").initial(t.knData.type);
    }

    getInfo(): any {
        return {
            row: this.row,
            col: this.col,
            index: this.index,
            isHaveFK: this.isHaveFK,
            putState: this.putState,
            spFrameType: this.spFrameType,
            simulateFK: this.simulateFK
        };
    }

    onClickSelf() {
        console.log("行=" + this.row, "列=" + this.col, "序号" + this.index);
        
        if (GameData.gameDataBind.propButton) {
            const t = cc.instantiate(GameData.gameDataBind.propButton);
            t.parent = cc.find("Canvas");
            t.removeAllChildren();
            
            const o = Math.floor(3 * Math.random());
            const n = [cc.v2(0, 0), cc.v2(-360, 360), cc.v2(360, 360)];
            
            cc.tween(t)
                .bezierTo(1, cc.v2(t.x, t.y), n[o], cc.v2(this.node.x, this.node.y + 137))
                .call(() => {
                    t.destroy();
                    this.propMoveFinish(GameData.gameDataBind.getIsProp());
                })
                .start();
                
            GameData.gameDataBind.propButton = null;
        }
    }

    addEffect(e: number, t: cc.Vec2) {
        
        const o = cc.instantiate(e == 1 ? CommonPrefab.boomPrefab : CommonPrefab.rainbowPrefab);
        o.getComponent(ExtendScript).initial(e, t);
        o.parent = this.node;
    }

    propMoveFinish(e: number) {
        if (GameData.gameDataBind.getIsProp() == 1) {
            this.addEffect(1, cc.v2(this.node.x, this.node.y));
            GameData.propBomb--;
            if (GameData.propBomb < 0) {
                GameData.propBomb = 0;
            }
        } else if (GameData.gameDataBind.getIsProp() == 2) {
            this.addEffect(2, cc.v2(this.node.x, this.node.y));
            this.addEffect(3, cc.v2(this.node.x, this.node.y));
            GameData.propRainBow--;
            if (GameData.propRainBow < 0) {
                GameData.propRainBow = 0;
            }
        }
        
        GameData.saveData();
        GameData.gameDataBind.changePropCount();
        
        if (e == 1) {
            AudioManager.instance.playSound(AudioID.Bomb);
        } else if (e == 2) {
            AudioManager.instance.playSound(AudioID.RainBow);
        }

        const t: cc.Vec2[] = [];
        let a: any[] = null;
        
        if (GameData.gameDataBind.getIsProp() == 1) {
            a = PROP_BOMB;
        } else if (GameData.gameDataBind.getIsProp() == 2) {
            a = PROP_RAINBOW;
        }

        if (a != null) {
            for (let r = 0; r < a.length; r++) {
                const s = this.col + a[r].x;
                const c = this.row + a[r].y;
                t[r] = cc.v2(s, c);
            }

            let i = 0;
            for (let l = 0; l < t.length; l++) {
                if (t[l].x < 0 || t[l].x > BlockConfig[GameMode].row - 1 || 
                    t[l].y < 0 || t[l].y > BlockConfig[GameMode].col - 1) {
                    continue;
                }
                
                const d = t[l].x * BlockConfig[GameMode].row + t[l].y;
                const h = GameData.gameDataBind.boardFrame.frameList[d].getChildByName("kn");
                
                if (h) {
                    h.getComponent(ExtendScript).playDragon(h.getComponent(ExtendScript)._cType, 0);
                    GameData.gameDataBind.boardFrame.frameList[d].getComponent("kuaiFrame").simulateFK = null;
                    GameData.gameDataBind.boardFrame.frameList[d].getComponent("kuaiFrame").isHaveFK = null;
                    i++;
                }
            }

            if (i > 0) {
                GameData.gameDataBind.boardFrame.kkuaiM = {
                    _colorType: 0
                };
                GameData.gameDataBind.boardFrame.checkScore(1, true, cc.v2(0, 0));
                
                const clientEvent = cc.find("clientEvent").getComponent("clientEvent");
                clientEvent.dispatchEvent("useProp");
            }
            
            GameData.gameDataBind.setIsProp(0);
        }
    }
}