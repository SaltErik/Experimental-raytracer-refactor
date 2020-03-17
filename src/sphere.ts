import { Intersection, Ray, Surface, Thing } from "./declarations.js";
import { Vector } from "./vector.js";

class Sphere implements Thing {
  center: Vector;

  radius: number;

  surface: Surface;

  get radiusSquared(this: Sphere) {
    return this.radius * this.radius;
  }

  constructor(center: Vector, radius: number, surface: Surface) {
    this.center = center;
    this.radius = radius;
    this.surface = surface;
  }

  normal(this: Sphere, pos: Vector): Vector {
    return Vector.normal(Vector.minus(pos, this.center));
  }

  intersect(this: Sphere, ray: Ray): Intersection | null {
    const eo: Vector = Vector.minus(this.center, ray.start);

    const value: number = Vector.dotProduct(eo, ray.direction);

    let distance: number = 0;

    if (value >= 0) {
      const disc = this.radiusSquared - (Vector.dotProduct(eo, eo) - value * value);
      if (disc >= 0) {
        distance = value - Math.sqrt(disc);
      }
    }

    if (!distance) return null;

    const intersection: Intersection = {
      thing: this,
      ray,
      distance,
    };

    return intersection;
  }
}

export { Sphere };
