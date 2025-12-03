import EventListener from "./event_listener";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinPanel extends cc.Component {
    @property(cc.Node)
    m_n_content: cc.Node = null;

    @property(cc.Prefab)
    m_pre_skinitem: cc.Prefab = null;

    @property(cc.SpriteFrame)
    m_star0: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    m_star1: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    m_star2: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    m_star3: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    m_star4: cc.SpriteFrame = null;

    private m_n_list: cc.Node[] = [];

    start(): void {
        EventListener.instance.on(window.GAME_SAVE_HANDLER, this.updateData, this);
    }

    initData(): void {
        const skinConfig = window.SKIN_CONFIG;
        for (let i = 0; i < skinConfig.length; i++) {
            const item = cc.instantiate(this.m_pre_skinitem);
            item.parent = this.m_n_content;
            item.getComponent("SkinItem").updateData(i, skinConfig[i], this[`m_star${i}`]);
            this.m_n_list.push(item);
        }
    }

    updateData(): void {
        const skinConfig = window.SKIN_CONFIG;
        for (let i = 0; i < skinConfig.length; i++) {
            this.m_n_list[i].getComponent("SkinItem").updateData(i, skinConfig[i], this[`m_star${i}`]);
        }
    }

    onDestroy(): void {
        EventListener.instance.off(window.GAME_SAVE_HANDLER, this);
    }

    onClose(): void {
        this.node.active = false;
    }
}