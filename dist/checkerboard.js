import { Color } from "./color.js";
class Checkerboard {
    roughness = 150;
    specular = Color.white;
    constructor() { }
    _isEven(z, x) {
        return (Math.floor(z) + Math.floor(x)) % 2 !== 0;
    }
    diffuse(position) {
        return this._isEven(position.z, position.x) ? Color.white : Color.black;
    }
    reflect(position) {
        return this._isEven(position.z, position.x) ? 0.1 : 0.7;
    }
}
export { Checkerboard };
