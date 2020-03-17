import { Vector } from "./vector.js";
class Camera {
    pos;
    forward;
    right;
    up;
    constructor(pos, lookAt) {
        this.pos = pos;
        const down = new Vector(0.0, -1.0, 0.0);
        this.forward = Vector.normal(Vector.minus(lookAt, this.pos));
        this.right = Vector.times(1.5, Vector.normal(Vector.cross(this.forward, down)));
        this.up = Vector.times(1.5, Vector.normal(Vector.cross(this.forward, this.right)));
    }
}
export { Camera };
