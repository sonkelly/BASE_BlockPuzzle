"use strict";
cc._RF.push(module, '4331aGu3B9FkI7NeB1mnxse', 'UseToolItem');
// Scripts/UseToolItem.ts

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
var Property_1 = require("./Property");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UseToolItem = /** @class */ (function (_super) {
    __extends(UseToolItem, _super);
    function UseToolItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_sp_tool = null;
        _this.m_n_get = null;
        _this._tag = 0;
        _this.m_sp_desclist = [];
        _this.m_n_shareget = null;
        _this._onshowback = false;
        _this.m_videoAd = null;
        return _this;
    }
    UseToolItem.prototype.start = function () {
        event_listener_1.default.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
        this.m_n_shareget.active = window.BOX_SHARE && !window.firstshare;
    };
    UseToolItem.prototype.initToolInfo = function (tag, e) {
        this._tag = tag;
        this.m_n_get.active = e <= 0;
    };
    UseToolItem.prototype.onCloseClick = function () {
        this.node.active = false;
    };
    UseToolItem.prototype.onUseClick = function () {
        if (this._tag === 0 || (this._tag === 1 && Property_1.Property.GAME_CONTROL)) {
            Property_1.Property.GAME_CONTROL.onUseStrong();
            this.onCloseClick();
        }
    };
    UseToolItem.prototype.onAdBtnClick = function (t, e) {
        var i = this;
        lplatform.showRanRewardedVideo(function () {
            i.videoReward(e);
        });
    };
    UseToolItem.prototype.videoReward = function () {
        window.INIT_GAME_SAVE_DATA.tool[this._tag] += 1;
        o.showGetItem(1, 0, null, 0, 0);
        if (Property_1.Property.GAME_CONTROL) {
            Property_1.Property.GAME_CONTROL.updateToolsNum();
        }
    };
    UseToolItem.prototype.onshowback = function (t) {
        if (this._onshowback) {
            if (t >= window.SHARE_TIME) {
                window.firstshare = true;
                this.m_n_shareget.active = window.BOX_SHARE && !window.firstshare;
                this.videoReward();
            }
            else {
                n.default.showShareFailTips();
            }
            this._onshowback = false;
        }
    };
    UseToolItem.prototype.onGetClick = function () {
        if (window.INIT_GAME_SAVE_DATA.gold_num >= 20) {
            o.showGetItem(1, 0, null, 0, 0);
            window.INIT_GAME_SAVE_DATA.gold_num -= 20;
            window.INIT_GAME_SAVE_DATA.tool[this._tag] += 1;
            if (Property_1.Property.GAME_CONTROL) {
                Property_1.Property.GAME_CONTROL.updateToolsNum();
            }
        }
        else {
            o.showTipsText("no enough gold", null, 0, 0, 60, cc.Color.WHITE);
        }
    };
    UseToolItem.prototype.onDestroy = function () {
        event_listener_1.default.instance.off(window.ON_SHOW_BACK, this);
        if (this.m_videoAd) {
            this.m_videoAd.destroy();
            this.m_videoAd = null;
        }
    };
    UseToolItem.prototype.onShareGet = function () {
        this._onshowback = true;
        c.shareAppMessage({
            title: "Hold this bomb, it's about to explode! It's about to explode!",
            imageUrl: window.tempFileURL[3]
        });
    };
    __decorate([
        property(cc.Sprite)
    ], UseToolItem.prototype, "m_sp_tool", void 0);
    __decorate([
        property(cc.Node)
    ], UseToolItem.prototype, "m_n_get", void 0);
    __decorate([
        property
    ], UseToolItem.prototype, "_tag", void 0);
    __decorate([
        property([cc.Node])
    ], UseToolItem.prototype, "m_sp_desclist", void 0);
    __decorate([
        property(cc.Node)
    ], UseToolItem.prototype, "m_n_shareget", void 0);
    UseToolItem = __decorate([
        ccclass
    ], UseToolItem);
    return UseToolItem;
}(cc.Component));
exports.default = UseToolItem;

cc._RF.pop();