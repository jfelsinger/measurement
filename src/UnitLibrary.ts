import { iUnit } from './Unit';
import { units, unitsList } from './units/index';
import { CompoundUnit, iCompoundUnit } from './CompoundUnit';

export interface iUnitLibrary {
    unitsList: Set<iUnit>;
    units: { [key:string]: iUnit };
    getUnit(key: string): iUnit;
    addUnit(unit: iUnit): iUnitLibrary;
    deleteUnit(unit: iUnit): iUnitLibrary;
    clone(): iUnitLibrary;

    hasKey(key: string): boolean;
}

/**
 * A library for looking up units from those defined in the library.
 */
export class UnitLibrary {
    unitsList: Set<iUnit> = unitsList;
    units: { [key:string]: iUnit } = units;

    constructor(unitsOverride?: iUnit[]) {
        if (unitsOverride?.length) {
            this.unitsList = new Set<iUnit>();
            this.units = {};
            unitsOverride.forEach((unit) => {
                this.addUnit(unit);
            });
        }
    }

    getUnit(key: string): iUnit {
        if (units[key])
            return units[key];

        if (key.includes('/')) {
            return this.getCompoundUnit(key.split('/'));
        }

        throw new Error(`No units in this library instance matching key: ${key}`);
    }

    getCompoundUnit(keys: string[]): iCompoundUnit {
        let units = keys.map((key) => this.getUnit(key));
        return new CompoundUnit({ units });
    }

    hasKey(key: string) {
        try {
            return !!this.getUnit(key);
        } catch(err) {
            return false;
        }
    }

    addUnit(unit: iUnit) {
        this.unitsList.add(unit);
        this.units[unit.name] = unit;
        this.units[unit.abbr] = unit;
        unit.aliases?.forEach((alias) => this.units[alias] = unit);
        return this;
    }

    deleteUnit(unit: iUnit) {
        this.unitsList.delete(unit);
        delete this.units[unit.name];
        delete this.units[unit.abbr];
        return this;
    }

    clone() {
        return new UnitLibrary(Array.from(this.unitsList));
    }
}

export const defaultLibrary = new UnitLibrary();
export default defaultLibrary;
