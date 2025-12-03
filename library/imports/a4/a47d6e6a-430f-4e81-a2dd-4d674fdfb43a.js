"use strict";
cc._RF.push(module, 'a47d65qQw9OgaLdTWdP37Q6', 'BgItem');
// Scripts/BgItem.ts

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
var BgItem = /** @class */ (function (_super) {
    __extends(BgItem, _super);
    function BgItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_bgday = null;
        _this.m_n_bgnight = null;
        return _this;
    }
    BgItem.prototype.start = function () {
        var currentHour = new Date().getHours();
        this.m_n_bgday.active = currentHour >= 8 && currentHour <= 18;
        this.m_n_bgnight.active = currentHour < 8 || currentHour > 18;
    };
    __decorate([
        property(cc.Node)
    ], BgItem.prototype, "m_n_bgday", void 0);
    __decorate([
        property(cc.Node)
    ], BgItem.prototype, "m_n_bgnight", void 0);
    BgItem = __decorate([
        ccclass
    ], BgItem);
    return BgItem;
}(cc.Component));
exports.default = BgItem;

cc._RF.pop();