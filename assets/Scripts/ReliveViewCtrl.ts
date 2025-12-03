const { ccclass, property } = cc._decorator;
import { GameBundle } from "./GameData";

@ccclass
export default class ReliveViewCtrl extends cc.Component {

    @property(cc.Label)
    Score: cc.Label = null;

    @property(cc.Label)
    TimeTex: cc.Label = null;

    @property(cc.Label)
    m_cost_numlabel: cc.Label = null;

    @property
    TimeNum: number = null;

    @property(cc.Node)
    skipBtn: cc.Node = null;

    @property(cc.Sprite)
    m_cost_pic: cc.Sprite = null;

    @property(cc.Node)
    m_bg: cc.Node = null;

    @property(cc.Node)
    m_share_relive: cc.Node = null;

    @property(cc.Button)
    m_btn_share: cc.Button = null;

    @property(cc.Sprite)
    m_sp_all_gold: cc.Sprite = null;

    @property(cc.Label)
    m_l_all_gold: cc.Label = null;

    private timeOut: boolean = false;
    private m_cost_num: number = 0;
    private callbackobj: any = null;

    start() {
        this.node.zIndex = 100;
        this.TimeNum = 10;
        this.TimeTex.string = this.TimeNum.toString();
        this.timeOut = false;
        this.m_cost_num = window['RELIVE_COST_NUM'];
        
        let winSize = cc.winSize;
        this.m_bg.width = winSize.width;
        this.m_bg.height = winSize.height;
        
        let self = this;
        GameBundle[3].load("GameRes3/" + window['RELIVE_COST_PIC_PATH'], cc.SpriteFrame, function(err: any, spriteFrame: cc.SpriteFrame) {
            if (err) {
                cc.error(err.message || err);
            } else {
                self.m_cost_pic.spriteFrame = spriteFrame;
                self.m_sp_all_gold.spriteFrame = spriteFrame;
            }
        });
        
        this.m_cost_numlabel.string = "x" + window['RELIVE_COST_NUM'];
        this.m_l_all_gold.string = ":" + window['INIT_GAME_SAVE_DATA'].gold_num;
        
        if (window['isWeChatPlatform']) {
            this.setShareReliveShow(window['SHARE_RELIVE']);
        }
    }

    setShareReliveShow(show: number) {
        this.m_share_relive.active = show !== 0;
    }

    setCallBackObj(obj: any) {
        this.callbackobj = obj;
    }

    ShowView(show: boolean) {
        this.node.active = show;
        
        if (show === true && this.callbackobj && this.callbackobj.shareObj) {
            if (this.callbackobj.shareObj.is_share_relive) {
                this.m_btn_share.interactable = false;
            } else {
                this.m_btn_share.interactable = true;
            }
        }
        
        if (show === false) {
            this.node.destroy();
        }
    }

    CountDownClick(time: number) {
        this.schedule(this.DeleteTimeNum.bind(this), 1, time, 0, true);
    }

    DeleteTimeNum() {
        this.TimeNum -= 1;
        this.TimeTex.string = this.TimeNum.toString();
        
        if (this.TimeNum <= -1) {
            this.TimeTex.string = "0";
            this.ShowView(false);
            if (this.callbackobj != null) {
                this.callbackobj.onSkipCallBack();
            }
        }
    }

    CoinBtnClick() {
        if (this.callbackobj != null && this.callbackobj.onCostRelive(this.m_cost_num)) {
            this.ShowView(false);
        }
    }

    setScoreLabel(score: number) {
        this.Score.string = score.toString();
    }

    setCostNumLabel(num: number) {
        this.m_cost_numlabel.string = "x" + num;
        this.m_cost_num = parseInt(num.toString());
    }

    ShareBtnClick() {
        this.unschedule(this.DeleteTimeNum.bind(this));
    }

    cancelBtnClick() {
        this.unschedule(this.DeleteTimeNum.bind(this));
        this.ShowView(false);
        if (this.callbackobj != null) {
            this.callbackobj.onSkipCallBack();
        }
    }
}