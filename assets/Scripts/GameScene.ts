const { ccclass, property } = cc._decorator;
import { MODE, GameMode, SCREEN_OFFSET } from "./Property";
import AudioManager, { AudioID } from "./AudioManager";
import EventManager from "./EventManager";
import Common from "./Common";
import Utils from "./Utils";
import { GameData } from "./GameData";
@ccclass
export default class GameScene extends cc.Component {
    @property(cc.Node)
    fkFrame: cc.Node = null;

    @property(cc.Node)
    fkBg: cc.Node = null;

    @property(cc.Node)
    fkScore: cc.Node = null;

    @property(cc.Prefab)
    rebornNode: cc.Prefab = null;

    @property(cc.Prefab)
    endScorePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    endBestScorePrefab: cc.Prefab = null;

    @property([dragonBones.ArmatureDisplay])
    leafNode: dragonBones.ArmatureDisplay[] = [];

    @property({
        type: [cc.SpriteFrame],
        tooltip: "砸金蛋奖励图片"
    })
    propSpf: cc.SpriteFrame[] = [];

    @property({
        type: cc.Node,
        tooltip: "按钮-道具炸弹"
    })
    btnBomb: cc.Node = null;

    @property({
        type: cc.Node,
        tooltip: "按钮-道具彩虹锤"
    })
    btnRainbow: cc.Node = null;

    private boardFrame: any = null;
    private kuaiManager: any = null;
    private isProp: number = 0;
    private propButton: cc.Node = null;
    private isPropFly: boolean = false;

    onLoad() {
        GameData.pause();
        GameData.gameDataBind = this;
        AudioManager.instance.playSound(AudioID.Start);
        
        this.boardFrame = this.fkFrame.getComponent("boardFrame");
        this.kuaiManager = this.fkBg.getComponent("kuaiManager");
        this.fkScore = this.fkScore.getComponent("fkScore");
        this.changePropCount();
    }

    onDestroy() {
        GameData.gameDataBind = null;
    }

    changePropCount() {
        this.isPropFly = false;
        
        if (this.btnBomb) {
            cc.find("icon_video", this.btnBomb).active = GameData.propBomb < 1;
            cc.find("count", this.btnBomb).active = GameData.propBomb > 0;
            cc.find("count", this.btnBomb).getComponent(cc.Label).string = GameData.propBomb.toString();
        }
        
        if (this.btnRainbow) {
            cc.find("icon_video", this.btnRainbow).active = GameData.propRainBow < 1;
            cc.find("count", this.btnRainbow).active = GameData.propRainBow > 0;
            cc.find("count", this.btnRainbow).getComponent(cc.Label).string = GameData.propRainBow.toString();
        }
        
        console.log("道具数量", GameData.propRainBow, GameData.propBomb);
    }

    start() {
        this.isProp = 0;
        this.propButton = null;
    }

    update(dt: number) {
        if (!GameData.isPause) {
            GameData.pushZJD_autoShow -= dt;
            if (GameData.pushZJD_autoShow < 0) {
                this.pushZaJinDan();
            }
        }
    }

    restartGame() {
        AudioManager.instance.playClickSound();
        
        if (GameMode == MODE.TEACH && GameData.teachingXS == 3) {
            GameData.teachingXS = 0;
            GameData.saveData();
        }
        
        GameData.blockData = [];
        GameData.curScore = 0;
        GameData.initialData();
        Common.instance.toGame();
    }

    pushZaJinDan() {
        Common.instance.pushZaJinDan(this.propSpf);
    }

    onClickBomb(event: cc.Event.EventTouch) {
        if (this.isPropFly) return;
        
        if (this.getIsProp() == 0) {
            if (GameData.propBomb > 0) {
                this.propButton = event.target;
                this.setIsProp(1);
            } else {
                EventManager.instance.showRewardedVideo(() => {
                    this.propButton = event.target;
                    this.setIsProp(1);
                });
            }
        } else {
            this.setIsProp(0);
        }
    }

    onClickRainBow(event: cc.Event.EventTouch) {
        if (this.isPropFly) return;
        
        if (this.getIsProp() == 0) {
            if (GameData.propRainBow > 0) {
                this.propButton = event.target;
                this.setIsProp(2);
            } else {
                EventManager.instance.showRewardedVideo(() => {
                    this.propButton = event.target;
                    this.setIsProp(2);
                });
            }
        } else {
            this.setIsProp(0);
        }
    }

