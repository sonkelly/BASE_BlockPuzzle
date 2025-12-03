"use strict";
cc._RF.push(module, 'e8ac3CQZBJN/YXYA0jiynnh', 'BlockItem');
// Scripts/BlockItem.ts

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
var BlockItem = /** @class */ (function (_super) {
    __extends(BlockItem, _super);
    function BlockItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._hp = 0;
        _this._type = 0;
        _this._tag = 0;
        _this.m_sp_strong = null;
        _this.m_sp_hurt = null;
        _this._tostrong = false;
        return _this;
    }
    BlockItem.prototype.onLoad = function () { };
    BlockItem.prototype.start = function () { };
    BlockItem.prototype.initType = function (t, e) {
        this._type = t;
        this._tag = e;
        if (window['BLOCKLIST'] && window['BLOCKLIST'][t] && window['BLOCKLIST'][t][e]) {
            this._hp = window['BLOCKLIST'][t][e].hp;
        }
        this.node.scale = 1;
        this.node.opacity = 255;
        this._tostrong = false;
        this.m_sp_strong.active = false;
        this.m_sp_hurt.active = false;
    };
    BlockItem.prototype.showHurt = function (t) {
        if (this._type === 1) {
            this.m_sp_hurt.active = true;
            this.m_sp_hurt.getComponent(cc.Sprite).spriteFrame = t;
        }
    };
    BlockItem.prototype.setSpriteFrame = function (t) {
        this.node.getComponent(cc.Sprite).spriteFrame = t;
    };
    BlockItem.prototype.getHp = function () {
        return this._hp;
    };
    BlockItem.prototype.getTag = function () {
        return this._tag;
    };
    BlockItem.prototype.addStrong = function () {
        if (this._tostrong) {
            return false;
        }
        this._tostrong = true;
        this._hp = this._hp + this._hp;
        this.m_sp_strong.scale = 0;
        this.m_sp_strong.active = true;
        this.m_sp_strong.stopAllActions();
        var self = this;
        this.m_sp_strong.runAction(cc.sequence(cc.scaleTo(0.5, 1, 1).easing(cc.easeIn(2)), cc.callFunc(function () {
            self.m_sp_strong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.9, 0.9), cc.scaleTo(0.5, 1, 1))));
        })));
        return true;
    };
    __decorate([
        property
    ], BlockItem.prototype, "_hp", void 0);
    __decorate([
        property
    ], BlockItem.prototype, "_type", void 0);
    __decorate([
        property
    ], BlockItem.prototype, "_tag", void 0);
    __decorate([
        property(cc.Node)
    ], BlockItem.prototype, "m_sp_strong", void 0);
    __decorate([
        property(cc.Node)
    ], BlockItem.prototype, "m_sp_hurt", void 0);
    BlockItem = __decorate([
        ccclass
    ], BlockItem);
    return BlockItem;
}(cc.Component));
exports.default = BlockItem;

cc._RF.pop();