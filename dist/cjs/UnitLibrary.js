"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLibrary = exports.UnitLibrary = void 0;
const index_1 = require("./units/index");
const CompoundUnit_1 = require("./CompoundUnit");
/**
 * A library for looking up units from those defined in the library.
 */
class UnitLibrary {
    constructor(unitsOverride) {
        this.unitsList = index_1.unitsList;
        this.units = index_1.units;
        if (unitsOverride === null || unitsOverride === void 0 ? void 0 : unitsOverride.length) {
            this.unitsList = new Set();
            this.units = {};
            unitsOverride.forEach((unit) => {
                this.addUnit(unit);
            });
        }
    }
    getUnit(key) {
        if (index_1.units[key])
            return index_1.units[key];
        if (key.includes('/')) {
            return this.getCompoundUnit(key.split('/'));
        }
        throw new Error(`No units in this library instance matching key: ${key}`);
    }
    getCompoundUnit(keys) {
        let units = keys.map((key) => this.getUnit(key));
        return new CompoundUnit_1.CompoundUnit({ units });
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
        var _a;
        this.unitsList.add(unit);
        this.units[unit.name] = unit;
        this.units[unit.abbr] = unit;
        (_a = unit.aliases) === null || _a === void 0 ? void 0 : _a.forEach((alias) => this.units[alias] = unit);
        return this;
    }
    deleteUnit(unit) {
        this.unitsList.delete(unit);
        delete this.units[unit.name];
        delete this.units[unit.abbr];
        return this;
    }
    clone() {
        return new UnitLibrary(Array.from(this.unitsList));
    }
}
exports.UnitLibrary = UnitLibrary;
exports.defaultLibrary = new UnitLibrary();
exports.default = exports.defaultLibrary;
