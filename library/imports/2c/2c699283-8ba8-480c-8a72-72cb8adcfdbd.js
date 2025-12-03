"use strict";
cc._RF.push(module, '2c699KDi6hIDIpycsuK3P29', 'resourceUtil');
// Scripts/resourceUtil.ts

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
var ResourceUtil = /** @class */ (function (_super) {
    __extends(ResourceUtil, _super);
    function ResourceUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceUtil_1 = ResourceUtil;
    ResourceUtil.prototype.onLoad = function () {
        // Initialization code can be added here if needed
    };
    ResourceUtil.prototype.setGray = function (node, isGray) {
        var sprites = node.getComponentsInChildren(cc.Sprite);
        for (var i = 0; i < sprites.length; ++i) {
            var sprite = sprites[i];
            if (isGray) {
                sprite.setState(cc.Sprite.State.GRAY);
            }
            else {
                sprite.setState(cc.Sprite.State.NORMAL);
            }
        }
    };
    ResourceUtil.prototype.loadRes = function (path, type, callback) {
        cc.resources.load(path, type, function (error, asset) {
            if (error) {
                cc.error(error.message || error);
                callback(error, asset);
                return;
            }
            callback(null, asset);
        });
    };
    ResourceUtil.prototype.setSpriteFrame = function (path, sprite, callback) {
        this.loadRes(path, cc.SpriteFrame, function (error, spriteFrame) {
            if (error) {
                console.error("set sprite frame failed! err:", path, error);
                if (callback) {
                    callback(error);
                }
                return;
            }
            if (sprite && cc.isValid(sprite)) {
                sprite.spriteFrame = spriteFrame;
                if (callback) {
                    callback(null);
                }
            }
        });
    };
    var ResourceUtil_1;
    ResourceUtil.instance = new ResourceUtil_1();
    ResourceUtil = ResourceUtil_1 = __decorate([
        ccclass
    ], ResourceUtil);
    return ResourceUtil;
}(cc.Component));
exports.default = ResourceUtil;

cc._RF.pop();