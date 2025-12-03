"use strict";
cc._RF.push(module, 'acc85BpfG1BEqgqph5YaMms', 'menuSet');
// Scripts/menuSet.ts

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
var ExtendScript_1 = require("./ExtendScript");
var AudioManager_1 = require("./AudioManager");
var PlatformA_1 = require("./PlatformA");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MenuSet = /** @class */ (function (_super) {
    __extends(MenuSet, _super);
    function MenuSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEject = false;
        return _this;
    }
    MenuSet.prototype.onLoad = function () {
        this.isEject = false;
    };
    MenuSet.prototype.start = function () {
        if (lplatform.channel === PlatformA_1.CHANNEL.android || lplatform.channel === PlatformA_1.CHANNEL.ios) {
            var btnSendDesktop = this.node.getChildByName("btnSendDesktop");
            var btnMoreGame = this.node.getChildByName("btnMoreGame");
            var btnPrivacyPolicy = this.node.getChildByName("btnPrivacyPolicy");
            var btnUserAgreement = this.node.getChildByName("btnUserAgreement");
            if (btnSendDesktop && btnMoreGame && btnPrivacyPolicy && btnUserAgreement) {
                btnSendDesktop.active = false;
                btnMoreGame.active = false;
                btnPrivacyPolicy.x = btnSendDesktop.x;
                btnUserAgreement.x = btnMoreGame.x;
            }
        }
    };
    MenuSet.prototype.onClickSelf = function () {
        AudioManager_1.default.instance.playClickSound();
        if (this.isEject) {
            cc.tween(this.node)
                .by(0.6, { position: cc.v2(0, 110) }, { easing: "elasticOut" })
                .start();
        }
        else {
            cc.tween(this.node)
                .by(0.6, { position: cc.v2(0, -110) }, { easing: "elasticOut" })
                .start();
        }
        this.isEject = !this.isEject;
    };
    MenuSet = __decorate([
        ccclass
    ], MenuSet);
    return MenuSet;
}(ExtendScript_1.default));
exports.default = MenuSet;

cc._RF.pop();