"use strict";
cc._RF.push(module, 'd74e54hOHdA2oOb9WNU+2HS', 'SkinItem');
// Scripts/SkinItem.ts

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
var SkinItem = /** @class */ (function (_super) {
    __extends(SkinItem, _super);
    function SkinItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_l_goldlabel = null;
        _this.m_sp_blockstyle = null;
        _this.m_n_isready = null;
        _this.m_btn_suitup = null;
        _this.m_l_sharetext = null;
        _this._data = null;
        _this._state = 0;
        _this._index = 0;
        _this._onshowback = false;
        return _this;
    }
    SkinItem.prototype.start = function () {
        event_listener_1.default.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
    };
    SkinItem.prototype.onDestroy = function () {
        event_listener_1.default.instance.off(window.ON_SHOW_BACK, this);
    };
    SkinItem.prototype.updateData = function (index, data, spriteFrame) {
        this._index = index;
        this._data = data;
        var skinData = window.INIT_GAME_SAVE_DATA.skin[index];
        this._state = skinData || 0;
        this.m_sp_blockstyle.spriteFrame = spriteFrame;
        this.m_n_isready.active = this._state >= 2;
        this.m_btn_suitup.node.active = this._state < 2;
        this.m_l_goldlabel.string = data.price.toString();
        if (this._state === 0) {
            if (data.way === 1 && window.SKIN_SHARE) {
                this.m_l_sharetext.node.active = true;
                this.m_l_goldlabel.node.parent.active = false;
                this.m_btn_suitup.interactable = true;
            }
            else {
                this.m_l_sharetext.node.active = false;
                this.m_l_goldlabel.node.parent.active = true;
                this.m_btn_suitup.interactable = window.INIT_GAME_SAVE_DATA.gold_num >= data.price;
            }
            this.m_btn_suitup.node.y = -145;
        }
        else if (this._state === 1) {
            this.m_l_sharetext.node.active = false;
            this.m_l_goldlabel.node.parent.active = false;
            this.m_btn_suitup.interactable = true;
            this.m_btn_suitup.node.y = -74;
        }
        else {
            this.m_l_sharetext.node.active = false;
            this.m_l_goldlabel.node.parent.active = false;
        }
    };
    SkinItem.prototype.onshowback = function (count) {
        if (this._onshowback) {
            if (count >= window.SHARE_TIME) {
                this.onSuitUp();
            }
            else {
                // Assuming Common_CommonUtil is imported as CommonUtil
                CommonUtil.showShareFailTips();
            }
            this._onshowback = false;
        }
    };
    SkinItem.prototype.onSuitUp = function () {
        if (!this.m_btn_suitup.interactable)
            return;
        var skinData = window.INIT_GAME_SAVE_DATA.skin;
        for (var i = 0; i < skinData.length; i++) {
            if (skinData[i] === 2) {
                skinData[i] = 1;
                skinData[this._index] = 2;
                break;
            }
        }
        if (this._state === 0) {
            if (this._data.way !== 0 && window.SKIN_SHARE) {
                this._onshowback = true;
                // Assuming ShareSdk is imported
                ShareSdk.shareAppMessage({
                    title: "获得了一个怪兽皮肤，快来看看吧",
                    imageUrl: window.tempFileURL[1]
                });
            }
            else {
                window.INIT_GAME_SAVE_DATA.gold_num -= this._data.price;
                event_listener_1.default.instance.fire(window.GAME_UPDATE_DATA);
            }
        }
        event_listener_1.default.instance.fire(window.GAME_SAVE_HANDLER);
    };
    __decorate([
        property(cc.Label)
    ], SkinItem.prototype, "m_l_goldlabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], SkinItem.prototype, "m_sp_blockstyle", void 0);
    __decorate([
        property(cc.Node)
    ], SkinItem.prototype, "m_n_isready", void 0);
    __decorate([
        property(cc.Button)
    ], SkinItem.prototype, "m_btn_suitup", void 0);
    __decorate([
        property(cc.Label)
    ], SkinItem.prototype, "m_l_sharetext", void 0);
    SkinItem = __decorate([
        ccclass
    ], SkinItem);
    return SkinItem;
}(cc.Component));
exports.default = SkinItem;

cc._RF.pop();