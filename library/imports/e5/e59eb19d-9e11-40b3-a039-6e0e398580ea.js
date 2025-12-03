"use strict";
cc._RF.push(module, 'e59ebGdnhFAs6A5bg45hYDq', 'xing');
// Scripts/xing.ts

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
var Xing = /** @class */ (function (_super) {
    __extends(Xing, _super);
    function Xing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Xing.prototype.onLoad = function () { };
    Xing.prototype.init = function (t) {
        switch (t) {
            case 0:
                this.node.color = new cc.Color(68, 191, 255);
                break;
            case 1:
                this.node.color = new cc.Color(102, 202, 28);
                break;
            case 2:
                this.node.color = new cc.Color(193, 60, 255);
                break;
            case 3:
                this.node.color = new cc.Color(226, 69, 109);
                break;
            case 4:
                this.node.color = new cc.Color(255, 184, 12);
                break;
        }
    };
    Xing.prototype.start = function () { };
    Xing.prototype.update = function () {
        if (Math.random() > 0.5) {
            this.node.x += 8 * Math.random();
        }
        else {
            this.node.x -= 8 * Math.random();
        }
    };
    Xing = __decorate([
        ccclass
    ], Xing);
    return Xing;
}(cc.Component));
exports.default = Xing;

cc._RF.pop();