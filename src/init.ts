import { Build } from "./build.js";
import { RayTracer } from "./raytracer.js";

function init(): void {
  const conflictingCanvas: HTMLCanvasElement | null = document.querySelector(`canvas`);
  if (conflictingCanvas) {
    throw new ReferenceError(`A canvas already exists!`);
  }

  const canvas: HTMLCanvasElement = document.createElement(`canvas`);

  const SAME: number = 2048 as const;
  canvas.width = SAME;
  canvas.height = SAME;

  if (canvas.width !== canvas.height || SAME !== canvas.width) {
    throw new TypeError(`Canvas width/height mismatch!`);
  }

  document.body.appendChild(canvas);
  const shouldExist: HTMLCanvasElement | null = document.querySelector(`canvas`);
  if (!shouldExist) {
    throw new ReferenceError(`Could not append canvas to body!`);
  }

  const context: CanvasRenderingContext2D | null = canvas.getContext(`2d`);
  if (!context) {
    throw new ReferenceError(`Could not get 2D context!`);
  }

  const scene = Build.defaultScene();
  if (!scene) {
    throw new ReferenceError(`Could not create scene!`);
  }

  const rayTracer: RayTracer = new RayTracer(canvas.width, canvas.height);

  return rayTracer.render(context, scene);
}

console.time("fullRun");
init();
console.timeEnd("fullRun");
