"use strict";
cc._RF.push(module, '686c6d3dVFASYCgse99uNgv', 'BlockBGItem');
// Scripts/BlockBGItem.ts

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
var BlockBGItem = /** @class */ (function (_super) {
    __extends(BlockBGItem, _super);
    function BlockBGItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_bright = null;
        return _this;
    }
    BlockBGItem.prototype.onLoad = function () { };
    BlockBGItem.prototype.start = function () { };
    BlockBGItem.prototype.setBrightVisible = function (isVisible, colorHex) {
        this.m_n_bright.active = isVisible;
        if (colorHex) {
            this.m_n_bright.color = cc.Color.WHITE.fromHEX(colorHex);
        }
    };
    __decorate([
        property(cc.Node)
    ], BlockBGItem.prototype, "m_n_bright", void 0);
    BlockBGItem = __decorate([
        ccclass
    ], BlockBGItem);
    return BlockBGItem;
}(cc.Component));
exports.default = BlockBGItem;

cc._RF.pop();