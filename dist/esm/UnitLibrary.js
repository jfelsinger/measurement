import { units, unitsList } from './units/index';
import { CompoundUnit } from './CompoundUnit';
/**
 * A library for looking up units from those defined in the library.
 */
export class UnitLibrary {
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
}
export const defaultLibrary = new UnitLibrary();
export default defaultLibrary;
