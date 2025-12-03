const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockItem extends cc.Component {
    @property
    private _hp: number = 0;
    
    @property
    private _type: number = 0;
    
    @property
    private _tag: number = 0;
    
    @property(cc.Node)
    private m_sp_strong: cc.Node = null;
    
    @property(cc.Node)
    private m_sp_hurt: cc.Node = null;
    
    private _tostrong: boolean = false;

    onLoad(): void {}

    start(): void {}

    initType(t: number, e: number): void {
        this._type = t;
        this._tag = e;
        
        if (window['BLOCKLIST'] && window['BLOCKLIST'][t] && window['BLOCKLIST'][t][e]) {
            this._hp = window['BLOCKLIST'][t][e].hp;
        }
        
        this.node.scale = 1;
        this.node.opacity = 255;
        this._tostrong = false;
        this.m_sp_strong.active = false;
        this.m_sp_hurt.active = false;
    }

    showHurt(t: cc.SpriteFrame): void {
        if (this._type === 1) {
            this.m_sp_hurt.active = true;
            this.m_sp_hurt.getComponent(cc.Sprite).spriteFrame = t;
        }
    }

    setSpriteFrame(t: cc.SpriteFrame): void {
        this.node.getComponent(cc.Sprite).spriteFrame = t;
    }

    getHp(): number {
        return this._hp;
    }

    getTag(): number {
        return this._tag;
    }

    addStrong(): boolean {
        if (this._tostrong) {
            return false;
        }
        
        this._tostrong = true;
        this._hp = this._hp + this._hp;
        this.m_sp_strong.scale = 0;
        this.m_sp_strong.active = true;
        this.m_sp_strong.stopAllActions();
        
        const self = this;
        this.m_sp_strong.runAction(
            cc.sequence(
                cc.scaleTo(0.5, 1, 1).easing(cc.easeIn(2)),
                cc.callFunc(() => {
                    self.m_sp_strong.runAction(
                        cc.repeatForever(
                            cc.sequence(
                                cc.scaleTo(0.5, 0.9, 0.9),
                                cc.scaleTo(0.5, 1, 1)
                            )
                        )
                    );
                })
            )
        );
        
        return true;
    }
}