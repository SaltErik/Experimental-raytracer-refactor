import { Color } from "./color.js";
import { Vector } from "./vector.js";
export class RayTracer {
    _maxDepth = 5;
    screenWidth;
    screenHeight;
    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }
    _intersections(ray, scene) {
        let closest = +Infinity;
        let closestIntersection = null;
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
    _testRay(ray, scene) {
        const intersection = this._intersections(ray, scene);
        if (!intersection)
            return null;
        return intersection.distance;
    }
    _traceRay(ray, scene, depth) {
        const intersection = this._intersections(ray, scene);
        if (!intersection)
            return Color.background;
        return this._shade(intersection, scene, depth);
    }
    _shade(intersection, scene, depth) {
        const direction = intersection.ray.direction;
        const position = Vector.plus(Vector.times(intersection.distance, direction), intersection.ray.start);
        const normal = intersection.thing.normal(position);
        const reflectionDirection = Vector.minus(direction, Vector.times(2, Vector.times(Vector.dotProduct(normal, direction), normal)));
        const naturalColor = Color.plus(Color.background, this._getNaturalColor(intersection.thing, position, normal, reflectionDirection, scene));
        const reflectedColor = depth >= this._maxDepth ? Color.grey : this._getReflectionColor(intersection.thing, position, reflectionDirection, scene, depth);
        return Color.plus(naturalColor, reflectedColor);
    }
    _getReflectionColor(thing, position, reflectionDirection, scene, depth) {
        const ray = {
            start: position,
            direction: reflectionDirection,
        };
        return Color.scale(thing.surface.reflect(position), this._traceRay(ray, scene, depth + 1));
    }
    _getNaturalColor(thing, position, normal, reflectionDirection, scene) {
        const addLight = (color, light) => {
            const ldis = Vector.minus(light.position, position);
            const livec = Vector.normal(ldis);
            const ray = {
                start: position,
                direction: livec,
            };
            const neatIsect = this._testRay(ray, scene);
            const isInShadow = !neatIsect ? false : neatIsect <= Vector.magnitude(ldis);
            if (isInShadow) {
                return color;
            }
            else {
                const illum = Vector.dotProduct(livec, normal);
                const lcolor = illum > 0 ? Color.scale(illum, light.color) : Color.defaultColor;
                const specular = Vector.dotProduct(livec, Vector.normal(reflectionDirection));
                const scolor = specular > 0 ? Color.scale(Math.pow(specular, thing.surface.roughness), light.color) : Color.defaultColor;
                return Color.plus(color, Color.plus(Color.times(thing.surface.diffuse(position), lcolor), Color.times(thing.surface.specular, scolor)));
            }
        };
        return scene.lights.reduce(addLight, Color.defaultColor);
    }
    _recenterX(x) {
        return (x - this.screenWidth / 2.0) / 2.0 / this.screenWidth;
    }
    _recenterY(y) {
        return -(y - this.screenHeight / 2.0) / 2.0 / this.screenHeight;
    }
    _getPoint(x, y, camera) {
        return Vector.normal(Vector.plus(camera.forward, Vector.plus(Vector.times(this._recenterX(x), camera.right), Vector.times(this._recenterY(y), camera.up))));
    }
    render(scene, context) {
        const { camera } = scene;
        const { position } = camera;
        const ray = {
            start: position,
            direction: null,
        };
        const { screenWidth, screenHeight } = this;
        for (let y = 0; y < screenHeight; y++) {
            for (let x = 0; x < screenWidth; x++) {
                ray.direction = this._getPoint(x, y, camera);
                const color = this._traceRay(ray, scene, 0);
                const { r, g, b } = Color.toDrawingColor(color);
                context.fillStyle = `rgb(${r}, ${g}, ${b})`;
                context.fillRect(x, y, 1, 1);
            }
        }
    }
}
