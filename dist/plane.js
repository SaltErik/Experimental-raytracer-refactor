import { Vector } from "./vector.js";
class Plane {
    _norm;
    offset;
    surface;
    constructor(norm, offset, surface) {
        this._norm = norm;
        this.offset = offset;
        this.surface = surface;
    }
    normal(pos) {
        return this._norm;
    }
    intersect(ray) {
        const denom = Vector.dotProduct(this._norm, ray.direction);
        if (denom > 0)
            return null;
        const distance = (Vector.dotProduct(this._norm, ray.start) + this.offset) / -denom;
        return {
            thing: this,
            ray,
            distance,
        };
    }
}
export { Plane };
