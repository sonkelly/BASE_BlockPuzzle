"use strict";
cc._RF.push(module, 'ed269lnL8BKEqT+ldPwo4Xu', 'GameResult');
// Scripts/GameResult.ts

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
var RankList_1 = require("./RankList");
var ShareSdk_1 = require("./ShareSdk");
var Utils3_1 = require("./Utils3");
var GameResult = /** @class */ (function (_super) {
    __extends(GameResult, _super);
    function GameResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_fail = null;
        _this.m_sp_titlef = null;
        _this.m_btn_again = null;
        _this.m_btn_share = null;
        _this._score = 0;
        _this._monster_num = 0;
        return _this;
    }
    GameResult.prototype.start = function () { };
    GameResult.prototype.showVictory = function () { };
    GameResult.prototype.showFail = function (t, e, n) {
        this._score = e;
        this._monster_num = n;
        this.node.active = true;
        this.m_n_fail.active = true;
        this.m_n_fail.y = -cc.winSize.height / 2;
        this.m_n_fail.runAction(cc.sequence(cc.moveTo(0.5, 0, 0).easing(cc.easeIn(3)), cc.callFunc(function () { })));
        this.m_sp_titlef.stopAllActions();
        this.m_sp_titlef.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, 0, 10), cc.moveBy(0.5, 0, -10))));
        this.m_btn_again.active = true;
        RankList_1.default.showGameResultList();
    };
    GameResult.prototype.onBackToMenu = function () {
        Utils3_1.Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.HALL_SCENE_NAME);
    };
    GameResult.prototype.onAgainPlay = function () {
        Utils3_1.Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.GAME_SCENE_NAME);
    };
    GameResult.prototype.onResultShare = function () {
        if (ShareSdk_1.ShareSdk) {
            // ShareSdk.shareAppMessage({
            //     title: "Come and help it!",
            //     imageUrl: window.tempFileURL[2],
            //     success: () => {},
            //     fail: () => {},
            //     complate: () => {}
            // });
        }
    };
    __decorate([
        property(cc.Node)
    ], GameResult.prototype, "m_n_fail", void 0);
    __decorate([
        property(cc.Node)
    ], GameResult.prototype, "m_sp_titlef", void 0);
    __decorate([
        property(cc.Node)
    ], GameResult.prototype, "m_btn_again", void 0);
    __decorate([
        property(cc.Node)
    ], GameResult.prototype, "m_btn_share", void 0);
    GameResult = __decorate([
        ccclass
    ], GameResult);
    return GameResult;
}(cc.Component));
exports.default = GameResult;

cc._RF.pop();