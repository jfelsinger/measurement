"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divide = exports.subtract = exports.add = exports.multiply = exports.aggregate = exports.getDecimalMultiplier = exports.getMaxDecimalPlaces = void 0;
function getMaxDecimalPlaces(...nums) {
    return Math.max(...nums
        .map(m => `${m}`)
        .filter(m => m.includes('.'))
        .map(m => m.split('.')[1].length));
}
exports.getMaxDecimalPlaces = getMaxDecimalPlaces;
function getDecimalMultiplier(decimalAdjustment) {
    let power = 1;
    if (decimalAdjustment > 0) {
        power = Math.pow(10, decimalAdjustment);
    }
    return power;
}
exports.getDecimalMultiplier = getDecimalMultiplier;
function aggregate(func, ...nums) {
    const decimalAdjustment = getMaxDecimalPlaces(...nums);
    let power = getDecimalMultiplier(decimalAdjustment);
    nums = nums.map(m => Math.round(m * power));
    let result = nums.slice(1).reduce(func, nums[0]);
    return result / power;
    // return result / Math.pow(power, nums.length);
}
exports.aggregate = aggregate;
function multiply(...nums) {
    const decimalAdjustment = getMaxDecimalPlaces(...nums);
    let power = getDecimalMultiplier(decimalAdjustment);
    nums = nums.map(m => Math.round(m * power));
    let result = nums.slice(1).reduce((prev, curr) => prev * curr, nums[0]);
    return result / Math.pow(power, nums.length);
}
exports.multiply = multiply;
function add(...nums) {
    return aggregate((prev, curr) => prev + curr, ...nums);
}
exports.add = add;
function subtract(...nums) {
    return aggregate((prev, curr) => prev - curr, ...nums);
}
exports.subtract = subtract;
function divide(...nums) {
    return nums.slice(1).reduce((prev, curr) => {
        const decimalAdjustment = getMaxDecimalPlaces(prev, curr);
        let power = getDecimalMultiplier(decimalAdjustment);
        prev = Math.round(prev * power);
        curr = Math.round(curr * power);
        return (prev / curr);
    }, nums[0]);
}
exports.divide = divide;
