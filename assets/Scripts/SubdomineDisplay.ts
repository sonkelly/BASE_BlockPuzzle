const { ccclass, property } = cc._decorator;

@ccclass
export default class SubdomineDisplay extends cc.Component {
    private display: cc.Sprite = null;
    private tex: cc.Texture2D = null;

    start() {
        this.display = this.node.getComponent(cc.Sprite);
        this.tex = new cc.Texture2D();
        this.display.node.active = true;
        
        const self = this;
        this.schedule(function() {
            self._updateSubDomainCanvas();
        }, 1);
    }

    private _updateSubDomainCanvas() {
        if (this.node.active && typeof wx !== 'undefined' && this.tex) {
            this.tex.handleLoadedTexture();
            this.display.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    }

    onDestroy() {
        this.unscheduleAllCallbacks();
    }
}