import { Camera } from "./camera.js";
import { Checkerboard } from "./checkerboard.js";
import { Color } from "./color.js";
import { Light } from "./light.js";
import { Plane } from "./plane.js";
import { Scene } from "./scene.js";
import { Shiny } from "./shiny.js";
import { Sphere } from "./sphere.js";
import { Surface } from "./surface.js";
import { Thing } from "./thing.js";
import { Vector } from "./vector.js";

class Create {
  static checkeredPlane(): Plane {
    const normal: Vector = new Vector(0.0, 1.0, 0.0);
    const offset: number = 1.0;
    const surface: Surface = new Checkerboard();
    return new Plane(normal, offset, surface);
  }

  static bigSphere(): Sphere {
    const center: Vector = new Vector(0.0, 1.0, -0.25);
    const radius: number = 1.0;
    const surface: Surface = new Shiny();
    return new Sphere(center, radius, surface);
  }

  static smallSphere(): Sphere {
    const center: Vector = new Vector(-1.0, 0.5, 1.5);
    const radius: number = 0.5;
    const surface: Surface = new Shiny();
    return new Sphere(center, radius, surface);
  }

  static dimRedLight(): Light {
    const position = new Vector(-2.0, 2.5, 0.0);
    const color = new Color(0.49, 0.07, 0.07);
    return new Light(position, color);
  }

  static dimBlueLight(): Light {
    const position = new Vector(1.5, 2.5, 1.5);
    const color = new Color(0.07, 0.07, 0.49);
    return new Light(position, color);
  }

  static brightBlueLight(): Light {
    const position = new Vector(1.5, 2.5, -1.5);
    const color = new Color(0.07, 0.49, 0.071);
    return new Light(position, color);
  }

  static brightGreenLight(): Light {
    const position = new Vector(0.0, 3.5, 0.0);
    const color = new Color(0.21, 0.21, 0.35);
    return new Light(position, color);
  }

  static defaultCamera(): Camera {
    const position = new Vector(3.0, 2.0, 4.0);
    const lookAt = new Vector(-1.0, 0.5, 0.0);
    return new Camera(position, lookAt);
  }

  static defaultScene(): Scene {
    const things: Thing[] = [
      Create.checkeredPlane(),
      Create.bigSphere(),
      Create.smallSphere(),
    ];
    const lights: Light[] = [
      Create.dimRedLight(),
      Create.dimBlueLight(),
      Create.brightBlueLight(),
      Create.brightGreenLight()
    ];
    const camera: Camera = Create.defaultCamera();
    return new Scene(things, lights, camera);
  }
}

export { Create };
