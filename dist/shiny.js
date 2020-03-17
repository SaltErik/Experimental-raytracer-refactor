import { Color } from "./color.js";
class Shiny {
    roughness = 250;
    specular = Color.grey;
    constructor() { }
    diffuse(position) {
        return Color.white;
    }
    reflect(position) {
        return 0.7;
    }
}
export { Shiny };
