"use strict";
cc._RF.push(module, 'c9602sclEJEy6leDO0tmDmA', 'star');
// Scripts/star.ts

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
var star = /** @class */ (function (_super) {
    __extends(star, _super);
    function star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spf_block = [];
        _this.node_xiaoChu = null;
        _this.blockType = 0;
        _this.is_xiaoChu = false;
        _this.is_tiShi = false;
        _this.is_chuiZi = false;
        _this.is_biShua = false;
        return _this;
    }
    star.prototype.onLoad = function () { };
    star.prototype.init = function (t) {
        this.blockType = t;
        this.is_xiaoChu = false;
        this.is_tiShi = false;
        this.is_chuiZi = false;
        this.is_biShua = false;
        this.node_xiaoChu.active = false;
        this.node.getComponent(cc.Sprite).spriteFrame = this.spf_block[this.blockType];
    };
    star.prototype.canXiaoChu = function () {
        this.is_xiaoChu = true;
        this.node_xiaoChu.active = true;
    };
    star.prototype.quXiaoXiaoChu = function () {
        this.is_xiaoChu = false;
        this.node_xiaoChu.active = false;
    };
    star.prototype.canTiShi = function () {
        this.is_tiShi = true;
        this.node_xiaoChu.active = true;
    };
    star.prototype.quXiaoTiShi = function () {
        this.is_tiShi = false;
        this.node_xiaoChu.active = false;
    };
    star.prototype.chuiZi = function () {
        this.is_chuiZi = true;
        this.node_xiaoChu.active = true;
    };
    star.prototype.quXiaoChuiZi = function () {
        this.is_chuiZi = false;
        this.node_xiaoChu.active = false;
    };
    star.prototype.biShua = function () {
        this.is_biShua = true;
        this.node_xiaoChu.active = true;
        this.node.stopAllActions();
        this.node.scale = 1;
        cc.tween(this.node)
            .repeatForever(cc.tween()
            .to(0.4, { scale: 0.6 })
            .to(0.4, { scale: 1 }))
            .start();
    };
    star.prototype.quXiaoBiShua = function () {
        this.is_biShua = false;
        this.node_xiaoChu.active = false;
        this.node.stopAllActions();
        this.node.scale = 1;
    };
    star.prototype.start = function () { };
    __decorate([
        property([cc.SpriteFrame])
    ], star.prototype, "spf_block", void 0);
    __decorate([
        property(cc.Node)
    ], star.prototype, "node_xiaoChu", void 0);
    star = __decorate([
        ccclass
    ], star);
    return star;
}(cc.Component));
exports.default = star;

cc._RF.pop();