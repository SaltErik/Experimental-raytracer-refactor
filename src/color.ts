import { RGB } from "./declarations";

/** Houses all methods for operating on objects carrying red-, green- and blue-color information.
 *
 * Not to be confused with the `RGB` interface, which specifies the type of object this class operates on. */
class Color {
  static white: RGB = [
    1,
    1,
    1,
  ];

  static grey: RGB = [
    0.5,
    0.5,
    0.5,
  ];

  static black: RGB = [
    0,
    0,
    0,
  ];

  static red: RGB = [
    1,
    0,
    0,
  ];

  static green: RGB = [
    0,
    1,
    0,
  ];

  static blue: RGB = [
    0,
    0,
    1,
  ];

  static backgroundColor = Color.black;

  static defaultColor = Color.black;

  private constructor() {}

  static scale(k: number, color: RGB): RGB {
    return [
      k * color[0],
      k * color[1],
      k * color[2],
    ] as RGB;
  }

  static plus(first: RGB, second: RGB): RGB {
    return [
      first[0] + second[0],
      first[1] + second[1],
      first[2] + second[2],
    ] as RGB;
  }

  static times(first: RGB, second: RGB): RGB {
    return [
      first[0] * second[0],
      first[1] * second[1],
      first[2] * second[2],
    ] as RGB;
  }

  static legalize(d: number): number {
    return d > 1 ? 1 : d;
  }

  static toDrawingColor(color: RGB): RGB {
    return [
      Math.floor(Color.legalize(color[0]) * 255),
      Math.floor(Color.legalize(color[1]) * 255),
      Math.floor(Color.legalize(color[2]) * 255),
    ] as RGB;
  }
}

export { Color };
