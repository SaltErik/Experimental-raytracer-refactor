import { Create } from "./create.js";
import { RayTracer } from "./raytracer.js";

const SAME: number = 2048 as const;

const WIDTH: number = SAME;
const HEIGHT: number = SAME;

function run() {
  const canvas = document.createElement("canvas");
  if (!canvas) throw new Error("Could not create canvas!")

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  document.body.appendChild(canvas);

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get 2D context!")

  const rayTracer = new RayTracer(WIDTH, HEIGHT);
  if (!rayTracer) throw new Error("Could not instantiate RayTracer!")

  const defaultScene = Create.defaultScene();
  if (!defaultScene) throw new Error("Could not instantiate default scene!")

  return rayTracer.render(defaultScene, context);
}

run();
