import sketchWrapper from "@daeinc/sketch-wrapper";
import type {
  Sketch,
  SketchProps,
  SketchSettings,
} from "@daeinc/sketch-wrapper";
import { hsv2rgb } from "@daeinc/color";
import { makeNoise2D } from "open-simplex-noise";
import { drawCircle } from "@daeinc/draw";

const name = "2d-resize";

const sketch = () => {
  // setup code (runs once)
  const noise = makeNoise2D(345890);

  let hue = 0.65;

  // instead of returning a render function, it can return an object with render() and resize()
  return {
    render({ context: ctx, width, height, playhead }: SketchProps) {
      // repeat 0..1
      const cycle = Math.sin(playhead * Math.PI * 2) * 0.5 + 0.5;

      const aspectRatio = width / height;

      let orientation = aspectRatio >= 1 ? "h" : "v";

      let numCircles =
        orientation === "h"
          ? Math.max(Math.floor(aspectRatio), 1)
          : Math.max(Math.floor(1 / aspectRatio), 1);

      /**
       * position:
       * n=1 - width/2*1
       * n=2 - width/4*1, width/4*3
       * n=3 - width/6*1, width/6*3, width/6*5
       *
       * diam:
       * n=1 - width/1
       * n=2 - width/2
       */

      const maxDimension = Math.max(width, height);
      const minDimension = Math.min(width, height);

      ctx.fillStyle = `rgb(${hsv2rgb(0, 0, minDimension / maxDimension)})`;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < numCircles; i++) {
        ctx.beginPath();
        if (orientation === "h") {
          const x = (width / (numCircles * 2)) * (i * 2 + 1);
          ctx.ellipse(
            x,
            height / 2,
            width / numCircles / 2,
            minDimension / 2,
            0,
            0,
            Math.PI * 2
          );
        } else {
          const y = (height / (numCircles * 2)) * (i * 2 + 1);
          ctx.ellipse(
            width / 2,
            y,
            minDimension / 2,
            height / numCircles / 2,
            0,
            0,
            Math.PI * 2
          );
        }

        ctx.fillStyle = `rgb(${hsv2rgb(hue + i * 0.1, 1, 1)})`;
        ctx.fill();
      }
    },
    resize({ width, height }: SketchProps) {
      // resize gets called once at beginning,
      // and re-run whenever canvas size has changed
      // hue = Math.abs(noise(width * 0.01, height * 0.01));
    },
  };
};

const settings: SketchSettings = {
  title: `Example: ${name}`,
  // dimensions: [600, 600],
  pixelRatio: window.devicePixelRatio,
  duration: 2000,
  filename: `${name}`,
};

sketchWrapper(sketch as Sketch, settings);
