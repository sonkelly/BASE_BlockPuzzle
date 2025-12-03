const { ccclass, property } = cc._decorator;
import { CHANNEL } from "./PlatformA";

@ccclass
export default class ChangeAD extends cc.Component {
    onLoad(): void {
        if (lplatform.labData.replaceAD && lplatform.labData.replaceAD === 1) {
            this.showAd(true);
        } else {
            this.showAd(false);
        }
        
        if (lplatform.channel === CHANNEL.oppo || lplatform.channel === CHANNEL.vivo) {
            this.node.active = false;
        }
    }

    showAd(isShow: boolean): void {
        const iconAD = this.node.getChildByName("iconAD");
        if (iconAD) {
            iconAD.active = isShow;
            const sprite = this.node.getComponent(cc.Sprite);
            if (sprite) {
                sprite.enabled = !isShow;
            }
        }
    }
}