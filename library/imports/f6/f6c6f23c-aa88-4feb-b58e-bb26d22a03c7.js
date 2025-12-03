"use strict";
cc._RF.push(module, 'f6c6fI8qohP67WOuybSKgPH', 'Common');
// Scripts/Common.ts

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
var Property_1 = require("./Property");
var GameData_1 = require("./GameData");
var lodash_1 = require("./lodash");
var PlatformA_1 = require("./PlatformA");
var AudioManager_1 = require("./AudioManager");
var Utils_1 = require("./Utils");
var Common = /** @class */ (function (_super) {
    __extends(Common, _super);
    function Common() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Common_1 = Common;
    Object.defineProperty(Common, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    Common.prototype.onLoad = function () {
        if (Common_1._instance === null) {
            Common_1._instance = this;
        }
    };
    Common.prototype.setBestScore = function () {
        var bestScore = GameData_1.GameData.getBestScore(Property_1.GameMode);
        var currentScore = GameData_1.GameData.gameDataBind.fkScore._showBestScore;
        console.log("存档最高分", bestScore, "当前得分", currentScore);
        if (currentScore > bestScore) {
            GameData_1.GameData.setBestScore(Property_1.GameMode, currentScore);
        }
    };
    Common.prototype.toGame = function () {
        var sceneName = "game_" + Property_1.GameMode;
        GameData_1.GameData.initialData();
        if (GameData_1.GameData.oneToGame === 0) {
            GameData_1.GameData.oneToGame = 1;
            GameData_1.GameData.sceneName = sceneName;
            cc.director.loadScene("LoadingScene");
        }
        else {
            cc.director.loadScene(sceneName);
        }
    };
    Common.prototype.toMenu = function () {
        cc.director.loadScene("menu");
    };
    Common.prototype.showRebornLayer = function () {
        this.addPrefab(GameData_1.GameData.gameDataBind.rebornNode);
    };
    Common.prototype.showEndScoreLayer = function () {
        this.addPrefab(GameData_1.GameData.gameDataBind.endScorePrefab);
    };
    Common.prototype.showEndBestScoreLayer = function () {
        this.addPrefab(GameData_1.GameData.gameDataBind.endBestScorePrefab);
    };
    Common.prototype.showGameWinLayer = function () {
        this.addPrefab(Property_1.CommonPrefab.endWinPrefab);
    };
    Common.prototype.showGameLoseLayer = function () {
        this.addPrefab(Property_1.CommonPrefab.endLosePrefab);
    };
    Common.prototype.showBlockBoom = function (block, type, callback) {
        if (type === 0) {
            block.active = false;
        }
        var boomEffect = cc.instantiate(Property_1.CommonPrefab.iceBlock);
        boomEffect.parent = cc.find("Canvas/uiRoot/tempNode");
        boomEffect.position = cc.v2(block.x, block.y);
        var skeletonName = type + "_xbh_ske";
        var armatureDisplay = boomEffect.getChildByName(skeletonName).getComponent(dragonBones.ArmatureDisplay);
        armatureDisplay.node.active = true;
        var randomIndex = lodash_1.default.random(1, 4);
        var animationTypes = [
            ["hua", "hua1", "hua2", "hua3"],
            ["bing", "bing1", "bing2", "bing3"],
            ["xue", "xue1", "xue2", "xue3"]
        ];
        var animationName = animationTypes[type][randomIndex];
        Utils_1.default.playAniCall(armatureDisplay, animationName, function () {
            if (callback) {
                callback();
            }
            boomEffect.destroy();
        });
    };
    Common.prototype.showNewScore = function () {
        AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.NewScore);
        this.addPrefab(Property_1.CommonPrefab.newScore);
    };
    Common.prototype.showUnbelievable = function () {
        var soundID = lplatform.channel == PlatformA_1.CHANNEL.qq ? AudioManager_1.AudioID.UnbelievableQQ : AudioManager_1.AudioID.Unbelievable;
        AudioManager_1.default.instance.playSound(soundID);
        this.addPrefab(Property_1.CommonPrefab.unbelievable);
    };
    Common.prototype.pushChangeTime = function () {
        GameData_1.GameData.canShowPush = false;
        this.scheduleOnce(function () {
            GameData_1.GameData.canShowPush = true;
        }, Property_1.Property.PUSH_TIME_DELAY);
    };
    Common.prototype.pushChangeBlock = function (isForce, changeType, callback) {
        if (Property_1.GameMode == Property_1.MODE.TEACH || Property_1.GameMode == Property_1.MODE.JIEMI || GameData_1.GameData.pushChangeCount > 0) {
            return;
        }
        if (!isForce) {
            if (GameData_1.GameData.isFail)
                return;
            if (!GameData_1.GameData.canShowPush)
                return;
        }
        GameData_1.GameData.pause();
        GameData_1.GameData.pushChangeCount++;
        cc.resources.load("prefabs/pushChange", cc.Prefab, function (err, prefab) {
            if (err) {
                console.error("Common", "载入预制资源失败, 原因:" + err);
                return;
            }
            if (!(prefab instanceof cc.Prefab)) {
                console.error("Common", "你载入的不是预制资源!");
                return;
            }
            var pushChangeNode = cc.instantiate(prefab);
            pushChangeNode.name = "pushChange";
            pushChangeNode.parent = cc.find("Canvas");
            var script = pushChangeNode.getComponent(ExtendScript_1.default);
            if (script) {
                script.initial(changeType, callback);
            }
        });
    };
    Common.prototype.pushZaJinDan = function () {
        // 空实现
    };
    Common.prototype.addPrefab = function (prefab, data) {
        var node = cc.instantiate(prefab);
        node.parent = cc.find("Canvas");
        if (data) {
            var script = node.getComponent(ExtendScript_1.default);
            if (script) {
                script.initial(data);
            }
        }
    };
    var Common_1;
    Common._instance = new Common_1();
    Common = Common_1 = __decorate([
        ccclass
    ], Common);
    return Common;
}(cc.Component));
exports.default = Common;

cc._RF.pop();