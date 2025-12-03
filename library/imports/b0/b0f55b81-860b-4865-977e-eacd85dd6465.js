"use strict";
cc._RF.push(module, 'b0f55uBhgtIZZd+6s2F3WRl', 'EffectCommon');
// Scripts/EffectCommon.ts

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
var EffectCommon = /** @class */ (function (_super) {
    __extends(EffectCommon, _super);
    function EffectCommon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parameters = null;
        _this._program = null;
        _this._show_wave = false;
        _this._time = null;
        _this._mouse = null;
        return _this;
    }
    EffectCommon.prototype.onLoad = function () {
        var _this = this;
        this.parameters = {
            time: 0,
            mouse: {
                x: 0.5,
                y: 0.5
            },
            resolution: {
                x: 0,
                y: 0
            },
            wavewidth: 6 / 108
        };
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            var touchPos = event.touch.getLocation();
            touchPos = _this.node.convertToNodeSpace(touchPos);
            _this.parameters.mouse.x = touchPos.x / _this.node.getContentSize().width;
            _this.parameters.mouse.y = touchPos.y / _this.node.getContentSize().height;
            _this.parameters.time = 0;
            _this.parameters.wavewidth = 40 / _this.node.getContentSize().width;
            _this.showWave();
        }, this);
        this._show_wave = false;
        this._use();
    };
    EffectCommon.prototype.showWave = function () {
        this._show_wave = true;
    };
    EffectCommon.prototype.update = function (dt) {
        if (this._program && this._show_wave) {
            this._program.use();
            this.updateGLParameters(dt);
            if (cc.sys.isNative) {
                var glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
                glProgramState.setUniformFloat("time", this.parameters.time);
                glProgramState.setUniformVec2("mouse", this.parameters.mouse);
            }
            else {
                this._program.setUniformLocationWith1f(this._time, this.parameters.time);
                this._program.setUniformLocationWith2f(this._mouse, this.parameters.mouse.x, 1 - this.parameters.mouse.y);
            }
        }
    };
    EffectCommon.prototype.updateGLParameters = function (dt) {
        this.parameters.time += dt;
    };
    EffectCommon.prototype._use = function () {
        this._program = new cc.GLProgram();
        if (cc.sys.isNative) {
            cc.log("use native GLProgram");
            var vertShader = cc.shaderCache.getProgram("ccShader_Default_Vert_noMVP");
            var fragShader = cc.shaderCache.getProgram("ccShader_wave");
            this._program.initWithString(vertShader, fragShader);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this._program.link();
            this._program.updateUniforms();
        }
        else {
            var vertShader = cc.shaderCache.getProgram("ccShader_Default_Vert");
            var fragShader = cc.shaderCache.getProgram("ccShader_wave");
            this._program.initWithVertexShaderByteArray(vertShader, fragShader);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this._program.link();
            this._program.updateUniforms();
        }
        if (cc.sys.isNative) {
            var glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            glProgramState.setUniformFloat("time", this.parameters.time);
            glProgramState.setUniformVec2("mouse", this.parameters.mouse);
        }
        else {
            this._time = this._program.getUniformLocationForName("time");
            this._mouse = this._program.getUniformLocationForName("mouse");
            this._program.setUniformLocationWith1f(this._time, this.parameters.time);
            this._program.setUniformLocationWith2f(this._mouse, this.parameters.mouse.x, this.parameters.mouse.y);
        }
        this.setProgram(this.node._sgNode, this._program);
    };
    EffectCommon.prototype.setProgram = function (node, program) {
        if (cc.sys.isNative) {
            var glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgramState);
        }
        else {
            node.setShaderProgram(program);
        }
        var children = node.children;
        if (children) {
            for (var i = 0; i < children.length; i++) {
                this.setProgram(children[i], program);
            }
        }
    };
    EffectCommon = __decorate([
        ccclass
    ], EffectCommon);
    return EffectCommon;
}(cc.Component));
exports.default = EffectCommon;

cc._RF.pop();