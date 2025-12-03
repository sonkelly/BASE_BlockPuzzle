"use strict";
cc._RF.push(module, 'f479a3g3OZPVqZyV1ymmuWc', 'Wxlife');
// Scripts/Wxlife.ts

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
var Utils3_1 = require("./Utils3");
var Wxlife = /** @class */ (function (_super) {
    __extends(Wxlife, _super);
    function Wxlife() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isHidden = false;
        _this.hideTime = 0;
        return _this;
    }
    Wxlife_1 = Wxlife;
    Object.defineProperty(Wxlife, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    Wxlife.prototype.onLoad = function () {
        if (Wxlife_1._instance === null) {
            Wxlife_1._instance = this;
        }
        else {
            this.destroy();
            return;
        }
        cc.view.enableRetina(true);
        // 初始化全局变量
        window['firstGame'] = true;
        window['firststart'] = false;
        window['getdata'] = false;
        window['need_add'] = false;
        window['firstshare'] = false;
        window['SHOW_RES'] = null;
        // 初始化事件监听器
        this.initWxEvents();
    };
    Wxlife.prototype.initWxEvents = function () {
        var _this = this;
        if (typeof wx !== 'undefined') {
            // 微信隐藏事件
            wx.onHide(function () {
                _this.isHidden = true;
                if (window['getdata']) {
                    Utils3_1.Utils3.setSaveData();
                }
                _this.hideTime = new Date().getTime();
            });
            // 微信显示事件
            wx.onShow(function (res) {
                if (_this.isHidden) {
                    Utils3_1.Utils3.resumBgmMusic();
                    var currentTime = new Date().getTime();
                    event_listener_1.default.instance.fire(window['ON_SHOW_BACK'], currentTime - _this.hideTime);
                }
                if (res.query && res.query.group) {
                    window['SHOW_RES'] = res;
                    event_listener_1.default.instance.fire(window['GAME_RANK_LISTENER']);
                }
            });
        }
    };
    Wxlife.prototype.onDestroy = function () {
        if (Wxlife_1._instance === this) {
            Wxlife_1._instance = null;
        }
    };
    var Wxlife_1;
    Wxlife._instance = null;
    Wxlife = Wxlife_1 = __decorate([
        ccclass
    ], Wxlife);
    return Wxlife;
}(cc.Component));
exports.default = Wxlife;

cc._RF.pop();