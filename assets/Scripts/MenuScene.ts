const { ccclass, property } = cc._decorator;
import Common from "./Common";
import AudioManager, {AudioID} from "./AudioManager";
import EventManager from "./EventManager";
import { CHANNEL } from "./PlatformA";
import { MODE, GameMode } from "./Property";
import { GameData, GameBundle } from "./GameData";
import Utils from "./Utils";

@ccclass
export default class MenuScene extends cc.Component {
    @property([cc.Label])
    modeBestScore: cc.Label[] = [];

    @property(cc.Node)
    soundSprite: cc.Node = null;

    onLoad() {
        
        this.initialSound();
        this.initialModeScore();
    }

    start() {
        EventManager.instance.EventMenu();
        
        if (lplatform.channel == CHANNEL.tt) {
            cc.find("Canvas/topnode/btn_set/btnPrivacyPolicy").active = false;
            cc.find("Canvas/topnode/btn_set/btnUserAgreement").active = false;
        }
    }

    initialModeScore() {
        const modeKeys = Object.keys(MODE);
        
        for (let t = 0; t < this.modeBestScore.length; t++) {
            const mode = MODE[modeKeys[t]];
            
            if (mode == MODE.JIEMI || mode == MODE.CHUANGGUAN) {
                this.modeBestScore[t].string = GameData.level[mode] || "1";
            } else if (mode == MODE.STAR) {
                const userData = cc.sys.localStorage.getItem("userData_xmxx");
                if (userData && userData != "") {
                    const data = JSON.parse(userData);
                    this.modeBestScore[t].string = data && data.num_score_best ? data.num_score_best.toString() : "0";
                } else {
                    this.modeBestScore[t].string = "0";
                }
            } else if (mode == MODE.KILL) {
                window.tempFileURL = ["", "", ""];
                
                const guideInfo = cc.sys.localStorage.getItem("guideinfo");
                window.GUIDE_LEVEL = guideInfo && guideInfo != "null" ? 1 : 0;
                
                const savedData = cc.sys.localStorage.getItem(window.GAME_SAVE_HANDLER);
                if (savedData) {
                    window.INIT_GAME_SAVE_DATA = JSON.parse(savedData);
                    this.modeBestScore[t].string = (Number(window.INIT_GAME_SAVE_DATA.top_level) + 1).toString();
                } else {
                    cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
                    this.modeBestScore[t].string = "1";
                }
                
                GameBundle[3].load("GameRes3/level_config2", (err: any, asset: any) => {
                    if (err) {
                        cc.error(err.message || err);
                    } else {
                        window.MAP_CONFIG = asset.json;
                    }
                });
            } else {
                this.modeBestScore[t].string = GameData.getBestScore(mode).toString();
            }
            
            const videoIcon = this.modeBestScore[t].node.parent.getChildByName("icon_video");
            if (videoIcon) {
                videoIcon.active = !GameData.modeLock[mode];
            }
        }
    }

    initialSound() {
        if (GameData.audioSwitch == 1) {
            AudioManager.instance.playBgMusic();
        }
        this.soundSprite.active = GameData.audioSwitch == 0;
    }

    onClickMode(event: cc.Event, customEventData: string) {
        const modeIndex = parseInt(customEventData);
        AudioManager.instance.playSound(AudioID.ClickMode);
        
        const modeKeys = Object.keys(MODE);
        GameMode = MODE[modeKeys[modeIndex]];
        console.log(GameMode);
        
        if (GameMode == MODE.TEACH) {
            if (GameData.teachingXS == 3) {
                GameData.teachingXS = 0;
                GameData.saveData();
            }
            this.toGame();
        } else if (GameMode == MODE.JINGDIAN) {
            this.toGame();
        } else {
            console.log("GameData.modeLock", GameData.modeLock[GameMode]);
            if (GameData.modeLock[GameMode]) {
                this.toGame();
            } else {
                EventManager.instance.showRewardedVideo(() => {
                    GameData.modeLock[GameMode] = 1;
                    GameData.teaching = 3;
                    GameData.saveData();
                    this.toGame();
                });
            }
        }
    }

    onClickQiDai() {
        AudioManager.instance.playSound(AudioID.ClickMode);
        Utils.ShowAsk("Coming Soon...");
    }

    toGame() {
        AudioManager.instance.pauseMusic();
        EventManager.instance.EventMenuToGame();
        Common.instance.toGame();
        EventManager.instance.gameEvent("GameMode", GameMode);
    }

    onClickSetAudio() {
        GameData.audioSwitch = 1 - GameData.audioSwitch;
        AudioManager.instance.playClickSound();
        
        if (GameData.audioSwitch == 0) {
            AudioManager.instance.pauseMusic();
        } else {
            AudioManager.instance.resumeMusic();
        }
        
        this.soundSprite.active = GameData.audioSwitch == 0;
    }
}