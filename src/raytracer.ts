import { Camera } from "./camera.js";
import { Color } from "./color.js";
import { Intersection, Ray, RGB, Thing, XYZ } from "./declarations.js";
import { Light } from "./light.js";
import { Scene } from "./scene.js";
import { Vector } from "./vector.js";

export class RayTracer {
  private _maxDepth = 5;

  screenWidth: number;

  screenHeight: number;

  scene!: Scene;

  position!: XYZ;

  normal!: XYZ;

  reflectionDirection!: XYZ;

  thing!: Thing;

  constructor(screenWidth: number, screenHeight: number) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this._intersections = this._intersections.bind(this);
    this._testRay = this._testRay.bind(this);
    this._traceRay = this._traceRay.bind(this);
    this._shade = this._shade.bind(this);
    this._getReflectionColor = this._getReflectionColor.bind(this);
    this._addLight = this._addLight.bind(this);
    this._getNaturalColor = this._getNaturalColor.bind(this);
    this._recenterX = this._recenterX.bind(this);
    this._recenterY = this._recenterY.bind(this);
    this._getPoint = this._getPoint.bind(this);
    this.render = this.render.bind(this);
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

  private _traceRay(this: RayTracer, ray: Ray, scene: Scene, depth: number): RGB {
    const intersection: Intersection | null = this._intersections(ray, scene);
    if (!intersection) return Color.background;

    return this._shade(intersection, scene, depth);
  }

  private _shade(this: RayTracer, intersection: Intersection, scene: Scene, depth: number): RGB {
    const direction = intersection.ray.direction;
    const position = Vector.plus(Vector.times(intersection.distance, direction), intersection.ray.start);
    const normal = intersection.thing.normal(position);
    const reflectionDirection = Vector.minus(direction, Vector.times(2, Vector.times(Vector.dotProduct(normal, direction), normal)));
    const naturalColor = Color.plus(Color.background, this._getNaturalColor(intersection.thing, position, normal, reflectionDirection, scene));
    const reflectedColor = depth >= this._maxDepth ? Color.grey : this._getReflectionColor(intersection.thing, position, reflectionDirection, scene, depth);
    return Color.plus(naturalColor, reflectedColor);
  }

  private _getReflectionColor(this: RayTracer, thing: Thing, position: XYZ, reflectionDirection: XYZ, scene: Scene, depth: number): RGB {
    const ray: Ray = {
      start: position,
      direction: reflectionDirection,
    };
    return Color.scale(thing.surface.reflect(position), this._traceRay(ray, scene, depth + 1));
  }

  private _addLight(this: RayTracer, color: RGB, light: Light) {
    const lightDistance: XYZ = Vector.minus(light.position, this.position);

    const lightVector: XYZ = Vector.normal(lightDistance);

    const ray: Ray = {
      start: this.position,
      direction: lightVector,
    };

    // SHADOW ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const neatIntersection: number | null = this._testRay(ray, this.scene);

    let isInShadow: boolean;
    if (!neatIntersection) {
      isInShadow = false;
    } else {
      isInShadow = neatIntersection <= Vector.magnitude(lightDistance);
    }

    if (isInShadow) return color;

    // ILLUMINATION //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const illumination = Vector.dotProduct(lightVector, this.normal);

    let lightColor: RGB;
    if (illumination > 0) {
      lightColor = Color.scale(illumination, light.color);
    } else {
      lightColor = Color.defaultColor;
    }

    // SPECULARITY ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const specular = Vector.dotProduct(lightVector, Vector.normal(this.reflectionDirection));

    let specularColor: RGB;
    if (specular > 0) {
      specularColor = Color.scale(Math.pow(specular, this.thing.surface.roughness), light.color);
    } else {
      specularColor = Color.defaultColor;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return Color.plus(color, Color.plus(Color.times(this.thing.surface.diffuse(this.position), lightColor), Color.times(this.thing.surface.specular, specularColor)));
  }

  private _getNaturalColor(this: RayTracer, thing: Thing, position: XYZ, normal: XYZ, reflectionDirection: XYZ, scene: Scene): RGB {
    this.position = position;
    this.scene = scene;
    this.normal = normal;
    this.reflectionDirection = reflectionDirection;
    this.thing = thing;
    return scene.lights.reduce(this._addLight, Color.defaultColor);
  }

  private _recenterX(x: number): number {
    return (x - this.screenWidth / 2.0) / 2.0 / this.screenWidth;
  }

  private _recenterY(y: number): number {
    return -(y - this.screenHeight / 2.0) / 2.0 / this.screenHeight;
  }

  private _getPoint(this: RayTracer, x: number, y: number, camera: Camera): XYZ {
    return Vector.normal(Vector.plus(camera.forward, Vector.plus(Vector.times(this._recenterX(x), camera.right), Vector.times(this._recenterY(y), camera.up))));
  }

  render(this: RayTracer, context: CanvasRenderingContext2D, scene: Scene): void {
    const { screenWidth, screenHeight } = this;
    const { camera } = scene;
    const { position } = camera;
    const ray: Ray = {
      start: position,
      direction: {
        x: 0,
        y: 0,
        z: 0,
      },
    };
    for (let y = 0; y < screenHeight; y++) {
      for (let x = 0; x < screenWidth; x++) {
        ray.direction = this._getPoint(x, y, camera);
        const color: RGB = this._traceRay(ray, scene, 0);
        const { r, g, b } = Color.toDrawingColor(color);
        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        context.fillRect(x, y, 1, 1);
      }
    }
  }
}
