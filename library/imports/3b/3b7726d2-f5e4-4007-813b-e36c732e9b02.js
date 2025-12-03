"use strict";
cc._RF.push(module, '3b772bS9eRAB4E742xzLpsC', 'layerBase');
// Scripts/layerBase.ts

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
var LvData_ChuangGuan_1 = require("./LvData_ChuangGuan");
var LvData_JieMi_1 = require("./LvData_JieMi");
var AudioManager_1 = require("./AudioManager");
var EventManager_1 = require("./EventManager");
var Common_1 = require("./Common");
var GameData_1 = require("./GameData");
var Utils_1 = require("./Utils");
var layerBase = /** @class */ (function (_super) {
    __extends(layerBase, _super);
    function layerBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isBestScoreLayer = false;
        _this.crownAni = null;
        _this.guang = null;
        _this.btnNext = null;
        _this.scoreLab = null;
        _this.bestScoreLab = null;
        _this.isPause = 0;
        _this.curScore = 0;
        _this.gameScore = 0;
        _this.changeS = 1;
        return _this;
    }
    layerBase.prototype.onLoad = function () {
        var _this = this;
        GameData_1.GameData.pause();
        if (this.crownAni) {
            Utils_1.default.playAniCall(this.crownAni, "newAnimation", function () {
                return Utils_1.default.playAni(_this.crownAni, "newAnimation_1");
            });
        }
        if (this.guang) {
            cc.tween(this.guang)
                .repeatForever(cc.tween().by(3, { angle: -360 }))
                .start();
        }
        if (this.btnNext) {
            this.btnNext.scale = 0;
        }
        if (this.bestScoreLab) {
            this.bestScoreLab = GameData_1.GameData.getBestScore(Property_1.GameMode);
        }
    };
    layerBase.prototype.start = function () {
        this.isPause = 0;
        this.curScore = GameData_1.GameData.gameDataBind.fkScore._curScore;
        if (this.isBestScoreLayer) {
            this.curScore = GameData_1.GameData.getBestScore(Property_1.GameMode);
        }
        this.gameScore = 0;
        this.changeS = 1;
        if (this.curScore > Property_1.Property.CHANGE_SCORE) {
            this.changeS = Math.floor(Property_1.Property.CHANGE_TIME / (2 / this.curScore));
            this.changeS = this.changeS < 1 ? 1 : this.changeS;
        }
    };
    layerBase.prototype.update = function (dt) {
        this.updateScore();
    };
    layerBase.prototype.updateScore = function () {
        if (this.isPause)
            return;
        this.gameScore += this.changeS;
        AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.EndScore);
        this.scoreLab.string = this.gameScore.toString();
        if (this.gameScore >= this.curScore) {
            this.scoreAddFinish();
        }
    };
    layerBase.prototype.scoreAddFinish = function () {
        this.isPause = 1;
        if (this.guang) {
            this.guang.stopAllActions();
        }
        this.scoreLab.string = this.curScore.toString();
        AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.EndButton);
        if (this.btnNext) {
            cc.tween(this.btnNext)
                .to(0.6, { scale: 1 }, { easing: "elasticOut" })
                .start();
        }
    };
    layerBase.prototype.onClickRestart = function () {
        AudioManager_1.default.instance.playClickSound();
        EventManager_1.default.instance.EventInterstitialVideo();
        GameData_1.GameData.blockData = [];
        GameData_1.GameData.curScore = 0;
        if (Property_1.GameMode == Property_1.MODE.TEACH) {
            if (GameData_1.GameData.teachingXS == 3) {
                GameData_1.GameData.teachingXS = 0;
                GameData_1.GameData.saveData();
            }
            Common_1.default.instance.toGame();
        }
        else {
            Common_1.default.instance.toGame();
        }
    };
    layerBase.prototype.onClickShare = function () {
        EventManager_1.default.instance.shareRecord();
    };
    layerBase.prototype.onClickNext = function () {
        AudioManager_1.default.instance.playClickSound();
        EventManager_1.default.instance.EventInterstitialVideo();
        GameData_1.GameData.level[Property_1.GameMode]++;
        if (Property_1.GameMode == Property_1.MODE.JIEMI && GameData_1.GameData.level[Property_1.GameMode] > Object.keys(LvData_JieMi_1.default.JM_LEVEL_DATA).length) {
            GameData_1.GameData.level[Property_1.GameMode] = 1;
        }
        if (Property_1.GameMode == Property_1.MODE.CHUANGGUAN && GameData_1.GameData.level[Property_1.GameMode] > Object.keys(LvData_ChuangGuan_1.default.CG_LEVEL_DATA).length) {
            GameData_1.GameData.level[Property_1.GameMode] = 1;
        }
        GameData_1.GameData.saveData();
        Common_1.default.instance.toGame();
    };
    __decorate([
        property
    ], layerBase.prototype, "isBestScoreLayer", void 0);
    __decorate([
        property({
            type: dragonBones.ArmatureDisplay,
            tooltip: "皇冠龙骨"
        })
    ], layerBase.prototype, "crownAni", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "分数背后的光"
        })
    ], layerBase.prototype, "guang", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "下一关按钮"
        })
    ], layerBase.prototype, "btnNext", void 0);
    __decorate([
        property({
            type: cc.Label,
            tooltip: "当前得分"
        })
    ], layerBase.prototype, "scoreLab", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "当前最高分"
        })
    ], layerBase.prototype, "bestScoreLab", void 0);
    layerBase = __decorate([
        ccclass
    ], layerBase);
    return layerBase;
}(cc.Component));
exports.default = layerBase;

cc._RF.pop();