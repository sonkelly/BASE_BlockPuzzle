"use strict";
cc._RF.push(module, 'ddf3cBwyKJDUYDCPI+7cKA5', 'block');
// Scripts/block.ts

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
var ExtendScript_1 = require("./ExtendScript");
var AudioManager_1 = require("./AudioManager");
var resourceUtil_1 = require("./resourceUtil");
var clientEvent_1 = require("./clientEvent");
var Common_1 = require("./Common");
var Property_1 = require("./Property");
var Utils_1 = require("./Utils");
var lodash_1 = require("./lodash");
var block = /** @class */ (function (_super) {
    __extends(block, _super);
    function block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._move = 0;
        _this._cType = -1;
        _this.iceNum = 1;
        _this.iceSprite = null;
        _this.cgSpf = [];
        _this.index = 0;
        _this.isChange = false;
        _this.isIceBlock = false;
        return _this;
    }
    block.prototype.onLoad = function () {
    };
    block.prototype.initial = function (e) {
        this.index = 0;
        this._cType = e;
        this.isChange = false;
        this.setSprite(e);
    };
    block.prototype.modeCGInitial = function (e) {
        this.isChange = false;
        this.iceNum = e.num;
        this.isIceBlock = true;
        this.setSprite("_cg_flower");
        this.setIceSprite(e.num - 1);
    };
    block.prototype.getIsIce = function () {
        return this.isIceBlock;
    };
    block.prototype.getXcNumber = function () {
        return this.iceNum;
    };
    block.prototype.setIceSprite = function (e) {
        if (this.iceSprite && this.cgSpf[e]) {
            this.iceSprite.spriteFrame = this.cgSpf[e];
        }
    };
    block.prototype.setIceNumber = function (e, t) {
        var self = this;
        this.isChange = false;
        this.iceNum = e;
        if (e > 0) {
            this.setIceSprite(e - 1);
        }
        Common_1.default.instance.showBlockBoom(this.node, this.getXcNumber(), function () {
            if (e <= 0) {
                if (t) {
                    t();
                }
                self.clean();
            }
        });
    };
    block.prototype.setSprite = function (e) {
        if (e != null) {
            var t = this.node.getComponent(cc.Sprite);
            if (e == -1) {
                t.enabled = false;
            }
            else {
                resourceUtil_1.default.instance.setSpriteFrame("kuai/k" + e, t);
            }
        }
    };
    block.prototype.setGray = function (e) {
        var t = this.node.getComponent(cc.Sprite);
        this.scheduleOnce(function () {
            resourceUtil_1.default.instance.setSpriteFrame("kuai/huiKuai", t);
            clientEvent_1.default.dispatchEvent("setGray");
        }, e);
    };
    block.prototype.setChange = function (e) {
        this.isChange = true;
        // Assuming GameMode and MODE are defined elsewhere
        if (Property_1.GameMode == Property_1.MODE.CHUANGGUAN && this.iceNum >= 2) {
            return;
        }
        var t = this.node.getComponent(cc.Sprite);
        resourceUtil_1.default.instance.setSpriteFrame("kuai/k" + e, t);
    };
    block.prototype.playDragon = function (e, t) {
        var self = this;
        this.isChange = false;
        this.scheduleOnce(function () {
            self.playAni(e);
        }, t);
    };
    block.prototype.playAni = function (e) {
        var self = this;
        AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.BCrazing);
        var o = this.node.parent.convertToWorldSpaceAR(cc.v2(0, 0));
        var tempNode = cc.find("Canvas/uiRoot/tempNode");
        this.node.parent = tempNode;
        this.node.position = tempNode.convertToNodeSpaceAR(o);
        this.node.getComponent(cc.Sprite).spriteFrame = null;
        var dbNode = this.node.getChildByName("db");
        if (dbNode) {
            var n = dbNode.getComponent(dragonBones.ArmatureDisplay);
            n.node.active = true;
            var i = ["x1", "s15", "s11", "s13", "s12", "s14", "g1", "x11", "x12", "s141", "s151", "s111", "x121", "x111", "x13"];
            for (var r = 0; r < i.length; r++) {
                Utils_1.default.setSolt(n, i[r], e);
            }
            var s = lodash_1.default.random(1, 4);
            Utils_1.default.addSoundEvent(n);
            Utils_1.default.playAniCall(n, "newAnimation" + s, function () {
                self.clean();
            });
        }
    };
    block.prototype.clean = function () {
        this.node.destroy();
    };
    __decorate([
        property
    ], block.prototype, "_move", void 0);
    __decorate([
        property
    ], block.prototype, "_cType", void 0);
    __decorate([
        property
    ], block.prototype, "iceNum", void 0);
    __decorate([
        property(cc.Sprite)
    ], block.prototype, "iceSprite", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], block.prototype, "cgSpf", void 0);
    block = __decorate([
        ccclass
    ], block);
    return block;
}(ExtendScript_1.default));
exports.default = block;

cc._RF.pop();