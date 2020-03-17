class Color {
  r: number;

  g: number;

  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static scale(k: number, color: Color) {
    return new Color(k * color.r, k * color.g, k * color.b);
  }

  static plus(first: Color, second: Color) {
    return new Color(first.r + second.r, first.g + second.g, first.b + second.b);
  }

  static times(first: Color, second: Color) {
    return new Color(first.r * second.r, first.g * second.g, first.b * second.b);
  }

  static white = new Color(1.0, 1.0, 1.0);

  static grey = new Color(0.5, 0.5, 0.5);

  static black = new Color(0.0, 0.0, 0.0);

  static background = Color.black;

  static defaultColor = Color.black;

  static legalize(d: number) {
    return d > 1 ? 1 : d;
  }

  static toDrawingColor(color: Color) {
    const r: number = Math.floor(Color.legalize(color.r) * 255);
    const g: number = Math.floor(Color.legalize(color.g) * 255);
    const b: number = Math.floor(Color.legalize(color.b) * 255);
    return new Color(r, g, b);
  }
}

export { Color };
