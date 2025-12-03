"use strict";
cc._RF.push(module, '20f28InGrdOdrZVGvlPbVfn', 'Utils3');
// Scripts/Utils3.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils3 = void 0;
var GameData_1 = require("./GameData");
var Utils3 = /** @class */ (function () {
    function Utils3() {
    }
    Utils3.setDesignResolution = function () {
        var canvas = cc.find("Canvas").getComponent(cc.Canvas);
        var winSize = cc.winSize;
        if (winSize.width / winSize.height > 9 / 16) {
            canvas.fitWidth = false;
            canvas.fitHeight = true;
        }
        else {
            canvas.fitWidth = true;
            canvas.fitHeight = false;
        }
    };
    Utils3.setKVUserData = function (key, value) {
        cc.sys.localStorage.setItem(key, value);
    };
    Utils3.getKVUserData = function (key) {
        return cc.sys.localStorage.getItem(key);
    };
    Utils3.loadRes = function (path, type, callback) {
        GameData_1.GameBundle[3].load("GameRes3/" + path, type, function (err, asset) {
            if (err) {
                cc.error(err.message || err);
            }
            else if (typeof callback === "function") {
                callback(asset);
            }
        });
    };
    Utils3.fadeIn = function (node, duration) {
        if (duration === void 0) { duration = 1; }
        node.opacity = 0;
        node.runAction(cc.fadeIn(duration));
    };
    Utils3.getSaveData = function (callback) {
        var saveData = cc.sys.localStorage.getItem(window.GAME_SAVE_HANDLER);
        if (saveData) {
            window.INIT_GAME_SAVE_DATA = JSON.parse(saveData);
        }
        else {
            cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
            saveData = window.INIT_GAME_SAVE_DATA;
        }
        if (callback) {
            callback(saveData);
        }
    };
    Utils3.setSaveData = function () {
        console.log("本地数据设置成功", JSON.stringify(window.INIT_GAME_SAVE_DATA));
        cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
    };
    Utils3.random = function (min, max) {
        return min + Math.floor(Math.random() * (max - min));
    };
    Utils3.getAngle = function (x1, y1, x2, y2) {
        var dx = Math.abs(x1 - x2);
        var dy = Math.abs(y1 - y2);
        var sinValue = dy / Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        var angle = Math.acos(sinValue);
        return 180 / (Math.PI / angle);
    };
    Utils3.getRandomSDiff = function (min, max, count) {
        if (max - min + 1 < count) {
            return [];
        }
        var arr = new Array(max - min + 1);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = min + i;
        }
        var result = new Array(count);
        for (var i = 0; i < count; i++) {
            var randomIndex = this.random(0, arr.length - 1 - i);
            result[i] = arr[randomIndex];
            var lastIndex = arr.length - 1 - i;
            var temp = arr[lastIndex];
            arr[lastIndex] = arr[randomIndex];
            arr[randomIndex] = temp;
        }
        return result;
    };
    Utils3.showGetItem = function (count, type, parent, x, y) {
        this.loadRes("prefabs/textbg", cc.Prefab, function (prefab) {
            var node = cc.instantiate(prefab);
            node.zIndex = 1000;
            var labelNode = node.getChildByName("l_num");
            var goldSprite = node.getChildByName("sp_gold");
            var boomSprite = node.getChildByName("sp_boom");
            if (type === 0) {
                labelNode.getComponent(cc.Label).string = cc.js.formatStr("Ultimate Bombingx%d", count);
                goldSprite.active = false;
                boomSprite.active = true;
            }
            else {
                labelNode.getComponent(cc.Label).string = cc.js.formatStr("gold%d", count);
                goldSprite.active = true;
                boomSprite.active = false;
            }
            var posX = x || 0;
            var posY = y || 0;
            if (parent && cc.isValid(parent)) {
                node.parent = parent;
            }
            else {
                node.parent = cc.find("Canvas");
            }
            node.setPosition(posX, posY);
            var moveAction = cc.moveBy(1.5, cc.v2(0, 70));
            var fadeAction = cc.fadeOut(1);
            node.runAction(cc.sequence(moveAction, fadeAction, cc.callFunc(function () {
                node.destroy();
            })));
        });
    };
    Utils3.showTipsText = function (text, parent, x, y, fontSize, color, duration, moveDistance) {
        var node = new cc.Node("tipstext");
        node.zIndex = 1000;
        var label = node.addComponent(cc.Label);
        label.fontFamily = "黑体";
        label.string = text;
        var posX = x || 0;
        var posY = y || 0;
        label.fontSize = fontSize || 40;
        label.lineHeight = fontSize ? fontSize + 10 : 50;
        node.color = color || cc.Color.WHITE;
        if (parent && cc.isValid(parent)) {
            node.parent = parent;
        }
        else {
            node.parent = cc.find("Canvas");
        }
        var moveDuration = duration || 0.5;
        var distance = moveDistance || 70;
        node.setPosition(posX, posY);
        var moveAction = cc.moveBy(moveDuration, cc.v2(0, distance));
        var fadeAction = cc.fadeOut(1);
        node.runAction(cc.sequence(moveAction, fadeAction, cc.callFunc(function () {
            node.destroy();
        })));
    };
    Utils3.showHurtText = function (text, parent, x, y, fontSize, color, duration, scale, isStatic) {
        var _this = this;
        this.loadRes("prefabs/l_hurt", cc.Prefab, function (prefab) {
            var node = cc.instantiate(prefab);
            node.zIndex = 1000;
            var label = node.getComponent(cc.Label);
            label.string = text;
            var posX = x || 0;
            var posY = y || 0;
            label.fontSize = fontSize || 40;
            label.lineHeight = 80;
            node.color = color || cc.Color.WHITE;
            if (parent && cc.isValid(parent)) {
                node.parent = parent;
            }
            else {
                node.parent = cc.find("Canvas");
            }
            var moveDuration = duration || 0.5;
            var jumpScale = scale || 1;
            node.setPosition(posX, posY);
            if (!_this.dir) {
                _this.dir = false;
            }
            _this.dir = !_this.dir;
            var direction = _this.dir ? -1 : 1;
            if (isStatic) {
                jumpScale = 0;
            }
            var jumpAction = cc.jumpBy(moveDuration, 100 * jumpScale * direction, -30, 100, 1);
            var fadeAction = cc.fadeOut(0.8);
            node.runAction(cc.sequence(jumpAction, fadeAction, cc.callFunc(function () {
                node.destroy();
                node = null;
            })));
        });
    };
    Utils3.moveIcon = function (spriteFrame, parent, startPos, endPos, callback, duration, jumpDistance) {
        var moveDuration = duration || 1;
        var node = new cc.Node("iconmove");
        node.addComponent(cc.Sprite).spriteFrame = spriteFrame;
        if (parent && cc.isValid(parent)) {
            node.parent = parent;
        }
        else {
            node.parent = cc.find("Canvas");
        }
        var randomValue = this.random(0, 1000);
        node.anchorY = 0;
        node.position = startPos;
        node.zIndex = 1000;
        if (jumpDistance && jumpDistance > 0) {
            if (randomValue > 500) {
                jumpDistance *= -1;
            }
            node.runAction(cc.sequence(cc.jumpBy(0.5, jumpDistance, 0, 100, 1), cc.delayTime(0.5), cc.moveTo(moveDuration, endPos).easing(cc.easeIn(3)), cc.callFunc(function () {
                if (callback) {
                    callback();
                }
                node.destroy();
            })));
        }
        else {
            node.runAction(cc.sequence(cc.moveTo(moveDuration, endPos).easing(cc.easeIn(3)), cc.callFunc(function () {
                if (callback) {
                    callback();
                }
                node.destroy();
            })));
        }
    };
    Utils3.SetSoundEffect = function (path) {
        GameData_1.GameBundle[3].load("GameRes3/" + path, cc.AudioClip, function (err, clip) {
            window.bgmAudioID = cc.audioEngine.playEffect(clip, false);
        });
    };
    Utils3.playBgmMusic = function (path, loop) {
        this.resumBgmMusic(path, loop);
    };
    Utils3.resumBgmMusic = function (path, loop) {
        var bgmPath = path || window.BGM;
        try {
            if (window.bgmAudioID >= 0) {
                cc.audioEngine.resume(window.bgmAudioID);
            }
            else {
                setTimeout(function () {
                    GameData_1.GameBundle[3].load("GameRes3/" + bgmPath, cc.AudioClip, function (err, clip) {
                        window.bgmAudioID = cc.audioEngine.playMusic(clip, true);
                    });
                }, 500);
            }
        }
        catch (err) {
            console.error(err);
            setTimeout(function () {
                GameData_1.GameBundle[3].load("GameRes3/" + bgmPath, cc.AudioClip, function (err, clip) {
                    window.bgmAudioID = cc.audioEngine.playMusic(clip, true);
                });
            }, 500);
        }
    };
    Utils3.stopBgmMusic = function () {
        try {
            if (window.bgmAudioID !== undefined) {
                cc.audioEngine.pause(window.bgmAudioID);
            }
        }
        catch (err) {
            console.warn(err);
        }
    };
    Utils3.formatSecToTime = function (seconds) {
        var timeString = "";
        if (seconds > -1) {
            var hours = Math.floor(seconds / 3600);
            var minutes = Math.floor(seconds / 60) % 60;
            var secs = seconds % 60;
            timeString = hours < 10 ? "0" + hours + ":" : hours + ":";
            if (minutes < 10) {
                timeString += "0";
            }
            timeString += minutes + ":";
            if (secs < 10) {
                timeString += "0";
            }
            timeString += secs;
        }
        return timeString;
    };
    Utils3.getMin = function (a, b) {
        return a > b ? b : a;
    };
    Utils3.getMax = function (a, b) {
        return a > b ? a : b;
    };
    Utils3.getMiddleIndex = function (start, end, useCeil) {
        var range = end - start;
        if (range % 2 === 0) {
            return range / 2 + start;
        }
        else {
            return useCeil ? Math.ceil(range / 2) + start : Math.floor(range / 2) + start;
        }
    };
    Utils3.dir = false;
    return Utils3;
}());
exports.Utils3 = Utils3;

cc._RF.pop();