import { iUnit } from './Unit';
import { iCompoundUnit } from './CompoundUnit';
export interface iUnitLibrary {
    unitsList: Set<iUnit>;
    units: {
        [key: string]: iUnit;
    };
    getUnit(key: string): iUnit;
    addUnit(unit: iUnit): iUnitLibrary;
    deleteUnit(unit: iUnit): iUnitLibrary;
    hasKey(key: string): boolean;
}
/**
 * A library for looking up units from those defined in the library.
 */
export declare class UnitLibrary {
    unitsList: Set<iUnit>;
    units: {
        [key: string]: iUnit;
    };
    constructor(unitsOverride?: iUnit[]);
    getUnit(key: string): iUnit;
    getCompoundUnit(keys: string[]): iCompoundUnit;
    hasKey(key: string): boolean;
    addUnit(unit: iUnit): this;
    deleteUnit(unit: iUnit): this;
}
export declare const defaultLibrary: UnitLibrary;
export default defaultLibrary;
