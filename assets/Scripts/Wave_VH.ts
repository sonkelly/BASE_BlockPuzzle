const { ccclass, property } = cc._decorator;
import ccShader_Default_Vert_noMVP from "./shader/ccShader_Default_Vert_noMVP";
import ccShader_Wave_VH_Frag from "./shader/ccShader_Wave_VH_Frag";
import ccShader_Default_Vert from "./shader/ccShader_Default_Vert";
@ccclass
export default class Wave_VH extends cc.Component {
    private _program: cc.GLProgram = null;
    private _angle: number = 0;
    private _motion: number = 0;
    private _uniMotion: any = null;
    private _uniAngle: any = null;
    private _mouse: any = null;

    onLoad() {
        this._angle = 15;
        this._motion = 0;
        this._use();
    }

    private _use() {
        this._program = new cc.GLProgram();
        
        if (cc.sys.isNative) {
            cc.log("use native GLProgram");
            const vertShader = ccShader_Default_Vert_noMVP;
            const fragShader = ccShader_Wave_VH_Frag;
            this._program.initWithString(vertShader, fragShader);
            this._program.link();
            this._program.updateUniforms();
        } else {
            const vertShader = ccShader_Default_Vert;
            const fragShader = ccShader_Wave_VH_Frag;
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
            const programState = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            programState.setUniformFloat(this._uniAngle, this._angle);
        } else {
            this._program.setUniformLocationWith1f(this._uniAngle, this._angle);
        }

        this.setProgram(this.node._sgNode, this._program);
    }

    private setProgram(node: any, program: cc.GLProgram) {
        if (cc.sys.isNative) {
            const programState = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(programState);
        } else {
            node.setShaderProgram(program);
        }

        const children = node.children;
        if (children) {
            for (let i = 0; i < children.length; i++) {
                this.setProgram(children[i], program);
            }
        }
    }

    update() {
        if (!this._program) return;

        this._program.use();
        this._motion += 0.02;

        if (cc.sys.isNative) {
            const programState = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            programState.setUniformFloat(this._uniMotion, this._motion);
        } else {
            this._program.setUniformLocationWith1f(this._uniMotion, this._motion);
            this._program.updateUniforms();
        }

        if (this._motion > 1e20) {
            this._motion = 0;
        }
    }
}