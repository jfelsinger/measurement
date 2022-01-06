export function getMaxDecimalPlaces(...nums) {
    return Math.max(...nums
        .map(m => `${m}`)
        .filter(m => m.includes('.'))
        .map(m => m.split('.')[1].length));
}
export function getDecimalMultiplier(decimalAdjustment) {
    let power = 1;
    if (decimalAdjustment > 0) {
        power = Math.pow(10, decimalAdjustment);
    }
    return power;
}
export function aggregate(func, ...nums) {
    const decimalAdjustment = getMaxDecimalPlaces(...nums);
    let power = getDecimalMultiplier(decimalAdjustment);
    nums = nums.map(m => Math.round(m * power));
    let result = nums.slice(1).reduce(func, nums[0]);
    return result / power;
    // return result / Math.pow(power, nums.length);
}
export function multiply(...nums) {
    const decimalAdjustment = getMaxDecimalPlaces(...nums);
    let power = getDecimalMultiplier(decimalAdjustment);
    nums = nums.map(m => Math.round(m * power));
    let result = nums.slice(1).reduce((prev, curr) => prev * curr, nums[0]);
    return result / Math.pow(power, nums.length);
}
export function add(...nums) {
    return aggregate((prev, curr) => prev + curr, ...nums);
}
export function subtract(...nums) {
    return aggregate((prev, curr) => prev - curr, ...nums);
}
export function divide(...nums) {
    return nums.slice(1).reduce((prev, curr) => {
        const decimalAdjustment = getMaxDecimalPlaces(prev, curr);
        let power = getDecimalMultiplier(decimalAdjustment);
        prev = Math.round(prev * power);
        curr = Math.round(curr * power);
        return (prev / curr);
    }, nums[0]);
}
