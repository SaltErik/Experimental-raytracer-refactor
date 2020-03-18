import { Camera } from "./camera.js";
import { Checkerboard } from "./checkerboard.js";
import { Light } from "./light.js";
import { Plane } from "./plane.js";
import { Scene } from "./scene.js";
import { Shiny } from "./shiny.js";
import { Sphere } from "./sphere.js";
class Build {
    static _plane() {
        const normal = {
            x: 0.0,
            y: 1.0,
            z: 0.0,
        };
        const offset = 0.0;
        const surface = new Checkerboard();
        return new Plane(normal, offset, surface);
    }
    static _sphere1() {
        const center = {
            x: 0.0,
            y: 1.0,
            z: -0.25,
        };
        const radius = 1.0;
        const surface = new Shiny();
        return new Sphere(center, radius, surface);
    }
    static _sphere2() {
        const center = {
            x: -1.0,
            y: 0.5,
            z: 1.5,
        };
        const radius = 0.5;
        const surface = new Shiny();
        return new Sphere(center, radius, surface);
    }
    static _lightOne() {
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
    static _lightTwo() {
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
    static _lightThree() {
        const position = {
            x: 1.5,
            y: 2.5,
            z: -1.5,
        };
        const color = {
            r: 0.07,
            g: 0.49,
            b: 0.07,
        };
        return new Light(position, color);
    }
    static _lightFour() {
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
    static _defaultThings() {
        return [Build._plane(), Build._sphere1(), Build._sphere2()];
    }
    static _defaultLights() {
        return [Build._lightOne(), Build._lightTwo(), Build._lightThree(), Build._lightFour()];
    }
    static _defaultCamera() {
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
        const things = Build._defaultThings();
        const lights = Build._defaultLights();
        const camera = Build._defaultCamera();
        return new Scene(things, lights, camera);
    }
    static _randomLight() {
        const position = {
            x: ((Math.random() + Math.random()) * Math.PI) / 2,
            y: ((Math.random() + Math.random()) * Math.PI) / 2,
            z: ((Math.random() + Math.random()) * Math.PI) / 2,
        };
        const color = {
            r: Math.random(),
            g: Math.random(),
            b: Math.random(),
        };
        return new Light(position, color);
    }
    static _randomPlane() {
        const normal = {
            x: 0.0,
            y: 1.0,
            z: 0.0,
        };
        const offset = Math.random();
        const surface = Math.random() > 0.5 ? new Checkerboard() : new Shiny();
        return new Plane(normal, offset, surface);
    }
    static _randomSphere() {
        const center = {
            x: ((Math.random() + Math.random()) * Math.PI) / 2,
            y: ((Math.random() + Math.random()) * Math.PI) / 2,
            z: ((Math.random() + Math.random()) * Math.PI) / 2,
        };
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
