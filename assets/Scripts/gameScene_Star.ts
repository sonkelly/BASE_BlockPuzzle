const {ccclass, property} = cc._decorator;
import EventManager from "./EventManager";
import Common from "./Common";
import { GameData } from "./GameData";
@ccclass
export default class gameScene_Star extends cc.Component {

    @property(cc.Node)
    layerGame: cc.Node = null;

    @property(cc.Node)
    layerZanTing: cc.Node = null;

    @property(cc.Node)
    layerFaild: cc.Node = null;

    @property(cc.Node)
    layerWin: cc.Node = null;

    @property(cc.Prefab)
    prefab_block: cc.Prefab = null;

    @property(cc.Prefab)
    prefab_xing: cc.Prefab = null;

    @property(cc.Prefab)
    prefab_blockScore: cc.Prefab = null;

    @property(cc.Node)
    block_parent: cc.Node = null;

    @property(cc.Node)
    xingXing_parent: cc.Node = null;

    @property(cc.Node)
    tx_chuiZi: cc.Node = null;

    @property(cc.Node)
    tx_biShua: cc.Node = null;

    @property(cc.Node)
    bg_btn_biShu: cc.Node = null;

    @property([cc.AudioClip])
    audio_sound: cc.AudioClip[] = [];

    @property([cc.SpriteFrame])
    propSpf: cc.SpriteFrame[] = [];

    private isWin: boolean = false;
    private time_tiShi: number = 0;
    private num_block_wh: number = 64;
    private num_jianGe: number = 2;
    private num_w: number = 10;
    private num_h: number = 10;
    private gameType: number = 0;
    private numLevel: number = 1;
    private numScore_curr: number = 0;
    private node_scoreCurr: cc.Node = null;
    private node_lianXiao: cc.Node = null;
    private node_good: cc.Node = null;
    private node_success: cc.Node = null;
    private arr_blocks: number[][] = [];
    private userData: any = null;
    private is_moveing: boolean = false;
    private isShuaing: boolean = false;

    onLoad(): void {
        GameData.gameDataBind = this;
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
        for (let t = 0; t < this.num_h; t++)
            this.arr_blocks[t] = [];
        this.setParent();
        this.setTouch();
        this.arrMuBiao = [0, 1000, 3000, 5500, 7500, 9500, 11500, 14000, 99999];
        let i = cc.sys.localStorage.getItem("userData_xmxx");
        if (i != null && i != "") {
            this.userData = JSON.parse(i);
            cc.find("bg/numb_high", this.layerFaild).getComponent(cc.Label).string = this.userData.num_score_best.toString();
        }
        this.saveUserData();
        console.log("宽：" + cc.winSize.width + " 高：" + cc.winSize.height);
        let e = cc.winSize.width / 720;
        this.block_parent.scale = 720 * e / this.block_parent.width;
        this.xingXing_parent.scale = 720 * e / this.block_parent.width;
        this.bg_btn_biShu.scale = e;
        this.changePropCount();
    }

    initialLayer(): void {
        this.layerGame.active = true;
        this.layerZanTing.active = false;
        this.layerFaild.active = false;
        this.layerWin.active = false;
    }

    onDestroy(): void {
       GameData.gameDataBind = null;
    }

    changePropCount(): void {
        cc.find("Canvas/layerGame/btn_shuaXin/icon_video").active = GameData.xmxx_Refresh < 1;
        cc.find("Canvas/layerGame/btn_shuaXin/count").active = GameData.xmxx_Refresh > 0;
        cc.find("Canvas/layerGame/btn_shuaXin/count").getComponent(cc.Label).string = GameData.xmxx_Refresh.toString();
        cc.find("Canvas/layerGame/btn_biShua/icon_video").active = GameData.xmxx_Pen < 1;
        cc.find("Canvas/layerGame/btn_biShua/count").active = GameData.xmxx_Pen > 0;
        cc.find("Canvas/layerGame/btn_biShua/count").getComponent(cc.Label).string = GameData.xmxx_Pen.toString();
        cc.find("Canvas/layerGame/btn_chuiZI/icon_video").active = GameData.xmxx_Hammer < 1;
        cc.find("Canvas/layerGame/btn_chuiZI/count").active = GameData.xmxx_Hammer > 0;
        cc.find("Canvas/layerGame/btn_chuiZI/count").getComponent(cc.Label).string = GameData.xmxx_Hammer.toString();
        console.log("锤子" + GameData.xmxx_Hammer, "刷新" + GameData.xmxx_Refresh, "画笔" + GameData.xmxx_Pen);
    }

