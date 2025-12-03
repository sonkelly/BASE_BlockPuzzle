const { ccclass, property } = cc._decorator;

@ccclass
export default class CCEngine extends cc.Component {
    private mAutoCloseTimeout: number = 0;
    private autoCloseInterval: any = null;
    private hideShareClose: number = 0;
    private rootNode: cc.Node = null;

    public closeToYou(): void {
        if (this.rootNode) {
            this.rootNode.removeFromParent();
        }
        if (this.autoCloseInterval) {
            clearInterval(this.autoCloseInterval);
        }
    }

    public createChaping(data: any, closeCallback?: Function, clickCallback?: Function): cc.Node {
        const imgUrl = data.imgUrlList && data.imgUrlList[0] ? data.imgUrlList[0] : 
                      data.iconUrlList && data.iconUrlList[0] ? data.iconUrlList[0] : null;
        const source = data.source;
        const title = data.title;

        const rootNode = new cc.Node();
        rootNode.width = 10 * cc.winSize.width;
        rootNode.height = 10 * cc.winSize.height;
        rootNode.parent = cc.director.getScene();
        rootNode.zIndex = cc.macro.MAX_ZINDEX;
        rootNode.group = (window as any).lplatform.params.uiGroup;

        const clickHandler = (): void => {
            console.log("ad click");
            if (clickCallback) clickCallback();
            rootNode.removeFromParent();
            (window as any).onClickAdCallback = null;
        };

        const closeHandler = (event: cc.Event.EventTouch): void => {
            console.log("closeBtn click");
            event.stopPropagation();
            if (closeCallback) closeCallback();
            rootNode.removeFromParent();
            (window as any).onClickAdCallback = null;
        };

        const container = new cc.Node();
        container.parent = rootNode;
        const minSize = Math.min(cc.winSize.width, cc.winSize.height);
        container.width = 0.8 * minSize;
        container.height = 9 * container.width / 16;
        container.x = cc.winSize.width / 2;
        container.y = cc.winSize.height / 2 - 1.2 * container.height;
        container.on("touchend", clickHandler);

        const texture = new cc.Texture2D();
        texture.initWithData(new Uint8Array([0, 0, 0]), cc.Texture2D.PixelFormat.RGB888, 1, 1);
        
        const sprite = container.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = new cc.SpriteFrame(texture);

        if (imgUrl) {
            if (cc.assetManager && (cc.assetManager as any).loadRemote) {
                (cc.assetManager as any).loadRemote(imgUrl, { ext: ".jpg" }, (err: Error, tex: cc.Texture2D) => {
                    if (err || !tex) {
                        console.log("加载失败，ext .jpg, 尝试png");
                        (cc.assetManager as any).loadRemote(imgUrl, { ext: ".png" }, (err2: Error, tex2: cc.Texture2D) => {
                            if (err2 || !tex2) {
                                console.log("加载失败，ext .png");
                            } else if (sprite) {
                                sprite.spriteFrame = new cc.SpriteFrame(tex2);
                            }
                        });
                    } else if (sprite) {
                        sprite.spriteFrame = new cc.SpriteFrame(tex);
                    }
                });
            } else {
                cc.loader.load({ url: imgUrl, type: "image" }, (err: Error, tex: cc.Texture2D) => {
                    if (err) {
                        console.log(err);
                    } else if (sprite) {
                        sprite.spriteFrame = new cc.SpriteFrame(tex);
                    }
                });
            }
        }

        (window as any).ClickAdCallback = clickHandler;

        const adTag = new cc.Node();
        adTag.parent = container;
        adTag.width = 83;
        adTag.height = 31;
        adTag.x = -container.width / 2 + adTag.width / 2;
        adTag.y = -container.height / 2 + adTag.height / 2;
        
        const adTagSprite = adTag.addComponent(cc.Sprite);
        cc.loader.loadRes("nativeAD/native_1.png", (err: Error, tex: cc.Texture2D) => {
            if (err) {
                console.log(err);
            } else {
                adTagSprite.spriteFrame = new cc.SpriteFrame(tex);
            }
        });

        const closeBtn = new cc.Node();
        closeBtn.parent = container;
        closeBtn.width = 50;
        closeBtn.height = 50;
        closeBtn.x = container.width / 2 - closeBtn.width / 2;
        closeBtn.y = container.height / 2 - closeBtn.height / 2;
        closeBtn.on("touchend", closeHandler);

        const lplatform = (window as any).lplatform;
        lplatform.plog("lplatform.labData.closeBtnScale:" + lplatform.cparam.closeBtnScale + " ");
        if (lplatform.labData.closeBtnScale != null) {
            closeBtn.scale = lplatform.labData.closeBtnScale;
        }

        const closeIcon = new cc.Node();
        closeIcon.parent = container;
        closeIcon.width = 50;
        closeIcon.height = 50;
        closeIcon.x = container.width / 2 - closeIcon.width / 2;
        closeIcon.y = container.height / 2 - closeIcon.height / 2;
        
        const closeIconSprite = closeIcon.addComponent(cc.Sprite);
        closeIconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        cc.loader.loadRes("nativeAD/native_3.png", (err: Error, tex: cc.Texture2D) => {
            if (err) {
                console.log(err);
            } else if (closeIconSprite) {
                closeIconSprite.spriteFrame = new cc.SpriteFrame(tex);
            }
        });

        if (source && source !== "undefined") {
            const sourceLabelNode = new cc.Node();
            sourceLabelNode.x = container.width / 2;
            sourceLabelNode.y = -container.height / 2;
            sourceLabelNode.anchorX = 1;
            sourceLabelNode.anchorY = 0;
            sourceLabelNode.parent = container;
            sourceLabelNode.addComponent(cc.Label).string = source;
        }

        if (title && title !== "undefined") {
            const titleLabelNode = new cc.Node();
            titleLabelNode.x = 0;
            titleLabelNode.y = -container.height / 2;
            titleLabelNode.anchorY = 0;
            titleLabelNode.parent = container;
            titleLabelNode.addComponent(cc.Label).string = title;
        }

        return rootNode;
    }

