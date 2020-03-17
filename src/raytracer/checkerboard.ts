import { Color } from "./color.js";
import { Surface } from "./surface.js";
import { Vector } from "./vector.js";

class Checkerboard extends Surface {
  specularColor = Color.white;

  darkSquareColor = Color.black;

  lightSquareColor = Color.white;

  constructor() {
    super();
  }

  specular(this: Checkerboard) {
    return this.specularColor;
  }

  diffuse(this: Checkerboard, position: Vector): Color {
    return this._mysteryTest(position) ? this.lightSquareColor : this.darkSquareColor;
  }
}

export { Checkerboard };
