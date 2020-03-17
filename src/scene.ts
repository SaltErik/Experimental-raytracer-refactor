import { Camera } from "./camera.js";
import { Light, Thing } from "./declarations.js";

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
