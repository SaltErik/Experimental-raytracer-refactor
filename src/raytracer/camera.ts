import { Vector } from "./vector.js";

class Camera {
  position: Vector;

  lookAt: Vector;

  down: Vector = new Vector(0.0, -1.0, 0.0);

  forward: Vector;

  right: Vector;

  up: Vector;

  constructor(position: Vector, lookAt: Vector) {
    this.position = position;
    this.lookAt = lookAt;
    this.forward = Vector.normalize(Vector.minus(this.lookAt, this.position));
    this.right = Vector.times(1.5, Vector.normalize(Vector.crossProduct(this.forward, this.down)));
    this.up = Vector.times(1.5, Vector.normalize(Vector.crossProduct(this.forward, this.right)));
  }
}

export { Camera };
