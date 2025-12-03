const { ccclass, property } = cc._decorator;
import { MODE, GameMode, Property } from "./Property";
import LvData_ChuangGuan from "./LvData_ChuangGuan";
import LvData_JieMi from "./LvData_JieMi";
import AudioManager, { AudioID } from "./AudioManager";
import EventManager from "./EventManager";
import Common from "./Common";
import { GameData } from "./GameData";
import Utils from "./Utils";

@ccclass
export default class layerBase extends cc.Component {

    @property
    isBestScoreLayer: boolean = false;

    @property({
        type: dragonBones.ArmatureDisplay,
        tooltip: "皇冠龙骨"
    })
    crownAni: dragonBones.ArmatureDisplay = null;

    @property({
        type: cc.Node,
        tooltip: "分数背后的光"
    })
    guang: cc.Node = null;

    @property({
        type: cc.Node,
        tooltip: "下一关按钮"
    })
    btnNext: cc.Node = null;

    @property({
        type: cc.Label,
        tooltip: "当前得分"
    })
    scoreLab: cc.Label = null;

    @property({
        type: cc.Node,
        tooltip: "当前最高分"
    })
    bestScoreLab: cc.Node = null;

    private isPause: number = 0;
    private curScore: number = 0;
    private gameScore: number = 0;
    private changeS: number = 1;

    onLoad() {
        GameData.pause();
        
        if (this.crownAni) {
            Utils.playAniCall(this.crownAni, "newAnimation", () => {
                return Utils.playAni(this.crownAni, "newAnimation_1");
            });
        }
        
        if (this.guang) {
            cc.tween(this.guang)
                .repeatForever(
                    cc.tween().by(3, { angle: -360 })
                )
                .start();
        }
        
        if (this.btnNext) {
            this.btnNext.scale = 0;
        }
        
        if (this.bestScoreLab) {
            this.bestScoreLab = GameData.getBestScore(GameMode);
        }
    }

    start() {
        this.isPause = 0;
        this.curScore = GameData.gameDataBind.fkScore._curScore;
        
        if (this.isBestScoreLayer) {
            this.curScore = GameData.getBestScore(GameMode);
        }
        
        this.gameScore = 0;
        this.changeS = 1;
        
        if (this.curScore > Property.CHANGE_SCORE) {
            this.changeS = Math.floor(Property.CHANGE_TIME / (2 / this.curScore));
            this.changeS = this.changeS < 1 ? 1 : this.changeS;
        }
    }

    update(dt: number) {
        this.updateScore();
    }

    private updateScore() {
        if (this.isPause) return;
        
        this.gameScore += this.changeS;
        AudioManager.instance.playSound(AudioID.EndScore);
        this.scoreLab.string = this.gameScore.toString();
        
        if (this.gameScore >= this.curScore) {
            this.scoreAddFinish();
        }
    }

    private scoreAddFinish() {
        this.isPause = 1;
        
        if (this.guang) {
            this.guang.stopAllActions();
        }
        
        this.scoreLab.string = this.curScore.toString();
        AudioManager.instance.playSound(AudioID.EndButton);
        
        if (this.btnNext) {
            cc.tween(this.btnNext)
                .to(0.6, { scale: 1 }, { easing: "elasticOut" })
                .start();
        }
    }

    onClickRestart() {
        AudioManager.instance.playClickSound();
        EventManager.instance.EventInterstitialVideo();
        
        GameData.blockData = [];
        GameData.curScore = 0;
        
        if (GameMode == MODE.TEACH) {
            if (GameData.teachingXS == 3) {
                GameData.teachingXS = 0;
                GameData.saveData();
            }
            Common.instance.toGame();
        } else {
            Common.instance.toGame();
        }
    }

    onClickShare() {
        EventManager.instance.shareRecord();
    }

    onClickNext() {
        AudioManager.instance.playClickSound();
        EventManager.instance.EventInterstitialVideo();
        GameData.level[GameMode]++;
        
        if (GameMode == MODE.JIEMI && GameData.level[GameMode] > Object.keys(LvData_JieMi.JM_LEVEL_DATA).length) {
            GameData.level[GameMode] = 1;
        }
        
        if (GameMode == MODE.CHUANGGUAN && GameData.level[GameMode] > Object.keys(LvData_ChuangGuan.CG_LEVEL_DATA).length) {
            GameData.level[GameMode] = 1;
        }
        
        GameData.saveData();
        Common.instance.toGame();
    }
}