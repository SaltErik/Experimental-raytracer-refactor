import { Color } from "./color.js";
import { Surface } from "./declarations.js";
import { Vector } from "./vector.js";

const Surfaces = {
  shiny: {
    diffuse(position: Vector) {
      return Color.white;
    },

    specular(position: Vector) {
      return Color.grey;
    },

    reflect(position: Vector) {
      return 0.7;
    },

    roughness: 250,
  } as Surface,

  checkerboard: {
    diffuse(position: Vector) {
      if ((Math.floor(position.z) + Math.floor(position.x)) % 2 !== 0) {
        return Color.white;
      } else {
        return Color.black;
      }
    },

    specular(position: Vector) {
      return Color.white;
    },

    reflect(position: Vector) {
      if ((Math.floor(position.z) + Math.floor(position.x)) % 2 !== 0) {
        return 0.1;
      } else {
        return 0.7;
      }
    },

    roughness: 150,
  } as Surface,
};

export { Surfaces };
