import { Color } from "./color.js";
class Checkerboard {
    roughness = 150;
    specular = Color.white;
    constructor() { }
    _isEven(z, x) {
        return (Math.floor(z) + Math.floor(x)) % 2 !== 0;
    }
    diffuse(position) {
        if (this._isEven(position.z, position.x)) {
            return Color.white;
        }
        else {
            return Color.black;
        }
    }
    reflect(position) {
        if (this._isEven(position.z, position.x)) {
            return 0.1;
        }
        else {
            return 0.7;
        }
    }
}
export { Checkerboard };
