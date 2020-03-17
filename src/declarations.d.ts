import { Color } from "./color.js";
import { Vector } from "./vector.js";

export interface VeryFirstRay {
  start: Vector;
  direction: Vector | null;
}

export interface Ray {
  start: Vector;
  direction: Vector;
}

export interface Intersection {
  thing: Thing;
  ray: Ray;
  distance: number;
}

export interface Surface {
  diffuse: (pos: Vector) => Color;
  specular: Color;
  reflect: (pos: Vector) => number;
  roughness: number;
}

export interface Thing {
  intersect: (ray: Ray) => Intersection | null;
  normal: (pos: Vector) => Vector;
  surface: Surface;
}

export interface Light {
  position: Vector;
  color: Color;
}
