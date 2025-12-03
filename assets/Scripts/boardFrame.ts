const { ccclass, property } = cc._decorator;
import AudioManager, { AudioID } from "./AudioManager";
import clientEvent from "./clientEvent";
import Common from "./Common";
import LvData_JieMi from "./LvData_JieMi";
import { CHANNEL } from "./PlatformA";
import { MODE, GameMode, BlockConfig, Property, LINE_SCORE, DELAY_TIME, TEACHING, DIS_LIST_8X8, DIS_LIST_9X9, DIS_LIST_9G } from "./Property";
import Utils from "./Utils";
import LvData_ChuangGuan from "./LvData_ChuangGuan";
import { GameData } from "./GameData";
@ccclass
export default class BoardFrame extends cc.Component {
    @property(cc.Prefab)
    kFramePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null;

    @property(dragonBones.ArmatureDisplay)
    dragonEage: dragonBones.ArmatureDisplay = null;

    private playEffect: any = null;
    private frameList: cc.Node[] = [];
    private xcList: number[][] = [];
    private xcListClone: number[][] = [];
    private lastLength: number = 10000;
    private grayNum: number = 0;
    private putNum: number = 0;
    private score: number = 0;
    private comboStep: number = 0;
    private comboTimes: number = -1;
    private effectPos: cc.Vec2 = cc.v2(0, 0);
    private effectPos2: cc.Vec2 = cc.v2(0, 0);
    private kkuaiM: any = null;
    private disArr: number[][] = [];
    private iceBlockNum: number = 0;

    onLoad() {
        this.playEffect = this.node.getComponent("playEffect");
        this.frameList = [];
        this.xcList = [];
        this.xcListClone = [];
        this.lastLength = 10000;
        this.grayNum = 0;
        this.putNum = 0;
        this.score = 0;
        this.resetParame();
        this.initialBoard();
        this.playBoardAimation("kaichang", () => {});
        clientEvent.on("blockPut", this.checkbloackPut, this);
        clientEvent.on("curCickKuaiM", this.getCurClickKuaiM, this);
        clientEvent.on("setGray", this.grayCount, this);
        clientEvent.on("reviveEvent", this.reviveEvent, this);
        GameData.resume();
    }

    resetParame() {
        this.comboStep = BlockConfig[GameMode].comboStep;
        this.comboTimes = -1;
        this.effectPos = cc.v2(0, 0);
    }

    initialBoard() {
        switch (GameMode) {
            case MODE.TEACH:
                this.disArr = DIS_LIST_8X8;
                this.initCheckBoard();
                this.defaultCheckBoard(TEACHING.BOARD[GameData.teachingXS], TEACHING.COLOR[GameData.teachingXS]);
                this.showTeaching();
                break;
            case MODE.JINGDIAN:
                this.disArr = DIS_LIST_8X8;
                if (GameData.teaching < 3) {
                    this.initCheckBoard();
                    this.defaultCheckBoard(TEACHING.BOARD[GameData.teaching], TEACHING.COLOR[GameData.teaching]);
                    this.showTeaching();
                } else {
                    this.revertEight();
                }
                break;
            case MODE.JIUJIU:
            case MODE.JIUJIU2:
                this.disArr = DIS_LIST_9X9;
                this.initCheckBoard();
                break;
            case MODE.JIUGONG:
                this.disArr = DIS_LIST_9G;
                this.initCheckBoard();
                break;
            case MODE.JIEMI:
                this.disArr = DIS_LIST_9X9;
                this.initCheckBoard();
                this.defaultCheckBoard(LvData_JieMi.JM_LEVEL_DATA[GameData.level[GameMode]].board, LvData_JieMi.JM_LEVEL_DATA[GameData.level[GameMode]].color);
                break;
            case MODE.CHUANGGUAN:
                this.disArr = DIS_LIST_9X9;
                this.iceBlockNum = LvData_ChuangGuan.CG_LEVEL_DATA[GameData.level[GameMode]].board.length;
                this.initCheckBoard();
                this.defaultCheckBoard(LvData_ChuangGuan.CG_LEVEL_DATA[GameData.level[GameMode]].board, LvData_ChuangGuan.CG_LEVEL_DATA[GameData.level[GameMode]].color);
                break;
        }
    }

