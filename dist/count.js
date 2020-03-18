export let count_intersections = 0;
export let count_testRay = 0;
export let count_traceRay = 0;
export let count_shade = 0;
export let count_getReflectionColor = 0;
export let count_getNaturalColor = 0;
export let count_recenterX = 0;
export let count_recenterY = 0;
export let count_getPoint = 0;
export let count_render = 0;
export let count_count = 0;
export function count(functionName) {
    count_count++;
    switch (functionName) {
        case `_intersections`:
            count_intersections += 1;
            break;
        case `_testRay`:
            count_testRay += 1;
            break;
        case `_traceRay`:
            count_traceRay += 1;
            break;
        case `_shade`:
            count_shade += 1;
            break;
        case `_getReflectionColor`:
            count_getReflectionColor += 1;
            break;
        case `_getNaturalColor`:
            count_getNaturalColor += 1;
            break;
        case `_recenterX`:
            count_recenterX += 1;
            break;
        case `_recenterY`:
            count_recenterY += 1;
            break;
        case `_getPoint`:
            count_getPoint += 1;
            break;
        case `render`:
            count_render += 1;
            break;
        default:
            throw new ReferenceError(`You missed a function name buddy! I recieved: "${functionName}"!`);
    }
}
