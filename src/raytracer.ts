import { Camera } from "./camera.js";
import { Color } from "./color.js";
import { Intersection, Ray, RGB, Thing, XYZ } from "./declarations.js";
import { Scene } from "./scene.js";
import { Vector } from "./vector.js";

export class RayTracer {
  private _maxDepth = 5;

  private _screenWidth: number;

  private _screenHeight: number;

  private _ray: Ray = {
    start: {
      x: 0,
      y: 0,
      z: 0,
    },
    direction: {
      x: 0,
      y: 0,
      z: 0,
    },
  };

  constructor(screenWidth: number, screenHeight: number) {
    this._screenWidth = screenWidth;
    this._screenHeight = screenHeight;
    this._intersections = this._intersections.bind(this);
    this._testRay = this._testRay.bind(this);
    this._traceRay = this._traceRay.bind(this);
    this._shade = this._shade.bind(this);
    this._getReflectionColor = this._getReflectionColor.bind(this);
    this._getNaturalColor = this._getNaturalColor.bind(this);
    this._recenterX = this._recenterX.bind(this);
    this._recenterY = this._recenterY.bind(this);
    this._getPoint = this._getPoint.bind(this);
    this.render = this.render.bind(this);
  }

  private _intersections(this: RayTracer, ray: Ray, scene: Scene): Intersection | null {
    let closest: number = +Infinity;
    let closestIntersection: Intersection | null = null;

    let i = scene.things.length;
    while (i--) {
      const intersection = scene.things[i].intersect(ray);
      if (intersection && intersection.distance < closest) {
        closestIntersection = intersection;
        closest = intersection.distance;
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
    if (!intersection) return Color.backgroundColor;

    return this._shade(intersection, scene, depth);
  }

  private _shade(this: RayTracer, intersection: Intersection, scene: Scene, depth: number): RGB {
    const direction: XYZ = intersection.ray.direction;

    const position: XYZ = Vector.plus(Vector.times(intersection.distance, direction), intersection.ray.start);

    const normal: XYZ = intersection.thing.normal(position);

    const reflectionDirection: XYZ = Vector.minus(direction, Vector.times(2, Vector.times(Vector.dotProduct(normal, direction), normal)));

    const naturalColor: RGB = Color.plus(Color.backgroundColor, this._getNaturalColor(intersection.thing, position, normal, reflectionDirection, scene));

    let reflectedColor: RGB;
    if (depth >= this._maxDepth) {
      reflectedColor = Color.grey;
    } else {
      reflectedColor = this._getReflectionColor(intersection.thing, position, reflectionDirection, scene, depth);
    }

    return Color.plus(naturalColor, reflectedColor);
  }

  private _getReflectionColor(this: RayTracer, thing: Thing, position: XYZ, reflectionDirection: XYZ, scene: Scene, depth: number): RGB {
    const ray: Ray = {
      start: position,
      direction: reflectionDirection,
    };
    return Color.scale(thing.surface.reflect(position), this._traceRay(ray, scene, depth + 1));
  }

  private _getNaturalColor(this: RayTracer, thing: Thing, position: XYZ, normal: XYZ, reflectionDirection: XYZ, scene: Scene): RGB {
    let naturalColor: RGB = Color.defaultColor;

    let i = scene.lights.length;
    while (i--) {
      const light = scene.lights[i];
      const lightDistance: XYZ = Vector.minus(light.position, position);
      const lightVector: XYZ = Vector.normal(lightDistance);
      const ray: Ray = {
        start: position,
        direction: lightVector,
      };
      // SHADOW ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const neatIntersection: number | null = this._testRay(ray, scene);

      let isInShadow: boolean;
      if (!neatIntersection) {
        isInShadow = false;
      } else {
        isInShadow = neatIntersection <= Vector.magnitude(lightDistance);
      }

      if (isInShadow) {
        naturalColor = Color.plus(naturalColor, Color.defaultColor);
        continue;
      }
      // ILLUMINATION //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const illumination = Vector.dotProduct(lightVector, normal);

      let lightColor: RGB;
      if (illumination > 0) {
        lightColor = Color.scale(illumination, light.color);
      } else {
        lightColor = Color.defaultColor;
      }
      // SPECULARITY ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const specular = Vector.dotProduct(lightVector, Vector.normal(reflectionDirection));

      let specularColor: RGB;
      if (specular > 0) {
        specularColor = Color.scale(Math.pow(specular, thing.surface.roughness), light.color);
      } else {
        specularColor = Color.defaultColor;
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      naturalColor = Color.plus(naturalColor, Color.plus(Color.times(thing.surface.diffuse(position), lightColor), Color.times(thing.surface.specular, specularColor)));
    }
    return naturalColor;
  }

  private _recenterX(x: number): number {
    return (x - this._screenWidth / 2) / 2 / this._screenWidth;
  }

  private _recenterY(y: number): number {
    return -(y - this._screenHeight / 2) / 2 / this._screenHeight;
  }

  private _getPoint(this: RayTracer, x: number, y: number, camera: Camera): XYZ {
    return Vector.normal(Vector.plus(camera.forward, Vector.plus(Vector.times(this._recenterX(x), camera.right), Vector.times(this._recenterY(y), camera.up))));
  }

  render(this: RayTracer, context: CanvasRenderingContext2D, scene: Scene): void {
    const { _screenWidth, _screenHeight } = this;
    const { camera } = scene;
    const { position } = camera;
    this._ray.start = { ...position };
    let y = _screenWidth;
    while (y--) {
      //if (Math.random() > 0.5) continue; // <-- causes horizontal banding
      //if (y < _screenWidth / 2) continue; // <--- embarassingly parallell?
      let x = _screenHeight;
      while (x--) {
        //if (Math.random() > 0.5) continue; // <-- causes 'dead pixels'
        this._ray.direction = this._getPoint(x, y, camera);
        const color: RGB = this._traceRay(this._ray, scene, 0);
        const { r, g, b } = Color.toDrawingColor(color);
        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        context.fillRect(x, y, 1, 1);
      }
    }
    console.log(`screenWidth: ${_screenWidth}`);
    console.log(`screenHeight: ${_screenHeight}`);
  }
}
