"use strict";
class Vector {
    constructor() { }
    static times(k, vector) {
        return [
            k * vector[0],
            k * vector[1],
            k * vector[2],
        ];
    }
    static minus(first, second) {
        return [
            first[0] - second[0],
            first[1] - second[1],
            first[2] - second[2],
        ];
    }
    static plus(first, second) {
        return [
            first[0] + second[0],
            first[1] + second[1],
            first[2] + second[2],
        ];
    }
    static dotProduct(first, second) {
        const x = first[0] * second[0];
        const y = first[1] * second[1];
        const z = first[2] * second[2];
        return x + y + z;
    }
    static magnitude(vector) {
        const x = vector[0] * vector[0];
        const y = vector[1] * vector[1];
        const z = vector[2] * vector[2];
        return Math.sqrt(x + y + z);
    }
    static normal(vector) {
        const magnitude = Vector.magnitude(vector);
        const div = !magnitude ? Infinity : 1 / magnitude;
        return Vector.times(div, vector);
    }
    static crossProduct(first, second) {
        return [
            first[1] * second[2] - first[2] * second[1],
            first[2] * second[0] - first[0] * second[2],
            first[0] * second[1] - first[1] * second[0],
        ];
    }
}
export { Vector };
