const { ccclass, property } = cc._decorator;
import { MODE, GameMode, RESUME_BLOCK_ARR, TEACHING, BLOCK_WEIGHT_SCORE, BlockWeight, Property } from "./Property";
import AudioManager, {AudioID} from "./AudioManager";
import clientEvent from "./clientEvent";
import WeightRandom from "./WeightRandom";
import Common from "./Common";
import LvData_JieMi from "./LvData_JieMi";
import _ from "./lodash";
import ExtendScript from "./ExtendScript";
import { GameData } from "./GameData";

@ccclass
export default class KuaiManager extends cc.Component {
    @property(cc.Node)
    notPlace: cc.Node = null;

    @property(cc.Label)
    labshape: cc.Label = null;

    @property({
        type: [cc.Node],
        tooltip: "放置块的父节点"
    })
    fkBornPos: cc.Node[] = [];

    @property({
        type: [cc.Prefab],
        tooltip: "方块预制体"
    })
    fkPrefab: cc.Prefab[] = [];

    private surplusKuaiM: number = 3;
    private blockIndex: number = 0;
    private blockNum: number = 0;
    private btnRefreshBlock: cc.Node = null;

    onLoad() {
        this.surplusKuaiM = 3;
        this.sendKuaiM();
        this.initialMode();
        clientEvent.on("blockPut", this.checkbloackPut, this);
        clientEvent.on("reviveEvent", this.reviveEvent, this);
        clientEvent.on("useProp", this.usPropFinish, this);
    }

    onDestroy() {
        clientEvent.off("blockPut", this.checkbloackPut, this);
        clientEvent.off("reviveEvent", this.reviveEvent, this);
        clientEvent.off("useProp", this.usPropFinish, this);
    }

    private initialMode() {
        this.btnRefreshBlock = this.node.getChildByName("btnRefreshBlock");
        this.btnRefreshBlock.active = false;
        if (GameMode == MODE.JIEMI) {
            this.setBlockNum(LvData_JieMi.JM_LEVEL_DATA[GameData.level[GameMode]].block.length);
        }
    }

    private checkbloackPut() {
        if (GameMode == MODE.JINGDIAN) {
            if (GameData.teaching < 2) {
                GameData.teaching++;
                GameData.saveData();
                this.scheduleOnce(() => {
                    Common.instance.toGame();
                }, 1.6);
                return;
            }
            if (GameData.teaching == 2) {
                GameData.teaching = 3;
                GameData.saveData();
            }
        } else if (GameMode == MODE.TEACH) {
            if (GameData.teachingXS < 2) {
                GameData.teachingXS++;
                GameData.saveData();
                this.scheduleOnce(() => {
                    Common.instance.toGame();
                }, 1.6);
                return;
            }
            if (GameData.teachingXS == 2) {
                GameData.teachingXS = 3;
                GameData.saveData();
            }
        }

        if (GameMode == MODE.JIUJIU2) {
            const score = GameData.gameDataBind.fkScore._curScore;
            let weightArray: number[];
            
            if (score < BLOCK_WEIGHT_SCORE[0]) {
                weightArray = BlockWeight[GameMode][0];
            } else if (score < BLOCK_WEIGHT_SCORE[1]) {
                weightArray = BlockWeight[GameMode][1];
            } else {
                weightArray = BlockWeight[GameMode][2];
            }

            const random = new WeightRandom();
            for (let i = 0; i <= weightArray.length; i++) {
                random.weightAdd(i, weightArray[i]);
            }
            
            const nextIndex = random.weightNext();
            this.newNone(GameData.blockIndex, nextIndex);
            random.weightDeleteAll(nextIndex);
        } else {
            this.surplusKuaiM--;
            if (this.surplusKuaiM <= 0) {
                this.surplusKuaiM = 3;
                this.sendKuaiM();
            }
        }
        
        this.checkIsLose();
    }

