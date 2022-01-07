import { iUnit } from './Unit';
import { iUnitLibrary } from './UnitLibrary';
interface iConvertTo {
    (unitArg: iUnit | string, index?: number): iScalar;
    [name: string]: (index?: number) => iScalar;
}
interface iConvertPer {
    (unitArg: iUnit | string): iScalar;
    [name: string]: () => iScalar;
}
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
    as: iConvertTo;
    /** Converts the current instance of scalar to another unit of measure */
    to: iConvertTo;
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
    value: number;
    unit: iUnit;
}
export interface iScalarOptions {
    value: number;
    unit: iUnit | string;
    library?: iUnitLibrary;
}
export declare class Scalar implements iScalar {
    protected __value: number;
    unit: iUnit;
    library: iUnitLibrary;
    constructor(options: iScalarOptions);
    get value(): number;
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
    as: iConvertTo;
    protected convertAs(unitArg: iUnit | string, index?: number): Scalar;
    /**
     * Converts the current instance of scalar to another unit of measure
     */
    to: iConvertTo;
    protected convertTo(unitArg: iUnit | string, index?: number): this;
    /**
     * Make a compound unit representing the current unit per the given one.
     *
     * km.per(hr); // km/hr
     * someAmountOfKm.per(hr); // km/hr
     */
    per: iConvertPer;
    protected convertPer(unitArg: iUnit | string): Scalar;
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
