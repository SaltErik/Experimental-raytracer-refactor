import { Color } from "./color.js";
const Surfaces = {
    shiny: {
        diffuse(position) {
            return Color.white;
        },
        specular(position) {
            return Color.grey;
        },
        reflect(position) {
            return 0.7;
        },
        roughness: 250,
    },
    checkerboard: {
        diffuse(position) {
            if ((Math.floor(position.z) + Math.floor(position.x)) % 2 !== 0) {
                return Color.white;
            }
            else {
                return Color.black;
            }
        },
        specular(position) {
            return Color.white;
        },
        reflect(position) {
            if ((Math.floor(position.z) + Math.floor(position.x)) % 2 !== 0) {
                return 0.1;
            }
            else {
                return 0.7;
            }
        },
        roughness: 150,
    },
};
export { Surfaces };
