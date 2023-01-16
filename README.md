# sketch-wrapper-examples

A collection of sketches that demonstrate the use of [`sketch-wrapper`](https://github.com/cdaein/sketch-wrapper) and other libraries used together.

## How to run

1. Download or clone this repo to your machine.
1. `cd` into the downloaded folder.
1. Intall the dependencies by running `npm install` in your Terminal. You need to have Node.js installed on your computer.
1. To run the sketch, in the Terminal, run `npm start`. The repo uses Vite.js for dev server.
1. Open the browser and go to the localhost. By default, it is `http://localhost:5173/`.
1. In the `examples` folder, there are both TypeScript and JavaScript sketches. JS sketches are compiled from TS. To run any of the sketches, update the `<script>` tag in `index.html` to point to a JS or TS sketch.

> Note: Currently, Vitejs prints source file missing warning when using `ogl-typescript` but it looks to be working fine. If you prefer a different dev server, use `npm run parcel` to use Parcel.

## Outputs

Click each image to see the TypeScript source code.

|                           2d-basic                            |                            2d-resize                             |                           ogl-cube                            |
| :-----------------------------------------------------------: | :--------------------------------------------------------------: | :-----------------------------------------------------------: |
| [![2d basic](output/2d-basic.png)](./examples/ts/2d-basic.ts) | [![2d resize](output/2d-resize.png)](./examples/ts/2d-resize.ts) | [![ogl cube](output/ogl-cube.png)](./examples/ts/ogl-cube.ts) |

|                           pts-grid                            |                            two-basic                             |                              webgl-basic                               |
| :-----------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------------: |
| [![pts grid](output/pts-grid.png)](./examples/ts/pts-grid.ts) | [![two basic](output/two-basic.png)](./examples/ts/two-basic.ts) | [![webgl basic](output/webgl-basic.png)](./examples/ts/webgl-basic.ts) |
