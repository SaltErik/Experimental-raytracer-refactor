export interface InitialRay {
  start: XYZ;
  direction: XYZ | null;
}

export interface Ray {
  start: XYZ;
  direction: XYZ;
}

/** Denotes an anonymous value object carrying color information.
 *
 * Not to be confused with the `Color` class, which holds all methods for operating on `RGB` objects. */
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
  diffuse: (pos: XYZ) => RGB;
  specular: RGB;
  reflect: (pos: XYZ) => number;
  roughness: number;
}

export interface Thing {
  intersect: (ray: Ray) => Intersection | null;
  normal: (pos: XYZ) => XYZ;
  surface: Surface;
}

export interface XYZ {
  x: number;
  y: number;
  z: number;
}
