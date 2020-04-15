"use strict";
import { RGB, Surface, XYZ } from "../../typings/declarations";
import { Color } from "../rays/color.js";

class Checkerboard implements Surface {
  roughness = 150;

  specular = Color.white;

  constructor() {}

  diffuse(this: Checkerboard, position: XYZ): RGB {
    return this._isOdd(position[2], position[0]) ? Color.white : Color.black;
  }

  reflect(this: Checkerboard, position: XYZ): number {
    return this._isOdd(position[2], position[0]) ? 0.1 : 0.7;
  }

  private _isOdd(this: Checkerboard, z: number, x: number): boolean {
    // `~~foo` is just a faster `Math.floor(foo)`.
    const sum = ~~z + ~~x;
    // `(foo & 1) === 1` is just a faster `foo % 2 !== 0`;
    return (sum & 1) === 1;
  }
}

export { Checkerboard };
