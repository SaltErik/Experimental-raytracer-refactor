"use strict";
import { Vector } from "../maths/vector.js";
class Plane {
    _normal;
    offset;
    surface;
    constructor(normal, offset, surface) {
        this._normal = normal;
        this.offset = offset;
        this.surface = surface;
    }
    normal(_pos) {
        return this._normal;
    }
    intersect(ray) {
        const denom = Vector.dotProduct(this._normal, ray.direction);
        if (denom > 0)
            return null;
        const distance = (Vector.dotProduct(this._normal, ray.start) + this.offset) / -denom;
        return {
            thing: this,
            ray,
            distance,
        };
    }
}
export { Plane };
