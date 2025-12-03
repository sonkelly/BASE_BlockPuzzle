"use strict";
cc._RF.push(module, 'ec11clIKQVM6IZvEoLqUvWf', 'kuaiFrame');
// Scripts/kuaiFrame.ts

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
var ExtendScript_1 = require("./ExtendScript");
var AudioManager_1 = require("./AudioManager");
var Property_1 = require("./Property");
var GameData_1 = require("./GameData");
var KuaiFrame = /** @class */ (function (_super) {
    __extends(KuaiFrame, _super);
    function KuaiFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ksf = [];
        _this.ksp = null;
        _this.kOpacity = null;
        _this.isHaveFK = null;
        _this.simulateFK = null;
        _this.index = 0;
        _this.putState = false;
        _this.row = 0;
        _this.col = 0;
        return _this;
    }
    KuaiFrame.prototype.onLoad = function () {
        this.isHaveFK = null;
        this.simulateFK = null;
        this.index = 0;
        this.putState = false;
    };
    KuaiFrame.prototype.initial = function (e) {
        this.row = e.row;
        this.col = e.col;
        this.index = e.index;
        this.node.width = e.wh;
        this.node.height = e.wh;
        this.node.x = -e.fristPos + e.row * e.wh;
        this.node.y = e.fristPos - e.col * e.wh;
    };
    KuaiFrame.prototype.showOpacity = function () {
        if ((Property_1.GameMode == Property_1.MODE.TEACH && GameData_1.GameData.teachingXS < 3) ||
            (Property_1.GameMode == Property_1.MODE.JINGDIAN && GameData_1.GameData.teaching < 3)) {
            return;
        }
        this.kOpacity.active = true;
        this.kOpacity.scale = Property_1.BlockConfig[Property_1.GameMode].wh / Property_1.BlockConfig.normalWH;
    };
    KuaiFrame.prototype.hideOpacity = function () {
        this.kOpacity.active = false;
    };
    KuaiFrame.prototype.showColor = function (e) {
        this.ksp.spriteFrame = this.ksf[e];
        this.ksp.node.opacity = 100;
        this.node.scale = Property_1.BlockConfig[Property_1.GameMode].wh / Property_1.BlockConfig.normalWH;
    };
    KuaiFrame.prototype.hideColor = function () {
        this.ksp.node.opacity = 0;
    };
    KuaiFrame.prototype.revertData = function (e, t) {
        this.isHaveFK = t.isHaveFK;
        this.index = t.index;
        this.putState = t.putState;
        this.simulateFK = t.simulateFK;
        this.row = t.row;
        this.col = t.col;
        var o = cc.instantiate(e);
        o.parent = this.node;
        o.x = t.knData.x;
        o.y = t.knData.y;
        o.scale = t.knData.scale;
        o.zIndex = t.knData.zIndex;
        o.getComponent("block").initial(t.knData.type);
    };
    KuaiFrame.prototype.getInfo = function () {
        return {
            row: this.row,
            col: this.col,
            index: this.index,
            isHaveFK: this.isHaveFK,
            putState: this.putState,
            spFrameType: this.spFrameType,
            simulateFK: this.simulateFK
        };
    };
    KuaiFrame.prototype.onClickSelf = function () {
        var _this = this;
        console.log("行=" + this.row, "列=" + this.col, "序号" + this.index);
        if (GameData_1.GameData.gameDataBind.propButton) {
            var t_1 = cc.instantiate(GameData_1.GameData.gameDataBind.propButton);
            t_1.parent = cc.find("Canvas");
            t_1.removeAllChildren();
            var o = Math.floor(3 * Math.random());
            var n = [cc.v2(0, 0), cc.v2(-360, 360), cc.v2(360, 360)];
            cc.tween(t_1)
                .bezierTo(1, cc.v2(t_1.x, t_1.y), n[o], cc.v2(this.node.x, this.node.y + 137))
                .call(function () {
                t_1.destroy();
                _this.propMoveFinish(GameData_1.GameData.gameDataBind.getIsProp());
            })
                .start();
            GameData_1.GameData.gameDataBind.propButton = null;
        }
    };
    KuaiFrame.prototype.addEffect = function (e, t) {
        var o = cc.instantiate(e == 1 ? Property_1.CommonPrefab.boomPrefab : Property_1.CommonPrefab.rainbowPrefab);
        o.getComponent(ExtendScript_1.default).initial(e, t);
        o.parent = this.node;
    };
    KuaiFrame.prototype.propMoveFinish = function (e) {
        if (GameData_1.GameData.gameDataBind.getIsProp() == 1) {
            this.addEffect(1, cc.v2(this.node.x, this.node.y));
            GameData_1.GameData.propBomb--;
            if (GameData_1.GameData.propBomb < 0) {
                GameData_1.GameData.propBomb = 0;
            }
        }
        else if (GameData_1.GameData.gameDataBind.getIsProp() == 2) {
            this.addEffect(2, cc.v2(this.node.x, this.node.y));
            this.addEffect(3, cc.v2(this.node.x, this.node.y));
            GameData_1.GameData.propRainBow--;
            if (GameData_1.GameData.propRainBow < 0) {
                GameData_1.GameData.propRainBow = 0;
            }
        }
        GameData_1.GameData.saveData();
        GameData_1.GameData.gameDataBind.changePropCount();
        if (e == 1) {
            AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.Bomb);
        }
        else if (e == 2) {
            AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.RainBow);
        }
        var t = [];
        var a = null;
        if (GameData_1.GameData.gameDataBind.getIsProp() == 1) {
            a = Property_1.PROP_BOMB;
        }
        else if (GameData_1.GameData.gameDataBind.getIsProp() == 2) {
            a = Property_1.PROP_RAINBOW;
        }
        if (a != null) {
            for (var r = 0; r < a.length; r++) {
                var s = this.col + a[r].x;
                var c = this.row + a[r].y;
                t[r] = cc.v2(s, c);
            }
            var i = 0;
            for (var l = 0; l < t.length; l++) {
                if (t[l].x < 0 || t[l].x > Property_1.BlockConfig[Property_1.GameMode].row - 1 ||
                    t[l].y < 0 || t[l].y > Property_1.BlockConfig[Property_1.GameMode].col - 1) {
                    continue;
                }
                var d = t[l].x * Property_1.BlockConfig[Property_1.GameMode].row + t[l].y;
                var h = GameData_1.GameData.gameDataBind.boardFrame.frameList[d].getChildByName("kn");
                if (h) {
                    h.getComponent(ExtendScript_1.default).playDragon(h.getComponent(ExtendScript_1.default)._cType, 0);
                    GameData_1.GameData.gameDataBind.boardFrame.frameList[d].getComponent("kuaiFrame").simulateFK = null;
                    GameData_1.GameData.gameDataBind.boardFrame.frameList[d].getComponent("kuaiFrame").isHaveFK = null;
                    i++;
                }
            }
            if (i > 0) {
                GameData_1.GameData.gameDataBind.boardFrame.kkuaiM = {
                    _colorType: 0
                };
                GameData_1.GameData.gameDataBind.boardFrame.checkScore(1, true, cc.v2(0, 0));
                var clientEvent = cc.find("clientEvent").getComponent("clientEvent");
                clientEvent.dispatchEvent("useProp");
            }
            GameData_1.GameData.gameDataBind.setIsProp(0);
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], KuaiFrame.prototype, "ksf", void 0);
    __decorate([
        property(cc.Sprite)
    ], KuaiFrame.prototype, "ksp", void 0);
    __decorate([
        property(cc.Node)
    ], KuaiFrame.prototype, "kOpacity", void 0);
    KuaiFrame = __decorate([
        ccclass
    ], KuaiFrame);
    return KuaiFrame;
}(ExtendScript_1.default));
exports.default = KuaiFrame;

cc._RF.pop();