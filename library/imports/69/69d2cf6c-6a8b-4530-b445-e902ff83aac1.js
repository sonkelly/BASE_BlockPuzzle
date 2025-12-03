"use strict";
cc._RF.push(module, '69d2c9saotFMLRF6QL/g6rB', 'ccShader_wave');
// Scripts/shader/ccShader_wave.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ccShader_wave = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nvarying vec2 v_texCoord;\nuniform float time;\nuniform vec2 mouse;\nfloat PI = 3.1415926;\n\nfloat _distanceFactor = 100.0;  \nfloat _timeFactor = -30.0;  \nfloat _totalFactor = 1.0;  \nfloat _waveWidth = 0.1;  \nfloat waveSpeed = 0.3;\n\nvoid main() {\n    float _curWaveDis = time*waveSpeed;\n    vec2 dv = mouse.xy - v_texCoord.xy;\n    dv = dv*vec2(0.5625,1.0);\n    float dis = sqrt(dv.x * dv.x + dv.y * dv.y);  \n    float sinFactor = sin(dis * _distanceFactor + time * _timeFactor) * _totalFactor * 0.005;  \n    float discardFactor = clamp(_waveWidth - abs(_curWaveDis - dis), 0.0, 1.0) / _waveWidth;\n    vec2 dv1 = normalize(dv);  \n    vec2 offset = dv1  * sinFactor * discardFactor;\n    vec2 uv = offset+v_texCoord.xy;\n    gl_FragColor = texture2D(CC_Texture0, uv);\n}\n";
exports.default = ccShader_wave;

cc._RF.pop();