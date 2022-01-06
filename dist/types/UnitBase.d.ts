export interface iUnitBaseOptions {
    /** The abbreviation for this base: k, m, ly, etc. */
    abbr: string;
    /** The name for this base: meter, kilogram, etc. */
    name?: string;
}
/**
 * The base of a unit, literally the abbreviation and name of the unit without
 * more context:
 *
 * k, kilo
 * - or -
 * m, meter
 */
export interface iUnitBase extends iUnitBaseOptions {
    toString(useAbbreviation?: boolean): string;
}
/**
 * The base of a unit, literally the abbreviation and name of the unit without
 * more context:
 *
 * k, kilo
 * - or -
 * m, meter
 */
export declare class UnitBase implements iUnitBase {
    /** The abbreviation for this base: k, m, ly, etc. */
    abbr: string;
    /** The name for this base: meter, kilogram, etc. */
    name?: string;
    static get(options: iUnitBase | iUnitBaseOptions): iUnitBase;
    constructor(options: iUnitBaseOptions);
    toString(useAbbreviation?: boolean): string;
}
export default UnitBase;
