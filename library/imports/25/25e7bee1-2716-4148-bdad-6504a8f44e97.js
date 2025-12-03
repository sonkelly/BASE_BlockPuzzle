"use strict";
cc._RF.push(module, '25e7b7hJxZBSL2tZQSo9E6X', 'BigStepItem');
// Scripts/BigStepItem.ts

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
var BigStepItem = /** @class */ (function (_super) {
    __extends(BigStepItem, _super);
    function BigStepItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_sp_stepicon = null;
        _this.m_sp_stepname = null;
        _this.m_n_lock = null;
        _this.m_l_condition = null;
        _this.m_n_starlist = [];
        return _this;
    }
    BigStepItem.prototype.start = function () { };
    BigStepItem.prototype.updateData = function (t, e, i, n, o) {
        if (o === void 0) { o = 0; }
        if (t) {
            var colors = ["#33ABEE", "#33EEEE", "#33EE94", "#BAE789"];
            this.node.color = cc.Color.WHITE.fromHEX(colors[o]);
            this.m_sp_stepicon.spriteFrame = e;
            this.m_sp_stepname.spriteFrame = i;
            for (var c = 0; c < this.m_n_starlist.length; c++) {
                this.m_n_starlist[c].active = c < t.star;
            }
            this.m_n_lock.active = t.lv > n;
            if (t.lv > n) {
                this.m_l_condition.node.y = -33;
                this.m_l_condition.string = cc.js.formatStr("需通关%d关", t.lv);
            }
            else {
                this.m_l_condition.node.y = 0;
                this.m_l_condition.string = "已获得";
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], BigStepItem.prototype, "m_sp_stepicon", void 0);
    __decorate([
        property(cc.Sprite)
    ], BigStepItem.prototype, "m_sp_stepname", void 0);
    __decorate([
        property(cc.Node)
    ], BigStepItem.prototype, "m_n_lock", void 0);
    __decorate([
        property(cc.Label)
    ], BigStepItem.prototype, "m_l_condition", void 0);
    __decorate([
        property([cc.Node])
    ], BigStepItem.prototype, "m_n_starlist", void 0);
    BigStepItem = __decorate([
        ccclass
    ], BigStepItem);
    return BigStepItem;
}(cc.Component));
exports.default = BigStepItem;

cc._RF.pop();