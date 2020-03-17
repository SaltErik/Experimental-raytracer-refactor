import { Color } from "./color.js";
const Surfaces = {
    shiny: {
        diffuse(pos) {
            return Color.white;
        },
        specular(pos) {
            return Color.grey;
        },
        reflect(pos) {
            return 0.7;
        },
        roughness: 250,
    },
    checkerboard: {
        diffuse(pos) {
            if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
                return Color.white;
            }
            else {
                return Color.black;
            }
        },
        specular(pos) {
            return Color.white;
        },
        reflect(pos) {
            if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
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
