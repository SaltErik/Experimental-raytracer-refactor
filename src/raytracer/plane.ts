import { Intersection } from "./intersection.js";
import { Ray } from "./ray.js";
import { Surface } from "./surface.js";
import { Thing } from "./thing.js";
import { Vector } from "./vector.js";

class Plane extends Thing {
  private _normal: Vector;

  surface: Surface;

  offset: number;

  constructor(normal: Vector, offset: number, surface: Surface) {
    super(normal, offset, surface);
    this._normal = normal;
    this.offset = offset;
    this.surface = surface;
  }

  normal(this: Plane): Vector {
    return this._normal;
  }

  intersect(this: Plane, ray: Ray): Intersection | null {
    const denormalized = Vector.dotProduct(this.normal(), ray.direction);

    if (denormalized > 0) return null;

    const distance = (Vector.dotProduct(this.normal(), ray.start) + this.offset) / -denormalized;

    return new Intersection(this, ray, distance);
  }
}

export { Plane };
