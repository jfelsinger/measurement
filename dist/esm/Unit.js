import { UnitType } from './UnitType';
import { UnitBase } from './UnitBase';
import { multiply } from './lib/safeMath';
/**
 * Represents a unit of measurement
 */
export class Unit {
    constructor(options) {
        var _a, _b;
        this.base = UnitBase.get(options.base || ((_a = options.baseUnit) === null || _a === void 0 ? void 0 : _a.base));
        this.baseUnit = options.baseUnit;
        this.unitType =
            options.unitType ||
                ((_b = options.baseUnit) === null || _b === void 0 ? void 0 : _b.unitType) ||
                UnitType.Unknown;
        if (options.prefix)
            this.prefix = UnitBase.get(options.prefix);
        this.baseMultiplier = isNaN(options.multiplier) ? 1 : parseFloat(`${options.multiplier}`);
        this.__name = options.name;
    }
    /** The abbreviation for the unit: m, kg, etc. */
    get abbr() {
        return this.toString();
    }
    /** The name of the unit: meter, kilogram, etc. */
    get name() {
        return this.__name || this.toString(false);
    }
    /**
     * The ratio of this unit in relation to the base unit. A kilogram would
     * have a multiplier of 1000, because gram is the base unit.
     */
    get multiplier() {
        var _a, _b;
        const baseUnitMultiplier = (_b = (_a = this.baseUnit) === null || _a === void 0 ? void 0 : _a.multiplier) !== null && _b !== void 0 ? _b : 1;
        return multiply(this.baseMultiplier, baseUnitMultiplier);
    }
    toString(useAbbreviation = true) {
        var _a, _b, _c, _d;
        if (useAbbreviation)
            return ((_b = (_a = this === null || this === void 0 ? void 0 : this.prefix) === null || _a === void 0 ? void 0 : _a.abbr) !== null && _b !== void 0 ? _b : '') + this.base.abbr;
        return ((_d = (_c = this === null || this === void 0 ? void 0 : this.prefix) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '') + this.base.name;
    }
    /**
     * Check whether the UnitType of this unit matches the UnitType of the
     * given unit.
     * */
    matchesType(unit) {
        return this.unitType === unit.unitType;
    }
    /** Creates a clone of the current unit and returns it */
    clone(options) {
        let baseOptions = {
            base: this.base,
            baseUnit: this.baseUnit,
            prefix: this.prefix,
            unitType: this.unitType,
            multiplier: this.baseMultiplier,
            name: this.__name,
        };
        if (options === null || options === void 0 ? void 0 : options.base)
            baseOptions.base = options.base;
        if (options === null || options === void 0 ? void 0 : options.baseUnit)
            baseOptions.baseUnit = options.baseUnit;
        if (options === null || options === void 0 ? void 0 : options.prefix)
            baseOptions.prefix = options.prefix;
        if (options === null || options === void 0 ? void 0 : options.unitType)
            baseOptions.unitType = options.unitType;
        if (options === null || options === void 0 ? void 0 : options.multiplier)
            baseOptions.multiplier = options.multiplier;
        if (options === null || options === void 0 ? void 0 : options.name)
            baseOptions.name = options.name;
        return new Unit(baseOptions);
    }
}
export default Unit;
