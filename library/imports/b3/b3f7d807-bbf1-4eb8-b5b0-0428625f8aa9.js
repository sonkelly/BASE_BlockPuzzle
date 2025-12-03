"use strict";
cc._RF.push(module, 'b3f7dgHu/FOuLWwBChiX4qp', 'ccShader_Default_Vert_noMVP');
// Scripts/shader/ccShader_Default_Vert_noMVP.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ccShader_Default_Vert_noMVP = "\nattribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying vec2 v_texCoord;\nvarying vec4 v_fragmentColor;\nvoid main()\n{\n    gl_Position = CC_PMatrix * a_position;\n    v_fragmentColor = a_color;\n    v_texCoord = a_texCoord;\n}\n";
exports.default = ccShader_Default_Vert_noMVP;

cc._RF.pop();