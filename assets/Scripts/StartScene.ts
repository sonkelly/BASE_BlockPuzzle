const { ccclass, property } = cc._decorator;
import { CHANNEL } from "./PlatformA";
import EventManager from "./EventManager";
import Common from "./Common";
import { MODE } from "./Property";
import { GameData, GameBundle } from "./GameData";

@ccclass
export default class StartScene extends cc.Component {
    @property({
        type: cc.Integer,
        tooltip: "分包个数"
    })
    subPackCount: number = 2;

    private subPackIndex: number = 0;

    onLoad() {
        this.subPackIndex = 0;
        
        GameData.loadData((error: any) => {
            if (!error) {
                for (let modeKey in MODE) {
                    GameData.bestScore[MODE[modeKey]] = {};
                    GameData.level[MODE[modeKey]] = 1;
                }
                
                GameData.modeLock[MODE.JINGDIAN] = 1;
                
                if (lplatform.channel === CHANNEL.oppo || lplatform.channel === CHANNEL.vivo) {
                    GameData.modeLock[MODE.JIUJIU] = 1;
                    GameData.modeLock[MODE.JIUGONG] = 1;
                    GameData.modeLock[MODE.JIEMI] = 1;
                    GameData.modeLock[MODE.CHUANGGUAN] = 1;
                    GameData.modeLock[MODE.STAR] = 1;
                }
                
                GameData.saveData();
            }
        });
        
        this.loadSubPack(this.subPackIndex);
    }

    private loadSubPack(index: number): void {
        const bundleName = `GameRes${index + 1}`;
        
        cc.assetManager.loadBundle(bundleName, (err: Error, bundle: cc.AssetManager.Bundle) => {
            if (err) {
                console.log(err);
            }
            
            GameBundle[this.subPackIndex + 1] = bundle;
            this.subPackIndex++;
            
            if (this.subPackIndex === this.subPackCount) {
                this.loadFinish();
            } else {
                this.loadSubPack(this.subPackIndex);
            }
            
            cc.director.preloadScene("game_jingdian");
        });
    }

    private loadFinish(): void {
        EventManager.instance.EventLoad();
        Common.instance.toMenu();
    }
}