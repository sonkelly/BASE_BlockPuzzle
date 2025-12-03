const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockBGItem extends cc.Component {
    @property(cc.Node)
    m_n_bright: cc.Node = null;

    onLoad(): void {}

    start(): void {}

    setBrightVisible(isVisible: boolean, colorHex?: string): void {
        this.m_n_bright.active = isVisible;
        if (colorHex) {
            this.m_n_bright.color = cc.Color.WHITE.fromHEX(colorHex);
        }
    }
}