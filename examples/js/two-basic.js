import sketchWrapper from "@daeinc/sketch-wrapper";
import Two from "two.js";
const sketch = ({ canvas, width, height, pixelRatio }) => {
    const two = new Two({
        type: Two.Types.canvas,
        width: width,
        height: height,
        ratio: pixelRatio,
        domElement: canvas,
    });
    // this effectively transform canvas to have origin at center
    two.scene.position.set(width / 2, height / 2);
    const bg = two.makeRectangle(0, 0, width, height);
    bg.fill = `gray`;
    two.add(bg);
    const rect = two.makeRectangle(0, 0, width / 2, width / 2);
    rect.fill = `yellow`;
    two.add(rect);
    two.update();
    return {
        render({ width, height, playhead }) {
            rect.rotation = playhead * Math.PI * 2;
            two.update();
        },
        resize({ width, height, pixelRatio }) {
            two.renderer.setSize(width, height, pixelRatio);
            two.update();
            two.scene.position.set(width / 2, height / 2);
            bg.position.set(0, 0);
            // bg.position.scale??
            // two.bind("resize", resize);
            // resize();
        },
    };
};
const settings = {
    // dimensions: [600, 600],
    pixelRatio: 2,
    duration: 10000,
    // animate: false,
};
sketchWrapper(sketch, settings);
