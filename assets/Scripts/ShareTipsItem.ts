const { ccclass, property } = cc._decorator;

@ccclass
export default class ShareTipsItem extends cc.Component {

    start(): void {
    }

    onClose(): void {
        this.node.destroy();
    }
}