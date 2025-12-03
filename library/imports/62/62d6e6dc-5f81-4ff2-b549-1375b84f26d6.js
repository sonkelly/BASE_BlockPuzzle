"use strict";
cc._RF.push(module, '62d6ebcX4FP8rVJE3W4TybW', 'Common_CommonUtil');
// Scripts/Common_CommonUtil.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameData_1 = require("./GameData");
var Common_CommonUtil = /** @class */ (function () {
    function Common_CommonUtil() {
    }
    Common_CommonUtil.isWeChat = function () {
        return cc.sys.platform === cc.sys.WECHAT_GAME;
    };
    Common_CommonUtil.showTips = function (text, duration) {
        GameData_1.GameBundle[3].load("GameRes3/common/prefabs/h5game_Tips", function (err, prefab) {
            if (err) {
                cc.error(err);
                return;
            }
            var tipsNode = cc.instantiate(prefab);
            tipsNode.getComponent("h5game_Tips").setText(text, duration);
            tipsNode.parent = cc.director.getScene();
        });
    };
    Common_CommonUtil.showShareFailTips = function () {
        this.getPrefab("prefabs/n_sharebubble", function (node) {
            node.parent = cc.find("Canvas") || cc.director.getScene().children[0];
            node.zIndex = 2048;
        });
    };
    Common_CommonUtil.shakeScreen = function (target, duration, intensity) {
        if (duration === void 0) { duration = 0.02; }
        if (intensity === void 0) { intensity = 10; }
        target.stopAllActions();
        target.runAction(cc.sequence(cc.moveBy(duration, cc.v2(2 * intensity, 0)), cc.moveBy(2 * duration, cc.v2(4 * -intensity, 0)), cc.moveBy(duration, cc.v2(2 * intensity, 0)), cc.moveBy(duration, cc.v2(0, 2 * intensity)), cc.moveBy(2 * duration, cc.v2(0, 4 * -intensity)), cc.moveBy(duration, cc.v2(0, 2 * intensity)), cc.moveBy(duration, cc.v2(intensity, 0)), cc.moveBy(2 * duration, cc.v2(2 * -intensity, 0)), cc.moveBy(duration, cc.v2(intensity, 0)), cc.moveBy(duration, cc.v2(0, intensity)), cc.moveBy(2 * duration, cc.v2(0, 2 * -intensity)), cc.moveBy(duration, cc.v2(0, intensity))));
    };
    Common_CommonUtil.fitScreen = function () {
        var canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
        var visibleSize = cc.view.getVisibleSize();
        if (visibleSize.width / visibleSize.height < 9 / 16) {
            canvas.fitWidth = true;
            canvas.fitHeight = false;
        }
        else {
            canvas.fitWidth = false;
            canvas.fitHeight = true;
        }
    };
    Common_CommonUtil.resetScale = function (node) {
        var visibleSize = cc.view.getVisibleSize();
        if (visibleSize.width / visibleSize.height < 9 / 16) {
            node.scale = visibleSize.width / 1080;
        }
        else {
            node.scale = visibleSize.height / 1920;
        }
    };
    Common_CommonUtil.imgStr = function (str) {
        return str;
    };
    Common_CommonUtil.txtStr = function (str) {
        return str;
    };
    Common_CommonUtil.setSprite = function (target, path, callback) {
        if (path === void 0) { path = ""; }
        if (!target) {
            throw new Error("请传入正确的节点名称");
        }
        if (!path) {
            throw new Error("请传入正确的资源路径");
        }
        var sprite;
        if (target instanceof cc.Sprite) {
            sprite = target;
        }
        else if (target instanceof cc.Node) {
            sprite = target.getComponent(cc.Sprite);
        }
        else if (typeof target === "string") {
            sprite = cc.find(target).getComponent(cc.Sprite);
        }
        else {
            throw new Error("传入节点资源类型不正确");
        }
        if (!sprite) {
            throw new Error("未找到正确的Sprite");
        }
        if (sprite && sprite.spriteFrame) {
            var originalOpacity_1 = sprite.node.opacity;
            sprite.node.opacity = 0;
            var loadMethod = path.indexOf("http") !== 0 ? "loadRes" : "load";
            cc.loader[loadMethod](path, function (err, texture) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                sprite.node.opacity = originalOpacity_1;
                callback && callback();
            });
        }
    };
    Common_CommonUtil.getPrefab = function (path, callback) {
        GameData_1.GameBundle[3].load("GameRes3/" + path, function (err, prefab) {
            if (err) {
                throw err;
            }
            callback(cc.instantiate(prefab));
        });
    };
    Common_CommonUtil.setAvatarSprite = function (target, avatarUrl) {
        var sprite = null;
        if (target instanceof cc.Sprite) {
            sprite = target;
        }
        else if (target instanceof cc.Node) {
            sprite = target.getComponent(cc.Sprite);
        }
        if (!sprite) {
            throw new Error("CommonUtil.setSprite: 无法找到正确的Sprite");
        }
        var image = wx.createImage();
        image.onload = function () {
            var texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        };
        image.src = avatarUrl;
    };
    Common_CommonUtil = __decorate([
        ccclass
    ], Common_CommonUtil);
    return Common_CommonUtil;
}());
exports.default = Common_CommonUtil;

cc._RF.pop();