"use strict";
cc._RF.push(module, '98087v2kYlB44snSwwKNeP9', 'StepViewItem');
// Scripts/StepViewItem.ts

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
var ConstValue_1 = require("./ConstValue");
var event_listener_1 = require("./event_listener");
var StepViewItem = /** @class */ (function (_super) {
    __extends(StepViewItem, _super);
    function StepViewItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_sp_stepicon = null;
        _this.m_sp_stepname = null;
        _this.m_n_starlist = [];
        _this.m_n_bg = null;
        _this.m_l_steptitle = null;
        _this.m_spa_list = null;
        _this._callback = null;
        _this._stepname = "";
        _this._onshowback = false;
        return _this;
    }
    StepViewItem.prototype.start = function () {
        event_listener_1.default.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
    };
    StepViewItem.prototype.onDestroy = function () {
        event_listener_1.default.instance.off(window.ON_SHOW_BACK, this);
    };
    StepViewItem.prototype.setCloseCallback = function (callback) {
        this._callback = callback;
    };
    StepViewItem.prototype.onClose = function () {
        this._callback && this._callback();
        this.node.active = false;
    };
    StepViewItem.prototype.onshowback = function () {
        if (this._onshowback) {
            this._onshowback = false;
            this.onClose();
        }
    };
    StepViewItem.prototype.showStep = function (step) {
        var _this = this;
        var starCount = this.updateData(step);
        for (var i = 0; i < this.m_n_starlist.length; i++) {
            this.m_n_starlist[i].active = false;
        }
        this.m_sp_stepicon.node.getComponent(cc.Animation).play("playstep");
        this.m_sp_stepname.node.getComponent(cc.Animation).play("playstep");
        this.scheduleOnce(function () {
            Common_CommonUtil.default.shakeScreen(_this.m_n_bg);
        }, 0.4);
        var showStar = function (index) {
            _this.m_n_starlist[index].active = true;
            _this.m_n_starlist[index].scale = 0;
            _this.scheduleOnce(function () {
                _this.m_n_starlist[index].runAction(cc.sequence(cc.scaleTo(0.2, 1.4, 1.4).easing(cc.easeIn(3)), cc.scaleTo(0.1, 1, 1)));
                Utils3.SetSoundEffect(window.GET_GOLD, false, 1);
            }, 0.54 + 0.3 * (index + 1));
        };
        for (var i = 0; i < starCount; i++) {
            showStar(i);
        }
    };
    StepViewItem.prototype.updateData = function (step) {
        if (step === void 0) { step = 0; }
        var level = Math.floor(step / 10);
        var stepConfig = ConstValue_1.default.STEP_CONFIG[level - 1];
        var starCount = 0;
        if (stepConfig) {
            starCount = stepConfig.star;
            this._stepname = stepConfig.desc;
            this.m_l_steptitle.string = cc.js.formatStr("完成%d关 段位提升", step);
            this.m_sp_stepicon.spriteFrame = this.m_spa_list.getSpriteFrame(stepConfig.icon_path);
            this.m_sp_stepname.spriteFrame = this.m_spa_list.getSpriteFrame(stepConfig.desc_path);
        }
        return starCount;
    };
    StepViewItem.prototype.setShowBtnVisible = function (visible) {
        for (var i = 0; i < this.m_n_starlist.length; i++) {
            this.m_n_starlist[i].active = visible;
        }
        this.m_sp_stepicon.node.active = visible;
        this.m_sp_stepname.node.active = visible;
    };
    StepViewItem.prototype.onShareStep = function () {
        this._onshowback = true;
        ShareSdk.shareAppMessage({
            title: "\u6D88\u9664\u6BB5\u4F4D\u5347\u7EA7\u5230\u3010" + this._stepname + "\u3011,\u4E00\u8D77\u6765\u89C1\u8BC1\u5427",
            imageUrl: window.tempFileURL[1]
        });
    };
    __decorate([
        property(cc.Sprite)
    ], StepViewItem.prototype, "m_sp_stepicon", void 0);
    __decorate([
        property(cc.Sprite)
    ], StepViewItem.prototype, "m_sp_stepname", void 0);
    __decorate([
        property([cc.Node])
    ], StepViewItem.prototype, "m_n_starlist", void 0);
    __decorate([
        property(cc.Node)
    ], StepViewItem.prototype, "m_n_bg", void 0);
    __decorate([
        property(cc.Label)
    ], StepViewItem.prototype, "m_l_steptitle", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], StepViewItem.prototype, "m_spa_list", void 0);
    StepViewItem = __decorate([
        ccclass
    ], StepViewItem);
    return StepViewItem;
}(cc.Component));
exports.default = StepViewItem;

cc._RF.pop();