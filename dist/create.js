import { Camera } from "./camera.js";
import { Checkerboard } from "./checkerboard.js";
import { Light } from "./light.js";
import { Plane } from "./plane.js";
import { Scene } from "./scene.js";
import { Shiny } from "./shiny.js";
import { Sphere } from "./sphere.js";
class Build {
    static plane() {
        const norm = {
            x: 0.0,
            y: 1.0,
            z: 0.0,
        };
        return new Plane(norm, 0.0, new Checkerboard());
    }
    static sphere1() {
        const center = {
            x: 0.0,
            y: 1.0,
            z: -0.25,
        };
        return new Sphere(center, 1.0, new Shiny());
    }
    static sphere2() {
        const center = {
            x: -1.0,
            y: 0.5,
            z: 1.5,
        };
        return new Sphere(center, 0.5, new Shiny());
    }
    static defaultThings() {
        return [Build.plane(), Build.sphere1(), Build.sphere2()];
    }
    static lightOne() {
        const position = {
            x: -2.0,
            y: 2.5,
            z: 0.0,
        };
        const color = {
            r: 0.49,
            g: 0.07,
            b: 0.07,
        };
        return new Light(position, color);
    }
    static lightTwo() {
        const position = {
            x: 1.5,
            y: 2.5,
            z: 1.5,
        };
        const color = {
            r: 0.07,
            g: 0.07,
            b: 0.49,
        };
        return new Light(position, color);
    }
    static lightThree() {
        const position = {
            x: 1.5,
            y: 2.5,
            z: -1,
        };
        const color = {
            r: 0.07,
            g: 0.49,
            b: 0.07,
        };
        return new Light(position, color);
    }
    static lightFour() {
        const position = {
            x: 0.0,
            y: 3.5,
            z: 0.0,
        };
        const color = {
            r: 0.21,
            g: 0.21,
            b: 0.35,
        };
        return new Light(position, color);
    }
    static defaultLights() {
        return [Build.lightOne(), Build.lightTwo(), Build.lightThree(), Build.lightFour()];
    }
    static defaultCamera() {
        const position = {
            x: 3.0,
            y: 2.0,
            z: 4.0,
        };
        const lookAt = {
            x: -1.0,
            y: 0.5,
            z: 0.0,
        };
        return new Camera(position, lookAt);
    }
    static defaultScene() {
        const things = Build.defaultThings();
        const lights = Build.defaultLights();
        const camera = Build.defaultCamera();
        return new Scene(things, lights, camera);
    }
}
export { Build as Create };
