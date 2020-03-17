class Color {
  r: number;

  g: number;

  b: number;

  static white = new Color(1.0, 1.0, 1.0);

  static grey = new Color(0.5, 0.5, 0.5);

  static black = new Color(0.0, 0.0, 0.0);

  static red = new Color(1.0, 0.0, 0.0);

  static green = new Color(0.0, 1.0, 0.0);

  static blue = new Color(0.0, 0.0, 1.0);

  static backgroundColor = Color.black;

  static defaultColor = Color.black;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static scale(k: number, color: Color) {
    const r: number = k * color.r;
    const g: number = k * color.g;
    const b: number = k * color.b;
    return new Color(r, g, b);
  }

  static plus(first: Color, second: Color) {
    const r: number = first.r + second.r;
    const g: number = first.g + second.g;
    const b: number = first.b + second.b;
    return new Color(r, g, b);
  }

  static times(first: Color, second: Color) {
    const r: number = first.r * second.r;
    const g: number = first.g * second.g;
    const b: number = first.b * second.b;
    return new Color(r, g, b);
  }

  static legalize(d: number) {
    return d > 1 ? 1 : d;
  }

  static toDrawingColor(color: Color) {
    return {
      r: Math.floor(Color.legalize(color.r) * 255),
      g: Math.floor(Color.legalize(color.g) * 255),
      b: Math.floor(Color.legalize(color.b) * 255),
    };
  }
}

export { Color };
