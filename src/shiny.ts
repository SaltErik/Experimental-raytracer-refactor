import { Color } from "./color.js";
import { RGB, Surface } from "./declarations.js";
import { Vector } from "./vector.js";

class Shiny implements Surface {
  roughness = 250;

  specular = Color.grey;

  constructor() {}

  diffuse(this: Shiny, _position: Vector): RGB {
    return Color.white;
  }

  reflect(this: Shiny, _position: Vector): number {
    return 0.7;
  }
}

export { Shiny };
