const { ccclass, property } = cc._decorator;

@ccclass
export default class GameEndRank extends cc.Component {
    @property(cc.Sprite)
    display: cc.Sprite = null;

    private tex: cc.Texture2D = null;

    start(): void {
        this.tex = new cc.Texture2D();
    }

    private _updaetSubDomainCanvas(): void {
        if (this.tex) {
            this.tex.handleLoadedTexture();
            this.display.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    }

    update(): void {
        if (typeof wx !== 'undefined') {
            this._updaetSubDomainCanvas();
        }
    }
}