import { Build } from "./build.js";
import { RayTracer } from "./raytracer.js";
function init() {
    const conflictingCanvas = document.querySelector(`canvas`);
    if (conflictingCanvas) {
        throw new ReferenceError(`A canvas already exists!`);
    }
    const canvas = document.createElement(`canvas`);
    const SAME = 1024;
    canvas.width = SAME;
    canvas.height = SAME;
    if (canvas.width !== canvas.height || SAME !== canvas.width) {
        throw new TypeError(`Canvas width/height mismatch!`);
    }
    document.body.appendChild(canvas);
    const shouldExist = document.querySelector(`canvas`);
    if (!shouldExist) {
        throw new ReferenceError(`Could not append canvas to body!`);
    }
    const context = canvas.getContext(`2d`);
    if (!context) {
        throw new ReferenceError(`Could not get 2D context!`);
    }
    const scene = Build.defaultScene();
    if (!scene) {
        throw new ReferenceError(`Could not create scene!`);
    }
    const rayTracer = new RayTracer(canvas.width, canvas.height);
    return rayTracer.render(context, scene);
}
console.time("fullRun");
init();
console.timeEnd("fullRun");
