import ExtendScript from "./ExtendScript";
import AudioManager from "./AudioManager";
import { CHANNEL } from "./PlatformA";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuSet extends ExtendScript {
    private isEject: boolean = false;

    onLoad() {
        this.isEject = false;
    }

    start() {
        if (lplatform.channel === CHANNEL.android || lplatform.channel === CHANNEL.ios) {
            const btnSendDesktop = this.node.getChildByName("btnSendDesktop");
            const btnMoreGame = this.node.getChildByName("btnMoreGame");
            const btnPrivacyPolicy = this.node.getChildByName("btnPrivacyPolicy");
            const btnUserAgreement = this.node.getChildByName("btnUserAgreement");

            if (btnSendDesktop && btnMoreGame && btnPrivacyPolicy && btnUserAgreement) {
                btnSendDesktop.active = false;
                btnMoreGame.active = false;
                btnPrivacyPolicy.x = btnSendDesktop.x;
                btnUserAgreement.x = btnMoreGame.x;
            }
        }
    }

    onClickSelf() {
        AudioManager.instance.playClickSound();

        if (this.isEject) {
            cc.tween(this.node)
                .by(0.6, { position: cc.v2(0, 110) }, { easing: "elasticOut" })
                .start();
        } else {
            cc.tween(this.node)
                .by(0.6, { position: cc.v2(0, -110) }, { easing: "elasticOut" })
                .start();
        }

        this.isEject = !this.isEject;
    }
}
