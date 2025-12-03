"use strict";
cc._RF.push(module, '5377ffMZm5KsILTi64J6Tnw', 'ChangeAD');
// Scripts/ChangeAD.ts

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
var PlatformA_1 = require("./PlatformA");
var ChangeAD = /** @class */ (function (_super) {
    __extends(ChangeAD, _super);
    function ChangeAD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeAD.prototype.onLoad = function () {
        if (lplatform.labData.replaceAD && lplatform.labData.replaceAD === 1) {
            this.showAd(true);
        }
        else {
            this.showAd(false);
        }
        if (lplatform.channel === PlatformA_1.CHANNEL.oppo || lplatform.channel === PlatformA_1.CHANNEL.vivo) {
            this.node.active = false;
        }
    };
    ChangeAD.prototype.showAd = function (isShow) {
        var iconAD = this.node.getChildByName("iconAD");
        if (iconAD) {
            iconAD.active = isShow;
            var sprite = this.node.getComponent(cc.Sprite);
            if (sprite) {
                sprite.enabled = !isShow;
            }
        }
    };
    ChangeAD = __decorate([
        ccclass
    ], ChangeAD);
    return ChangeAD;
}(cc.Component));
exports.default = ChangeAD;

cc._RF.pop();