    setIsProp(type: number) {
        this.changePropCount();
        this.isProp = type;
        
        cc.find("Canvas/btnBomb/image").active = this.isProp == 1;
        cc.find("Canvas/btnRainbow/image").active = this.isProp == 2;
        
        if (this.isProp == 1) {
            this.btnBomb.getComponent(cc.Animation).play();
        } else if (this.isProp == 2) {
            this.btnRainbow.getComponent(cc.Animation).play();
        } else {
            this.btnBomb.getComponent(cc.Animation).stop();
            this.btnRainbow.getComponent(cc.Animation).stop();
        }
    }

    getIsProp(): number {
        return this.isProp;
    }

    vibrates(combo: number, xcNum: number) {
        if (combo < 2 && xcNum < 2) return;
        
        console.log("combo=" + combo, "xcNum=" + xcNum);
        
        if (combo == 5 || combo == 10 || combo == 15 || combo == 18 || combo == 20 || xcNum >= 4) {
            this.pushZaJinDan();
        }
        
        if (combo < 7) {
            this.screenVibrates(() => {
                if (xcNum > 1) {
                    this.effectAni(xcNum);
                }
            });
        } else {
            this.effectAni(combo - 5, 1, (e: number) => {
                if (e == 1 && xcNum > 1) {
                    this.effectAni(xcNum, 2);
                }
            });
        }
    }

    effectAni(num: number, type?: number, callback?: Function) {
        console.log("num", num);
        if (num < 2) return;
        
        if (num > 6) {
            num = 6;
        }
        
        this.screenVibrates();
        
        const n = cc.find("Canvas/uiRoot/ShakeNode");
        if (n) {
            const a = cc.find(num + "rows", n);
            const i = cc.instantiate(a);
            i.name = "temp66666";
            i.parent = n;
            i.active = true;
            Utils.nodePlayAnimationCall(i, "effect_shake_" + num, () => {
                if (callback) {
                    callback(type);
                }
            });
        }
        
        const playAnimation = (node: dragonBones.ArmatureDisplay, animName: string) => {
            Utils.playAniCall(node, "newAnimation_1", () => {
                Utils.playAni(node, animName);
            });
        };
        
        for (let s = 0; s < 4; s++) {
            if (this.leafNode[s].animationName != "newAnimation_1") {
                playAnimation(this.leafNode[s], this.leafNode[s].animationName);
            }
        }
    }

    screenVibrates(callback?: Function) {
        const t = cc.find("Canvas/uiRoot");
        const o = t.x;
        const n = t.y;
        
        cc.tween(t)
            .repeat(2, cc.tween()
                .to(0.018, { x: o + (5 + SCREEN_OFFSET), y: n + (7 + SCREEN_OFFSET) })
                .to(0.018, { x: o - (6 + SCREEN_OFFSET), y: n + (7 + SCREEN_OFFSET) })
                .to(0.018, { x: o - (13 + SCREEN_OFFSET), y: n + (3 + SCREEN_OFFSET) })
                .to(0.018, { x: o + (3 + SCREEN_OFFSET), y: n - (6 + SCREEN_OFFSET) })
                .to(0.018, { x: o - (5 + SCREEN_OFFSET), y: n + (5 + SCREEN_OFFSET) })
                .to(0.018, { x: o + (2 + SCREEN_OFFSET), y: n - (8 + SCREEN_OFFSET) })
                .to(0.018, { x: o - (8 + SCREEN_OFFSET), y: n - (10 + SCREEN_OFFSET) })
                .to(0.018, { x: o + (3 + SCREEN_OFFSET), y: n + (10 + SCREEN_OFFSET) })
                .to(0.018, { x: o + (0 + SCREEN_OFFSET), y: n + (0 + SCREEN_OFFSET) })
                .to(0.018, { x: 0, y: 0 })
            )
            .call(() => {
                if (callback) {
                    callback();
                }
            })
            .start();
    }

    tempA(e: number, t: number) {
        this.vibrates(2, t);
    }

    temp_Effect() {
        const e = cc.find("Canvas/New EditBox").getComponent(cc.EditBox).string;
        this.vibrates(Number(e), 6);
    }
}