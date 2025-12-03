"use strict";
cc._RF.push(module, '8bb03FWUbdMuKzWbGoMSS+w', 'GameData');
// Scripts/GameData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameData = exports.GameBundle = exports.GameName = void 0;
var Property_1 = require("./Property");
exports.GameName = "Bubble_LocalData";
exports.GameBundle = {};
var GameData = /** @class */ (function () {
    function GameData() {
    }
    GameData.initialData = function () {
        this.pushChangeCount = 0;
        this.canShowPush = true;
        this.isTouch = 0;
        this.pushChange_Time = Property_1.Property.PUSH_TIME;
        this.pushZJD_autoShow = Property_1.Property.PUSH_ZJD_TIME;
        this.isGetBestScore = 0;
        this.isWin = false;
        this.isFail = false;
        this.push_BlockArr = [];
        this.zjd_Score = 0;
        this.blockIndex = 0;
        this.saveData();
        this.resume();
    };
    GameData.saveData = function () {
        for (var key in this.localData) {
            this.localData[key] = this[key];
        }
        var dataStr = JSON.stringify(this.localData);
        cc.sys.localStorage.setItem(exports.GameName, dataStr);
    };
    GameData.loadData = function (callback) {
        var dataStr = cc.sys.localStorage.getItem(exports.GameName);
        if (dataStr === "" || dataStr === null) {
            GameData.saveData();
            callback && callback(false);
            return;
        }
        var data = JSON.parse(dataStr);
        var needUpdate = false;
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.propBomb === null) {
            this.propBomb = 0;
            needUpdate = true;
        }
        if (data.propRainBow === null) {
            this.propRainBow = 0;
            needUpdate = true;
        }
        if (data.xmxx_Hammer === null) {
            this.xmxx_Hammer = 0;
            needUpdate = true;
        }
        if (data.xmxx_Refresh === null) {
            this.xmxx_Refresh = 0;
            needUpdate = true;
        }
        if (data.xmxx_Pen === null) {
            this.xmxx_Pen = 0;
            needUpdate = true;
        }
        if (data.modeLock && data.modeLock[Property_1.MODE.KILL] === null) {
            this.modeLock[Property_1.MODE.KILL] = 1;
            needUpdate = true;
        }
        if (data.modeLock && data.modeLock[Property_1.MODE.JIUJIU2] === null) {
            this.modeLock[Property_1.MODE.JIUJIU2] = 1;
            needUpdate = true;
        }
        if (data.modeLock && data.modeLock[Property_1.MODE.STAR2] === null) {
            this.modeLock[Property_1.MODE.STAR2] = 1;
            needUpdate = true;
        }
        if (!this.level[Property_1.MODE.JIUJIU2]) {
            this.level[Property_1.MODE.JIUJIU2] = 1;
            this.bestScore[Property_1.MODE.JIUJIU2] = {};
            var level = this.level[Property_1.MODE.JIUJIU2];
            this.bestScore[Property_1.MODE.JIUJIU2][level] = 0;
            needUpdate = true;
        }
        if (needUpdate) {
            this.saveData();
        }
        callback && callback(true);
    };
    GameData.setBestScore = function (mode, score) {
        var currentLevel = this.level[mode];
        this.bestScore[mode][currentLevel] = score;
        this.saveData();
    };
    GameData.getBestScore = function (mode) {
        var currentLevel = this.level[mode];
        return this.bestScore[mode][currentLevel] || 0;
    };
    GameData.pause = function () {
        this.isPause = 1;
    };
    GameData.resume = function () {
        this.isPause = 0;
    };
    GameData.oneToGame = 0;
    GameData.sceneName = null;
    GameData.isPause = 0;
    GameData.audioSwitch = 1;
    GameData.propBomb = 0;
    GameData.propRainBow = 0;
    GameData.xmxx_Hammer = 0;
    GameData.xmxx_Refresh = 0;
    GameData.xmxx_Pen = 0;
    GameData.teachingXS = 0;
    GameData.teaching = 0;
    GameData.curScore = 0;
    GameData.blockData = [];
    GameData.bestScore = {};
    GameData.level = {};
    GameData.modeLock = {};
    GameData.canShowPush = true;
    GameData.pushChangeCount = 0;
    GameData.isTouch = 0;
    GameData.pushChange_Time = 60;
    GameData.pushZJD_autoShow = 60;
    GameData.isGetBestScore = 0;
    GameData.isWin = false;
    GameData.isFail = false;
    GameData.push_BlockArr = [];
    GameData.blockIndex = 0;
    GameData.zjd_Score = 0;
    GameData.localData = {
        propBomb: 0,
        propRainBow: 0,
        xmxx_Hammer: 0,
        xmxx_Refresh: 0,
        xmxx_Pen: 0,
        teachingXS: 0,
        teaching: 0,
        curScore: 0,
        blockData: [],
        bestScore: {},
        level: {},
        modeLock: {}
    };
    return GameData;
}());
exports.GameData = GameData;

cc._RF.pop();