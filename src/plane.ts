import { Intersection, Ray, Surface, Thing } from "./declarations.js";
import { Vector } from "./vector.js";

class Plane implements Thing {
  private _norm: Vector;

  offset: number;

  surface: Surface;

  constructor(norm: Vector, offset: number, surface: Surface) {
    this._norm = norm;
    this.offset = offset;
    this.surface = surface;
  }

  normal(this: Plane, pos: Vector): Vector {
    return this._norm;
  }

  intersect(this: Plane, ray: Ray): Intersection | null {
    const denom = Vector.dotProduct(this._norm, ray.direction);

    if (denom > 0) return null;

    const distance = (Vector.dotProduct(this._norm, ray.start) + this.offset) / -denom;

    const intersection: Intersection = {
      thing: this,
      ray,
      distance,
    };

    return intersection;
  }
}

export { Plane };
