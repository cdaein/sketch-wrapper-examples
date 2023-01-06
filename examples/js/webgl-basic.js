/**
 * WebGL Example
 *
 * I'm not familiar with WebGL, so this is just a demonstration.
 */
import { sketchWrapper } from "@daeinc/sketch-wrapper";
const name = "Webgl";
const vs = /** glsl */ `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0, 1);
  }
`;
const fs = /** glsl */ `
  void main() {
    gl_FragColor = vec4(1, 1, 1, 1);
  }
`;
const sketch = ({ gl }) => {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vs);
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fs);
    gl.compileShader(fragmentShader);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    // in webgl context, use gl to call methods on the context
    return ({ gl, width, height, playhead }) => {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // vertices for circle
        const vertices = [];
        const numVertices = Math.floor(3 + playhead * 15);
        const radius = Math.min(width, height) / Math.min(width, height);
        for (let i = 0; i <= numVertices; i++) {
            const angle = (i / numVertices) * Math.PI * 2;
            vertices.push(radius * Math.cos(angle));
            vertices.push(radius * Math.sin(angle));
        }
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        // draw
        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
    };
};
const settings = {
    title: `Example: ${name}`,
    background: `#999`,
    mode: "webgl",
    dimensions: [600, 600],
    pixelRatio: window.devicePixelRatio,
    duration: 2000,
    filename: `${name}`,
    playFps: 12,
};
sketchWrapper(sketch, settings);
