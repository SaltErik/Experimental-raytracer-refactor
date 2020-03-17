class Vector {
  x: number;

  y: number;

  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static times(k: number, vector: Vector): Vector {
    const x = k * vector.x;
    const y = k * vector.y;
    const z = k * vector.z;
    return new Vector(x, y, z);
  }

  static minus(first: Vector, second: Vector): Vector {
    const x = first.x - second.x;
    const y = first.y - second.y;
    const z = first.z - second.z;
    return new Vector(x, y, z);
  }

  static plus(first: Vector, second: Vector): Vector {
    const x = first.x + second.x;
    const y = first.y + second.y;
    const z = first.z + second.z;
    return new Vector(x, y, z);
  }

  static dotProduct(first: Vector, second: Vector): number {
    const x = first.x * second.x;
    const y = first.y * second.y;
    const z = first.z * second.z;
    return x + y + z;
  }

  static magnitude(vector: Vector): number {
    const x = vector.x * vector.x;
    const y = vector.y * vector.y;
    const z = vector.z * vector.z;
    return Math.sqrt(x + y + z);
  }

  static normal(vector: Vector): Vector {
    const magnitude = Vector.magnitude(vector);
    const div = !magnitude ? Infinity : 1.0 / magnitude;
    return Vector.times(div, vector);
  }

  static crossProduct(first: Vector, second: Vector) {
    const x = first.y * second.z - first.z * second.y;
    const y = first.z * second.x - first.x * second.z;
    const z = first.x * second.y - first.y * second.x;
    return new Vector(x, y, z);
  }
}

export { Vector };
