"use strict";
cc._RF.push(module, '0daa32MYYVJMYryMCaWhH/Y', 'Wave_VH');
// Scripts/Wave_VH.ts

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
var ccShader_Default_Vert_noMVP_1 = require("./shader/ccShader_Default_Vert_noMVP");
var ccShader_Wave_VH_Frag_1 = require("./shader/ccShader_Wave_VH_Frag");
var ccShader_Default_Vert_1 = require("./shader/ccShader_Default_Vert");
var Wave_VH = /** @class */ (function (_super) {
    __extends(Wave_VH, _super);
    function Wave_VH() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._program = null;
        _this._angle = 0;
        _this._motion = 0;
        _this._uniMotion = null;
        _this._uniAngle = null;
        _this._mouse = null;
        return _this;
    }
    Wave_VH.prototype.onLoad = function () {
        this._angle = 15;
        this._motion = 0;
        this._use();
    };
    Wave_VH.prototype._use = function () {
        this._program = new cc.GLProgram();
        if (cc.sys.isNative) {
            cc.log("use native GLProgram");
            var vertShader = ccShader_Default_Vert_noMVP_1.default;
            var fragShader = ccShader_Wave_VH_Frag_1.default;
            this._program.initWithString(vertShader, fragShader);
            this._program.link();
            this._program.updateUniforms();
        }
        else {
            var vertShader = ccShader_Default_Vert_1.default;
            var fragShader = ccShader_Wave_VH_Frag_1.default;
            this._program.initWithVertexShaderByteArray(vertShader, fragShader);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this._program.link();
            this._program.updateUniforms();
        }
        this._uniMotion = this._program.getUniformLocationForName("motion");
        this._uniAngle = this._program.getUniformLocationForName("angle");
        this._mouse = this._program.getUniformLocationForName("mouse");
        if (cc.sys.isNative) {
            var programState = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            programState.setUniformFloat(this._uniAngle, this._angle);
        }
        else {
            this._program.setUniformLocationWith1f(this._uniAngle, this._angle);
        }
        this.setProgram(this.node._sgNode, this._program);
    };
    Wave_VH.prototype.setProgram = function (node, program) {
        if (cc.sys.isNative) {
            var programState = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(programState);
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
    Wave_VH.prototype.update = function () {
        if (!this._program)
            return;
        this._program.use();
        this._motion += 0.02;
        if (cc.sys.isNative) {
            var programState = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            programState.setUniformFloat(this._uniMotion, this._motion);
        }
        else {
            this._program.setUniformLocationWith1f(this._uniMotion, this._motion);
            this._program.updateUniforms();
        }
        if (this._motion > 1e20) {
            this._motion = 0;
        }
    };
    Wave_VH = __decorate([
        ccclass
    ], Wave_VH);
    return Wave_VH;
}(cc.Component));
exports.default = Wave_VH;

cc._RF.pop();