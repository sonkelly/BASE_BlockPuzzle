const { ccclass, property } = cc._decorator;

@ccclass
export default class LayaEngine {
    private mAutoCloseTimeout: number = 0;
    private autoCloseInterval: any = null;
    private hideShareClose: number = 0;
    private videoAd: any = null;
    private bannerAd: any = null;
    private yuanshengIndex: number = 0;
    private yuanshengADK: any = null;
    private yuanshengADBanner: any = null;

    public closeToYou(): void {
        if (this.yuanshengADK) {
            this.yuanshengADK.destroy();
        }
        if (this.yuanshengADBanner) {
            this.yuanshengADBanner.destroy();
        }
    }

    public createChaping(data: any, closeCallback?: Function, clickCallback?: Function): cc.Node {
        const imgUrl = data.imgUrlList && data.imgUrlList[0] ? data.imgUrlList[0] : 
                      data.iconUrlList && data.iconUrlList[0] ? data.iconUrlList[0] : null;
        const source = data.source;
        const title = data.title;

        const container = new cc.Node();
        container.setPosition(0, 0);
        container.zIndex = 10000;
        cc.director.getScene().addChild(container);

        // Background
        const bg = new cc.Node();
        bg.setContentSize(cc.winSize.width + 20, cc.winSize.height + 20);
        bg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        const bgSprite = bg.addComponent(cc.Sprite);
        bgSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_2.png");
        bg.opacity = 178; // 0.7 * 255
        container.addChild(bg);

        // Main image
        const mainImg = new cc.Node();
        mainImg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        const mainSprite = mainImg.addComponent(cc.Sprite);
        mainSprite.spriteFrame = this.getSpriteFrame(imgUrl);
        
        const scale = (cc.winSize.width - 50) / 360;
        mainImg.setScale(scale, scale);
        mainImg.setContentSize(360, 240);
        container.addChild(mainImg);

        const clickHandler = () => {
            if (clickCallback) clickCallback();
            container.destroy();
            console.log("ad click");
        };

        mainImg.on(cc.Node.EventType.TOUCH_END, clickHandler);

        // Decoration image
        const decoImg = new cc.Node();
        decoImg.setPosition(cc.winSize.width / 2 + 150 * scale, cc.winSize.height / 2 + 110 * scale);
        const decoSprite = decoImg.addComponent(cc.Sprite);
        decoSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_1.png");
        decoImg.setAnchorPoint(1, 1);
        container.addChild(decoImg);

        // Close button
        const closeBtn = new cc.Node();
        const closeBtnScale = (window as any).lplatform?.cparam?.closeBtnScale || 1;
        if ((window as any).lplatform?.cparam?.closeBtnScale < 1) {
            closeBtn.setPosition(cc.winSize.width / 2 + 170 * scale, cc.winSize.height / 2 - 110 * scale);
        } else {
            closeBtn.setPosition(cc.winSize.width / 2 + 170 * scale, cc.winSize.height / 2 - 140 * scale);
        }
        closeBtn.setScale(closeBtnScale, closeBtnScale);
        closeBtn.setContentSize(58, 58);
        const closeSprite = closeBtn.addComponent(cc.Sprite);
        closeSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_3.png");
        container.addChild(closeBtn);

        closeBtn.on(cc.Node.EventType.TOUCH_END, () => {
            console.log("ad close");
            if (closeCallback) closeCallback();
            container.destroy();
        });

        // Action button background
        const btnBgPath = data.clickBtnTxt.indexOf("下载") >= 0 ? 
                         "res/ysguanggao/xiazaibg.png" : "res/ysguanggao/dakaibg.png";
        const actionBtn = new cc.Node();
        actionBtn.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 140 * scale);
        const actionSprite = actionBtn.addComponent(cc.Sprite);
        actionSprite.spriteFrame = this.getSpriteFrame(btnBgPath);
        actionBtn.on(cc.Node.EventType.TOUCH_END, clickHandler);
        container.addChild(actionBtn);

        // Source label
        if (source) {
            const sourceLabel = new cc.Node();
            sourceLabel.setPosition(cc.winSize.width / 2 - 110 * scale, cc.winSize.height / 2 + 110 * scale);
            const sourceLabelComp = sourceLabel.addComponent(cc.Label);
            sourceLabelComp.string = source;
            sourceLabelComp.fontSize = 30;
            container.addChild(sourceLabel);
        }

