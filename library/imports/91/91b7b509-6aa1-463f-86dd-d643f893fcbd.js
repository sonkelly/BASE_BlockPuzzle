"use strict";
cc._RF.push(module, '91b7bUJaqFGP4bd1kP4k/y9', 'GameScene');
// Scripts/GameScene.ts

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
var AudioManager_1 = require("./AudioManager");
var EventManager_1 = require("./EventManager");
var Common_1 = require("./Common");
var Utils_1 = require("./Utils");
var GameData_1 = require("./GameData");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fkFrame = null;
        _this.fkBg = null;
        _this.fkScore = null;
        _this.rebornNode = null;
        _this.endScorePrefab = null;
        _this.endBestScorePrefab = null;
        _this.leafNode = [];
        _this.propSpf = [];
        _this.btnBomb = null;
        _this.btnRainbow = null;
        _this.boardFrame = null;
        _this.kuaiManager = null;
        _this.isProp = 0;
        _this.propButton = null;
        _this.isPropFly = false;
        return _this;
    }
    GameScene.prototype.onLoad = function () {
        GameData_1.GameData.pause();
        GameData_1.GameData.gameDataBind = this;
        AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.Start);
        this.boardFrame = this.fkFrame.getComponent("boardFrame");
        this.kuaiManager = this.fkBg.getComponent("kuaiManager");
        this.fkScore = this.fkScore.getComponent("fkScore");
        this.changePropCount();
    };
    GameScene.prototype.onDestroy = function () {
        GameData_1.GameData.gameDataBind = null;
    };
    GameScene.prototype.changePropCount = function () {
        this.isPropFly = false;
        if (this.btnBomb) {
            cc.find("icon_video", this.btnBomb).active = GameData_1.GameData.propBomb < 1;
            cc.find("count", this.btnBomb).active = GameData_1.GameData.propBomb > 0;
            cc.find("count", this.btnBomb).getComponent(cc.Label).string = GameData_1.GameData.propBomb.toString();
        }
        if (this.btnRainbow) {
            cc.find("icon_video", this.btnRainbow).active = GameData_1.GameData.propRainBow < 1;
            cc.find("count", this.btnRainbow).active = GameData_1.GameData.propRainBow > 0;
            cc.find("count", this.btnRainbow).getComponent(cc.Label).string = GameData_1.GameData.propRainBow.toString();
        }
        console.log("道具数量", GameData_1.GameData.propRainBow, GameData_1.GameData.propBomb);
    };
    GameScene.prototype.start = function () {
        this.isProp = 0;
        this.propButton = null;
    };
    GameScene.prototype.update = function (dt) {
        if (!GameData_1.GameData.isPause) {
            GameData_1.GameData.pushZJD_autoShow -= dt;
            if (GameData_1.GameData.pushZJD_autoShow < 0) {
                this.pushZaJinDan();
            }
        }
    };
    GameScene.prototype.restartGame = function () {
        AudioManager_1.default.instance.playClickSound();
        if (Property_1.GameMode == Property_1.MODE.TEACH && GameData_1.GameData.teachingXS == 3) {
            GameData_1.GameData.teachingXS = 0;
            GameData_1.GameData.saveData();
        }
        GameData_1.GameData.blockData = [];
        GameData_1.GameData.curScore = 0;
        GameData_1.GameData.initialData();
        Common_1.default.instance.toGame();
    };
    GameScene.prototype.pushZaJinDan = function () {
        Common_1.default.instance.pushZaJinDan(this.propSpf);
    };
    GameScene.prototype.onClickBomb = function (event) {
        var _this = this;
        if (this.isPropFly)
            return;
        if (this.getIsProp() == 0) {
            if (GameData_1.GameData.propBomb > 0) {
                this.propButton = event.target;
                this.setIsProp(1);
            }
            else {
                EventManager_1.default.instance.showRewardedVideo(function () {
                    _this.propButton = event.target;
                    _this.setIsProp(1);
                });
            }
        }
        else {
            this.setIsProp(0);
        }
    };
    GameScene.prototype.onClickRainBow = function (event) {
        var _this = this;
        if (this.isPropFly)
            return;
        if (this.getIsProp() == 0) {
            if (GameData_1.GameData.propRainBow > 0) {
                this.propButton = event.target;
                this.setIsProp(2);
            }
            else {
                EventManager_1.default.instance.showRewardedVideo(function () {
                    _this.propButton = event.target;
                    _this.setIsProp(2);
                });
            }
        }
        else {
            this.setIsProp(0);
        }
    };
    GameScene.prototype.setIsProp = function (type) {
        this.changePropCount();
        this.isProp = type;
        cc.find("Canvas/btnBomb/image").active = this.isProp == 1;
        cc.find("Canvas/btnRainbow/image").active = this.isProp == 2;
        if (this.isProp == 1) {
            this.btnBomb.getComponent(cc.Animation).play();
        }
        else if (this.isProp == 2) {
            this.btnRainbow.getComponent(cc.Animation).play();
        }
        else {
            this.btnBomb.getComponent(cc.Animation).stop();
            this.btnRainbow.getComponent(cc.Animation).stop();
        }
    };
    GameScene.prototype.getIsProp = function () {
        return this.isProp;
    };
    GameScene.prototype.vibrates = function (combo, xcNum) {
        var _this = this;
        if (combo < 2 && xcNum < 2)
            return;
        console.log("combo=" + combo, "xcNum=" + xcNum);
        if (combo == 5 || combo == 10 || combo == 15 || combo == 18 || combo == 20 || xcNum >= 4) {
            this.pushZaJinDan();
        }
        if (combo < 7) {
            this.screenVibrates(function () {
                if (xcNum > 1) {
                    _this.effectAni(xcNum);
                }
            });
        }
        else {
            this.effectAni(combo - 5, 1, function (e) {
                if (e == 1 && xcNum > 1) {
                    _this.effectAni(xcNum, 2);
                }
            });
        }
    };
    GameScene.prototype.effectAni = function (num, type, callback) {
        console.log("num", num);
        if (num < 2)
            return;
        if (num > 6) {
            num = 6;
        }
        this.screenVibrates();
        var n = cc.find("Canvas/uiRoot/ShakeNode");
        if (n) {
            var a = cc.find(num + "rows", n);
            var i = cc.instantiate(a);
            i.name = "temp66666";
            i.parent = n;
            i.active = true;
            Utils_1.default.nodePlayAnimationCall(i, "effect_shake_" + num, function () {
                if (callback) {
                    callback(type);
                }
            });
        }
        var playAnimation = function (node, animName) {
            Utils_1.default.playAniCall(node, "newAnimation_1", function () {
                Utils_1.default.playAni(node, animName);
            });
        };
        for (var s = 0; s < 4; s++) {
            if (this.leafNode[s].animationName != "newAnimation_1") {
                playAnimation(this.leafNode[s], this.leafNode[s].animationName);
            }
        }
    };
    GameScene.prototype.screenVibrates = function (callback) {
        var t = cc.find("Canvas/uiRoot");
        var o = t.x;
        var n = t.y;
        cc.tween(t)
            .repeat(2, cc.tween()
            .to(0.018, { x: o + (5 + Property_1.SCREEN_OFFSET), y: n + (7 + Property_1.SCREEN_OFFSET) })
            .to(0.018, { x: o - (6 + Property_1.SCREEN_OFFSET), y: n + (7 + Property_1.SCREEN_OFFSET) })
            .to(0.018, { x: o - (13 + Property_1.SCREEN_OFFSET), y: n + (3 + Property_1.SCREEN_OFFSET) })
            .to(0.018, { x: o + (3 + Property_1.SCREEN_OFFSET), y: n - (6 + Property_1.SCREEN_OFFSET) })
            .to(0.018, { x: o - (5 + Property_1.SCREEN_OFFSET), y: n + (5 + Property_1.SCREEN_OFFSET) })
            .to(0.018, { x: o + (2 + Property_1.SCREEN_OFFSET), y: n - (8 + Property_1.SCREEN_OFFSET) })
            .to(0.018, { x: o - (8 + Property_1.SCREEN_OFFSET), y: n - (10 + Property_1.SCREEN_OFFSET) })
            .to(0.018, { x: o + (3 + Property_1.SCREEN_OFFSET), y: n + (10 + Property_1.SCREEN_OFFSET) })
            .to(0.018, { x: o + (0 + Property_1.SCREEN_OFFSET), y: n + (0 + Property_1.SCREEN_OFFSET) })
            .to(0.018, { x: 0, y: 0 }))
            .call(function () {
            if (callback) {
                callback();
            }
        })
            .start();
    };
    GameScene.prototype.tempA = function (e, t) {
        this.vibrates(2, t);
    };
    GameScene.prototype.temp_Effect = function () {
        var e = cc.find("Canvas/New EditBox").getComponent(cc.EditBox).string;
        this.vibrates(Number(e), 6);
    };
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "fkFrame", void 0);
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "fkBg", void 0);
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "fkScore", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameScene.prototype, "rebornNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameScene.prototype, "endScorePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameScene.prototype, "endBestScorePrefab", void 0);
    __decorate([
        property([dragonBones.ArmatureDisplay])
    ], GameScene.prototype, "leafNode", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "砸金蛋奖励图片"
        })
    ], GameScene.prototype, "propSpf", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "按钮-道具炸弹"
        })
    ], GameScene.prototype, "btnBomb", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: "按钮-道具彩虹锤"
        })
    ], GameScene.prototype, "btnRainbow", void 0);
    GameScene = __decorate([
        ccclass
    ], GameScene);
    return GameScene;
}(cc.Component));
exports.default = GameScene;

cc._RF.pop();