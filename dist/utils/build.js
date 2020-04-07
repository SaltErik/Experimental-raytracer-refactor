import { Light } from "../lib/rays/light.js";
import { Camera } from "../lib/room/camera.js";
import { Scene } from "../lib/room/scene.js";
import { Plane } from "../lib/shapes/plane.js";
import { Sphere } from "../lib/shapes/sphere.js";
import { Checkerboard } from "../lib/surfaces/checkerboard.js";
import { Shiny } from "../lib/surfaces/shiny.js";
class Build {
    static _plane() {
        const normal = [0, 1, 0];
        const offset = 0;
        const surface = new Checkerboard();
        return new Plane(normal, offset, surface);
    }
    static _sphere1() {
        const center = [0, 1, -0.25];
        const radius = 1;
        const surface = new Shiny();
        return new Sphere(center, radius, surface);
    }
    static _sphere2() {
        const center = [-1, 0.5, 1.5];
        const radius = 0.5;
        const surface = new Shiny();
        return new Sphere(center, radius, surface);
    }
    static _lightOne() {
        const position = [-2, 2.5, 0];
        const color = [0.49, 0.07, 0.07];
        return new Light(position, color);
    }
    static _lightTwo() {
        const position = [1.5, 2.5, 1.5];
        const color = [0.07, 0.07, 0.49];
        return new Light(position, color);
    }
    static _lightThree() {
        const position = [1.5, 2.5, -1.5];
        const color = [0.07, 0.49, 0.07];
        return new Light(position, color);
    }
    static _lightFour() {
        const position = [0, 3.5, 0];
        const color = [0.21, 0.21, 0.35];
        return new Light(position, color);
    }
    static _defaultThings() {
        return [Build._plane(), Build._sphere1(), Build._sphere2()];
    }
    static _defaultLights() {
        return [Build._lightOne(), Build._lightTwo(), Build._lightThree(), Build._lightFour()];
    }
    static _defaultCamera() {
        const position = [3, 2, 4];
        const lookAt = [-1, 0.5, 0];
        return new Camera(position, lookAt);
    }
    static defaultScene() {
        const things = Build._defaultThings();
        const lights = Build._defaultLights();
        const camera = Build._defaultCamera();
        return new Scene(things, lights, camera);
    }
    static _randomLight() {
        const position = [((Math.random() + Math.random()) * Math.PI) / 2, ((Math.random() + Math.random()) * Math.PI) / 2, ((Math.random() + Math.random()) * Math.PI) / 2];
        const color = [Math.random(), Math.random(), Math.random()];
        return new Light(position, color);
    }
    static _randomPlane() {
        const normal = [0, 1, 0];
        const offset = Math.random();
        const surface = Math.random() > 0.5 ? new Checkerboard() : new Shiny();
        return new Plane(normal, offset, surface);
    }
    static _randomSphere() {
        const center = [((Math.random() + Math.random()) * Math.PI) / 2, ((Math.random() + Math.random()) * Math.PI) / 2, ((Math.random() + Math.random()) * Math.PI) / 2];
        const radius = Math.random();
        const surface = Math.random() > 0.5 ? new Checkerboard() : new Shiny();
        return new Sphere(center, radius, surface);
    }
    static _randomThings() {
        if (Math.random() > 0.5) {
            return [Build._randomPlane(), Build._randomSphere(), Build._randomSphere()];
        }
        else {
            return [Build._randomPlane(), Build._randomSphere(), Build._randomSphere(), Build._randomSphere()];
        }
    }
    static _randomLights() {
        return [Build._randomLight(), Build._randomLight(), Build._randomLight(), Build._randomLight()];
    }
    static randomScene() {
        const things = Build._randomThings();
        const lights = Build._randomLights();
        const camera = Build._defaultCamera();
        return new Scene(things, lights, camera);
    }
}
export { Build };
