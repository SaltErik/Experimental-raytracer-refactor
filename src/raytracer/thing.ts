import { Intersection } from "./intersection.js";
import { Ray } from "./ray.js";
import { Surface } from "./surface.js";
import { Vector } from "./vector.js";

abstract class Thing {
  vector: Vector;

  number: number;

  surface: Surface;

  constructor(vector: Vector, number: number, surface: Surface) {
    this.vector = vector;
    this.number = number;
    this.surface = surface;
  }

  abstract normal(this: Thing, position?: Vector): Vector;

  abstract intersect(this: Thing, ray: Ray): Intersection | null;
}

export { Thing };
