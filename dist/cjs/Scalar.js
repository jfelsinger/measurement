"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scalar = void 0;
const UnitType_1 = __importDefault(require("./UnitType"));
const CompoundUnit_1 = require("./CompoundUnit");
const UnitLibrary_1 = require("./UnitLibrary");
const safeMath_1 = require("./lib/safeMath");
class Scalar {
    constructor(options) {
        var _a;
        const library = (_a = options.library) !== null && _a !== void 0 ? _a : UnitLibrary_1.defaultLibrary;
        this.library = library;
        if (typeof (options.unit) === 'string')
            this.unit = library.getUnit(options.unit);
        else
            this.unit = options.unit;
        this.__value = options.value;
        const as = this.as = this.convertAs.bind(this);
        const to = this.to = this.convertTo.bind(this);
        const per = this.per = this.convertPer.bind(this);
        this.library.unitsList.forEach((unit) => {
            this.as[unit.name] = (index) => as(unit, index);
            // this.as[unit.abbr] = (index?: number) => this.as(unit, index);
            this.to[unit.name] = (index) => this.to(unit, index);
            // this.to[unit.abbr] = (index?: number) => this.to(unit, index);
            this.per[unit.name] = () => per(unit);
            // this.per[unit.abbr] = () => this.per(unit);
        });
    }
    get value() { return this.getValue(); }
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
            return this.__value;
        // else:
        const currentUnit = this.unit;
        let unit = this.getConvertedUnit(unitArg, index);
        return (0, safeMath_1.multiply)(this.__value, (0, safeMath_1.divide)(currentUnit.multiplier, unit.multiplier));
    }
    convertAs(unitArg, index = 0) {
        let unit = this.getConvertedUnit(unitArg, index);
        let value = this.getValue(unitArg, index);
        return this.clone({ unit, value });
    }
    convertTo(unitArg, index = 0) {
        let converted = this.as(unitArg, index);
        this.__value = converted.value;
        this.unit = converted.unit;
        return this;
    }
    convertPer(unitArg) {
        let resultUnit;
        let currentUnit = this.unit.clone();
        let currentUnit2 = this.unit;
        let unit = this.getUnitFromLibrary(unitArg);
        if (currentUnit.unitType === UnitType_1.default.Compound) {
            resultUnit = currentUnit;
        }
        else {
            resultUnit = new CompoundUnit_1.CompoundUnit({ units: [currentUnit] });
        }
        resultUnit.addUnit(unit);
        return this.clone({
            value: this.__value,
            unit: resultUnit,
        });
    }
    /**
     * Convert the unit of the scalar to another and return it.
     */
    getConvertedUnit(unitArg, index = 0) {
        const currentUnit = this.unit;
        let unit = this.getUnitFromLibrary(unitArg);
        if (unit && currentUnit.unitType === UnitType_1.default.Compound) {
            let compound = currentUnit;
            unit = compound.convert(unit, index);
        }
        if (!unit.matchesType(currentUnit))
            throw new Error('Invalid Units: a unit of type `' +
                this.unit.toString(false) +
                '` cannot be converted to a unit of type `' +
                unit.toString(false) + '`');
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
            value: (_a = options === null || options === void 0 ? void 0 : options.value) !== null && _a !== void 0 ? _a : this.__value,
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
        if (tryToPluralize && this.__value != 1)
            return `${this.value} ${this.unit.toString(useAbbreviation)}s`;
        return `${this.value} ${this.unit.toString(useAbbreviation)}`;
    }
}
exports.Scalar = Scalar;
