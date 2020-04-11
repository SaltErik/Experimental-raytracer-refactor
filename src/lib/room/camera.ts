import { XYZ } from "../../typings/declarations";
import { Vector } from "../maths/vector.js";

class Camera {
  position: XYZ;

  lookAt: XYZ;

  down: XYZ = [0, -1, 0];

  forward: XYZ;

  right: XYZ;

  up: XYZ;

  constructor(position: XYZ, lookAt: XYZ) {
    this.position = position;
    this.lookAt = lookAt;
    this.forward = Vector.normal(Vector.minus(this.lookAt, this.position));
    this.right = Vector.times(1.5, Vector.normal(Vector.crossProduct(this.forward, this.down)));
    this.up = Vector.times(1.5, Vector.normal(Vector.crossProduct(this.forward, this.right)));
  }
}

export { Camera };
