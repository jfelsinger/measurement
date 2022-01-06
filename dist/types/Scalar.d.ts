import { iUnit } from './Unit';
import { iUnitLibrary } from './UnitLibrary';
export default iScalar;
export interface iScalar {
    /**
     * Returns a numeric value representative of the scalar value.
     * optionally, get the value converted from another base unit.
     *
     * 25km -> 25
     * 25km -> 2500(m)
     */
    getValue(unitArg?: iUnit | string, index?: number): number;
    /** Returns an equivalent scalar based on a different unit */
    as(unitArg: iUnit | string, index?: number): iScalar;
    /** Converts the current instance of scalar to another unit of measure */
    to(unitArg: iUnit | string, index?: number): iScalar;
    /**
     * Make a compound unit representing the current unit per the given one.
     *
     * km.per(hr); // km/hr
     * someAmountOfKm.per(hr); // km/hr
     */
    per(unitArg: iUnit | string): iScalar;
    /** Return a clone of the current scalar instance */
    clone(options?: {
        value?: number;
        unit?: iUnit;
        library?: iUnitLibrary;
    }): iScalar;
    /**
     * Get a string representation of the scalar value.
     *
     * - '25km'
     * - '25 kilometers'
     */
    toString(useAbbreviation?: boolean): string;
}
export interface iScalarOptions {
    value: number;
    unit: iUnit | string;
    library?: iUnitLibrary;
}
export declare class Scalar implements iScalar {
    value: number;
    unit: iUnit;
    library: iUnitLibrary;
    constructor(options: iScalarOptions);
    static get(value: number, unit: iUnit | string, library?: iUnitLibrary): Scalar;
    /**
     * Returns a numeric value representative of the scalar value.
     * optionally, get the value converted from another base unit.
     *
     * 25km -> 25
     * 25km -> 2500(m)
     */
    getValue(unitArg?: iUnit | string, index?: number): number;
    /**
     * Returns an equivalent scalar based on a different unit
     */
    as(unitArg: iUnit | string, index?: number): Scalar;
    /**
     * Converts the current instance of scalar to another unit of measure
     */
    to(unitArg: iUnit | string, index?: number): this;
    /**
     * Make a compound unit representing the current unit per the given one.
     *
     * km.per(hr); // km/hr
     * someAmountOfKm.per(hr); // km/hr
     */
    per(unitArg: iUnit | string): Scalar;
    /**
     * Convert the unit of the scalar to another and return it.
     */
    protected getConvertedUnit(unitArg: iUnit | string, index?: number): iUnit;
    /**
     * Grabs a unit from the internal unit library
     */
    protected getUnitFromLibrary(unitArg: iUnit | string): iUnit;
    /** Return a clone of the current scalar instance */
    clone(options?: {
        value?: number;
        unit?: iUnit;
        library?: iUnitLibrary;
    }): Scalar;
    /**
     * Get a string representation of the scalar value.
     *
     * - '25km'
     * - '25 kilometers'
     */
    toString(useAbbreviation?: boolean, tryToPluralize?: boolean): string;
}
