"use strict";
cc._RF.push(module, '2e3a9LXrQtHr5AYH6cgRxRK', 'effectBomb');
// Scripts/effectBomb.ts

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
var Utils_1 = require("./Utils");
var EffectBomb = /** @class */ (function (_super) {
    __extends(EffectBomb, _super);
    function EffectBomb() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.aniNode = null;
        return _this;
    }
    EffectBomb.prototype.initial = function (e, t) {
        var o = this;
        console.log(e, t);
        if (e === 1) {
            Utils_1.default.playAniCall(this.aniNode, "newAnimation", function () {
                o.node.destroy();
            });
        }
        else if (e === 2) {
            Utils_1.default.playAniCall(this.aniNode, "newAnimation", function () {
                o.node.destroy();
            });
            this.aniNode.node.x = -t.x;
        }
        else if (e === 3) {
            Utils_1.default.playAniCall(this.aniNode, "newAnimation", function () {
                o.node.destroy();
            });
            this.aniNode.node.angle = -90;
            this.aniNode.node.y = -t.y;
        }
    };
    __decorate([
        property({
            type: dragonBones.ArmatureDisplay,
            tooltip: "特效龙骨动画"
        })
    ], EffectBomb.prototype, "aniNode", void 0);
    EffectBomb = __decorate([
        ccclass
    ], EffectBomb);
    return EffectBomb;
}(ExtendScript_1.default));
exports.default = EffectBomb;

cc._RF.pop();