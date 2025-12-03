"use strict";
cc._RF.push(module, '0935d3f0tJMZqfvBa6Hr4Dq', 'PlatformCom');
// Scripts/PlatformCom.ts

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
var PlatformCom = /** @class */ (function (_super) {
    __extends(PlatformCom, _super);
    function PlatformCom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_callbackobj = null;
        _this.m_rqcode = null;
        _this.m_tips = null;
        return _this;
    }
    PlatformCom.prototype.onLoad = function () {
        this.node.zIndex = 100;
        cc.view.getVisibleSize();
        this.m_callbackobj = null;
    };
    PlatformCom.prototype.start = function () { };
    PlatformCom.prototype.onImageBtnClick = function () { };
    PlatformCom.prototype.onSaveImageBtnClick = function () {
        var _this = this;
        if (window.isWeChatPlatform) {
            wx.saveImageToPhotosAlbum({
                filePath: cc.url.raw("resources/common/saveImage.d2e1c.jpg"),
                success: function () {
                    _this.showTipsView("二维码已保存成功");
                },
                fail: function () {
                    wx.openSetting({
                        authSetting: "scope.writePhotosAlbum",
                        success: function () { },
                        fail: function () { }
                    });
                }
            });
        }
    };
    PlatformCom.prototype.onCloseBtnClick = function () {
        if (this.m_rqcode) {
            this.m_rqcode.active = false;
        }
    };
    PlatformCom.prototype.hideTipsView = function () {
        if (this.m_tips) {
            var tipsTex = this.m_tips.getChildByName("TipsTex");
            if (tipsTex) {
                var label = tipsTex.getComponent(cc.Label);
                if (label) {
                    label.string = "";
                }
            }
            this.m_tips.active = false;
        }
    };
    PlatformCom.prototype.showTipsView = function (text) {
        if (this.m_tips) {
            var tipsTex = this.m_tips.getChildByName("TipsTex");
            if (tipsTex) {
                var label = tipsTex.getComponent(cc.Label);
                if (label) {
                    label.string = text;
                }
            }
            this.m_tips.active = true;
        }
    };
    PlatformCom = __decorate([
        ccclass
    ], PlatformCom);
    return PlatformCom;
}(cc.Component));
exports.default = PlatformCom;

cc._RF.pop();