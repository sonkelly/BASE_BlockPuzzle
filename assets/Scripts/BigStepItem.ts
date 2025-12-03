const { ccclass, property } = cc._decorator;

@ccclass
export default class BigStepItem extends cc.Component {
    @property(cc.Sprite)
    m_sp_stepicon: cc.Sprite = null;

    @property(cc.Sprite)
    m_sp_stepname: cc.Sprite = null;

    @property(cc.Node)
    m_n_lock: cc.Node = null;

    @property(cc.Label)
    m_l_condition: cc.Label = null;

    @property([cc.Node])
    m_n_starlist: cc.Node[] = [];

    start() {}

    updateData(
        t: any, 
        e: cc.SpriteFrame, 
        i: cc.SpriteFrame, 
        n: number, 
        o: number = 0
    ) {
        if (t) {
            const colors = ["#33ABEE", "#33EEEE", "#33EE94", "#BAE789"];
            this.node.color = cc.Color.WHITE.fromHEX(colors[o]);
            
            this.m_sp_stepicon.spriteFrame = e;
            this.m_sp_stepname.spriteFrame = i;

            for (let c = 0; c < this.m_n_starlist.length; c++) {
                this.m_n_starlist[c].active = c < t.star;
            }

            this.m_n_lock.active = t.lv > n;
            
            if (t.lv > n) {
                this.m_l_condition.node.y = -33;
                this.m_l_condition.string = cc.js.formatStr("需通关%d关", t.lv);
            } else {
                this.m_l_condition.node.y = 0;
                this.m_l_condition.string = "已获得";
            }
        }
    }
}