import { Intersection } from "./intersection.js";
import { Ray } from "./ray.js";
import { Surface } from "./surface.js";
import { Thing } from "./thing.js";
import { Vector } from "./vector.js";

class Sphere extends Thing {
  center: Vector;

  radius: number;

  get radiusSquared(this: Sphere): number {
    return this.radius * this.radius;
  }

  surface: Surface;

  constructor(center: Vector, radius: number, surface: Surface) {
    super(center, radius, surface);
    this.center = center;
    this.radius = radius;
    this.surface = surface;
  }

  normal(this: Sphere, position: Vector): Vector {
    return Vector.normalize(Vector.minus(position, this.center));
  }

  intersect(this: Sphere, ray: Ray): Intersection | null {
    const eo = Vector.minus(this.center, ray.start);

    const vector = Vector.dotProduct(eo, ray.direction);

    let distance = 0;

    if (vector >= 0) {
      const disc = this.radiusSquared - (Vector.dotProduct(eo, eo) - vector * vector);

      if (disc >= 0) {
        distance = vector - Math.sqrt(disc);
      }
    }

    if (distance === 0) return null;

    return new Intersection(this, ray, distance);
  }
}

export { Sphere };
