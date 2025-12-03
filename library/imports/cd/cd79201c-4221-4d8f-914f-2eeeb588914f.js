"use strict";
cc._RF.push(module, 'cd792AcQiFNj5FPLu61iJFP', 'GameMain');
// Scripts/GameMain.ts

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
var AudioManager_1 = require("./AudioManager");
var Utils3_1 = require("./Utils3");
var ShareSdk_1 = require("./ShareSdk");
var RankList_1 = require("./RankList");
var EventManager_1 = require("./EventManager");
var ConstValue_1 = require("./ConstValue");
var GameData_1 = require("./GameData");
var Property_1 = require("./Property");
var event_listener_1 = require("./event_listener");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameMain = /** @class */ (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = null;
        _this.m_n_gamenode = null;
        _this.m_n_bg_panel = null;
        _this.m_pre_blockbg = null;
        _this.m_pre_light = null;
        _this.m_pre_boomeffect = null;
        _this.m_pre_boom = null;
        _this.m_l_boomnum = null;
        _this.m_l_score = null;
        _this.m_sp_monster = null;
        _this.m_l_level = null;
        _this.m_n_result_panel = null;
        _this.m_btn_tool2 = null;
        _this.m_n_guidemask = null;
        _this.m_n_tooluse = null;
        _this.m_n_showtime = [];
        _this.m_spf_gold = null;
        _this.m_n_askpanel = null;
        _this.m_n_boss = null;
        _this.m_spriteAtlas = null;
        _this.m_n_bglist = null;
        _this.m_l_gold = null;
        _this.m_pre_rock = null;
        _this.m_n_kuai = [];
        _this.m_n_displaycheck = null;
        _this.m_n_displayrank = null;
        _this.m_n_stepview = null;
        _this.m_n_reliveview = null;
        _this.m_n_video = null;
        _this.m_n_lookvideo = null;
        _this.m_n_luckyvideo = null;
        _this.m_n_doublevideo = null;
        _this.m_n_doublescore = null;
        _this.m_n_sharegift = null;
        _this.m_n_skinpanel = null;
        _this.m_n_guidenode = null;
        _this.m_l_asktype = null;
        _this.m_n_guidefiger = null;
        // Private properties
        _this.m_gamestate = 0;
        _this.m_cur_score = 0;
        _this.m_cur_level = 0;
        _this.m_normal_talktime = 4;
        _this.m_normal_curtime = -1;
        _this.m_target_block = [];
        _this.m_mapblink = false;
        _this.m_touch_boom = false;
        _this._relivenum = 0;
        _this._videonum = 0;
        _this._killnum = 0;
        _this.m_doublescore = 1;
        _this._isdeleting = false;
        _this._isbless = false;
        _this.m_block_pool = null;
        _this.m_light_pool = null;
        _this.m_boomnum = 0;
        _this._configlist = null;
        _this._tempguide = false;
        _this.m_in_judge = false;
        _this.m_bannerad = null;
        _this.m_maparray = [];
        _this.m_row = 0;
        _this.m_col = 0;
        _this.m_grid_array = [];
        _this.m_solidernum = 0;
        _this.m_cur_attack_num = 0;
        _this.m_strongnum = 0;
        _this.showAdb = false;
        return _this;
    }
    GameMain.prototype.onLoad = function () {
        Property_1.Property.GAME_CONTROL = this;
        Utils3_1.Utils3.setDesignResolution();
    };
    GameMain.prototype.onDestroy = function () {
        this.m_block_pool.clear();
        this.m_light_pool.clear();
        Property_1.Property.GAME_CONTROL = null;
        if (this.m_bannerad) {
            this.m_bannerad.destroy();
            this.m_bannerad = null;
        }
        event_listener_1.default.instance.off(window.GAME_UPDATE_DATA, this);
        event_listener_1.default.instance.off(window.GAME_SAVE_HANDLER, this);
    };
    GameMain.prototype.start = function () {
        if (GameData_1.GameData.audioSwitch === 1) {
            AudioManager_1.audioManager.playBgmMusic(this.bgm);
        }
        if (window.firstGame) {
            window.firstGame = false;
        }
        this.createMap();
        this.initData();
        this.initMonster(this.m_cur_level);
        this.showAdBanner(false);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        event_listener_1.default.instance.on(window.GAME_UPDATE_DATA, this.updateGold, this);
        event_listener_1.default.instance.on(window.GAME_SAVE_HANDLER, this.updateSkin, this);
    };
    GameMain.prototype.initData = function () {
        var _this = this;
        this.m_n_skinpanel.getComponent("SkinPanel").initData();
        this.m_n_displaycheck.active = true;
        this.m_n_displayrank.active = false;
        this.m_n_lookvideo.active = false;
        this.m_n_doublescore.active = false;
        this.m_gamestate = 0;
        this.m_cur_score = 0;
        this.m_cur_level = window.INIT_GAME_SAVE_DATA.top_level + 1;
        this.m_normal_talktime = 4;
        this.m_normal_curtime = -1;
        this.m_target_block = [];
        this.m_mapblink = false;
        this.m_touch_boom = false;
        this._relivenum = 0;
        this._videonum = 0;
        this._killnum = 0;
        this.m_l_score.string = this.m_cur_score.toString();
        this.m_doublescore = 1;
        this.m_l_level.string = "LV." + this.m_cur_level;
        this.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num.toString();
        this._isdeleting = false;
        this._isbless = false;
        this.m_block_pool = new cc.NodePool();
        this.m_light_pool = new cc.NodePool();
        this.updateToolsNum();
        this.schedule(function () {
            _this.m_btn_tool2.runAction(cc.sequence(cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
            _this.m_n_video.runAction(cc.sequence(cc.delayTime(1), cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
            _this.m_n_doublevideo.runAction(cc.sequence(cc.delayTime(2), cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
        }, 5);
        this._configlist = this.m_n_kuai[0].getComponent("ShapeItem").getTheConfig();
        RankList_1.default.checkWillSurpass(this.m_cur_score);
        var e = Utils3_1.Utils3.random(0, 1000);
        if (this.m_n_luckyvideo.active = e <= 500 && this.m_cur_level > 1) {
            this.m_n_luckyvideo.scale = 0;
            this.m_n_luckyvideo.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3)), cc.scaleTo(0.1, 1, 1)));
            if (window.SKIN_SHARE) {
                var i_1 = cc.find("btn_cancel", this.m_n_luckyvideo);
                i_1.y = -570;
                this.scheduleOnce(function () {
                    i_1.y = -514;
                    if (_this.m_n_luckyvideo.active && !_this.showAdb) {
                        _this.showAdBanner(true);
                    }
                }, 1.8);
            }
        }
    };
    GameMain.prototype.hideGuide = function () {
        if (this.m_cur_level === 1) {
            this.m_n_guidenode.active = false;
            this.m_n_guidefiger.stopAllActions();
            this.m_n_guidefiger.active = false;
            window.GUIDE_LEVEL = 1;
            cc.sys.localStorage.setItem("guideinfo", "1");
        }
    };
    GameMain.prototype.showGuide = function () {
        var _this = this;
        if (!this._tempguide) {
            this._tempguide = true;
            var e = 0;
            for (var n = 0; n < window.INIT_GAME_SAVE_DATA.skin.length; n++) {
                if (window.INIT_GAME_SAVE_DATA.skin[n] >= 2) {
                    e = n;
                    break;
                }
            }
            var o = window.SKIN_CONFIG[e];
            this.m_n_guidenode.active = true;
            this.m_n_guidefiger.active = true;
            this.m_n_guidefiger.position = this.m_n_kuai[1].position;
            this.m_n_guidefiger.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
                _this.m_n_guidefiger.position = _this.m_n_kuai[1].position;
            }), cc.moveTo(1, this.m_n_kuai[1].x, this.m_n_kuai[1].y + 350))));
            var c = this.m_n_kuai[0].getComponent("ShapeItem").getCurColorIndex();
            var s = [];
            s[46] = 1;
            s[52] = 1;
            s[53] = 1;
            s[58] = 1;
            for (var a = 43; a < 61; a++) {
                if (!s[a]) {
                    var r = new cc.Node("colorSpr");
                    r.colorIndex = c;
                    r.colorName = o.name;
                    var _ = r.addComponent(cc.Sprite);
                    console.log(o.name, c);
                    _.spriteFrame = this.m_spriteAtlas.getSpriteFrame(o.name + c);
                    r.position = cc.Vec2.ZERO;
                    r.parent = this.m_maparray[a];
                    this.m_maparray[a].isHaveFK = true;
                }
            }
        }
    };
    GameMain.prototype.onKeepGoing = function () {
        this.m_n_luckyvideo.active = false;
        this.showAdBanner(false);
    };
    GameMain.prototype.touchEnd = function (t) {
        if (this.m_gamestate === 0 && this.m_touch_boom) {
            this.m_gamestate = 2;
            var e = t.touch.getLocation();
            e = this.m_n_gamenode.convertToNodeSpace(e);
            var i = this.backIndexofList(e);
            if (i >= 0) {
                if (!this.m_maparray[i].isHaveFK) {
                    this.m_maparray[i].isHaveFK = true;
                    cc.instantiate(this.m_pre_boom).parent = this.m_maparray[i];
                    window.INIT_GAME_SAVE_DATA.tool[0] -= 1;
                    this.updateToolsNum();
                    this.doBoomAction(this.m_maparray[i].position, i);
                }
            }
            this.m_n_guidemask.active = !this.m_mapblink;
            this.m_touch_boom = !this.m_mapblink;
            this.setMapBlink(!this.m_mapblink);
            this.m_gamestate = 0;
            for (var n = 0; n < this.m_n_kuai.length; n++) {
                this.m_n_kuai[n].opacity = this.m_n_kuai[n].getComponent("ShapeItem").checkIsLose() ? 125 : 255;
            }
        }
    };
    GameMain.prototype.doBoomAction = function (t, e) {
        var _this = this;
        this.m_maparray[e].getChildByName("colorSpr").runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
        this.m_maparray[e].isHaveFK = null;
        this.scheduleOnce(function () {
            var e = cc.instantiate(_this.m_pre_boomeffect);
            e.parent = _this.m_n_gamenode;
            e.position = t;
            e.y -= 100;
            e.zIndex = 256;
            e.getComponent(cc.Animation).play("bombeffect");
            Utils3_1.Utils3.SetSoundEffect(window.BOOM_EFFECT);
        }, 0.4);
        var o = this.getBoomIndexList(e);
        console.log(o);
        var c = 0;
        var s = [];
        s.push(cc.delayTime(0.4));
        for (var a = 0; a < o.length; a++) {
            var r = o[a];
            for (var _ = 0; _ < r.length; _++) {
                var h = r[_];
                if (this.m_maparray[h].isHaveFK) {
                    s.push(cc.callFunc(function () {
                        var t = arguments[1][0];
                        var e = arguments[1][1];
                        var i = _this.getAddScoreCal(e);
                        Utils3_1.Utils3.showHurtText("+" + i, _this.m_n_gamenode, _this.m_maparray[t].x, _this.m_maparray[t].y, 20, undefined, undefined, undefined, true);
                        _this.updateScore(i);
                    }, this, [h, c]));
                    s.push(cc.callFunc(function () {
                        var t = arguments[1];
                        _this.m_maparray[t].isHaveFK = null;
                        var e = _this.m_maparray[t].getChildByName("colorSpr");
                        if (e) {
                            _this.attackMonster(e.colorIndex, _this.m_maparray[t].x, _this.m_maparray[t].y);
                            e.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
                        }
                    }, this, h));
                    c++;
                }
            }
            s.push(cc.delayTime(0.3));
        }
        if (s.length > 0) {
            s.push(cc.callFunc(function () {
                _this._isdeleting = false;
                _this.checkIsLose();
            }, this));
            this._isdeleting = true;
            var m = cc.sequence(s);
            this.node.runAction(m);
        }
    };
    GameMain.prototype.getBoomIndexList = function (t) {
        return ConstValue_1.default.BOOM_RANGE[t];
    };
    GameMain.prototype.bombFinish = function () { };
    GameMain.prototype.getCanDropBlocks = function () {
        var t = [0, 0, 0];
        for (var e = this._configlist.length - 1; e >= 1; e--) {
            for (var i = 0; i < this.m_maparray.length; i++) {
                var o = this.m_maparray[i];
                var c = cc.v2(o.x, o.y);
                var s = 1;
                if (!o.isHaveFK) {
                    var a = this._configlist[e];
                    for (var r = 1; r < a.length; r++) {
                        var _ = c.add(cc.v2(a[r].x, a[r].y));
                        for (var h = 0; h < this.m_maparray.length; h++) {
                            var m = this.m_maparray[h];
                            if (cc.v2(m.x, m.y).sub(_).mag() <= 52 && !m.isHaveFK) {
                                s++;
                            }
                        }
                    }
                    if (s === a.length) {
                        t.push(e);
                        break;
                    }
                }
            }
        }
        if (t.length > 3) {
            var l = Utils3_1.Utils3.getRandomSDiff(0, t.length - 1, 3);
            return [t[l[0]], t[l[1]], t[l[2]]];
        }
        return [t[0], t[1], t[2]];
    };
    GameMain.prototype.backIndexofList = function (t) {
        for (var e = 0; e < ConstValue_1.default.INDEX_TO_POINT.length; e++) {
            if (t.sub(cc.v2(ConstValue_1.default.INDEX_TO_POINT[e][0], ConstValue_1.default.INDEX_TO_POINT[e][1])).mag() <= 50) {
                return e;
            }
        }
        return -1;
    };
    GameMain.prototype.updateToolsNum = function () {
        this.m_boomnum = window.INIT_GAME_SAVE_DATA.tool[0];
        this.m_l_boomnum.string = "x" + this.m_boomnum;
        this.setAddVisible(this.m_btn_tool2, this.m_boomnum);
        this.updateGold();
    };
    GameMain.prototype.updateGold = function () {
        this.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num.toString();
    };
    GameMain.prototype.updateSkin = function () {
        console.log("updateskin");
        var t = 0;
        for (var e = 0; e < this.m_n_kuai.length; e++) {
            t = this.m_n_kuai[e].getComponent("ShapeItem").updateIndex(true);
        }
        var i = window.SKIN_CONFIG[t];
        for (var n = 0; n < this.m_maparray.length; n++) {
            var o = this.m_maparray[n].getChildByName("colorSpr");
            if (o) {
                o.getComponent(cc.Sprite).spriteFrame = this.m_spriteAtlas.getSpriteFrame(i.name + o.colorIndex);
            }
        }
    };
    GameMain.prototype.setAddVisible = function (t, e) {
        cc.find("sp_add", t).active = e <= 0;
    };
    GameMain.prototype.updateScore = function (t) {
        this.m_cur_score += t;
        this.m_l_score.string = this.m_cur_score.toString();
        if (!this.m_n_result_panel.active) {
            RankList_1.default.checkWillSurpass(this.m_cur_score);
        }
        if (this.m_cur_score > window.INIT_GAME_SAVE_DATA.top_score) {
            window.INIT_GAME_SAVE_DATA.top_score = this.m_cur_score;
            RankList_1.default.setScore(window.INIT_GAME_SAVE_DATA.top_score);
        }
    };
    GameMain.prototype.createMap = function () {
        this.m_maparray = [];
        var t = [];
        for (var e = 0; e < ConstValue_1.default.INDEX_TO_POINT.length; e++) {
            var n = cc.instantiate(this.m_pre_blockbg);
            n.x = ConstValue_1.default.INDEX_TO_POINT[e][0];
            n.y = ConstValue_1.default.INDEX_TO_POINT[e][1];
            n.parent = this.m_n_bglist;
            n.FKIndex = e;
            t.push(n);
        }
        this.m_maparray = t;
    };
    GameMain.prototype.initMonster = function (t) {
        var e = t % 100;
        if (e <= 0) {
            e += 1;
        }
        var i = window.MAP_CONFIG[e - 1];
        this.m_sp_monster.node.getComponent("MonsterItem").initType(i.mon_id, i.mon_hp, t);
        this.m_sp_monster.node.active = true;
        this.m_sp_monster.node.opacity = 255;
        this.m_sp_monster.node.y = 300;
        var n = 0;
        this.m_sp_monster.node.getComponent("MonsterItem").playStartTalk();
        if (i.mon_id === 0) {
            n = -10;
        }
        this.m_sp_monster.node.runAction(cc.moveTo(0.4, 0, n).easing(cc.easeIn(3)));
        if (t % 5 === 0) {
            this.m_n_boss.active = true;
            this.m_n_boss.opacity = 50;
            this.m_n_boss.scale = 2.5;
            this.m_n_boss.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.8, 1).easing(cc.easeBackIn(3)), cc.fadeTo(0.8, 255)), cc.moveBy(0.02, cc.v2(20, 0)), cc.moveBy(0.04, cc.v2(-40, 0)), cc.moveBy(0.02, cc.v2(20, 0)), cc.moveBy(0.02, cc.v2(0, 20)), cc.moveBy(0.04, cc.v2(0, -40)), cc.moveBy(0.02, cc.v2(0, 20)), cc.moveBy(0.02, cc.v2(10, 0)), cc.moveBy(0.04, cc.v2(-20, 0)), cc.moveBy(0.02, cc.v2(10, 0)), cc.moveBy(0.02, cc.v2(0, 10)), cc.moveBy(0.04, cc.v2(0, -20)), cc.moveBy(0.02, cc.v2(0, 10)), cc.fadeOut(1.5)));
        }
    };
    GameMain.prototype.addScore = function (t, e) {
        var i = this.getAddScoreCal(t, e);
        Utils3_1.Utils3.showHurtText("+" + i, null, 0, 0, 30);
        this.updateScore(i);
    };
    GameMain.prototype.getAddScoreCal = function (t, e) {
        var i = t + 1;
        return e ? i : i * i * this.m_doublescore;
    };
    GameMain.prototype.checkIsLose = function () {
        if (!this._isdeleting) {
            this.m_normal_curtime = 0;
            var t = 0;
            for (var e = 0; e < 3; e++) {
                var i = cc.find("n_kuai" + (e + 1), this.m_n_gamenode);
                if (i.getComponent("ShapeItem").checkIsLose()) {
                    t++;
                    i.opacity = 125;
                }
                else {
                    i.opacity = 255;
                }
            }
            if (t >= 2 && !this._isbless) {
                this._isbless = true;
                for (var n = 0; n < 3; n++) {
                    cc.find("n_kuai" + (n + 1), this.m_n_gamenode).getComponent("ShapeItem").setNextBlock(0);
                }
            }
            if (t === 3) {
                this.judgeGame(false);
            }
        }
    };
    GameMain.prototype.checkClearUp = function () {
        var _this = this;
        var t = [];
        for (var e = 0; e < this.m_maparray.length; e++) {
            if (this.m_maparray[e].isHaveFK) {
                t.push(this.m_maparray[e].FKIndex);
            }
        }
        t.sort(function (t, e) { return t - e; });
        var o = [];
        for (var c = 0; c < ConstValue_1.default.DISLIST.length; c++) {
            var s = ConstValue_1.default.DISLIST[c];
            var a = this.get2AryIntersect(t, s);
            if (a.length > 0 && this.check2AryIsEqual(s, a)) {
                o.push(s);
            }
        }
        var r = [];
        var _ = 0;
        var h = 0;
        var m = 0;
        for (var l = 0; l < o.length; l++) {
            var p = o[l];
            h += p.length;
            for (var d = 0; d < p.length; d++) {
                var u = p[d];
                r.push(cc.callFunc(function () {
                    var t = arguments[1][0];
                    var e = arguments[1][1];
                    var i = _this.getAddScoreCal(e);
                    Utils3_1.Utils3.showHurtText("+" + i, _this.m_n_gamenode, _this.m_maparray[t].x, _this.m_maparray[t].y, 20, undefined, undefined, undefined, true);
                    _this.updateScore(i);
                }, this, [u, _]));
                r.push(cc.callFunc(function () {
                    var t = arguments[1];
                    _this.m_maparray[t].isHaveFK = null;
                    var e = _this.m_maparray[t].getChildByName("colorSpr");
                    if (e) {
                        _this.attackMonster(e.colorIndex, _this.m_maparray[t].x, _this.m_maparray[t].y);
                        e.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
                    }
                }, this, u));
                r.push(cc.delayTime(0.1));
                _++;
            }
        }
        if (r.length > 0) {
            Utils3_1.Utils3.SetSoundEffect(window.GET_GOLD);
            r.push(cc.callFunc(function () {
                _this._isdeleting = false;
                _this.checkIsLose();
            }, this));
            this.handlerShowTime(h);
            this._isdeleting = true;
            var v = cc.sequence(r);
            this.node.runAction(v);
        }
    };
    GameMain.prototype.get2AryIntersect = function (t, e) {
        var i = [];
        for (var n = 0; n < t.length; n++) {
            for (var o = 0; o < e.length; o++) {
                if (e[o] === t[n]) {
                    i.push(e[o]);
                }
            }
        }
        return i;
    };
    GameMain.prototype.check2AryIsEqual = function (t, e) {
        for (var i = 0; i < t.length; i++) {
            if (e[i] !== t[i]) {
                return false;
            }
        }
        return true;
    };
    GameMain.prototype.handlerShowTime = function (t) {
        var _this = this;
        console.log("handlerShowTime", t);
        var e = -1;
        if (t > 9 && t <= 12) {
            e = 0;
        }
        else if (t > 12 && t <= 15) {
            e = 1;
        }
        else if (t > 15) {
            e = 2;
        }
        if (e >= 0) {
            if (e === 2) {
                Utils3_1.Utils3.SetSoundEffect(window.SAY_3);
            }
            else {
                Utils3_1.Utils3.SetSoundEffect(window.GET_GOLD);
            }
            this.m_n_showtime[e].active = true;
            this.m_n_showtime[e].getComponent(cc.Animation).play();
            setTimeout(function () {
                _this.m_n_showtime[e].active = false;
            }, 1500);
        }
    };
    GameMain.prototype.addGold = function (t, e, i) {
        var _this = this;
        window.INIT_GAME_SAVE_DATA.gold_num += t;
        for (var s = 0; s < t; s++) {
            Utils3_1.Utils3.moveIcon(this.m_spf_gold, this.m_n_gamenode, e, i, function () {
                Utils3_1.Utils3.SetSoundEffect(window.GET_GOLD);
                _this.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num.toString();
            }, 0.5, 60 * (s + 1));
        }
    };
    GameMain.prototype.showBox = function (t, e, i) {
        var _this = this;
        var c = function () {
            if (i % 10 === 0 && i <= 370) {
                _this.m_n_stepview.scale = 0;
                _this.m_n_stepview.active = true;
                _this.m_n_stepview.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3)), cc.scaleTo(0.1, 1, 1)));
                _this.m_n_stepview.getComponent("StepViewItem").showStep(i);
            }
        };
        Utils3_1.Utils3.loadRes("sprite/getshare_box", cc.SpriteFrame, function (i) {
            Utils3_1.Utils3.moveIcon(i, _this.m_n_gamenode, t, e, function () {
                _this.m_n_sharegift.active = true;
                _this.m_n_sharegift.getComponent("GetBoxGiftItem").showView(c);
            }, 0.8, 100);
        });
    };
    GameMain.prototype.attackMonster = function (t, e, i) {
        var _this = this;
        var c = t ? 2 * t : 2;
        var s = this.m_block_pool.get();
        if (!s) {
            s = cc.instantiate(this.m_pre_rock);
        }
        var a = Utils3_1.Utils3.getAngle(this.m_sp_monster.node.parent.x, this.m_sp_monster.node.parent.y, e, i);
        if (this.m_sp_monster.node.parent.x <= e) {
            a = -a;
        }
        s.angle = -a;
        s.getComponent("RockItem").resetSytem();
        s.zIndex = 32;
        s.parent = this.m_n_gamenode;
        s.x = e;
        s.y = i;
        s.runAction(cc.sequence(cc.callFunc(function () { }), cc.moveTo(1, cc.v2(this.m_sp_monster.node.parent.x, this.m_sp_monster.node.parent.y)).easing(cc.easeIn(2)), cc.callFunc(function () {
            _this.m_block_pool.put(s);
            s = null;
            _this.monsterbeHit(c);
        })));
    };
    GameMain.prototype.destroyBlockByHitMonster = function () {
        var t = this;
        var e = this;
        var i = [];
        var o = 4;
        for (var c = 0; c < this.m_maparray.length && !(this.m_maparray[c].isHaveFK && (i.push(c), --o <= 0)); c++) { }
        var s = function (o) {
            var c = t.m_light_pool.get();
            if (!c) {
                c = cc.instantiate(t.m_pre_light);
            }
            var s = t.m_maparray[i[o]].position;
            c.parent = t.m_n_gamenode;
            c.position = cc.v2(t.m_sp_monster.node.parent.x, t.m_sp_monster.node.parent.y);
            c.runAction(cc.sequence(cc.callFunc(function () {
                Utils3_1.Utils3.SetSoundEffect(window.GET_GOLD);
            }), cc.moveTo(0.8, s).easing(cc.easeIn(2)), cc.callFunc(function () {
                e.m_light_pool.put(c);
                c = null;
                e.blockBeHit(i[o]);
            })));
        };
        for (var a = 0; a < i.length; a++) {
            s(a);
        }
    };
    GameMain.prototype.blockBeHit = function (t) {
        this.m_maparray[t].isHaveFK = null;
        for (var e = 0; e < this.m_n_kuai.length; e++) {
            this.m_n_kuai[e].opacity = this.m_n_kuai[e].getComponent("ShapeItem").checkIsLose() ? 125 : 255;
        }
        var i = this.m_maparray[t].getChildByName("colorSpr");
        if (i) {
            i.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
        }
    };
    GameMain.prototype.monsterbeHit = function (t) {
        Utils3_1.Utils3.SetSoundEffect(window.BE_HIT);
        Utils3_1.Utils3.showHurtText("-" + t, this.m_sp_monster.node.parent, 0, 100, 30, new cc.Color(230, 71, 21), 0.8);
        this.updateScore(t);
        var e = this.m_sp_monster.node.getComponent("MonsterItem").reduceHp(t);
        if (e <= 0) {
            this.m_normal_curtime = -1;
            this.judgeGame(true);
        }
        else {
            this.m_normal_curtime = 0;
            if (this.m_solidernum <= 0 && this.m_cur_attack_num <= 0) {
                this.judgeGame(false);
            }
            else if (this.m_cur_attack_num <= 0 && e <= 20) {
                this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
            }
            else {
                this.m_sp_monster.node.getComponent("MonsterItem").playBeHit();
            }
        }
    };
    GameMain.prototype.onOpenSkinPanel = function () {
        this.m_n_skinpanel.active = true;
    };
    GameMain.prototype.onCancelVideo = function () {
        var _this = this;
        this.m_n_lookvideo.active = false;
        if (this._relivenum <= 0) {
            if (this.m_n_reliveview.active = true) {
                this.m_n_reliveview.scale = 0;
                this.m_n_reliveview.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3)), cc.scaleTo(0.1, 1, 1)));
                if (window.SKIN_SHARE) {
                    this.showAdBanner(false);
                    var e_1 = cc.find("btn_close", this.m_n_reliveview);
                    e_1.y = -585;
                    this.scheduleOnce(function () {
                        e_1.y = -514;
                        if (!_this.showAdb) {
                            _this.showAdBanner(true);
                        }
                    }, 1.3);
                }
                else {
                    this.showAdBanner(true);
                }
            }
        }
        else {
            this.m_n_displaycheck.active = false;
            this.m_n_displayrank.active = true;
            console.log("this._relivenum++", this._relivenum);
            this.m_n_result_panel.getComponent("GameResult").showFail(this._relivenum, this.m_cur_score, this._killnum);
            this.showAdBanner(true);
            RankList_1.default.setScore(window.INIT_GAME_SAVE_DATA.top_score);
            Utils3_1.Utils3.SetSoundEffect(window.CHALLENG_FAIL_MUSIC);
        }
        this._relivenum++;
    };
    GameMain.prototype.onAdBtnClick = function (t, e) {
        var _this = this;
        EventManager_1.default.instance.showRewardedVideo(function () {
            _this.videoReward(parseInt(e));
        });
    };
    GameMain.prototype.videoReward = function (t) {
        if (t === 1 || t === 3) {
            var e = this.getCanDropBlocks();
            for (var i = 0; i < this.m_n_kuai.length; i++) {
                var o = this.m_n_kuai[i].getComponent("ShapeItem");
                this.m_n_kuai[i].opacity = 255;
                o.resetBlock(e[i] || 0);
            }
            this.m_in_judge = false;
            this.m_n_lookvideo.active = false;
        }
        else if (t === 2) {
            this.m_doublescore = 2;
            this.m_n_doublescore.active = true;
            Utils3_1.Utils3.showTipsText("Double Score", null, 0, 0, 60);
            this.m_n_luckyvideo.active = false;
        }
    };
    GameMain.prototype.judgeGame = function (t) {
        if (!this.m_in_judge) {
            this.m_in_judge = true;
            if (t) {
                console.log("胜利");
                this._killnum++;
                var e = this.m_sp_monster.node.getComponent("MonsterItem").playDead();
                Utils3_1.Utils3.SetSoundEffect(window.CHALLENG_VICTORY_MUSIC);
                var i = this.m_sp_monster.node.parent.position;
                if (this.m_cur_level % 5 === 0) {
                    this.showBox(cc.v2(i.x, i.y - 100), cc.Vec2.ZERO, this.m_cur_level);
                }
                else {
                    this.addGold(3, cc.v2(i.x, i.y - 10), this.m_l_gold.node.position);
                }
                window.INIT_GAME_SAVE_DATA.top_level += 1;
                var o_1 = this;
                this.scheduleOnce(function () {
                    o_1.onNextLevel();
                }, e / 1000);
                this.destroyBlockByHitMonster();
                RankList_1.default.setScore(window.INIT_GAME_SAVE_DATA.top_score);
            }
            else {
                if (this._videonum <= 0) {
                    console.log("失败");
                    this.m_sp_monster.node.getComponent("MonsterItem").playMonsterVictory();
                    this.m_n_lookvideo.active = true;
                    this.m_n_lookvideo.scale = 0;
                    this.m_n_lookvideo.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3)), cc.scaleTo(0.1, 1, 1)));
                    this.m_l_asktype.string = window.firstvideo ? "看视频换一批" : "免费换一批";
                    this._videonum++;
                }
                else {
                    this.onCancelVideo();
                }
            }
        }
    };
    GameMain.prototype.BoxReward = function (t) {
        if (t === 0) {
            this.updateToolsNum();
        }
        else {
            this.updateGold();
        }
    };
    GameMain.prototype.onVideoClose = function () {
        this.m_n_reliveview.active = false;
        this.m_n_displaycheck.active = false;
        this.m_n_displayrank.active = true;
        this.m_n_result_panel.getComponent("GameResult").showFail(this._relivenum, this.m_cur_score, this._killnum);
        this.showAdBanner(true);
        RankList_1.default.setScore(window.INIT_GAME_SAVE_DATA.top_score);
        Utils3_1.Utils3.SetSoundEffect(window.CHALLENG_FAIL_MUSIC);
    };
    GameMain.prototype.onReliveBtnClick = function () {
        var _this = this;
        EventManager_1.default.instance.showRewardedVideo(function () {
            _this.onReliveGameVideo();
        });
    };
    GameMain.prototype.onNextLevel = function () {
        this.m_n_result_panel.active = false;
        this.showAdBanner(false);
        this.m_cur_level = window.INIT_GAME_SAVE_DATA.top_level + 1;
        console.log("this.m_cur", this.m_cur_level);
        this.m_in_judge = false;
        this.m_l_level.string = "LV." + this.m_cur_level;
        this.initMonster(this.m_cur_level);
        this.checkIsLose();
    };
    GameMain.prototype.onBackToMenu = function () {
        Utils3_1.Utils3.setSaveData();
        AudioManager_1.audioManager.stopBgmMusic();
        cc.director.loadScene(window.HALL_SCENE_NAME);
    };
    GameMain.prototype.onBoomClick = function () {
        Utils3_1.Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC);
        if (this.m_gamestate !== 0 || this._isdeleting) {
            return;
        }
        if (this.m_boomnum <= 0) {
            this.m_n_tooluse.active = true;
            this.m_n_tooluse.getComponent("UseToolItem").initToolInfo(0, this.m_boomnum, this.m_spriteAtlas.getSpriteFrame(window.TOOL_CONFIG[0].name));
        }
        else {
            this.m_n_guidemask.active = !this.m_mapblink;
            this.m_touch_boom = !this.m_mapblink;
            this.setMapBlink(!this.m_mapblink);
        }
    };
    GameMain.prototype.onStrongClick = function () {
        Utils3_1.Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC);
        if (this.m_gamestate === 0) {
            this.m_n_tooluse.active = true;
            this.m_n_tooluse.getComponent("UseToolItem").initToolInfo(1, this.m_strongnum, this.m_spriteAtlas.getSpriteFrame(window.TOOL_CONFIG[1].name));
            this.guideMaskClick();
        }
    };
    GameMain.prototype.onUseStrong = function () {
        var t = false;
        for (var e = 0; e < this.m_row; e++) {
            for (var i = 0; i < this.m_col; i++) {
                if (this.m_grid_array[e][i].type === 1 && this.m_grid_array[e][i].obj.getComponent("BlockItem").addStrong()) {
                    t = true;
                }
            }
        }
        if (t) {
            window.INIT_GAME_SAVE_DATA.tool[1] -= 1;
            this.updateToolsNum();
        }
    };
    GameMain.prototype.setMapBlink = function (t) {
        if (t !== this.m_mapblink) {
            this.m_mapblink = t;
            if (t) {
                for (var e = 0; e < this.m_maparray.length; e++) {
                    if (!this.m_maparray[e].isHaveFK) {
                        var i = cc.repeatForever(cc.sequence(cc.scaleTo(0.8, 0.8, 0.8), cc.scaleTo(0.8, 1, 1)));
                        i.setTag(1);
                        this.m_maparray[e].runAction(i);
                    }
                }
            }
            else {
                for (var n = 0; n < this.m_maparray.length; n++) {
                    if (!this.m_maparray[n].isHaveFK) {
                        this.m_maparray[n].stopActionByTag(1);
                        this.m_maparray[n].scale = 1;
                    }
                }
            }
        }
    };
    GameMain.prototype.getTargetGridInfo = function (t) {
        var e = Math.floor(t / this.m_row);
        var i = t % this.m_col;
        return this.m_maparray[e][i];
    };
    GameMain.prototype.onReliveGameVideo = function () {
        Utils3_1.Utils3.showTipsText("复活成功", undefined, 0, 0, 40);
        this.m_in_judge = false;
        for (var t = 0; t < this.m_n_kuai.length; t++) {
            this.m_n_kuai[t].getComponent("ShapeItem").resetBlock();
            this.m_n_kuai[t].opacity = 255;
        }
        this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
        this.m_n_result_panel.active = false;
        this.m_n_reliveview.active = false;
        this.m_maparray.forEach(function (t) {
            t.getChildByName("colorSpr");
        });
        for (var e = 0; e < this.m_maparray.length; e++) {
            var i = this.m_maparray[e].getChildByName("colorSpr");
            if (i) {
                i.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
            }
            this.m_maparray[e].isHaveFK = null;
        }
        RankList_1.default.checkWillSurpass(this.m_cur_score);
        this.m_n_displaycheck.active = true;
        this.m_n_displayrank.active = false;
        this.m_gamestate = 0;
    };
    GameMain.prototype.onReliveGame = function () {
        Utils3_1.Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        if (window.INIT_GAME_SAVE_DATA.gold_num >= 20) {
            Utils3_1.Utils3.showTipsText("复活成功", undefined, 0, 0, 40);
            this.m_in_judge = false;
            window.INIT_GAME_SAVE_DATA.gold_num -= 20;
            this.updateGold();
            for (var t = 0; t < this.m_n_kuai.length; t++) {
                this.m_n_kuai[t].getComponent("ShapeItem").resetBlock(0);
                this.m_n_kuai[t].opacity = 255;
            }
            this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
            this.m_n_result_panel.active = false;
            c.checkWillSurpass(this.m_cur_score);
            this.m_n_displaycheck.active = true;
            this.m_n_displayrank.active = false;
            this.m_gamestate = 0;
        }
        else {
            ShareSdk_1.ShareSdk.shareAppMessage({
                title: "来帮帮我，我被怪物消灭了",
                imageUrl: window.tempFileURL[1],
                success: function () { },
                fail: function () { },
                complete: function () { }
            });
        }
    };
    GameMain.prototype.showAdBanner = function (t) {
        if (t) {
            lplatform.showBanner();
        }
        else {
            lplatform.hideBanner();
        }
    };
    GameMain.prototype.onOpenAskPanel = function () {
        this.m_n_askpanel.active = true;
    };
    GameMain.prototype.onCloseAskPanel = function () {
        this.m_n_askpanel.active = false;
    };
    GameMain.prototype.update = function (dt) {
        if (this.m_normal_curtime !== -1) {
            this.m_normal_curtime += dt;
            if (this.m_normal_curtime >= this.m_normal_talktime && this.m_gamestate === 0) {
                this.m_normal_curtime = 0;
                this.m_sp_monster.node.getComponent("MonsterItem").playNormal();
            }
        }
    };
    GameMain.prototype.guideMaskClick = function () {
        // Implementation needed
    };
    __decorate([
        property(cc.AudioClip)
    ], GameMain.prototype, "bgm", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_gamenode", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_bg_panel", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMain.prototype, "m_pre_blockbg", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMain.prototype, "m_pre_light", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMain.prototype, "m_pre_boomeffect", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMain.prototype, "m_pre_boom", void 0);
    __decorate([
        property(cc.Label)
    ], GameMain.prototype, "m_l_boomnum", void 0);
    __decorate([
        property(cc.Label)
    ], GameMain.prototype, "m_l_score", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameMain.prototype, "m_sp_monster", void 0);
    __decorate([
        property(cc.Label)
    ], GameMain.prototype, "m_l_level", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_result_panel", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_btn_tool2", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_guidemask", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_tooluse", void 0);
    __decorate([
        property([cc.Node])
    ], GameMain.prototype, "m_n_showtime", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], GameMain.prototype, "m_spf_gold", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_askpanel", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_boss", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], GameMain.prototype, "m_spriteAtlas", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_bglist", void 0);
    __decorate([
        property(cc.Label)
    ], GameMain.prototype, "m_l_gold", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameMain.prototype, "m_pre_rock", void 0);
    __decorate([
        property([cc.Node])
    ], GameMain.prototype, "m_n_kuai", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_displaycheck", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_displayrank", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_stepview", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_reliveview", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_video", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_lookvideo", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_luckyvideo", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_doublevideo", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_doublescore", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_sharegift", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_skinpanel", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_guidenode", void 0);
    __decorate([
        property(cc.Label)
    ], GameMain.prototype, "m_l_asktype", void 0);
    __decorate([
        property(cc.Node)
    ], GameMain.prototype, "m_n_guidefiger", void 0);
    GameMain = __decorate([
        ccclass
    ], GameMain);
    return GameMain;
}(cc.Component));
exports.default = GameMain;

cc._RF.pop();