"use strict";
cc._RF.push(module, '4eb947ZHVNEdalxxTc7Y5Wy', 'NewBieGift');
// Scripts/NewBieGift.ts

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
var event_listener_1 = require("./event_listener");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewBieGift = /** @class */ (function (_super) {
    __extends(NewBieGift, _super);
    function NewBieGift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_newpanel = null;
        _this.m_n_newpanel_success = null;
        _this.m_btn_getreward = null;
        _this.m_l_desc = null;
        _this._onshowback = false;
        return _this;
    }
    NewBieGift.prototype.start = function () {
        this.m_n_newpanel.active = false;
        this.m_n_newpanel_success.active = false;
        event_listener_1.default.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
        this.updateData();
    };
    NewBieGift.prototype.onEnable = function () { };
    NewBieGift.prototype.onDisable = function () { };
    NewBieGift.prototype.onDestroy = function () {
        event_listener_1.default.instance.off(window.ON_SHOW_BACK, this);
    };
    NewBieGift.prototype.onshowback = function () {
        if (this._onshowback) {
            this._onshowback = false;
            if (this.m_n_newpanel_success.active) {
                this.m_n_newpanel_success.active = false;
            }
        }
    };
    NewBieGift.prototype.autoShowRewardPage = function () {
        if (this.getState() === 1) {
            if (!window.firststart) {
                this.onBtnNewBieClick();
                window.firststart = true;
            }
        }
    };
    NewBieGift.prototype.getState = function () {
        var state = 1;
        var loginTime = window.INIT_GAME_SAVE_DATA.login_time;
        if (loginTime && loginTime !== "null" && loginTime !== "") {
            var loginDate = loginTime.split("/");
            var currentDateInfo = this.getCurrentDate();
            var currentDate = currentDateInfo[1];
            state = this.judgeTime(loginDate, currentDate);
        }
        return state;
    };
    NewBieGift.prototype.getCurrentDate = function () {
        var now = new Date();
        var dateStr = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
        var dateArr = dateStr.split("/");
        return [dateStr, dateArr];
    };
    NewBieGift.prototype.judgeTime = function (loginDate, currentDate) {
        var loginYear = parseInt(loginDate[0]);
        var currentYear = parseInt(currentDate[0]);
        if (loginYear < currentYear)
            return 1;
        if (loginYear > currentYear)
            return -1;
        var loginMonth = parseInt(loginDate[1]);
        var currentMonth = parseInt(currentDate[1]);
        if (loginMonth < currentMonth)
            return 1;
        if (loginMonth > currentMonth)
            return -1;
        var loginDay = parseInt(loginDate[2]);
        var currentDay = parseInt(currentDate[2]);
        var result = 0;
        if (loginDay < currentDay) {
            result = 1;
        }
        else if (loginDay > currentDay) {
            result = -1;
        }
        return result;
    };
    NewBieGift.prototype.updateData = function () {
        this.autoShowRewardPage();
        if (this.getState() === 1) {
            this.m_btn_getreward.interactable = true;
            this.m_l_desc.string = "每天可领一次";
        }
        else {
            this.m_btn_getreward.interactable = false;
            var btnLabel = this.m_btn_getreward.node.getComponent(cc.Label);
            if (btnLabel) {
                btnLabel.string = "明天再来吧~";
            }
            this.m_l_desc.string = "每天可领一次(已领取)";
        }
    };
    NewBieGift.prototype.onBtnNewBieClick = function () {
        var Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        this.m_n_newpanel.active = true;
        if (this.getState() === 1) {
            this.m_btn_getreward.interactable = true;
            this.m_l_desc.string = "每天可领一次";
        }
        else {
            this.m_btn_getreward.interactable = false;
            var btnLabel = this.m_btn_getreward.node.getComponent(cc.Label);
            if (btnLabel) {
                btnLabel.string = "明天再来吧~";
            }
            this.m_l_desc.string = "每天可领一次(已领取)";
        }
    };
    NewBieGift.prototype.onBackBtnClick = function () {
        var Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        this.m_n_newpanel.active = false;
        this.m_n_newpanel_success.active = false;
    };
    NewBieGift.prototype.onRewardBackBtnClick = function () {
        var Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        this.m_n_newpanel.active = false;
        this.m_n_newpanel_success.active = false;
    };
    NewBieGift.prototype.onBtnGetRewardClick = function () {
        var Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        this.m_n_newpanel.active = false;
        this.m_n_newpanel_success.active = true;
        var currentDate = this.getCurrentDate()[0];
        this._onshowback = true;
        window.INIT_GAME_SAVE_DATA.login_time = currentDate;
        window.INIT_GAME_SAVE_DATA.tool[0] += 1;
        window.INIT_GAME_SAVE_DATA.gold_num += 10;
        this.updateData();
        if (window.GAME_MENU) {
            window.GAME_MENU.updateGold();
        }
    };
    NewBieGift.prototype.onShareBtnClick = function () {
        var Utils3 = cc.js.getClassByName("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        var ShareSdk = cc.js.getClassByName("ShareSdk");
        var self = this;
        ShareSdk.shareAppMessage({
            title: "炸弹，金币每天领，快来领取吧",
            imageUrl: window.tempFileURL[0],
            success: function () {
                //self.m_n_sharenode.active = true;
            },
            fail: function () { },
            complete: function () { }
        });
    };
    __decorate([
        property(cc.Node)
    ], NewBieGift.prototype, "m_n_newpanel", void 0);
    __decorate([
        property(cc.Node)
    ], NewBieGift.prototype, "m_n_newpanel_success", void 0);
    __decorate([
        property(cc.Button)
    ], NewBieGift.prototype, "m_btn_getreward", void 0);
    __decorate([
        property(cc.Label)
    ], NewBieGift.prototype, "m_l_desc", void 0);
    NewBieGift = __decorate([
        ccclass
    ], NewBieGift);
    return NewBieGift;
}(cc.Component));
exports.default = NewBieGift;

cc._RF.pop();