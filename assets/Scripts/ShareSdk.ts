const { ccclass, property } = cc._decorator;

@ccclass('ShareSdk')
export class ShareSdk {
    private static readonly isWeChatGame: boolean = cc.sys.platform === cc.sys.WECHAT_GAME;

    public static setShareMenuEnabled(enable: boolean, withShareTicket?: boolean): void {
        if (!ShareSdk.isWeChatGame) return;
        
        const shareTicket = !!withShareTicket;
        if (enable) {
            wx.showShareMenu({
                withShareTicket: shareTicket
            });
        } else {
            wx.hideShareMenu({});
        }
    }

    public static onShareAppMessage(callback: any): void {
        if (ShareSdk.isWeChatGame) {
            wx.onShareAppMessage(callback);
        }
    }

    public static shareAppMessage(shareData: any): void {
        if (!ShareSdk.isWeChatGame) return;
        
        if (typeof shareData !== 'object') {
            console.log("param 'object' is not a js object");
            return;
        }
        
        if (shareData.title === undefined) {
            console.log("param 'object' property title is undefined!");
            return;
        }
        
        wx.shareAppMessage(shareData);
    }

    public static openReliveView(prefab: cc.Prefab, data: any, parent?: cc.Node): void {
        const node = cc.instantiate(prefab);
        
        if (parent && cc.isValid(parent)) {
            node.parent = parent;
        } else {
            const canvas = cc.find("Canvas");
            node.parent = canvas;
        }
        
        const reliveViewCtrl = node.getComponent("ReliveViewCtrl");
        if (reliveViewCtrl) {
            reliveViewCtrl.setCallBackObj(data);
            
            if (data.cost_num) {
                reliveViewCtrl.setCostNumLabel(data.cost_num);
            }
            
            reliveViewCtrl.setScoreLabel(data.score);
            reliveViewCtrl.ShowView(true);
        }
    }

    public static shareScoreMessage(score: number, title?: string, imageUrl?: string): void {
        if (!ShareSdk.isWeChatGame) return;
        
        const shareTitle = title || `本局得了${score}分，没有办法，我就是这么强大！`;
        wx.shareAppMessage({
            title: shareTitle,
            imageUrl: cc.url.raw(imageUrl)
        });
    }

    public static addRqCodeView(prefab: cc.Prefab, parent?: cc.Node, posX?: number, posY?: number): void {
        const x = posX || 0;
        const y = posY || 0;
        const node = cc.instantiate(prefab);
        
        if (parent && cc.isValid(parent)) {
            node.parent = parent;
        } else {
            const canvas = cc.find("Canvas");
            node.parent = canvas;
        }
        
        node.setPosition(x, y);
    }

    public static showFriendRankView(): void {
        // Implementation for friend rank view
    }

    public static showGroupRankView(): void {
        // Implementation for group rank view
    }
}