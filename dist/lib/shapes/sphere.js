"use strict";
import { Vector } from "../maths/vector.js";
class Sphere {
    center;
    radius;
    radiusSquared;
    surface;
    constructor(center, radius, surface) {
        this.center = center;
        this.radius = radius;
        this.surface = surface;
        this.radiusSquared = radius * radius;
    }
    normal(pos) {
        return Vector.normal(Vector.minus(pos, this.center));
    }
    intersect(ray) {
        const eo = Vector.minus(this.center, ray.start);
        const value = Vector.dotProduct(eo, ray.direction);
        let distance = 0;
        if (value >= 0) {
            const disc = this.radiusSquared - (Vector.dotProduct(eo, eo) - value * value);
            if (disc >= 0) {
                distance = value - Math.sqrt(disc);
            }
        }
        if (!distance)
            return null;
        return {
            thing: this,
            ray,
            distance,
        };
    }
}
export { Sphere };
