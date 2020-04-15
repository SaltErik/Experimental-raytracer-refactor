"use strict";
import { Color } from "../rays/color.js";
class Shiny {
    roughness = 250;
    specular = Color.grey;
    constructor() { }
    diffuse(_position) {
        return Color.white;
    }
    reflect(_position) {
        return 0.7;
    }
}
export { Shiny };
