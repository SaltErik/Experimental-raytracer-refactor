class Color {
    r;
    g;
    b;
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    static scale(k, v) {
        return new Color(k * v.r, k * v.g, k * v.b);
    }
    static plus(v1, v2) {
        return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b);
    }
    static times(v1, v2) {
        return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b);
    }
    static white = new Color(1.0, 1.0, 1.0);
    static grey = new Color(0.5, 0.5, 0.5);
    static black = new Color(0.0, 0.0, 0.0);
    static background = Color.black;
    static defaultColor = Color.black;
    static toDrawingColor(c) {
        const legalize = (d) => (d > 1 ? 1 : d);
        return {
            r: Math.floor(legalize(c.r) * 255),
            g: Math.floor(legalize(c.g) * 255),
            b: Math.floor(legalize(c.b) * 255),
        };
    }
}
export { Color };
