const { ccclass, property } = cc._decorator;
import { MODE, GameMode } from "./Property";
import { GameData } from "./GameData";
import Utils from "./Utils";
import clientEvent from "./clientEvent";
import AudioManager from "./AudioManager";
import { CHANNEL } from "./PlatformA";
import EventManager from "./EventManager";
import Common from "./Common";

@ccclass
export default class LayerReborn extends cc.Component {
    @property(dragonBones.ArmatureDisplay)
    rebornTimeSke: dragonBones.ArmatureDisplay = null;

    @property(cc.AudioSource)
    timeAudio: cc.AudioSource = null;

    @property(cc.Node)
    panel: cc.Node = null;

    @property(cc.Node)
    btnReborn: cc.Node = null;

    @property(cc.Node)
    btnRestart: cc.Node = null;

    onLoad() {
        this.scheduleOnce(() => {
            this.timeAudio.play();
        }, 1);
        Utils.playAniCall(this.rebornTimeSke, "newAnimation", () => {
            this.scheduleOnce(() => {
                this.showLayer();
            }, 0.8);
        });

        Common.instance.setBestScore();
    }
    isShow = true;
    start() {
        EventManager.instance.EventInterstitial();
        if (lplatform.channel == CHANNEL.qq && this.btnReborn.getChildByName("iconAD")) {
            this.btnReborn.getChildByName("iconAD").active = this.isShow;
            this.btnReborn.getComponent(cc.Sprite).enabled = !this.isShow;
        }
    }

    onClickRevive() {
        AudioManager.instance.playClickSound();
        
        if (lplatform.channel == CHANNEL.tt) {
            this.timeAudio.pause();
            this.rebornTimeSke.timeScale = 0;
            this.panel.getComponent(cc.Animation).pause();
            this.btnReborn.getComponent(cc.Animation).pause();
            this.btnRestart.getComponent(cc.Animation).pause();
        }

        clientEvent.dispatchEvent("reviveEvent");
        EventManager.instance.showRewardedVideo(
            () => {
                this.timeAudio.resume();
                this.rebornTimeSke.timeScale = 1;
                this.panel.getComponent(cc.Animation).resume();
                this.btnReborn.getComponent(cc.Animation).resume();
                this.btnRestart.getComponent(cc.Animation).resume();

                this.clean();
            }
        );
    }

    onClickRestart() {
        AudioManager.instance.playClickSound();
        
        GameData.initialData();
        GameData.blockData = [];
        GameData.curScore = 0;

        if (GameMode == MODE.TEACH) {
            if (3 == GameData.teachingXS) {
                GameData.teachingXS = 0;
                GameData.saveData();
            }
            Common.instance.toGame();
            this.clean();
        } else {
            Common.instance.toGame();
            this.clean();
        }
    }

    showLayer() {
        if (1 == GameData.isGetBestScore) {
            Common.instance.showEndBestScoreLayer();
        } else {
            Common.instance.showEndScoreLayer();
        }
        this.clean();
    }

    clean() {
        this.node.destroy();
        this.timeAudio.stop();
    }
}