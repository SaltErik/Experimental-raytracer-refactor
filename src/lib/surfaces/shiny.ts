import { RGB, Surface } from "../../typings/declarations";
import { Vector } from "../maths/vector.js";
import { Color } from "../rays/color.js";

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
