import { Intersection, Ray, Surface, Thing } from "./declarations.js";
import { Vector } from "./vector.js";

class Sphere implements Thing {
  center: Vector;

  radius: number;

  surface: Surface;

  radiusSquared: number;

  constructor(center: Vector, radius: number, surface: Surface) {
    this.center = center;
    this.radius = radius;
    this.surface = surface;
    this.radiusSquared = radius * radius;
  }

  normal(this: Sphere, pos: Vector): Vector {
    return Vector.normal(Vector.minus(pos, this.center));
  }

  intersect(this: Sphere, ray: Ray): Intersection | null {
    const eo = Vector.minus(this.center, ray.start);

    const v = Vector.dotProduct(eo, ray.direction);

    let distance = 0;

    if (v >= 0) {
      const disc = this.radiusSquared - (Vector.dotProduct(eo, eo) - v * v);
      if (disc >= 0) {
        distance = v - Math.sqrt(disc);
      }
    }

    if (distance === 0) return null;

    return {
      thing: this,
      ray,
      distance,
    } as Intersection;
  }
}

export { Sphere };
