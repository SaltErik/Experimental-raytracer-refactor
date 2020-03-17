import { XYZ } from "./declarations";

 /** Houses all methods for operating on objects carrying height-, width-, and depth-information.
 *
 * Not to be confused with the `XYZ` interface, which specifies the type of object this class operates on. */
class Vector {
  constructor() {
    throw new TypeError(`${this.constructor.name} cannot be instantiated!`);
  }

  static times(k: number, vector: XYZ): XYZ {
    return {
      x: k * vector.x,
      y: k * vector.y,
      z: k * vector.z,
    } as XYZ;
  }

  static minus(first: XYZ, second: XYZ): XYZ {
    return {
      x: first.x - second.x,
      y: first.y - second.y,
      z: first.z - second.z,
    } as XYZ;
  }

  static plus(first: XYZ, second: XYZ): XYZ {
    return {
      x: first.x + second.x,
      y: first.y + second.y,
      z: first.z + second.z,
    } as XYZ;
  }

  static dotProduct(first: XYZ, second: XYZ): number {
    const x = first.x * second.x;
    const y = first.y * second.y;
    const z = first.z * second.z;
    return x + y + z;
  }

  static magnitude(vector: XYZ): number {
    const x = vector.x * vector.x;
    const y = vector.y * vector.y;
    const z = vector.z * vector.z;
    return Math.sqrt(x + y + z);
  }

  static normal(vector: XYZ): XYZ {
    const magnitude = Vector.magnitude(vector);
    const div = !magnitude ? Infinity : 1.0 / magnitude;
    return Vector.times(div, vector);
  }

  static crossProduct(first: XYZ, second: XYZ): XYZ {
    return {
      x: first.y * second.z - first.z * second.y,
      y: first.z * second.x - first.x * second.z,
      z: first.x * second.y - first.y * second.x,
    } as XYZ;
  }
}

export { Vector };
