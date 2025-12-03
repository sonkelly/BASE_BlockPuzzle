"use strict";
cc._RF.push(module, '1f9a1kYYphMVJCUwKqS3Bys', 'ShapeItem');
// Scripts/ShapeItem.ts

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
var GameMain_1 = require("./GameMain");
var Utils3_1 = require("./Utils3");
var ShapeItem = /** @class */ (function (_super) {
    __extends(ShapeItem, _super);
    function ShapeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_spa_blocklist = null;
        _this.GameLayer = null;
        _this._bg_color = "";
        _this._type_index = 0;
        _this._colorindex = 1;
        _this._blockcount = 0;
        _this._next = null;
        _this._data = null;
        _this._checkFrameList = [];
        _this._checkFKlist = [];
        return _this;
    }
    ShapeItem_1 = ShapeItem;
    ShapeItem.prototype.start = function () {
        this._bg_color = "";
        this._type_index = 0;
        this._colorindex = 1;
        if (window['INIT_GAME_SAVE_DATA'].top_level < 1 && !window['GUIDE_LEVEL']) {
            this.resetBlock(22);
            this.GameLayer.showGuide();
        }
        else {
            this.resetBlock();
        }
        this.addTouchEvent();
        this._blockcount = 0;
    };
    ShapeItem.prototype.updateIndex = function (updateSprite) {
        var skinData = window['INIT_GAME_SAVE_DATA'].skin;
        for (var i = 0; i < skinData.length; i++) {
            if (skinData[i] >= 2) {
                this._type_index = i;
                break;
            }
        }
        this._data = window['SKIN_CONFIG'][this._type_index];
        if (updateSprite) {
            var shapeNode = this.node.getChildByName("n_shape");
            if (shapeNode) {
                for (var i = 0; i < shapeNode.childrenCount; i++) {
                    var sprite = shapeNode.children[i].getComponent(cc.Sprite);
                    sprite.spriteFrame = this.m_spa_blocklist.getSpriteFrame(this._data.name + this._colorindex);
                }
            }
        }
        return this._type_index;
    };
    ShapeItem.prototype.getTheConfig = function () {
        var t = 109.77249200050075;
        var e = 110;
        var i = Math.cos(60 * Math.PI / 180);
        var n = Math.sin(60 * Math.PI / 180);
        var o = Math.cos(120 * Math.PI / 180);
        var c = Math.sin(120 * Math.PI / 180);
        var s = Math.cos(300 * Math.PI / 180);
        var a = Math.sin(300 * Math.PI / 180);
        return [
            [cc.v2(0, 0)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(330, 0)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(e + i * t, n * t)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(e + s * t, a * t)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(i * t, n * t)],
            [cc.v2(0, 0), cc.v2(e, 0), cc.v2(220, 0), cc.v2(s * t, a * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(o * t, c * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(o * t + i * t, c * t + n * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(e, 0)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(i * t + e, n * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t * 2, n * t * 2), cc.v2(i * t * 3, n * t * 3)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(o * t * 2 + e, c * t * 2)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(o * t - e, c * t)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(o * t + e, c * t)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(-e, 0)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(o * t * 2, c * t * 2), cc.v2(o * t * 3, c * t * 3)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(i * t + e, n * t), cc.v2(220, 0)],
            [cc.v2(0, 0), cc.v2(s * t, a * t), cc.v2(s * t + e, a * t), cc.v2(220, 0)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(0, 190), cc.v2(e, 190)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(0, 190), cc.v2(-e, 190)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(0, 190), cc.v2(e, 0)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(0, 190), cc.v2(-e, 0)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(0, 190), cc.v2(s * t, 190 + a * t)],
            [cc.v2(0, 0), cc.v2(i * t, n * t), cc.v2(e, 0), cc.v2(i * t + e, n * t)],
            [cc.v2(0, 0), cc.v2(o * t, c * t), cc.v2(-e, 0), cc.v2(o * t - e, c * t)]
        ];
    };
    ShapeItem.prototype.newOneK = function (colorIndex) {
        var node = new cc.Node("colorSpr");
        node['colorIndex'] = colorIndex;
        node['colorName'] = this._data.name;
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.m_spa_blocklist.getSpriteFrame(this._data.name + colorIndex);
        return node;
    };
    ShapeItem.prototype.getCurColorIndex = function () {
        return this._colorindex;
    };
    ShapeItem.prototype.createItem = function (typeIndex) {
        this._blockcount++;
        if (this._blockcount >= 5) {
            this._next = 0;
            this._blockcount = 0;
        }
        if (typeof this._next === 'number' && !typeIndex) {
            typeIndex = this._next;
            this._next = null;
            if (typeIndex === 0) {
                this._blockcount = 0;
            }
        }
        var shapeNode = new cc.Node("n_shape");
        var configs = this.getTheConfig();
        var configIndex = Utils3_1.Utils3.random(0, configs.length);
        if (typeof typeIndex === 'number' && typeIndex >= 0) {
            configIndex = typeIndex;
        }
        if (configIndex === 0) {
            this._blockcount = 0;
        }
        var shapeConfig = configs[configIndex];
        var colorIndex = Utils3_1.Utils3.random(1, 5);
        this._bg_color = ShapeItem_1.COLORS[colorIndex];
        this._colorindex = colorIndex;
        var totalX = 0;
        var countX = 0;
        var totalY = 0;
        var countY = 0;
        for (var i = 0; i < shapeConfig.length; i++) {
            var pos = shapeConfig[i];
            var blockNode = this.newOneK(colorIndex);
            blockNode.x = pos.x;
            totalX += blockNode.x;
            countX++;
            blockNode.y = pos.y;
            totalY += blockNode.y;
            countY++;
            shapeNode.addChild(blockNode);
        }
        shapeNode.setScale(0.5);
        shapeNode.x = -totalX / countX * 0.5;
        shapeNode.y = -totalY / countY * 0.5;
        return shapeNode;
    };
    ShapeItem.prototype.addTouchEvent = function () {
        var self = this;
        this.node['ox'] = this.node.x;
        this.node['oy'] = this.node.y;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            this.node.y += 130;
            Utils3_1.Utils3.SetSoundEffect(window['BUTTON_CLICK_MUSIC'], false, 0.8);
            this.node.getChildByName("n_shape").setScale(1);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            this.node.x += delta.x;
            this.node.y += delta.y;
            self.collisionFunc();
            if (self.checkIsCanDrop()) {
                self.changeColorDeal();
            }
            else {
                self.changeColorDeal(true);
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.dropDownFunc();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.dropDownFunc();
        }, this);
    };
    ShapeItem.prototype.checkIsCanDrop = function () {
        if (!this._checkFrameList || this._checkFrameList.length === 0 ||
            this._checkFrameList.length !== this.node.children[0].children.length) {
            return false;
        }
        for (var i = 0; i < this._checkFrameList.length; i++) {
            if (this._checkFrameList[i]['isHaveFK']) {
                return false;
            }
        }
        return true;
    };
    ShapeItem.prototype.changeColorDeal = function (reset) {
        if (reset === void 0) { reset = false; }
        var mapArray = this.GameLayer.m_maparray;
        for (var i = 0; i < mapArray.length; i++) {
            mapArray[i].getComponent("BlockBGItem").setBrightVisible(false);
        }
        if (!reset) {
            for (var i = 0; i < this._checkFrameList.length; i++) {
                this._checkFrameList[i].getComponent("BlockBGItem").setBrightVisible(true, this._bg_color);
            }
        }
    };
    ShapeItem.prototype.collisionFunc = function () {
        this._checkFrameList = [];
        this._checkFKlist = [];
        var shapeChildren = this.node.children[0].children;
        for (var i = 0; i < shapeChildren.length; i++) {
            var childPos = cc.v2(this.node.children[0].x, this.node.children[0].y)
                .add(cc.v2(shapeChildren[i].x, shapeChildren[i].y));
            var worldPos = this.node.position.add(childPos);
            var frameNode = this.checkPosFunc(worldPos);
            if (frameNode) {
                this._checkFKlist.push(shapeChildren[i]);
                this._checkFrameList.push(frameNode);
            }
        }
    };
    ShapeItem.prototype.checkPosFunc = function (position) {
        var mapArray = this.GameLayer.m_maparray;
        for (var i = 0; i < mapArray.length; i++) {
            var node = mapArray[i];
            if (cc.v2(node.x, node.y).sub(position).mag() <= 52) {
                return node;
            }
        }
        return null;
    };
    ShapeItem.prototype.dropDownFunc = function () {
        if (this.checkIsCanDrop()) {
            for (var i = 0; i < this._checkFKlist.length; i++) {
                this._checkFKlist[i].x = 0;
                this._checkFKlist[i].y = 0;
                this._checkFKlist[i].parent = this._checkFrameList[i];
                this._checkFrameList[i]['isHaveFK'] = true;
                this._checkFKlist[i].runAction(cc.sequence(cc.scaleTo(0.1, 1.1, 0.8), cc.scaleTo(0.15, 0.9, 1.1), cc.scaleTo(0.015, 1.1, 0.9), cc.scaleTo(0.2, 1, 1)));
            }
            this.GameLayer.hideGuide();
            this.node.removeAllChildren();
            var newShape = this.createItem();
            this.node.addChild(newShape);
            Utils3_1.Utils3.SetSoundEffect(window['BUTTON_CLICK_MUSIC'], false, 0.8);
            this.GameLayer.addScore(this._checkFKlist.length, true);
            this.GameLayer.checkClearUp();
            this.takeBack();
            this.GameLayer.checkIsLose();
        }
        else {
            this.takeBack();
        }
    };
    ShapeItem.prototype.takeBack = function () {
        this._checkFrameList = [];
        this.changeColorDeal(true);
        this.node.getChildByName("n_shape").setScale(0.5);
        this.node.x = this.node['ox'];
        this.node.y = this.node['oy'];
    };
    ShapeItem.prototype.checkIsLose = function () {
        var validPositions = 0;
        var shapeChildren = this.node.children[0].children;
        for (var i = 0; i < this.GameLayer.m_maparray.length; i++) {
            var mapNode = this.GameLayer.m_maparray[i];
            var mapPos = cc.v2(mapNode.x, mapNode.y);
            var validCount = 1;
            if (!mapNode['isHaveFK']) {
                for (var j = 1; j < shapeChildren.length; j++) {
                    var childWorldPos = mapPos.add(cc.v2(shapeChildren[j].x, shapeChildren[j].y));
                    for (var k = 0; k < this.GameLayer.m_maparray.length; k++) {
                        var checkNode = this.GameLayer.m_maparray[k];
                        if (cc.v2(checkNode.x, checkNode.y).sub(childWorldPos).mag() <= 52 &&
                            !checkNode['isHaveFK']) {
                            validCount++;
                        }
                    }
                }
                if (validCount === shapeChildren.length) {
                    validPositions++;
                }
            }
        }
        return validPositions === 0;
    };
    ShapeItem.prototype.resetBlock = function (typeIndex) {
        this.node.removeAllChildren();
        this.updateIndex(false);
        var newShape = this.createItem(typeIndex);
        this.node.addChild(newShape);
    };
    ShapeItem.prototype.setNextBlock = function (nextIndex) {
        this._next = nextIndex;
    };
    var ShapeItem_1;
    ShapeItem.COLORS = ["#ffffff", "#f9bd1d", "#003DFF", "#85d546", "#D6309A"];
    __decorate([
        property(cc.SpriteAtlas)
    ], ShapeItem.prototype, "m_spa_blocklist", void 0);
    __decorate([
        property(GameMain_1.default)
    ], ShapeItem.prototype, "GameLayer", void 0);
    ShapeItem = ShapeItem_1 = __decorate([
        ccclass
    ], ShapeItem);
    return ShapeItem;
}(cc.Component));
exports.default = ShapeItem;

cc._RF.pop();