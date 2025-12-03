const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterItem extends cc.Component {
    @property
    private _mon_id: number = 0;
    @property
    private _hp: number = 0;
    @property
    private _all_hp: number = 0;
    @property
    private _noangry: boolean = true;

    @property(cc.Node)
    m_n_talk: cc.Node = null;
    @property(cc.Label)
    m_l_talk: cc.Label = null;
    @property(cc.Node)
    m_n_bloodmask: cc.Node = null;
    @property(cc.Node)
    m_sp_blood: cc.Node = null;
    @property(cc.Label)
    m_l_blood: cc.Label = null;
    @property(cc.Node)
    m_n_behit: cc.Node = null;
    @property(cc.Node)
    m_n_stand: cc.Node = null;

    start(): void {}

    initType(t: number, e: number, i: number): void {
        this._mon_id = t;
        this._hp = e;
        this._all_hp = e;
        this.m_l_blood.string = this._hp.toString();
        this.m_n_bloodmask.width = this.m_sp_blood.width;
        this._noangry = true;
        
        this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "stand");
        
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[t]) {
            this.node.scale = window.MONSTER_CONFIG[t].scale;
            if (i % 5 == 0) {
                this.node.scale = window.MONSTER_CONFIG[t].scale + .8;
            }
            this.m_n_bloodmask.parent.y = window.MONSTER_CONFIG[t].bloodheight + 10;
        }
    }

    reduceHp(t: number): number {
        this._hp -= t;
        if (this._hp < 0) {
            this._hp = 0;
        }
        this.m_l_blood.string = this._hp.toString();
        this.m_n_bloodmask.width = this._hp / this._all_hp * this.m_sp_blood.width;
        return this._hp;
    }

    addHp(t: number): number {
        this._hp += t;
        if (this._hp > this._all_hp) {
            this._all_hp = this._hp;
        }
        this.m_l_blood.string = this._hp.toString();
        this.m_n_bloodmask.width = this._hp / this._all_hp * this.m_sp_blood.width;
        return this._hp;
    }

    playBeHitEffect(): void {
        this.m_n_behit.getComponent(cc.Animation).play("behit_effect");
    }

    playBeHit(): void {
        this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "hit");
        this.playBeHitEffect();
    }

    playBeHapply(): void {
        let t: string = "move";
        if (this._mon_id == 0) {
            t = "stand";
        }
        this.node.getComponent(cc.Animation).play("monster" + this._mon_id + t);
    }

    beHitFinish(): void {
        this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "stand");
    }

    playNormal(): void {
        this.talkNormal();
    }

    playAttack(): void {
        this.playBeHapply();
        this.talkAttack();
    }

    playDead(): number {
        this.node.runAction(cc.fadeOut(3));
        this.m_n_stand.runAction(cc.fadeOut(3));
        
        this.schedule(() => {
            this.playBeHit();
        }, 0.3, 2, 0);
        
        this.talkFail();
        return 3000;
    }

    playStartTalk(): void {
        this.playBeHapply();
        this.talkStart();
        this.m_n_stand.opacity = 100;
    }

    playMonsterVictory(): void {
        this.playBeHapply();
        this.talkVictory();
    }

    playHappyTalk(): void {
        this.talkHappy();
        this.playBeHapply();
    }

    playAngry(): void {
        if (this._noangry) {
            this.talkAngry();
            this._noangry = false;
        }
    }

    private talkHappy(t?: number): void {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].happy_talk.length);
            }
            const e: string = window.MONSTER_CONFIG[this._mon_id].happy_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    }

    private talkStart(t?: number): void {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].start_talk.length);
            }
            const e: string = window.MONSTER_CONFIG[this._mon_id].start_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    }

    private talkAngry(t?: number): void {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].angry_talk.length);
            }
            const e: string = window.MONSTER_CONFIG[this._mon_id].angry_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    }

    private talkFail(t?: number): void {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].fail_talk.length);
            }
            const e: string = window.MONSTER_CONFIG[this._mon_id].fail_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    }

    private talkVictory(t?: number): void {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].victoy_talk.length);
            }
            const e: string = window.MONSTER_CONFIG[this._mon_id].victoy_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    }

    private talkNormal(t?: number): void {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].normal_talk.length);
            }
            const e: string = window.MONSTER_CONFIG[this._mon_id].normal_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    }

    private talkAttack(t?: number): void {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].attack_talk.length);
            }
            const e: string = window.MONSTER_CONFIG[this._mon_id].attack_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    }
}