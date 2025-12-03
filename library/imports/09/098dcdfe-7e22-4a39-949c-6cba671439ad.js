"use strict";
cc._RF.push(module, '098dc3+fiJKOZScbLpnFDmt', 'GuideManager');
// Scripts/GuideManager.ts

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
var Property_1 = require("./Property");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuideManager = /** @class */ (function (_super) {
    __extends(GuideManager, _super);
    function GuideManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_mask = null;
        _this.m_n_guide_circle = null;
        _this.m_n_bubble1 = null;
        _this.m_n_bubble2 = null;
        _this.m_n_confirm = null;
        _this.m_sp_maskbg = null;
        _this.m_cur_tag = 0;
        _this.m_cur_index = 0;
        _this._guide_data = null;
        _this._confirm = false;
        return _this;
    }
    GuideManager.prototype.start = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    };
    GuideManager.prototype.showGuide = function (t, e) {
        if (window.GUIDE_LEVEL >= t)
            return;
        this.m_cur_tag = t;
        this.m_cur_index = e;
        if (!window.CONFIG_GUIDE[t][e]) {
            this.node.active = false;
            window.GUIDE_LEVEL += 1;
            cc.sys.localStorage.setItem("guideinfo", "" + window.GUIDE_LEVEL);
            return;
        }
        this._guide_data = window.CONFIG_GUIDE[t][e];
        this.setGuideInfo(this._guide_data);
        if (!this.node.active) {
            this.node.active = true;
        }
    };
    GuideManager.prototype.touchStart = function (t) {
        if (this._guide_data.type === 2) {
            t.stopPropagation();
            return;
        }
        if (!Property_1.Property.GAME_CONTROL) {
            this.node.active = false;
            return;
        }
        var e = t.touch.getLocation();
        if (Property_1.Property.GAME_CONTROL.getTouchIndex(e) !== this._guide_data.target) {
            this._confirm = false;
            t.stopPropagation();
            return;
        }
        this._confirm = true;
    };
    GuideManager.prototype.touchEnd = function () {
        if (this._guide_data.type !== 2 && this._confirm) {
            this.showNextGuide();
        }
        this._confirm = false;
    };
    GuideManager.prototype.showNextGuide = function () {
        var _this = this;
        this._guide_data.target = -2;
        this._guide_data.type = -1;
        setTimeout(function () {
            _this.m_cur_index += 1;
            _this.showGuide(_this.m_cur_tag, _this.m_cur_index);
        }, window.CONFIG_GUIDE[this.m_cur_tag][this.m_cur_index].delaytime);
    };
    GuideManager.prototype.onConfirmClick = function () {
        var Utils3 = cc.find("Utils3").getComponent("Utils3");
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        this.showNextGuide();
    };
    GuideManager.prototype.setGuideInfo = function (t) {
        this.m_n_bubble1.active = t.dir === 1;
        this.m_n_bubble2.active = t.dir === 2;
        var e = t.dir === 1 ? this.m_n_bubble1 : this.m_n_bubble2;
        var i = cc.find("l_guide_desc", e);
        var n = t.dir === 1 ? -1 : 1;
        i.width = t.descsize[0];
        i.height = t.descsize[1];
        i.getComponent(cc.Label).string = t.desc;
        e.width = t.descsize[0] + 100;
        e.height = t.descsize[1] + 50;
        cc.find("sp_mon", e).y = e.height / 2;
        if (typeof t.target === "string") {
            var o = cc.find(t.target);
            this.m_n_mask.position = o.position;
            this.m_n_mask.width = o.width + 10;
            this.m_n_mask.height = o.height + 10;
            e.x = this.m_n_mask.x + n * this.m_n_mask.width / 2;
            e.y = this.m_n_mask.y + this.m_n_mask.height / 2 + t.offsetY;
            this.m_n_guide_circle.width = this.m_n_mask.width + 30;
            this.m_n_guide_circle.height = this.m_n_mask.height + 30;
            this.m_n_guide_circle.getComponent(cc.Animation).play();
            this.m_n_guide_circle.position = this.m_n_mask.position;
            this.m_sp_maskbg.x = -this.m_n_mask.x;
            this.m_sp_maskbg.y = -this.m_n_mask.y;
        }
        else if (typeof t.target === "number") {
            if (t.target === -1) {
                this.m_n_mask.width = 0;
                this.m_n_mask.height = 0;
                this.m_n_guide_circle.width = 0;
                e.y = 0;
                e.x = 0;
            }
            else if (Property_1.Property.GAME_CONTROL) {
                var c = Property_1.Property.GAME_CONTROL.getTargetGridInfo(t.target);
                this.m_n_mask.position = c.position;
                this.m_n_mask.width = c.width + 10;
                this.m_n_mask.height = c.height + 10;
                e.x = this.m_n_mask.x + n * this.m_n_mask.width / 2;
                e.y = this.m_n_mask.y + this.m_n_mask.height / 2 + t.offsetY;
                this.m_n_guide_circle.width = this.m_n_mask.width + 30;
                this.m_n_guide_circle.height = this.m_n_mask.height + 30;
                this.m_n_guide_circle.getComponent(cc.Animation).play();
                this.m_n_guide_circle.position = this.m_n_mask.position;
                this.m_sp_maskbg.x = -this.m_n_mask.x;
                this.m_sp_maskbg.y = -this.m_n_mask.y;
            }
        }
        if (t.type === 2) {
            this.m_n_confirm.active = true;
            this.m_n_confirm.x = e.x + n * e.width / 2;
            this.m_n_confirm.y = e.y - 40;
        }
        else {
            this.m_n_confirm.active = false;
        }
    };
    __decorate([
        property(cc.Node)
    ], GuideManager.prototype, "m_n_mask", void 0);
    __decorate([
        property(cc.Node)
    ], GuideManager.prototype, "m_n_guide_circle", void 0);
    __decorate([
        property(cc.Node)
    ], GuideManager.prototype, "m_n_bubble1", void 0);
    __decorate([
        property(cc.Node)
    ], GuideManager.prototype, "m_n_bubble2", void 0);
    __decorate([
        property(cc.Node)
    ], GuideManager.prototype, "m_n_confirm", void 0);
    __decorate([
        property(cc.Node)
    ], GuideManager.prototype, "m_sp_maskbg", void 0);
    GuideManager = __decorate([
        ccclass
    ], GuideManager);
    return GuideManager;
}(cc.Component));
exports.default = GuideManager;

cc._RF.pop();