    showTeaching(e: boolean = true) {
        cc.find("Canvas/teaching/teach_di").active = e;
        if (GameMode == MODE.JINGDIAN) {
            cc.find("Canvas/teaching/" + GameData.teaching).active = e;
        } else if (GameMode == MODE.TEACH) {
            cc.find("Canvas/teaching/" + GameData.teachingXS).active = e;
        }
    }

    playBoardAimation(e: string, t: Function) {
        this.dragonEage.node.active = true;
        Utils.playAniCall(this.dragonEage, e, () => {
            t && t();
            this.dragonEage.node.active = false;
        });
    }

    onDestroy() {
        clientEvent.off("blockPut", this.checkbloackPut, this);
        clientEvent.off("curCickKuaiM", this.getCurClickKuaiM, this);
        clientEvent.off("setGray", this.grayCount, this);
        clientEvent.off("reviveEvent", this.reviveEvent, this);
    }

    initCheckBoard() {
        let e = 0;
        let t: cc.Node[] = [];
        let o = this.node.width / 2 - BlockConfig[GameMode].wh / 2;

        for (let n = 0; n < BlockConfig[GameMode].col; n++) {
            for (let a = 0; a < BlockConfig[GameMode].row; a++) {
                let i = {
                    row: a,
                    col: n,
                    index: ++e,
                    fristPos: o,
                    wh: BlockConfig[GameMode].wh
                };
                t.push(this.createKFrame(i));
            }
        }
        this.frameList = t;
    }

    defaultCheckBoard(e: number[], t: any) {
        for (let o = 0; o < e.length; o++) {
            let n = e[o] - 1;
            let a = cc.instantiate(this.blockPrefab);
            a.parent = this.frameList[n];
            a.width = BlockConfig[GameMode].wh;
            a.height = BlockConfig[GameMode].wh;
            a.getComponent("block").initial(Array.isArray(t) ? t[o] : t);
            
            if (GameMode == MODE.CHUANGGUAN) {
                a.getComponent("block").modeCGInitial({
                    num: LvData_ChuangGuan.CG_LEVEL_DATA[GameData.level[GameMode]].number[o]
                });
            }
            
            this.frameList[n].getComponent("kuaiFrame").isHaveFK = true;
            this.frameList[n].getComponent("kuaiFrame").simulateFK = true;
        }
    }

    revertEight() {
        let e = 0;
        let t: cc.Node[] = [];
        let o = this.node.width / 2 - BlockConfig[GameMode].wh / 2;

        for (let n = 0; n < BlockConfig[GameMode].col; n++) {
            for (let a = 0; a < BlockConfig[GameMode].row; a++) {
                let i = {
                    row: a,
                    col: n,
                    index: ++e,
                    fristPos: o,
                    wh: BlockConfig[GameMode].wh
                };
                t.push(this.createKFrame(i, true));
            }
        }
        this.frameList = t;
        this.score = GameData.curScore;
        GameData.gameDataBind.fkScore.setBoardScore(this.score, 1);
    }

    createKFrame(e: any, t: boolean = false): cc.Node {
        let o = cc.instantiate(this.kFramePrefab);
        o.parent = this.node;
        o.getComponent("kuaiFrame").initial(e);
        
        if (t && GameData.blockData[e.index] != null) {
            o.getComponent("kuaiFrame").revertData(this.blockPrefab, GameData.blockData[e.index]);
        }
        
        return o;
    }

    checkPutPos(e: number[]): number {
        for (let t = 0; t < e.length; t++) {
            let o = e[t] - 1;
            if (this.frameList[o].getComponent("kuaiFrame").putState) {
                return t;
            }
        }
        return -1;
    }

    setEffectPos() {
        let e = this.xcList[0];
        let t = e[this.checkPutPos(e)] - 1;
        this.effectPos = this.frameList[t].getPosition();
        let o = this.kkuaiM._width;
        let n = this.kkuaiM._height;
        this.effectPos2 = cc.v2(this.effectPos.x + o / 2 - 40, this.effectPos.y - n / 2 + 40);
    }

