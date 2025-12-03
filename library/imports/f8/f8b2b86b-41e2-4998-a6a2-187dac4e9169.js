"use strict";
cc._RF.push(module, 'f8b2bhrQeJJmKaiGH2sTpFp', 'kuaiM');
// Scripts/kuaiM.ts

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
var AudioManager_1 = require("./AudioManager");
var clientEvent_1 = require("./clientEvent");
var ExtendScript_1 = require("./ExtendScript");
var Property_1 = require("./Property");
var resourceUtil_1 = require("./resourceUtil");
var GameData_1 = require("./GameData");
var kuaiM = /** @class */ (function (_super) {
    __extends(kuaiM, _super);
    function kuaiM() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._colorType = -1;
        _this._shapeType = -1;
        _this._width = 0;
        _this._height = 0;
        _this.touchDate = -1;
        _this.blockPos = [];
        _this.index = 0;
        _this.checkFrameList = [];
        _this.checkFKlist = [];
        _this.checkIndex = [];
        _this.checkIndexClone = [];
        _this.ox = 0;
        _this.oy = 0;
        return _this;
    }
    kuaiM.prototype.onLoad = function () {
        this.touchDate = -1;
        this.blockPos = [];
    };
    kuaiM.prototype.init = function (e, t, o, n) {
        var _this = this;
        if (o === undefined)
            o = true;
        this.index = n;
        this.checkFrameList = [];
        this.checkFKlist = [];
        this.checkIndex = [];
        this.checkIndexClone = [];
        this._colorType = e;
        this._shapeType = t;
        cc.tween(this.node)
            .set({ scale: 0 })
            .to(0.2, { scale: Property_1.BlockConfig.scaleParam })
            .call(function () {
            if (o)
                _this.addTouchEvent();
        })
            .start();
        var children = this.node.children;
        for (var r = 0; r < children.length; r++) {
            var block = children[r].getComponent("block");
            block._move = 1;
            block.initial(this._colorType);
        }
        this.ox = this.node.x;
        this.oy = this.node.y;
        this._width = this.node.width;
        this._height = this.node.height;
        this.node.width = 380;
        this.node.height = 380;
    };
    kuaiM.prototype.scaleChildren = function (e) {
        var children = this.node.children;
        if (e) {
            this.checkFrameList = [];
            this.node.x = this.ox;
            this.node.y = this.oy;
            this.node.scale = Property_1.BlockConfig.scaleParam;
            for (var o = 0; o < children.length; o++) {
                children[o].scale = 1;
            }
        }
        else {
            AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.BSelect);
            this.node.scale = Property_1.BlockConfig[Property_1.GameMode].wh / Property_1.BlockConfig.normalWH;
            for (var n = 0; n < children.length; n++) {
                children[n].scale = Property_1.GameMode == Property_1.MODE.JINGDIAN ?
                    Property_1.BlockConfig.blockScale :
                    Property_1.BlockConfig[Property_1.GameMode].wh / Property_1.BlockConfig.normalWH;
            }
        }
    };
    kuaiM.prototype.addTouchEvent = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            if (GameData_1.GameData.isTouch == 0) {
                _this.touchDate = new Date().getTime();
                GameData_1.GameData.isTouch = _this.touchDate;
                GameData_1.GameData.blockIndex = _this.index;
                _this.node.y += Property_1.BlockConfig.upH;
                _this.scaleChildren(false);
                clientEvent_1.default.dispatchEvent("curCickKuaiM", _this);
                if (_this.blockPos.length == 1) {
                    for (var t = 0; t < _this.blockPos[0].length; t++) {
                        _this.blockPos[0][t].getComponent(ExtendScript_1.default).showOpacity();
                    }
                }
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            if (GameData_1.GameData.isTouch == _this.touchDate) {
                var delta = t.touch.getDelta();
                _this.node.x += delta.x;
                _this.node.y += delta.y;
                _this.collisionFunc();
                if (_this.checkIsCanDrop()) {
                    _this.changeColorDeal();
                }
                else {
                    _this.cleanFrameAll();
                }
                GameData_1.GameData.gameDataBind.boardFrame.checkXC();
            }
        }, this);
        var touchEndHandler = function () {
            if (GameData_1.GameData.isTouch == _this.touchDate) {
                if (_this.blockPos.length == 1) {
                    for (var t = 0; t < _this.blockPos[0].length; t++) {
                        _this.blockPos[0][t].getComponent(ExtendScript_1.default).hideOpacity();
                    }
                }
                GameData_1.GameData.isTouch = 0;
                _this.dropDownFunc();
            }
        };
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, touchEndHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, touchEndHandler, this);
    };
    kuaiM.prototype.checkIsLose = function () {
        this.blockPos = [];
        var e = cc.instantiate(this.node);
        var children = e.children;
        e.opacity = 0;
        e.scale = Property_1.BlockConfig[Property_1.GameMode].wh / Property_1.BlockConfig.normalWH;
        e.parent = this.node.parent;
        var firstChild = children[0];
        var offsetX = firstChild.x > 0 ? -firstChild.x : firstChild.x;
        var offsetY = firstChild.y > 0 ? -firstChild.y : firstChild.y;
        for (var a = 0; a < children.length; a++) {
            children[a].x += offsetX;
            children[a].y += offsetY;
        }
        for (var i = 0; i < GameData_1.GameData.gameDataBind.boardFrame.frameList.length; i++) {
            var worldPos = GameData_1.GameData.gameDataBind.boardFrame.node.convertToWorldSpaceAR(GameData_1.GameData.gameDataBind.boardFrame.frameList[i].position);
            var localPos = this.node.parent.convertToNodeSpaceAR(worldPos);
            e.setPosition(localPos);
            var c = [];
            for (var l = 0; l < children.length; l++) {
                var childWorldPos = e.convertToWorldSpaceAR(cc.v2(children[l].x, children[l].y));
                var frameLocalPos = GameData_1.GameData.gameDataBind.boardFrame.node.convertToNodeSpaceAR(childWorldPos);
                var frame = this.checkPosFuncAAA(frameLocalPos);
                if (frame) {
                    c.push(frame);
                }
            }
            if (c.length >= children.length) {
                this.blockPos.push(c);
            }
        }
        e.parent = null;
        e.destroy();
        return this.blockPos.length > 0 ? false : (this.blockPos = [], true);
    };
    kuaiM.prototype.collisionFunc = function () {
        if (this.checkIndex.length != 0) {
            this.checkIndexClone = this.checkIndex.concat();
        }
        this.checkFrameList = [];
        this.checkFKlist = [];
        this.checkIndex = [];
        var children = this.node.children;
        for (var t = 0; t < children.length; t++) {
            var worldPos = this.node.convertToWorldSpaceAR(cc.v2(children[t].x, children[t].y));
            var localPos = GameData_1.GameData.gameDataBind.boardFrame.node.convertToNodeSpaceAR(worldPos);
            var frame = this.checkPosFunc(localPos);
            if (frame) {
                this.checkFKlist.push(children[t]);
                this.checkFrameList.push(frame);
                children[t].getComponent("block").index = frame.getComponent("kuaiFrame").index;
                this.checkIndex.push(frame.getComponent("kuaiFrame").index);
            }
        }
    };
    kuaiM.prototype.checkPosFunc = function (e) {
        var threshold = Property_1.BlockConfig[Property_1.GameMode].wh / 2 - 0.1;
        for (var o = 0; o < GameData_1.GameData.gameDataBind.boardFrame.frameList.length; o++) {
            var frame = GameData_1.GameData.gameDataBind.boardFrame.frameList[o];
            if (!frame.getComponent("kuaiFrame").isHaveFK) {
                var dx = Math.abs(frame.x - e.x);
                var dy = Math.abs(frame.y - e.y);
                if ((dx <= threshold && dy < threshold) || (dy <= threshold && dx < threshold)) {
                    return frame;
                }
            }
        }
        return null;
    };
    kuaiM.prototype.checkPosFuncAAA = function (e) {
        var threshold = Property_1.BlockConfig[Property_1.GameMode].wh / 2;
        for (var o = 0; o < GameData_1.GameData.gameDataBind.boardFrame.frameList.length; o++) {
            var frame = GameData_1.GameData.gameDataBind.boardFrame.frameList[o];
            if (!frame.getComponent("kuaiFrame").isHaveFK) {
                var dx = Math.abs(frame.x - e.x);
                var dy = Math.abs(frame.y - e.y);
                if ((dx <= threshold && dy < threshold) || (dy <= threshold && dx < threshold)) {
                    return frame;
                }
            }
        }
        return null;
    };
    kuaiM.prototype.checkIsCanDrop = function () {
        if (this.checkFrameList.length == 0 ||
            this.checkFrameList.length != this.node.children.length) {
            return false;
        }
        for (var e = 0; e < this.checkFrameList.length; e++) {
            if (this.checkFrameList[e].getComponent("kuaiFrame").isHaveFK) {
                return false;
            }
        }
        return true;
    };
    kuaiM.prototype.dropDownFunc = function () {
        this.cleanFrameAll();
        if (!this.checkIsCanDrop()) {
            this.scaleChildren(true);
            if (Property_1.GameMode == Property_1.MODE.JINGDIAN && GameData_1.GameData.teaching < 3) {
                GameData_1.GameData.gameDataBind.boardFrame.showTeaching(true);
            }
            else if (Property_1.GameMode == Property_1.MODE.TEACH && GameData_1.GameData.teachingXS < 3) {
                GameData_1.GameData.gameDataBind.boardFrame.showTeaching(true);
            }
            return;
        }
        AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.BDown);
        var blockData = {
            x: 0,
            y: 0,
            zIndex: -1,
            scale: 1
        };
        for (var t = 0; t < this.checkFKlist.length; t++) {
            var block = this.checkFKlist[t];
            block.x = blockData.x;
            block.y = blockData.y;
            block.scale = blockData.scale;
            block.zIndex = blockData.zIndex;
            block.parent = this.checkFrameList[t];
            blockData.type = block.getComponent("block")._cType;
            var frame = this.checkFrameList[t].getComponent("kuaiFrame");
            frame.isHaveFK = true;
            frame.simulateFK = true;
            frame.putState = true;
            if (Property_1.GameMode == Property_1.MODE.JINGDIAN) {
                var frameInfo = frame.getInfo();
                GameData_1.GameData.blockData[frameInfo.index] = frameInfo;
                GameData_1.GameData.blockData[frameInfo.index].knData = blockData;
                GameData_1.GameData.saveData();
            }
        }
        this.node.parent = null;
        if (Property_1.GameMode == Property_1.MODE.JIEMI) {
            var blockNum = GameData_1.GameData.gameDataBind.kuaiManager.getBlockNum();
            blockNum--;
            GameData_1.GameData.gameDataBind.kuaiManager.setBlockNum(blockNum);
        }
        clientEvent_1.default.dispatchEvent("blockPut");
        this.clean();
    };
    kuaiM.prototype.changeColorDeal = function () {
        if (this.checkIndexClone.length > 0 &&
            Utils.check2AryIsEqual(this.checkIndexClone, this.checkIndex)) {
            return;
        }
        this.cleanFrameAll();
        for (var e = 0; e < this.checkFrameList.length; e++) {
            var frame = this.checkFrameList[e].getComponent("kuaiFrame");
            frame.showColor(this._colorType);
            frame.simulateFK = true;
        }
        for (var o = 0; o < this.checkIndexClone.length; o++) {
            var shouldHide = true;
            for (var a = 0; a < this.checkIndex.length; a++) {
                if (this.checkIndexClone[o] === this.checkIndex[a]) {
                    shouldHide = false;
                    break;
                }
            }
            if (shouldHide) {
                var frameIndex = this.checkIndexClone[o] - 1;
                var frame = GameData_1.GameData.gameDataBind.boardFrame.frameList[frameIndex].getComponent("kuaiFrame");
                frame.hideColor();
                frame.simulateFK = null;
            }
        }
    };
    kuaiM.prototype.cleanFrameAll = function () {
        this.checkIndexClone = [];
        this.checkIndex = [];
        for (var e = 0; e < GameData_1.GameData.gameDataBind.boardFrame.frameList.length; e++) {
            var frame = GameData_1.GameData.gameDataBind.boardFrame.frameList[e].getComponent("kuaiFrame");
            frame.simulateFK = frame.isHaveFK;
            frame.hideColor();
            frame.putState = false;
        }
    };
    kuaiM.prototype.setGrayKuai = function () {
        var children = this.node.children;
        for (var t = 0; t < children.length; t++) {
            resourceUtil_1.default.instance.setSpriteFrame("kuai/huiKuai", children[t].getComponent(cc.Sprite));
        }
    };
    kuaiM.prototype.recoveryKuai = function () {
        var children = this.node.children;
        for (var t = 0; t < children.length; t++) {
            resourceUtil_1.default.instance.setSpriteFrame("kuai/k" + this._colorType, children[t].getComponent(cc.Sprite));
        }
    };
    kuaiM.prototype.clean = function () {
        this.node.destroy();
    };
    __decorate([
        property
    ], kuaiM.prototype, "_colorType", void 0);
    __decorate([
        property
    ], kuaiM.prototype, "_shapeType", void 0);
    __decorate([
        property
    ], kuaiM.prototype, "_width", void 0);
    __decorate([
        property
    ], kuaiM.prototype, "_height", void 0);
    kuaiM = __decorate([
        ccclass
    ], kuaiM);
    return kuaiM;
}(ExtendScript_1.default));
exports.default = kuaiM;

cc._RF.pop();