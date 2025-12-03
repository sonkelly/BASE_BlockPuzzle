"use strict";
cc._RF.push(module, 'b308eQJ2DxHjrotx33TOGf+', 'kuaiManager');
// Scripts/kuaiManager.ts

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
var Property_1 = require("./Property");
var AudioManager_1 = require("./AudioManager");
var clientEvent_1 = require("./clientEvent");
var WeightRandom_1 = require("./WeightRandom");
var Common_1 = require("./Common");
var LvData_JieMi_1 = require("./LvData_JieMi");
var lodash_1 = require("./lodash");
var ExtendScript_1 = require("./ExtendScript");
var GameData_1 = require("./GameData");
var KuaiManager = /** @class */ (function (_super) {
    __extends(KuaiManager, _super);
    function KuaiManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.notPlace = null;
        _this.labshape = null;
        _this.fkBornPos = [];
        _this.fkPrefab = [];
        _this.surplusKuaiM = 3;
        _this.blockIndex = 0;
        _this.blockNum = 0;
        _this.btnRefreshBlock = null;
        return _this;
    }
    KuaiManager.prototype.onLoad = function () {
        this.surplusKuaiM = 3;
        this.sendKuaiM();
        this.initialMode();
        clientEvent_1.default.on("blockPut", this.checkbloackPut, this);
        clientEvent_1.default.on("reviveEvent", this.reviveEvent, this);
        clientEvent_1.default.on("useProp", this.usPropFinish, this);
    };
    KuaiManager.prototype.onDestroy = function () {
        clientEvent_1.default.off("blockPut", this.checkbloackPut, this);
        clientEvent_1.default.off("reviveEvent", this.reviveEvent, this);
        clientEvent_1.default.off("useProp", this.usPropFinish, this);
    };
    KuaiManager.prototype.initialMode = function () {
        this.btnRefreshBlock = this.node.getChildByName("btnRefreshBlock");
        this.btnRefreshBlock.active = false;
        if (Property_1.GameMode == Property_1.MODE.JIEMI) {
            this.setBlockNum(LvData_JieMi_1.default.JM_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].block.length);
        }
    };
    KuaiManager.prototype.checkbloackPut = function () {
        if (Property_1.GameMode == Property_1.MODE.JINGDIAN) {
            if (GameData_1.GameData.teaching < 2) {
                GameData_1.GameData.teaching++;
                GameData_1.GameData.saveData();
                this.scheduleOnce(function () {
                    Common_1.default.instance.toGame();
                }, 1.6);
                return;
            }
            if (GameData_1.GameData.teaching == 2) {
                GameData_1.GameData.teaching = 3;
                GameData_1.GameData.saveData();
            }
        }
        else if (Property_1.GameMode == Property_1.MODE.TEACH) {
            if (GameData_1.GameData.teachingXS < 2) {
                GameData_1.GameData.teachingXS++;
                GameData_1.GameData.saveData();
                this.scheduleOnce(function () {
                    Common_1.default.instance.toGame();
                }, 1.6);
                return;
            }
            if (GameData_1.GameData.teachingXS == 2) {
                GameData_1.GameData.teachingXS = 3;
                GameData_1.GameData.saveData();
            }
        }
        if (Property_1.GameMode == Property_1.MODE.JIUJIU2) {
            var score = GameData_1.GameData.gameDataBind.fkScore._curScore;
            var weightArray = void 0;
            if (score < Property_1.BLOCK_WEIGHT_SCORE[0]) {
                weightArray = Property_1.BlockWeight[Property_1.GameMode][0];
            }
            else if (score < Property_1.BLOCK_WEIGHT_SCORE[1]) {
                weightArray = Property_1.BlockWeight[Property_1.GameMode][1];
            }
            else {
                weightArray = Property_1.BlockWeight[Property_1.GameMode][2];
            }
            var random = new WeightRandom_1.default();
            for (var i = 0; i <= weightArray.length; i++) {
                random.weightAdd(i, weightArray[i]);
            }
            var nextIndex = random.weightNext();
            this.newNone(GameData_1.GameData.blockIndex, nextIndex);
            random.weightDeleteAll(nextIndex);
        }
        else {
            this.surplusKuaiM--;
            if (this.surplusKuaiM <= 0) {
                this.surplusKuaiM = 3;
                this.sendKuaiM();
            }
        }
        this.checkIsLose();
    };
    KuaiManager.prototype.sendKuaiM = function () {
        if (Property_1.GameMode == Property_1.MODE.JINGDIAN && GameData_1.GameData.teaching < 3) {
            this.surplusKuaiM = 1;
            this.newNone(1, Property_1.TEACHING.BLOCK[GameData_1.GameData.teaching], Property_1.TEACHING.BLOCK_COLOR[GameData_1.GameData.teaching]);
        }
        else if (Property_1.GameMode == Property_1.MODE.TEACH && GameData_1.GameData.teachingXS < 3) {
            this.surplusKuaiM = 1;
            this.newNone(1, Property_1.TEACHING.BLOCK[GameData_1.GameData.teachingXS], Property_1.TEACHING.BLOCK_COLOR[GameData_1.GameData.teachingXS]);
        }
        else if (Property_1.GameMode == Property_1.MODE.JIEMI) {
            if (!this.blockIndex) {
                this.blockIndex = 0;
            }
            for (var i = 0; i < 3; i++) {
                if (this.blockIndex >= LvData_JieMi_1.default.JM_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].block.length) {
                    return;
                }
                var colors = [0, 1, 2, 3, 4, 5, 6];
                colors.splice(LvData_JieMi_1.default.JM_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].color, 1);
                var colorIndex = lodash_1.default.random(0, colors.length - 1);
                this.newNone(i, LvData_JieMi_1.default.JM_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].block[this.blockIndex], colors[colorIndex]);
                this.blockIndex++;
            }
        }
        else {
            var score = GameData_1.GameData.gameDataBind.fkScore._curScore;
            var weightArray = void 0;
            if (score < Property_1.BLOCK_WEIGHT_SCORE[0]) {
                weightArray = Property_1.BlockWeight[Property_1.GameMode][0];
            }
            else if (score < Property_1.BLOCK_WEIGHT_SCORE[1]) {
                weightArray = Property_1.BlockWeight[Property_1.GameMode][1];
            }
            else {
                weightArray = Property_1.BlockWeight[Property_1.GameMode][2];
            }
            var random = new WeightRandom_1.default();
            for (var i = 0; i <= weightArray.length; i++) {
                random.weightAdd(i, weightArray[i]);
            }
            for (var i = 0; i < 3; i++) {
                var nextIndex = random.weightNext();
                this.newNone(i, nextIndex);
                random.weightDeleteAll(nextIndex);
            }
        }
        this.checkIsLose();
    };
    KuaiManager.prototype.newNone = function (index, type, color) {
        var node = cc.instantiate(this.fkPrefab[type]);
        node.setPosition(0, 0);
        node.parent = this.fkBornPos[index];
        node.getComponent(ExtendScript_1.default).init(color != null ? color : lodash_1.default.random(0, 6), type, true, index);
    };
    KuaiManager.prototype.usPropFinish = function () {
        this.checkIsLose();
    };
    KuaiManager.prototype.checkIsLose = function () {
        if (Property_1.GameMode == Property_1.MODE.JIEMI && GameData_1.GameData.isWin) {
            return;
        }
        var loseCount = 0;
        var totalCount = 0;
        for (var i = 0; i < 3; i++) {
            var child = this.fkBornPos[i].children[0];
            if (child) {
                totalCount++;
                var script = child.getComponent(ExtendScript_1.default); // 假设脚本名为BlockScript
                if (script) {
                    if (script.checkIsLose()) {
                        loseCount++;
                        script.setGrayKuai();
                    }
                    else {
                        script.recoveryKuai();
                    }
                }
            }
        }
        if (loseCount > Property_1.Property.PUSH_NOT_PUT) {
            this.showRefreshBlock();
        }
        if (loseCount == totalCount) {
            console.log("lose!!!!!!!!!!!!" + loseCount);
            AudioManager_1.default.instance.playSound(AudioManager_1.AudioID.Lost);
            GameData_1.GameData.isFail = true;
            GameData_1.GameData.gameDataBind.boardFrame.gameLose();
            if (Property_1.GameMode == Property_1.MODE.JIEMI) {
                var outNum = this.notPlace.getChildByName("sp_outNum");
                var noPut = this.notPlace.getChildByName("sp_noPut");
                outNum.active = this.getBlockNum() <= 0;
                noPut.active = this.getBlockNum() > 0;
                cc.tween(this.notPlace)
                    .set({ opacity: 255 })
                    .delay(0.25)
                    .to(0.36, { opacity: 0 })
                    .to(0.45, { opacity: 255 })
                    .start();
            }
            else {
                cc.tween(this.notPlace)
                    .set({ opacity: 255 })
                    .delay(0.25)
                    .to(0.36, { opacity: 0 })
                    .to(0.45, { opacity: 255 })
                    .start();
            }
        }
    };
    KuaiManager.prototype.reviveEvent = function () {
        this.notPlace.opacity = 0;
        this.sendKuaiMDefault(Property_1.RESUME_BLOCK_ARR);
    };
    KuaiManager.prototype.setBlockNum = function (num) {
        this.blockNum = num;
        this.labshape.string = this.blockNum + "/" + LvData_JieMi_1.default.JM_LEVEL_DATA[GameData_1.GameData.level[Property_1.GameMode]].block.length;
    };
    KuaiManager.prototype.getBlockNum = function () {
        return this.blockNum;
    };
    KuaiManager.prototype.cleanBlockBoard = function () {
        for (var i = 0; i < this.fkBornPos.length; i++) {
            var child = this.fkBornPos[i].children[0];
            if (child) {
                var script = child.getComponent(ExtendScript_1.default); // 假设脚本名为BlockScript
                if (script) {
                    script.clean();
                }
            }
        }
        this.surplusKuaiM = 3;
    };
    KuaiManager.prototype.onClickRefreshBlock = function () {
        this.showRefreshBlock(true);
    };
    KuaiManager.prototype.showRefreshBlock = function (isClick) {
        var _this = this;
        if (isClick === void 0) { isClick = false; }
        Common_1.default.instance.pushChangeBlock(isClick, function () {
            var blockArr = [0, lodash_1.default.random(1, 9), 0];
            _this.sendKuaiMDefault(blockArr);
            _this.btnRefreshBlock.active = false;
        }, function () {
            _this.btnRefreshBlock.active = true;
        });
    };
    KuaiManager.prototype.sendKuaiMDefault = function (blockArr) {
        this.cleanBlockBoard();
        for (var i = 0; i < blockArr.length; i++) {
            this.newNone(i, blockArr[i]);
        }
    };
    KuaiManager.prototype.update = function (dt) {
        if (GameData_1.GameData.isPause)
            return;
        GameData_1.GameData.pushChange_Time -= dt;
        if (GameData_1.GameData.pushChange_Time < 0 && GameData_1.GameData.isTouch == 0) {
            this.showRefreshBlock();
        }
    };
    __decorate([
        property(cc.Node)
    ], KuaiManager.prototype, "notPlace", void 0);
    __decorate([
        property(cc.Label)
    ], KuaiManager.prototype, "labshape", void 0);
    __decorate([
        property({
            type: [cc.Node],
            tooltip: "放置块的父节点"
        })
    ], KuaiManager.prototype, "fkBornPos", void 0);
    __decorate([
        property({
            type: [cc.Prefab],
            tooltip: "方块预制体"
        })
    ], KuaiManager.prototype, "fkPrefab", void 0);
    KuaiManager = __decorate([
        ccclass
    ], KuaiManager);
    return KuaiManager;
}(cc.Component));
exports.default = KuaiManager;

cc._RF.pop();