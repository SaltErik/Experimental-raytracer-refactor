import { Color } from "./color.js";
import { Surface } from "./declarations.js";
import { Vector } from "./vector.js";

const Surfaces = {
  shiny: {
    diffuse(pos: Vector) {
      return Color.white;
    },

    specular(pos: Vector) {
      return Color.grey;
    },

    reflect(pos: Vector) {
      return 0.7;
    },

    roughness: 250,
  } as Surface,

  checkerboard: {
    diffuse(pos: Vector) {
      if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
        return Color.white;
      } else {
        return Color.black;
      }
    },

    specular(pos: Vector) {
      return Color.white;
    },

    reflect(pos: Vector) {
      if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
        return 0.1;
      } else {
        return 0.7;
      }
    },

    roughness: 150,
  } as Surface,
};

export { Surfaces };
