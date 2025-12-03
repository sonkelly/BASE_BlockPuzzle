"use strict";
cc._RF.push(module, 'fe16bUaIzNJp4bhA6ewoWek', 'pushChange');
// Scripts/pushChange.ts

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
var Property_1 = require("./Property");
var GameData_1 = require("./GameData");
var PlatformA_1 = require("./PlatformA");
var Utils_1 = require("./Utils");
var PushChange = /** @class */ (function (_super) {
    __extends(PushChange, _super);
    function PushChange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnCloseQQ = null;
        _this.btn_lookAD = null;
        _this.btn_change = null;
        _this.callback = null;
        _this.callback2 = null;
        _this.blockType = null;
        return _this;
    }
    PushChange.prototype.onLoad = function () {
        if (lplatform.channel == PlatformA_1.CHANNEL.qq && lplatform.labData.changePosition &&
            lplatform.labData.changePosition == 1 && Math.random() > 0.5) {
            Utils_1.default.exchangePosition(this.btn_change, this.btnCloseQQ);
        }
        if (lplatform.channel == PlatformA_1.CHANNEL.oppo && lplatform.labData.changePosition &&
            lplatform.labData.changePosition == 1 && Math.random() > 0.5) {
            Utils_1.default.exchangePosition(this.btn_change, this.btn_lookAD);
        }
    };
    PushChange.prototype.start = function () {
        EventManager_1.default.instance.EventInterstitial();
    };
    PushChange.prototype.initial = function (e, t) {
        this.callback = e;
        this.callback2 = t;
    };
    PushChange.prototype.onClickChange = function () {
        var _this = this;
        if (lplatform.channel == PlatformA_1.CHANNEL.oppo || lplatform.channel == PlatformA_1.CHANNEL.vivo) {
            this.videoFinish();
        }
        else {
            EventManager_1.default.instance.showRewardedVideo(function () {
                return _this.videoFinish();
            });
        }
    };
    PushChange.prototype.videoFinish = function () {
        if (this.callback) {
            this.callback(this.blockType);
        }
        this.clean();
    };
    PushChange.prototype.onClickLookAD = function () {
        if (window.ClickAdCallback != null) {
            window.ClickAdCallback();
        }
    };
    PushChange.prototype.onClickClose = function () {
        if (this.callback2) {
            this.callback2();
        }
        this.clean();
    };
    PushChange.prototype.clean = function () {
        Common_1.default.instance.pushChangeTime();
        GameData_1.GameData.pushChange_Time = Property_1.Property.PUSH_TIME;
        GameData_1.GameData.pushChangeCount--;
        GameData_1.GameData.resume();
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], PushChange.prototype, "btnCloseQQ", void 0);
    __decorate([
        property(cc.Node)
    ], PushChange.prototype, "btn_lookAD", void 0);
    __decorate([
        property(cc.Node)
    ], PushChange.prototype, "btn_change", void 0);
    PushChange = __decorate([
        ccclass
    ], PushChange);
    return PushChange;
}(ExtendScript_1.default));
exports.default = PushChange;

cc._RF.pop();