import { UnitType } from './UnitType';
import { iUnitBase, iUnitBaseOptions } from './UnitBase';
interface iUnitOptionsA {
    base: iUnitBase | iUnitBaseOptions;
    baseUnit?: iUnit;
    prefix?: iUnitBase | iUnitBaseOptions;
    multiplier?: number;
    unitType?: UnitType;
    name?: string;
    aliases?: string[];
}
interface iUnitOptionsB {
    baseUnit: iUnit;
    base?: iUnitBase | iUnitBaseOptions;
    prefix?: iUnitBase | iUnitBaseOptions;
    multiplier?: number;
    unitType?: UnitType;
    name?: string;
    aliases?: string[];
}
export declare type iUnitOptions = iUnitOptionsA | iUnitOptionsB;
/**
 * Represents a unit of measurement
 */
export interface iUnit extends iUnitBase {
    /**
     * The base unit for the current unit.
     * A kilogram unit would have a baseUnit of a `gram` for example
     */
    baseUnit?: iUnit;
    /** The type of quantity measured by this unit: mass, time, length, etc. */
    unitType: UnitType;
    /** The name of the unit: meter, kilogram, etc. */
    name: string;
    aliases: string[];
    /**
     * The ratio of this unit in relation to the base unit. A kilogram would
     * have a multiplier of 1000, because gram is the base unit.
     */
    multiplier: number;
    toString(useAbbreviation?: boolean): string;
    /**
     * Check whether the UnitType of this unit matches the UnitType of the
     * given unit.
     * */
    matchesType(unit: iUnit): boolean;
    /** Creates a clone of the current unit and returns it */
    clone(): iUnit;
}
/**
 * Represents a unit of measurement
 */
export declare class Unit implements iUnit {
    base: iUnitBase;
    prefix?: iUnitBase;
    baseMultiplier: number;
    aliases: string[];
    /** The type of quantity measured by this unit: mass, time, length, etc. */
    unitType: UnitType;
    /**
     * The base unit for the current unit.
     * A kilogram unit would have a baseUnit of a `gram` for example
     */
    baseUnit?: iUnit;
    protected __name?: string;
    /** The abbreviation for the unit: m, kg, etc. */
    get abbr(): string;
    /** The name of the unit: meter, kilogram, etc. */
    get name(): string;
    /**
     * The ratio of this unit in relation to the base unit. A kilogram would
     * have a multiplier of 1000, because gram is the base unit.
     */
    get multiplier(): number;
    toString(useAbbreviation?: boolean): string;
    /**
     * Check whether the UnitType of this unit matches the UnitType of the
     * given unit.
     * */
    matchesType(unit: iUnit): boolean;
    constructor(options: iUnitOptions);
    /** Creates a clone of the current unit and returns it */
    clone(options?: iUnitOptions): Unit;
}
export default Unit;