    start(): void {
        this.layerGame.active = true;
        this.actStart();
    }

    setParent(): void {
        this.block_parent.width = (this.num_block_wh + this.num_jianGe) * this.num_w + this.num_jianGe;
        this.block_parent.height = (this.num_block_wh + this.num_jianGe) * this.num_h + this.num_jianGe;
        this.block_parent.y = this.block_parent.height / 2 - 640 + 175;
        this.xingXing_parent.width = this.block_parent.width;
        this.xingXing_parent.height = this.block_parent.height;
        this.xingXing_parent.y = this.block_parent.y;
    }

    setTouch(): void {
        this.block_parent.on("touchstart", (t: cc.Event.EventTouch) => {
            if (this.gameType == 1 && !this.is_moveing) {
                let i = t.getLocation();
                let e = this.block_parent.convertToNodeSpaceAR(i);
                let a = this.block_parent.children;
                for (let n = 0; n < a.length; n++) {
                    if (a[n].getBoundingBox().contains(e)) {
                        this.time_tiShi = 0;
                        this.quXiaoTiShi();
                        if (this.tx_chuiZi.active) {
                            let b = a[n].getComponent("star");
                            if (b.is_chuiZi) {
                                this.tx_chuiZi.active = false;
                                let o = a[n].getPosition();
                                let s = a[n].getComponent("star").blockType;
                                for (let r = 0; r < 3; r++)
                                    this.createXing(o, s);
                                a[n].removeFromParent();
                                this.shuaXinArr();
                                this.moveBlocks_down();
                                return;
                            }
                            this.quXiaoChuiZi();
                            let h = a[n].getPosition();
                            this.tx_chuiZi.x = h.x + 20;
                            this.tx_chuiZi.y = h.y;
                            b.chuiZi();
                            return;
                        }
                        if (this.tx_biShua.active) {
                            if (this.isShuaing)
                                return;
                            let b = a[n].getComponent("star");
                            if (b.is_biShua)
                                return;
                            this.quXiaoBiShua();
                            this.tx_biShua.stopAllActions();
                            let h = a[n].getPosition();
                            this.tx_biShua.x = h.x + 15;
                            this.tx_biShua.y = h.y + 45;
                            cc.tween(this.tx_biShua).repeatForever(cc.tween().by(.2, { y: 20 }).by(.2, { y: -20 })).start();
                            a[n].getComponent("star").biShua();
                            let c = a[n].getComponent("star").blockType;
                            this.shuaXinBgBiShua(c);
                            return;
                        }
                        this.touchOne(n);
                        let u = 0;
                        for (let _ = 0; _ < a.length; _++) {
                            let b = a[_].getComponent("star");
                            if (b.is_xiaoChu) u++;
                        }
                        if (u > 1) {
                            this.is_moveing = true;
                            if (GameData.audioSwitch == 1) cc.audioEngine.play(this.audio_sound[1], false, 1);
                            this.xiaoChuBlocks();
                            this.node_lianXiao.opacity = 255;
                            this.node_lianXiao.stopAllActions();
                            this.node_lianXiao.scale = 0;
                            let m = 0;
                            for (let d = 0; d < u; d++)
                                m = m + 5 + 10 * d;
                            this.node_lianXiao.getComponent(cc.Label).string = "Match-" + u + " for " + m + " points";
                            cc.tween(this.node_lianXiao).to(.2, { scale: 1 }).to(2, { opacity: 0 }).start();
                            if (u >= 6) {
                                if (GameData.audioSwitch == 1) cc.audioEngine.play(this.audio_sound[0], false, 1);
                                this.node_good.opacity = 255;
                                this.node_good.stopAllActions();
                                this.node_good.scale = 0;
                                let a_children = this.node_good.children;
                                let g = Math.floor(Math.random() * a_children.length);
                                for (let v = 0; v < a_children.length; v++)
                                    a_children[v].active = v == g;
                                cc.tween(this.node_good).to(.2, { scale: 1 }).blink(.5, 5).to(1.5, { opacity: 0 }).start();
                            }
                        } else {
                            let b = a[n].getComponent("star");
                            b.quXiaoXiaoChu();
                        }
                        this.shuaXinArr();
                        this.moveBlocks_down();
                    }
                }
            }
        }, this);
    }