    public CreateShareK(
        confirmCallback?: Function, 
        closeCallback?: Function, 
        screenshotTexture?: cc.Texture2D, 
        autoCloseTime: number = 0, 
        showAd: boolean = false
    ): cc.Node {
        const systemInfo = (window as any).lplatform.systemInfo;
        const visibleSize = cc.view.getVisibleSize();
        const rootNode = new cc.Node();
        
        this.rootNode = rootNode;
        rootNode.x = 0.5 * visibleSize.width;
        rootNode.y = 0.5 * visibleSize.height;
        rootNode.parent = cc.director.getScene();
        rootNode.zIndex = cc.macro.MAX_ZINDEX;
        rootNode.setContentSize(cc.winSize);
        rootNode.group = (window as any).lplatform.params.uiGroup;

        if (screenshotTexture) {
            const screenshotNode = new cc.Node();
            screenshotNode.zIndex = 1;
            screenshotNode.width = visibleSize.width;
            screenshotNode.height = visibleSize.height;
            screenshotNode.parent = rootNode;

            const lGlobal = (window as any).lGlobal;
            const capturedTexture = lGlobal.nodeShot(screenshotNode, screenshotTexture, null);
            const spriteFrame = new cc.SpriteFrame(capturedTexture);
            spriteFrame.setFlipY(true);
            screenshotNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
            
            cc.tween(screenshotNode).to(0.5, {
                width: 691.5,
                height: 847.5,
                x: 0,
                y: 112
            }).start();
        }

        const mask = new cc.Node();
        mask.parent = rootNode;
        mask.opacity = 120;
        mask.scale = 1000;
        cc.loader.loadRes("fenxiang/mask.png", (err: Error, tex: cc.Texture2D) => {
            mask.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        });

        rootNode.on("touchstart", () => {}, this, true);
        rootNode.on("touchend", () => {}, this, true);

        const sharePanel = new cc.Node();
        sharePanel.parent = rootNode;
        sharePanel.x = 0;
        sharePanel.y = 0;
        sharePanel.scale = 1.5;
        sharePanel.zIndex = 2;
        cc.loader.loadRes("fenxiang/share.png", (err: Error, tex: cc.Texture2D) => {
            sharePanel.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        });

        const confirmBtn = new cc.Node();
        confirmBtn.parent = sharePanel;
        confirmBtn.x = 0;
        confirmBtn.scale = 0.9;
        confirmBtn.y = -295;
        cc.loader.loadRes("fenxiang/queding.png", (err: Error, tex: cc.Texture2D) => {
            confirmBtn.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        });
        confirmBtn.on(cc.Node.EventType.TOUCH_END, () => {
            if (confirmCallback) confirmCallback();
            rootNode.removeFromParent();
        });

        const closeBtn = new cc.Node();
        closeBtn.parent = sharePanel;
        if (systemInfo.windowWidth > systemInfo.windowHeight) {
            closeBtn.x = 290;
            closeBtn.y = 190;
        } else {
            closeBtn.x = 190;
            closeBtn.y = 310;
        }
        closeBtn.scale = 1;
        cc.loader.loadRes("fenxiang/close.png", (err: Error, tex: cc.Texture2D) => {
            closeBtn.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        });

        const autoCloseLabelNode = new cc.Node();
        autoCloseLabelNode.parent = sharePanel;
        autoCloseLabelNode.x = 0;
        autoCloseLabelNode.y = -240;
        autoCloseLabelNode.color = cc.color(3, 35, 79, 255);
        
        const autoCloseLabel = autoCloseLabelNode.addComponent(cc.Label);
        autoCloseLabel.string = "秒自动关闭";

        if (autoCloseTime > 0) {
            autoCloseLabelNode.active = true;
            this.mAutoCloseTimeout = autoCloseTime;
            this.autoCloseInterval = setInterval(() => {
                this.mAutoCloseTimeout -= 0.016;
                autoCloseLabel.string = Math.ceil(this.mAutoCloseTimeout) + "秒自动关闭";
                if (this.mAutoCloseTimeout <= 0) {
                    if (this.autoCloseInterval) {
                        clearInterval(this.autoCloseInterval);
                    }
                    console.log("auto close");
                    if (closeCallback) closeCallback();
                    rootNode.removeFromParent();
                }
            }, 16);
        } else {
            autoCloseLabelNode.active = false;
        }

        this.hideShareClose = (window as any).lplatform.cparam.hideShareClose;
        if (Math.random() <= this.hideShareClose) {
            closeBtn.active = false;
        } else {
            closeBtn.scale = 0;
            const delay = cc.delayTime(1);
            const scaleOut = cc.scaleTo(0.3, 10, 10).easing(cc.easeBackOut());
            const scaleIn = cc.scaleTo(0.3, 1, 1).easing(cc.easeBackOut());
            closeBtn.runAction(cc.sequence(delay, scaleOut, scaleIn));
        }

        closeBtn.on(cc.Node.EventType.TOUCH_END, () => {
            console.log("closeBtn click closeShare");
            if (closeCallback) closeCallback();
            rootNode.removeFromParent();
            if (this.autoCloseInterval) {
                clearInterval(this.autoCloseInterval);
            }
        });

        sharePanel.opacity = 0;
        cc.tween(sharePanel).delay(0.3).to(0.4, { opacity: 255 }).start();

        if (showAd && systemInfo.platform !== "ios") {
            const adNode = new cc.Node();
            adNode.parent = rootNode;
            adNode.x = -0.5 * visibleSize.width;
            adNode.y = 0.5 * visibleSize.height;
            adNode.anchorX = 0;
            adNode.anchorY = 1;
            cc.loader.loadRes("fenxiang/adlist.png", (err: Error, tex: cc.Texture2D) => {
                adNode.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                const moveOut = cc.moveTo(6, cc.v2(-0.5 * visibleSize.width - 1000 + visibleSize.width, 0.5 * visibleSize.height));
                const moveIn = cc.moveTo(6, cc.v2(-0.5 * visibleSize.width, 0.5 * visibleSize.height));
                adNode.runAction(cc.repeatForever(cc.sequence(moveOut, moveIn)));
            });
            adNode.on(cc.Node.EventType.TOUCH_END, () => {
                (window as any).lplatform.goToGameOrGameList(null);
            });
        }

        return rootNode;
    }

    public getCanvas(): HTMLCanvasElement {
        return cc.game.canvas;
    }
}