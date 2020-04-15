"use strict";
import { Light } from "../lib/rays/light.js";
import { Camera } from "../lib/room/camera.js";
import { Scene } from "../lib/room/scene.js";
import { Plane } from "../lib/shapes/plane.js";
import { Sphere } from "../lib/shapes/sphere.js";
import { Checkerboard } from "../lib/surfaces/checkerboard.js";
import { Shiny } from "../lib/surfaces/shiny.js";
import { RGB, Surface, Thing, XYZ } from "../typings/declarations";

class Build {
  private static _plane(): Plane {
    const normal: XYZ = [0, 1, 0];
    const offset: number = 0;
    const surface: Surface = new Checkerboard();
    return new Plane(normal, offset, surface);
  }

  private static _sphere1(): Sphere {
    const center: XYZ = [0, 1, -0.25];
    const radius: number = 1;
    const surface: Surface = new Shiny();
    return new Sphere(center, radius, surface);
  }

  private static _sphere2(): Sphere {
    const center: XYZ = [-1, 0.5, 1.5];
    const radius: number = 0.5;
    const surface: Surface = new Shiny();
    return new Sphere(center, radius, surface);
  }

  private static _lightOne(): Light {
    const position: XYZ = [-2, 2.5, 0];
    const color: RGB = [0.49, 0.07, 0.07];
    return new Light(position, color);
  }

  private static _lightTwo(): Light {
    const position: XYZ = [1.5, 2.5, 1.5];
    const color: RGB = [0.07, 0.07, 0.49];
    return new Light(position, color);
  }

  private static _lightThree(): Light {
    const position: XYZ = [1.5, 2.5, -1.5];
    const color: RGB = [0.07, 0.49, 0.07];
    return new Light(position, color);
  }

  private static _lightFour(): Light {
    const position: XYZ = [0, 3.5, 0];
    const color: RGB = [0.21, 0.21, 0.35];
    return new Light(position, color);
  }

  private static _defaultThings(): Thing[] {
    return [Build._plane(), Build._sphere1(), Build._sphere2()];
  }

  private static _defaultLights(): Light[] {
    return [Build._lightOne(), Build._lightTwo(), Build._lightThree(), Build._lightFour()];
  }

  private static _defaultCamera(): Camera {
    const position: XYZ = [3, 2, 4];
    const lookAt: XYZ = [-1, 0.5, 0];
    return new Camera(position, lookAt);
  }

  static defaultScene(): Scene {
    const things: Thing[] = Build._defaultThings();
    const lights: Light[] = Build._defaultLights();
    const camera: Camera = Build._defaultCamera();
    return new Scene(things, lights, camera);
  }

  private static _randomLight(): Light {
    const position: XYZ = [((Math.random() + Math.random()) * Math.PI) / 2, ((Math.random() + Math.random()) * Math.PI) / 2, ((Math.random() + Math.random()) * Math.PI) / 2];
    const color: RGB = [Math.random(), Math.random(), Math.random()];
    return new Light(position, color);
  }

  private static _randomPlane(): Plane {
    const normal: XYZ = [0, 1, 0];
    const offset: number = Math.random();
    const surface = Math.random() > 0.5 ? new Checkerboard() : new Shiny();
    return new Plane(normal, offset, surface);
  }

  private static _randomSphere() {
    const center: XYZ = [((Math.random() + Math.random()) * Math.PI) / 2, ((Math.random() + Math.random()) * Math.PI) / 2, ((Math.random() + Math.random()) * Math.PI) / 2];
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
