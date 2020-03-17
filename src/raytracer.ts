import { Camera } from "./camera.js";
import { Color } from "./color.js";
import { Intersection, Light, Ray, Scene, Thing } from "./declarations.js";
import { Vector } from "./vector.js";

export class RayTracer {
  private _maxDepth = 5;
  screenWidth: number;
  screenHeight: number;

  constructor(screenWidth: number, screenHeight: number) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
  }

  private _intersections(this: RayTracer, ray: Ray, scene: Scene): Intersection | null {
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

  private _testRay(this: RayTracer, ray: Ray, scene: Scene): number | null {
    const intersection = this._intersections(ray, scene);
    if (!intersection) return null;

    return intersection.distance;
  }

  private _traceRay(this: RayTracer, ray: Ray, scene: Scene, depth: number): Color {
    const intersection: Intersection | null = this._intersections(ray, scene);
    if (!intersection) return Color.background;

    return this._shade(intersection, scene, depth);
  }

  private _shade(this: RayTracer, intersection: Intersection, scene: Scene, depth: number): Color {
    const direction = intersection.ray.direction;
    const position = Vector.plus(Vector.times(intersection.distance, direction), intersection.ray.start);
    const normal = intersection.thing.normal(position);
    const reflectionDirection = Vector.minus(direction, Vector.times(2, Vector.times(Vector.dotProduct(normal, direction), normal)));
    const naturalColor = Color.plus(Color.background, this._getNaturalColor(intersection.thing, position, normal, reflectionDirection, scene));
    const reflectedColor = depth >= this._maxDepth ? Color.grey : this._getReflectionColor(intersection.thing, position, reflectionDirection, scene, depth);
    return Color.plus(naturalColor, reflectedColor);
  }

  private _getReflectionColor(this: RayTracer, thing: Thing, position: Vector, reflectionDirection: Vector, scene: Scene, depth: number): Color {
    const ray: Ray = {
      start: position,
      direction: reflectionDirection,
    };
    return Color.scale(thing.surface.reflect(position), this._traceRay(ray, scene, depth + 1));
  }

  private _getNaturalColor(this: RayTracer, thing: Thing, position: Vector, normal: Vector, reflectionDirection: Vector, scene: Scene): Color {
    const addLight = (color: Color, light: Light) => {
      const ldis = Vector.minus(light.position, position);
      const livec = Vector.normal(ldis);
      const ray: Ray = {
        start: position,
        direction: livec,
      };
      const neatIsect = this._testRay(ray, scene);
      const isInShadow = !neatIsect ? false : neatIsect <= Vector.magnitude(ldis);
      if (isInShadow) {
        return color;
      } else {
        const illum = Vector.dotProduct(livec, normal);
        const lcolor = illum > 0 ? Color.scale(illum, light.color) : Color.defaultColor;
        const specular = Vector.dotProduct(livec, Vector.normal(reflectionDirection));
        const scolor = specular > 0 ? Color.scale(Math.pow(specular, thing.surface.roughness), light.color) : Color.defaultColor;
        return Color.plus(color, Color.plus(Color.times(thing.surface.diffuse(position), lcolor), Color.times(thing.surface.specular, scolor)));
      }
    };
    return scene.lights.reduce(addLight, Color.defaultColor);
  }

  private _recenterX(x: number): number {
    return (x - this.screenWidth / 2.0) / 2.0 / this.screenWidth;
  }

  private _recenterY(y: number): number {
    return -(y - this.screenHeight / 2.0) / 2.0 / this.screenHeight;
  }

  private _getPoint(this: RayTracer, x: number, y: number, camera: Camera): Vector {
    return Vector.normal(Vector.plus(camera.forward, Vector.plus(Vector.times(this._recenterX(x), camera.right), Vector.times(this._recenterY(y), camera.up))));
  }

  render(this: RayTracer, scene: Scene, context: CanvasRenderingContext2D): void {
    console.time("render");
    for (let y = 0; y < this.screenHeight; y++) {
      for (let x = 0; x < this.screenWidth; x++) {
        const ray: Ray = {
          start: scene.camera.position,
          direction: this._getPoint(x, y, scene.camera),
        };
        const color: Color = this._traceRay(ray, scene, 0);
        const c: Color = Color.toDrawingColor(color);
        context.fillStyle = `rgb(${String(c.r)}, ${String(c.g)}, ${String(c.b)})`;
        context.fillRect(x, y, 1, 1);
      }
    }
    console.timeEnd("render");
  }
}
