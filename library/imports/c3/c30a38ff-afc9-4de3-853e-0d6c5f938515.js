"use strict";
cc._RF.push(module, 'c30a3j/r8lN44U+DWxfk4UV', 'AudioManager');
// Scripts/AudioManager.ts

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
exports.audioManager = exports.AudioID = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameData_1 = require("./GameData");
var AudioID;
(function (AudioID) {
    AudioID["ClickMode"] = "click_mode";
    AudioID["Combo"] = "combo";
    AudioID["LienTemp"] = "lienTemp";
    AudioID["LienTempQQ"] = "qqlienTemp";
    AudioID["NewScore"] = "newScore";
    AudioID["Start"] = "start";
    AudioID["Lost"] = "lost";
    AudioID["Time"] = "time321";
    AudioID["BSelect"] = "block_select";
    AudioID["BDown"] = "block_down";
    AudioID["BCrazing"] = "";
    AudioID["EndScore"] = "end_score";
    AudioID["EndButton"] = "end_button";
    AudioID["EndBestScore"] = "end_best_score";
    AudioID["Unbelievable"] = "lienTemp6";
    AudioID["UnbelievableQQ"] = "qqlienTemp6";
    AudioID["Bomb"] = "prop_boom";
    AudioID["RainBow"] = "prop_caiHong";
})(AudioID = exports.AudioID || (exports.AudioID = {}));
var AudioManager = /** @class */ (function (_super) {
    __extends(AudioManager, _super);
    function AudioManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgVolume = 1;
        _this.bgAudioID = -1;
        _this.sfxVolume = 1;
        _this.audioID = 0;
        return _this;
    }
    AudioManager_1 = AudioManager;
    Object.defineProperty(AudioManager, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    AudioManager.prototype.onLoad = function () {
        //AudioManager._instance = this;
    };
    AudioManager.prototype.init = function () {
        this.audioID = 0;
    };
    AudioManager.prototype.playBgMusic = function () {
        GameData_1.GameBundle[1].load("Audio/bgm_menu", cc.AudioClip, function (err, clip) {
            if (err) {
                console.error("load error => " + err);
            }
            else {
                cc.audioEngine.playMusic(clip, true);
            }
        });
    };
    AudioManager.prototype.playBgmMusic = function (e) {
        if (!e)
            return;
        if (typeof e === "string") {
            cc.resources.load(e, cc.AudioClip, function (err, clip) {
                if (err) {
                    console.error("load error => " + err);
                }
                else {
                    cc.audioEngine.playMusic(clip, true);
                }
            });
        }
        else if (typeof e === "object") {
            cc.audioEngine.playMusic(e, true);
        }
    };
    AudioManager.prototype.stopBgmMusic = function () {
        cc.audioEngine.stopMusic();
    };
    AudioManager.prototype.pauseMusic = function () {
        cc.audioEngine.pauseMusic();
    };
    AudioManager.prototype.resumeMusic = function () {
        cc.audioEngine.resumeMusic();
    };
    AudioManager.prototype.playSound = function (e, t) {
        if (GameData_1.GameData.audioSwitch !== 0 && e !== "") {
            this.getUrl("Audio/" + e, t);
        }
    };
    AudioManager.prototype.playAniSound = function (e) {
        this.getUrl("Audio/Animation/" + e);
    };
    AudioManager.prototype.playClickSound = function () {
        if (GameData_1.GameData.audioSwitch !== 0) {
            this.getUrl("Audio/click");
        }
    };
    AudioManager.prototype.playClickSound2 = function () {
        this.getUrl("Audio/click2");
    };
    AudioManager.prototype.playAudioClip = function (e, t) {
        if (t === void 0) { t = false; }
        if (e) {
            cc.audioEngine.play(e, t);
        }
    };
    AudioManager.prototype.getUrl = function (e, t) {
        var _this = this;
        if (t === void 0) { t = false; }
        cc.resources.load(e, cc.AudioClip, function (err, clip) {
            if (err) {
                console.log("load error => " + err);
            }
            else {
                _this.audioID = cc.audioEngine.playEffect(clip, t);
            }
        });
    };
    AudioManager.prototype.pauseAll = function () {
        cc.audioEngine.pauseAll();
    };
    AudioManager.prototype.resumeAll = function () {
        cc.audioEngine.resumeAll();
    };
    AudioManager.prototype.stopAllEffects = function () {
        cc.audioEngine.stopAllEffects();
    };
    AudioManager.prototype.pauseEffect = function () {
        cc.audioEngine.pauseEffect(this.audioID);
    };
    AudioManager.prototype.resumeEffect = function () {
        cc.audioEngine.resumeEffect(this.audioID);
    };
    AudioManager.prototype.setVolume0 = function () {
        cc.audioEngine.setMusicVolume(0);
        cc.audioEngine.setEffectsVolume(0);
    };
    AudioManager.prototype.setVolume1 = function () {
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.setEffectsVolume(1);
    };
    var AudioManager_1;
    AudioManager._instance = new AudioManager_1();
    __decorate([
        property
    ], AudioManager.prototype, "bgVolume", void 0);
    __decorate([
        property
    ], AudioManager.prototype, "bgAudioID", void 0);
    __decorate([
        property
    ], AudioManager.prototype, "sfxVolume", void 0);
    AudioManager = AudioManager_1 = __decorate([
        ccclass
    ], AudioManager);
    return AudioManager;
}(cc.Component));
exports.default = AudioManager;
exports.audioManager = new AudioManager();

cc._RF.pop();