    saveUserData(): void {
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
    }

    actStart(): void {
        this.isWin = false;
        this.gameType = 0;
        this.is_moveing = false;
        this.layerGame.getChildByName("btn_zanTing").active = true;
        this.node_success.active = false;
        this.node_good.opacity = 0;
        this.node_lianXiao.opacity = 0;
        let t = this.layerGame.getChildByName("label_guanQia");
        let i = this.layerGame.getChildByName("label_muBiao");
        let e = this.layerGame.getChildByName("label_guanQia_2");
        let a = this.layerGame.getChildByName("label_muBiao_2");
        cc.tween(i).blink(2, 8).start();
        this.saveUserData();
        if (this.userData.num_level_save) this.numLevel = this.userData.num_level_save;
        else this.numLevel = 1;
        if (this.userData.num_score_save) this.numScore_curr = this.userData.num_score_save;
        else this.numScore_curr = 0;
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
        let n = this.block_parent.children;
        for (let o = 0; o < n.length; o++) {
            n[o].y = n[o].y + 1500;
            cc.tween(n[o]).delay(2.3).by(.5 + .008 * o, { x: 0, y: -1500 }).start();
        }
        let s = 2.8 + .008 * (n.length - 1);
        this.scheduleOnce(() => {
            this.gameType = 1;
            this.time_tiShi = 0;
        }, s + .02);
    }

    quXiaoChuiZi(): void {
        let t = this.block_parent.children;
        for (let i = 0; i < t.length; i++)
            t[i].getComponent("star").quXiaoChuiZi();
    }

    quXiaoBiShua(): void {
        let t = this.block_parent.children;
        for (let i = 0; i < t.length; i++)
            t[i].getComponent("star").quXiaoBiShua();
    }

    touchOne(t: number): void {
        let i = this.block_parent.children;
        let e = t;
        i[e].getComponent("star").canXiaoChu();
        let a = i[e].getPosition();
        let n = i[e].getComponent("star").blockType;
        let o: number[] = [];
        let s = this.block_parent.children;
        for (let r = 0; r < s.length; r++) {
            if (e != r) {
                let h = s[r].getPosition();
                let c = (a.x - h.x) * (a.x - h.x) + (a.y - h.y) * (a.y - h.y);
                if ((c = Math.sqrt(c)) <= this.num_block_wh + this.num_jianGe + 10 && n == s[r].getComponent("star").blockType) {
                    if (s[r].getComponent("star").is_xiaoChu)
                        continue;
                    s[r].getComponent("star").canXiaoChu();
                    o.push(r);
                }
            }
        }
        for (let u = 0; u < o.length; u++)
            this.touchOne(o[u]);
    }

    touchOneTiShi(t: number): void {
        let i = this.block_parent.children;
        let e = t;
        i[e].getComponent("star").canTiShi();
        let a = i[e].getPosition();
        let n = i[e].getComponent("star").blockType;
        let o: number[] = [];
        let s = this.block_parent.children;
        for (let r = 0; r < s.length; r++) {
            if (e != r) {
                let h = s[r].getPosition();
                let c = (a.x - h.x) * (a.x - h.x) + (a.y - h.y) * (a.y - h.y);
                if ((c = Math.sqrt(c)) <= this.num_block_wh + this.num_jianGe + 10 && n == s[r].getComponent("star").blockType) {
                    if (s[r].getComponent("star").is_tiShi)
                        continue;
                    s[r].getComponent("star").canTiShi();
                    o.push(r);
                }
            }
        }
        for (let u = 0; u < o.length; u++)
            this.touchOneTiShi(o[u]);
    }

