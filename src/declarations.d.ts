import { Vector } from "./vector.js";

export interface InitialRay {
  start: Vector;
  direction: Vector | null;
}

export interface Ray {
  start: Vector;
  direction: Vector;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Intersection {
  thing: Thing;
  ray: Ray;
  distance: number;
}

export interface Surface {
  diffuse: (pos: Vector) => RGB;
  specular: RGB;
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
  color: RGB;
}
