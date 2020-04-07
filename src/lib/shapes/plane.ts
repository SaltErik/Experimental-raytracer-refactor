import { Intersection, Ray, Surface, Thing, XYZ } from "../../typings/declarations.js";
import { Vector } from "../maths/vector.js";

class Plane implements Thing {
  private _normal: XYZ;

  offset: number;

  surface: Surface;

  constructor(normal: XYZ, offset: number, surface: Surface) {
    this._normal = normal;
    this.offset = offset;
    this.surface = surface;
  }

  normal(this: Plane, _pos: XYZ): XYZ {
    return this._normal;
  }

  intersect(this: Plane, ray: Ray): Intersection | null {
    const denom = Vector.dotProduct(this._normal, ray.direction);

    if (denom > 0) return null;

    const distance = (Vector.dotProduct(this._normal, ray.start) + this.offset) / -denom;

    return {
      thing: this,
      ray,
      distance,
    } as Intersection;
  }
}

export { Plane };
