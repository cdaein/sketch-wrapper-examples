import sketchWrapper from "@daeinc/sketch-wrapper";
import type {
  Sketch,
  SketchProps,
  SketchSettings,
} from "@daeinc/sketch-wrapper";
import { hsv2rgb } from "@daeinc/color";
import { drawCircle } from "@daeinc/draw";

const name = "2d-basic";

const sketch = () => {
  // returned function is an animation render loop
  return ({ context: ctx, width, height, playhead }: SketchProps) => {
    ctx.fillStyle = `gray`;
    ctx.fillRect(0, 0, width, height);

    // repeat 0..1
    const cycle = Math.sin(playhead * Math.PI * 2) * 0.5 + 0.5;
    const diam = Math.min(width, height);

    // drawCircle() is from @daeinc/draw package, but you can use vanilla Canvas functions or other libraries.
    drawCircle(ctx, [width / 2, height / 2], diam);
    ctx.fillStyle = `rgb(${hsv2rgb(0, 0, cycle)})`;
    ctx.fill();
  };
};

const settings: SketchSettings = {
  title: `Example: ${name}`,
  dimensions: [600, 600],
  pixelRatio: window.devicePixelRatio,
  duration: 2000,
  exportFps: 50,
  framesFormat: "gif",
  filename: `${name}`,
  attributes: {
    willReadFrequently: true,
  },
};

sketchWrapper(sketch as Sketch, settings);
