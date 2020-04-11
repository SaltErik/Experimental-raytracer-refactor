import { XYZ } from "../../typings/declarations";

 /** Houses all methods for operating on objects carrying height-, width-, and depth-information.
 *
 * Not to be confused with the `XYZ` interface, which specifies the type of object this class operates on. */
class Vector {
  private constructor() {}

  static times(k: number, vector: XYZ): XYZ {
    return [
      k * vector[0],
      k * vector[1],
      k * vector[2],
    ] as XYZ;
  }

  static minus(first: XYZ, second: XYZ): XYZ {
    return [
      first[0] - second[0],
      first[1] - second[1],
      first[2] - second[2],
    ] as XYZ;
  }

  static plus(first: XYZ, second: XYZ): XYZ {
    return [
      first[0] + second[0],
      first[1] + second[1],
      first[2] + second[2],
    ] as XYZ;
  }

  static dotProduct(first: XYZ, second: XYZ): number {
    const x = first[0] * second[0];
    const y = first[1] * second[1];
    const z = first[2] * second[2];
    return x + y + z;
  }

  /** Magnitude is (in practice) the length of the vector. */
  static magnitude(vector: XYZ): number {
    const x = vector[0] * vector[0];
    const y = vector[1] * vector[1];
    const z = vector[2] * vector[2];
    return Math.sqrt(x + y + z);
  }

  static normal(vector: XYZ): XYZ {
    const magnitude = Vector.magnitude(vector);
    const div = !magnitude ? Infinity : 1 / magnitude;
    return Vector.times(div, vector);
  }

  static crossProduct(first: XYZ, second: XYZ): XYZ {
    return [
      first[1] * second[2] - first[2] * second[1],
      first[2] * second[0] - first[0] * second[2],
      first[0] * second[1] - first[1] * second[0],
    ] as XYZ;
  }
}

export { Vector };