    getEffectPos(): cc.Vec2 {
        return cc.v2(this.effectPos.x, this.effectPos.y);
    }

    cleanBlock(e: cc.Node, t: number, o: number) {
        if (GameMode == MODE.JIEMI) {
            if (e.getComponent("block")._move == 0) {
                GameData.gameDataBind.fkScore._nowTaskNum++;
                GameData.gameDataBind.fkScore.setTaskNumber();
            }
        } else if (GameMode == MODE.CHUANGGUAN && e.getComponent("block").getIsIce() == 1) {
            let i = e.getComponent("block").getXcNumber();
            if (--i < 1) {
                GameData.gameDataBind.fkScore._nowTaskNum++;
                GameData.gameDataBind.fkScore.setTaskNumber();
            }
            e.getComponent("block").setIceNumber(i, () => {
                this.cleanBoardFrame(t);
                this.iceBlockNum--;
                if (this.iceBlockNum <= 0) {
                    Common.instance.showGameWinLayer();
                }
            });
            return;
        }
        
        e.getComponent("block").playDragon(this.kkuaiM._colorType, o);
        this.cleanBoardFrame(t);
    }

    cleanBoardFrame(e: number) {
        this.frameList[e - 1].getComponent("kuaiFrame").simulateFK = null;
        this.frameList[e - 1].getComponent("kuaiFrame").isHaveFK = null;
        
        if (GameMode == MODE.JINGDIAN) {
            GameData.blockData[e] = null;
            GameData.saveData();
        }
    }

    checkbloackPut() {
        this.score += this.kkuaiM.checkFKlist.length;
        GameData.gameDataBind.fkScore.setBoardScore(this.score);
        
        let e = 0;
        if (this.xcList.length > 0) {
            this.setEffectPos();
            
            for (let t = 0; t < this.xcList.length; t++) {
                e = 0;
                let o = this.xcList[t];
                let n = this.checkPutPos(o);
                
                for (let a = n; a >= 0; a--) {
                    let i = o[a];
                    let r = this.frameList[i - 1].getChildByName("kn");
                    if (r) {
                        e += Property.XC_DELAY_TIME;
                        this.cleanBlock(r, i, e);
                    }
                }
                
                e = 0;
                for (let s = n + 1; s < o.length; s++) {
                    let c = o[s];
                    let l = this.frameList[c - 1].getChildByName("kn");
                    if (l) {
                        e += Property.XC_DELAY_TIME;
                        this.cleanBlock(l, c, e);
                    }
                }
            }
            
            this.checkScore(this.xcList.length);
        } else {
            this.comboStep--;
            if (this.comboStep <= 0) {
                this.comboStep = 0;
                GameData.gameDataBind.fkScore.hideHeatBeat();
            }
        }
        
        let d: number[] = [];
        for (let h = 0; h < this.frameList.length; h++) {
            if (!this.frameList[h].getComponent("kuaiFrame").isHaveFK) {
                d.push(h);
            }
        }
        
        let u = d.length < Property.PUSH_NONE;
        let m: number[] = [];
        for (let f = 0; f < this.frameList.length; f++) {
            if (!this.frameList[f].getComponent("kuaiFrame").isHaveFK && this.checkHaveFK(f) == 1) {
                m.push(f);
            }
        }
        
        let p = m.length > Property.PUSH_NONE_CLOSE;
        if (u || p) {
            GameData.gameDataBind.kuaiManager.showRefreshBlock();
        }
    }

    checkHaveFK(e: number): number {
        let t: number[] = [];
        let o = [e - 1, e + 1, e - BlockConfig[GameMode].row, e + BlockConfig[GameMode].row];
        
        for (let n = 0; n < o.length; n++) {
            if (this.frameList[o[n]] == null) {
                t[n] = 1;
            } else {
                t[n] = this.frameList[o[n]].getComponent("kuaiFrame").isHaveFK == null ? 0 : 1;
            }
        }
        
        for (let a = 0; a < t.length; a++) {
            if (t[a] == 0) {
                return 0;
            }
        }
        return 1;
    }

