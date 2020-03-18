class Vector {
    constructor() { }
    static times(k, vector) {
        return {
            x: k * vector.x,
            y: k * vector.y,
            z: k * vector.z,
        };
    }
    static minus(first, second) {
        return {
            x: first.x - second.x,
            y: first.y - second.y,
            z: first.z - second.z,
        };
    }
    static plus(first, second) {
        return {
            x: first.x + second.x,
            y: first.y + second.y,
            z: first.z + second.z,
        };
    }
    static dotProduct(first, second) {
        const x = first.x * second.x;
        const y = first.y * second.y;
        const z = first.z * second.z;
        return x + y + z;
    }
    static magnitude(vector) {
        const x = vector.x * vector.x;
        const y = vector.y * vector.y;
        const z = vector.z * vector.z;
        return Math.sqrt(x + y + z);
    }
    static normal(vector) {
        const magnitude = Vector.magnitude(vector);
        const div = !magnitude ? Infinity : 1.0 / magnitude;
        return Vector.times(div, vector);
    }
    static crossProduct(first, second) {
        return {
            x: first.y * second.z - first.z * second.y,
            y: first.z * second.x - first.x * second.z,
            z: first.x * second.y - first.y * second.x,
        };
    }
}
export { Vector };
