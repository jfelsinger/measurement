"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measurement = exports.MeasurementFactory = exports.Measurement = exports.measurementRegex = void 0;
const UnitLibrary_1 = require("./UnitLibrary");
const Scalar_1 = require("./Scalar");
/**
 *  (?<value>[-+]?[0-9.]*)
 *  Gets the value, allowing decimals, plus, and minus
 *
 *  \s*
 *  Allows any amount of white-space (or not) between the value and unit
 *
 *  (?<unit>.*)
 *  Capture the value of the unit
 */
exports.measurementRegex = /^(?<value>[-+]?[0-9.]*)\s*(?<unit>.*)$/ig;
class Measurement {
    constructor(library = UnitLibrary_1.defaultLibrary) {
        this.library = UnitLibrary_1.defaultLibrary;
        this.units = {};
        if (library)
            this.registerLibrary(library);
    }
    get unit() { return this.units; }
    measurement(...args) { return this.measure(...args); }
    measure(...args) {
        if (args.length === 1) {
            return this.parseUnit(args[0]);
        }
        let value = args[0];
        let unit = args[1];
        if (!unit) {
            throw new Error('The unit argument provided is null or invalid');
        }
        return this.makeScalar(args[1])(args[0]);
    }
    parseUnit(unitString) {
        var _a, _b;
        unitString = unitString.trim();
        let results = exports.measurementRegex.exec(unitString);
        let resultUnit = null;
        let resultValue = null;
        if (results === null || results === void 0 ? void 0 : results.groups) {
            if (((_a = results === null || results === void 0 ? void 0 : results.groups) === null || _a === void 0 ? void 0 : _a.unit) && this.library.hasKey(results.groups.unit)) {
                resultUnit = this.library.getUnit(results.groups.unit);
            }
            if ((_b = results === null || results === void 0 ? void 0 : results.groups) === null || _b === void 0 ? void 0 : _b.value) {
                resultValue = parseFloat(results.groups.value);
            }
        }
        if (resultUnit === null || !resultValue) {
            throw new Error('Unable to parse the given unit string: `' +
                unitString +
                '`');
        }
        return this.makeScalar(resultUnit)(resultValue);
    }
    makeScalar(unit) {
        let library = this.library;
        return (value) => new Scalar_1.Scalar({
            unit,
            value,
            library,
        });
    }
    registerLibrary(library) {
        this.library = library;
        library.unitsList.forEach((unit) => this.addUnit(unit));
    }
    addUnit(unit) {
        this.library.addUnit(unit);
        let self = this;
        if (!self[unit.name])
            self[unit.name] = this.makeScalar(unit);
        if (!self[unit.abbr])
            self[unit.abbr] = this.makeScalar(unit);
        this.units[unit.name] = unit;
        this.units[unit.abbr] = unit;
        return this;
    }
    deleteUnit(unit) {
        var _a, _b;
        this.library.deleteUnit(unit);
        let self = this;
        if (((_a = self[unit.name]) === null || _a === void 0 ? void 0 : _a.name) === unit.name)
            delete self[unit.name];
        if (((_b = self[unit.abbr]) === null || _b === void 0 ? void 0 : _b.name) === unit.name)
            delete self[unit.abbr];
        delete this.units[unit.name];
        delete this.units[unit.abbr];
        return this;
    }
}
exports.Measurement = Measurement;
function MeasurementFactory(library = UnitLibrary_1.defaultLibrary) {
    return new Measurement(library);
}
exports.MeasurementFactory = MeasurementFactory;
exports.measurement = new Measurement();
exports.default = exports.measurement;
