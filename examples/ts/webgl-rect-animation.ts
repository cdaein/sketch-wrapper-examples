/**
 * example taken and adapted from:
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Basic_2D_animation_example
 */

import sketchWrapper from "@daeinc/sketch-wrapper";
import type {
  Sketch,
  SketchSettings,
  WebGLProps,
} from "@daeinc/sketch-wrapper";

const name = "webgl-rect-animation";

type ShaderInfo = { type: number; id: string; code: string }[];

const vs = /*glsl*/ `
  attribute vec2 aVertexPos;
  uniform vec2 uScalingFactor;
  uniform vec2 uRotationVec;

  void main() {
    vec2 rotatedPos = vec2(
      aVertexPos.x * uRotationVec.y + aVertexPos.y * uRotationVec.x,
      aVertexPos.y * uRotationVec.y - aVertexPos.x * uRotationVec.x
    );

    gl_Position = vec4(rotatedPos * uScalingFactor, 0.0, 1.0);
  }
`;

const fs = /*glsl*/ `
  #ifdef GL_ES
  precision highp float;
  #endif

  uniform vec4 uGlobalColor;

  void main() {
    gl_FragColor = uGlobalColor;
  }
`;

const compileShader = (
  gl: WebGLRenderingContext,
  id: string,
  type: number,
  code: string
) => {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, code);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(
      `Error compiling ${
        type === gl.VERTEX_SHADER ? "vertex" : "fragment}"
      } shader:`
    );
    console.log(gl.getShaderInfoLog(shader));
  }
  return shader;
};

const buildShaderProgram = (
  gl: WebGLRenderingContext,
  shaderInfo: ShaderInfo
) => {
  const program = gl.createProgram()!;

  shaderInfo.forEach((desc) => {
    const shader = compileShader(gl, desc.id, desc.type, desc.code);
    if (shader) {
      gl.attachShader(program, shader);
    }
  });

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log("Error linking shader program");
    console.log(gl.getProgramInfoLog(program));
  }

  return program;
};

const sketch = ({ canvas, gl, width, height }: WebGLProps) => {
  const shaderSet: ShaderInfo = [
    {
      type: gl.VERTEX_SHADER,
      id: "vertex-shader",
      code: vs,
    },
    {
      type: gl.FRAGMENT_SHADER,
      id: "fragment-shader",
      code: fs,
    },
  ];

  const program = buildShaderProgram(gl, shaderSet);
  gl.useProgram(program);

  // vertex info
  const vertexArray = new Float32Array([
    -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5,
  ]);
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW);
  const vertexNumComponents = 2;
  const vertexCount = vertexArray.length / vertexNumComponents;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  const aVertexPos = gl.getAttribLocation(program, "aVertexPos");
  gl.enableVertexAttribArray(aVertexPos);
  gl.vertexAttribPointer(
    aVertexPos,
    vertexNumComponents,
    gl.FLOAT,
    false,
    0,
    0
  );

  // data
  let currentRotation = [0, 1];
  let aspectRatio = width / height;
  let currentScale = [1.0, aspectRatio];

  const uRotationVec = gl.getUniformLocation(program, "uRotationVec");
  const uScalingFactor = gl.getUniformLocation(program, "uScalingFactor");
  const uGlobalColor = gl.getUniformLocation(program, "uGlobalColor");

  return {
    render({ width, height, playhead }: WebGLProps) {
      // coordinate system
      gl.viewport(0, 0, width, height);
      gl.clearColor(0.9, 0.8, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // update data
      const radians = playhead * Math.PI * 2;
      currentRotation[0] = Math.sin(radians);
      currentRotation[1] = Math.cos(radians);

      gl.uniform2fv(uScalingFactor, currentScale);
      gl.uniform2fv(uRotationVec, currentRotation);
      gl.uniform4fv(uGlobalColor, [0.7, 0.1, 0.0, 1.0]);

      // draw
      gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
    },
    resize({ width, height }: WebGLProps) {
      aspectRatio = width / height;
      currentScale = [1.0, aspectRatio];
    },
  };
};

const settings: SketchSettings = {
  title: `Example: ${name}`,
  mode: "webgl",
  dimensions: [600, 600],
  duration: 4000,
  playFps: 60,
  exportFps: 90,
  filename: `${name}`,
  attributes: {
    preserveDrawingBuffer: true,
  },
};

sketchWrapper(sketch as Sketch, settings);