    xiaoChuBlocks(): void {
        let t = this.block_parent.children;
        let i = -1;
        for (let e = t.length - 1; e >= 0; e--) {
            if (t[e].getComponent("star").is_xiaoChu) {
                let a = t[e].getPosition();
                let n = t[e].getComponent("star").blockType;
                t[e].removeFromParent();
                for (let o = 0; o < 5; o++)
                    this.createXing(a, n);
                let s = 5 + 10 * ++i;
                let r = cc.instantiate(this.prefab_blockScore);
                r.parent = this.xingXing_parent;
                r.setPosition(a);
                let h = .5 + .09 * i;
                let c = this.layerGame.convertToWorldSpaceAR(this.node_scoreCurr.getPosition());
                let u = this.xingXing_parent.convertToNodeSpaceAR(c);
                r.getComponent("blockScore").init(s, h, u);
            }
        }
    }

    addScore(t: number): void {
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
    }

    createXing(t: cc.Vec2, i: number): void {
        let e = cc.instantiate(this.prefab_xing);
        e.parent = this.xingXing_parent;
        e.setPosition(t);
        e.getComponent("xing").init(i);
        e.scale = .3 + .6 * Math.random();
        let a = 50 + 150 * Math.random();
        let n = .3 + .4 * Math.random();
        cc.tween(e).delay(.05 * Math.random()).by(n, { x: 0, y: a }, { easing: "cubicOut" }).by(n, { x: 0, y: 10 - a - 40 * Math.random() }, { easing: "cubicIn" }).call(() => {
            e.destroy();
        }).start();
    }

    createBlocks(): void {
        let t = -this.block_parent.width / 2 + this.num_block_wh / 2 + this.num_jianGe;
        let i = -this.block_parent.height / 2 + this.num_block_wh / 2 + this.num_jianGe;
        for (let e = 0; e < this.num_h; e++)
            for (let a = 0; a < this.num_w; a++) {
                let n = cc.instantiate(this.prefab_block);
                n.parent = this.block_parent;
                n.x = (this.num_block_wh + this.num_jianGe) * a + t;
                n.y = (this.num_block_wh + this.num_jianGe) * e + i;
                let o = n.getComponent("star");
                let s = Math.floor(5 * Math.random());
                o.init(s);
            }
    }

    createBlocksByBenDi(): void {
        let t = -this.block_parent.width / 2 + this.num_block_wh / 2 + this.num_jianGe;
        let i = -this.block_parent.height / 2 + this.num_block_wh / 2 + this.num_jianGe;
        for (let e = 0; e < this.num_h; e++)
            for (let a = 0; a < this.num_w; a++) {
                let n = this.userData.arr_blocks_save[e][a];
                if (n != -1) {
                    let o = cc.instantiate(this.prefab_block);
                    o.parent = this.block_parent;
                    o.x = (this.num_block_wh + this.num_jianGe) * a + t;
                    o.y = (this.num_block_wh + this.num_jianGe) * e + i;
                    o.getComponent("star").init(n);
                }
            }
    }

    getArrByPos(t: cc.Vec2): cc.Vec2 {
        let i = this.block_parent.width / 2 + t.x;
        let e = this.block_parent.height / 2 + t.y;
        let a = Math.floor(e / (this.num_block_wh + this.num_jianGe));
        let n = Math.floor(i / (this.num_block_wh + this.num_jianGe));
        return cc.v2(a, n);
    }

