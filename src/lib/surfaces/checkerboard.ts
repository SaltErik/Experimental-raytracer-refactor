import { RGB, Surface, XYZ } from "../../typings/declarations.js";
import { Color } from "../rays/color.js";

class Checkerboard implements Surface {
  roughness = 150;

  specular = Color.white;

  constructor() {}

  diffuse(this: Checkerboard, position: XYZ): RGB {
    return this._isEven(position[2], position[0]) ? Color.white : Color.black;
  }

  reflect(this: Checkerboard, position: XYZ): number {
    return this._isEven(position[2], position[0]) ? 0.1 : 0.7;
  }

  /** This function is awaiting a more reasonable name. */
  private _isEven(this: Checkerboard, z: number, x: number): boolean {
    return (Math.floor(z) + Math.floor(x)) % 2 !== 0;
  }
}

export { Checkerboard };