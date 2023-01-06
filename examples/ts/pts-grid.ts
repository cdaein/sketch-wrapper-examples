import { sketchWrapper } from "@daeinc/sketch-wrapper";
import type {
  Sketch,
  SketchProps,
  SketchSettings,
} from "@daeinc/sketch-wrapper";
import { CanvasForm, Pt, Bound, Create, Rectangle, Color } from "pts";

const name = "pts-grid";

const sketch = ({ context: ctx, width, height }: SketchProps) => {
  // helpful pts data
  const form = new CanvasForm(ctx);
  const size = new Pt(width, height);
  const center = size.$divide(2);
  const innerBound = new Bound(new Pt(), new Pt(size));

  // create a group
  const pts = Create.gridCells(innerBound, 12, 12);

  return ({ width, height, playhead }: SketchProps) => {
    form.fillOnly("#222").rect([[0, 0], size]);

    pts.map((p, i) => {
      // playhead goes from 0..1 over duration (in this example, 2 sec)
      const cycle = Math.sin(i + playhead * Math.PI * 2);
      const cycle2 = Math.cos(i + playhead * (Math.PI * 2));

      const r = Rectangle.fromCenter(
        Rectangle.center(p),
        Rectangle.size(p).multiply(0.5 + cycle * 0.3)
      );

      form.fill(Color.HSLtoRGB(Color.hsl(cycle2 * 100, 1, 0.5)).hex).rect(r);
    });
  };
};

const settings: SketchSettings = {
  title: `Example: ${name}`,
  dimensions: [600, 600],
  pixelRatio: window.devicePixelRatio,
  duration: 2000,
  filename: `${name}`,
};

sketchWrapper(sketch as Sketch, settings);
