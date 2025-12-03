"use strict";
cc._RF.push(module, '9f53d0DtydHwr06D64dwfTL', 'gameScene_Star');
// Scripts/gameScene_Star.ts

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
var EventManager_1 = require("./EventManager");
var Common_1 = require("./Common");
var GameData_1 = require("./GameData");
var gameScene_Star = /** @class */ (function (_super) {
    __extends(gameScene_Star, _super);
    function gameScene_Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layerGame = null;
        _this.layerZanTing = null;
        _this.layerFaild = null;
        _this.layerWin = null;
        _this.prefab_block = null;
        _this.prefab_xing = null;
        _this.prefab_blockScore = null;
        _this.block_parent = null;
        _this.xingXing_parent = null;
        _this.tx_chuiZi = null;
        _this.tx_biShua = null;
        _this.bg_btn_biShu = null;
        _this.audio_sound = [];
        _this.propSpf = [];
        _this.isWin = false;
        _this.time_tiShi = 0;
        _this.num_block_wh = 64;
        _this.num_jianGe = 2;
        _this.num_w = 10;
        _this.num_h = 10;
        _this.gameType = 0;
        _this.numLevel = 1;
        _this.numScore_curr = 0;
        _this.node_scoreCurr = null;
        _this.node_lianXiao = null;
        _this.node_good = null;
        _this.node_success = null;
        _this.arr_blocks = [];
        _this.userData = null;
        _this.is_moveing = false;
        _this.isShuaing = false;
        _this.arrMuBiao = [];
        return _this;
    }
    gameScene_Star.prototype.onLoad = function () {
        GameData_1.GameData.gameDataBind = this;
        this.initialLayer();
        this.isWin = false;
        this.time_tiShi = 0;
        this.num_block_wh = 64;
        this.num_jianGe = 2;
        this.num_w = 10;
        this.num_h = 10;
        this.gameType = 0;
        this.numLevel = 1;
        this.numScore_curr = 0;
        this.node_scoreCurr = this.layerGame.getChildByName("label_scoreCurr");
        this.node_lianXiao = this.layerGame.getChildByName("label_lianXiao");
        this.node_good = this.layerGame.getChildByName("node_good");
        this.node_success = this.layerGame.getChildByName("node_success");
        this.arr_blocks = [];
        for (var t = 0; t < this.num_h; t++)
            this.arr_blocks[t] = [];
        this.setParent();
        this.setTouch();
        this.arrMuBiao = [0, 1000, 3000, 5500, 7500, 9500, 11500, 14000, 99999];
        var i = cc.sys.localStorage.getItem("userData_xmxx");
        if (i != null && i != "") {
            this.userData = JSON.parse(i);
            cc.find("bg/numb_high", this.layerFaild).getComponent(cc.Label).string = this.userData.num_score_best.toString();
        }
        this.saveUserData();
        console.log("宽：" + cc.winSize.width + " 高：" + cc.winSize.height);
        var e = cc.winSize.width / 720;
        this.block_parent.scale = 720 * e / this.block_parent.width;
        this.xingXing_parent.scale = 720 * e / this.block_parent.width;
        this.bg_btn_biShu.scale = e;
        this.changePropCount();
    };
    gameScene_Star.prototype.initialLayer = function () {
        this.layerGame.active = true;
        this.layerZanTing.active = false;
        this.layerFaild.active = false;
        this.layerWin.active = false;
    };
    gameScene_Star.prototype.onDestroy = function () {
        GameData_1.GameData.gameDataBind = null;
    };
    gameScene_Star.prototype.changePropCount = function () {
        cc.find("Canvas/layerGame/btn_shuaXin/icon_video").active = GameData_1.GameData.xmxx_Refresh < 1;
        cc.find("Canvas/layerGame/btn_shuaXin/count").active = GameData_1.GameData.xmxx_Refresh > 0;
        cc.find("Canvas/layerGame/btn_shuaXin/count").getComponent(cc.Label).string = GameData_1.GameData.xmxx_Refresh.toString();
        cc.find("Canvas/layerGame/btn_biShua/icon_video").active = GameData_1.GameData.xmxx_Pen < 1;
        cc.find("Canvas/layerGame/btn_biShua/count").active = GameData_1.GameData.xmxx_Pen > 0;
        cc.find("Canvas/layerGame/btn_biShua/count").getComponent(cc.Label).string = GameData_1.GameData.xmxx_Pen.toString();
        cc.find("Canvas/layerGame/btn_chuiZI/icon_video").active = GameData_1.GameData.xmxx_Hammer < 1;
        cc.find("Canvas/layerGame/btn_chuiZI/count").active = GameData_1.GameData.xmxx_Hammer > 0;
        cc.find("Canvas/layerGame/btn_chuiZI/count").getComponent(cc.Label).string = GameData_1.GameData.xmxx_Hammer.toString();
        console.log("锤子" + GameData_1.GameData.xmxx_Hammer, "刷新" + GameData_1.GameData.xmxx_Refresh, "画笔" + GameData_1.GameData.xmxx_Pen);
    };
    gameScene_Star.prototype.start = function () {
        this.layerGame.active = true;
        this.actStart();
    };
    gameScene_Star.prototype.setParent = function () {
        this.block_parent.width = (this.num_block_wh + this.num_jianGe) * this.num_w + this.num_jianGe;
        this.block_parent.height = (this.num_block_wh + this.num_jianGe) * this.num_h + this.num_jianGe;
        this.block_parent.y = this.block_parent.height / 2 - 640 + 175;
        this.xingXing_parent.width = this.block_parent.width;
        this.xingXing_parent.height = this.block_parent.height;
        this.xingXing_parent.y = this.block_parent.y;
    };
    gameScene_Star.prototype.setTouch = function () {
        var _this = this;
        this.block_parent.on("touchstart", function (t) {
            if (_this.gameType == 1 && !_this.is_moveing) {
                var i = t.getLocation();
                var e = _this.block_parent.convertToNodeSpaceAR(i);
                var a = _this.block_parent.children;
                for (var n = 0; n < a.length; n++) {
                    if (a[n].getBoundingBox().contains(e)) {
                        _this.time_tiShi = 0;
                        _this.quXiaoTiShi();
                        if (_this.tx_chuiZi.active) {
                            var b = a[n].getComponent("star");
                            if (b.is_chuiZi) {
                                _this.tx_chuiZi.active = false;
                                var o = a[n].getPosition();
                                var s = a[n].getComponent("star").blockType;
                                for (var r = 0; r < 3; r++)
                                    _this.createXing(o, s);
                                a[n].removeFromParent();
                                _this.shuaXinArr();
                                _this.moveBlocks_down();
                                return;
                            }
                            _this.quXiaoChuiZi();
                            var h = a[n].getPosition();
                            _this.tx_chuiZi.x = h.x + 20;
                            _this.tx_chuiZi.y = h.y;
                            b.chuiZi();
                            return;
                        }
                        if (_this.tx_biShua.active) {
                            if (_this.isShuaing)
                                return;
                            var b = a[n].getComponent("star");
                            if (b.is_biShua)
                                return;
                            _this.quXiaoBiShua();
                            _this.tx_biShua.stopAllActions();
                            var h = a[n].getPosition();
                            _this.tx_biShua.x = h.x + 15;
                            _this.tx_biShua.y = h.y + 45;
                            cc.tween(_this.tx_biShua).repeatForever(cc.tween().by(.2, { y: 20 }).by(.2, { y: -20 })).start();
                            a[n].getComponent("star").biShua();
                            var c = a[n].getComponent("star").blockType;
                            _this.shuaXinBgBiShua(c);
                            return;
                        }
                        _this.touchOne(n);
                        var u = 0;
                        for (var _ = 0; _ < a.length; _++) {
                            var b = a[_].getComponent("star");
                            if (b.is_xiaoChu)
                                u++;
                        }
                        if (u > 1) {
                            _this.is_moveing = true;
                            if (GameData_1.GameData.audioSwitch == 1)
                                cc.audioEngine.play(_this.audio_sound[1], false, 1);
                            _this.xiaoChuBlocks();
                            _this.node_lianXiao.opacity = 255;
                            _this.node_lianXiao.stopAllActions();
                            _this.node_lianXiao.scale = 0;
                            var m = 0;
                            for (var d = 0; d < u; d++)
                                m = m + 5 + 10 * d;
                            _this.node_lianXiao.getComponent(cc.Label).string = "Match-" + u + " for " + m + " points";
                            cc.tween(_this.node_lianXiao).to(.2, { scale: 1 }).to(2, { opacity: 0 }).start();
                            if (u >= 6) {
                                if (GameData_1.GameData.audioSwitch == 1)
                                    cc.audioEngine.play(_this.audio_sound[0], false, 1);
                                _this.node_good.opacity = 255;
                                _this.node_good.stopAllActions();
                                _this.node_good.scale = 0;
                                var a_children = _this.node_good.children;
                                var g = Math.floor(Math.random() * a_children.length);
                                for (var v = 0; v < a_children.length; v++)
                                    a_children[v].active = v == g;
                                cc.tween(_this.node_good).to(.2, { scale: 1 }).blink(.5, 5).to(1.5, { opacity: 0 }).start();
                            }
                        }
                        else {
                            var b = a[n].getComponent("star");
                            b.quXiaoXiaoChu();
                        }
                        _this.shuaXinArr();
                        _this.moveBlocks_down();
                    }
                }
            }
        }, this);
    };
    gameScene_Star.prototype.saveUserData = function () {
        if (!this.userData) {
            this.userData = {
                arr_blocks_save: [],
                num_level_save: 1,
                num_score_save: 0,
                num_score_fh: 0,
                num_score_best: 0
            };
        }
        cc.sys.localStorage.setItem("userData_xmxx", JSON.stringify(this.userData));
    };
    gameScene_Star.prototype.actStart = function () {
        var _this = this;
        this.isWin = false;
        this.gameType = 0;
        this.is_moveing = false;
        this.layerGame.getChildByName("btn_zanTing").active = true;
        this.node_success.active = false;
        this.node_good.opacity = 0;
        this.node_lianXiao.opacity = 0;
        var t = this.layerGame.getChildByName("label_guanQia");
        var i = this.layerGame.getChildByName("label_muBiao");
        var e = this.layerGame.getChildByName("label_guanQia_2");
        var a = this.layerGame.getChildByName("label_muBiao_2");
        cc.tween(i).blink(2, 8).start();
        this.saveUserData();
        if (this.userData.num_level_save)
            this.numLevel = this.userData.num_level_save;
        else
            this.numLevel = 1;
        if (this.userData.num_score_save)
            this.numScore_curr = this.userData.num_score_save;
        else
            this.numScore_curr = 0;
        if (this.numLevel == 1) {
            this.userData.num_score_fh = 0;
            this.saveUserData();
        }
        t.getComponent(cc.Label).string = "Level " + this.numLevel;
        e.getComponent(cc.Label).string = "Current Level " + this.numLevel;
        i.getComponent(cc.Label).string = "Score " + this.arrMuBiao[this.numLevel];
        a.getComponent(cc.Label).string = "Target Score " + this.arrMuBiao[this.numLevel];
        this.node_scoreCurr.getComponent(cc.Label).string = this.numScore_curr.toString();
        this.tx_chuiZi.active = false;
        this.tx_biShua.active = false;
        this.bg_btn_biShu.active = false;
        this.block_parent.removeAllChildren();
        if (this.userData.arr_blocks_save.length > 0) {
            this.createBlocksByBenDi();
            this.shuaXinArr();
            this.gameType = 1;
            this.time_tiShi = 0;
            return;
        }
        e.x = 550;
        a.x = 550;
        cc.tween(e).to(.5, { x: 0 }, { easing: "cubicOut" }).delay(1.5).to(.3, { x: -550 }).start();
        cc.tween(a).delay(.5).to(.5, { x: 0 }, { easing: "cubicOut" }).delay(1).to(.3, { x: -550 }).start();
        this.createBlocks();
        this.shuaXinArr();
        var n = this.block_parent.children;
        for (var o = 0; o < n.length; o++) {
            n[o].y = n[o].y + 1500;
            cc.tween(n[o]).delay(2.3).by(.5 + .008 * o, { x: 0, y: -1500 }).start();
        }
        var s = 2.8 + .008 * (n.length - 1);
        this.scheduleOnce(function () {
            _this.gameType = 1;
            _this.time_tiShi = 0;
        }, s + .02);
    };
    gameScene_Star.prototype.quXiaoChuiZi = function () {
        var t = this.block_parent.children;
        for (var i = 0; i < t.length; i++)
            t[i].getComponent("star").quXiaoChuiZi();
    };
    gameScene_Star.prototype.quXiaoBiShua = function () {
        var t = this.block_parent.children;
        for (var i = 0; i < t.length; i++)
            t[i].getComponent("star").quXiaoBiShua();
    };
    gameScene_Star.prototype.touchOne = function (t) {
        var i = this.block_parent.children;
        var e = t;
        i[e].getComponent("star").canXiaoChu();
        var a = i[e].getPosition();
        var n = i[e].getComponent("star").blockType;
        var o = [];
        var s = this.block_parent.children;
        for (var r = 0; r < s.length; r++) {
            if (e != r) {
                var h = s[r].getPosition();
                var c = (a.x - h.x) * (a.x - h.x) + (a.y - h.y) * (a.y - h.y);
                if ((c = Math.sqrt(c)) <= this.num_block_wh + this.num_jianGe + 10 && n == s[r].getComponent("star").blockType) {
                    if (s[r].getComponent("star").is_xiaoChu)
                        continue;
                    s[r].getComponent("star").canXiaoChu();
                    o.push(r);
                }
            }
        }
        for (var u = 0; u < o.length; u++)
            this.touchOne(o[u]);
    };
    gameScene_Star.prototype.touchOneTiShi = function (t) {
        var i = this.block_parent.children;
        var e = t;
        i[e].getComponent("star").canTiShi();
        var a = i[e].getPosition();
        var n = i[e].getComponent("star").blockType;
        var o = [];
        var s = this.block_parent.children;
        for (var r = 0; r < s.length; r++) {
            if (e != r) {
                var h = s[r].getPosition();
                var c = (a.x - h.x) * (a.x - h.x) + (a.y - h.y) * (a.y - h.y);
                if ((c = Math.sqrt(c)) <= this.num_block_wh + this.num_jianGe + 10 && n == s[r].getComponent("star").blockType) {
                    if (s[r].getComponent("star").is_tiShi)
                        continue;
                    s[r].getComponent("star").canTiShi();
                    o.push(r);
                }
            }
        }
        for (var u = 0; u < o.length; u++)
            this.touchOneTiShi(o[u]);
    };
    gameScene_Star.prototype.xiaoChuBlocks = function () {
        var t = this.block_parent.children;
        var i = -1;
        for (var e = t.length - 1; e >= 0; e--) {
            if (t[e].getComponent("star").is_xiaoChu) {
                var a = t[e].getPosition();
                var n = t[e].getComponent("star").blockType;
                t[e].removeFromParent();
                for (var o = 0; o < 5; o++)
                    this.createXing(a, n);
                var s = 5 + 10 * ++i;
                var r = cc.instantiate(this.prefab_blockScore);
                r.parent = this.xingXing_parent;
                r.setPosition(a);
                var h = .5 + .09 * i;
                var c = this.layerGame.convertToWorldSpaceAR(this.node_scoreCurr.getPosition());
                var u = this.xingXing_parent.convertToNodeSpaceAR(c);
                r.getComponent("blockScore").init(s, h, u);
            }
        }
    };
    gameScene_Star.prototype.addScore = function (t) {
        this.numScore_curr = this.numScore_curr + t;
        if (this.userData.num_score_best < this.numScore_curr) {
            this.userData.num_score_best = this.numScore_curr;
            cc.find("bg/numb_high", this.layerFaild).getComponent(cc.Label).string = this.userData.num_score_best.toString();
        }
        this.userData.num_score_save = this.numScore_curr;
        this.saveUserData();
        this.node_scoreCurr.getComponent(cc.Label).string = this.numScore_curr.toString();
        this.layerWin.getChildByName("num_now").getComponent(cc.Label).string = this.numScore_curr.toString();
        cc.find("bg/num_now", this.layerFaild).getComponent(cc.Label).string = this.numScore_curr.toString();
        if (this.node_success.active == false && this.numScore_curr >= this.arrMuBiao[this.numLevel]) {
            this.node_success.active = true;
            this.node_success.x = 560;
            cc.tween(this.node_success).to(.5, { x: 0, y: this.node_success.y }).start();
        }
    };
    gameScene_Star.prototype.createXing = function (t, i) {
        var e = cc.instantiate(this.prefab_xing);
        e.parent = this.xingXing_parent;
        e.setPosition(t);
        e.getComponent("xing").init(i);
        e.scale = .3 + .6 * Math.random();
        var a = 50 + 150 * Math.random();
        var n = .3 + .4 * Math.random();
        cc.tween(e).delay(.05 * Math.random()).by(n, { x: 0, y: a }, { easing: "cubicOut" }).by(n, { x: 0, y: 10 - a - 40 * Math.random() }, { easing: "cubicIn" }).call(function () {
            e.destroy();
        }).start();
    };
    gameScene_Star.prototype.createBlocks = function () {
        var t = -this.block_parent.width / 2 + this.num_block_wh / 2 + this.num_jianGe;
        var i = -this.block_parent.height / 2 + this.num_block_wh / 2 + this.num_jianGe;
        for (var e = 0; e < this.num_h; e++)
            for (var a = 0; a < this.num_w; a++) {
                var n = cc.instantiate(this.prefab_block);
                n.parent = this.block_parent;
                n.x = (this.num_block_wh + this.num_jianGe) * a + t;
                n.y = (this.num_block_wh + this.num_jianGe) * e + i;
                var o = n.getComponent("star");
                var s = Math.floor(5 * Math.random());
                o.init(s);
            }
    };
    gameScene_Star.prototype.createBlocksByBenDi = function () {
        var t = -this.block_parent.width / 2 + this.num_block_wh / 2 + this.num_jianGe;
        var i = -this.block_parent.height / 2 + this.num_block_wh / 2 + this.num_jianGe;
        for (var e = 0; e < this.num_h; e++)
            for (var a = 0; a < this.num_w; a++) {
                var n = this.userData.arr_blocks_save[e][a];
                if (n != -1) {
                    var o = cc.instantiate(this.prefab_block);
                    o.parent = this.block_parent;
                    o.x = (this.num_block_wh + this.num_jianGe) * a + t;
                    o.y = (this.num_block_wh + this.num_jianGe) * e + i;
                    o.getComponent("star").init(n);
                }
            }
    };
    gameScene_Star.prototype.getArrByPos = function (t) {
        var i = this.block_parent.width / 2 + t.x;
        var e = this.block_parent.height / 2 + t.y;
        var a = Math.floor(e / (this.num_block_wh + this.num_jianGe));
        var n = Math.floor(i / (this.num_block_wh + this.num_jianGe));
        return cc.v2(a, n);
    };
    gameScene_Star.prototype.shuaXinArr = function () {
        for (var t = 0; t < this.num_h; t++)
            for (var i = 0; i < this.num_w; i++)
                this.arr_blocks[t][i] = -1;
        var e = this.block_parent.children;
        for (var a = 0; a < e.length; a++) {
            var n = e[a].getComponent("star").blockType;
            var o = e[a].getPosition();
            var s = this.getArrByPos(o);
            this.arr_blocks[s.x][s.y] = n;
        }
    };
    gameScene_Star.prototype.pdGameOver = function () {
        for (var t = 0; t < this.num_h; t++)
            for (var i = 0; i < this.num_w; i++) {
                if (t + 1 < this.num_h && this.arr_blocks[t][i] == this.arr_blocks[t + 1][i] && this.arr_blocks[t][i] != -1)
                    return false;
                if (t - 1 >= 0 && this.arr_blocks[t][i] == this.arr_blocks[t - 1][i] && this.arr_blocks[t][i] != -1)
                    return false;
                if (i + 1 < this.num_w && this.arr_blocks[t][i] == this.arr_blocks[t][i + 1] && this.arr_blocks[t][i] != -1)
                    return false;
                if (i - 1 >= 0 && this.arr_blocks[t][i] == this.arr_blocks[t][i - 1] && this.arr_blocks[t][i] != -1)
                    return false;
            }
        return true;
    };
    gameScene_Star.prototype.actGameOver = function () {
        var _this = this;
        var t = this;
        var i = this.block_parent.children;
        var e = function (e) {
            cc.tween(i[e]).blink(1.5, 4).delay(.03 * e).call(function () {
                var a = i[e].getPosition();
                var n = i[e].getComponent("star").blockType;
                for (var o = 0; o < 3; o++)
                    t.createXing(a, n);
                i[e].active = false;
            }).start();
        };
        for (var a = i.length - 1; a >= 0; a--)
            e(a);
        var n = 1.5 + .03 * (i.length - 1);
        if (this.node_success.active) {
            this.scheduleOnce(function () {
                _this.layerWin.active = true;
                _this.isWin = true;
                _this.pushZaJinDan();
            }, n + 1);
        }
        else {
            this.scheduleOnce(function () {
                _this.userData.num_level_save = 1;
                _this.userData.num_score_save = 0;
                _this.saveUserData();
                _this.layerFaild.active = true;
                _this.layerGame.getChildByName("btn_zanTing").active = false;
            }, n + 1);
        }
    };
    gameScene_Star.prototype.shuaXinBlocks = function () {
        var t = this.block_parent.children;
        var i = function (i) {
            cc.tween(t[i]).to(.2, { scale: 0 }).call(function () {
                var e = Math.floor(Math.random() * t.length);
                var a = t[i].getPosition();
                var n = t[e].getPosition();
                t[i].setPosition(n);
                t[e].setPosition(a);
            }).to(.2, { scale: 1 }).start();
        };
        for (var e = 0; e < t.length; e++)
            i(e);
    };
    gameScene_Star.prototype.moveBlocks_down = function () {
        var t = this;
        var i = 0;
        var e = this.block_parent.children;
        var a = .08;
        for (var n = 0; n < e.length; n++) {
            var o = e[n].getPosition();
            var s = this.getArrByPos(o);
            var r = 0;
            for (var h = s.x; h >= 0; h--)
                if (this.arr_blocks[h][s.y] == -1)
                    r++;
            var c = .08 * r;
            if (a < c)
                a = c;
            cc.tween(e[n]).call(function () { return i++; }).by(c, { x: 0, y: -(this.num_jianGe + this.num_block_wh) * r }).call(function () {
                if (0 == --i) {
                    t.shuaXinArr();
                    t.moveBlocks_left();
                }
            }).start();
        }
    };
    gameScene_Star.prototype.moveBlocks_left = function () {
        var t = this;
        var i = 0;
        var e = this.block_parent.children;
        var a = .08;
        for (var n = 0; n < e.length; n++) {
            var o = e[n].getPosition();
            var s = this.getArrByPos(o);
            var r = 0;
            for (var h = s.y; h >= 0; h--)
                if (s.x == 0 && this.arr_blocks[s.x][h] == -1)
                    r++;
            var c = .08 * r;
            if (a < c)
                a = c;
            for (var u = 0; u < e.length; u++) {
                var l = e[u].getPosition();
                if (this.getArrByPos(l).y == s.y) {
                    cc.tween(e[u]).call(function () { return i++; }).by(c, { x: -(this.num_jianGe + this.num_block_wh) * r, y: 0 }).call(function () {
                        if (0 == --i) {
                            t.shuaXinArr();
                            t.userData.arr_blocks_save = t.arr_blocks;
                            t.saveUserData();
                            t.is_moveing = false;
                            if (t.pdGameOver()) {
                                t.gameType = 2;
                                t.userData.arr_blocks_save = [];
                                t.saveUserData();
                                console.log("游戏结束");
                                t.actGameOver();
                            }
                            else
                                console.log("没结束");
                        }
                    }).start();
                }
            }
        }
    };
    gameScene_Star.prototype.ziDongTiShi = function () {
        if (!this.tx_biShua.active && !this.tx_chuiZi.active) {
            var t = this.block_parent.children;
            for (var i = 0; i < t.length; i++)
                if (t[i].getComponent("star").is_tiShi)
                    return;
            for (var e = 0; e < t.length; e++) {
                this.touchOneTiShi(e);
                var a = 0;
                var n = this.block_parent.children;
                for (var o = 0; o < n.length; o++)
                    if (n[o].getComponent("star").is_tiShi)
                        a++;
                if (a > 1) {
                    this.jinXingTiShi();
                    return;
                }
                t[e].getComponent("star").quXiaoTiShi();
            }
        }
    };
    gameScene_Star.prototype.jinXingTiShi = function () {
        var t = this.block_parent.children;
        for (var i = 0; i < t.length; i++)
            if (t[i].getComponent("star").is_tiShi)
                cc.tween(t[i]).repeatForever(cc.tween().to(.4, .8).to(.4, 1)).start();
    };
    gameScene_Star.prototype.quXiaoTiShi = function () {
        var t = this.block_parent.children;
        for (var i = 0; i < t.length; i++) {
            var e = t[i].getComponent("star");
            if (e.is_tiShi) {
                e.quXiaoTiShi();
                t[i].stopAllActions();
                t[i].scale = 1;
            }
        }
    };
    gameScene_Star.prototype.gameRestart = function () {
        this.initialLayer();
        this.numLevel = 1;
        this.numScore_curr = 0;
        this.node_scoreCurr.getComponent(cc.Label).string = this.numScore_curr.toString();
        this.userData.arr_blocks_save = [];
        this.userData.num_level_save = 1;
        this.userData.num_score_save = 0;
        this.saveUserData();
        this.actStart();
    };
    gameScene_Star.prototype.btn_callBack = function (t, i) {
        var n = this;
        if (GameData_1.GameData.audioSwitch == 1 && cc.audioEngine.play(this.audio_sound[2], false, 1),
            "btn_zanTing" == i) {
            if (this.gameType != 1)
                return;
            this.layerZanTing.active = true;
        }
        else if ("btn_home" == i)
            Common_1.default.instance.toMenu();
        else if ("btn_rePlay" == i)
            this.gameRestart();
        else if ("btn_close_zanTing" == i)
            this.layerZanTing.active = false;
        else if ("btn_shuaXin" == i) {
            if (this.gameType != 1)
                return;
            if (this.tx_biShua.active || this.tx_chuiZi.active)
                return;
            var o_1 = function () {
                n.quXiaoTiShi();
                n.shuaXinBlocks();
            };
            if (GameData_1.GameData.xmxx_Refresh > 0) {
                o_1();
                GameData_1.GameData.xmxx_Refresh--;
                GameData_1.GameData.saveData();
                this.changePropCount();
                return;
            }
            EventManager_1.default.instance.showRewardedVideo(function () { return o_1(); });
        }
        else if ("btn_chuiZI" == i) {
            if (this.gameType != 1)
                return;
            if (this.tx_biShua.active)
                return;
            if (this.quXiaoTiShi(),
                this.tx_chuiZi.active)
                return this.tx_chuiZi.active = false,
                    void this.quXiaoChuiZi();
            var s_1 = function () {
                n.tx_chuiZi.active = true;
                var t = n.block_parent.children;
                if (t.length > 0) {
                    var i_1 = Math.floor(Math.random() * t.length);
                    var e = t[i_1].getPosition();
                    n.tx_chuiZi.x = e.x + 20;
                    n.tx_chuiZi.y = e.y;
                    t[i_1].getComponent("star").chuiZi();
                }
            };
            if (GameData_1.GameData.xmxx_Hammer > 0) {
                s_1();
                GameData_1.GameData.xmxx_Hammer--;
                GameData_1.GameData.saveData();
                this.changePropCount();
                return;
            }
            EventManager_1.default.instance.showRewardedVideo(function () { return s_1(); });
        }
        else if ("btn_biShua" == i) {
            if (this.gameType != 1)
                return;
            if (this.tx_biShua.active || this.tx_chuiZi.active)
                return;
            this.quXiaoTiShi();
            var r_1 = function () {
                n.tx_biShua.active = true,
                    n.bg_btn_biShu.active = true;
                var t = n.block_parent.children;
                if (t.length > 0) {
                    n.tx_biShua.stopAllActions();
                    var i_2 = Math.floor(Math.random() * t.length);
                    var e = t[i_2].getPosition();
                    console.log("笔刷位置：" + e);
                    n.tx_biShua.x = e.x + 15;
                    n.tx_biShua.y = e.y + 45;
                    cc.tween(n.tx_biShua).repeatForever(cc.tween().by(.2, { x: 0, y: 20 }).by(.2, { x: 0, y: -20 })).start();
                    t[i_2].getComponent("star").biShua();
                    var a = t[i_2].getComponent("star").blockType;
                    n.shuaXinBgBiShua(a);
                }
            };
            if (GameData_1.GameData.xmxx_Pen > 0) {
                r_1();
                return;
            }
            EventManager_1.default.instance.showRewardedVideo(function () { return r_1(); });
        }
        else if ("btn_back_faild" == i) {
            EventManager_1.default.instance.EventInterstitialVideo();
            Common_1.default.instance.toMenu();
        }
        else if ("btn_fuHuo" == i)
            EventManager_1.default.instance.showRewardedVideo(function () { return n.fuHuoBtn(); });
        else if ("btn_restart" == i) {
            EventManager_1.default.instance.EventInterstitialVideo();
            this.gameRestart();
        }
        else if ("btn_getProp" == i)
            EventManager_1.default.instance.showRewardedVideo(function () {
                GameData_1.GameData.xmxx_Hammer++;
                GameData_1.GameData.xmxx_Refresh++;
                GameData_1.GameData.xmxx_Pen++;
                GameData_1.GameData.saveData();
                n.nextGame();
            });
        else if ("btn_noProp" == i) {
            this.nextGame();
            EventManager_1.default.instance.EventInterstitialVideo();
        }
    };
    gameScene_Star.prototype.nextGame = function () {
        this.numLevel++;
        this.userData.num_level_save = this.numLevel;
        this.userData.num_score_fh = this.numScore_curr;
        this.saveUserData();
        this.actStart();
        this.layerWin.active = false;
    };
    gameScene_Star.prototype.shuaXinBgBiShua = function (t) {
        if (GameData_1.GameData.audioSwitch == 1)
            cc.audioEngine.play(this.audio_sound[2], false, 1);
        var i = this.bg_btn_biShu.getChildByName("layout").children;
        for (var e = 0; e < i.length; e++)
            i[e].active = t != e;
    };
    gameScene_Star.prototype.btn_biShua = function (t, i) {
        var _this = this;
        if ("btn_quXiao" == i) {
            this.tx_biShua.active = false;
            this.bg_btn_biShu.active = false;
            this.quXiaoBiShua();
        }
        else {
            GameData_1.GameData.xmxx_Pen--;
            if (GameData_1.GameData.xmxx_Pen < 0)
                GameData_1.GameData.xmxx_Pen = 0;
            GameData_1.GameData.saveData();
            this.changePropCount();
            this.isShuaing = true;
            var e = this.block_parent.children;
            for (var a = 0; a < e.length; a++) {
                var n = e[a].getComponent("star");
                if (n.is_biShua) {
                    var o = parseInt(i);
                    n.init(o);
                    this.bg_btn_biShu.active = false;
                    this.quXiaoBiShua();
                    this.tx_biShua.stopAllActions();
                    this.tx_biShua.y = this.tx_biShua.y - 20;
                    var s = this.tx_biShua.getComponent("cc.Animation");
                    s.biShuaOver = function () {
                        _this.tx_biShua.active = false;
                        _this.isShuaing = false;
                    };
                    s.play();
                    return;
                }
            }
        }
    };
    gameScene_Star.prototype.logArr = function () {
        for (var t = this.num_h - 1; t >= 0; t--)
            console.log(this.arr_blocks[t]);
        console.log("**************************************");
    };
    gameScene_Star.prototype.update = function (dt) {
        if (!GameData_1.GameData.isPause) {
            if (this.gameType == 1) {
                this.time_tiShi++;
                if (this.time_tiShi >= 300) {
                    this.time_tiShi = 0;
                    this.ziDongTiShi();
                }
            }
            GameData_1.GameData.pushZJD_autoShow -= dt;
            if (GameData_1.GameData.pushZJD_autoShow < 0)
                this.pushZaJinDan();
        }
    };
    gameScene_Star.prototype.fuHuoBtn = function () {
        this.layerFaild.active = false;
        this.userData.num_score_save = this.userData.num_score_fh;
        this.userData.num_level_save = this.numLevel;
        this.saveUserData();
        this.actStart();
    };
    gameScene_Star.prototype.shuXinBtn = function () {
        this.quXiaoTiShi();
        this.shuaXinBlocks();
    };
    gameScene_Star.prototype.pushZaJinDan = function () {
        Common_1.default.instance.pushZaJinDan(this.propSpf);
    };
    __decorate([
        property(cc.Node)
    ], gameScene_Star.prototype, "layerGame", void 0);
    __decorate([
        property(cc.Node)
    ], gameScene_Star.prototype, "layerZanTing", void 0);
    __decorate([
        property(cc.Node)
    ], gameScene_Star.prototype, "layerFaild", void 0);
    __decorate([
        property(cc.Node)
    ], gameScene_Star.prototype, "layerWin", void 0);
    __decorate([
        property(cc.Prefab)
    ], gameScene_Star.prototype, "prefab_block", void 0);
    __decorate([
        property(cc.Prefab)
    ], gameScene_Star.prototype, "prefab_xing", void 0);
    __decorate([
        property(cc.Prefab)
    ], gameScene_Star.prototype, "prefab_blockScore", void 0);
    __decorate([
        property(cc.Node)
    ], gameScene_Star.prototype, "block_parent", void 0);
    __decorate([
        property(cc.Node)
    ], gameScene_Star.prototype, "xingXing_parent", void 0);
    __decorate([
        property(cc.Node)
    ], gameScene_Star.prototype, "tx_chuiZi", void 0);
    __decorate([
        property(cc.Node)
    ], gameScene_Star.prototype, "tx_biShua", void 0);
    __decorate([
        property(cc.Node)
    ], gameScene_Star.prototype, "bg_btn_biShu", void 0);
    __decorate([
        property([cc.AudioClip])
    ], gameScene_Star.prototype, "audio_sound", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], gameScene_Star.prototype, "propSpf", void 0);
    gameScene_Star = __decorate([
        ccclass
    ], gameScene_Star);
    return gameScene_Star;
}(cc.Component));
exports.default = gameScene_Star;

cc._RF.pop();