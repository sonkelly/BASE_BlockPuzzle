"use strict";
cc._RF.push(module, '991ca62l0JCt6j6J2/zxpyJ', 'Utils');
// Scripts/Utils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AudioManager_1 = require("./AudioManager");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.nodePlayAnimation = function (node, animName) {
        var anim = node.getComponent(cc.Animation);
        if (anim) {
            animName ? anim.play(animName) : anim.play();
        }
    };
    Utils.nodePlayAnimationCall = function (node, animName, callback) {
        var anim = node.getComponent(cc.Animation);
        if (anim) {
            node.stopAllActions();
            animName ? anim.play(animName) : anim.play();
            anim.once("finished", function () {
                callback && callback();
            });
        }
    };
    Utils.addSoundEvent = function (armature) {
        armature.on(dragonBones.EventObject.SOUND_EVENT, function (event) {
            // Assuming AudioManager is available globally
            AudioManager_1.default.instance.playAniSound(event.name);
        });
    };
    Utils.playAni = function (armature, animName, playTimes) {
        if (playTimes === void 0) { playTimes = -1; }
        armature.playAnimation(animName, playTimes);
    };
    Utils.playAniCall = function (armature, animName, callback) {
        armature.once(dragonBones.EventObject.COMPLETE, function (event) {
            callback && callback(event.animationState.name);
        }, this);
        armature.playAnimation(animName, 1);
    };
    Utils.setSolt = function (armatureDisplay, slotName, displayIndex) {
        armatureDisplay.armature().getSlot(slotName).displayIndex = displayIndex;
    };
    Utils.loadDragonBones = function (armatureDisplay, path, armatureName, animName, completeCallback, loadCallback) {
        cc.resources.loadDir(path, function (err, assets) {
            if (err || assets.length <= 0) {
                console.error(err);
            }
            else {
                assets.forEach(function (asset) {
                    if (asset instanceof dragonBones.DragonBonesAsset) {
                        armatureDisplay.dragonAsset = asset;
                    }
                    else if (asset instanceof dragonBones.DragonBonesAtlasAsset) {
                        armatureDisplay.dragonAtlasAsset = asset;
                    }
                });
                armatureDisplay.armatureName = armatureName;
                armatureDisplay.playAnimation(animName, -1);
                if (completeCallback) {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, completeCallback);
                }
                loadCallback && loadCallback();
            }
        });
    };
    Utils.getAngle = function (pos1, pos2) {
        return Math.atan(pos2.y - pos1.y / pos2.x - pos1.x);
    };
    Utils.getDistance = function (pos1, pos2) {
        return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
    };
    Utils.getProbability = function (percent) {
        return 100 * Math.random() < percent;
    };
    Utils.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    Utils.replaceString = function (str, find, replace) {
        return str.replace(new RegExp(find, "g"), replace);
    };
    Utils.getArrayMax = function (arr) {
        var max = Math.max.apply(Math, arr);
        return arr.indexOf(max);
    };
    Utils.getArrayMin = function (arr) {
        var min = Math.min.apply(Math, arr);
        return arr.indexOf(min);
    };
    Utils.strToJson = function (str) {
        var obj = {};
        var pairs = str.split(",");
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split(":");
            obj[pair[0]] = pair[1];
        }
        return obj;
    };
    Utils.getJsonCount = function (obj) {
        return Object.keys(obj).length;
    };
    Utils.equalItemNum = function (arr, target) {
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (target === arr[i]) {
                count++;
            }
        }
        return count;
    };
    Utils.uniqueArray = function (arr) {
        return Array.from(new Set(arr));
    };
    Utils.getArrRandomIndex = function (arr, count) {
        var indices = [];
        for (var i = 0; i < arr.length; i++) {
            indices.push(i);
        }
        var result = [];
        for (var i = 0; i < count; i++) {
            var randomIndex = this.getRandom(0, indices.length);
            result.push(indices[randomIndex]);
            indices.splice(randomIndex, 1);
        }
        return result;
    };
    Utils.get2AryIntersect = function (arr1, arr2) {
        var result = [];
        for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < arr2.length; j++) {
                if (arr2[j] === arr1[i]) {
                    result.push(arr2[j]);
                }
            }
        }
        return result;
    };
    Utils.check2AryIsEqual = function (arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            if (arr2[i] !== arr1[i]) {
                return false;
            }
        }
        return true;
    };
    Utils.check4AryIsEqual = function (arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (var i = 0; i < arr1.length; i++) {
            if (arr2[i][0] !== arr1[i][0]) {
                return false;
            }
        }
        return true;
    };
    Utils.angleToVectos = function (angle, vector) {
        var rad = cc.misc.degreesToRadians(angle);
        var rotated = vector.rotate(-rad);
        return cc.v2(rotated.x, rotated.y);
    };
    Utils.vectosToAngle = function (vec1, vec2) {
        var angle = vec1.signAngle(vec2);
        return cc.misc.radiansToDegrees(angle);
    };
    Utils.exchangePosition = function (node1, node2) {
        var tempPos = cc.v2(node1.x, node1.y);
        node1.position = cc.v2(node2.x, node2.y);
        node2.position = tempPos;
    };
    Utils.loadPrefab = function (path, name, autoAddToCanvas) {
        var _this = this;
        if (autoAddToCanvas === void 0) { autoAddToCanvas = true; }
        cc.resources.load(path + "/" + name, function (err, prefab) {
            if (err) {
                console.error(_this.TAG, "加载预制资源失败, 原因:" + err);
            }
            else if (prefab instanceof cc.Prefab) {
                if (autoAddToCanvas) {
                    var node = cc.instantiate(prefab);
                    node.name = name;
                    cc.find("Canvas").addChild(node);
                }
            }
            else {
                console.error(_this.TAG, "你加载的不是预制资源!");
            }
        });
    };
    Utils.ShowAsk = function (message) {
        var node = new cc.Node();
        node.parent = cc.director.getScene();
        var sprite = node.addComponent(cc.Sprite);
        cc.resources.load("public/fj_tishidi", cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });
        cc.tween(node)
            .set({
            scale: 0.6,
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2 - 200,
            zIndex: cc.macro.MAX_ZINDEX
        })
            .to(0.5, {
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        }, { easing: "backOut" })
            .delay(0.5)
            .call(function () {
            node.destroy();
        })
            .start();
        var labelNode = new cc.Node();
        labelNode.parent = node;
        var label = labelNode.addComponent(cc.Label);
        var formattedMsg = cc.js.formatStr("%s", message);
        label.string = formattedMsg;
        label.fontSize = 50;
        label.lineHeight = 60;
    };
    Utils.TAG = "Utils===>>>";
    return Utils;
}());
exports.default = Utils;

cc._RF.pop();