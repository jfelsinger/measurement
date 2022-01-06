"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineUnitMultipliers = void 0;
const safeMath_1 = require("./safeMath");
exports.default = combineUnitMultipliers;
function combineUnitMultipliers(units, inverse = false) {
    let result = 1;
    if (units.length) {
        let multipliers = units.map(unit => unit.multiplier);
        if (inverse)
            result = (0, safeMath_1.multiply)(...multipliers);
        else
            result = (0, safeMath_1.divide)(...multipliers);
    }
    return result;
}
exports.combineUnitMultipliers = combineUnitMultipliers;
