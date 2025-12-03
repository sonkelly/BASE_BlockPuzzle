"use strict";
cc._RF.push(module, '3c9aat6CjRO/qtIFNjMNnS/', 'boardFrame');
// Scripts/boardFrame.ts

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
var Common_1 = require("./Common");
var LvData_JieMi_1 = require("./LvData_JieMi");
var PlatformA_1 = require("./PlatformA");
var Property_1 = require("./Property");
var Utils_1 = require("./Utils");
var LvData_ChuangGuan_1 = require("./LvData_ChuangGuan");
var GameData_1 = require("./GameData");
var BoardFrame = /** @class */ (function (_super) {
    __extends(BoardFrame, _super);
    function BoardFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.kFramePrefab = null;
        _this.blockPrefab = null;
        _this.dragonEage = null;
        _this.playEffect = null;
        _this.frameList = [];
        _this.xcList = [];
        _this.xcListClone = [];
        _this.lastLength = 10000;
        _this.grayNum = 0;
        _this.putNum = 0;
        _this.score = 0;
        _this.comboStep = 0;
        _this.comboTimes = -1;
        _this.effectPos = cc.v2(0, 0);
        _this.effectPos2 = cc.v2(0, 0);
        _this.kkuaiM = null;
        _this.disArr = [];
        _this.iceBlockNum = 0;
        return _this;
    }
    BoardFrame.prototype.onLoad = function () {
        this.playEffect = this.node.getComponent("playEffect");
        this.frameList = [];
        this.xcList = [];
        this.xcListClone = [];
        this.lastLength = 10000;
        this.grayNum = 0;
        this.putNum = 0;
        this.score = 0;
        this.resetParame();
        this.initialBoard();
        this.playBoardAimation("kaichang", function () { });
        clientEvent_1.default.on("blockPut", this.checkbloackPut, this);
        clientEvent_1.default.on("curCickKuaiM", this.getCurClickKuaiM, this);
        clientEvent_1.default.on("setGray", this.grayCount, this);
        clientEvent_1.default.on("reviveEvent", this.reviveEvent, this);
        GameData_1.GameData.resume();
    };
    BoardFrame.prototype.resetParame = function () {
        this.comboStep = Property_1.BlockConfig[Property_1.GameMode].comboStep;
        this.comboTimes = -1;
        this.effectPos = cc.v2(0, 0);
    };
    BoardFrame.prototype.initialBoard = function () {
        switch (Property_1.GameMode) {
            case Property_1.MODE.TEACH:
                this.disArr = Property_1.DIS_LIST_8X8;
                this.initCheckBoard();
                this.defaultCheckBoard(Property_1.TEACHING.BOARD[GameData_1.GameData.teachingXS], Property_1.TEACHING.COLOR[GameData_1.GameData.teachingXS]);
                this.showTeaching();
                break;
            case Property_1.MODE.JINGDIAN:
                this.disArr = Property_1.DIS_LIST_8X8;
                if (GameData_1.GameData.teaching < 3) {
                    this.initCheckBoard();
                    this.defaultCheckBoard(Property_1.TEACHING.BOARD[GameData_1.GameData.teaching], Property_1.TEACHING.COLOR[GameData_1.GameData.teaching]);
                    this.showTeaching();
                }
                else {
                    this.revertEight();
                }
                break;
            case Property_1.MODE.JIUJIU:
            case Property_1.MODE.JIUJIU2:
                this.disArr = Property_1.DIS_LIST_9X9;
                this.initCheckBoard();
                break;
            case Property_1.MODE.JIUGONG:
                this.disArr = Property_1.DIS_LIST_9G;
                this.initCheckBoard();
                break;
            case Property_1.MODE.JIEMI:
                this.disArr = Property_1.DIS_LIST_9X9;
                this.initCheckBoard();
                this.defaultCheckBoard(LvData_JieMi_1.default.JM_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].board, LvData_JieMi_1.default.JM_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].color);
                break;
            case Property_1.MODE.CHUANGGUAN:
                this.disArr = Property_1.DIS_LIST_9X9;
                this.iceBlockNum = LvData_ChuangGuan_1.default.CG_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].board.length;
                this.initCheckBoard();
                this.defaultCheckBoard(LvData_ChuangGuan_1.default.CG_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].board, LvData_ChuangGuan_1.default.CG_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].color);
                break;
        }
    };
    BoardFrame.prototype.showTeaching = function (e) {
        if (e === void 0) { e = true; }
        cc.find("Canvas/teaching/teach_di").active = e;
        if (Property_1.GameMode == Property_1.MODE.JINGDIAN) {
            cc.find("Canvas/teaching/" + GameData_1.GameData.teaching).active = e;
        }
        else if (Property_1.GameMode == Property_1.MODE.TEACH) {
            cc.find("Canvas/teaching/" + GameData_1.GameData.teachingXS).active = e;
        }
    };
    BoardFrame.prototype.playBoardAimation = function (e, t) {
        var _this = this;
        this.dragonEage.node.active = true;
        Utils_1.default.playAniCall(this.dragonEage, e, function () {
            t && t();
            _this.dragonEage.node.active = false;
        });
    };
    BoardFrame.prototype.onDestroy = function () {
        clientEvent_1.default.off("blockPut", this.checkbloackPut, this);
        clientEvent_1.default.off("curCickKuaiM", this.getCurClickKuaiM, this);
        clientEvent_1.default.off("setGray", this.grayCount, this);
        clientEvent_1.default.off("reviveEvent", this.reviveEvent, this);
    };
    BoardFrame.prototype.initCheckBoard = function () {
        var e = 0;
        var t = [];
        var o = this.node.width / 2 - Property_1.BlockConfig[Property_1.GameMode].wh / 2;
        for (var n = 0; n < Property_1.BlockConfig[Property_1.GameMode].col; n++) {
            for (var a = 0; a < Property_1.BlockConfig[Property_1.GameMode].row; a++) {
                var i = {
                    row: a,
                    col: n,
                    index: ++e,
                    fristPos: o,
                    wh: Property_1.BlockConfig[Property_1.GameMode].wh
                };
                t.push(this.createKFrame(i));
            }
        }
        this.frameList = t;
    };
    BoardFrame.prototype.defaultCheckBoard = function (e, t) {
        for (var o = 0; o < e.length; o++) {
            var n = e[o] - 1;
            var a = cc.instantiate(this.blockPrefab);
            a.parent = this.frameList[n];
            a.width = Property_1.BlockConfig[Property_1.GameMode].wh;
            a.height = Property_1.BlockConfig[Property_1.GameMode].wh;
            a.getComponent("block").initial(Array.isArray(t) ? t[o] : t);
            if (Property_1.GameMode == Property_1.MODE.CHUANGGUAN) {
                a.getComponent("block").modeCGInitial({
                    num: LvData_ChuangGuan_1.default.CG_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].number[o]
                });
            }
            this.frameList[n].getComponent("kuaiFrame").isHaveFK = true;
            this.frameList[n].getComponent("kuaiFrame").simulateFK = true;
        }
    };
    BoardFrame.prototype.revertEight = function () {
        var e = 0;
        var t = [];
        var o = this.node.width / 2 - Property_1.BlockConfig[Property_1.GameMode].wh / 2;
        for (var n = 0; n < Property_1.BlockConfig[Property_1.GameMode].col; n++) {
            for (var a = 0; a < Property_1.BlockConfig[Property_1.GameMode].row; a++) {
                var i = {
                    row: a,
                    col: n,
                    index: ++e,
                    fristPos: o,
                    wh: Property_1.BlockConfig[Property_1.GameMode].wh
                };
                t.push(this.createKFrame(i, true));
            }
        }
        this.frameList = t;
        this.score = GameData_1.GameData.curScore;
        GameData_1.GameData.gameDataBind.fkScore.setBoardScore(this.score, 1);
    };
    BoardFrame.prototype.createKFrame = function (e, t) {
        if (t === void 0) { t = false; }
        var o = cc.instantiate(this.kFramePrefab);
        o.parent = this.node;
        o.getComponent("kuaiFrame").initial(e);
        if (t && GameData_1.GameData.blockData[e.index] != null) {
            o.getComponent("kuaiFrame").revertData(this.blockPrefab, GameData_1.GameData.blockData[e.index]);
        }
        return o;
    };
    BoardFrame.prototype.checkPutPos = function (e) {
        for (var t = 0; t < e.length; t++) {
            var o = e[t] - 1;
            if (this.frameList[o].getComponent("kuaiFrame").putState) {
                return t;
            }
        }
        return -1;
    };
    BoardFrame.prototype.setEffectPos = function () {
        var e = this.xcList[0];
        var t = e[this.checkPutPos(e)] - 1;
        this.effectPos = this.frameList[t].getPosition();
        var o = this.kkuaiM._width;
        var n = this.kkuaiM._height;
        this.effectPos2 = cc.v2(this.effectPos.x + o / 2 - 40, this.effectPos.y - n / 2 + 40);
    };
    BoardFrame.prototype.getEffectPos = function () {
        return cc.v2(this.effectPos.x, this.effectPos.y);
    };
    BoardFrame.prototype.cleanBlock = function (e, t, o) {
        var _this = this;
        if (Property_1.GameMode == Property_1.MODE.JIEMI) {
            if (e.getComponent("block")._move == 0) {
                GameData_1.GameData.gameDataBind.fkScore._nowTaskNum++;
                GameData_1.GameData.gameDataBind.fkScore.setTaskNumber();
            }
        }
        else if (Property_1.GameMode == Property_1.MODE.CHUANGGUAN && e.getComponent("block").getIsIce() == 1) {
            var i = e.getComponent("block").getXcNumber();
            if (--i < 1) {
                GameData_1.GameData.gameDataBind.fkScore._nowTaskNum++;
                GameData_1.GameData.gameDataBind.fkScore.setTaskNumber();
            }
            e.getComponent("block").setIceNumber(i, function () {
                _this.cleanBoardFrame(t);
                _this.iceBlockNum--;
                if (_this.iceBlockNum <= 0) {
                    Common_1.default.instance.showGameWinLayer();
                }
            });
            return;
        }
        e.getComponent("block").playDragon(this.kkuaiM._colorType, o);
        this.cleanBoardFrame(t);
    };
    BoardFrame.prototype.cleanBoardFrame = function (e) {
        this.frameList[e - 1].getComponent("kuaiFrame").simulateFK = null;
        this.frameList[e - 1].getComponent("kuaiFrame").isHaveFK = null;
        if (Property_1.GameMode == Property_1.MODE.JINGDIAN) {
            GameData_1.GameData.blockData[e] = null;
            GameData_1.GameData.saveData();
        }
    };
    BoardFrame.prototype.checkbloackPut = function () {
        this.score += this.kkuaiM.checkFKlist.length;
        GameData_1.GameData.gameDataBind.fkScore.setBoardScore(this.score);
        var e = 0;
        if (this.xcList.length > 0) {
            this.setEffectPos();
            for (var t = 0; t < this.xcList.length; t++) {
                e = 0;
                var o = this.xcList[t];
                var n = this.checkPutPos(o);
                for (var a = n; a >= 0; a--) {
                    var i = o[a];
                    var r = this.frameList[i - 1].getChildByName("kn");
                    if (r) {
                        e += Property_1.Property.XC_DELAY_TIME;
                        this.cleanBlock(r, i, e);
                    }
                }
                e = 0;
                for (var s = n + 1; s < o.length; s++) {
                    var c = o[s];
                    var l = this.frameList[c - 1].getChildByName("kn");
                    if (l) {
                        e += Property_1.Property.XC_DELAY_TIME;
                        this.cleanBlock(l, c, e);
                    }
                }
            }
            this.checkScore(this.xcList.length);
        }
        else {
            this.comboStep--;
            if (this.comboStep <= 0) {
                this.comboStep = 0;
                GameData_1.GameData.gameDataBind.fkScore.hideHeatBeat();
            }
        }
        var d = [];
        for (var h = 0; h < this.frameList.length; h++) {
            if (!this.frameList[h].getComponent("kuaiFrame").isHaveFK) {
                d.push(h);
            }
        }
        var u = d.length < Property_1.Property.PUSH_NONE;
        var m = [];
        for (var f = 0; f < this.frameList.length; f++) {
            if (!this.frameList[f].getComponent("kuaiFrame").isHaveFK && this.checkHaveFK(f) == 1) {
                m.push(f);
            }
        }
        var p = m.length > Property_1.Property.PUSH_NONE_CLOSE;
        if (u || p) {
            GameData_1.GameData.gameDataBind.kuaiManager.showRefreshBlock();
        }
    };
    BoardFrame.prototype.checkHaveFK = function (e) {
        var t = [];
        var o = [e - 1, e + 1, e - Property_1.BlockConfig[Property_1.GameMode].row, e + Property_1.BlockConfig[Property_1.GameMode].row];
        for (var n = 0; n < o.length; n++) {
            if (this.frameList[o[n]] == null) {
                t[n] = 1;
            }
            else {
                t[n] = this.frameList[o[n]].getComponent("kuaiFrame").isHaveFK == null ? 0 : 1;
            }
        }
        for (var a = 0; a < t.length; a++) {
            if (t[a] == 0) {
                return 0;
            }
        }
        return 1;
    };
    BoardFrame.prototype.checkScore = function (e, t, o) {
        var _this = this;
        if (t === void 0) { t = false; }
        if (o === void 0) { o = null; }
        if (this.comboStep > 0 || this.comboTimes == -1) {
            this.comboTimes++;
        }
        else {
            this.comboTimes = 0;
        }
        this.comboStep = Property_1.BlockConfig[Property_1.GameMode].comboStep;
        AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.Combo + (this.comboTimes > 10 ? 10 : this.comboTimes));
        if (this.comboTimes >= 2) {
            GameData_1.GameData.gameDataBind.fkScore.playSke();
        }
        var r = Property_1.LINE_SCORE[e - 1];
        this.scheduleOnce(function () {
            if (_this.comboTimes > 0) {
                var n = r * (_this.comboTimes + 1);
                _this.score += n;
                if (t) {
                    var a = {
                        comTimes: _this.comboTimes,
                        pos: o,
                        score: n,
                        pos2: o
                    };
                    _this.playEffect.playCombo(a);
                }
                else {
                    var s = {
                        comTimes: _this.comboTimes,
                        pos: _this.getEffectPos(),
                        score: n,
                        pos2: _this.effectPos2
                    };
                    _this.playEffect.playCombo(s);
                }
            }
            else {
                _this.score += r;
                if (t) {
                    var c = {
                        pos: o,
                        disLine: e,
                        colorType: 0
                    };
                    _this.playEffect.playEliminate(c);
                }
                else {
                    var l = {
                        pos: _this.getEffectPos(),
                        disLine: e,
                        colorType: _this.kkuaiM._colorType
                    };
                    _this.playEffect.playEliminate(l);
                }
            }
        }, Property_1.DELAY_TIME.combo);
        if (e > 1) {
            this.scheduleOnce(function () {
                AudioManager_1.default.instance.playSound((lplatform.channel == PlatformA_1.CHANNEL.qq ? AudioManager_1.AudioID.LienTempQQ : AudioManager_1.AudioID.LienTemp) + e);
                if (t) {
                    _this.playEffect.playMultiRow(e, o);
                }
                else {
                    _this.playEffect.playMultiRow(e, _this.getEffectPos());
                }
            }, Property_1.DELAY_TIME.flatter);
        }
        if (this.isClearBoard()) {
            if (Property_1.GameMode == Property_1.MODE.JIEMI) {
                console.log("解密模式胜利");
                GameData_1.GameData.isWin = true;
            }
            this.scheduleOnce(function () {
                if (Property_1.GameMode == Property_1.MODE.JIEMI) {
                    _this.score += 300;
                    Common_1.default.instance.showUnbelievable();
                    _this.scheduleOnce(function () {
                        if (GameData_1.GameData.gameDataBind.kuaiManager.getBlockNum() <= 0) {
                            Common_1.default.instance.showGameWinLayer();
                        }
                    }, 3);
                }
                else if (_this.score >= Property_1.Property.BOARD_CLEAN_ANI_SCORE) {
                    _this.score += 300;
                    _this.playBoardAimation("quanxiao");
                    Common_1.default.instance.showUnbelievable();
                }
            }, Property_1.DELAY_TIME.clean);
        }
        this.scheduleOnce(function () {
            GameData_1.GameData.gameDataBind.fkScore.setBoardScore(_this.score);
            if (_this.score > 1000 && Math.floor(_this.score / 1000) != GameData_1.GameData.zjd_Score) {
                GameData_1.GameData.zjd_Score = Math.floor(_this.score / 1000);
                GameData_1.GameData.gameDataBind.pushZaJinDan();
            }
        }, Property_1.DELAY_TIME.score);
        GameData_1.GameData.gameDataBind.vibrates(this.comboTimes, e);
    };
    BoardFrame.prototype.isClearBoard = function () {
        for (var e = 0; e < this.frameList.length; e++) {
            if (this.frameList[e].getComponent("kuaiFrame").isHaveFK) {
                return false;
            }
        }
        return true;
    };
    BoardFrame.prototype.checkXC = function () {
        var e = [];
        for (var t = 0; t < this.frameList.length; t++) {
            if (this.frameList[t].getComponent("kuaiFrame").simulateFK) {
                e.push(this.frameList[t].getComponent("kuaiFrame").index);
            }
        }
        e.sort(function (a, b) { return a - b; });
        this.xcListClone = this.xcList.concat();
        this.xcList = [];
        for (var o = 0; o < this.disArr.length; o++) {
            var n = this.disArr[o];
            var a = Utils_1.default.get2AryIntersect(e, n);
            if (a.length > 0 && Utils_1.default.check2AryIsEqual(n, a)) {
                this.xcList.push(n);
            }
        }
        if (!Utils_1.default.check4AryIsEqual(this.xcListClone, this.xcList)) {
            for (var i = 0; i < this.frameList.length; i++) {
                var r = this.frameList[i].getChildByName("kn");
                if (r) {
                    var s = r.getComponent("block");
                    if (s.isChange) {
                        s.setSprite(s._cType);
                        s.isChange = false;
                    }
                }
            }
            for (var c = 0; c < this.kkuaiM.node.children.length; c++) {
                if (Property_1.GameMode == Property_1.MODE.JINGDIAN) {
                    this.kkuaiM.node.children[c].scale = Property_1.BlockConfig.blockScale;
                }
                else {
                    this.kkuaiM.node.children[c].scale = Property_1.BlockConfig[Property_1.GameMode].wh / Property_1.BlockConfig.normalWH;
                }
            }
            if (this.xcList.length > 0) {
                for (var l = 0; l < this.xcList.length; l++) {
                    var d = this.xcList[l];
                    for (var h = 0; h < d.length; h++) {
                        var u = d[h];
                        var m = this.frameList[u - 1].getChildByName("kn");
                        if (m) {
                            m.getComponent("block").setChange(this.kkuaiM._colorType);
                        }
                        for (var f = 0; f < this.kkuaiM.node.children.length; f++) {
                            if (this.kkuaiM.node.children[f].getComponent("block").index === this.frameList[u - 1].getComponent("kuaiFrame").index) {
                                this.kkuaiM.node.children[f].scale = 1;
                            }
                        }
                    }
                }
            }
            else {
                for (var p = 0; p < this.frameList.length; p++) {
                    var g = this.frameList[p].getChildByName("kn");
                    if (g) {
                        var w = g.getComponent("block");
                        if (w.isChange) {
                            w.setSprite(w._cType);
                            w.isChange = false;
                        }
                    }
                }
                for (var b = 0; b < this.kkuaiM.node.children.length; b++) {
                    if (Property_1.GameMode == Property_1.MODE.JINGDIAN) {
                        this.kkuaiM.node.children[b].scale = Property_1.BlockConfig.blockScale;
                    }
                    else {
                        this.kkuaiM.node.children[b].scale = Property_1.BlockConfig[Property_1.GameMode].wh / Property_1.BlockConfig.normalWH;
                    }
                }
            }
        }
    };
    BoardFrame.prototype.getCurClickKuaiM = function (e) {
        this.kkuaiM = e;
        if (Property_1.GameMode == Property_1.MODE.JINGDIAN && GameData_1.GameData.teaching < 3) {
            this.showTeaching(false);
        }
        else if (Property_1.GameMode == Property_1.MODE.TEACH && GameData_1.GameData.teachingXS < 3) {
            this.showTeaching(false);
        }
    };
    BoardFrame.prototype.gameLose = function () {
        cc.find("Canvas").pauseSystemEvents(true);
        var e = this.frameList.concat();
        this.frameList.sort(function () { return 0.5 - Math.random(); });
        var t = 0.08;
        for (var o = 0; o < this.frameList.length; o++) {
            if (this.frameList[o].getComponent("kuaiFrame").isHaveFK) {
                var n = this.frameList[o].getChildByName("kn");
                if (n) {
                    if (Math.random() < 0.5) {
                        t += Property_1.Property.GRAY_DELAY_TIME;
                    }
                    var a = n.getComponent("block");
                    this.putNum++;
                    a.setGray(t);
                }
            }
        }
        this.frameList = e;
    };
    BoardFrame.prototype.grayCount = function () {
        this.grayNum++;
        if (this.grayNum === this.putNum) {
            this.putNum = 0;
            this.grayNum = 0;
            if (Property_1.GameMode == Property_1.MODE.JIEMI) {
                this.scheduleOnce(function () {
                    Common_1.default.instance.showGameLoseLayer();
                }, 1);
            }
            else {
                Common_1.default.instance.showRebornLayer();
            }
        }
    };
    BoardFrame.prototype.reviveEvent = function () {
        cc.find("Canvas").resumeSystemEvents(true);
        for (var e = 0; e < this.frameList.length; e++) {
            if (this.frameList[e].getComponent("kuaiFrame").isHaveFK) {
                var t = this.frameList[e].getChildByName("kn");
                if (t) {
                    var o = t.getComponent("block");
                    o.setSprite(o._cType);
                }
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], BoardFrame.prototype, "kFramePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], BoardFrame.prototype, "blockPrefab", void 0);
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], BoardFrame.prototype, "dragonEage", void 0);
    BoardFrame = __decorate([
        ccclass
    ], BoardFrame);
    return BoardFrame;
}(cc.Component));
exports.default = BoardFrame;

cc._RF.pop();