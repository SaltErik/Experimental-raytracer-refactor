import { Color } from "./color.js";
import { RGB, Surface, XYZ } from "./declarations.js";

class Checkerboard implements Surface {
  roughness = 150;

  specular = Color.white;

  constructor() {
    this.diffuse = this.diffuse.bind(this);
    this.reflect = this.reflect.bind(this);
    this._isEven = this._isEven.bind(this);
  }

  diffuse(this: Checkerboard, position: XYZ): RGB {
    return this._isEven(position.z, position.x) ? Color.white : Color.black;
  }

  reflect(this: Checkerboard, position: XYZ): number {
    return this._isEven(position.z, position.x) ? 0.1 : 0.7;
  }

  private _isEven(this: Checkerboard, z: number, x: number): boolean {
    return (Math.floor(z) + Math.floor(x)) % 2 !== 0;
  }
}

export { Checkerboard };
