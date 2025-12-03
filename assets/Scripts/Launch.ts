const { ccclass, property } = cc._decorator;
import PlatformA from "./PlatformA";

@ccclass
export default class Launch extends cc.Component {
    @property(cc.String)
    nextScene: string = "Menu";

    onLoad(): void {
        window.lplatform = new (PlatformA as any)();
        cc.director.loadScene(this.nextScene);
    }
}