const ccShader_wave = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texCoord;
uniform float time;
uniform vec2 mouse;
float PI = 3.1415926;

float _distanceFactor = 100.0;  
float _timeFactor = -30.0;  
float _totalFactor = 1.0;  
float _waveWidth = 0.1;  
float waveSpeed = 0.3;

void main() {
    float _curWaveDis = time*waveSpeed;
    vec2 dv = mouse.xy - v_texCoord.xy;
    dv = dv*vec2(0.5625,1.0);
    float dis = sqrt(dv.x * dv.x + dv.y * dv.y);  
    float sinFactor = sin(dis * _distanceFactor + time * _timeFactor) * _totalFactor * 0.005;  
    float discardFactor = clamp(_waveWidth - abs(_curWaveDis - dis), 0.0, 1.0) / _waveWidth;
    vec2 dv1 = normalize(dv);  
    vec2 offset = dv1  * sinFactor * discardFactor;
    vec2 uv = offset+v_texCoord.xy;
    gl_FragColor = texture2D(CC_Texture0, uv);
}
`;

export default ccShader_wave;