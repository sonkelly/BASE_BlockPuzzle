"use strict";
cc._RF.push(module, '56527iAe1RAq4Gxqpm4D7RI', 'ReliveViewCtrl');
// Scripts/ReliveViewCtrl.ts

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
var GameData_1 = require("./GameData");
var ReliveViewCtrl = /** @class */ (function (_super) {
    __extends(ReliveViewCtrl, _super);
    function ReliveViewCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Score = null;
        _this.TimeTex = null;
        _this.m_cost_numlabel = null;
        _this.TimeNum = null;
        _this.skipBtn = null;
        _this.m_cost_pic = null;
        _this.m_bg = null;
        _this.m_share_relive = null;
        _this.m_btn_share = null;
        _this.m_sp_all_gold = null;
        _this.m_l_all_gold = null;
        _this.timeOut = false;
        _this.m_cost_num = 0;
        _this.callbackobj = null;
        return _this;
    }
    ReliveViewCtrl.prototype.start = function () {
        this.node.zIndex = 100;
        this.TimeNum = 10;
        this.TimeTex.string = this.TimeNum.toString();
        this.timeOut = false;
        this.m_cost_num = window['RELIVE_COST_NUM'];
        var winSize = cc.winSize;
        this.m_bg.width = winSize.width;
        this.m_bg.height = winSize.height;
        var self = this;
        GameData_1.GameBundle[3].load("GameRes3/" + window['RELIVE_COST_PIC_PATH'], cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
            }
            else {
                self.m_cost_pic.spriteFrame = spriteFrame;
                self.m_sp_all_gold.spriteFrame = spriteFrame;
            }
        });
        this.m_cost_numlabel.string = "x" + window['RELIVE_COST_NUM'];
        this.m_l_all_gold.string = ":" + window['INIT_GAME_SAVE_DATA'].gold_num;
        if (window['isWeChatPlatform']) {
            this.setShareReliveShow(window['SHARE_RELIVE']);
        }
    };
    ReliveViewCtrl.prototype.setShareReliveShow = function (show) {
        this.m_share_relive.active = show !== 0;
    };
    ReliveViewCtrl.prototype.setCallBackObj = function (obj) {
        this.callbackobj = obj;
    };
    ReliveViewCtrl.prototype.ShowView = function (show) {
        this.node.active = show;
        if (show === true && this.callbackobj && this.callbackobj.shareObj) {
            if (this.callbackobj.shareObj.is_share_relive) {
                this.m_btn_share.interactable = false;
            }
            else {
                this.m_btn_share.interactable = true;
            }
        }
        if (show === false) {
            this.node.destroy();
        }
    };
    ReliveViewCtrl.prototype.CountDownClick = function (time) {
        this.schedule(this.DeleteTimeNum.bind(this), 1, time, 0, true);
    };
    ReliveViewCtrl.prototype.DeleteTimeNum = function () {
        this.TimeNum -= 1;
        this.TimeTex.string = this.TimeNum.toString();
        if (this.TimeNum <= -1) {
            this.TimeTex.string = "0";
            this.ShowView(false);
            if (this.callbackobj != null) {
                this.callbackobj.onSkipCallBack();
            }
        }
    };
    ReliveViewCtrl.prototype.CoinBtnClick = function () {
        if (this.callbackobj != null && this.callbackobj.onCostRelive(this.m_cost_num)) {
            this.ShowView(false);
        }
    };
    ReliveViewCtrl.prototype.setScoreLabel = function (score) {
        this.Score.string = score.toString();
    };
    ReliveViewCtrl.prototype.setCostNumLabel = function (num) {
        this.m_cost_numlabel.string = "x" + num;
        this.m_cost_num = parseInt(num.toString());
    };
    ReliveViewCtrl.prototype.ShareBtnClick = function () {
        this.unschedule(this.DeleteTimeNum.bind(this));
    };
    ReliveViewCtrl.prototype.cancelBtnClick = function () {
        this.unschedule(this.DeleteTimeNum.bind(this));
        this.ShowView(false);
        if (this.callbackobj != null) {
            this.callbackobj.onSkipCallBack();
        }
    };
    __decorate([
        property(cc.Label)
    ], ReliveViewCtrl.prototype, "Score", void 0);
    __decorate([
        property(cc.Label)
    ], ReliveViewCtrl.prototype, "TimeTex", void 0);
    __decorate([
        property(cc.Label)
    ], ReliveViewCtrl.prototype, "m_cost_numlabel", void 0);
    __decorate([
        property
    ], ReliveViewCtrl.prototype, "TimeNum", void 0);
    __decorate([
        property(cc.Node)
    ], ReliveViewCtrl.prototype, "skipBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], ReliveViewCtrl.prototype, "m_cost_pic", void 0);
    __decorate([
        property(cc.Node)
    ], ReliveViewCtrl.prototype, "m_bg", void 0);
    __decorate([
        property(cc.Node)
    ], ReliveViewCtrl.prototype, "m_share_relive", void 0);
    __decorate([
        property(cc.Button)
    ], ReliveViewCtrl.prototype, "m_btn_share", void 0);
    __decorate([
        property(cc.Sprite)
    ], ReliveViewCtrl.prototype, "m_sp_all_gold", void 0);
    __decorate([
        property(cc.Label)
    ], ReliveViewCtrl.prototype, "m_l_all_gold", void 0);
    ReliveViewCtrl = __decorate([
        ccclass
    ], ReliveViewCtrl);
    return ReliveViewCtrl;
}(cc.Component));
exports.default = ReliveViewCtrl;

cc._RF.pop();