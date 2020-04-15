"use strict";
class Color {
    static white = [1, 1, 1];
    static grey = [0.5, 0.5, 0.5];
    static black = [0, 0, 0];
    static red = [1, 0, 0];
    static green = [0, 1, 0];
    static blue = [0, 0, 1];
    static backgroundColor = Color.black;
    static defaultColor = Color.black;
    constructor() { }
    static scale(k, color) {
        return [
            k * color[0],
            k * color[1],
            k * color[2],
        ];
    }
    static plus(first, second) {
        return [
            first[0] + second[0],
            first[1] + second[1],
            first[2] + second[2],
        ];
    }
    static times(first, second) {
        return [
            first[0] * second[0],
            first[1] * second[1],
            first[2] * second[2],
        ];
    }
    static legalize(d) {
        return d > 1 ? 1 : d;
    }
    static toDrawingColor(color) {
        return [
            ~~(Color.legalize(color[0]) * 255),
            ~~(Color.legalize(color[1]) * 255),
            ~~(Color.legalize(color[2]) * 255),
        ];
    }
}
export { Color };
