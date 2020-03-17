import { Camera } from "./camera.js";
import { Color } from "./color.js";
import { Intersection } from "./intersection.js";
import { Light } from "./light.js";
import { Ray } from "./ray.js";
import { Scene } from "./scene.js";
import { Thing } from "./thing.js";
import { Vector } from "./vector.js";

class RayTracer {
  readonly maxDepth = 5;

  readonly screenWidth: number;

  readonly screenHeight: number;

  constructor(width: number, height: number) {
    this.screenWidth = width;
    this.screenHeight = height;
  }

  intersections(this: RayTracer, ray: Ray, scene: Scene): Intersection | null {
    let closest: number = +Infinity;
    let closestIntersection: Intersection | null = null;

    for (let i in scene.things) {
      const intersection = scene.things[i].intersect(ray);
      if (intersection) {
        if (intersection.distance < closest) {
          closestIntersection = intersection;
          closest = intersection.distance;
        }
      }
    }

    return closestIntersection;
  }

  testRay(this: RayTracer, ray: Ray, scene: Scene): number | null {
    const intersection = this.intersections(ray, scene);

    return intersection ? intersection.distance : null;
  }

  traceRay(this: RayTracer, ray: Ray, scene: Scene, depth: number): Color {
    const intersection = this.intersections(ray, scene);

    return intersection ? this.shade(intersection, scene, depth) : Color.backgroundColor;
  }

  shade(this: RayTracer, intersection: Intersection, scene: Scene, depth: number): Color {
    const direction: Vector = intersection.ray.direction;
    const position: Vector = Vector.plus(Vector.times(intersection.distance, direction), intersection.ray.start);
    const normal: Vector = intersection.thing.normal(position);
    const reflectDirection: Vector = Vector.minus(direction, Vector.times(2, Vector.times(Vector.dotProduct(normal, direction), normal)));

    const naturalColor: Color = Color.plus(Color.backgroundColor, this.findNaturalColor(intersection.thing, position, normal, reflectDirection, scene));
    const reflectedColor: Color = depth >= this.maxDepth ? Color.grey : this.findReflectionColor(intersection.thing, position, reflectDirection, scene, depth);

    return Color.plus(naturalColor, reflectedColor);
  }

  findReflectionColor(this: RayTracer, thing: Thing, position: Vector, rd: Vector, scene: Scene, depth: number): Color {
    return Color.scale(thing.surface.reflect(position), this.traceRay(new Ray(position, rd), scene, depth + 1));
  }

  findNaturalColor(this: RayTracer, thing: Thing, position: Vector, normal: Vector, rd: Vector, scene: Scene): Color {
    const addLight = (color: Color, light: Light): Color => {
      const ldis: Vector = Vector.minus(light.position, position);
      const livec: Vector = Vector.normalize(ldis);

      const neatIntersection: number | null = this.testRay({ start: position, direction: livec }, scene);

      const isInShadow: boolean = !neatIntersection ? false : neatIntersection <= ldis.magnitude;

      if (isInShadow) return color;

      const illum: number = Vector.dotProduct(livec, normal);
      const lcolor: Color = illum > 0 ? Color.scale(illum, light.color) : Color.defaultColor;
      const specular: number = Vector.dotProduct(livec, Vector.normalize(rd));
      const scolor: Color = specular > 0 ? Color.scale(Math.pow(specular, thing.surface.roughness), light.color) : Color.defaultColor;
      return Color.plus(color, Color.plus(Color.times(thing.surface.diffuse(position), lcolor), Color.times(thing.surface.specular(), scolor)));
    };

    const naturalColor = scene.lights.reduce(addLight, Color.defaultColor);

    return naturalColor;
  }

  recenterX(this: RayTracer, x: number): number {
    const temp = x - this.screenWidth / 2.0;

    return temp / 2.0 / this.screenWidth;
  }

  recenterY(this: RayTracer, y: number): number {
    const temp = y - this.screenHeight / 2.0;

    return -temp / 2.0 / this.screenHeight;
  }

  findPoint(this: RayTracer, x: number, y: number, camera: Camera): Vector {
    const temp1 = Vector.times(this.recenterX(x), camera.right);
    const temp2 = Vector.times(this.recenterY(y), camera.up);
    const temp3 = Vector.plus(temp1, temp2);
    const temp4 = Vector.plus(camera.forward, temp3);

    return Vector.normalize(temp4);
  }

  render(this: RayTracer, scene: Scene, context: CanvasRenderingContext2D): void {
    for (let y = 0; y < this.screenHeight; y++) {
      for (let x = 0; x < this.screenWidth; x++) {
        const ray: Ray = new Ray(scene.camera.position, this.findPoint(x, y, scene.camera));
        const color: Color = this.traceRay(ray, scene, 0);
        const c: Color = Color.toDrawingColor(color);
        context.fillStyle = `rgb(${String(c.r)}, ${String(c.g)}, ${String(c.b)})`;
        context.fillRect(x, y, 1, 1);
      }
    }
  }
}

export { RayTracer };
