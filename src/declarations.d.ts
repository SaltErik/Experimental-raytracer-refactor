/** Denotes a `Ray` of light. */
export interface Ray {
  start: XYZ;
  direction: XYZ;
}

/** Denotes a value object carrying red-, green- and blue-color information.
 *
 * Not to be confused with the `Color` class, which holds all methods for operating on `RGB` objects. */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/** Denotes an intersection between a `Thing` and a `Ray` of light. */
export interface Intersection {
  thing: Thing;
  ray: Ray;
  distance: number;
}

/** Denotes the surface of a physical object. */
export interface Surface {
  specular: RGB;
  roughness: number;
  diffuse: (pos: XYZ) => RGB;
  reflect: (pos: XYZ) => number;
}

/** Denotes a physical object. */
export interface Thing {
  surface: Surface;
  intersect: (ray: Ray) => Intersection | null;
  normal: (pos: XYZ) => XYZ;
}

/** Denotes an anonymous value object carrying height-, width-, and depth-information.
 *
 * Not to be confused with the `Vector` class, which holds all methods for operating on `XYZ` objects. */
export interface XYZ {
  x: number;
  y: number;
  z: number;
}
