"use strict";
cc._RF.push(module, '19a5acwfahDIaDY1A11EEwe', 'playEffect');
// Scripts/playEffect.ts

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
var ExtendScript_1 = require("./ExtendScript");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var POP_NAMES = {
    2: "popFlatter1",
    3: "popFlatter2",
    4: "popFlatter3",
    5: "popFlatter4",
    6: "popFlatter5",
};
var PlayEffect = /** @class */ (function (_super) {
    __extends(PlayEffect, _super);
    function PlayEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popFlatter = null;
        _this.popCombo = null;
        _this.popComboScore = null;
        _this.popEliminateScore = null;
        return _this;
    }
    PlayEffect.prototype.playEliminate = function (data) {
        var node = cc.instantiate(this.popEliminateScore);
        var parent = this.node;
        var PopEliminate = cc.Class({
            extends: cc.Component,
            initial: function (e) {
                var _this = this;
                this.node.parent = parent;
                this.node.setPosition(e.pos);
                var lineNode = this.node.children[e.disLine - 1];
                if (!lineNode)
                    return;
                lineNode.active = true;
                var loadDigit = function (index) {
                    var digitNode = lineNode.children[index];
                    cc.resources.load("image/number/" + e.colorType + "_" + digitNode.name, cc.SpriteFrame, function (err, spriteFrame) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        digitNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                };
                for (var i = 0; i < lineNode.children.length; i++) {
                    loadDigit(i);
                }
                cc.tween(this.node)
                    .to(0.3, { scale: 1 })
                    .delay(0.5)
                    .call(function () { return _this.clean(); })
                    .start();
            },
            clean: function () {
                this.node.destroy();
            },
        });
        node.addComponent(PopEliminate);
        node.getComponent(PopEliminate).initial(data);
    };
    PlayEffect.prototype.playCombo = function (data) {
        var _this = this;
        var comboNode = cc.instantiate(this.popCombo);
        comboNode.parent = this.node;
        comboNode.position = data.pos;
        // Giới hạn vị trí X
        comboNode.x = Math.max(-140, Math.min(150, comboNode.x));
        comboNode.getChildByName("combo1").active = data.comTimes < 2;
        comboNode.getChildByName("combo").active = data.comTimes > 1;
        comboNode.getChildByName("combo_ske").scale = data.comTimes > 1 ? 1 : 0;
        comboNode.getChildByName("Label_combo").active = data.comTimes > 1;
        var comboLabel = comboNode
            .getChildByName("Label_combo")
            .getComponent(cc.Label);
        comboLabel.string = data.comTimes.toString();
        this.scheduleOnce(function () {
            comboNode.destroy();
            _this.playComboScore(data.score, data.pos2);
        }, 1.67);
    };
    PlayEffect.prototype.playComboScore = function (score, pos) {
        var scoreNode = cc.instantiate(this.popComboScore);
        scoreNode.parent = this.node;
        scoreNode.position = pos;
        var label = scoreNode
            .getChildByName("Label_score")
            .getComponent(cc.Label);
        label.string = "+" + score;
        Utils_1.default.nodePlayAnimationCall(scoreNode, null, function () {
            cc.tween(scoreNode)
                .to(0.2, { x: 0, y: 410 })
                .call(function () { return scoreNode.destroy(); })
                .start();
        });
    };
    PlayEffect.prototype.playMultiRow = function (row, pos) {
        if (row < 2)
            return;
        var flatterNode = cc.instantiate(this.popFlatter);
        flatterNode.parent = this.node;
        flatterNode.position = pos;
        Utils_1.default.nodePlayAnimationCall(flatterNode, POP_NAMES[row], function () {
            flatterNode.destroy();
        });
    };
    __decorate([
        property(cc.Prefab)
    ], PlayEffect.prototype, "popFlatter", void 0);
    __decorate([
        property(cc.Prefab)
    ], PlayEffect.prototype, "popCombo", void 0);
    __decorate([
        property(cc.Prefab)
    ], PlayEffect.prototype, "popComboScore", void 0);
    __decorate([
        property(cc.Prefab)
    ], PlayEffect.prototype, "popEliminateScore", void 0);
    PlayEffect = __decorate([
        ccclass
    ], PlayEffect);
    return PlayEffect;
}(ExtendScript_1.default));
exports.default = PlayEffect;

cc._RF.pop();