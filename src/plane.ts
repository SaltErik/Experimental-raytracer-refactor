import { Intersection, Ray, Surface, Thing, XYZ } from "./declarations.js";
import { Vector } from "./vector.js";

class Plane implements Thing {
  private _norm: XYZ;

  offset: number;

  surface: Surface;

  constructor(norm: XYZ, offset: number, surface: Surface) {
    this._norm = norm;
    this.offset = offset;
    this.surface = surface;
  }

  normal(this: Plane, _pos: XYZ): XYZ {
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
