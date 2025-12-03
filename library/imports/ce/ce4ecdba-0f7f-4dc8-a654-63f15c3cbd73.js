"use strict";
cc._RF.push(module, 'ce4ec26D39NyKZUY/FcPL1z', 'LayaEngine');
// Scripts/LayaEngine.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LayaEngine = /** @class */ (function () {
    function LayaEngine() {
        this.mAutoCloseTimeout = 0;
        this.autoCloseInterval = null;
        this.hideShareClose = 0;
        this.videoAd = null;
        this.bannerAd = null;
        this.yuanshengIndex = 0;
        this.yuanshengADK = null;
        this.yuanshengADBanner = null;
    }
    LayaEngine.prototype.closeToYou = function () {
        if (this.yuanshengADK) {
            this.yuanshengADK.destroy();
        }
        if (this.yuanshengADBanner) {
            this.yuanshengADBanner.destroy();
        }
    };
    LayaEngine.prototype.createChaping = function (data, closeCallback, clickCallback) {
        var _a, _b, _c, _d;
        var imgUrl = data.imgUrlList && data.imgUrlList[0] ? data.imgUrlList[0] :
            data.iconUrlList && data.iconUrlList[0] ? data.iconUrlList[0] : null;
        var source = data.source;
        var title = data.title;
        var container = new cc.Node();
        container.setPosition(0, 0);
        container.zIndex = 10000;
        cc.director.getScene().addChild(container);
        // Background
        var bg = new cc.Node();
        bg.setContentSize(cc.winSize.width + 20, cc.winSize.height + 20);
        bg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        var bgSprite = bg.addComponent(cc.Sprite);
        bgSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_2.png");
        bg.opacity = 178; // 0.7 * 255
        container.addChild(bg);
        // Main image
        var mainImg = new cc.Node();
        mainImg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        var mainSprite = mainImg.addComponent(cc.Sprite);
        mainSprite.spriteFrame = this.getSpriteFrame(imgUrl);
        var scale = (cc.winSize.width - 50) / 360;
        mainImg.setScale(scale, scale);
        mainImg.setContentSize(360, 240);
        container.addChild(mainImg);
        var clickHandler = function () {
            if (clickCallback)
                clickCallback();
            container.destroy();
            console.log("ad click");
        };
        mainImg.on(cc.Node.EventType.TOUCH_END, clickHandler);
        // Decoration image
        var decoImg = new cc.Node();
        decoImg.setPosition(cc.winSize.width / 2 + 150 * scale, cc.winSize.height / 2 + 110 * scale);
        var decoSprite = decoImg.addComponent(cc.Sprite);
        decoSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_1.png");
        decoImg.setAnchorPoint(1, 1);
        container.addChild(decoImg);
        // Close button
        var closeBtn = new cc.Node();
        var closeBtnScale = ((_b = (_a = window.lplatform) === null || _a === void 0 ? void 0 : _a.cparam) === null || _b === void 0 ? void 0 : _b.closeBtnScale) || 1;
        if (((_d = (_c = window.lplatform) === null || _c === void 0 ? void 0 : _c.cparam) === null || _d === void 0 ? void 0 : _d.closeBtnScale) < 1) {
            closeBtn.setPosition(cc.winSize.width / 2 + 170 * scale, cc.winSize.height / 2 - 110 * scale);
        }
        else {
            closeBtn.setPosition(cc.winSize.width / 2 + 170 * scale, cc.winSize.height / 2 - 140 * scale);
        }
        closeBtn.setScale(closeBtnScale, closeBtnScale);
        closeBtn.setContentSize(58, 58);
        var closeSprite = closeBtn.addComponent(cc.Sprite);
        closeSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_3.png");
        container.addChild(closeBtn);
        closeBtn.on(cc.Node.EventType.TOUCH_END, function () {
            console.log("ad close");
            if (closeCallback)
                closeCallback();
            container.destroy();
        });
        // Action button background
        var btnBgPath = data.clickBtnTxt.indexOf("下载") >= 0 ?
            "res/ysguanggao/xiazaibg.png" : "res/ysguanggao/dakaibg.png";
        var actionBtn = new cc.Node();
        actionBtn.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 140 * scale);
        var actionSprite = actionBtn.addComponent(cc.Sprite);
        actionSprite.spriteFrame = this.getSpriteFrame(btnBgPath);
        actionBtn.on(cc.Node.EventType.TOUCH_END, clickHandler);
        container.addChild(actionBtn);
        // Source label
        if (source) {
            var sourceLabel = new cc.Node();
            sourceLabel.setPosition(cc.winSize.width / 2 - 110 * scale, cc.winSize.height / 2 + 110 * scale);
            var sourceLabelComp = sourceLabel.addComponent(cc.Label);
            sourceLabelComp.string = source;
            sourceLabelComp.fontSize = 30;
            container.addChild(sourceLabel);
        }
        // Title label
        if (title) {
            var titleLabel = new cc.Node();
            titleLabel.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 130 * scale);
            var titleLabelComp = titleLabel.addComponent(cc.Label);
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
    };
    LayaEngine.prototype.createBanner = function (data, closeCallback, clickCallback) {
        var _a, _b;
        var imgUrl = data.imgUrlList[0];
        var source = data.source;
        var title = data.title;
        var container = new cc.Node();
        container.setContentSize(0, 0);
        container.zIndex = 10000;
        cc.director.getScene().addChild(container);
        // Main image
        var mainImg = new cc.Node();
        mainImg.setContentSize(cc.winSize.width - 20, 240);
        mainImg.setPosition(10 + mainImg.width / 2, mainImg.height / 2);
        var mainSprite = mainImg.addComponent(cc.Sprite);
        mainSprite.spriteFrame = this.getSpriteFrame(imgUrl);
        container.addChild(mainImg);
        var clickHandler = function () {
            console.log("ad click");
            if (clickCallback)
                clickCallback();
            container.destroy();
        };
        mainImg.on(cc.Node.EventType.TOUCH_END, clickHandler);
        // Decoration image
        var decoImg = new cc.Node();
        decoImg.setContentSize(83, 31);
        decoImg.setPosition(mainImg.width - decoImg.width / 2, decoImg.height / 2);
        var decoSprite = decoImg.addComponent(cc.Sprite);
        decoSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_1.png");
        mainImg.addChild(decoImg);
        // Close button
        var closeBtn = new cc.Node();
        var closeBtnScale = ((_b = (_a = window.lplatform) === null || _a === void 0 ? void 0 : _a.cparam) === null || _b === void 0 ? void 0 : _b.closeBtnScale) || 1;
        closeBtn.setContentSize(38, 38);
        closeBtn.setPosition(mainImg.width - closeBtn.width / 2 - 5, mainImg.height - closeBtn.height / 2 - 5);
        closeBtn.setScale(closeBtnScale, closeBtnScale);
        var closeSprite = closeBtn.addComponent(cc.Sprite);
        closeSprite.spriteFrame = this.getSpriteFrame("res/ysguanggao/native_3.png");
        mainImg.addChild(closeBtn);
        closeBtn.on(cc.Node.EventType.TOUCH_END, function () {
            console.log("ad close");
            if (closeCallback)
                closeCallback();
            container.destroy();
        });
        // Action button
        var btnBgPath = data.clickBtnTxt.indexOf("下载") >= 0 ?
            "res/ysguanggao/xiazaibg.png" : "res/ysguanggao/dakaibg.png";
        var actionBtn = new cc.Node();
        actionBtn.setContentSize(200, 70);
        actionBtn.setPosition(mainImg.width / 2, -actionBtn.height / 2 - 20);
        var actionSprite = actionBtn.addComponent(cc.Sprite);
        actionSprite.spriteFrame = this.getSpriteFrame(btnBgPath);
        actionBtn.on(cc.Node.EventType.TOUCH_END, clickHandler);
        mainImg.addChild(actionBtn);
        // Source label
        if (source) {
            var sourceLabel = new cc.Node();
            var sourceLabelComp = sourceLabel.addComponent(cc.Label);
            sourceLabelComp.string = source;
            sourceLabelComp.fontSize = 25;
            sourceLabel.setPosition(sourceLabel.width / 2, sourceLabel.height / 2);
            mainImg.addChild(sourceLabel);
        }
        // Title label
        if (title) {
            var titleLabel = new cc.Node();
            var titleLabelComp = titleLabel.addComponent(cc.Label);
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
    };
    LayaEngine.prototype.CreateShareK = function (confirmCallback, closeCallback, autoCloseTime, hideCloseBtn, showAd) {
        var _this = this;
        var _a, _b;
        if (autoCloseTime === undefined)
            autoCloseTime = 0;
        if (showAd === undefined)
            showAd = false;
        var container = new cc.Node();
        container.setPosition(0, 0);
        container.zIndex = 10000;
        cc.director.getScene().addChild(container);
        // Background mask
        var mask = new cc.Node();
        mask.setContentSize(cc.winSize.width + 20, cc.winSize.height + 20);
        mask.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        var maskSprite = mask.addComponent(cc.Sprite);
        maskSprite.spriteFrame = this.getSpriteFrame("fenxiang/mask.png");
        mask.opacity = 102; // 0.4 * 255
        container.addChild(mask);
        mask.on(cc.Node.EventType.TOUCH_END, function () { });
        // Share image
        var shareImg = new cc.Node();
        shareImg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        var shareSprite = shareImg.addComponent(cc.Sprite);
        shareSprite.spriteFrame = this.getSpriteFrame("fenxiang/share.png");
        container.addChild(shareImg);
        // Confirm button
        var confirmBtn = new cc.Node();
        confirmBtn.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 270);
        var confirmSprite = confirmBtn.addComponent(cc.Sprite);
        confirmSprite.spriteFrame = this.getSpriteFrame("fenxiang/queding.png");
        container.addChild(confirmBtn);
        confirmBtn.on(cc.Node.EventType.TOUCH_END, function () {
            if (confirmCallback)
                confirmCallback();
            container.destroy();
        });
        // Close button
        var closeBtn = new cc.Node();
        var info = cc.view;
        if (info.getCanvasSize().width > info.getCanvasSize().height) {
            closeBtn.setPosition(cc.winSize.width / 2 - 310, cc.winSize.height / 2 + 195);
        }
        else {
            closeBtn.setPosition(cc.winSize.width / 2 - 195, cc.winSize.height / 2 + 310);
        }
        var closeSprite = closeBtn.addComponent(cc.Sprite);
        closeSprite.spriteFrame = this.getSpriteFrame("fenxiang/close.png");
        container.addChild(closeBtn);
        closeBtn.on(cc.Node.EventType.TOUCH_END, function () {
            console.log("closeBtn click");
            if (closeCallback)
                closeCallback();
            if (_this.autoCloseInterval) {
                clearInterval(_this.autoCloseInterval);
            }
            container.destroy();
        });
        // Hide close button logic
        var random = Math.random();
        var lplatform = window.lplatform;
        if (((_a = lplatform === null || lplatform === void 0 ? void 0 : lplatform.cparam) === null || _a === void 0 ? void 0 : _a.hideShareClose) && random <= lplatform.cparam.hideShareClose) {
            closeBtn.active = false;
        }
        else {
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
        if (showAd && ((_b = lplatform === null || lplatform === void 0 ? void 0 : lplatform.systemInfo) === null || _b === void 0 ? void 0 : _b.platform) !== "ios") {
            this.createAdBanner(container);
        }
        return container;
    };
    LayaEngine.prototype.getCanvas = function () {
        return cc.game.canvas;
    };
    LayaEngine.prototype.getSpriteFrame = function (path) {
        // Implementation depends on your resource loading mechanism
        // This is a placeholder - replace with your actual resource loading logic
        return null;
    };
    LayaEngine.prototype.createAdBanner = function (parent) {
        var adIndex = Math.floor(4 * Math.random());
        var adImg = new cc.Node();
        adImg.setPosition(0, 0);
        var adSprite = adImg.addComponent(cc.Sprite);
        adSprite.spriteFrame = this.getSpriteFrame("fenxiang/adlist" + adIndex + ".png");
        parent.addChild(adImg);
        adImg.on(cc.Node.EventType.TOUCH_END, function () {
            var _a;
            (_a = window.lplatform) === null || _a === void 0 ? void 0 : _a.goToGameOrGameList(null);
        });
        this.startAdAnimation(adImg);
    };
    LayaEngine.prototype.startAdAnimation = function (node) {
        var moveLeft = function () {
            cc.tween(node)
                .to(3, { x: cc.winSize.width - 1000 })
                .call(function () { return moveRight(); })
                .start();
        };
        var moveRight = function () {
            cc.tween(node)
                .to(3, { x: 0 })
                .call(function () { return moveLeft(); })
                .start();
        };
        moveLeft();
    };
    LayaEngine = __decorate([
        ccclass
    ], LayaEngine);
    return LayaEngine;
}());
exports.default = LayaEngine;

cc._RF.pop();