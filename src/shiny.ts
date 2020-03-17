import { Color } from "./color.js";
import { Surface } from "./declarations.js";
import { Vector } from "./vector.js";

class Shiny implements Surface {
  roughness: number = 250;

  specular: Color = Color.grey;

  constructor() {}

  diffuse(this: Shiny, position: Vector): Color {
    return Color.white;
  }

  reflect(this: Shiny, position: Vector): number {
    return 0.7;
  }
}

export { Shiny };
