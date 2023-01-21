import sketchWrapper from "@daeinc/sketch-wrapper";
import { Camera, Transform, Box, Program, Mesh, Renderer, } from "ogl-typescript";
const name = "ogl-cube";
const vertex = /*glsl*/ `
  attribute vec3 position;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  varying vec3 vPos;
  void main() {

    vPos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragment = /* glsl */ `
  precision mediump float;

  varying vec3 vPos;

  void main() {
    float dxy = distance(vPos.x, vPos.y);
    float dyz = distance(vPos.y, vPos.z);

    gl_FragColor = vec4(1.0, dxy, 1.0 - dyz, 1.0);
  }
`;
const sketch = ({ canvas, width, height, pixelRatio }) => {
    const renderer = new Renderer({
        canvas,
        width,
        height,
        dpr: pixelRatio,
    });
    const gl = renderer.gl;
    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 0, 4);
    const scene = new Transform();
    const geometry = new Box(gl);
    const program = new Program(gl, {
        vertex,
        fragment,
    });
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);
    return {
        render({ width, height, playhead, deltaTime }) {
            gl.clearColor(0.54, 0.7, 0.81, 1);
            // mesh.rotation.y -= deltaTime * 0.001;
            // mesh.rotation.x += deltaTime * 0.0015;
            mesh.rotation.y = playhead * Math.PI * 2;
            mesh.rotation.x = -playhead * Math.PI * 2;
            renderer.render({ scene, camera });
        },
        resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({
                aspect: gl.canvas.width / gl.canvas.height,
            });
        },
    };
};
const settings = {
    title: `Example: ${name}`,
    background: `#999`,
    mode: "webgl",
    dimensions: [600, 600],
    pixelRatio: window.devicePixelRatio,
    duration: 3_000,
    filename: `${name}`,
    exportFps: 24,
    framesFormat: "gif",
    attributes: {
        // preserve buffer to export image
        preserveDrawingBuffer: true,
    },
};
sketchWrapper(sketch, settings);
