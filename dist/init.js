import { Camera } from "./camera.js";
import { Checkerboard } from "./checkerboard.js";
import { Color } from "./color.js";
import { Plane } from "./plane.js";
import { RayTracer } from "./raytracer.js";
import { Shiny } from "./shiny.js";
import { Sphere } from "./sphere.js";
import { Vector } from "./vector.js";
function defaultScene() {
    return {
        things: [new Plane(new Vector(0.0, 1.0, 0.0), 0.0, new Checkerboard()), new Sphere(new Vector(0.0, 1.0, -0.25), 1.0, new Shiny()), new Sphere(new Vector(-1.0, 0.5, 1.5), 0.5, new Shiny())],
        lights: [
            {
                position: new Vector(-2.0, 2.5, 0.0),
                color: new Color(0.49, 0.07, 0.07),
            },
            {
                position: new Vector(1.5, 2.5, 1.5),
                color: new Color(0.07, 0.07, 0.49),
            },
            {
                position: new Vector(1.5, 2.5, -1.5),
                color: new Color(0.07, 0.49, 0.071),
            },
            {
                position: new Vector(0.0, 3.5, 0.0),
                color: new Color(0.21, 0.21, 0.35),
            },
        ],
        camera: new Camera(new Vector(3.0, 2.0, 4.0), new Vector(-1.0, 0.5, 0.0)),
    };
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
    return rayTracer.render(defaultScene(), context);
}
init();
