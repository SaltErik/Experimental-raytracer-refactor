import { Color } from "./color.js";
class Checkerboard {
    roughness = 150;
    constructor() { }
    diffuse(position) {
        if ((Math.floor(position.z) + Math.floor(position.x)) % 2 !== 0) {
            return Color.white;
        }
        else {
            return Color.black;
        }
    }
    specular(position) {
        return Color.white;
    }
    reflect(position) {
        if ((Math.floor(position.z) + Math.floor(position.x)) % 2 !== 0) {
            return 0.1;
        }
        else {
            return 0.7;
        }
    }
}
export { Checkerboard };