    shuaXinArr(): void {
        for (let t = 0; t < this.num_h; t++)
            for (let i = 0; i < this.num_w; i++)
                this.arr_blocks[t][i] = -1;
        let e = this.block_parent.children;
        for (let a = 0; a < e.length; a++) {
            let n = e[a].getComponent("star").blockType;
            let o = e[a].getPosition();
            let s = this.getArrByPos(o);
            this.arr_blocks[s.x][s.y] = n;
        }
    }

    pdGameOver(): boolean {
        for (let t = 0; t < this.num_h; t++)
            for (let i = 0; i < this.num_w; i++) {
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
    }

    actGameOver(): void {
        let t = this;
        let i = this.block_parent.children;
        let e = (e: number) => {
            cc.tween(i[e]).blink(1.5, 4).delay(.03 * e).call(() => {
                let a = i[e].getPosition();
                let n = i[e].getComponent("star").blockType;
                for (let o = 0; o < 3; o++)
                    t.createXing(a, n);
                i[e].active = false;
            }).start();
        };
        for (let a = i.length - 1; a >= 0; a--)
            e(a);
        let n = 1.5 + .03 * (i.length - 1);
        if (this.node_success.active) {
            this.scheduleOnce(() => {
                this.layerWin.active = true;
                this.isWin = true;
                this.pushZaJinDan();
            }, n + 1);
        } else {
            this.scheduleOnce(() => {
                this.userData.num_level_save = 1;
                this.userData.num_score_save = 0;
                this.saveUserData();
                this.layerFaild.active = true;
                this.layerGame.getChildByName("btn_zanTing").active = false;
            }, n + 1);
        }
    }

    shuaXinBlocks(): void {
        let t = this.block_parent.children;
        let i = (i: number) => {
            cc.tween(t[i]).to(.2, { scale: 0 }).call(() => {
                let e = Math.floor(Math.random() * t.length);
                let a = t[i].getPosition();
                let n = t[e].getPosition();
                t[i].setPosition(n);
                t[e].setPosition(a);
            }).to(.2, { scale: 1 }).start();
        };
        for (let e = 0; e < t.length; e++)
            i(e);
    }

    moveBlocks_down(): void {
        let t = this;
        let i = 0;
        let e = this.block_parent.children;
        let a = .08;
        for (let n = 0; n < e.length; n++) {
            let o = e[n].getPosition();
            let s = this.getArrByPos(o);
            let r = 0;
            for (let h = s.x; h >= 0; h--)
                if (this.arr_blocks[h][s.y] == -1) r++;
            let c = .08 * r;
            if (a < c) a = c;
            cc.tween(e[n]).call(() => { return i++; }).by(c, { x: 0, y: -(this.num_jianGe + this.num_block_wh) * r }).call(() => {
                if (0 == --i) {
                    t.shuaXinArr();
                    t.moveBlocks_left();
                }
            }).start();
        }
    }

    moveBlocks_left(): void {
        let t = this;
        let i = 0;
        let e = this.block_parent.children;
        let a = .08;
        for (let n = 0; n < e.length; n++) {
            let o = e[n].getPosition();
            let s = this.getArrByPos(o);
            let r = 0;
            for (let h = s.y; h >= 0; h--)
                if (s.x == 0 && this.arr_blocks[s.x][h] == -1) r++;
            let c = .08 * r;
            if (a < c) a = c;
            for (let u = 0; u < e.length; u++) {
                let l = e[u].getPosition();
                if (this.getArrByPos(l).y == s.y) {
                    cc.tween(e[u]).call(() => { return i++; }).by(c, { x: -(this.num_jianGe + this.num_block_wh) * r, y: 0 }).call(() => {
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
                            } else console.log("没结束");
                        }
                    }).start();
                }
            }
        }
    }

    ziDongTiShi(): void {
        if (!this.tx_biShua.active && !this.tx_chuiZi.active) {
            let t = this.block_parent.children;
            for (let i = 0; i < t.length; i++)
                if (t[i].getComponent("star").is_tiShi)
                    return;
            for (let e = 0; e < t.length; e++) {
                this.touchOneTiShi(e);
                let a = 0;
                let n = this.block_parent.children;
                for (let o = 0; o < n.length; o++)
                    if (n[o].getComponent("star").is_tiShi) a++;
                if (a > 1) {
                    this.jinXingTiShi();
                    return;
                }
                t[e].getComponent("star").quXiaoTiShi();
            }
        }
    }

    jinXingTiShi(): void {
        let t = this.block_parent.children;
        for (let i = 0; i < t.length; i++)
            if (t[i].getComponent("star").is_tiShi)
                cc.tween(t[i]).repeatForever(cc.tween().to(.4, .8).to(.4, 1)).start();
    }

    quXiaoTiShi(): void {
        let t = this.block_parent.children;
        for (let i = 0; i < t.length; i++) {
            let e = t[i].getComponent("star");
            if (e.is_tiShi) {
                e.quXiaoTiShi();
                t[i].stopAllActions();
                t[i].scale = 1;
            }
        }
    }

    gameRestart(): void {
        this.initialLayer();
        this.numLevel = 1;
        this.numScore_curr = 0;
        this.node_scoreCurr.getComponent(cc.Label).string = this.numScore_curr.toString();
        this.userData.arr_blocks_save = [];
        this.userData.num_level_save = 1;
        this.userData.num_score_save = 0;
        this.saveUserData();
        this.actStart();
    }

    btn_callBack(t: cc.Event.EventTouch, i: string): void {
        let n = this;
        if (GameData.audioSwitch == 1 && cc.audioEngine.play(this.audio_sound[2], false, 1),
        "btn_zanTing" == i) {
            if (this.gameType != 1)
                return;
            this.layerZanTing.active = true;
        } else if ("btn_home" == i)
            Common.instance.toMenu();
        else if ("btn_rePlay" == i)
            this.gameRestart();
        else if ("btn_close_zanTing" == i)
            this.layerZanTing.active = false;
        else if ("btn_shuaXin" == i) {
            if (this.gameType != 1)
                return;
            if (this.tx_biShua.active || this.tx_chuiZi.active)
                return;
            let o = () => {
                n.quXiaoTiShi();
                n.shuaXinBlocks();
            };
            if (GameData.xmxx_Refresh > 0) {
                o();
                GameData.xmxx_Refresh--;
                GameData.saveData();
                this.changePropCount();
                return;
            }
            EventManager.instance.showRewardedVideo(() => { return o(); });
        } else if ("btn_chuiZI" == i) {
            if (this.gameType != 1)
                return;
            if (this.tx_biShua.active)
                return;
            if (this.quXiaoTiShi(),
            this.tx_chuiZi.active)
                return this.tx_chuiZi.active = false,
                void this.quXiaoChuiZi();
            let s = () => {
                n.tx_chuiZi.active = true;
                let t = n.block_parent.children;
                if (t.length > 0) {
                    let i = Math.floor(Math.random() * t.length);
                    let e = t[i].getPosition();
                    n.tx_chuiZi.x = e.x + 20;
                    n.tx_chuiZi.y = e.y;
                    t[i].getComponent("star").chuiZi();
                }
            };
            if (GameData.xmxx_Hammer > 0) {
                s();
                GameData.xmxx_Hammer--;
                GameData.saveData();
                this.changePropCount();
                return;
            }
            EventManager.instance.showRewardedVideo(() => { return s(); });
        } else if ("btn_biShua" == i) {
            if (this.gameType != 1)
                return;
            if (this.tx_biShua.active || this.tx_chuiZi.active)
                return;
            this.quXiaoTiShi();
            let r = () => {
                n.tx_biShua.active = true,
                n.bg_btn_biShu.active = true;
                let t = n.block_parent.children;
                if (t.length > 0) {
                    n.tx_biShua.stopAllActions();
                    let i = Math.floor(Math.random() * t.length);
                    let e = t[i].getPosition();
                    console.log("笔刷位置：" + e);
                    n.tx_biShua.x = e.x + 15;
                    n.tx_biShua.y = e.y + 45;
                    cc.tween(n.tx_biShua).repeatForever(cc.tween().by(.2, { x: 0, y: 20 }).by(.2, { x: 0, y: -20 })).start();
                    t[i].getComponent("star").biShua();
                    let a = t[i].getComponent("star").blockType;
                    n.shuaXinBgBiShua(a);
                }
            };
            if (GameData.xmxx_Pen > 0) {
                r();
                return;
            }
            EventManager.instance.showRewardedVideo(() => { return r(); });
        } else if ("btn_back_faild" == i) {
            EventManager.instance.EventInterstitialVideo();
            Common.instance.toMenu();
        } else if ("btn_fuHuo" == i)
            EventManager.instance.showRewardedVideo(() => { return n.fuHuoBtn(); });
        else if ("btn_restart" == i) {
            EventManager.instance.EventInterstitialVideo();
            this.gameRestart();
        } else if ("btn_getProp" == i)
            EventManager.instance.showRewardedVideo(() => {
                GameData.xmxx_Hammer++;
                GameData.xmxx_Refresh++;
                GameData.xmxx_Pen++;
                GameData.saveData();
                n.nextGame();
            });
        else if ("btn_noProp" == i) {
            this.nextGame();
            EventManager.instance.EventInterstitialVideo();
        }
    }

    nextGame(): void {
        this.numLevel++;
        this.userData.num_level_save = this.numLevel;
        this.userData.num_score_fh = this.numScore_curr;
        this.saveUserData();
        this.actStart();
        this.layerWin.active = false;
    }

    shuaXinBgBiShua(t: number): void {
        if (GameData.audioSwitch == 1) cc.audioEngine.play(this.audio_sound[2], false, 1);
        let i = this.bg_btn_biShu.getChildByName("layout").children;
        for (let e = 0; e < i.length; e++)
            i[e].active = t != e;
    }

    btn_biShua(t: cc.Event.EventTouch, i: string): void {
        if ("btn_quXiao" == i) {
            this.tx_biShua.active = false;
            this.bg_btn_biShu.active = false;
            this.quXiaoBiShua();
        } else {
            GameData.xmxx_Pen--;
            if (GameData.xmxx_Pen < 0) GameData.xmxx_Pen = 0;
            GameData.saveData();
            this.changePropCount();
            this.isShuaing = true;
            let e = this.block_parent.children;
            for (let a = 0; a < e.length; a++) {
                let n = e[a].getComponent("star");
                if (n.is_biShua) {
                    let o = parseInt(i);
                    n.init(o);
                    this.bg_btn_biShu.active = false;
                    this.quXiaoBiShua();
                    this.tx_biShua.stopAllActions();
                    this.tx_biShua.y = this.tx_biShua.y - 20;
                    let s = this.tx_biShua.getComponent("cc.Animation") as any;
                    s.biShuaOver = () => {
                        this.tx_biShua.active = false;
                        this.isShuaing = false;
                    };
                    s.play();
                    return;
                }
            }
        }
    }

    logArr(): void {
        for (let t = this.num_h - 1; t >= 0; t--)
            console.log(this.arr_blocks[t]);
        console.log("**************************************");
    }

    update(dt: number): void {
        if (!GameData.isPause) {
            if (this.gameType == 1) {
                this.time_tiShi++;
                if (this.time_tiShi >= 300) {
                    this.time_tiShi = 0;
                    this.ziDongTiShi();
                }
            }
            GameData.pushZJD_autoShow -= dt;
            if (GameData.pushZJD_autoShow < 0) this.pushZaJinDan();
        }
    }

    fuHuoBtn(): void {
        this.layerFaild.active = false;
        this.userData.num_score_save = this.userData.num_score_fh;
        this.userData.num_level_save = this.numLevel;
        this.saveUserData();
        this.actStart();
    }

    shuXinBtn(): void {
        this.quXiaoTiShi();
        this.shuaXinBlocks();
    }

    pushZaJinDan(): void {
        Common.instance.pushZaJinDan(this.propSpf);
    }

    private arrMuBiao: number[] = [];
}
