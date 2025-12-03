const { ccclass, property } = cc._decorator;

@ccclass
export default class star extends cc.Component {

    @property([cc.SpriteFrame])
    spf_block: cc.SpriteFrame[] = [];

    @property(cc.Node)
    node_xiaoChu: cc.Node = null;

    private blockType: number = 0;
    private is_xiaoChu: boolean = false;
    private is_tiShi: boolean = false;
    private is_chuiZi: boolean = false;
    private is_biShua: boolean = false;

    onLoad() {}

    init(t: number) {
        this.blockType = t;
        this.is_xiaoChu = false;
        this.is_tiShi = false;
        this.is_chuiZi = false;
        this.is_biShua = false;
        this.node_xiaoChu.active = false;
        this.node.getComponent(cc.Sprite).spriteFrame = this.spf_block[this.blockType];
    }

    canXiaoChu() {
        this.is_xiaoChu = true;
        this.node_xiaoChu.active = true;
    }

    quXiaoXiaoChu() {
        this.is_xiaoChu = false;
        this.node_xiaoChu.active = false;
    }

    canTiShi() {
        this.is_tiShi = true;
        this.node_xiaoChu.active = true;
    }

    quXiaoTiShi() {
        this.is_tiShi = false;
        this.node_xiaoChu.active = false;
    }

    chuiZi() {
        this.is_chuiZi = true;
        this.node_xiaoChu.active = true;
    }

    quXiaoChuiZi() {
        this.is_chuiZi = false;
        this.node_xiaoChu.active = false;
    }

    biShua() {
        this.is_biShua = true;
        this.node_xiaoChu.active = true;
        this.node.stopAllActions();
        this.node.scale = 1;
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .to(0.4, { scale: 0.6 })
                    .to(0.4, { scale: 1 })
            )
            .start();
    }

    quXiaoBiShua() {
        this.is_biShua = false;
        this.node_xiaoChu.active = false;
        this.node.stopAllActions();
        this.node.scale = 1;
    }

    start() {}
}