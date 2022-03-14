import { UnitBase } from '../UnitBase';
import { UnitType } from '../UnitType';
import { Unit } from '../Unit';
export const unitsList = new Set();
export const units = {};
export default units;
export const second = new Unit({
    base: new UnitBase({ abbr: 's', name: 'second' }),
    unitType: UnitType.Time,
});
unitsList.add(second);
export const minute = new Unit({
    base: new UnitBase({ abbr: 'min', name: 'minute' }),
    baseUnit: second,
    multiplier: 60,
});
unitsList.add(minute);
export const hour = new Unit({
    base: new UnitBase({ abbr: 'h', name: 'hour' }),
    baseUnit: minute,
    multiplier: 60,
});
hour.aliases.push('hr');
unitsList.add(hour);
export const day = new Unit({
    base: new UnitBase({ abbr: 'd', name: 'day' }),
    baseUnit: hour,
    multiplier: 24,
});
unitsList.add(day);
export const week = new Unit({
    base: new UnitBase({ abbr: 'W', name: 'week' }),
    baseUnit: day,
    multiplier: 7,
});
unitsList.add(day);
export const year = new Unit({
    base: new UnitBase({ abbr: 'yr', name: 'year' }),
    baseUnit: day,
    multiplier: 365.25,
});
year.aliases.push('y');
unitsList.add(year);
export const meter = new Unit({
    base: new UnitBase({ abbr: 'm', name: 'meter' }),
    unitType: UnitType.Length,
});
unitsList.add(meter);
export const gram = new Unit({
    base: new UnitBase({ abbr: 'g', name: 'gram' }),
    unitType: UnitType.Mass,
});
unitsList.add(gram);
export const litre = new Unit({
    base: new UnitBase({ abbr: 'l', name: 'litre' }),
    unitType: UnitType.Volume,
});
unitsList.add(litre);
export const bit = new Unit({
    base: new UnitBase({ abbr: 'b', name: 'bit' }),
    unitType: UnitType.Length,
});
unitsList.add(bit);
export const byte = new Unit({
    base: new UnitBase({ abbr: 'B', name: 'byte' }),
    baseUnit: bit,
    multiplier: 8,
});
unitsList.add(byte);
const baseUnits = [
    second, meter,
    gram, litre,
    bit, byte,
];
export const siPrefixes = [
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
    siPrefixes.forEach((siPrefix) => {
        let unit = new Unit({
            base: new UnitBase(baseUnit.base),
            baseUnit,
            prefix: siPrefix.prefix,
            multiplier: siPrefix.multiplier,
        });
        unitsList.add(unit);
    });
});
unitsList.forEach((unit) => {
    var _a;
    units[unit.name] = unit;
    units[unit.abbr] = unit;
    (_a = unit.aliases) === null || _a === void 0 ? void 0 : _a.forEach((alias) => {
        units[alias] = unit;
    });
});
