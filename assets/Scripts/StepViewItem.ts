const { ccclass, property } = cc._decorator;
import ConstValue from "./ConstValue";
import EventListener from "./event_listener";

@ccclass
export default class StepViewItem extends cc.Component {

    @property(cc.Sprite)
    m_sp_stepicon: cc.Sprite = null;

    @property(cc.Sprite)
    m_sp_stepname: cc.Sprite = null;

    @property([cc.Node])
    m_n_starlist: cc.Node[] = [];

    @property(cc.Node)
    m_n_bg: cc.Node = null;

    @property(cc.Label)
    m_l_steptitle: cc.Label = null;

    @property(cc.SpriteAtlas)
    m_spa_list: cc.SpriteAtlas = null;

    private _callback: Function = null;
    private _stepname: string = "";
    private _onshowback: boolean = false;

    start(): void {
        EventListener.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
    }

    onDestroy(): void {
        EventListener.instance.off(window.ON_SHOW_BACK, this);
    }

    setCloseCallback(callback: Function): void {
        this._callback = callback;
    }

    onClose(): void {
        this._callback && this._callback();
        this.node.active = false;
    }

    onshowback(): void {
        if (this._onshowback) {
            this._onshowback = false;
            this.onClose();
        }
    }

    showStep(step: number): void {
        const starCount = this.updateData(step);
        
        for (let i = 0; i < this.m_n_starlist.length; i++) {
            this.m_n_starlist[i].active = false;
        }

        this.m_sp_stepicon.node.getComponent(cc.Animation).play("playstep");
        this.m_sp_stepname.node.getComponent(cc.Animation).play("playstep");

        this.scheduleOnce(() => {
            Common_CommonUtil.default.shakeScreen(this.m_n_bg);
        }, 0.4);

        const showStar = (index: number) => {
            this.m_n_starlist[index].active = true;
            this.m_n_starlist[index].scale = 0;
            this.scheduleOnce(() => {
                this.m_n_starlist[index].runAction(
                    cc.sequence(
                        cc.scaleTo(0.2, 1.4, 1.4).easing(cc.easeIn(3)),
                        cc.scaleTo(0.1, 1, 1)
                    )
                );
                Utils3.SetSoundEffect(window.GET_GOLD, false, 1);
            }, 0.54 + 0.3 * (index + 1));
        };

        for (let i = 0; i < starCount; i++) {
            showStar(i);
        }
    }

    updateData(step: number = 0): number {
        const level = Math.floor(step / 10);
        const stepConfig = ConstValue.STEP_CONFIG[level - 1];
        let starCount = 0;

        if (stepConfig) {
            starCount = stepConfig.star;
            this._stepname = stepConfig.desc;
            this.m_l_steptitle.string = cc.js.formatStr("完成%d关 段位提升", step);
            this.m_sp_stepicon.spriteFrame = this.m_spa_list.getSpriteFrame(stepConfig.icon_path);
            this.m_sp_stepname.spriteFrame = this.m_spa_list.getSpriteFrame(stepConfig.desc_path);
        }

        return starCount;
    }

    setShowBtnVisible(visible: boolean): void {
        for (let i = 0; i < this.m_n_starlist.length; i++) {
            this.m_n_starlist[i].active = visible;
        }
        this.m_sp_stepicon.node.active = visible;
        this.m_sp_stepname.node.active = visible;
    }

    onShareStep(): void {
        this._onshowback = true;
        ShareSdk.shareAppMessage({
            title: `消除段位升级到【${this._stepname}】,一起来见证吧`,
            imageUrl: window.tempFileURL[1]
        });
    }
}