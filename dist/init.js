import { Camera } from "./camera.js";
import { Checkerboard } from "./checkerboard.js";
import { Plane } from "./plane.js";
import { RayTracer } from "./raytracer.js";
import { Scene } from "./scene.js";
import { Shiny } from "./shiny.js";
import { Sphere } from "./sphere.js";
import { Vector } from "./vector.js";
function defaultThings() {
    return [new Plane(new Vector(0.0, 1.0, 0.0), 0.0, new Checkerboard()), new Sphere(new Vector(0.0, 1.0, -0.25), 1.0, new Shiny()), new Sphere(new Vector(-1.0, 0.5, 1.5), 0.5, new Shiny())];
}
function defaultLights() {
    return [
        {
            position: new Vector(-2.0, 2.5, 0.0),
            color: {
                r: 0.49,
                g: 0.07,
                b: 0.07,
            },
        },
        {
            position: new Vector(1.5, 2.5, 1.5),
            color: {
                r: 0.07,
                g: 0.07,
                b: 0.49,
            },
        },
        {
            position: new Vector(1.5, 2.5, -1.5),
            color: {
                r: 0.07,
                g: 0.49,
                b: 0.07,
            },
        },
        {
            position: new Vector(0.0, 3.5, 0.0),
            color: {
                r: 0.21,
                g: 0.21,
                b: 0.35,
            },
        },
    ];
}
function defaultCamera() {
    return new Camera(new Vector(3.0, 2.0, 4.0), new Vector(-1.0, 0.5, 0.0));
}
function init() {
    const canvas = document.createElement(`canvas`);
    if (!canvas)
        throw new Error("Could not create canvas!");
    const SAME = 512;
    canvas.width = SAME;
    canvas.height = SAME;
    document.body.appendChild(canvas);
    const context = canvas.getContext(`2d`);
    if (!context)
        throw new Error("Could not get 2D context!");
    const rayTracer = new RayTracer(canvas.width, canvas.height);
    if (!rayTracer)
        throw new Error("Could not instantiate RayTracer!");
    const scene = new Scene(defaultThings(), defaultLights(), defaultCamera());
    if (!scene)
        throw new Error("Could not create scene!");
    return rayTracer.render(scene, context);
}
console.time("fullRun");
init();
console.timeEnd("fullRun");
