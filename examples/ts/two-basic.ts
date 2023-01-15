/**
 * example adapted from:
 * https://codepen.io/jonobr1/pen/NWvJZPp
 */

import sketchWrapper from "@daeinc/sketch-wrapper";
import type {
  Sketch,
  SketchProps,
  SketchSettings,
} from "@daeinc/sketch-wrapper";
import Two from "two.js";
import { hsv2rgb } from "@daeinc/color";
import { Group } from "two.js/src/group";
import { Vector } from "two.js/src/vector";

const name = "two-basic";

interface Ball extends Group {
  destination: Vector;
}
interface Eye extends Group {
  ball: Ball;
}

const makeEye = (two: Two, width: number, height: number) => {
  const ball = two.makeGroup() as Ball;
  const eye = two.makeGroup() as Eye;

  const retina = two.makeCircle(0, 0, height / 4);
  retina.noStroke();
  // prettier-ignore
  const gradient = two.makeRadialGradient(0, 0, height/4,
    new Two.Stop(0, `rgb(${hsv2rgb(0.45, 1, 0.9)})`),
    new Two.Stop(1, `rgb(${hsv2rgb(0.1, 1, 0.7)})`),
  );
  gradient.units = "userSpaceOnUse";
  retina.fill = gradient;

  const pupil = two.makeCircle(0, 0, height / 8);
  pupil.fill = "#333";
  pupil.linewidth = 10;
  pupil.noStroke();
  const reflection = two.makeCircle(height / 12, -height / 12, height / 12);
  reflection.fill = "rgba(255, 255, 255, 0.8)";
  reflection.noStroke();

  const lid = two.makeEllipse(0, 0, height / 3, height / 4);
  lid.stroke = "#333";
  lid.linewidth = 15;
  lid.noFill();

  const eyeMask = two.makeEllipse(0, 0, height / 3, height / 4);
  eyeMask.noStroke();

  const container = two.makeGroup(ball);

  ball.add(retina, pupil, reflection);
  ball.destination = new Two.Vector();

  eye.add(container, eyeMask, lid);

  container.mask = eyeMask;

  eye.ball = ball;

  return eye;
};

const sketch = ({ canvas, width, height, pixelRatio }: SketchProps) => {
  const two = new Two({
    type: Two.Types.canvas,
    width: width,
    height: height,
    ratio: pixelRatio,
    domElement: canvas,
  });
  // this effectively transforms canvas to have origin at center
  two.scene.position.set(width / 2, height / 2);

  const bg = two.makeRectangle(0, 0, width, height);
  bg.noStroke();
  bg.fill = `lightgray`;
  two.add(bg);

  const eye = makeEye(two, width, height);

  return {
    render({ width, height, playhead }: SketchProps) {
      two.update();
    },
    resize({ width, height, pixelRatio }: SketchProps) {
      two.renderer.setSize(width, height, pixelRatio);
      two.scene.position.set(width / 2, height / 2);
      two.update();
    },
  };
};

const settings: SketchSettings = {
  title: `Example: ${name}`,
  dimensions: [600, 600],
  pixelRatio: 2,
  // duration: 10000,
  animate: true,
  filename: `${name}`,
};

sketchWrapper(sketch as Sketch, settings);
