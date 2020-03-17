import { Vector } from "./vector.js";
class Sphere {
    center;
    radius;
    surface;
    radiusSquared;
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
        const v = Vector.dotProduct(eo, ray.direction);
        let distance = 0;
        if (v >= 0) {
            const disc = this.radiusSquared - (Vector.dotProduct(eo, eo) - v * v);
            if (disc >= 0) {
                distance = v - Math.sqrt(disc);
            }
        }
        if (distance === 0)
            return null;
        return {
            thing: this,
            ray,
            distance,
        };
    }
}
export { Sphere };
