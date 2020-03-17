import { Color } from "./color.js";
import { Surface } from "./declarations.js";
import { Vector } from "./vector.js";

class Checkerboard implements Surface {
  roughness = 150;

  specular = Color.white;

  constructor() {}

  private _isEven(this: Checkerboard, z: number, x: number): boolean {
    return (Math.floor(z) + Math.floor(x)) % 2 !== 0;
  }

  diffuse(this: Checkerboard, position: Vector): Color {
    return this._isEven(position.z, position.x) ? Color.white : Color.black;
  }

  reflect(this: Checkerboard, position: Vector): number {
    return this._isEven(position.z, position.x) ? 0.1 : 0.7;
  }
}

export { Checkerboard };
