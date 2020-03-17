class Vector {
    x;
    y;
    z;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static times(k, vector) {
        return new Vector(k * vector.x, k * vector.y, k * vector.z);
    }
    static minus(first, second) {
        return new Vector(first.x - second.x, first.y - second.y, first.z - second.z);
    }
    static plus(first, second) {
        return new Vector(first.x + second.x, first.y + second.y, first.z + second.z);
    }
    static dotProduct(first, second) {
        return first.x * second.x + first.y * second.y + first.z * second.z;
    }
    static magnitude(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    }
    static normal(vector) {
        const magnitude = Vector.magnitude(vector);
        const div = magnitude === 0 ? Infinity : 1.0 / magnitude;
        return Vector.times(div, vector);
    }
    static cross(first, second) {
        return new Vector(first.y * second.z - first.z * second.y, first.z * second.x - first.x * second.z, first.x * second.y - first.y * second.x);
    }
}
export { Vector };
