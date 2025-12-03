const { ccclass, property } = cc._decorator;
import Common from "./Common";
import LvData_JieMi from "./LvData_JieMi";
import { MODE, GameMode, Property } from "./Property";
import ResourceUtil from "./resourceUtil";
import AudioManager from "./AudioManager";
import LvData_ChuangGuan from "./LvData_ChuangGuan";
import { GameData } from "./GameData";
@ccclass
export default class fkScore extends cc.Component {
    @property
    private _gameScore: number = 0;
    @property
    private _showScore: number = 0;
    @property
    private _showBestScore: number = 0;
    @property
    private _curScore: number = 0;
    @property
    private changeS: number = 1;
    @property
    private _nowTaskNum: number = 0;
    
    @property(cc.Node)
    moveParent: cc.Node = null;
    @property(cc.Label)
    scoreLab: cc.Label = null;
    @property(cc.Label)
    bestScoreLab: cc.Label = null;
    @property(dragonBones.ArmatureDisplay)
    skeHeart: dragonBones.ArmatureDisplay = null;
    @property(cc.Sprite)
    taskSprite: cc.Sprite = null;
    @property(cc.Label)
    nowTaskLabel: cc.Label = null;
    @property(cc.Label)
    taskLabel: cc.Label = null;
    @property(cc.Label)
    levelLabel: cc.Label = null;

    private isEject: boolean = false;

    onLoad() {
        this.isEject = false;
        this.readBestScore();
        this._gameScore = 0;
        this._showScore = this._gameScore;
        
        if (this.skeHeart) {
            this.skeHeart.removeEventListener(dragonBones.EventObject.COMPLETE, this.playSkeComplete, this);
            this.skeHeart.addEventListener(dragonBones.EventObject.COMPLETE, this.playSkeComplete, this);
        }
        
        this.setTaskNumber();
        this.setLevelNum();
    }

    private readBestScore() {
        this._showBestScore = GameData.getBestScore(GameMode);
        this.bestScoreLab.string = this._showBestScore.toString();
    }

    private setLevelNum() {
        if (GameMode == MODE.JIEMI || GameMode == MODE.CHUANGGUAN) {
            this.levelLabel.string = "Current Level " + GameData.level[GameMode];
        }
    }

    private setTaskNumber() {
        if (GameMode == MODE.JIEMI) {
            this.taskLabel.string = LvData_JieMi.JM_LEVEL_DATA[GameData.level[GameMode]].board.length.toString();
            ResourceUtil.instance.setSpriteFrame("kuai/k" + LvData_JieMi.JM_LEVEL_DATA[GameData.level[GameMode]].color, this.taskSprite);
        } else {
            if (GameMode != MODE.CHUANGGUAN) return;
            this.taskLabel.string = LvData_ChuangGuan.CG_LEVEL_DATA[GameData.level[GameMode]].board.length.toString();
        }
        this.nowTaskLabel.string = this._nowTaskNum.toString();
    }

    private playSke() {
        this.skeHeart.node.active = true;
        this.skeHeart.playAnimation("newAnimation", 1);
    }

    private playSkeComplete() {
        this.skeHeart.playAnimation("xunhuan", 1);
    }

    private hideHeatBeat() {
        this.skeHeart.node.active = false;
    }

    setBoardScore(score: number, type: number) {
        let diff = score - this._curScore;
        
        if (diff > Property.CHANGE_SCORE) {
            this.changeS = Math.floor(Property.CHANGE_TIME / (2 / diff));
            this.changeS = this.changeS < 1 ? 1 : this.changeS;
        } else {
            this.changeS = 1;
        }
        
        if (type == 1) {
            this.changeS = diff;
        }
        
        this._curScore = score;
        
        if (GameMode == MODE.JINGDIAN) {
            GameData.curScore = score;
        }
        
        if (GameData.isGetBestScore == 0 && GameData.getBestScore(GameMode) != 0) {
            let bestScore = GameData.getBestScore(GameMode);
            if (this._showBestScore > bestScore) {
                GameData.isGetBestScore = 1;
                Common.instance.showNewScore();
            }
        }
    }

    update() {
        this.updateScore();
        if (this._curScore > this._showBestScore) {
            this.updateBestScore();
        }
    }

    private updateScore() {
        if (this._curScore > this._gameScore) {
            this._gameScore += this.changeS;
            this.scoreLab.string = this._gameScore.toString();
        } else if (this._gameScore > this._curScore) {
            this._gameScore = this._curScore;
            this.scoreLab.string = this._gameScore.toString();
        }
    }

    private updateBestScore() {
        if (this._curScore > this._showBestScore) {
            this._showBestScore += this.changeS;
            this.bestScoreLab.string = this._showBestScore.toString();
        }
    }

    btnPause() {
        AudioManager.instance.playClickSound();
        const self = this;
        
        if (this.isEject) {
            cc.tween(this.moveParent)
                .call(() => {
                    cc.find("moveParent/btnFlush", this.node).active = false;
                    cc.find("moveParent/btnHome", this.node).active = false;
                })
                .by(0.6, { position: cc.v2(-220, 0) }, { easing: "elasticOut" })
                .start();
        } else {
            cc.tween(this.moveParent)
                .call(() => {
                    cc.find("moveParent/btnFlush", this.node).active = true;
                    cc.find("moveParent/btnHome", this.node).active = true;
                })
                .by(0.6, { position: cc.v2(220, 0) }, { easing: "elasticOut" })
                .start();
        }
        
        this.isEject = !this.isEject;
    }

    btnHome() {
        AudioManager.instance.playClickSound();
        Common.instance.setBestScore();
        Common.instance.toMenu();
    }

    btnFlush() {
        GameData.gameDataBind.restartGame();
    }
}