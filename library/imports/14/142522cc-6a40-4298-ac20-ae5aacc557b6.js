"use strict";
cc._RF.push(module, '14252LMakBCmKwgrlqsxVe2', 'StartScene');
// Scripts/StartScene.ts

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
var PlatformA_1 = require("./PlatformA");
var EventManager_1 = require("./EventManager");
var Common_1 = require("./Common");
var Property_1 = require("./Property");
var GameData_1 = require("./GameData");
var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subPackCount = 2;
        _this.subPackIndex = 0;
        return _this;
    }
    StartScene.prototype.onLoad = function () {
        this.subPackIndex = 0;
        GameData_1.GameData.loadData(function (error) {
            if (!error) {
                for (var modeKey in Property_1.MODE) {
                    GameData_1.GameData.bestScore[Property_1.MODE[modeKey]] = {};
                    GameData_1.GameData.level[Property_1.MODE[modeKey]] = 1;
                }
                GameData_1.GameData.modeLock[Property_1.MODE.JINGDIAN] = 1;
                if (lplatform.channel === PlatformA_1.CHANNEL.oppo || lplatform.channel === PlatformA_1.CHANNEL.vivo) {
                    GameData_1.GameData.modeLock[Property_1.MODE.JIUJIU] = 1;
                    GameData_1.GameData.modeLock[Property_1.MODE.JIUGONG] = 1;
                    GameData_1.GameData.modeLock[Property_1.MODE.JIEMI] = 1;
                    GameData_1.GameData.modeLock[Property_1.MODE.CHUANGGUAN] = 1;
                    GameData_1.GameData.modeLock[Property_1.MODE.STAR] = 1;
                }
                GameData_1.GameData.saveData();
            }
        });
        this.loadSubPack(this.subPackIndex);
    };
    StartScene.prototype.loadSubPack = function (index) {
        var _this = this;
        var bundleName = "GameRes" + (index + 1);
        cc.assetManager.loadBundle(bundleName, function (err, bundle) {
            if (err) {
                console.log(err);
            }
            GameData_1.GameBundle[_this.subPackIndex + 1] = bundle;
            _this.subPackIndex++;
            if (_this.subPackIndex === _this.subPackCount) {
                _this.loadFinish();
            }
            else {
                _this.loadSubPack(_this.subPackIndex);
            }
            cc.director.preloadScene("game_jingdian");
        });
    };
    StartScene.prototype.loadFinish = function () {
        EventManager_1.default.instance.EventLoad();
        Common_1.default.instance.toMenu();
    };
    __decorate([
        property({
            type: cc.Integer,
            tooltip: "分包个数"
        })
    ], StartScene.prototype, "subPackCount", void 0);
    StartScene = __decorate([
        ccclass
    ], StartScene);
    return StartScene;
}(cc.Component));
exports.default = StartScene;

cc._RF.pop();