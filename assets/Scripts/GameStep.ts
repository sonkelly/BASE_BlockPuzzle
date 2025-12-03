const { ccclass, property } = cc._decorator;
import ConstValue from "./ConstValue";

@ccclass
export default class GameStep extends cc.Component {
    @property(cc.SpriteAtlas)
    m_spa_list: cc.SpriteAtlas = null;

    @property(cc.Node)
    m_n_bigstepcontent: cc.Node = null;

    @property(cc.Sprite)
    m_sp_mystepicon: cc.Sprite = null;

    @property(cc.Sprite)
    m_sp_mystepname: cc.Sprite = null;

    @property([cc.Node])
    m_n_mystarlist: cc.Node[] = [];

    @property(cc.Prefab)
    m_pre_bigstep: cc.Prefab = null;

    private m_nodepoll: any = null;

    start() {
        const stepCount = ConstValue.STEP_CONFIG.length;
        this.m_n_bigstepcontent.height = 115 * stepCount + 20 * (stepCount - 1);
        
        for (let i = stepCount - 1, e = 0; i >= 0; i--) {
            const node = cc.instantiate(this.m_pre_bigstep);
            node.x = 0;
            node.y = -62 - (stepCount - i - 1) * (node.height + 20);
            this.m_n_bigstepcontent.addChild(node);
            
            const stepConfig = ConstValue.STEP_CONFIG[i];
            const colorIndex = e % 4;
            const bigStepItem = node.getComponent("BigStepItem");
            bigStepItem.updateData(
                stepConfig,
                this.m_spa_list.getSpriteFrame(stepConfig.icon_path),
                this.m_spa_list.getSpriteFrame(stepConfig.desc_path),
                window.INIT_GAME_SAVE_DATA.top_level,
                colorIndex
            );
            e++;
        }
        
        this.m_n_bigstepcontent.parent.parent.getComponent(cc.ScrollView).scrollToOffset(cc.v2(0, this.m_n_bigstepcontent.height));
        this.initMyData();
    }

    onToggleClick(): void {
        // Implementation for toggle click
    }

    initMyData(): void {
        const topLevel = window.INIT_GAME_SAVE_DATA.top_level;
        const stepData = this.getMyStepData(topLevel);
        
        if (stepData) {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame(stepData.icon_path);
            this.m_sp_mystepname.spriteFrame = this.m_spa_list.getSpriteFrame(stepData.desc_path);
            
            for (let i = 0; i < this.m_n_mystarlist.length; i++) {
                this.m_n_mystarlist[i].active = i < stepData.star;
            }
        } else {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame("stepicon6");
            this.m_sp_mystepname.spriteFrame = this.m_spa_list.getSpriteFrame("stepname6");
            
            for (let i = 0; i < this.m_n_mystarlist.length; i++) {
                this.m_n_mystarlist[i].active = i <= 0;
            }
        }
    }

    onBackHome(): void {
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.HALL_SCENE_NAME);
    }

    getMyStepData(level: number): any {
        let stepIndex = Math.floor(level / 10);
        
        if (stepIndex <= 0) {
            return null;
        }
        
        if (stepIndex > ConstValue.STEP_CONFIG.length) {
            stepIndex = ConstValue.STEP_CONFIG.length;
        }
        
        return ConstValue.STEP_CONFIG[stepIndex - 1];
    }

    onDestroy(): void {
        if (this.m_nodepoll) {
            this.m_nodepoll.clear();
        }
    }
}