    checkScore(e: number, t: boolean = false, o: cc.Vec2 = null) {
        if (this.comboStep > 0 || this.comboTimes == -1) {
            this.comboTimes++;
        } else {
            this.comboTimes = 0;
        }
        
        this.comboStep = BlockConfig[GameMode].comboStep;
        AudioManager.instance.playSound(AudioID.Combo + (this.comboTimes > 10 ? 10 : this.comboTimes));
        
        if (this.comboTimes >= 2) {
            GameData.gameDataBind.fkScore.playSke();
        }
        
        let r = LINE_SCORE[e - 1];
        
        this.scheduleOnce(() => {
            if (this.comboTimes > 0) {
                let n = r * (this.comboTimes + 1);
                this.score += n;
                
                if (t) {
                    let a = {
                        comTimes: this.comboTimes,
                        pos: o,
                        score: n,
                        pos2: o
                    };
                    this.playEffect.playCombo(a);
                } else {
                    let s = {
                        comTimes: this.comboTimes,
                        pos: this.getEffectPos(),
                        score: n,
                        pos2: this.effectPos2
                    };
                    this.playEffect.playCombo(s);
                }
            } else {
                this.score += r;
                if (t) {
                    let c = {
                        pos: o,
                        disLine: e,
                        colorType: 0
                    };
                    this.playEffect.playEliminate(c);
                } else {
                    let l = {
                        pos: this.getEffectPos(),
                        disLine: e,
                        colorType: this.kkuaiM._colorType
                    };
                    this.playEffect.playEliminate(l);
                }
            }
        }, DELAY_TIME.combo);
        
        if (e > 1) {
            this.scheduleOnce(() => {
                AudioManager.instance.playSound((lplatform.channel == CHANNEL.qq ? AudioID.LienTempQQ : AudioID.LienTemp) + e);
                if (t) {
                    this.playEffect.playMultiRow(e, o);
                } else {
                    this.playEffect.playMultiRow(e, this.getEffectPos());
                }
            }, DELAY_TIME.flatter);
        }
        
        if (this.isClearBoard()) {
            if (GameMode == MODE.JIEMI) {
                console.log("解密模式胜利");
                GameData.isWin = true;
            }
            
            this.scheduleOnce(() => {
                if (GameMode == MODE.JIEMI) {
                    this.score += 300;
                    Common.instance.showUnbelievable();
                    this.scheduleOnce(() => {
                        if (GameData.gameDataBind.kuaiManager.getBlockNum() <= 0) {
                            Common.instance.showGameWinLayer();
                        }
                    }, 3);
                } else if (this.score >= Property.BOARD_CLEAN_ANI_SCORE) {
                    this.score += 300;
                    this.playBoardAimation("quanxiao");
                    Common.instance.showUnbelievable();
                }
            }, DELAY_TIME.clean);
        }
        
        this.scheduleOnce(() => {
            GameData.gameDataBind.fkScore.setBoardScore(this.score);
            if (this.score > 1000 && Math.floor(this.score / 1000) != GameData.zjd_Score) {
                GameData.zjd_Score = Math.floor(this.score / 1000);
                GameData.gameDataBind.pushZaJinDan();
            }
        }, DELAY_TIME.score);
        
        GameData.gameDataBind.vibrates(this.comboTimes, e);
    }

    isClearBoard(): boolean {
        for (let e = 0; e < this.frameList.length; e++) {
            if (this.frameList[e].getComponent("kuaiFrame").isHaveFK) {
                return false;
            }
        }
        return true;
    }

