"use strict";
cc._RF.push(module, 'b834f4pyIFDtbpjsqvuTPpd', 'FitPad');
// Scripts/FitPad.ts

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
var FitPad = /** @class */ (function (_super) {
    __extends(FitPad, _super);
    function FitPad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.channel = "iOS|web";
        _this.cameraBgColor = "#2A1B38";
        _this.camera = null;
        return _this;
    }
    FitPad.prototype.onLoad = function () {
        if (window.lplatform && this.channel.indexOf(lplatform.channel) >= 0) {
            var visibleSize = cc.view.getVisibleSize();
            var minSize = Math.min(visibleSize.width, visibleSize.height);
            var maxSize = Math.max(visibleSize.width, visibleSize.height);
            if (minSize / maxSize > 9 / 16) {
                var canvas = this.node.getComponent(cc.Canvas);
                canvas.fitHeight = true;
                if (this.camera) {
                    this.camera.backgroundColor = this.camera.backgroundColor.fromHEX(this.cameraBgColor);
                }
            }
        }
    };
    FitPad.prototype.start = function () {
        // Start logic here
    };
    __decorate([
        property
    ], FitPad.prototype, "channel", void 0);
    __decorate([
        property
    ], FitPad.prototype, "cameraBgColor", void 0);
    __decorate([
        property(cc.Camera)
    ], FitPad.prototype, "camera", void 0);
    FitPad = __decorate([
        ccclass
    ], FitPad);
    return FitPad;
}(cc.Component));
exports.default = FitPad;

cc._RF.pop();