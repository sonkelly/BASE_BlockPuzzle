"use strict";
cc._RF.push(module, '9ac05uKRhtFw4kYtJcBZIZ4', 'ccShader_Wave_VH_Frag');
// Scripts/shader/ccShader_Wave_VH_Frag.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ccShader_Wave_VH_Frag = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec2 v_texCoord;\nuniform float motion;\nuniform float angle;\nvoid main()\n{\n    vec2 tmp = v_texCoord;\n    tmp.x = tmp.x + 0.01 * sin(motion + tmp.x * angle);\n    // tmp.y = tmp.y + 0.01 * sin(motion + tmp.y * angle);\n    gl_FragColor = texture2D(CC_Texture0, tmp);\n    \n}\n";
exports.default = ccShader_Wave_VH_Frag;

cc._RF.pop();