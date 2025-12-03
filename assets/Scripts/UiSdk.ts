import { CHANNEL } from "./PlatformA";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UiSdk extends cc.Component {
    
    onLoad(): void {
        if (this.node.name === "btnCloseQQ") {
            this.node.active = lplatform.channel === CHANNEL.qq;
        }
        
        if (this.node.name === "btnClose") {
            this.node.active = lplatform.channel !== CHANNEL.qq;
        }
        
        if (this.node.name === "btnLookAD") {
            this.node.active = lplatform.channel === CHANNEL.oppo;
        }
        
        if (this.node.name === "btnShare") {
            this.node.active = lplatform.channel === CHANNEL.tt;
        }
        
        if (this.node.name === "4399sy") {
            this.node.active = lplatform.channel === CHANNEL.w4399;
        }
    }
}