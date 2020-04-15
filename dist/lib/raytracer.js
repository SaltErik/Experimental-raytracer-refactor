"use strict";
import { Vector } from "./maths/vector.js";
import { Color } from "./rays/color.js";
export class RayTracer {
    _maxDepth = 5;
    _screenWidth;
    _screenHeight;
    constructor(screenWidth, screenHeight) {
        this._screenWidth = screenWidth;
        this._screenHeight = screenHeight;
    }
    _intersections(ray, scene) {
        let closest = +Infinity;
        let closestIntersection = null;
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
    _testRay(ray, scene) {
        const intersection = this._intersections(ray, scene);
        if (!intersection)
            return null;
        return intersection.distance;
    }
    _traceRay(ray, scene, depth) {
        const intersection = this._intersections(ray, scene);
        if (!intersection)
            return Color.backgroundColor;
        return this._shade(intersection, scene, depth);
    }
    _shade(intersection, scene, depth) {
        const direction = intersection.ray.direction;
        const position = Vector.plus(Vector.times(intersection.distance, direction), intersection.ray.start);
        const normal = intersection.thing.normal(position);
        const reflectionDirection = Vector.minus(direction, Vector.times(2, Vector.times(Vector.dotProduct(normal, direction), normal)));
        const naturalColor = Color.plus(Color.backgroundColor, this._getNaturalColor(intersection.thing, position, normal, reflectionDirection, scene));
        let reflectedColor;
        if (depth >= this._maxDepth) {
            reflectedColor = Color.grey;
        }
        else {
            reflectedColor = this._getReflectionColor(intersection.thing, position, reflectionDirection, scene, depth);
        }
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
        let naturalColor = Color.defaultColor;
        let i = scene.lights.length;
        while (i--) {
            const light = scene.lights[i];
            const lightDistance = Vector.minus(light.position, position);
            const lightVector = Vector.normal(lightDistance);
            const ray = {
                start: position,
                direction: lightVector,
            };
            const neatIntersection = this._testRay(ray, scene);
            let isInShadow;
            if (!neatIntersection) {
                isInShadow = false;
            }
            else {
                isInShadow = neatIntersection <= Vector.magnitude(lightDistance);
            }
            if (isInShadow) {
                naturalColor = Color.plus(naturalColor, Color.defaultColor);
                continue;
            }
            const illumination = Vector.dotProduct(lightVector, normal);
            let lightColor;
            if (illumination > 0) {
                lightColor = Color.scale(illumination, light.color);
            }
            else {
                lightColor = Color.defaultColor;
            }
            const specular = Vector.dotProduct(lightVector, Vector.normal(reflectionDirection));
            let specularColor;
            if (specular > 0) {
                specularColor = Color.scale(Math.pow(specular, thing.surface.roughness), light.color);
            }
            else {
                specularColor = Color.defaultColor;
            }
            naturalColor = Color.plus(naturalColor, Color.plus(Color.times(thing.surface.diffuse(position), lightColor), Color.times(thing.surface.specular, specularColor)));
        }
        return naturalColor;
    }
    _recenterX(x) {
        return (x - this._screenWidth / 2) / 2 / this._screenWidth;
    }
    _recenterY(y) {
        return -(y - this._screenHeight / 2) / 2 / this._screenHeight;
    }
    _getPoint(x, y, camera) {
        return Vector.normal(Vector.plus(camera.forward, Vector.plus(Vector.times(this._recenterX(x), camera.right), Vector.times(this._recenterY(y), camera.up))));
    }
    render(context, scene) {
        const ray = {
            start: scene.camera.position,
            direction: [0, 0, 0],
        };
        let color = [0, 0, 0];
        ray.start = scene.camera.position;
        let y = this._screenWidth;
        while (y--) {
            let x = this._screenHeight;
            while (x--) {
                ray.direction = this._getPoint(x, y, scene.camera);
                color = this._traceRay(ray, scene, 0);
                color = Color.toDrawingColor(color);
                context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                context.fillRect(x, y, 1, 1);
            }
        }
        console.log(`screenWidth: ${this._screenWidth}`);
        console.log(`screenHeight: ${this._screenHeight}`);
    }
}
