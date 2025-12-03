const { ccclass, property } = cc._decorator;
import { GameData } from "./GameData";

@ccclass
export default class LoadingScene extends cc.Component {
    
    onLoad(): void {
        const sceneName: string = GameData.sceneName;
        cc.director.preloadScene(sceneName, null, (): void => {
            cc.director.loadScene(sceneName);
        });
    }
}