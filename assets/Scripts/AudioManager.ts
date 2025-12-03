const { ccclass, property } = cc._decorator;
import { GameData, GameBundle } from "./GameData";
export enum AudioID {
    ClickMode = "click_mode",
    Combo = "combo",
    LienTemp = "lienTemp",
    LienTempQQ = "qqlienTemp",
    NewScore = "newScore",
    Start = "start",
    Lost = "lost",
    Time = "time321",
    BSelect = "block_select",
    BDown = "block_down",
    BCrazing = "",
    EndScore = "end_score",
    EndButton = "end_button",
    EndBestScore = "end_best_score",
    Unbelievable = "lienTemp6",
    UnbelievableQQ = "qqlienTemp6",
    Bomb = "prop_boom",
    RainBow = "prop_caiHong"
}

@ccclass
export default class AudioManager extends cc.Component {
    private static _instance: AudioManager = new AudioManager();
    
    public static get instance(): AudioManager {
        return this._instance;
    }

    @property
    bgVolume: number = 1;

    @property
    bgAudioID: number = -1;

    @property
    sfxVolume: number = 1;

    private audioID: number = 0;

    onLoad(): void {
        //AudioManager._instance = this;
    }

    init(): void {
        this.audioID = 0;
    }

    playBgMusic(): void {
        GameBundle[1].load("Audio/bgm_menu", cc.AudioClip, (err: Error, clip: cc.AudioClip) => {
            if (err) {
                console.error("load error => " + err);
            } else {
                cc.audioEngine.playMusic(clip, true);
            }
        });
    }

    playBgmMusic(e: string | cc.AudioClip): void {
        if (!e) return;

        if (typeof e === "string") {
            cc.resources.load(e, cc.AudioClip, (err: Error, clip: cc.AudioClip) => {
                if (err) {
                    console.error("load error => " + err);
                } else {
                    cc.audioEngine.playMusic(clip, true);
                }
            });
        } else if (typeof e === "object") {
            cc.audioEngine.playMusic(e, true);
        }
    }

    stopBgmMusic(): void {
        cc.audioEngine.stopMusic();
    }

    pauseMusic(): void {
        cc.audioEngine.pauseMusic();
    }

    resumeMusic(): void {
        cc.audioEngine.resumeMusic();
    }

    playSound(e: string, t?: boolean): void {
        if (GameData.audioSwitch !== 0 && e !== "") {
            this.getUrl("Audio/" + e, t);
        }
    }

    playAniSound(e: string): void {
        this.getUrl("Audio/Animation/" + e);
    }

    playClickSound(): void {
        if (GameData.audioSwitch !== 0) {
            this.getUrl("Audio/click");
        }
    }

    playClickSound2(): void {
        this.getUrl("Audio/click2");
    }

    playAudioClip(e: cc.AudioClip, t: boolean = false): void {
        if (e) {
            cc.audioEngine.play(e, t);
        }
    }

    private getUrl(e: string, t: boolean = false): void {
        cc.resources.load(e, cc.AudioClip, (err: Error, clip: cc.AudioClip) => {
            if (err) {
                console.log("load error => " + err);
            } else {
                this.audioID = cc.audioEngine.playEffect(clip, t);
            }
        });
    }

    pauseAll(): void {
        cc.audioEngine.pauseAll();
    }

    resumeAll(): void {
        cc.audioEngine.resumeAll();
    }

    stopAllEffects(): void {
        cc.audioEngine.stopAllEffects();
    }

    pauseEffect(): void {
        cc.audioEngine.pauseEffect(this.audioID);
    }

    resumeEffect(): void {
        cc.audioEngine.resumeEffect(this.audioID);
    }

    setVolume0(): void {
        cc.audioEngine.setMusicVolume(0);
        cc.audioEngine.setEffectsVolume(0);
    }

    setVolume1(): void {
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
    }
}

export const audioManager = new AudioManager();