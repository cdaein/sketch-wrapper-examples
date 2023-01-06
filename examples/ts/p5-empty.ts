// import { sketchWrapper } from "@daeinc/sketch-wrapper";
// import type {
//   Sketch,
//   SketchProps,
//   SketchSettings,
// } from "@daeinc/sketch-wrapper";
// import p5 from "p5";

// const name = "P5";

// const sk = new p5((p) => {
//   p.setup = () => {
//     p.createCanvas(500, 500);
//     p.fill(90, 0, 0);
//     p.rect(0, 0, p.width, p.height);

//     p.noStroke();
//     p.fill(255);
//     p.ellipse(p.width / 2, p.height / 2, p.width / 2, p.width / 2);
//   };
// });

// const sketch = () => {
//   // returned function is an animation render loop
//   return ({ context: ctx, width, height, playhead }: SketchProps) => {
//     ctx.fillStyle = `gray`;
//     ctx.fillRect(0, 0, width, height);

//     // repeat 0..1
//     const cycle = Math.sin(playhead * Math.PI * 2) * 0.5 + 0.5;
//   };
// };

// const settings: SketchSettings = {
//   title: `Example: ${name}`,
//   dimensions: [600, 600],
//   pixelRatio: window.devicePixelRatio,
//   // duration: 2000,
//   filename: `${name}`,
// };

// sketchWrapper(sketch as Sketch, settings);
