class Color {
    static white = {
        r: 1,
        g: 1,
        b: 1,
    };
    static grey = {
        r: 0.5,
        g: 0.5,
        b: 0.5,
    };
    static black = {
        r: 0,
        g: 0,
        b: 0,
    };
    static red = {
        r: 1,
        g: 0,
        b: 0,
    };
    static green = {
        r: 0,
        g: 1,
        b: 0,
    };
    static blue = {
        r: 0,
        g: 0,
        b: 1,
    };
    static backgroundColor = Color.black;
    static defaultColor = Color.black;
    constructor() { }
    static scale(k, color) {
        return {
            r: k * color.r,
            g: k * color.g,
            b: k * color.b,
        };
    }
    static plus(first, second) {
        return {
            r: first.r + second.r,
            g: first.g + second.g,
            b: first.b + second.b,
        };
    }
    static times(first, second) {
        return {
            r: first.r * second.r,
            g: first.g * second.g,
            b: first.b * second.b,
        };
    }
    static legalize(d) {
        return d > 1 ? 1 : d;
    }
    static toDrawingColor(color) {
        return {
            r: Math.floor(Color.legalize(color.r) * 255),
            g: Math.floor(Color.legalize(color.g) * 255),
            b: Math.floor(Color.legalize(color.b) * 255),
        };
    }
}
export { Color };
