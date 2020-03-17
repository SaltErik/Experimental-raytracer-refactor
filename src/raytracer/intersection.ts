import { Ray } from "./ray.js";
import { Thing } from "./thing.js";

class Intersection {
  thing: Thing;

  ray: Ray;

  distance: number;

  constructor(thing: Thing, ray: Ray, distance: number) {
    this.thing = thing;
    this.ray = ray;
    this.distance = distance;
  }
}

export { Intersection };
