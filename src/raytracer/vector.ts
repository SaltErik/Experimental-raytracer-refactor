class Vector {
  x: number = 0;

  y: number = 0;

  z: number = 0;

  /** In practice: length.
   *
   * (But the property name "length" was already taken in JS, so...) */
  get magnitude(this: Vector): number {
    const x: number = this.x * this.x;
    const y: number = this.y * this.y;
    const z: number = this.z * this.z;

    return Math.sqrt(x + y + z);
  }

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static minus(first: Vector, second: Vector): Vector {
    const x: number = first.x - second.x;
    const y: number = first.y - second.y;
    const z: number = first.z - second.z;

    return new Vector(x, y, z);
  }

  static plus(first: Vector, second: Vector): Vector {
    const x: number = first.x + second.x;
    const y: number = first.y + second.y;
    const z: number = first.z + second.z;

    return new Vector(x, y, z);
  }

  static dotProduct(first: Vector, second: Vector): number {
    const x: number = first.x * second.x;
    const y: number = first.y * second.y;
    const z: number = first.z * second.z;

    return x + y + z;
  }

  static normalize(vector: Vector): Vector {
    const div: number = !vector.magnitude ? Infinity : 1.0 / vector.magnitude;

    return Vector.times(div, vector);
  }

  static crossProduct(first: Vector, second: Vector): Vector {
    const x: number = first.y * second.z - first.z * second.y;
    const y: number = first.z * second.x - first.x * second.z;
    const z: number = first.x * second.y - first.y * second.x;

    return new Vector(x, y, z);
  }

  static times(k: number, vector: Vector): Vector {
    const x: number = k * vector.x;
    const y: number = k * vector.y;
    const z: number = k * vector.z;

    return new Vector(x, y, z);
  }
}

export { Vector };
