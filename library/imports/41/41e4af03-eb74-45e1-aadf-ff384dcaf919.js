"use strict";
cc._RF.push(module, '41e4a8D63RF4arf/zhNyvkZ', 'layerReborn');
// Scripts/layerReborn.ts

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
var Property_1 = require("./Property");
var GameData_1 = require("./GameData");
var Utils_1 = require("./Utils");
var clientEvent_1 = require("./clientEvent");
var AudioManager_1 = require("./AudioManager");
var PlatformA_1 = require("./PlatformA");
var EventManager_1 = require("./EventManager");
var Common_1 = require("./Common");
var LayerReborn = /** @class */ (function (_super) {
    __extends(LayerReborn, _super);
    function LayerReborn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rebornTimeSke = null;
        _this.timeAudio = null;
        _this.panel = null;
        _this.btnReborn = null;
        _this.btnRestart = null;
        _this.isShow = true;
        return _this;
    }
    LayerReborn.prototype.onLoad = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.timeAudio.play();
        }, 1);
        Utils_1.default.playAniCall(this.rebornTimeSke, "newAnimation", function () {
            _this.scheduleOnce(function () {
                _this.showLayer();
            }, 0.8);
        });
        Common_1.default.instance.setBestScore();
    };
    LayerReborn.prototype.start = function () {
        EventManager_1.default.instance.EventInterstitial();
        if (lplatform.channel == PlatformA_1.CHANNEL.qq && this.btnReborn.getChildByName("iconAD")) {
            this.btnReborn.getChildByName("iconAD").active = this.isShow;
            this.btnReborn.getComponent(cc.Sprite).enabled = !this.isShow;
        }
    };
    LayerReborn.prototype.onClickRevive = function () {
        var _this = this;
        AudioManager_1.default.instance.playClickSound();
        if (lplatform.channel == PlatformA_1.CHANNEL.tt) {
            this.timeAudio.pause();
            this.rebornTimeSke.timeScale = 0;
            this.panel.getComponent(cc.Animation).pause();
            this.btnReborn.getComponent(cc.Animation).pause();
            this.btnRestart.getComponent(cc.Animation).pause();
        }
        clientEvent_1.default.dispatchEvent("reviveEvent");
        EventManager_1.default.instance.showRewardedVideo(function () {
            _this.timeAudio.resume();
            _this.rebornTimeSke.timeScale = 1;
            _this.panel.getComponent(cc.Animation).resume();
            _this.btnReborn.getComponent(cc.Animation).resume();
            _this.btnRestart.getComponent(cc.Animation).resume();
            _this.clean();
        });
    };
    LayerReborn.prototype.onClickRestart = function () {
        AudioManager_1.default.instance.playClickSound();
        GameData_1.GameData.initialData();
        GameData_1.GameData.blockData = [];
        GameData_1.GameData.curScore = 0;
        if (Property_1.GameMode == Property_1.MODE.TEACH) {
            if (3 == GameData_1.GameData.teachingXS) {
                GameData_1.GameData.teachingXS = 0;
                GameData_1.GameData.saveData();
            }
            Common_1.default.instance.toGame();
            this.clean();
        }
        else {
            Common_1.default.instance.toGame();
            this.clean();
        }
    };
    LayerReborn.prototype.showLayer = function () {
        if (1 == GameData_1.GameData.isGetBestScore) {
            Common_1.default.instance.showEndBestScoreLayer();
        }
        else {
            Common_1.default.instance.showEndScoreLayer();
        }
        this.clean();
    };
    LayerReborn.prototype.clean = function () {
        this.node.destroy();
        this.timeAudio.stop();
    };
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], LayerReborn.prototype, "rebornTimeSke", void 0);
    __decorate([
        property(cc.AudioSource)
    ], LayerReborn.prototype, "timeAudio", void 0);
    __decorate([
        property(cc.Node)
    ], LayerReborn.prototype, "panel", void 0);
    __decorate([
        property(cc.Node)
    ], LayerReborn.prototype, "btnReborn", void 0);
    __decorate([
        property(cc.Node)
    ], LayerReborn.prototype, "btnRestart", void 0);
    LayerReborn = __decorate([
        ccclass
    ], LayerReborn);
    return LayerReborn;
}(cc.Component));
exports.default = LayerReborn;

cc._RF.pop();