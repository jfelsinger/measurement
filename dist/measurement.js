(function () {
    'use strict';

    /**
     * Specifies the type of quantity that a unit measures.
     */
    var UnitType;
    (function (UnitType) {
        UnitType["Mass"] = "Mass";
        UnitType["Length"] = "Length";
        UnitType["Volume"] = "Volume";
        UnitType["Time"] = "Time";
        UnitType["Memory"] = "Memory";
        UnitType["Angle"] = "Angle";
        UnitType["Temperature"] = "Temperature";
        UnitType["Charge"] = "Charge";
        UnitType["Energy"] = "Energy";
        UnitType["Force"] = "Force";
        UnitType["Pressure"] = "Pressure";
        /**
         * Describes a combination of units instead of just a singular quantity,
         * such as km/h
         * */
        UnitType["Compound"] = "Compound";
        UnitType["Unknown"] = "Unknown";
    })(UnitType || (UnitType = {}));
    var UnitType$1 = UnitType;

    /**
     * The base of a unit, literally the abbreviation and name of the unit without
     * more context:
     *
     * k, kilo
     * - or -
     * m, meter
     */
    class UnitBase {
        constructor(options) {
            this.abbr = options.abbr;
            this.name = options.name;
        }
        static get(options) {
            if (options instanceof UnitBase)
                return options;
            else
                return new UnitBase(options);
        }
        toString(useAbbreviation = false) {
            if (useAbbreviation || !this.name)
                return this.abbr;
            return this.name;
        }
    }

    function getMaxDecimalPlaces(...nums) {
        return Math.max(...nums
            .map(m => `${m}`)
            .filter(m => m.includes('.'))
            .map(m => m.split('.')[1].length));
    }
    function getDecimalMultiplier(decimalAdjustment) {
        let power = 1;
        if (decimalAdjustment > 0) {
            power = Math.pow(10, decimalAdjustment);
        }
        return power;
    }
    function multiply(...nums) {
        const decimalAdjustment = getMaxDecimalPlaces(...nums);
        let power = getDecimalMultiplier(decimalAdjustment);
        nums = nums.map(m => Math.round(m * power));
        let result = nums.slice(1).reduce((prev, curr) => prev * curr, nums[0]);
        return result / Math.pow(power, nums.length);
    }
    function divide(...nums) {
        return nums.slice(1).reduce((prev, curr) => {
            const decimalAdjustment = getMaxDecimalPlaces(prev, curr);
            let power = getDecimalMultiplier(decimalAdjustment);
            prev = Math.round(prev * power);
            curr = Math.round(curr * power);
            return (prev / curr);
        }, nums[0]);
    }

    /**
     * Represents a unit of measurement
     */
    class Unit {
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

    function combineUnitMultipliers(units, inverse = false) {
        let result = 1;
        if (units.length) {
            let multipliers = units.map(unit => unit.multiplier);
            if (inverse)
                result = multiply(...multipliers);
            else
                result = divide(...multipliers);
        }
        return result;
    }

    function getUnitTypeName(unit) {
        if (unit.unitType !== UnitType.Compound)
            return `${unit.unitType}`;
        const compound = unit;
        const subUnitTypes = compound.subUnits
            .map(su => getUnitTypeName(su))
            .join('.');
        return `${unit.unitType}:${subUnitTypes}`;
    }

    /**
     * A unit that is a combination of two or more others. ex:
     *
     * - "km/hr" a unit of speed.
     * - "km/hr/m" a unit of acceleration.
     */
    class CompoundUnit {
        constructor(options) {
            this.subUnits = [];
            this.isInverse = false;
            this.subUnits = options.units || [];
            this.__name = options.name;
            this.__abbr = options.abbr;
        }
        /** The compound quantity measured by this unit. */
        get unitType() { return UnitType$1.Compound; }
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
            if (unit.unitType !== UnitType$1.Compound)
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
            };
            if (options === null || options === void 0 ? void 0 : options.units)
                baseOptions.units = options.units;
            if (options === null || options === void 0 ? void 0 : options.name)
                baseOptions.name = options.name;
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

    const unitsList$3 = new Set();
    const units$3 = {};
    const second = new Unit({
        base: new UnitBase({ abbr: 's', name: 'second' }),
        unitType: UnitType.Time,
    });
    unitsList$3.add(second);
    const minute = new Unit({
        base: new UnitBase({ abbr: 'min', name: 'minute' }),
        baseUnit: second,
        multiplier: 60,
    });
    unitsList$3.add(minute);
    const hour = new Unit({
        base: new UnitBase({ abbr: 'h', name: 'hour' }),
        baseUnit: minute,
        multiplier: 60,
    });
    unitsList$3.add(hour);
    const day = new Unit({
        base: new UnitBase({ abbr: 'd', name: 'day' }),
        baseUnit: hour,
        multiplier: 24,
    });
    unitsList$3.add(day);
    const week = new Unit({
        base: new UnitBase({ abbr: 'W', name: 'week' }),
        baseUnit: day,
        multiplier: 7,
    });
    unitsList$3.add(day);
    const year = new Unit({
        base: new UnitBase({ abbr: 'yr', name: 'year' }),
        baseUnit: day,
        multiplier: 365.25,
    });
    unitsList$3.add(year);
    const meter = new Unit({
        base: new UnitBase({ abbr: 'm', name: 'meter' }),
        unitType: UnitType.Length,
    });
    unitsList$3.add(meter);
    const gram = new Unit({
        base: new UnitBase({ abbr: 'g', name: 'gram' }),
        unitType: UnitType.Mass,
    });
    unitsList$3.add(gram);
    const litre = new Unit({
        base: new UnitBase({ abbr: 'l', name: 'litre' }),
        unitType: UnitType.Volume,
    });
    unitsList$3.add(litre);
    const bit = new Unit({
        base: new UnitBase({ abbr: 'b', name: 'bit' }),
        unitType: UnitType.Length,
    });
    unitsList$3.add(bit);
    const byte = new Unit({
        base: new UnitBase({ abbr: 'B', name: 'byte' }),
        baseUnit: bit,
        multiplier: 8,
    });
    unitsList$3.add(byte);
    const baseUnits = [
        second, meter,
        gram, litre,
        bit, byte,
    ];
    const siPrefixes = [
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
            unitsList$3.add(unit);
        });
    });
    unitsList$3.forEach((unit) => {
        units$3[unit.name] = unit;
        units$3[unit.abbr] = unit;
    });

    var metric = /*#__PURE__*/Object.freeze({
        __proto__: null,
        unitsList: unitsList$3,
        units: units$3,
        'default': units$3,
        second: second,
        minute: minute,
        hour: hour,
        day: day,
        week: week,
        year: year,
        meter: meter,
        gram: gram,
        litre: litre,
        bit: bit,
        byte: byte,
        siPrefixes: siPrefixes
    });

    const bases$1 = [
        { base: new UnitBase({ abbr: 'ly', name: 'lightyear' }), metricBase: meter, multiplier: 9460730472580800 },
        { base: new UnitBase({ abbr: 'Ls', name: 'light-second' }), metricBase: meter, multiplier: 299792458 },
        { base: new UnitBase({ abbr: 'Lm', name: 'light-minute' }), metricBase: meter, multiplier: 17987547480 },
        { base: new UnitBase({ abbr: 'Lh', name: 'light-hour' }), metricBase: meter, multiplier: 1079252848800 },
        { base: new UnitBase({ abbr: 'Ld', name: 'light-day' }), metricBase: meter, multiplier: 25902068371200 },
        { base: new UnitBase({ abbr: 'Lw', name: 'light-week' }), metricBase: meter, multiplier: 181314478598400 },
        { base: new UnitBase({ abbr: 'au', name: 'astronomical unit' }), metricBase: meter, multiplier: 149597870700 },
        { base: new UnitBase({ abbr: 'pc', name: 'parsec' }), metricBase: meter, multiplier: 30856775814913670 },
    ];
    const unitsList$2 = new Set();
    const units$2 = {};
    bases$1.forEach((unitBase) => {
        const unit = new Unit({
            base: unitBase.base,
            baseUnit: unitBase.metricBase,
            multiplier: unitBase.multiplier,
        });
        unitsList$2.add(unit);
        units$2[unit.name] = unit;
        units$2[unit.abbr] = unit;
    });

    var astronomical = /*#__PURE__*/Object.freeze({
        __proto__: null,
        unitsList: unitsList$2,
        units: units$2,
        'default': units$2
    });

    const bases = [
        { base: new UnitBase({ abbr: 'in', name: 'inch' }), metricBase: meter, multiplier: 0.0254 },
        { base: new UnitBase({ abbr: 'h', name: 'hand' }), metricBase: meter, multiplier: 0.1016 },
        { base: new UnitBase({ abbr: 'ft', name: 'foot' }), metricBase: meter, multiplier: 0.3048 },
        { base: new UnitBase({ abbr: 'yd', name: 'yard' }), metricBase: meter, multiplier: 0.9144 },
        { base: new UnitBase({ abbr: 'ch', name: 'chain' }), metricBase: meter, multiplier: 20.1168 },
        { base: new UnitBase({ abbr: 'fur', name: 'furlong' }), metricBase: meter, multiplier: 201.168 },
        { base: new UnitBase({ abbr: 'mi', name: 'mile' }), metricBase: meter, multiplier: 1609.344 },
        { base: new UnitBase({ abbr: 'lea', name: 'league' }), metricBase: meter, multiplier: 4828.032 },
        { base: new UnitBase({ abbr: 'fl oz', name: 'fluid ounce' }), metricBase: units$3.ml, multiplier: 28.4130625 },
        { base: new UnitBase({ abbr: 'gi', name: 'gill' }), metricBase: units$3.ml, multiplier: 142.0653125 },
        { base: new UnitBase({ abbr: 'pt', name: 'pint' }), metricBase: units$3.ml, multiplier: 568.26125 },
        { base: new UnitBase({ abbr: 'qt', name: 'quart' }), metricBase: units$3.ml, multiplier: 1136.5225 },
        { base: new UnitBase({ abbr: 'gal', name: 'gallon' }), metricBase: units$3.ml, multiplier: 4546.09 },
        { base: new UnitBase({ abbr: 'cp', name: 'cup' }), metricBase: units$3.ml, multiplier: 240 },
        { base: new UnitBase({ abbr: 'Tbsp', name: 'tablespoon' }), metricBase: units$3.ml, multiplier: 15 },
        { base: new UnitBase({ abbr: 'tsp', name: 'teaspoon' }), metricBase: units$3.ml, multiplier: 5 },
        { base: new UnitBase({ abbr: 'oz', name: 'ounce' }), metricBase: gram, multiplier: 28.349523125 },
        { base: new UnitBase({ abbr: 'lb', name: 'pound' }), metricBase: gram, multiplier: 453.59237 },
        { base: new UnitBase({ abbr: 'st', name: 'stone' }), metricBase: gram, multiplier: 6350.29318 },
        { base: new UnitBase({ abbr: 't', name: 'ton' }), metricBase: units$3.kg, multiplier: 1016.0469088 },
    ];
    const unitsList$1 = new Set();
    const units$1 = {};
    bases.forEach((unitBase) => {
        const unit = new Unit({
            base: unitBase.base,
            baseUnit: unitBase.metricBase,
            multiplier: unitBase.multiplier,
        });
        unitsList$1.add(unit);
        units$1[unit.name] = unit;
        units$1[unit.abbr] = unit;
    });
    const mph = new CompoundUnit({
        units: [units$1.mi, units$3.h],
        abbr: 'mph',
    });
    unitsList$1.add(mph);
    units$1[mph.name] = mph;
    units$1[mph.abbr] = mph;

    var imperial = /*#__PURE__*/Object.freeze({
        __proto__: null,
        unitsList: unitsList$1,
        units: units$1,
        mph: mph,
        'default': units$1
    });

    const unitsList = new Set();
    const units = {};
    [imperial, astronomical, metric].forEach((system) => {
        system.unitsList.forEach((unit) => {
            unitsList.add(unit);
            units[unit.name] = unit;
            units[unit.abbr] = unit;
        });
    });

    /**
     * A library for looking up units from those defined in the library.
     */
    class UnitLibrary {
        constructor(unitsOverride) {
            this.unitsList = unitsList;
            this.units = units;
            if (unitsOverride === null || unitsOverride === void 0 ? void 0 : unitsOverride.length) {
                this.unitsList = new Set();
                this.units = {};
                unitsOverride.forEach((unit) => {
                    this.addUnit(unit);
                });
            }
        }
        getUnit(key) {
            if (units[key])
                return units[key];
            if (key.includes('/')) {
                return this.getCompoundUnit(key.split('/'));
            }
            throw new Error(`No units in this library instance matching key: ${key}`);
        }
        getCompoundUnit(keys) {
            let units = keys.map((key) => this.getUnit(key));
            return new CompoundUnit({ units });
        }
        hasKey(key) {
            try {
                return !!this.getUnit(key);
            }
            catch (err) {
                return false;
            }
        }
        addUnit(unit) {
            this.unitsList.add(unit);
            this.units[unit.name] = unit;
            this.units[unit.abbr] = unit;
            return this;
        }
        deleteUnit(unit) {
            this.unitsList.delete(unit);
            delete this.units[unit.name];
            delete this.units[unit.abbr];
            return this;
        }
    }
    const defaultLibrary = new UnitLibrary();

    class Scalar {
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
            this.unit;
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
            if (currentUnit.unitType === UnitType$1.Compound) {
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
            if (unit && currentUnit.unitType === UnitType$1.Compound) {
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

    var measurement = /*#__PURE__*/Object.freeze({
        __proto__: null,
        library: defaultLibrary,
        UnitLibrary: UnitLibrary,
        get UnitType () { return UnitType; },
        UnitBase: UnitBase,
        Unit: Unit,
        CompoundUnit: CompoundUnit,
        Scalar: Scalar
    });

    window.measurement = measurement;

})();
