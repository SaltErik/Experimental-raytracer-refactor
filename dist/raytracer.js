import { Color } from "./color.js";
import { Vector } from "./vector.js";
export class RayTracer {
    _maxDepth = 5;
    constructor() { }
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
        return Color.scale(thing.surface.reflect(position), this._traceRay({ start: position, direction: reflectionDirection }, scene, depth + 1));
    }
    _getNaturalColor(thing, position, normal, reflectionDirection, scene) {
        const addLight = (color, light) => {
            const ldis = Vector.minus(light.position, position);
            const livec = Vector.normal(ldis);
            const neatIsect = this._testRay({ start: position, direction: livec }, scene);
            const isInShadow = !neatIsect ? false : neatIsect <= Vector.magnitude(ldis);
            if (isInShadow) {
                return color;
            }
            else {
                const illum = Vector.dotProduct(livec, normal);
                const lcolor = illum > 0 ? Color.scale(illum, light.color) : Color.defaultColor;
                const specular = Vector.dotProduct(livec, Vector.normal(reflectionDirection));
                const scolor = specular > 0 ? Color.scale(Math.pow(specular, thing.surface.roughness), light.color) : Color.defaultColor;
                return Color.plus(color, Color.plus(Color.times(thing.surface.diffuse(position), lcolor), Color.times(thing.surface.specular(position), scolor)));
            }
        };
        return scene.lights.reduce(addLight, Color.defaultColor);
    }
    render(scene, ctx, screenWidth, screenHeight) {
        const getPoint = (x, y, camera) => {
            const recenterX = (x) => (x - screenWidth / 2.0) / 2.0 / screenWidth;
            const recenterY = (y) => -(y - screenHeight / 2.0) / 2.0 / screenHeight;
            return Vector.normal(Vector.plus(camera.forward, Vector.plus(Vector.times(recenterX(x), camera.right), Vector.times(recenterY(y), camera.up))));
        };
        for (let y = 0; y < screenHeight; y++) {
            for (let x = 0; x < screenWidth; x++) {
                const color = this._traceRay({ start: scene.camera.pos, direction: getPoint(x, y, scene.camera) }, scene, 0);
                const c = Color.toDrawingColor(color);
                ctx.fillStyle = `rgb(${String(c.r)}, ${String(c.g)}, ${String(c.b)})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}
