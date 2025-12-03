const { ccclass, property } = cc._decorator;

@ccclass
export default class PlatformCom extends cc.Component {
    
    private m_callbackobj: any = null;
    private m_rqcode: cc.Node = null;
    private m_tips: cc.Node = null;

    onLoad() {
        this.node.zIndex = 100;
        cc.view.getVisibleSize();
        this.m_callbackobj = null;
    }

    start() {}

    onImageBtnClick() {}

    onSaveImageBtnClick() {
        if (window.isWeChatPlatform) {
            wx.saveImageToPhotosAlbum({
                filePath: cc.url.raw("resources/common/saveImage.d2e1c.jpg"),
                success: () => {
                    this.showTipsView("二维码已保存成功");
                },
                fail: () => {
                    wx.openSetting({
                        authSetting: "scope.writePhotosAlbum",
                        success: () => {},
                        fail: () => {}
                    });
                }
            });
        }
    }

    onCloseBtnClick() {
        if (this.m_rqcode) {
            this.m_rqcode.active = false;
        }
    }

    hideTipsView() {
        if (this.m_tips) {
            const tipsTex = this.m_tips.getChildByName("TipsTex");
            if (tipsTex) {
                const label = tipsTex.getComponent(cc.Label);
                if (label) {
                    label.string = "";
                }
            }
            this.m_tips.active = false;
        }
    }

    showTipsView(text: string) {
        if (this.m_tips) {
            const tipsTex = this.m_tips.getChildByName("TipsTex");
            if (tipsTex) {
                const label = tipsTex.getComponent(cc.Label);
                if (label) {
                    label.string = text;
                }
            }
            this.m_tips.active = true;
        }
    }
}