import UnitType from './UnitType';
import { iUnit } from './Unit';
/**
 * A unit that is a combination of two or more others. ex:
 *
 * - "km/hr" a unit of speed.
 * - "km/hr/min" a unit of acceleration.
 */
export interface iCompoundUnit extends iUnit {
    /** Add a unit to the current compound's list */
    addUnit(unit: iUnit, toFront?: boolean): iCompoundUnit;
    isInverse: boolean;
}
export interface iCompoundUnitOptions {
    /** The units making up the compound */
    units: iUnit[];
    /** The name of the compound unit */
    name?: string;
    abbr?: string;
}
/**
 * A unit that is a combination of two or more others. ex:
 *
 * - "km/hr" a unit of speed.
 * - "km/hr/m" a unit of acceleration.
 */
export declare class CompoundUnit implements iCompoundUnit {
    subUnits: iUnit[];
    protected __name?: string;
    isInverse: boolean;
    /** The compound quantity measured by this unit. */
    get unitType(): UnitType;
    /**
     * The ratio of this unit in relation to the base unit. A kilogram would
     * have a multiplier of 1000, because gram is the base unit.
     */
    get multiplier(): number;
    /** Add a unit to the current compound's list */
    addUnit(unit: iUnit, toFront?: boolean): this;
    /**
     * Create a new compound unit by converting one of the units present
     * in this to another and making a copy.
     */
    convert(unit: iUnit, index?: number): iUnit | CompoundUnit;
    constructor(options: iCompoundUnitOptions);
    /**
     * Check whether the UnitType of this unit matches the UnitType of the
     * given unit.
     * */
    matchesType(unit: iUnit): boolean;
    protected __abbr?: string;
    /** The abbreviation for the unit: m/h, kg/min, etc. */
    get abbr(): string;
    /** The name of the unit: meters per hour, kilograms per minute, etc. */
    get name(): string;
    /** Creates a clone of the current unit and returns it */
    clone(options?: iCompoundUnitOptions): CompoundUnit;
    toString(useAbbreviation?: boolean): string;
}
