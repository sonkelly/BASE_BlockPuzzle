const { ccclass, property } = cc._decorator;
import ExtendScript from "./ExtendScript";
import AudioManager, { AudioID } from "./AudioManager";
import ResourceUtil from "./resourceUtil";
import clientEvent from "./clientEvent";
import Common from "./Common";
import { MODE, GameMode } from "./Property";
import Utils from "./Utils";
import _ from "./lodash";

@ccclass
export default class block extends ExtendScript {
    @property
    private _move: number = 0;
    
    @property
    private _cType: number = -1;
    
    @property
    iceNum: number = 1;
    
    @property(cc.Sprite)
    iceSprite: cc.Sprite = null;
    
    @property([cc.SpriteFrame])
    cgSpf: cc.SpriteFrame[] = [];
    
    private index: number = 0;
    private isChange: boolean = false;
    private isIceBlock: boolean = false;

    onLoad() {
    }

    initial(e: number): void {
        this.index = 0;
        this._cType = e;
        this.isChange = false;
        this.setSprite(e);
    }

    modeCGInitial(e: any): void {
        this.isChange = false;
        this.iceNum = e.num;
        this.isIceBlock = true;
        this.setSprite("_cg_flower");
        this.setIceSprite(e.num - 1);
    }

    getIsIce(): boolean {
        return this.isIceBlock;
    }

    getXcNumber(): number {
        return this.iceNum;
    }

    setIceSprite(e: number): void {
        if (this.iceSprite && this.cgSpf[e]) {
            this.iceSprite.spriteFrame = this.cgSpf[e];
        }
    }

    setIceNumber(e: number, t?: Function): void {
        const self = this;
        this.isChange = false;
        this.iceNum = e;
        
        if (e > 0) {
            this.setIceSprite(e - 1);
        }
        
        Common.instance.showBlockBoom(this.node, this.getXcNumber(), function() {
            if (e <= 0) {
                if (t) {
                    t();
                }
                self.clean();
            }
        });
    }

    setSprite(e: any): void {
        if (e != null) {
            const t = this.node.getComponent(cc.Sprite);
            if (e == -1) {
                t.enabled = false;
            } else {
                ResourceUtil.instance.setSpriteFrame("kuai/k" + e, t);
            }
        }
    }

    setGray(e: number): void {
        const t = this.node.getComponent(cc.Sprite);
        this.scheduleOnce(() => {
            ResourceUtil.instance.setSpriteFrame("kuai/huiKuai", t);
            clientEvent.dispatchEvent("setGray");
        }, e);
    }

    setChange(e: number): void {
        this.isChange = true;
        
        // Assuming GameMode and MODE are defined elsewhere
        if (GameMode == MODE.CHUANGGUAN && this.iceNum >= 2) {
            return;
        }
        
        const t = this.node.getComponent(cc.Sprite);
        ResourceUtil.instance.setSpriteFrame("kuai/k" + e, t);
    }

    playDragon(e: any, t: number): void {
        const self = this;
        this.isChange = false;
        this.scheduleOnce(() => {
            self.playAni(e);
        }, t);
    }

    playAni(e: any): void {
        const self = this;
        AudioManager.instance.playSound(AudioID.BCrazing);
        
        const o = this.node.parent.convertToWorldSpaceAR(cc.v2(0, 0));
        const tempNode = cc.find("Canvas/uiRoot/tempNode");
        this.node.parent = tempNode;
        this.node.position = tempNode.convertToNodeSpaceAR(o);
        
        this.node.getComponent(cc.Sprite).spriteFrame = null;
        
        const dbNode = this.node.getChildByName("db");
        if (dbNode) {
            const n = dbNode.getComponent(dragonBones.ArmatureDisplay);
            n.node.active = true;
            
            const i = ["x1", "s15", "s11", "s13", "s12", "s14", "g1", "x11", "x12", "s141", "s151", "s111", "x121", "x111", "x13"];
            for (let r = 0; r < i.length; r++) {
                Utils.setSolt(n, i[r], e);
            }
            
            const s = _.random(1, 4);
            
            Utils.addSoundEvent(n);
            Utils.playAniCall(n, "newAnimation" + s, function() {
                self.clean();
            });
        }
    }

    clean(): void {
        this.node.destroy();
    }
}