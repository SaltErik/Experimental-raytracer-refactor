import { Color } from "./color.js";
class Shiny {
    roughness = 250;
    specular = Color.grey;
    constructor() {
        this.diffuse = this.diffuse.bind(this);
        this.reflect = this.reflect.bind(this);
    }
    diffuse(_position) {
        return Color.white;
    }
    reflect(_position) {
        return 0.7;
    }
}
export { Shiny };
