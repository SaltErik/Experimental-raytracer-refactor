import { Color } from "./color.js";
import { Vector } from "./vector.js";

class Surface {
  readonly roughness = 250;

  readonly diffuseColor = Color.white;

  readonly specularColor = Color.grey;

  readonly reflectivity = 0.7;

  constructor() {}

  specular(this: Surface): Color {
    return this.specularColor;
  }

  diffuse(this: Surface, _position: Vector): Color {
    return this.diffuseColor;
  }

  reflect(this: Surface, position: Vector): number {
    return this._mysteryTest(position) ? 0.1 : this.reflectivity;
  }

  protected _mysteryTest(this: Surface, position: Vector) {
    return (Math.floor(position.z) + Math.floor(position.x)) % 2 !== 0;
  }
}

export { Surface };
