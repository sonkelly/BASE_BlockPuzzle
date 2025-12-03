"use strict";
cc._RF.push(module, '9be061zG4ZLs5e9Dwv1DvZ2', 'SkinPanel');
// Scripts/SkinPanel.ts

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
var event_listener_1 = require("./event_listener");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkinPanel = /** @class */ (function (_super) {
    __extends(SkinPanel, _super);
    function SkinPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_content = null;
        _this.m_pre_skinitem = null;
        _this.m_star0 = null;
        _this.m_star1 = null;
        _this.m_star2 = null;
        _this.m_star3 = null;
        _this.m_star4 = null;
        _this.m_n_list = [];
        return _this;
    }
    SkinPanel.prototype.start = function () {
        event_listener_1.default.instance.on(window.GAME_SAVE_HANDLER, this.updateData, this);
    };
    SkinPanel.prototype.initData = function () {
        var skinConfig = window.SKIN_CONFIG;
        for (var i = 0; i < skinConfig.length; i++) {
            var item = cc.instantiate(this.m_pre_skinitem);
            item.parent = this.m_n_content;
            item.getComponent("SkinItem").updateData(i, skinConfig[i], this["m_star" + i]);
            this.m_n_list.push(item);
        }
    };
    SkinPanel.prototype.updateData = function () {
        var skinConfig = window.SKIN_CONFIG;
        for (var i = 0; i < skinConfig.length; i++) {
            this.m_n_list[i].getComponent("SkinItem").updateData(i, skinConfig[i], this["m_star" + i]);
        }
    };
    SkinPanel.prototype.onDestroy = function () {
        event_listener_1.default.instance.off(window.GAME_SAVE_HANDLER, this);
    };
    SkinPanel.prototype.onClose = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], SkinPanel.prototype, "m_n_content", void 0);
    __decorate([
        property(cc.Prefab)
    ], SkinPanel.prototype, "m_pre_skinitem", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star0", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star3", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star4", void 0);
    SkinPanel = __decorate([
        ccclass
    ], SkinPanel);
    return SkinPanel;
}(cc.Component));
exports.default = SkinPanel;

cc._RF.pop();