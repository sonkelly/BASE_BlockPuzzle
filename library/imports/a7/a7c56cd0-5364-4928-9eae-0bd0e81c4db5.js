"use strict";
cc._RF.push(module, 'a7c56zQU2RJKJ6uC9DoHE21', 'UiSdk');
// Scripts/UiSdk.ts

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
var PlatformA_1 = require("./PlatformA");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UiSdk = /** @class */ (function (_super) {
    __extends(UiSdk, _super);
    function UiSdk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiSdk.prototype.onLoad = function () {
        if (this.node.name === "btnCloseQQ") {
            this.node.active = lplatform.channel === PlatformA_1.CHANNEL.qq;
        }
        if (this.node.name === "btnClose") {
            this.node.active = lplatform.channel !== PlatformA_1.CHANNEL.qq;
        }
        if (this.node.name === "btnLookAD") {
            this.node.active = lplatform.channel === PlatformA_1.CHANNEL.oppo;
        }
        if (this.node.name === "btnShare") {
            this.node.active = lplatform.channel === PlatformA_1.CHANNEL.tt;
        }
        if (this.node.name === "4399sy") {
            this.node.active = lplatform.channel === PlatformA_1.CHANNEL.w4399;
        }
    };
    UiSdk = __decorate([
        ccclass
    ], UiSdk);
    return UiSdk;
}(cc.Component));
exports.default = UiSdk;

cc._RF.pop();