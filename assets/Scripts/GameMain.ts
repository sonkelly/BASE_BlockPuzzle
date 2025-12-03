import { audioManager } from "./AudioManager";
import { Utils3 } from "./Utils3";
import { ShareSdk } from "./ShareSdk";
import RankList from "./RankList";
import EventManager from "./EventManager";
import ConstValue from "./ConstValue";
import { GameData } from "./GameData";
import { Property } from "./Property";
import EventListener from "./event_listener";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;

    @property(cc.Node)
    m_n_gamenode: cc.Node = null;

    @property(cc.Node)
    m_n_bg_panel: cc.Node = null;

    @property(cc.Prefab)
    m_pre_blockbg: cc.Prefab = null;

    @property(cc.Prefab)
    m_pre_light: cc.Prefab = null;

    @property(cc.Prefab)
    m_pre_boomeffect: cc.Prefab = null;

    @property(cc.Prefab)
    m_pre_boom: cc.Prefab = null;

    @property(cc.Label)
    m_l_boomnum: cc.Label = null;

    @property(cc.Label)
    m_l_score: cc.Label = null;

    @property(cc.Sprite)
    m_sp_monster: cc.Sprite = null;

    @property(cc.Label)
    m_l_level: cc.Label = null;

    @property(cc.Node)
    m_n_result_panel: cc.Node = null;

    @property(cc.Node)
    m_btn_tool2: cc.Node = null;

    @property(cc.Node)
    m_n_guidemask: cc.Node = null;

    @property(cc.Node)
    m_n_tooluse: cc.Node = null;

    @property([cc.Node])
    m_n_showtime: cc.Node[] = [];

    @property(cc.SpriteFrame)
    m_spf_gold: cc.SpriteFrame = null;

    @property(cc.Node)
    m_n_askpanel: cc.Node = null;

    @property(cc.Node)
    m_n_boss: cc.Node = null;

    @property(cc.SpriteAtlas)
    m_spriteAtlas: cc.SpriteAtlas = null;

    @property(cc.Node)
    m_n_bglist: cc.Node = null;

    @property(cc.Label)
    m_l_gold: cc.Label = null;

    @property(cc.Prefab)
    m_pre_rock: cc.Prefab = null;

    @property([cc.Node])
    m_n_kuai: cc.Node[] = [];

    @property(cc.Node)
    m_n_displaycheck: cc.Node = null;

    @property(cc.Node)
    m_n_displayrank: cc.Node = null;

    @property(cc.Node)
    m_n_stepview: cc.Node = null;

    @property(cc.Node)
    m_n_reliveview: cc.Node = null;

    @property(cc.Node)
    m_n_video: cc.Node = null;

    @property(cc.Node)
    m_n_lookvideo: cc.Node = null;

    @property(cc.Node)
    m_n_luckyvideo: cc.Node = null;

    @property(cc.Node)
    m_n_doublevideo: cc.Node = null;

    @property(cc.Node)
    m_n_doublescore: cc.Node = null;

    @property(cc.Node)
    m_n_sharegift: cc.Node = null;

    @property(cc.Node)
    m_n_skinpanel: cc.Node = null;

    @property(cc.Node)
    m_n_guidenode: cc.Node = null;

    @property(cc.Label)
    m_l_asktype: cc.Label = null;

    @property(cc.Node)
    m_n_guidefiger: cc.Node = null;

    // Private properties
    private m_gamestate: number = 0;
    private m_cur_score: number = 0;
    private m_cur_level: number = 0;
    private m_normal_talktime: number = 4;
    private m_normal_curtime: number = -1;
    private m_target_block: any[] = [];
    private m_mapblink: boolean = false;
    private m_touch_boom: boolean = false;
    private _relivenum: number = 0;
    private _videonum: number = 0;
    private _killnum: number = 0;
    private m_doublescore: number = 1;
    private _isdeleting: boolean = false;
    private _isbless: boolean = false;
    private m_block_pool: cc.NodePool = null;
    private m_light_pool: cc.NodePool = null;
    private m_boomnum: number = 0;
    private _configlist: any = null;
    private _tempguide: boolean = false;
    private m_in_judge: boolean = false;
    private m_bannerad: any = null;
    private m_maparray: cc.Node[] = [];
    private m_row: number = 0;
    private m_col: number = 0;
    private m_grid_array: any[][] = [];
    private m_solidernum: number = 0;
    private m_cur_attack_num: number = 0;
    private m_strongnum: number = 0;
    private showAdb: boolean = false;

    onLoad(): void {
        Property.GAME_CONTROL = this;
        Utils3.setDesignResolution();
    }

    onDestroy(): void {
        this.m_block_pool.clear();
        this.m_light_pool.clear();
        Property.GAME_CONTROL = null;
        if (this.m_bannerad) {
            this.m_bannerad.destroy();
            this.m_bannerad = null;
        }
        EventListener.instance.off(window.GAME_UPDATE_DATA, this);
        EventListener.instance.off(window.GAME_SAVE_HANDLER, this);
    }

    start(): void {
        if (GameData.audioSwitch === 1) {
            audioManager.playBgmMusic(this.bgm);
        }
        if (window.firstGame) {
            window.firstGame = false;
        }
        this.createMap();
        this.initData();
        this.initMonster(this.m_cur_level);
        this.showAdBanner(false);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        EventListener.instance.on(window.GAME_UPDATE_DATA, this.updateGold, this);
        EventListener.instance.on(window.GAME_SAVE_HANDLER, this.updateSkin, this);
    }

    initData(): void {
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
        this.schedule(() => {
            this.m_btn_tool2.runAction(cc.sequence(
                cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3),
                cc.rotateTo(0.1, 0)
            ));
            this.m_n_video.runAction(cc.sequence(
                cc.delayTime(1),
                cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3),
                cc.rotateTo(0.1, 0)
            ));
            this.m_n_doublevideo.runAction(cc.sequence(
                cc.delayTime(2),
                cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3),
                cc.rotateTo(0.1, 0)
            ));
        }, 5);
        this._configlist = this.m_n_kuai[0].getComponent("ShapeItem").getTheConfig();
        RankList.checkWillSurpass(this.m_cur_score);
        const e = Utils3.random(0, 1000);
        if (this.m_n_luckyvideo.active = e <= 500 && this.m_cur_level > 1) {
            this.m_n_luckyvideo.scale = 0;
            this.m_n_luckyvideo.runAction(cc.sequence(
                cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3)),
                cc.scaleTo(0.1, 1, 1)
            ));
            if (window.SKIN_SHARE) {
                const i = cc.find("btn_cancel", this.m_n_luckyvideo);
                i.y = -570;
                this.scheduleOnce(() => {
                    i.y = -514;
                    if (this.m_n_luckyvideo.active && !this.showAdb) {
                        this.showAdBanner(true);
                    }
                }, 1.8);
            }
        }
    }

    hideGuide(): void {
        if (this.m_cur_level === 1) {
            this.m_n_guidenode.active = false;
            this.m_n_guidefiger.stopAllActions();
            this.m_n_guidefiger.active = false;
            window.GUIDE_LEVEL = 1;
            cc.sys.localStorage.setItem("guideinfo", "1");
        }
    }

    showGuide(): void {
        if (!this._tempguide) {
            this._tempguide = true;
            let e = 0;
            for (let n = 0; n < window.INIT_GAME_SAVE_DATA.skin.length; n++) {
                if (window.INIT_GAME_SAVE_DATA.skin[n] >= 2) {
                    e = n;
                    break;
                }
            }
            const o = window.SKIN_CONFIG[e];
            this.m_n_guidenode.active = true;
            this.m_n_guidefiger.active = true;
            this.m_n_guidefiger.position = this.m_n_kuai[1].position;
            this.m_n_guidefiger.runAction(cc.repeatForever(cc.sequence(
                cc.callFunc(() => {
                    this.m_n_guidefiger.position = this.m_n_kuai[1].position;
                }),
                cc.moveTo(1, this.m_n_kuai[1].x, this.m_n_kuai[1].y + 350)
            )));
            const c = this.m_n_kuai[0].getComponent("ShapeItem").getCurColorIndex();
            const s: number[] = [];
            s[46] = 1;
            s[52] = 1;
            s[53] = 1;
            s[58] = 1;
            for (let a = 43; a < 61; a++) {
                if (!s[a]) {
                    const r = new cc.Node("colorSpr");
                    r.colorIndex = c;
                    r.colorName = o.name;
                    const _ = r.addComponent(cc.Sprite);
                    console.log(o.name, c);
                    _.spriteFrame = this.m_spriteAtlas.getSpriteFrame(o.name + c);
                    r.position = cc.Vec2.ZERO;
                    r.parent = this.m_maparray[a];
                    this.m_maparray[a].isHaveFK = true;
                }
            }
        }
    }

    onKeepGoing(): void {
        this.m_n_luckyvideo.active = false;
        this.showAdBanner(false);
    }

    touchEnd(t: cc.Event.EventTouch): void {
        if (this.m_gamestate === 0 && this.m_touch_boom) {
            this.m_gamestate = 2;
            let e = t.touch.getLocation();
            e = this.m_n_gamenode.convertToNodeSpace(e);
            const i = this.backIndexofList(e);
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
            for (let n = 0; n < this.m_n_kuai.length; n++) {
                this.m_n_kuai[n].opacity = this.m_n_kuai[n].getComponent("ShapeItem").checkIsLose() ? 125 : 255;
            }
        }
    }

    doBoomAction(t: cc.Vec2, e: number): void {
        this.m_maparray[e].getChildByName("colorSpr").runAction(cc.sequence(
            cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)),
            cc.removeSelf(true)
        ));
        this.m_maparray[e].isHaveFK = null;
        this.scheduleOnce(() => {
            const e = cc.instantiate(this.m_pre_boomeffect);
            e.parent = this.m_n_gamenode;
            e.position = t;
            e.y -= 100;
            e.zIndex = 256;
            e.getComponent(cc.Animation).play("bombeffect");
            Utils3.SetSoundEffect(window.BOOM_EFFECT);
        }, 0.4);
        const o = this.getBoomIndexList(e);
        console.log(o);
        let c = 0;
        const s: any[] = [];
        s.push(cc.delayTime(0.4));
        for (let a = 0; a < o.length; a++) {
            const r = o[a];
            for (let _ = 0; _ < r.length; _++) {
                const h = r[_];
                if (this.m_maparray[h].isHaveFK) {
                    s.push(cc.callFunc(() => {
                        const t = arguments[1][0];
                        const e = arguments[1][1];
                        const i = this.getAddScoreCal(e);
                        Utils3.showHurtText("+" + i, this.m_n_gamenode, this.m_maparray[t].x, this.m_maparray[t].y, 20, undefined, undefined, undefined, true);
                        this.updateScore(i);
                    }, this, [h, c]));
                    s.push(cc.callFunc(() => {
                        const t = arguments[1];
                        this.m_maparray[t].isHaveFK = null;
                        const e = this.m_maparray[t].getChildByName("colorSpr");
                        if (e) {
                            this.attackMonster(e.colorIndex, this.m_maparray[t].x, this.m_maparray[t].y);
                            e.runAction(cc.sequence(
                                cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)),
                                cc.removeSelf(true)
                            ));
                        }
                    }, this, h));
                    c++;
                }
            }
            s.push(cc.delayTime(0.3));
        }
        if (s.length > 0) {
            s.push(cc.callFunc(() => {
                this._isdeleting = false;
                this.checkIsLose();
            }, this));
            this._isdeleting = true;
            const m = cc.sequence(s);
            this.node.runAction(m);
        }
    }

    getBoomIndexList(t: number): any {
        return ConstValue.BOOM_RANGE[t];
    }

    bombFinish(): void {}

    getCanDropBlocks(): number[] {
        const t: number[] = [0, 0, 0];
        for (let e = this._configlist.length - 1; e >= 1; e--) {
            for (let i = 0; i < this.m_maparray.length; i++) {
                const o = this.m_maparray[i];
                const c = cc.v2(o.x, o.y);
                let s = 1;
                if (!o.isHaveFK) {
                    const a = this._configlist[e];
                    for (let r = 1; r < a.length; r++) {
                        const _ = c.add(cc.v2(a[r].x, a[r].y));
                        for (let h = 0; h < this.m_maparray.length; h++) {
                            const m = this.m_maparray[h];
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
            const l = Utils3.getRandomSDiff(0, t.length - 1, 3);
            return [t[l[0]], t[l[1]], t[l[2]]];
        }
        return [t[0], t[1], t[2]];
    }

    backIndexofList(t: cc.Vec2): number {
        for (let e = 0; e < ConstValue.INDEX_TO_POINT.length; e++) {
            if (t.sub(cc.v2(ConstValue.INDEX_TO_POINT[e][0], ConstValue.INDEX_TO_POINT[e][1])).mag() <= 50) {
                return e;
            }
        }
        return -1;
    }

    updateToolsNum(): void {
        this.m_boomnum = window.INIT_GAME_SAVE_DATA.tool[0];
        this.m_l_boomnum.string = "x" + this.m_boomnum;
        this.setAddVisible(this.m_btn_tool2, this.m_boomnum);
        this.updateGold();
    }

    updateGold(): void {
        this.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num.toString();
    }

    updateSkin(): void {
        console.log("updateskin");
        let t = 0;
        for (let e = 0; e < this.m_n_kuai.length; e++) {
            t = this.m_n_kuai[e].getComponent("ShapeItem").updateIndex(true);
        }
        const i = window.SKIN_CONFIG[t];
        for (let n = 0; n < this.m_maparray.length; n++) {
            const o = this.m_maparray[n].getChildByName("colorSpr");
            if (o) {
                o.getComponent(cc.Sprite).spriteFrame = this.m_spriteAtlas.getSpriteFrame(i.name + o.colorIndex);
            }
        }
    }

    setAddVisible(t: cc.Node, e: number): void {
        cc.find("sp_add", t).active = e <= 0;
    }

    updateScore(t: number): void {
        this.m_cur_score += t;
        this.m_l_score.string = this.m_cur_score.toString();
        if (!this.m_n_result_panel.active) {
            RankList.checkWillSurpass(this.m_cur_score);
        }
        if (this.m_cur_score > window.INIT_GAME_SAVE_DATA.top_score) {
            window.INIT_GAME_SAVE_DATA.top_score = this.m_cur_score;
            RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
        }
    }

    createMap(): void {
        this.m_maparray = [];
        const t: cc.Node[] = [];
        for (let e = 0; e < ConstValue.INDEX_TO_POINT.length; e++) {
            const n = cc.instantiate(this.m_pre_blockbg);
            n.x = ConstValue.INDEX_TO_POINT[e][0];
            n.y = ConstValue.INDEX_TO_POINT[e][1];
            n.parent = this.m_n_bglist;
            n.FKIndex = e;
            t.push(n);
        }
        this.m_maparray = t;
    }

    initMonster(t: number): void {
        let e = t % 100;
        if (e <= 0) {
            e += 1;
        }
        const i = window.MAP_CONFIG[e - 1];
        this.m_sp_monster.node.getComponent("MonsterItem").initType(i.mon_id, i.mon_hp, t);
        this.m_sp_monster.node.active = true;
        this.m_sp_monster.node.opacity = 255;
        this.m_sp_monster.node.y = 300;
        let n = 0;
        this.m_sp_monster.node.getComponent("MonsterItem").playStartTalk();
        if (i.mon_id === 0) {
            n = -10;
        }
        this.m_sp_monster.node.runAction(cc.moveTo(0.4, 0, n).easing(cc.easeIn(3)));
        if (t % 5 === 0) {
            this.m_n_boss.active = true;
            this.m_n_boss.opacity = 50;
            this.m_n_boss.scale = 2.5;
            this.m_n_boss.runAction(cc.sequence(
                cc.spawn(cc.scaleTo(0.8, 1).easing(cc.easeBackIn(3)), cc.fadeTo(0.8, 255)),
                cc.moveBy(0.02, cc.v2(20, 0)),
                cc.moveBy(0.04, cc.v2(-40, 0)),
                cc.moveBy(0.02, cc.v2(20, 0)),
                cc.moveBy(0.02, cc.v2(0, 20)),
                cc.moveBy(0.04, cc.v2(0, -40)),
                cc.moveBy(0.02, cc.v2(0, 20)),
                cc.moveBy(0.02, cc.v2(10, 0)),
                cc.moveBy(0.04, cc.v2(-20, 0)),
                cc.moveBy(0.02, cc.v2(10, 0)),
                cc.moveBy(0.02, cc.v2(0, 10)),
                cc.moveBy(0.04, cc.v2(0, -20)),
                cc.moveBy(0.02, cc.v2(0, 10)),
                cc.fadeOut(1.5)
            ));
        }
    }

    addScore(t: number, e: boolean): void {
        const i = this.getAddScoreCal(t, e);
        Utils3.showHurtText("+" + i, null, 0, 0, 30);
        this.updateScore(i);
    }

    getAddScoreCal(t: number, e?: boolean): number {
        const i = t + 1;
        return e ? i : i * i * this.m_doublescore;
    }

    checkIsLose(): void {
        if (!this._isdeleting) {
            this.m_normal_curtime = 0;
            let t = 0;
            for (let e = 0; e < 3; e++) {
                const i = cc.find("n_kuai" + (e + 1), this.m_n_gamenode);
                if (i.getComponent("ShapeItem").checkIsLose()) {
                    t++;
                    i.opacity = 125;
                } else {
                    i.opacity = 255;
                }
            }
            if (t >= 2 && !this._isbless) {
                this._isbless = true;
                for (let n = 0; n < 3; n++) {
                    cc.find("n_kuai" + (n + 1), this.m_n_gamenode).getComponent("ShapeItem").setNextBlock(0);
                }
            }
            if (t === 3) {
                this.judgeGame(false);
            }
        }
    }

    checkClearUp(): void {
        const t: number[] = [];
        for (let e = 0; e < this.m_maparray.length; e++) {
            if (this.m_maparray[e].isHaveFK) {
                t.push(this.m_maparray[e].FKIndex);
            }
        }
        t.sort((t, e) => t - e);
        const o: any[] = [];
        for (let c = 0; c < ConstValue.DISLIST.length; c++) {
            const s = ConstValue.DISLIST[c];
            const a = this.get2AryIntersect(t, s);
            if (a.length > 0 && this.check2AryIsEqual(s, a)) {
                o.push(s);
            }
        }
        const r: any[] = [];
        let _ = 0;
        let h = 0;
        let m = 0;
        for (let l = 0; l < o.length; l++) {
            const p = o[l];
            h += p.length;
            for (let d = 0; d < p.length; d++) {
                const u = p[d];
                r.push(cc.callFunc(() => {
                    const t = arguments[1][0];
                    const e = arguments[1][1];
                    const i = this.getAddScoreCal(e);
                    Utils3.showHurtText("+" + i, this.m_n_gamenode, this.m_maparray[t].x, this.m_maparray[t].y, 20, undefined, undefined, undefined, true);
                    this.updateScore(i);
                }, this, [u, _]));
                r.push(cc.callFunc(() => {
                    const t = arguments[1];
                    this.m_maparray[t].isHaveFK = null;
                    const e = this.m_maparray[t].getChildByName("colorSpr");
                    if (e) {
                        this.attackMonster(e.colorIndex, this.m_maparray[t].x, this.m_maparray[t].y);
                        e.runAction(cc.sequence(
                            cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)),
                            cc.removeSelf(true)
                        ));
                    }
                }, this, u));
                r.push(cc.delayTime(0.1));
                _++;
            }
        }
        if (r.length > 0) {
            Utils3.SetSoundEffect(window.GET_GOLD);
            r.push(cc.callFunc(() => {
                this._isdeleting = false;
                this.checkIsLose();
            }, this));
            this.handlerShowTime(h);
            this._isdeleting = true;
            const v = cc.sequence(r);
            this.node.runAction(v);
        }
    }

    get2AryIntersect(t: number[], e: number[]): number[] {
        const i: number[] = [];
        for (let n = 0; n < t.length; n++) {
            for (let o = 0; o < e.length; o++) {
                if (e[o] === t[n]) {
                    i.push(e[o]);
                }
            }
        }
        return i;
    }

    check2AryIsEqual(t: number[], e: number[]): boolean {
        for (let i = 0; i < t.length; i++) {
            if (e[i] !== t[i]) {
                return false;
            }
        }
        return true;
    }

    handlerShowTime(t: number): void {
        console.log("handlerShowTime", t);
        let e = -1;
        if (t > 9 && t <= 12) {
            e = 0;
        } else if (t > 12 && t <= 15) {
            e = 1;
        } else if (t > 15) {
            e = 2;
        }
        if (e >= 0) {
            if (e === 2) {
                Utils3.SetSoundEffect(window.SAY_3);
            } else {
                Utils3.SetSoundEffect(window.GET_GOLD);
            }
            this.m_n_showtime[e].active = true;
            this.m_n_showtime[e].getComponent(cc.Animation).play();
            setTimeout(() => {
                this.m_n_showtime[e].active = false;
            }, 1500);
        }
    }

    addGold(t: number, e: number, i: number): void {
        window.INIT_GAME_SAVE_DATA.gold_num += t;
        for (let s = 0; s < t; s++) {
            Utils3.moveIcon(this.m_spf_gold, this.m_n_gamenode, e, i, () => {
                Utils3.SetSoundEffect(window.GET_GOLD);
                this.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num.toString();
            }, 0.5, 60 * (s + 1));
        }
    }

    showBox(t: cc.Vec2, e: cc.Vec2, i: number): void {
        const c = () => {
            if (i % 10 === 0 && i <= 370) {
                this.m_n_stepview.scale = 0;
                this.m_n_stepview.active = true;
                this.m_n_stepview.runAction(cc.sequence(
                    cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3)),
                    cc.scaleTo(0.1, 1, 1)
                ));
                this.m_n_stepview.getComponent("StepViewItem").showStep(i);
            }
        };
        Utils3.loadRes("sprite/getshare_box", cc.SpriteFrame, (i: cc.SpriteFrame) => {
            Utils3.moveIcon(i, this.m_n_gamenode, t, e, () => {
                this.m_n_sharegift.active = true;
                this.m_n_sharegift.getComponent("GetBoxGiftItem").showView(c);
            }, 0.8, 100);
        });
    }

    attackMonster(t: number, e: number, i: number): void {
        const c = t ? 2 * t : 2;
        let s = this.m_block_pool.get();
        if (!s) {
            s = cc.instantiate(this.m_pre_rock);
        }
        let a = Utils3.getAngle(this.m_sp_monster.node.parent.x, this.m_sp_monster.node.parent.y, e, i);
        if (this.m_sp_monster.node.parent.x <= e) {
            a = -a;
        }
        s.angle = -a;
        s.getComponent("RockItem").resetSytem();
        s.zIndex = 32;
        s.parent = this.m_n_gamenode;
        s.x = e;
        s.y = i;
        s.runAction(cc.sequence(
            cc.callFunc(() => {}),
            cc.moveTo(1, cc.v2(this.m_sp_monster.node.parent.x, this.m_sp_monster.node.parent.y)).easing(cc.easeIn(2)),
            cc.callFunc(() => {
                this.m_block_pool.put(s);
                s = null;
                this.monsterbeHit(c);
            })
        ));
    }

    destroyBlockByHitMonster(): void {
        const t = this;
        const e = this;
        const i: number[] = [];
        let o = 4;
        for (let c = 0; c < this.m_maparray.length && !(this.m_maparray[c].isHaveFK && (i.push(c), --o <= 0)); c++) {}
        const s = (o: number) => {
            let c = t.m_light_pool.get();
            if (!c) {
                c = cc.instantiate(t.m_pre_light);
            }
            const s = t.m_maparray[i[o]].position;
            c.parent = t.m_n_gamenode;
            c.position = cc.v2(t.m_sp_monster.node.parent.x, t.m_sp_monster.node.parent.y);
            c.runAction(cc.sequence(
                cc.callFunc(() => {
                    Utils3.SetSoundEffect(window.GET_GOLD);
                }),
                cc.moveTo(0.8, s).easing(cc.easeIn(2)),
                cc.callFunc(() => {
                    e.m_light_pool.put(c);
                    c = null;
                    e.blockBeHit(i[o]);
                })
            ));
        };
        for (let a = 0; a < i.length; a++) {
            s(a);
        }
    }

    blockBeHit(t: number): void {
        this.m_maparray[t].isHaveFK = null;
        for (let e = 0; e < this.m_n_kuai.length; e++) {
            this.m_n_kuai[e].opacity = this.m_n_kuai[e].getComponent("ShapeItem").checkIsLose() ? 125 : 255;
        }
        const i = this.m_maparray[t].getChildByName("colorSpr");
        if (i) {
            i.runAction(cc.sequence(
                cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)),
                cc.removeSelf(true)
            ));
        }
    }

    monsterbeHit(t: number): void {
        Utils3.SetSoundEffect(window.BE_HIT);
        Utils3.showHurtText("-" + t, this.m_sp_monster.node.parent, 0, 100, 30, new cc.Color(230, 71, 21), 0.8);
        this.updateScore(t);
        const e = this.m_sp_monster.node.getComponent("MonsterItem").reduceHp(t);
        if (e <= 0) {
            this.m_normal_curtime = -1;
            this.judgeGame(true);
        } else {
            this.m_normal_curtime = 0;
            if (this.m_solidernum <= 0 && this.m_cur_attack_num <= 0) {
                this.judgeGame(false);
            } else if (this.m_cur_attack_num <= 0 && e <= 20) {
                this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
            } else {
                this.m_sp_monster.node.getComponent("MonsterItem").playBeHit();
            }
        }
    }

    onOpenSkinPanel(): void {
        this.m_n_skinpanel.active = true;
    }

    onCancelVideo(): void {
        this.m_n_lookvideo.active = false;
        if (this._relivenum <= 0) {
            if (this.m_n_reliveview.active = true) {
                this.m_n_reliveview.scale = 0;
                this.m_n_reliveview.runAction(cc.sequence(
                    cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3)),
                    cc.scaleTo(0.1, 1, 1)
                ));
                if (window.SKIN_SHARE) {
                    this.showAdBanner(false);
                    const e = cc.find("btn_close", this.m_n_reliveview);
                    e.y = -585;
                    this.scheduleOnce(() => {
                        e.y = -514;
                        if (!this.showAdb) {
                            this.showAdBanner(true);
                        }
                    }, 1.3);
                } else {
                    this.showAdBanner(true);
                }
            }
        } else {
            this.m_n_displaycheck.active = false;
            this.m_n_displayrank.active = true;
            console.log("this._relivenum++", this._relivenum);
            this.m_n_result_panel.getComponent("GameResult").showFail(this._relivenum, this.m_cur_score, this._killnum);
            this.showAdBanner(true);
            RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
            Utils3.SetSoundEffect(window.CHALLENG_FAIL_MUSIC);
        }
        this._relivenum++;
    }

    onAdBtnClick(t: any, e: string): void {
        EventManager.instance.showRewardedVideo(() => {
            this.videoReward(parseInt(e));
        });
    }

    videoReward(t: number): void {
        if (t === 1 || t === 3) {
            const e = this.getCanDropBlocks();
            for (let i = 0; i < this.m_n_kuai.length; i++) {
                const o = this.m_n_kuai[i].getComponent("ShapeItem");
                this.m_n_kuai[i].opacity = 255;
                o.resetBlock(e[i] || 0);
            }
            this.m_in_judge = false;
            this.m_n_lookvideo.active = false;
        } else if (t === 2) {
            this.m_doublescore = 2;
            this.m_n_doublescore.active = true;
            Utils3.showTipsText("Double Score", null, 0, 0, 60);
            this.m_n_luckyvideo.active = false;
        }
    }

    judgeGame(t: boolean): void {
        if (!this.m_in_judge) {
            this.m_in_judge = true;
            if (t) {
                console.log("胜利");
                this._killnum++;
                const e = this.m_sp_monster.node.getComponent("MonsterItem").playDead();
                Utils3.SetSoundEffect(window.CHALLENG_VICTORY_MUSIC);
                const i = this.m_sp_monster.node.parent.position;
                if (this.m_cur_level % 5 === 0) {
                    this.showBox(cc.v2(i.x, i.y - 100), cc.Vec2.ZERO, this.m_cur_level);
                } else {
                    this.addGold(3, cc.v2(i.x, i.y - 10), this.m_l_gold.node.position);
                }
                window.INIT_GAME_SAVE_DATA.top_level += 1;
                const o = this;
                this.scheduleOnce(() => {
                    o.onNextLevel();
                }, e / 1000);
                this.destroyBlockByHitMonster();
                RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
            } else {
                if (this._videonum <= 0) {
                    console.log("失败");
                    this.m_sp_monster.node.getComponent("MonsterItem").playMonsterVictory();
                    this.m_n_lookvideo.active = true;
                    this.m_n_lookvideo.scale = 0;
                    this.m_n_lookvideo.runAction(cc.sequence(
                        cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3)),
                        cc.scaleTo(0.1, 1, 1)
                    ));
                    this.m_l_asktype.string = window.firstvideo ? "看视频换一批" : "免费换一批";
                    this._videonum++;
                } else {
                    this.onCancelVideo();
                }
            }
        }
    }

    BoxReward(t: number): void {
        if (t === 0) {
            this.updateToolsNum();
        } else {
            this.updateGold();
        }
    }

    onVideoClose(): void {
        this.m_n_reliveview.active = false;
        this.m_n_displaycheck.active = false;
        this.m_n_displayrank.active = true;
        this.m_n_result_panel.getComponent("GameResult").showFail(this._relivenum, this.m_cur_score, this._killnum);
        this.showAdBanner(true);
        RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
        Utils3.SetSoundEffect(window.CHALLENG_FAIL_MUSIC);
    }

    onReliveBtnClick(): void {
        EventManager.instance.showRewardedVideo(() => {
            this.onReliveGameVideo();
        });
    }

    onNextLevel(): void {
        this.m_n_result_panel.active = false;
        this.showAdBanner(false);
        this.m_cur_level = window.INIT_GAME_SAVE_DATA.top_level + 1;
        console.log("this.m_cur", this.m_cur_level);
        this.m_in_judge = false;
        this.m_l_level.string = "LV." + this.m_cur_level;
        this.initMonster(this.m_cur_level);
        this.checkIsLose();
    }

    onBackToMenu(): void {
        Utils3.setSaveData();
        audioManager.stopBgmMusic();
        cc.director.loadScene(window.HALL_SCENE_NAME);
    }

    onBoomClick(): void {
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC);
        if (this.m_gamestate !== 0 || this._isdeleting) {
            return;
        }
        if (this.m_boomnum <= 0) {
            this.m_n_tooluse.active = true;
            this.m_n_tooluse.getComponent("UseToolItem").initToolInfo(0, this.m_boomnum, this.m_spriteAtlas.getSpriteFrame(window.TOOL_CONFIG[0].name));
        } else {
            this.m_n_guidemask.active = !this.m_mapblink;
            this.m_touch_boom = !this.m_mapblink;
            this.setMapBlink(!this.m_mapblink);
        }
    }

    onStrongClick(): void {
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC);
        if (this.m_gamestate === 0) {
            this.m_n_tooluse.active = true;
            this.m_n_tooluse.getComponent("UseToolItem").initToolInfo(1, this.m_strongnum, this.m_spriteAtlas.getSpriteFrame(window.TOOL_CONFIG[1].name));
            this.guideMaskClick();
        }
    }

    onUseStrong(): void {
        let t = false;
        for (let e = 0; e < this.m_row; e++) {
            for (let i = 0; i < this.m_col; i++) {
                if (this.m_grid_array[e][i].type === 1 && this.m_grid_array[e][i].obj.getComponent("BlockItem").addStrong()) {
                    t = true;
                }
            }
        }
        if (t) {
            window.INIT_GAME_SAVE_DATA.tool[1] -= 1;
            this.updateToolsNum();
        }
    }

    setMapBlink(t: boolean): void {
        if (t !== this.m_mapblink) {
            this.m_mapblink = t;
            if (t) {
                for (let e = 0; e < this.m_maparray.length; e++) {
                    if (!this.m_maparray[e].isHaveFK) {
                        const i = cc.repeatForever(cc.sequence(cc.scaleTo(0.8, 0.8, 0.8), cc.scaleTo(0.8, 1, 1)));
                        i.setTag(1);
                        this.m_maparray[e].runAction(i);
                    }
                }
            } else {
                for (let n = 0; n < this.m_maparray.length; n++) {
                    if (!this.m_maparray[n].isHaveFK) {
                        this.m_maparray[n].stopActionByTag(1);
                        this.m_maparray[n].scale = 1;
                    }
                }
            }
        }
    }

    getTargetGridInfo(t: number): any {
        const e = Math.floor(t / this.m_row);
        const i = t % this.m_col;
        return this.m_maparray[e][i];
    }

    onReliveGameVideo(): void {
        Utils3.showTipsText("复活成功", undefined, 0, 0, 40);
        this.m_in_judge = false;
        for (let t = 0; t < this.m_n_kuai.length; t++) {
            this.m_n_kuai[t].getComponent("ShapeItem").resetBlock();
            this.m_n_kuai[t].opacity = 255;
        }
        this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
        this.m_n_result_panel.active = false;
        this.m_n_reliveview.active = false;
        this.m_maparray.forEach((t) => {
            t.getChildByName("colorSpr");
        });
        for (let e = 0; e < this.m_maparray.length; e++) {
            const i = this.m_maparray[e].getChildByName("colorSpr");
            if (i) {
                i.runAction(cc.sequence(
                    cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)),
                    cc.removeSelf(true)
                ));
            }
            this.m_maparray[e].isHaveFK = null;
        }
        RankList.checkWillSurpass(this.m_cur_score);
        this.m_n_displaycheck.active = true;
        this.m_n_displayrank.active = false;
        this.m_gamestate = 0;
    }

    onReliveGame(): void {
        Utils3.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        if (window.INIT_GAME_SAVE_DATA.gold_num >= 20) {
            Utils3.showTipsText("复活成功", undefined, 0, 0, 40);
            this.m_in_judge = false;
            window.INIT_GAME_SAVE_DATA.gold_num -= 20;
            this.updateGold();
            for (let t = 0; t < this.m_n_kuai.length; t++) {
                this.m_n_kuai[t].getComponent("ShapeItem").resetBlock(0);
                this.m_n_kuai[t].opacity = 255;
            }
            this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
            this.m_n_result_panel.active = false;
            c.checkWillSurpass(this.m_cur_score);
            this.m_n_displaycheck.active = true;
            this.m_n_displayrank.active = false;
            this.m_gamestate = 0;
        } else {
            ShareSdk.shareAppMessage({
                title: "来帮帮我，我被怪物消灭了",
                imageUrl: window.tempFileURL[1],
                success: () => {},
                fail: () => {},
                complete: () => {}
            });
        }
    }

    showAdBanner(t: boolean): void {
        if (t) {
            lplatform.showBanner();
        } else {
            lplatform.hideBanner();
        }
    }

    onOpenAskPanel(): void {
        this.m_n_askpanel.active = true;
    }

    onCloseAskPanel(): void {
        this.m_n_askpanel.active = false;
    }

    update(dt: number): void {
        if (this.m_normal_curtime !== -1) {
            this.m_normal_curtime += dt;
            if (this.m_normal_curtime >= this.m_normal_talktime && this.m_gamestate === 0) {
                this.m_normal_curtime = 0;
                this.m_sp_monster.node.getComponent("MonsterItem").playNormal();
            }
        }
    }

    guideMaskClick(): void {
        // Implementation needed
    }
}
