"use strict";
cc._RF.push(module, 'e86c4IQJUlMkYyo23RKxCcV', 'GameStep');
// Scripts/GameStep.ts

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
var ConstValue_1 = require("./ConstValue");
var GameStep = /** @class */ (function (_super) {
    __extends(GameStep, _super);
    function GameStep() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_spa_list = null;
        _this.m_n_bigstepcontent = null;
        _this.m_sp_mystepicon = null;
        _this.m_sp_mystepname = null;
        _this.m_n_mystarlist = [];
        _this.m_pre_bigstep = null;
        _this.m_nodepoll = null;
        return _this;
    }
    GameStep.prototype.start = function () {
        var stepCount = ConstValue_1.default.STEP_CONFIG.length;
        this.m_n_bigstepcontent.height = 115 * stepCount + 20 * (stepCount - 1);
        for (var i = stepCount - 1, e = 0; i >= 0; i--) {
            var node = cc.instantiate(this.m_pre_bigstep);
            node.x = 0;
            node.y = -62 - (stepCount - i - 1) * (node.height + 20);
            this.m_n_bigstepcontent.addChild(node);
            var stepConfig = ConstValue_1.default.STEP_CONFIG[i];
            var colorIndex = e % 4;
            var bigStepItem = node.getComponent("BigStepItem");
            bigStepItem.updateData(stepConfig, this.m_spa_list.getSpriteFrame(stepConfig.icon_path), this.m_spa_list.getSpriteFrame(stepConfig.desc_path), window.INIT_GAME_SAVE_DATA.top_level, colorIndex);
            e++;
        }
        this.m_n_bigstepcontent.parent.parent.getComponent(cc.ScrollView).scrollToOffset(cc.v2(0, this.m_n_bigstepcontent.height));
        this.initMyData();
    };
    GameStep.prototype.onToggleClick = function () {
        // Implementation for toggle click
    };
    GameStep.prototype.initMyData = function () {
        var topLevel = window.INIT_GAME_SAVE_DATA.top_level;
        var stepData = this.getMyStepData(topLevel);
        if (stepData) {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame(stepData.icon_path);
            this.m_sp_mystepname.spriteFrame = this.m_spa_list.getSpriteFrame(stepData.desc_path);
            for (var i = 0; i < this.m_n_mystarlist.length; i++) {
                this.m_n_mystarlist[i].active = i < stepData.star;
            }
        }
        else {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame("stepicon6");
            this.m_sp_mystepname.spriteFrame = this.m_spa_list.getSpriteFrame("stepname6");
            for (var i = 0; i < this.m_n_mystarlist.length; i++) {
                this.m_n_mystarlist[i].active = i <= 0;
            }
        }
    };
    GameStep.prototype.onBackHome = function () {
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.HALL_SCENE_NAME);
    };
    GameStep.prototype.getMyStepData = function (level) {
        var stepIndex = Math.floor(level / 10);
        if (stepIndex <= 0) {
            return null;
        }
        if (stepIndex > ConstValue_1.default.STEP_CONFIG.length) {
            stepIndex = ConstValue_1.default.STEP_CONFIG.length;
        }
        return ConstValue_1.default.STEP_CONFIG[stepIndex - 1];
    };
    GameStep.prototype.onDestroy = function () {
        if (this.m_nodepoll) {
            this.m_nodepoll.clear();
        }
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], GameStep.prototype, "m_spa_list", void 0);
    __decorate([
        property(cc.Node)
    ], GameStep.prototype, "m_n_bigstepcontent", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameStep.prototype, "m_sp_mystepicon", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameStep.prototype, "m_sp_mystepname", void 0);
    __decorate([
        property([cc.Node])
    ], GameStep.prototype, "m_n_mystarlist", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameStep.prototype, "m_pre_bigstep", void 0);
    GameStep = __decorate([
        ccclass
    ], GameStep);
    return GameStep;
}(cc.Component));
exports.default = GameStep;

cc._RF.pop();