"use strict";
cc._RF.push(module, 'b18f0rNIwNMzIRyjHbR0sdK', 'pushTeach');
// Scripts/pushTeach.ts

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
var Common_1 = require("./Common");
var EventManager_1 = require("./EventManager");
var ExtendScript_1 = require("./ExtendScript");
var PlatformA_1 = require("./PlatformA");
var Utils_1 = require("./Utils");
var PushTeach = /** @class */ (function (_super) {
    __extends(PushTeach, _super);
    function PushTeach() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnCloseQQ = null;
        _this.btn_lookAD = null;
        _this.btn_change = null;
        _this.callback = null;
        return _this;
    }
    PushTeach.prototype.onLoad = function () {
        this.node.active = false;
        if (lplatform.channel == PlatformA_1.CHANNEL.qq &&
            lplatform.labData.changePosition &&
            lplatform.labData.changePosition == 1 &&
            Math.random() > 0.5) {
            Utils_1.default.exchangePosition(this.btn_change, this.btnCloseQQ);
        }
        if (lplatform.channel == PlatformA_1.CHANNEL.oppo &&
            lplatform.labData.changePosition &&
            lplatform.labData.changePosition == 1 &&
            Math.random() > 0.5) {
            Utils_1.default.exchangePosition(this.btn_change, this.btn_lookAD);
        }
    };
    PushTeach.prototype.start = function () {
        EventManager_1.default.instance.EventInterstitial();
    };
    PushTeach.prototype.initial = function (e) {
        this.callback = e;
    };
    PushTeach.prototype.onClickBack = function () {
        this.clean();
        Common_1.default.instance.toMenu();
    };
    PushTeach.prototype.onClickLookAD = function () {
        if (window.ClickAdCallback != null) {
            window.ClickAdCallback();
        }
    };
    PushTeach.prototype.onClickClose = function () {
        if (this.callback) {
            this.callback();
        }
        this.clean();
    };
    PushTeach.prototype.clean = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], PushTeach.prototype, "btnCloseQQ", void 0);
    __decorate([
        property(cc.Node)
    ], PushTeach.prototype, "btn_lookAD", void 0);
    __decorate([
        property(cc.Node)
    ], PushTeach.prototype, "btn_change", void 0);
    PushTeach = __decorate([
        ccclass
    ], PushTeach);
    return PushTeach;
}(ExtendScript_1.default));
exports.default = PushTeach;

cc._RF.pop();