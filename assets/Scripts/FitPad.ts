const { ccclass, property } = cc._decorator;

@ccclass
export default class FitPad extends cc.Component {
    @property
    channel: string = "iOS|web";
    
    @property
    cameraBgColor: string = "#2A1B38";
    
    @property(cc.Camera)
    camera: cc.Camera = null;

    onLoad(): void {
        if (window.lplatform && this.channel.indexOf(lplatform.channel) >= 0) {
            const visibleSize: cc.Size = cc.view.getVisibleSize();
            const minSize: number = Math.min(visibleSize.width, visibleSize.height);
            const maxSize: number = Math.max(visibleSize.width, visibleSize.height);
            
            if (minSize / maxSize > 9 / 16) {
                const canvas: cc.Canvas = this.node.getComponent(cc.Canvas);
                canvas.fitHeight = true;
                
                if (this.camera) {
                    this.camera.backgroundColor = this.camera.backgroundColor.fromHEX(this.cameraBgColor);
                }
            }
        }
    }

    start(): void {
        // Start logic here
    }
}