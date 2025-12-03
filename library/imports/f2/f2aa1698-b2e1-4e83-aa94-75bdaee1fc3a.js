"use strict";
cc._RF.push(module, 'f2aa1aYsuFOg6qUdb2u4fw6', 'GetBoxGiftItem');
// Scripts/GetBoxGiftItem.ts

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
var event_listener_1 = require("./event_listener");
var Property_1 = require("./Property");
var GetBoxGiftItem = /** @class */ (function (_super) {
    __extends(GetBoxGiftItem, _super);
    function GetBoxGiftItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_freebtn = null;
        _this.m_n_sharebtn = null;
        _this.m_n_box = null;
        _this._onshowback = false;
        _this._callback = null;
        return _this;
    }
    GetBoxGiftItem.prototype.start = function () {
        event_listener_1.default.instance.on(window.ON_SHOW_BACK, this.onshowback, this);
    };
    GetBoxGiftItem.prototype.showView = function (callback) {
        this._callback = callback;
        this.m_n_freebtn.active = !window.BOX_SHARE;
        this.m_n_sharebtn.active = window.BOX_SHARE;
        this.m_n_box.runAction(cc.sequence(cc.repeat(cc.sequence(cc.rotateTo(.1, -10), cc.rotateTo(.1, 10)), 3), cc.rotateTo(.1, 0)));
    };
    GetBoxGiftItem.prototype.onDestroy = function () {
        event_listener_1.default.instance.off(window.ON_SHOW_BACK, this);
    };
    GetBoxGiftItem.prototype.onshowback = function (time) {
        if (this._onshowback) {
            if (time >= window.SHARE_TIME) {
                this.onFreeGet();
            }
            else {
                r.default.showShareFailTips();
            }
            this._onshowback = false;
        }
    };
    GetBoxGiftItem.prototype.onClose = function () {
        if (this._callback) {
            this._callback();
            this._callback = null;
        }
        this.node.active = false;
    };
    GetBoxGiftItem.prototype.onFreeGet = function () {
        var self = this;
        lplatform.showRanRewardedVideo(function () {
            var items = [1, 20];
            var index = a.random(0, 1500) > 750 ? 0 : 1;
            a.showGetItem(items[index], index, null, 0, 0);
            if (index === 0) {
                window.INIT_GAME_SAVE_DATA.tool[0] += items[index];
            }
            else {
                window.INIT_GAME_SAVE_DATA.gold_num += items[index];
            }
            if (Property_1.Property.GAME_CONTROL) {
                Property_1.Property.GAME_CONTROL.BoxReward(index);
            }
            self.onClose();
        });
    };
    GetBoxGiftItem.prototype.onShareGet = function () {
        this._onshowback = true;
        s.shareAppMessage({
            title: "我就看着你，直到你打开宝箱为止",
            imageUrl: window.tempFileURL[3]
        });
    };
    __decorate([
        property(cc.Node)
    ], GetBoxGiftItem.prototype, "m_n_freebtn", void 0);
    __decorate([
        property(cc.Node)
    ], GetBoxGiftItem.prototype, "m_n_sharebtn", void 0);
    __decorate([
        property(cc.Node)
    ], GetBoxGiftItem.prototype, "m_n_box", void 0);
    GetBoxGiftItem = __decorate([
        ccclass
    ], GetBoxGiftItem);
    return GetBoxGiftItem;
}(cc.Component));
exports.default = GetBoxGiftItem;

cc._RF.pop();