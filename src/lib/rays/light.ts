import { RGB, XYZ } from "../../typings/declarations";

class Light {
  position: XYZ;

  color: RGB;

  constructor(position: XYZ, color: RGB) {
    this.position = position;
    this.color = color;
  }
}

export { Light };
