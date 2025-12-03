const { ccclass, property } = cc._decorator;

@ccclass
export default class RockItem extends cc.Component {
    @property(cc.ParticleSystem)
    m_partice: cc.ParticleSystem = null;

    start(): void {
    }

    resetSytem(): void {
        this.m_partice.resetSystem();
    }
}