"use strict";
cc._RF.push(module, '013f6MDCqFBHLGyipWmAMP0', 'MonsterItem');
// Scripts/MonsterItem.ts

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
var MonsterItem = /** @class */ (function (_super) {
    __extends(MonsterItem, _super);
    function MonsterItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._mon_id = 0;
        _this._hp = 0;
        _this._all_hp = 0;
        _this._noangry = true;
        _this.m_n_talk = null;
        _this.m_l_talk = null;
        _this.m_n_bloodmask = null;
        _this.m_sp_blood = null;
        _this.m_l_blood = null;
        _this.m_n_behit = null;
        _this.m_n_stand = null;
        return _this;
    }
    MonsterItem.prototype.start = function () { };
    MonsterItem.prototype.initType = function (t, e, i) {
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
    };
    MonsterItem.prototype.reduceHp = function (t) {
        this._hp -= t;
        if (this._hp < 0) {
            this._hp = 0;
        }
        this.m_l_blood.string = this._hp.toString();
        this.m_n_bloodmask.width = this._hp / this._all_hp * this.m_sp_blood.width;
        return this._hp;
    };
    MonsterItem.prototype.addHp = function (t) {
        this._hp += t;
        if (this._hp > this._all_hp) {
            this._all_hp = this._hp;
        }
        this.m_l_blood.string = this._hp.toString();
        this.m_n_bloodmask.width = this._hp / this._all_hp * this.m_sp_blood.width;
        return this._hp;
    };
    MonsterItem.prototype.playBeHitEffect = function () {
        this.m_n_behit.getComponent(cc.Animation).play("behit_effect");
    };
    MonsterItem.prototype.playBeHit = function () {
        this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "hit");
        this.playBeHitEffect();
    };
    MonsterItem.prototype.playBeHapply = function () {
        var t = "move";
        if (this._mon_id == 0) {
            t = "stand";
        }
        this.node.getComponent(cc.Animation).play("monster" + this._mon_id + t);
    };
    MonsterItem.prototype.beHitFinish = function () {
        this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "stand");
    };
    MonsterItem.prototype.playNormal = function () {
        this.talkNormal();
    };
    MonsterItem.prototype.playAttack = function () {
        this.playBeHapply();
        this.talkAttack();
    };
    MonsterItem.prototype.playDead = function () {
        var _this = this;
        this.node.runAction(cc.fadeOut(3));
        this.m_n_stand.runAction(cc.fadeOut(3));
        this.schedule(function () {
            _this.playBeHit();
        }, 0.3, 2, 0);
        this.talkFail();
        return 3000;
    };
    MonsterItem.prototype.playStartTalk = function () {
        this.playBeHapply();
        this.talkStart();
        this.m_n_stand.opacity = 100;
    };
    MonsterItem.prototype.playMonsterVictory = function () {
        this.playBeHapply();
        this.talkVictory();
    };
    MonsterItem.prototype.playHappyTalk = function () {
        this.talkHappy();
        this.playBeHapply();
    };
    MonsterItem.prototype.playAngry = function () {
        if (this._noangry) {
            this.talkAngry();
            this._noangry = false;
        }
    };
    MonsterItem.prototype.talkHappy = function (t) {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].happy_talk.length);
            }
            var e = window.MONSTER_CONFIG[this._mon_id].happy_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    };
    MonsterItem.prototype.talkStart = function (t) {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].start_talk.length);
            }
            var e = window.MONSTER_CONFIG[this._mon_id].start_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    };
    MonsterItem.prototype.talkAngry = function (t) {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].angry_talk.length);
            }
            var e = window.MONSTER_CONFIG[this._mon_id].angry_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    };
    MonsterItem.prototype.talkFail = function (t) {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].fail_talk.length);
            }
            var e = window.MONSTER_CONFIG[this._mon_id].fail_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    };
    MonsterItem.prototype.talkVictory = function (t) {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].victoy_talk.length);
            }
            var e = window.MONSTER_CONFIG[this._mon_id].victoy_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    };
    MonsterItem.prototype.talkNormal = function (t) {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].normal_talk.length);
            }
            var e = window.MONSTER_CONFIG[this._mon_id].normal_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    };
    MonsterItem.prototype.talkAttack = function (t) {
        if (window.MONSTER_CONFIG && window.MONSTER_CONFIG[this._mon_id]) {
            this.m_n_talk.active = true;
            if (typeof t !== "number") {
                t = Math.floor(Math.random() * window.MONSTER_CONFIG[this._mon_id].attack_talk.length);
            }
            var e = window.MONSTER_CONFIG[this._mon_id].attack_talk[t];
            this.m_l_talk.string = e;
            this.m_n_talk.getComponent(cc.Animation).play("bubbleanim");
        }
    };
    __decorate([
        property
    ], MonsterItem.prototype, "_mon_id", void 0);
    __decorate([
        property
    ], MonsterItem.prototype, "_hp", void 0);
    __decorate([
        property
    ], MonsterItem.prototype, "_all_hp", void 0);
    __decorate([
        property
    ], MonsterItem.prototype, "_noangry", void 0);
    __decorate([
        property(cc.Node)
    ], MonsterItem.prototype, "m_n_talk", void 0);
    __decorate([
        property(cc.Label)
    ], MonsterItem.prototype, "m_l_talk", void 0);
    __decorate([
        property(cc.Node)
    ], MonsterItem.prototype, "m_n_bloodmask", void 0);
    __decorate([
        property(cc.Node)
    ], MonsterItem.prototype, "m_sp_blood", void 0);
    __decorate([
        property(cc.Label)
    ], MonsterItem.prototype, "m_l_blood", void 0);
    __decorate([
        property(cc.Node)
    ], MonsterItem.prototype, "m_n_behit", void 0);
    __decorate([
        property(cc.Node)
    ], MonsterItem.prototype, "m_n_stand", void 0);
    MonsterItem = __decorate([
        ccclass
    ], MonsterItem);
    return MonsterItem;
}(cc.Component));
exports.default = MonsterItem;

cc._RF.pop();