const { ccclass, property } = cc._decorator;

@ccclass
export default class Xing extends cc.Component {
    onLoad(): void {}

    init(t: number): void {
        switch (t) {
            case 0:
                this.node.color = new cc.Color(68, 191, 255);
                break;
            case 1:
                this.node.color = new cc.Color(102, 202, 28);
                break;
            case 2:
                this.node.color = new cc.Color(193, 60, 255);
                break;
            case 3:
                this.node.color = new cc.Color(226, 69, 109);
                break;
            case 4:
                this.node.color = new cc.Color(255, 184, 12);
                break;
        }
    }

    start(): void {}

    update(): void {
        if (Math.random() > 0.5) {
            this.node.x += 8 * Math.random();
        } else {
            this.node.x -= 8 * Math.random();
        }
    }
}