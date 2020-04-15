"use strict";
import { Intersection, Ray, Surface, Thing, XYZ } from "../../typings/declarations";
import { Vector } from "../maths/vector.js";

class Sphere implements Thing {
  center: XYZ;

  radius: number;

  radiusSquared: number;

  surface: Surface;

  constructor(center: XYZ, radius: number, surface: Surface) {
    this.center = center;
    this.radius = radius;
    this.surface = surface;
    this.radiusSquared = radius * radius;
  }

  normal(this: Sphere, pos: XYZ): XYZ {
    return Vector.normal(Vector.minus(pos, this.center));
  }

  intersect(this: Sphere, ray: Ray): Intersection | null {
    const eo: XYZ = Vector.minus(this.center, ray.start);

    const value: number = Vector.dotProduct(eo, ray.direction);

    let distance: number = 0;

    if (value >= 0) {
      const disc = this.radiusSquared - (Vector.dotProduct(eo, eo) - value * value);
      if (disc >= 0) {
        distance = value - Math.sqrt(disc);
      }
    }

    if (!distance) return null;

    return {
      thing: this,
      ray,
      distance,
    } as Intersection;
  }
}

export { Sphere };
