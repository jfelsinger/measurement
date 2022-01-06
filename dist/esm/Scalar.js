import UnitType from './UnitType';
import { CompoundUnit } from './CompoundUnit';
import { defaultLibrary } from './UnitLibrary';
import { multiply, divide } from './lib/safeMath';
export class Scalar {
    constructor(options) {
        var _a;
        const library = (_a = options.library) !== null && _a !== void 0 ? _a : defaultLibrary;
        this.library = library;
        if (typeof (options.unit) === 'string')
            this.unit = library.getUnit(options.unit);
        else
            this.unit = options.unit;
        this.value = options.value;
    }
    static get(value, unit, library) {
        return new Scalar({
            value,
            unit,
            library,
        });
    }
    /**
     * Returns a numeric value representative of the scalar value.
     * optionally, get the value converted from another base unit.
     *
     * 25km -> 25
     * 25km -> 2500(m)
     */
    getValue(unitArg, index = 0) {
        if (!unitArg)
            return this.value;
        // else:
        const currentUnit = this.unit;
        let unit = this.getConvertedUnit(unitArg, index);
        return multiply(this.value, divide(currentUnit.multiplier, unit.multiplier));
    }
    /**
     * Returns an equivalent scalar based on a different unit
     */
    as(unitArg, index = 0) {
        const currentUnit = this.unit;
        let unit = this.getConvertedUnit(unitArg, index);
        let value = this.getValue(unitArg, index);
        return this.clone({ unit, value });
    }
    /**
     * Converts the current instance of scalar to another unit of measure
     */
    to(unitArg, index = 0) {
        let converted = this.as(unitArg, index);
        this.value = converted.value;
        this.unit = converted.unit;
        return this;
    }
    /**
     * Make a compound unit representing the current unit per the given one.
     *
     * km.per(hr); // km/hr
     * someAmountOfKm.per(hr); // km/hr
     */
    per(unitArg) {
        let resultUnit;
        let currentUnit = this.unit.clone();
        let unit = this.getUnitFromLibrary(unitArg);
        if (currentUnit.unitType === UnitType.Compound) {
            resultUnit = currentUnit;
        }
        else {
            resultUnit = new CompoundUnit({ units: [currentUnit] });
        }
        resultUnit.addUnit(unit);
        return this.clone({
            value: this.value,
            unit: resultUnit,
        });
    }
    /**
     * Convert the unit of the scalar to another and return it.
     */
    getConvertedUnit(unitArg, index = 0) {
        const currentUnit = this.unit;
        let unit = this.getUnitFromLibrary(unitArg);
        if (unit && currentUnit.unitType === UnitType.Compound) {
            let compound = currentUnit;
            unit = compound.convert(unit, index);
        }
        if (!unit.matchesType(currentUnit))
            throw new Error('Invalid Units: a unit of type `' +
                this.unit +
                '` cannot be converted to a unit of type `' +
                unit + '`');
        return unit;
    }
    /**
     * Grabs a unit from the internal unit library
     */
    getUnitFromLibrary(unitArg) {
        let unit;
        if (typeof (unitArg) === 'string')
            unit = this.library.getUnit(unitArg);
        else
            unit = unitArg;
        return unit;
    }
    /** Return a clone of the current scalar instance */
    clone(options) {
        var _a, _b, _c;
        return new Scalar({
            value: (_a = options === null || options === void 0 ? void 0 : options.value) !== null && _a !== void 0 ? _a : this.value,
            unit: (_b = options === null || options === void 0 ? void 0 : options.unit) !== null && _b !== void 0 ? _b : this.unit.clone(),
            library: (_c = options === null || options === void 0 ? void 0 : options.library) !== null && _c !== void 0 ? _c : this.library,
        });
    }
    /**
     * Get a string representation of the scalar value.
     *
     * - '25km'
     * - '25 kilometers'
     */
    toString(useAbbreviation = true, tryToPluralize = true) {
        if (useAbbreviation)
            return `${this.value}${this.unit.toString(useAbbreviation)}`;
        if (tryToPluralize && this.value != 1)
            return `${this.value} ${this.unit.toString(useAbbreviation)}s`;
        return `${this.value} ${this.unit.toString(useAbbreviation)}`;
    }
}
