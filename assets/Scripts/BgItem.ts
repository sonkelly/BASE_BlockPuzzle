const {ccclass, property} = cc._decorator;

@ccclass
export default class BgItem extends cc.Component {
    @property(cc.Node)
    m_n_bgday: cc.Node = null;

    @property(cc.Node)
    m_n_bgnight: cc.Node = null;

    start(): void {
        const currentHour: number = new Date().getHours();
        this.m_n_bgday.active = currentHour >= 8 && currentHour <= 18;
        this.m_n_bgnight.active = currentHour < 8 || currentHour > 18;
    }
}