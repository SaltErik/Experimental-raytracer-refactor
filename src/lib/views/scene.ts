import { Thing } from "../../typings/declarations";
import { Light } from "../rays/light.js";
import { Camera } from "../room/camera.js";

class Scene {
  things: Thing[];

  lights: Light[];

  camera: Camera;

  constructor(things: Thing[], lights: Light[], camera: Camera) {
    this.things = things;
    this.lights = lights;
    this.camera = camera;
  }
}

export { Scene };
