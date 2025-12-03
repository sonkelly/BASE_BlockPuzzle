"use strict";
cc._RF.push(module, '3be70KxbS9AyIgsiV7wZULE', 'fkScore');
// Scripts/fkScore.ts

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
var Common_1 = require("./Common");
var LvData_JieMi_1 = require("./LvData_JieMi");
var Property_1 = require("./Property");
var resourceUtil_1 = require("./resourceUtil");
var AudioManager_1 = require("./AudioManager");
var LvData_ChuangGuan_1 = require("./LvData_ChuangGuan");
var GameData_1 = require("./GameData");
var fkScore = /** @class */ (function (_super) {
    __extends(fkScore, _super);
    function fkScore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._gameScore = 0;
        _this._showScore = 0;
        _this._showBestScore = 0;
        _this._curScore = 0;
        _this.changeS = 1;
        _this._nowTaskNum = 0;
        _this.moveParent = null;
        _this.scoreLab = null;
        _this.bestScoreLab = null;
        _this.skeHeart = null;
        _this.taskSprite = null;
        _this.nowTaskLabel = null;
        _this.taskLabel = null;
        _this.levelLabel = null;
        _this.isEject = false;
        return _this;
    }
    fkScore.prototype.onLoad = function () {
        this.isEject = false;
        this.readBestScore();
        this._gameScore = 0;
        this._showScore = this._gameScore;
        if (this.skeHeart) {
            this.skeHeart.removeEventListener(dragonBones.EventObject.COMPLETE, this.playSkeComplete, this);
            this.skeHeart.addEventListener(dragonBones.EventObject.COMPLETE, this.playSkeComplete, this);
        }
        this.setTaskNumber();
        this.setLevelNum();
    };
    fkScore.prototype.readBestScore = function () {
        this._showBestScore = GameData_1.GameData.getBestScore(Property_1.GameMode);
        this.bestScoreLab.string = this._showBestScore.toString();
    };
    fkScore.prototype.setLevelNum = function () {
        if (Property_1.GameMode == Property_1.MODE.JIEMI || Property_1.GameMode == Property_1.MODE.CHUANGGUAN) {
            this.levelLabel.string = "Current Level " + GameData_1.GameData.level[Property_1.GameMode];
        }
    };
    fkScore.prototype.setTaskNumber = function () {
        if (Property_1.GameMode == Property_1.MODE.JIEMI) {
            this.taskLabel.string = LvData_JieMi_1.default.JM_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].board.length.toString();
            resourceUtil_1.default.instance.setSpriteFrame("kuai/k" + LvData_JieMi_1.default.JM_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].color, this.taskSprite);
        }
        else {
            if (Property_1.GameMode != Property_1.MODE.CHUANGGUAN)
                return;
            this.taskLabel.string = LvData_ChuangGuan_1.default.CG_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].board.length.toString();
        }
        this.nowTaskLabel.string = this._nowTaskNum.toString();
    };
    fkScore.prototype.playSke = function () {
        this.skeHeart.node.active = true;
        this.skeHeart.playAnimation("newAnimation", 1);
    };
    fkScore.prototype.playSkeComplete = function () {
        this.skeHeart.playAnimation("xunhuan", 1);
    };
    fkScore.prototype.hideHeatBeat = function () {
        this.skeHeart.node.active = false;
    };
    fkScore.prototype.setBoardScore = function (score, type) {
        var diff = score - this._curScore;
        if (diff > Property_1.Property.CHANGE_SCORE) {
            this.changeS = Math.floor(Property_1.Property.CHANGE_TIME / (2 / diff));
            this.changeS = this.changeS < 1 ? 1 : this.changeS;
        }
        else {
            this.changeS = 1;
        }
        if (type == 1) {
            this.changeS = diff;
        }
        this._curScore = score;
        if (Property_1.GameMode == Property_1.MODE.JINGDIAN) {
            GameData_1.GameData.curScore = score;
        }
        if (GameData_1.GameData.isGetBestScore == 0 && GameData_1.GameData.getBestScore(Property_1.GameMode) != 0) {
            var bestScore = GameData_1.GameData.getBestScore(Property_1.GameMode);
            if (this._showBestScore > bestScore) {
                GameData_1.GameData.isGetBestScore = 1;
                Common_1.default.instance.showNewScore();
            }
        }
    };
    fkScore.prototype.update = function () {
        this.updateScore();
        if (this._curScore > this._showBestScore) {
            this.updateBestScore();
        }
    };
    fkScore.prototype.updateScore = function () {
        if (this._curScore > this._gameScore) {
            this._gameScore += this.changeS;
            this.scoreLab.string = this._gameScore.toString();
        }
        else if (this._gameScore > this._curScore) {
            this._gameScore = this._curScore;
            this.scoreLab.string = this._gameScore.toString();
        }
    };
    fkScore.prototype.updateBestScore = function () {
        if (this._curScore > this._showBestScore) {
            this._showBestScore += this.changeS;
            this.bestScoreLab.string = this._showBestScore.toString();
        }
    };
    fkScore.prototype.btnPause = function () {
        var _this = this;
        AudioManager_1.default.instance.playClickSound();
        var self = this;
        if (this.isEject) {
            cc.tween(this.moveParent)
                .call(function () {
                cc.find("moveParent/btnFlush", _this.node).active = false;
                cc.find("moveParent/btnHome", _this.node).active = false;
            })
                .by(0.6, { position: cc.v2(-220, 0) }, { easing: "elasticOut" })
                .start();
        }
        else {
            cc.tween(this.moveParent)
                .call(function () {
                cc.find("moveParent/btnFlush", _this.node).active = true;
                cc.find("moveParent/btnHome", _this.node).active = true;
            })
                .by(0.6, { position: cc.v2(220, 0) }, { easing: "elasticOut" })
                .start();
        }
        this.isEject = !this.isEject;
    };
    fkScore.prototype.btnHome = function () {
        AudioManager_1.default.instance.playClickSound();
        Common_1.default.instance.setBestScore();
        Common_1.default.instance.toMenu();
    };
    fkScore.prototype.btnFlush = function () {
        GameData_1.GameData.gameDataBind.restartGame();
    };
    __decorate([
        property
    ], fkScore.prototype, "_gameScore", void 0);
    __decorate([
        property
    ], fkScore.prototype, "_showScore", void 0);
    __decorate([
        property
    ], fkScore.prototype, "_showBestScore", void 0);
    __decorate([
        property
    ], fkScore.prototype, "_curScore", void 0);
    __decorate([
        property
    ], fkScore.prototype, "changeS", void 0);
    __decorate([
        property
    ], fkScore.prototype, "_nowTaskNum", void 0);
    __decorate([
        property(cc.Node)
    ], fkScore.prototype, "moveParent", void 0);
    __decorate([
        property(cc.Label)
    ], fkScore.prototype, "scoreLab", void 0);
    __decorate([
        property(cc.Label)
    ], fkScore.prototype, "bestScoreLab", void 0);
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], fkScore.prototype, "skeHeart", void 0);
    __decorate([
        property(cc.Sprite)
    ], fkScore.prototype, "taskSprite", void 0);
    __decorate([
        property(cc.Label)
    ], fkScore.prototype, "nowTaskLabel", void 0);
    __decorate([
        property(cc.Label)
    ], fkScore.prototype, "taskLabel", void 0);
    __decorate([
        property(cc.Label)
    ], fkScore.prototype, "levelLabel", void 0);
    fkScore = __decorate([
        ccclass
    ], fkScore);
    return fkScore;
}(cc.Component));
exports.default = fkScore;

cc._RF.pop();