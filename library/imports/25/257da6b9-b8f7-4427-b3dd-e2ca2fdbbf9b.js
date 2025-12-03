"use strict";
cc._RF.push(module, '257daa5uPdEJ7Pd4sov27+b', 'Prefab');
// Scripts/Prefab.ts

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
var Property_1 = require("./Property");
var Prefab = /** @class */ (function (_super) {
    __extends(Prefab, _super);
    function Prefab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.endWinPrefab = null;
        _this.endLosePrefab = null;
        _this.iceBlock = null;
        _this.newScore = null;
        _this.unbelievable = null;
        _this.boomPrefab = null;
        _this.rainbowPrefab = null;
        return _this;
    }
    Prefab.prototype.onLoad = function () {
        if (!Property_1.CommonPrefab.endWinPrefab) {
            Property_1.CommonPrefab.endWinPrefab = this.endWinPrefab;
        }
        if (!Property_1.CommonPrefab.endLosePrefab) {
            Property_1.CommonPrefab.endLosePrefab = this.endLosePrefab;
        }
        if (!Property_1.CommonPrefab.iceBlock) {
            Property_1.CommonPrefab.iceBlock = this.iceBlock;
        }
        if (!Property_1.CommonPrefab.newScore) {
            Property_1.CommonPrefab.newScore = this.newScore;
        }
        if (!Property_1.CommonPrefab.unbelievable) {
            Property_1.CommonPrefab.unbelievable = this.unbelievable;
        }
        if (!Property_1.CommonPrefab.boomPrefab) {
            Property_1.CommonPrefab.boomPrefab = this.boomPrefab;
        }
        if (!Property_1.CommonPrefab.rainbowPrefab) {
            Property_1.CommonPrefab.rainbowPrefab = this.rainbowPrefab;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], Prefab.prototype, "endWinPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Prefab.prototype, "endLosePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Prefab.prototype, "iceBlock", void 0);
    __decorate([
        property(cc.Prefab)
    ], Prefab.prototype, "newScore", void 0);
    __decorate([
        property(cc.Prefab)
    ], Prefab.prototype, "unbelievable", void 0);
    __decorate([
        property(cc.Prefab)
    ], Prefab.prototype, "boomPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Prefab.prototype, "rainbowPrefab", void 0);
    Prefab = __decorate([
        ccclass
    ], Prefab);
    return Prefab;
}(cc.Component));
exports.default = Prefab;

cc._RF.pop();