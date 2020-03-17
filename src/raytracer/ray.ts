import { Vector } from "./vector.js";

class Ray {
  start: Vector;

  direction: Vector;

  constructor(start: Vector, direction: Vector) {
    this.start = start;
    this.direction = direction;
  }
}

export { Ray };
