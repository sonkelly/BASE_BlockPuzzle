"use strict";
cc._RF.push(module, 'e99d3eQ2p1LfJDNShqAZJkh', 'MenuScene');
// Scripts/MenuScene.ts

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
var AudioManager_1 = require("./AudioManager");
var EventManager_1 = require("./EventManager");
var PlatformA_1 = require("./PlatformA");
var Property_1 = require("./Property");
var GameData_1 = require("./GameData");
var Utils_1 = require("./Utils");
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modeBestScore = [];
        _this.soundSprite = null;
        return _this;
    }
    MenuScene.prototype.onLoad = function () {
        this.initialSound();
        this.initialModeScore();
    };
    MenuScene.prototype.start = function () {
        EventManager_1.default.instance.EventMenu();
        if (lplatform.channel == PlatformA_1.CHANNEL.tt) {
            cc.find("Canvas/topnode/btn_set/btnPrivacyPolicy").active = false;
            cc.find("Canvas/topnode/btn_set/btnUserAgreement").active = false;
        }
    };
    MenuScene.prototype.initialModeScore = function () {
        var modeKeys = Object.keys(Property_1.MODE);
        for (var t = 0; t < this.modeBestScore.length; t++) {
            var mode = Property_1.MODE[modeKeys[t]];
            if (mode == Property_1.MODE.JIEMI || mode == Property_1.MODE.CHUANGGUAN) {
                this.modeBestScore[t].string = GameData_1.GameData.level[mode] || "1";
            }
            else if (mode == Property_1.MODE.STAR) {
                var userData = cc.sys.localStorage.getItem("userData_xmxx");
                if (userData && userData != "") {
                    var data = JSON.parse(userData);
                    this.modeBestScore[t].string = data && data.num_score_best ? data.num_score_best.toString() : "0";
                }
                else {
                    this.modeBestScore[t].string = "0";
                }
            }
            else if (mode == Property_1.MODE.KILL) {
                window.tempFileURL = ["", "", ""];
                var guideInfo = cc.sys.localStorage.getItem("guideinfo");
                window.GUIDE_LEVEL = guideInfo && guideInfo != "null" ? 1 : 0;
                var savedData = cc.sys.localStorage.getItem(window.GAME_SAVE_HANDLER);
                if (savedData) {
                    window.INIT_GAME_SAVE_DATA = JSON.parse(savedData);
                    this.modeBestScore[t].string = (Number(window.INIT_GAME_SAVE_DATA.top_level) + 1).toString();
                }
                else {
                    cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
                    this.modeBestScore[t].string = "1";
                }
                GameData_1.GameBundle[3].load("GameRes3/level_config2", function (err, asset) {
                    if (err) {
                        cc.error(err.message || err);
                    }
                    else {
                        window.MAP_CONFIG = asset.json;
                    }
                });
            }
            else {
                this.modeBestScore[t].string = GameData_1.GameData.getBestScore(mode).toString();
            }
            var videoIcon = this.modeBestScore[t].node.parent.getChildByName("icon_video");
            if (videoIcon) {
                videoIcon.active = !GameData_1.GameData.modeLock[mode];
            }
        }
    };
    MenuScene.prototype.initialSound = function () {
        if (GameData_1.GameData.audioSwitch == 1) {
            AudioManager_1.default.instance.playBgMusic();
        }
        this.soundSprite.active = GameData_1.GameData.audioSwitch == 0;
    };
    MenuScene.prototype.onClickMode = function (event, customEventData) {
        var _this = this;
        var modeIndex = parseInt(customEventData);
        AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.ClickMode);
        var modeKeys = Object.keys(Property_1.MODE);
        Property_1.GameMode = Property_1.MODE[modeKeys[modeIndex]];
        console.log(Property_1.GameMode);
        if (Property_1.GameMode == Property_1.MODE.TEACH) {
            if (GameData_1.GameData.teachingXS == 3) {
                GameData_1.GameData.teachingXS = 0;
                GameData_1.GameData.saveData();
            }
            this.toGame();
        }
        else if (Property_1.GameMode == Property_1.MODE.JINGDIAN) {
            this.toGame();
        }
        else {
            console.log("GameData.modeLock", GameData_1.GameData.modeLock[Property_1.GameMode]);
            if (GameData_1.GameData.modeLock[Property_1.GameMode]) {
                this.toGame();
            }
            else {
                EventManager_1.default.instance.showRewardedVideo(function () {
                    GameData_1.GameData.modeLock[Property_1.GameMode] = 1;
                    GameData_1.GameData.teaching = 3;
                    GameData_1.GameData.saveData();
                    _this.toGame();
                });
            }
        }
    };
    MenuScene.prototype.onClickQiDai = function () {
        AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.ClickMode);
        Utils_1.default.ShowAsk("Coming Soon...");
    };
    MenuScene.prototype.toGame = function () {
        AudioManager_1.default.instance.pauseMusic();
        EventManager_1.default.instance.EventMenuToGame();
        Common_1.default.instance.toGame();
        EventManager_1.default.instance.gameEvent("GameMode", Property_1.GameMode);
    };
    MenuScene.prototype.onClickSetAudio = function () {
        GameData_1.GameData.audioSwitch = 1 - GameData_1.GameData.audioSwitch;
        AudioManager_1.default.instance.playClickSound();
        if (GameData_1.GameData.audioSwitch == 0) {
            AudioManager_1.default.instance.pauseMusic();
        }
        else {
            AudioManager_1.default.instance.resumeMusic();
        }
        this.soundSprite.active = GameData_1.GameData.audioSwitch == 0;
    };
    __decorate([
        property([cc.Label])
    ], MenuScene.prototype, "modeBestScore", void 0);
    __decorate([
        property(cc.Node)
    ], MenuScene.prototype, "soundSprite", void 0);
    MenuScene = __decorate([
        ccclass
    ], MenuScene);
    return MenuScene;
}(cc.Component));
exports.default = MenuScene;

cc._RF.pop();