import { Vector } from "./vector.js";

class Camera {
  public forward: Vector;

  public right: Vector;

  public up: Vector;

  constructor(public pos: Vector, lookAt: Vector) {
    const down = new Vector(0.0, -1.0, 0.0);
    this.forward = Vector.normal(Vector.minus(lookAt, this.pos));
    this.right = Vector.times(1.5, Vector.normal(Vector.cross(this.forward, down)));
    this.up = Vector.times(1.5, Vector.normal(Vector.cross(this.forward, this.right)));
  }
}

export { Camera };
