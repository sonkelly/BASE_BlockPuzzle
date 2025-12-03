"use strict";
cc._RF.push(module, 'bbe5etPECpOBYrX+FBvVq6o', 'CCEngine');
// Scripts/CCEngine.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CCEngine = /** @class */ (function (_super) {
    __extends(CCEngine, _super);
    function CCEngine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mAutoCloseTimeout = 0;
        _this.autoCloseInterval = null;
        _this.hideShareClose = 0;
        _this.rootNode = null;
        return _this;
    }
    CCEngine.prototype.closeToYou = function () {
        if (this.rootNode) {
            this.rootNode.removeFromParent();
        }
        if (this.autoCloseInterval) {
            clearInterval(this.autoCloseInterval);
        }
    };
    CCEngine.prototype.createChaping = function (data, closeCallback, clickCallback) {
        var imgUrl = data.imgUrlList && data.imgUrlList[0] ? data.imgUrlList[0] :
            data.iconUrlList && data.iconUrlList[0] ? data.iconUrlList[0] : null;
        var source = data.source;
        var title = data.title;
        var rootNode = new cc.Node();
        rootNode.width = 10 * cc.winSize.width;
        rootNode.height = 10 * cc.winSize.height;
        rootNode.parent = cc.director.getScene();
        rootNode.zIndex = cc.macro.MAX_ZINDEX;
        rootNode.group = window.lplatform.params.uiGroup;
        var clickHandler = function () {
            console.log("ad click");
            if (clickCallback)
                clickCallback();
            rootNode.removeFromParent();
            window.onClickAdCallback = null;
        };
        var closeHandler = function (event) {
            console.log("closeBtn click");
            event.stopPropagation();
            if (closeCallback)
                closeCallback();
            rootNode.removeFromParent();
            window.onClickAdCallback = null;
        };
        var container = new cc.Node();
        container.parent = rootNode;
        var minSize = Math.min(cc.winSize.width, cc.winSize.height);
        container.width = 0.8 * minSize;
        container.height = 9 * container.width / 16;
        container.x = cc.winSize.width / 2;
        container.y = cc.winSize.height / 2 - 1.2 * container.height;
        container.on("touchend", clickHandler);
        var texture = new cc.Texture2D();
        texture.initWithData(new Uint8Array([0, 0, 0]), cc.Texture2D.PixelFormat.RGB888, 1, 1);
        var sprite = container.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = new cc.SpriteFrame(texture);
        if (imgUrl) {
            if (cc.assetManager && cc.assetManager.loadRemote) {
                cc.assetManager.loadRemote(imgUrl, { ext: ".jpg" }, function (err, tex) {
                    if (err || !tex) {
                        console.log("加载失败，ext .jpg, 尝试png");
                        cc.assetManager.loadRemote(imgUrl, { ext: ".png" }, function (err2, tex2) {
                            if (err2 || !tex2) {
                                console.log("加载失败，ext .png");
                            }
                            else if (sprite) {
                                sprite.spriteFrame = new cc.SpriteFrame(tex2);
                            }
                        });
                    }
                    else if (sprite) {
                        sprite.spriteFrame = new cc.SpriteFrame(tex);
                    }
                });
            }
            else {
                cc.loader.load({ url: imgUrl, type: "image" }, function (err, tex) {
                    if (err) {
                        console.log(err);
                    }
                    else if (sprite) {
                        sprite.spriteFrame = new cc.SpriteFrame(tex);
                    }
                });
            }
        }
        window.ClickAdCallback = clickHandler;
        var adTag = new cc.Node();
        adTag.parent = container;
        adTag.width = 83;
        adTag.height = 31;
        adTag.x = -container.width / 2 + adTag.width / 2;
        adTag.y = -container.height / 2 + adTag.height / 2;
        var adTagSprite = adTag.addComponent(cc.Sprite);
        cc.loader.loadRes("nativeAD/native_1.png", function (err, tex) {
            if (err) {
                console.log(err);
            }
            else {
                adTagSprite.spriteFrame = new cc.SpriteFrame(tex);
            }
        });
        var closeBtn = new cc.Node();
        closeBtn.parent = container;
        closeBtn.width = 50;
        closeBtn.height = 50;
        closeBtn.x = container.width / 2 - closeBtn.width / 2;
        closeBtn.y = container.height / 2 - closeBtn.height / 2;
        closeBtn.on("touchend", closeHandler);
        var lplatform = window.lplatform;
        lplatform.plog("lplatform.labData.closeBtnScale:" + lplatform.cparam.closeBtnScale + " ");
        if (lplatform.labData.closeBtnScale != null) {
            closeBtn.scale = lplatform.labData.closeBtnScale;
        }
        var closeIcon = new cc.Node();
        closeIcon.parent = container;
        closeIcon.width = 50;
        closeIcon.height = 50;
        closeIcon.x = container.width / 2 - closeIcon.width / 2;
        closeIcon.y = container.height / 2 - closeIcon.height / 2;
        var closeIconSprite = closeIcon.addComponent(cc.Sprite);
        closeIconSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        cc.loader.loadRes("nativeAD/native_3.png", function (err, tex) {
            if (err) {
                console.log(err);
            }
            else if (closeIconSprite) {
                closeIconSprite.spriteFrame = new cc.SpriteFrame(tex);
            }
        });
        if (source && source !== "undefined") {
            var sourceLabelNode = new cc.Node();
            sourceLabelNode.x = container.width / 2;
            sourceLabelNode.y = -container.height / 2;
            sourceLabelNode.anchorX = 1;
            sourceLabelNode.anchorY = 0;
            sourceLabelNode.parent = container;
            sourceLabelNode.addComponent(cc.Label).string = source;
        }
        if (title && title !== "undefined") {
            var titleLabelNode = new cc.Node();
            titleLabelNode.x = 0;
            titleLabelNode.y = -container.height / 2;
            titleLabelNode.anchorY = 0;
            titleLabelNode.parent = container;
            titleLabelNode.addComponent(cc.Label).string = title;
        }
        return rootNode;
    };
    CCEngine.prototype.CreateShareK = function (confirmCallback, closeCallback, screenshotTexture, autoCloseTime, showAd) {
        var _this = this;
        if (autoCloseTime === void 0) { autoCloseTime = 0; }
        if (showAd === void 0) { showAd = false; }
        var systemInfo = window.lplatform.systemInfo;
        var visibleSize = cc.view.getVisibleSize();
        var rootNode = new cc.Node();
        this.rootNode = rootNode;
        rootNode.x = 0.5 * visibleSize.width;
        rootNode.y = 0.5 * visibleSize.height;
        rootNode.parent = cc.director.getScene();
        rootNode.zIndex = cc.macro.MAX_ZINDEX;
        rootNode.setContentSize(cc.winSize);
        rootNode.group = window.lplatform.params.uiGroup;
        if (screenshotTexture) {
            var screenshotNode = new cc.Node();
            screenshotNode.zIndex = 1;
            screenshotNode.width = visibleSize.width;
            screenshotNode.height = visibleSize.height;
            screenshotNode.parent = rootNode;
            var lGlobal = window.lGlobal;
            var capturedTexture = lGlobal.nodeShot(screenshotNode, screenshotTexture, null);
            var spriteFrame = new cc.SpriteFrame(capturedTexture);
            spriteFrame.setFlipY(true);
            screenshotNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
            cc.tween(screenshotNode).to(0.5, {
                width: 691.5,
                height: 847.5,
                x: 0,
                y: 112
            }).start();
        }
        var mask = new cc.Node();
        mask.parent = rootNode;
        mask.opacity = 120;
        mask.scale = 1000;
        cc.loader.loadRes("fenxiang/mask.png", function (err, tex) {
            mask.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        });
        rootNode.on("touchstart", function () { }, this, true);
        rootNode.on("touchend", function () { }, this, true);
        var sharePanel = new cc.Node();
        sharePanel.parent = rootNode;
        sharePanel.x = 0;
        sharePanel.y = 0;
        sharePanel.scale = 1.5;
        sharePanel.zIndex = 2;
        cc.loader.loadRes("fenxiang/share.png", function (err, tex) {
            sharePanel.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        });
        var confirmBtn = new cc.Node();
        confirmBtn.parent = sharePanel;
        confirmBtn.x = 0;
        confirmBtn.scale = 0.9;
        confirmBtn.y = -295;
        cc.loader.loadRes("fenxiang/queding.png", function (err, tex) {
            confirmBtn.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        });
        confirmBtn.on(cc.Node.EventType.TOUCH_END, function () {
            if (confirmCallback)
                confirmCallback();
            rootNode.removeFromParent();
        });
        var closeBtn = new cc.Node();
        closeBtn.parent = sharePanel;
        if (systemInfo.windowWidth > systemInfo.windowHeight) {
            closeBtn.x = 290;
            closeBtn.y = 190;
        }
        else {
            closeBtn.x = 190;
            closeBtn.y = 310;
        }
        closeBtn.scale = 1;
        cc.loader.loadRes("fenxiang/close.png", function (err, tex) {
            closeBtn.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        });
        var autoCloseLabelNode = new cc.Node();
        autoCloseLabelNode.parent = sharePanel;
        autoCloseLabelNode.x = 0;
        autoCloseLabelNode.y = -240;
        autoCloseLabelNode.color = cc.color(3, 35, 79, 255);
        var autoCloseLabel = autoCloseLabelNode.addComponent(cc.Label);
        autoCloseLabel.string = "秒自动关闭";
        if (autoCloseTime > 0) {
            autoCloseLabelNode.active = true;
            this.mAutoCloseTimeout = autoCloseTime;
            this.autoCloseInterval = setInterval(function () {
                _this.mAutoCloseTimeout -= 0.016;
                autoCloseLabel.string = Math.ceil(_this.mAutoCloseTimeout) + "秒自动关闭";
                if (_this.mAutoCloseTimeout <= 0) {
                    if (_this.autoCloseInterval) {
                        clearInterval(_this.autoCloseInterval);
                    }
                    console.log("auto close");
                    if (closeCallback)
                        closeCallback();
                    rootNode.removeFromParent();
                }
            }, 16);
        }
        else {
            autoCloseLabelNode.active = false;
        }
        this.hideShareClose = window.lplatform.cparam.hideShareClose;
        if (Math.random() <= this.hideShareClose) {
            closeBtn.active = false;
        }
        else {
            closeBtn.scale = 0;
            var delay = cc.delayTime(1);
            var scaleOut = cc.scaleTo(0.3, 10, 10).easing(cc.easeBackOut());
            var scaleIn = cc.scaleTo(0.3, 1, 1).easing(cc.easeBackOut());
            closeBtn.runAction(cc.sequence(delay, scaleOut, scaleIn));
        }
        closeBtn.on(cc.Node.EventType.TOUCH_END, function () {
            console.log("closeBtn click closeShare");
            if (closeCallback)
                closeCallback();
            rootNode.removeFromParent();
            if (_this.autoCloseInterval) {
                clearInterval(_this.autoCloseInterval);
            }
        });
        sharePanel.opacity = 0;
        cc.tween(sharePanel).delay(0.3).to(0.4, { opacity: 255 }).start();
        if (showAd && systemInfo.platform !== "ios") {
            var adNode_1 = new cc.Node();
            adNode_1.parent = rootNode;
            adNode_1.x = -0.5 * visibleSize.width;
            adNode_1.y = 0.5 * visibleSize.height;
            adNode_1.anchorX = 0;
            adNode_1.anchorY = 1;
            cc.loader.loadRes("fenxiang/adlist.png", function (err, tex) {
                adNode_1.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                var moveOut = cc.moveTo(6, cc.v2(-0.5 * visibleSize.width - 1000 + visibleSize.width, 0.5 * visibleSize.height));
                var moveIn = cc.moveTo(6, cc.v2(-0.5 * visibleSize.width, 0.5 * visibleSize.height));
                adNode_1.runAction(cc.repeatForever(cc.sequence(moveOut, moveIn)));
            });
            adNode_1.on(cc.Node.EventType.TOUCH_END, function () {
                window.lplatform.goToGameOrGameList(null);
            });
        }
        return rootNode;
    };
    CCEngine.prototype.getCanvas = function () {
        return cc.game.canvas;
    };
    CCEngine = __decorate([
        ccclass
    ], CCEngine);
    return CCEngine;
}(cc.Component));
exports.default = CCEngine;

cc._RF.pop();