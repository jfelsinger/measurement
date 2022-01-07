import { UnitType } from './UnitType';
import { iUnitBase, iUnitBaseOptions, UnitBase } from './UnitBase';
import { multiply } from './lib/safeMath';

interface iUnitOptionsA {
    base: iUnitBase|iUnitBaseOptions;
    baseUnit?: iUnit;
    prefix?: iUnitBase|iUnitBaseOptions;

    multiplier?: number;
    unitType?: UnitType;
    name?: string;
}

interface iUnitOptionsB {
    baseUnit: iUnit;
    base?: iUnitBase|iUnitBaseOptions;
    prefix?: iUnitBase|iUnitBaseOptions;

    multiplier?: number;
    unitType?: UnitType;
    name?: string;
}


export type iUnitOptions = iUnitOptionsA|iUnitOptionsB;

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
export class Unit implements iUnit {
    base: iUnitBase;
    prefix?: iUnitBase;
    baseMultiplier: number;

    /** The type of quantity measured by this unit: mass, time, length, etc. */
    unitType: UnitType;

    /**
     * The base unit for the current unit.
     * A kilogram unit would have a baseUnit of a `gram` for example
     */
    baseUnit?: iUnit;

    protected __name?: string;

    /** The abbreviation for the unit: m, kg, etc. */
    get abbr() {
        return this.toString();
    }

    /** The name of the unit: meter, kilogram, etc. */
    get name() {
        return this.__name || this.toString(false);
    }

    /**
     * The ratio of this unit in relation to the base unit. A kilogram would
     * have a multiplier of 1000, because gram is the base unit.
     */
    get multiplier() {
        const baseUnitMultiplier: number = this.baseUnit?.multiplier ?? 1;
        return multiply(this.baseMultiplier, baseUnitMultiplier);
    }

    toString(useAbbreviation: boolean = true) {
        if (useAbbreviation)
            return (this?.prefix?.abbr ?? '') + this.base.abbr;

        return (this?.prefix?.name ?? '') + this.base.name;
    }

    /**
     * Check whether the UnitType of this unit matches the UnitType of the
     * given unit.
     * */
    matchesType(unit: iUnit) {
        return this.unitType === unit.unitType;
    }

    constructor(options: iUnitOptions) {
        this.base = UnitBase.get(options.base || (<Unit>options.baseUnit)?.base);

        this.baseUnit = options.baseUnit;
        this.unitType =
            options.unitType ||
            options.baseUnit?.unitType ||
            UnitType.Unknown;

        if (options.prefix)
            this.prefix = UnitBase.get(options.prefix);

        this.baseMultiplier = isNaN(options.multiplier as any) ? 1 : parseFloat(`${options.multiplier}`);
        this.__name = options.name;
    }

    /** Creates a clone of the current unit and returns it */
    clone(options?: iUnitOptions) {
        let baseOptions = {
            base: this.base,
            baseUnit: this.baseUnit,
            prefix: this.prefix,

            unitType: this.unitType,
            multiplier: this.baseMultiplier,
            name: this.__name,
        }

        if (options?.base) baseOptions.base = new UnitBase(options.base);
        if (options?.baseUnit) baseOptions.baseUnit = options.baseUnit;
        if (options?.prefix) baseOptions.prefix = new UnitBase(options.prefix);
        if (options?.unitType) baseOptions.unitType = options.unitType;
        if (options?.multiplier) baseOptions.multiplier = options.multiplier;
        if (options?.name) baseOptions.name = options.name;

        return new Unit(baseOptions);
    }
}

export default Unit