    checkXC() {
        let e: number[] = [];
        for (let t = 0; t < this.frameList.length; t++) {
            if (this.frameList[t].getComponent("kuaiFrame").simulateFK) {
                e.push(this.frameList[t].getComponent("kuaiFrame").index);
            }
        }
        
        e.sort((a, b) => a - b);
        this.xcListClone = this.xcList.concat();
        this.xcList = [];
        
        for (let o = 0; o < this.disArr.length; o++) {
            let n = this.disArr[o];
            let a = Utils.get2AryIntersect(e, n);
            if (a.length > 0 && Utils.check2AryIsEqual(n, a)) {
                this.xcList.push(n);
            }
        }
        
        if (!Utils.check4AryIsEqual(this.xcListClone, this.xcList)) {
            for (let i = 0; i < this.frameList.length; i++) {
                let r = this.frameList[i].getChildByName("kn");
                if (r) {
                    let s = r.getComponent("block");
                    if (s.isChange) {
                        s.setSprite(s._cType);
                        s.isChange = false;
                    }
                }
            }
            
            for (let c = 0; c < this.kkuaiM.node.children.length; c++) {
                if (GameMode == MODE.JINGDIAN) {
                    this.kkuaiM.node.children[c].scale = BlockConfig.blockScale;
                } else {
                    this.kkuaiM.node.children[c].scale = BlockConfig[GameMode].wh / BlockConfig.normalWH;
                }
            }
            
            if (this.xcList.length > 0) {
                for (let l = 0; l < this.xcList.length; l++) {
                    let d = this.xcList[l];
                    for (let h = 0; h < d.length; h++) {
                        let u = d[h];
                        let m = this.frameList[u - 1].getChildByName("kn");
                        if (m) {
                            m.getComponent("block").setChange(this.kkuaiM._colorType);
                        }
                        
                        for (let f = 0; f < this.kkuaiM.node.children.length; f++) {
                            if (this.kkuaiM.node.children[f].getComponent("block").index === this.frameList[u - 1].getComponent("kuaiFrame").index) {
                                this.kkuaiM.node.children[f].scale = 1;
                            }
                        }
                    }
                }
            } else {
                for (let p = 0; p < this.frameList.length; p++) {
                    let g = this.frameList[p].getChildByName("kn");
                    if (g) {
                        let w = g.getComponent("block");
                        if (w.isChange) {
                            w.setSprite(w._cType);
                            w.isChange = false;
                        }
                    }
                }
                
                for (let b = 0; b < this.kkuaiM.node.children.length; b++) {
                    if (GameMode == MODE.JINGDIAN) {
                        this.kkuaiM.node.children[b].scale = BlockConfig.blockScale;
                    } else {
                        this.kkuaiM.node.children[b].scale = BlockConfig[GameMode].wh / BlockConfig.normalWH;
                    }
                }
            }
        }
    }

    getCurClickKuaiM(e: any) {
        this.kkuaiM = e;
        if (GameMode == MODE.JINGDIAN && GameData.teaching < 3) {
            this.showTeaching(false);
        } else if (GameMode == MODE.TEACH && GameData.teachingXS < 3) {
            this.showTeaching(false);
        }
    }

    gameLose() {
        cc.find("Canvas").pauseSystemEvents(true);
        let e = this.frameList.concat();
        this.frameList.sort(() => 0.5 - Math.random());
        
        let t = 0.08;
        for (let o = 0; o < this.frameList.length; o++) {
            if (this.frameList[o].getComponent("kuaiFrame").isHaveFK) {
                let n = this.frameList[o].getChildByName("kn");
                if (n) {
                    if (Math.random() < 0.5) {
                        t += Property.GRAY_DELAY_TIME;
                    }
                    let a = n.getComponent("block");
                    this.putNum++;
                    a.setGray(t);
                }
            }
        }
        this.frameList = e;
    }

    grayCount() {
        this.grayNum++;
        if (this.grayNum === this.putNum) {
            this.putNum = 0;
            this.grayNum = 0;
            if (GameMode == MODE.JIEMI) {
                this.scheduleOnce(() => {
                    Common.instance.showGameLoseLayer();
                }, 1);
            } else {
                Common.instance.showRebornLayer();
            }
        }
    }

    reviveEvent() {
        cc.find("Canvas").resumeSystemEvents(true);
        for (let e = 0; e < this.frameList.length; e++) {
            if (this.frameList[e].getComponent("kuaiFrame").isHaveFK) {
                let t = this.frameList[e].getChildByName("kn");
                if (t) {
                    let o = t.getComponent("block");
                    o.setSprite(o._cType);
                }
            }
        }
    }
}