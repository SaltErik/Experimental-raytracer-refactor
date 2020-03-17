import { Camera } from "./camera.js";
import { Color } from "./color.js";
import { Vector } from "./vector.js";

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
  specular: (pos: Vector) => Color;
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

export interface Scene {
  things: Thing[];
  lights: Light[];
  camera: Camera;
}
