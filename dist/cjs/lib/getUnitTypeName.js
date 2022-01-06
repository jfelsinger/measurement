"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnitTypeName = void 0;
const UnitType_1 = require("../UnitType");
exports.default = getUnitTypeName;
function getUnitTypeName(unit) {
    if (unit.unitType !== UnitType_1.UnitType.Compound)
        return `${unit.unitType}`;
    const compound = unit;
    const subUnitTypes = compound.subUnits
        .map(su => getUnitTypeName(su))
        .join('.');
    return `${unit.unitType}:${subUnitTypes}`;
}
exports.getUnitTypeName = getUnitTypeName;
