import { Camera } from "./camera.js";
import { Checkerboard } from "./checkerboard.js";
import { RGB, Surface, Thing, XYZ } from "./declarations.js";
import { Light } from "./light.js";
import { Plane } from "./plane.js";
import { Scene } from "./scene.js";
import { Shiny } from "./shiny.js";
import { Sphere } from "./sphere.js";

class Build {
  private static _plane(): Plane {
    const normal: XYZ = {
      x: 0,
      y: 1,
      z: 0,
    };
    const offset: number = 0;
    const surface: Surface = new Checkerboard();
    return new Plane(normal, offset, surface);
  }

  private static _sphere1(): Sphere {
    const center: XYZ = {
      x: 0,
      y: 1,
      z: -0.25,
    };
    const radius: number = 1;
    const surface: Surface = new Shiny();
    return new Sphere(center, radius, surface);
  }

  private static _sphere2(): Sphere {
    const center: XYZ = {
      x: -1,
      y: 0.5,
      z: 1.5,
    };
    const radius: number = 0.5;
    const surface: Surface = new Shiny();
    return new Sphere(center, radius, surface);
  }

  private static _lightOne(): Light {
    const position: XYZ = {
      x: -2,
      y: 2.5,
      z: 0,
    };
    const color: RGB = {
      r: 0.49,
      g: 0.07,
      b: 0.07,
    };
    return new Light(position, color);
  }

  private static _lightTwo(): Light {
    const position: XYZ = {
      x: 1.5,
      y: 2.5,
      z: 1.5,
    };
    const color: RGB = {
      r: 0.07,
      g: 0.07,
      b: 0.49,
    };
    return new Light(position, color);
  }

  private static _lightThree(): Light {
    const position: XYZ = {
      x: 1.5,
      y: 2.5,
      z: -1.5,
    };
    const color: RGB = {
      r: 0.07,
      g: 0.49,
      b: 0.07,
    };
    return new Light(position, color);
  }

  private static _lightFour(): Light {
    const position: XYZ = {
      x: 0,
      y: 3.5,
      z: 0,
    };
    const color: RGB = {
      r: 0.21,
      g: 0.21,
      b: 0.35,
    };
    return new Light(position, color);
  }

  private static _defaultThings(): Thing[] {
    return [Build._plane(), Build._sphere1(), Build._sphere2()];
  }

  private static _defaultLights(): Light[] {
    return [Build._lightOne(), Build._lightTwo(), Build._lightThree(), Build._lightFour()];
  }

  private static _defaultCamera(): Camera {
    const position: XYZ = {
      x: 3,
      y: 2,
      z: 4,
    };
    const lookAt: XYZ = {
      x: -1,
      y: 0.5,
      z: 0,
    };
    return new Camera(position, lookAt);
  }

  static defaultScene(): Scene {
    const things: Thing[] = Build._defaultThings();
    const lights: Light[] = Build._defaultLights();
    const camera: Camera = Build._defaultCamera();
    return new Scene(things, lights, camera);
  }

  private static _randomLight(): Light {
    const position: XYZ = {
      x: ((Math.random() + Math.random()) * Math.PI) / 2,
      y: ((Math.random() + Math.random()) * Math.PI) / 2,
      z: ((Math.random() + Math.random()) * Math.PI) / 2,
    };
    const color: RGB = {
      r: Math.random(),
      g: Math.random(),
      b: Math.random(),
    };
    return new Light(position, color);
  }

  private static _randomPlane(): Plane {
    const normal: XYZ = {
      x: 0,
      y: 1,
      z: 0,
    };
    const offset: number = Math.random();
    const surface = Math.random() > 0.5 ? new Checkerboard() : new Shiny();
    return new Plane(normal, offset, surface);
  }

  private static _randomSphere() {
    const center: XYZ = {
      x: ((Math.random() + Math.random()) * Math.PI) / 2,
      y: ((Math.random() + Math.random()) * Math.PI) / 2,
      z: ((Math.random() + Math.random()) * Math.PI) / 2,
    };
    const radius: number = Math.random();
    const surface = Math.random() > 0.5 ? new Checkerboard() : new Shiny();
    return new Sphere(center, radius, surface);
  }

  private static _randomThings(): Thing[] {
    if (Math.random() > 0.5) {
      return [Build._randomPlane(), Build._randomSphere(), Build._randomSphere()];
    } else {
      return [Build._randomPlane(), Build._randomSphere(), Build._randomSphere(), Build._randomSphere()];
    }
  }

  private static _randomLights(): Light[] {
    return [Build._randomLight(), Build._randomLight(), Build._randomLight(), Build._randomLight()];
  }

  static randomScene(): Scene {
    const things: Thing[] = Build._randomThings();
    const lights: Light[] = Build._randomLights();
    const camera: Camera = Build._defaultCamera();
    return new Scene(things, lights, camera);
  }
}

export { Build };
