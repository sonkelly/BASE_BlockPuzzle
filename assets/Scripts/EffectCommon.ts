const { ccclass, property } = cc._decorator;

@ccclass
export default class EffectCommon extends cc.Component {
    private parameters: {
        time: number;
        mouse: { x: number; y: number };
        resolution: { x: number; y: number };
        wavewidth: number;
    } = null;

    private _program: cc.GLProgram = null;
    private _show_wave: boolean = false;
    private _time: any = null;
    private _mouse: any = null;

    onLoad() {
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

        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            let touchPos = event.touch.getLocation();
            touchPos = this.node.convertToNodeSpace(touchPos);
            
            this.parameters.mouse.x = touchPos.x / this.node.getContentSize().width;
            this.parameters.mouse.y = touchPos.y / this.node.getContentSize().height;
            this.parameters.time = 0;
            this.parameters.wavewidth = 40 / this.node.getContentSize().width;
            this.showWave();
        }, this);

        this._show_wave = false;
        this._use();
    }

    showWave() {
        this._show_wave = true;
    }

    update(dt: number) {
        if (this._program && this._show_wave) {
            this._program.use();
            this.updateGLParameters(dt);

            if (cc.sys.isNative) {
                const glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
                glProgramState.setUniformFloat("time", this.parameters.time);
                glProgramState.setUniformVec2("mouse", this.parameters.mouse);
            } else {
                this._program.setUniformLocationWith1f(this._time, this.parameters.time);
                this._program.setUniformLocationWith2f(this._mouse, this.parameters.mouse.x, 1 - this.parameters.mouse.y);
            }
        }
    }

    private updateGLParameters(dt: number) {
        this.parameters.time += dt;
    }

    private _use() {
        this._program = new cc.GLProgram();

        if (cc.sys.isNative) {
            cc.log("use native GLProgram");
            const vertShader = cc.shaderCache.getProgram("ccShader_Default_Vert_noMVP");
            const fragShader = cc.shaderCache.getProgram("ccShader_wave");
            this._program.initWithString(vertShader, fragShader);
            
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            
            this._program.link();
            this._program.updateUniforms();
        } else {
            const vertShader = cc.shaderCache.getProgram("ccShader_Default_Vert");
            const fragShader = cc.shaderCache.getProgram("ccShader_wave");
            this._program.initWithVertexShaderByteArray(vertShader, fragShader);
            
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            
            this._program.link();
            this._program.updateUniforms();
        }

        if (cc.sys.isNative) {
            const glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            glProgramState.setUniformFloat("time", this.parameters.time);
            glProgramState.setUniformVec2("mouse", this.parameters.mouse);
        } else {
            this._time = this._program.getUniformLocationForName("time");
            this._mouse = this._program.getUniformLocationForName("mouse");
            this._program.setUniformLocationWith1f(this._time, this.parameters.time);
            this._program.setUniformLocationWith2f(this._mouse, this.parameters.mouse.x, this.parameters.mouse.y);
        }

        this.setProgram(this.node._sgNode, this._program);
    }

    private setProgram(node: any, program: cc.GLProgram) {
        if (cc.sys.isNative) {
            const glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgramState);
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
}