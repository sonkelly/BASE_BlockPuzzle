const { ccclass, property } = cc._decorator;
import ExtendScript from "./ExtendScript";
import { MODE, GameMode, CommonPrefab, Property } from "./Property";
import { GameData } from "./GameData";
import _ from "./lodash";
import { CHANNEL } from "./PlatformA";
import AudioManager, { AudioID } from "./AudioManager";
import Utils from "./Utils";
@ccclass
export default class Common extends cc.Component {
    private static _instance: Common = new Common();
    
    public static get instance(): Common {
        return this._instance;
    }

    onLoad() {
        if (Common._instance === null) {
            Common._instance = this;
        }
    }

    setBestScore(): void {
        const bestScore = GameData.getBestScore(GameMode);
        const currentScore = GameData.gameDataBind.fkScore._showBestScore;
        console.log("存档最高分", bestScore, "当前得分", currentScore);
        if (currentScore > bestScore) {
            GameData.setBestScore(GameMode, currentScore);
        }
    }

    toGame(): void {
        const sceneName = "game_" + GameMode;
        GameData.initialData();
        if (GameData.oneToGame === 0) {
            GameData.oneToGame = 1;
            GameData.sceneName = sceneName;
            cc.director.loadScene("LoadingScene");
        } else {
            cc.director.loadScene(sceneName);
        }
    }

    toMenu(): void {
        cc.director.loadScene("menu");
    }

    showRebornLayer(): void {
        this.addPrefab(GameData.gameDataBind.rebornNode);
    }

    showEndScoreLayer(): void {
        this.addPrefab(GameData.gameDataBind.endScorePrefab);
    }

    showEndBestScoreLayer(): void {
        this.addPrefab(GameData.gameDataBind.endBestScorePrefab);
    }

    showGameWinLayer(): void {
        this.addPrefab(CommonPrefab.endWinPrefab);
    }

    showGameLoseLayer(): void {
        this.addPrefab(CommonPrefab.endLosePrefab);
    }

    showBlockBoom(block: cc.Node, type: number, callback?: Function): void {
        if (type === 0) {
            block.active = false;
        }

        const boomEffect = cc.instantiate(CommonPrefab.iceBlock);
        boomEffect.parent = cc.find("Canvas/uiRoot/tempNode");
        boomEffect.position = cc.v2(block.x, block.y);

        const skeletonName = type + "_xbh_ske";
        const armatureDisplay = boomEffect.getChildByName(skeletonName).getComponent(dragonBones.ArmatureDisplay);
        armatureDisplay.node.active = true;

        const randomIndex = _.random(1, 4);
        const animationTypes = [
            ["hua", "hua1", "hua2", "hua3"],
            ["bing", "bing1", "bing2", "bing3"], 
            ["xue", "xue1", "xue2", "xue3"]
        ];
        const animationName = animationTypes[type][randomIndex];

        Utils.playAniCall(armatureDisplay, animationName, () => {
            if (callback) {
                callback();
            }
            boomEffect.destroy();
        });
    }

    showNewScore(): void {
        AudioManager.instance.playSound(AudioID.NewScore);
        this.addPrefab(CommonPrefab.newScore);
    }

    showUnbelievable(): void {
        const soundID = lplatform.channel == CHANNEL.qq ? AudioID.UnbelievableQQ : AudioID.Unbelievable;
        AudioManager.instance.playSound(soundID);
        this.addPrefab(CommonPrefab.unbelievable);
    }

    pushChangeTime(): void {
        GameData.canShowPush = false;
        this.scheduleOnce(() => {
            GameData.canShowPush = true;
        }, Property.PUSH_TIME_DELAY);
    }

    pushChangeBlock(isForce: boolean, changeType: any, callback?: Function): void {
        if (GameMode == MODE.TEACH || GameMode == MODE.JIEMI || GameData.pushChangeCount > 0) {
            return;
        }

        if (!isForce) {
            if (GameData.isFail) return;
            if (!GameData.canShowPush) return;
        }

        GameData.pause();
        GameData.pushChangeCount++;

        cc.resources.load("prefabs/pushChange", cc.Prefab, (err, prefab) => {
            if (err) {
                console.error("Common", "载入预制资源失败, 原因:" + err);
                return;
            }

            if (!(prefab instanceof cc.Prefab)) {
                console.error("Common", "你载入的不是预制资源!");
                return;
            }

            const pushChangeNode = cc.instantiate(prefab);
            pushChangeNode.name = "pushChange";
            pushChangeNode.parent = cc.find("Canvas");
            
            const script = pushChangeNode.getComponent(ExtendScript);
            if (script) {
                script.initial(changeType, callback);
            }
        });
    }

    pushZaJinDan(): void {
        // 空实现
    }

    addPrefab(prefab: cc.Prefab, data?: any): void {
        const node = cc.instantiate(prefab);
        node.parent = cc.find("Canvas");
        
        if (data) {
            const script = node.getComponent(ExtendScript);
            if (script) {
                script.initial(data);
            }
        }
    }
}