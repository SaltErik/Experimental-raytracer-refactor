import { Color } from "./color.js";
import { Vector } from "./vector.js";

class Light {
  position: Vector;

  color: Color;

  constructor(position: Vector, color: Color) {
    this.position = position;
    this.color = color;
  }
}

export { Light };
