import UnitType from './UnitType';
import combineUnitMultipliers from './lib/combineUnitMultipliers';
import getUnitTypeName from './lib/getUnitTypeName';
/**
 * A unit that is a combination of two or more others. ex:
 *
 * - "km/hr" a unit of speed.
 * - "km/hr/m" a unit of acceleration.
 */
export class CompoundUnit {
    constructor(options) {
        this.subUnits = [];
        this.isInverse = false;
        this.aliases = [];
        this.subUnits = options.units || [];
        this.__name = options.name;
        this.__abbr = options.abbr;
        if (options.aliases)
            this.aliases = options.aliases;
    }
    /** The compound quantity measured by this unit. */
    get unitType() { return UnitType.Compound; }
    /**
     * The ratio of this unit in relation to the base unit. A kilogram would
     * have a multiplier of 1000, because gram is the base unit.
     */
    get multiplier() {
        return combineUnitMultipliers(this.subUnits);
    }
    /** Add a unit to the current compound's list */
    addUnit(unit, toFront = false) {
        if (toFront)
            this.subUnits.unshift(unit);
        else
            this.subUnits.push(unit);
        return this;
    }
    /**
     * Create a new compound unit by converting one of the units present
     * in this to another and making a copy.
     */
    convert(unit, index = 0) {
        if (this.matchesType(unit))
            return unit;
        // else:
        let units = this.subUnits.slice(0);
        if (!unit.matchesType(units[index]))
            throw new Error('Invalid Units: a unit of type `' +
                getUnitTypeName(units[index]) +
                '` cannot be converted to a unit of type `' +
                getUnitTypeName(unit) +
                '`');
        units[index] = unit;
        return new CompoundUnit({
            units,
        });
    }
    /**
     * Check whether the UnitType of this unit matches the UnitType of the
     * given unit.
     * */
    matchesType(unit) {
        if (unit.unitType !== UnitType.Compound)
            return false;
        let compound = unit;
        return compound.subUnits.every((su, i) => this.subUnits[i] && this.subUnits[i].matchesType(su));
    }
    /** The abbreviation for the unit: m/h, kg/min, etc. */
    get abbr() { var _a; return (_a = this.__abbr) !== null && _a !== void 0 ? _a : this.toString(); }
    /** The name of the unit: meters per hour, kilograms per minute, etc. */
    get name() {
        return this.__name || this.toString(false);
    }
    /** Creates a clone of the current unit and returns it */
    clone(options) {
        let baseOptions = {
            units: this.subUnits,
            name: this.__name,
            aliases: this.aliases,
        };
        if (options === null || options === void 0 ? void 0 : options.units)
            baseOptions.units = options.units;
        if (options === null || options === void 0 ? void 0 : options.name)
            baseOptions.name = options.name;
        if (options === null || options === void 0 ? void 0 : options.aliases)
            baseOptions.aliases = options.aliases;
        return new CompoundUnit(baseOptions);
    }
    toString(useAbbreviation = true) {
        if (useAbbreviation && this.__abbr)
            return this.__abbr;
        return this.subUnits
            .map(su => su.toString(useAbbreviation))
            .join(useAbbreviation ? '/' : ' per ');
    }
}
