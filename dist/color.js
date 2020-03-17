class Color {
    r;
    g;
    b;
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    static scale(k, color) {
        return new Color(k * color.r, k * color.g, k * color.b);
    }
    static plus(first, second) {
        return new Color(first.r + second.r, first.g + second.g, first.b + second.b);
    }
    static times(first, second) {
        return new Color(first.r * second.r, first.g * second.g, first.b * second.b);
    }
    static white = new Color(1.0, 1.0, 1.0);
    static grey = new Color(0.5, 0.5, 0.5);
    static black = new Color(0.0, 0.0, 0.0);
    static background = Color.black;
    static defaultColor = Color.black;
    static legalize(d) {
        return d > 1 ? 1 : d;
    }
    static toDrawingColor(color) {
        const r = Math.floor(Color.legalize(color.r) * 255);
        const g = Math.floor(Color.legalize(color.g) * 255);
        const b = Math.floor(Color.legalize(color.b) * 255);
        return new Color(r, g, b);
    }
}
export { Color };
