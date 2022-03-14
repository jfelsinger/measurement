"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siPrefixes = exports.byte = exports.bit = exports.litre = exports.gram = exports.meter = exports.year = exports.week = exports.day = exports.hour = exports.minute = exports.second = exports.units = exports.unitsList = void 0;
const UnitBase_1 = require("../UnitBase");
const UnitType_1 = require("../UnitType");
const Unit_1 = require("../Unit");
exports.unitsList = new Set();
exports.units = {};
exports.default = exports.units;
exports.second = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 's', name: 'second' }),
    unitType: UnitType_1.UnitType.Time,
});
exports.unitsList.add(exports.second);
exports.minute = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'min', name: 'minute' }),
    baseUnit: exports.second,
    multiplier: 60,
});
exports.unitsList.add(exports.minute);
exports.hour = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'h', name: 'hour' }),
    baseUnit: exports.minute,
    multiplier: 60,
});
exports.hour.aliases.push('hr');
exports.unitsList.add(exports.hour);
exports.day = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'd', name: 'day' }),
    baseUnit: exports.hour,
    multiplier: 24,
});
exports.unitsList.add(exports.day);
exports.week = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'W', name: 'week' }),
    baseUnit: exports.day,
    multiplier: 7,
});
exports.unitsList.add(exports.day);
exports.year = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'yr', name: 'year' }),
    baseUnit: exports.day,
    multiplier: 365.25,
});
exports.year.aliases.push('y');
exports.unitsList.add(exports.year);
exports.meter = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'm', name: 'meter' }),
    unitType: UnitType_1.UnitType.Length,
});
exports.unitsList.add(exports.meter);
exports.gram = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'g', name: 'gram' }),
    unitType: UnitType_1.UnitType.Mass,
});
exports.unitsList.add(exports.gram);
exports.litre = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'l', name: 'litre' }),
    unitType: UnitType_1.UnitType.Volume,
});
exports.unitsList.add(exports.litre);
exports.bit = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'b', name: 'bit' }),
    unitType: UnitType_1.UnitType.Length,
});
exports.unitsList.add(exports.bit);
exports.byte = new Unit_1.Unit({
    base: new UnitBase_1.UnitBase({ abbr: 'B', name: 'byte' }),
    baseUnit: exports.bit,
    multiplier: 8,
});
exports.unitsList.add(exports.byte);
const baseUnits = [
    exports.second, exports.meter,
    exports.gram, exports.litre,
    exports.bit, exports.byte,
];
exports.siPrefixes = [
    { prefix: { abbr: 'Y', name: 'yotta' }, multiplier: Math.pow(10, 24) },
    { prefix: { abbr: 'Z', name: 'zetta' }, multiplier: Math.pow(10, 21) },
    { prefix: { abbr: 'E', name: 'exa' }, multiplier: Math.pow(10, 18) },
    { prefix: { abbr: 'P', name: 'peta' }, multiplier: Math.pow(10, 15) },
    { prefix: { abbr: 'T', name: 'tera' }, multiplier: Math.pow(10, 12) },
    { prefix: { abbr: 'G', name: 'giga' }, multiplier: Math.pow(10, 9) },
    { prefix: { abbr: 'M', name: 'mega' }, multiplier: Math.pow(10, 6) },
    { prefix: { abbr: 'k', name: 'kilo' }, multiplier: Math.pow(10, 3) },
    { prefix: { abbr: 'h', name: 'hecto' }, multiplier: Math.pow(10, 2) },
    { prefix: { abbr: 'da', name: 'deca' }, multiplier: Math.pow(10, 1) },
    { prefix: { abbr: 'd', name: 'deci' }, multiplier: Math.pow(10, -1) },
    { prefix: { abbr: 'c', name: 'centi' }, multiplier: Math.pow(10, -2) },
    { prefix: { abbr: 'm', name: 'milli' }, multiplier: Math.pow(10, -3) },
    { prefix: { abbr: 'u', name: 'micro' }, multiplier: Math.pow(10, -6) },
    { prefix: { abbr: 'μ', name: 'micro' }, multiplier: Math.pow(10, -6) },
    { prefix: { abbr: 'n', name: 'nano' }, multiplier: Math.pow(10, -9) },
    { prefix: { abbr: 'p', name: 'pico' }, multiplier: Math.pow(10, -12) },
    { prefix: { abbr: 'f', name: 'femto' }, multiplier: Math.pow(10, -15) },
    { prefix: { abbr: 'a', name: 'atto' }, multiplier: Math.pow(10, -18) },
    { prefix: { abbr: 'z', name: 'zepto' }, multiplier: Math.pow(10, -21) },
    { prefix: { abbr: 'y', name: 'yocto' }, multiplier: Math.pow(10, -24) },
];
baseUnits.forEach((baseUnit) => {
    exports.siPrefixes.forEach((siPrefix) => {
        let unit = new Unit_1.Unit({
            base: new UnitBase_1.UnitBase(baseUnit.base),
            baseUnit,
            prefix: siPrefix.prefix,
            multiplier: siPrefix.multiplier,
        });
        exports.unitsList.add(unit);
    });
});
exports.unitsList.forEach((unit) => {
    var _a;
    exports.units[unit.name] = unit;
    exports.units[unit.abbr] = unit;
    (_a = unit.aliases) === null || _a === void 0 ? void 0 : _a.forEach((alias) => {
        exports.units[alias] = unit;
    });
});
