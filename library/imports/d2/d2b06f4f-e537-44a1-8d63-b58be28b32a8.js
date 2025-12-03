"use strict";
cc._RF.push(module, 'd2b069P5TdEoY1jtYviizKo', 'ccShader_Default_Vert');
// Scripts/shader/ccShader_Default_Vert.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ccShader_Default_Vert = " \nattribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\nvoid main()\n{\n    gl_Position = CC_PMatrix * a_position;\n    v_texCoord = a_texCoord;\n    v_color = a_color;\n}\n";
exports.default = ccShader_Default_Vert;

cc._RF.pop();