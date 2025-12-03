const { ccclass, property } = cc._decorator;

@ccclass
export default class BgSetting extends cc.Component {
    start(): void {
        const winSize: cc.Size = cc.winSize;
        const nodeSize: cc.Size = this.node.getContentSize();
        
        this.node.scaleX = winSize.width / nodeSize.width;
        this.node.scaleY = winSize.height / nodeSize.height;
        
        (window as any).adapt_scaleX = this.node.scaleX;
        (window as any).adapt_scaleY = this.node.scaleY;
    }
}