        // Title label
        if (title) {
            const titleLabel = new cc.Node();
            titleLabel.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 130 * scale);
            const titleLabelComp = titleLabel.addComponent(cc.Label);
            titleLabelComp.string = title;
            titleLabelComp.fontSize = 30;
            container.addChild(titleLabel);
        }

        // Fade in animation
        container.opacity = 0;
        cc.tween(container)
            .to(0.5, { opacity: 255 }, { easing: 'backOut' })
            .start();

        return container;
    }

    public createBanner(data: any, closeCallback?: Function, clickCallback?: Function): cc.Node {
        const imgUrl = data.imgUrlList[0];
        const source = data.source;
        const title = data.title;

        const container = new cc.Node();
        container.setContentSize(0, 0);
        container.zIndex = 10000;
        cc.director.getScene().addChild(container);

        // Main image
        const mainImg = new cc.Node();
        mainImg.setContentSize(cc.winSize.width - 20, 240);
        mainImg.setPosition(10 + mainImg.width / 2, mainImg.height / 2);
        const mainSprite = mainImg.addComponent(cc.Sprite);
        mainSprite.spriteFrame = this.getSpriteFrame(imgUrl);
        container.addChild(mainImg);

        const clickHandler = () => {
            console.log("ad click");
            if (clickCallback) clickCallback();
            container.destroy();
        };

        mainImg.on(cc.Node.EventType.TOUCH_END, clickHandler);

        // Decoration image
        const decoImg = new cc.Node();
        decoImg.setContentSize(83, 31);
        decoImg.setPosition(mainImg.width - decoImg.width / 2, decoImg.height / 2);
        const decoSprite = decoImg.addComponent(cc.Sprite);
        decoSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_1.png");
        mainImg.addChild(decoImg);

        // Close button
        const closeBtn = new cc.Node();
        const closeBtnScale = (window as any).lplatform?.cparam?.closeBtnScale || 1;
        closeBtn.setContentSize(38, 38);
        closeBtn.setPosition(mainImg.width - closeBtn.width / 2 - 5, mainImg.height - closeBtn.height / 2 - 5);
        closeBtn.setScale(closeBtnScale, closeBtnScale);
        const closeSprite = closeBtn.addComponent(cc.Sprite);
        closeSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_3.png");
        mainImg.addChild(closeBtn);

        closeBtn.on(cc.Node.EventType.TOUCH_END, () => {
            console.log("ad close");
            if (closeCallback) closeCallback();
            container.destroy();
        });

        // Action button
        const btnBgPath = data.clickBtnTxt.indexOf("下载") >= 0 ? 
                         "res/ysguanggao/xiazaibg.png" : "res/ysguanggao/dakaibg.png";
        const actionBtn = new cc.Node();
        actionBtn.setContentSize(200, 70);
        actionBtn.setPosition(mainImg.width / 2, -actionBtn.height / 2 - 20);
        const actionSprite = actionBtn.addComponent(cc.Sprite);
        actionSprite.spriteFrame = this.getSpriteFrame(btnBgPath);
        actionBtn.on(cc.Node.EventType.TOUCH_END, clickHandler);
        mainImg.addChild(actionBtn);

        // Source label
        if (source) {
            const sourceLabel = new cc.Node();
            const sourceLabelComp = sourceLabel.addComponent(cc.Label);
            sourceLabelComp.string = source;
            sourceLabelComp.fontSize = 25;
            sourceLabel.setPosition(sourceLabel.width / 2, sourceLabel.height / 2);
            mainImg.addChild(sourceLabel);
        }

        // Title label
        if (title) {
            const titleLabel = new cc.Node();
            const titleLabelComp = titleLabel.addComponent(cc.Label);
            titleLabelComp.string = title;
            titleLabelComp.fontSize = 25;
            titleLabel.setPosition(mainImg.width / 2, mainImg.height - titleLabel.height / 2);
            mainImg.addChild(titleLabel);
        }

        // Fade in animation
        container.opacity = 0;
        cc.tween(container)
            .to(0.5, { opacity: 255 }, { easing: 'backOut' })
            .start();

        return container;
    }

    public CreateShareK(
        confirmCallback?: Function, 
        closeCallback?: Function, 
        autoCloseTime?: number, 
        hideCloseBtn?: number,
        showAd?: boolean
    ): cc.Node {
        if (autoCloseTime === undefined) autoCloseTime = 0;
        if (showAd === undefined) showAd = false;

        const container = new cc.Node();
        container.setPosition(0, 0);
        container.zIndex = 10000;
        cc.director.getScene().addChild(container);

        // Background mask
        const mask = new cc.Node();
        mask.setContentSize(cc.winSize.width + 20, cc.winSize.height + 20);
        mask.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        const maskSprite = mask.addComponent(cc.Sprite);
        maskSprite.spriteFrame = this.getSpriteFrame("fenxiang/mask.png");
        mask.opacity = 102; // 0.4 * 255
        container.addChild(mask);

        mask.on(cc.Node.EventType.TOUCH_END, () => {});

        // Share image
        const shareImg = new cc.Node();
        shareImg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        const shareSprite = shareImg.addComponent(cc.Sprite);
        shareSprite.spriteFrame = this.getSpriteFrame("fenxiang/share.png");
        container.addChild(shareImg);

        // Confirm button
        const confirmBtn = new cc.Node();
        confirmBtn.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 270);
        const confirmSprite = confirmBtn.addComponent(cc.Sprite);
        confirmSprite.spriteFrame = this.getSpriteFrame("fenxiang/queding.png");
        container.addChild(confirmBtn);

        confirmBtn.on(cc.Node.EventType.TOUCH_END, () => {
            if (confirmCallback) confirmCallback();
            container.destroy();
        });

        // Close button
        const closeBtn = new cc.Node();
        const info = cc.view;
        if (info.getCanvasSize().width > info.getCanvasSize().height) {
            closeBtn.setPosition(cc.winSize.width / 2 - 310, cc.winSize.height / 2 + 195);
        } else {
            closeBtn.setPosition(cc.winSize.width / 2 - 195, cc.winSize.height / 2 + 310);
        }
        const closeSprite = closeBtn.addComponent(cc.Sprite);
        closeSprite.spriteFrame = this.getSpriteFrame("fenxiang/close.png");
        container.addChild(closeBtn);

        closeBtn.on(cc.Node.EventType.TOUCH_END, () => {
            console.log("closeBtn click");
            if (closeCallback) closeCallback();
            if (this.autoCloseInterval) {
                clearInterval(this.autoCloseInterval);
            }
            container.destroy();
        });

        // Hide close button logic
        const random = Math.random();
        const lplatform = (window as any).lplatform;
        if (lplatform?.cparam?.hideShareClose && random <= lplatform.cparam.hideShareClose) {
            closeBtn.active = false;
        } else {
            closeBtn.setScale(0, 0);
            cc.tween(closeBtn)
                .delay(1)
                .to(0.3, { scaleX: 1, scaleY: 1 }, { easing: 'backOut' })
                .start();
        }

        // Fade in animation
        container.opacity = 0;
        cc.tween(container)
            .to(0.5, { opacity: 255 }, { easing: 'backOut' })
            .start();

        // Ad banner logic
        if (showAd && lplatform?.systemInfo?.platform !== "ios") {
            this.createAdBanner(container);
        }

        return container;
    }

    public getCanvas(): HTMLCanvasElement {
        return cc.game.canvas;
    }

    private getSpriteFrame(path: string): cc.SpriteFrame {
        // Implementation depends on your resource loading mechanism
        // This is a placeholder - replace with your actual resource loading logic
        return null;
    }

    private createAdBanner(parent: cc.Node): void {
        const adIndex = Math.floor(4 * Math.random());
        const adImg = new cc.Node();
        adImg.setPosition(0, 0);
        const adSprite = adImg.addComponent(cc.Sprite);
        adSprite.spriteFrame = this.getSpriteFrame(`fenxiang/adlist${adIndex}.png`);
        parent.addChild(adImg);

        adImg.on(cc.Node.EventType.TOUCH_END, () => {
            (window as any).lplatform?.goToGameOrGameList(null);
        });

        this.startAdAnimation(adImg);
    }

    private startAdAnimation(node: cc.Node): void {
        const moveLeft = () => {
            cc.tween(node)
                .to(3, { x: cc.winSize.width - 1000 })
                .call(() => moveRight())
                .start();
        };

        const moveRight = () => {
            cc.tween(node)
                .to(3, { x: 0 })
                .call(() => moveLeft())
                .start();
        };

        moveLeft();
    }
}