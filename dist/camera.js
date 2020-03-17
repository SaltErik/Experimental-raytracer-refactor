import { Vector } from "./vector.js";
class Camera {
    position;
    lookAt;
    down = {
        x: 0.0,
        y: -1.0,
        z: 0.0,
    };
    forward;
    right;
    up;
    constructor(position, lookAt) {
        this.position = position;
        this.lookAt = lookAt;
        this.forward = Vector.normal(Vector.minus(this.lookAt, this.position));
        this.right = Vector.times(1.5, Vector.normal(Vector.crossProduct(this.forward, this.down)));
        this.up = Vector.times(1.5, Vector.normal(Vector.crossProduct(this.forward, this.right)));
    }
}
export { Camera };
