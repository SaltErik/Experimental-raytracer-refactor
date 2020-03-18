import { RGB } from "./declarations";

/** Houses all methods for operating on objects carrying red-, green- and blue-color information.
 *
 * Not to be confused with the `RGB` interface, which specifies the type of object this class operates on. */
class Color {
  static white: RGB = {
    r: 1.0,
    g: 1.0,
    b: 1.0,
  };

  static grey: RGB = {
    r: 0.5,
    g: 0.5,
    b: 0.5,
  };

  static black: RGB = {
    r: 0.0,
    g: 0.0,
    b: 0.0,
  };

  static red: RGB = {
    r: 1.0,
    g: 0.0,
    b: 0.0,
  };

  static green: RGB = {
    r: 0.0,
    g: 1.0,
    b: 0.0,
  };

  static blue: RGB = {
    r: 0.0,
    g: 0.0,
    b: 1.0,
  };

  static backgroundColor = Color.black;

  static defaultColor = Color.black;

  constructor() {
    throw new TypeError(`${this.constructor.name} cannot be instantiated!`);
  }

  static scale(k: number, color: RGB): RGB {
    return {
      r: k * color.r,
      g: k * color.g,
      b: k * color.b,
    } as RGB;
  }

  static plus(first: RGB, second: RGB): RGB {
    return {
      r: first.r + second.r,
      g: first.g + second.g,
      b: first.b + second.b,
    } as RGB;
  }

  static times(first: RGB, second: RGB): RGB {
    return {
      r: first.r * second.r,
      g: first.g * second.g,
      b: first.b * second.b,
    } as RGB;
  }

  static legalize(d: number): number {
    return d > 1 ? 1 : d;
  }

  static toDrawingColor(color: RGB): RGB {
    return {
      r: Math.floor(Color.legalize(color.r) * 255),
      g: Math.floor(Color.legalize(color.g) * 255),
      b: Math.floor(Color.legalize(color.b) * 255),
    } as RGB;
  }
}

export { Color };