    private sendKuaiM() {
        if (GameMode == MODE.JINGDIAN && GameData.teaching < 3) {
            this.surplusKuaiM = 1;
            this.newNone(1, TEACHING.BLOCK[GameData.teaching], TEACHING.BLOCK_COLOR[GameData.teaching]);
        } else if (GameMode == MODE.TEACH && GameData.teachingXS < 3) {
            this.surplusKuaiM = 1;
            this.newNone(1, TEACHING.BLOCK[GameData.teachingXS], TEACHING.BLOCK_COLOR[GameData.teachingXS]);
        } else if (GameMode == MODE.JIEMI) {
            if (!this.blockIndex) {
                this.blockIndex = 0;
            }
            
            for (let i = 0; i < 3; i++) {
                if (this.blockIndex >= LvData_JieMi.JM_LEVEL_DATA[GameData.level[GameMode]].block.length) {
                    return;
                }
                
                const colors = [0, 1, 2, 3, 4, 5, 6];
                colors.splice(LvData_JieMi.JM_LEVEL_DATA[GameData.level[GameMode]].color, 1);
                const colorIndex = _.random(0, colors.length - 1);
                
                this.newNone(i, LvData_JieMi.JM_LEVEL_DATA[GameData.level[GameMode]].block[this.blockIndex], colors[colorIndex]);
                this.blockIndex++;
            }
        } else {
            const score = GameData.gameDataBind.fkScore._curScore;
            let weightArray: number[];
            
            if (score < BLOCK_WEIGHT_SCORE[0]) {
                weightArray = BlockWeight[GameMode][0];
            } else if (score < BLOCK_WEIGHT_SCORE[1]) {
                weightArray = BlockWeight[GameMode][1];
            } else {
                weightArray = BlockWeight[GameMode][2];
            }

            const random = new WeightRandom();
            for (let i = 0; i <= weightArray.length; i++) {
                random.weightAdd(i, weightArray[i]);
            }
            
            for (let i = 0; i < 3; i++) {
                const nextIndex = random.weightNext();
                this.newNone(i, nextIndex);
                random.weightDeleteAll(nextIndex);
            }
        }
        
        this.checkIsLose();
    }

    private newNone(index: number, type: number, color?: number) {
        
        const node = cc.instantiate(this.fkPrefab[type]);
        node.setPosition(0, 0);
        node.parent = this.fkBornPos[index];
        node.getComponent(ExtendScript).init(color != null ? color : _.random(0, 6), type, true, index);
    }

    private usPropFinish() {
        this.checkIsLose();
    }

    private checkIsLose() {
        if (GameMode == MODE.JIEMI && GameData.isWin) {
            return;
        }

        let loseCount = 0;
        let totalCount = 0;

        for (let i = 0; i < 3; i++) {
            const child = this.fkBornPos[i].children[0];
            if (child) {
                totalCount++;
                const script = child.getComponent(ExtendScript); // 假设脚本名为BlockScript
                if (script) {
                    if (script.checkIsLose()) {
                        loseCount++;
                        script.setGrayKuai();
                    } else {
                        script.recoveryKuai();
                    }
                }
            }
        }

        if (loseCount > Property.PUSH_NOT_PUT) {
            this.showRefreshBlock();
        }

        if (loseCount == totalCount) {
            console.log("lose!!!!!!!!!!!!" + loseCount);
            AudioManager.instance.playSound(AudioID.Lost);
            GameData.isFail = true;
            GameData.gameDataBind.boardFrame.gameLose();

            if (GameMode == MODE.JIEMI) {
                const outNum = this.notPlace.getChildByName("sp_outNum");
                const noPut = this.notPlace.getChildByName("sp_noPut");
                outNum.active = this.getBlockNum() <= 0;
                noPut.active = this.getBlockNum() > 0;
                
                cc.tween(this.notPlace)
                    .set({ opacity: 255 })
                    .delay(0.25)
                    .to(0.36, { opacity: 0 })
                    .to(0.45, { opacity: 255 })
                    .start();
            } else {
                cc.tween(this.notPlace)
                    .set({ opacity: 255 })
                    .delay(0.25)
                    .to(0.36, { opacity: 0 })
                    .to(0.45, { opacity: 255 })
                    .start();
            }
        }
    }

    private reviveEvent() {
        this.notPlace.opacity = 0;
        this.sendKuaiMDefault(RESUME_BLOCK_ARR);
    }

    private setBlockNum(num: number) {
        this.blockNum = num;
        this.labshape.string = this.blockNum + "/" + LvData_JieMi.JM_LEVEL_DATA[GameData.level[GameMode]].block.length;
    }

    private getBlockNum(): number {
        return this.blockNum;
    }

    private cleanBlockBoard() {
        for (let i = 0; i < this.fkBornPos.length; i++) {
            const child = this.fkBornPos[i].children[0];
            if (child) {
                const script = child.getComponent(ExtendScript); // 假设脚本名为BlockScript
                if (script) {
                    script.clean();
                }
            }
        }
        this.surplusKuaiM = 3;
    }

    private onClickRefreshBlock() {
        this.showRefreshBlock(true);
    }

    private showRefreshBlock(isClick: boolean = false) {
        Common.instance.pushChangeBlock(isClick, () => {
            const blockArr = [0, _.random(1, 9), 0];
            this.sendKuaiMDefault(blockArr);
            this.btnRefreshBlock.active = false;
        }, () => {
            this.btnRefreshBlock.active = true;
        });
    }

    private sendKuaiMDefault(blockArr: number[]) {
        this.cleanBlockBoard();
        for (let i = 0; i < blockArr.length; i++) {
            this.newNone(i, blockArr[i]);
        }
    }

    update(dt: number) {
        if (GameData.isPause) return;
        
        GameData.pushChange_Time -= dt;
        if (GameData.pushChange_Time < 0 && GameData.isTouch == 0) {
            this.showRefreshBlock();
        }
    }
}