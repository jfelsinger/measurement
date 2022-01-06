import UnitType from './UnitType';
import { iUnit } from './Unit';
import combineUnitMultipliers from './lib/combineUnitMultipliers';
import getUnitTypeName from './lib/getUnitTypeName';

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
export class CompoundUnit implements iCompoundUnit {
    subUnits: iUnit[] = [];
    protected __name?: string;
    isInverse: boolean = false;

    /** The compound quantity measured by this unit. */
    get unitType() { return UnitType.Compound; }

    /**
     * The ratio of this unit in relation to the base unit. A kilogram would
     * have a multiplier of 1000, because gram is the base unit.
     */
    get multiplier() {
        return combineUnitMultipliers(this.subUnits);
    }

    /** Add a unit to the current compound's list */
    addUnit(unit: iUnit, toFront: boolean = false) {
        if (toFront)
            this.subUnits.unshift(unit);
        else
            this.subUnits.push(unit);

        return this;
    }

    /**
     * Create a new compound unit by converting one of the units present
     * in this to another and making a copy.
     */
    convert(unit: iUnit, index: number = 0) {
        if (this.matchesType(unit))
            return unit;
        // else:

        let units = this.subUnits.slice(0);

        if (!unit.matchesType(units[index]))
            throw new Error(
                'Invalid Units: a unit of type `' +
                    getUnitTypeName(units[index]) +
                '` cannot be converted to a unit of type `' +
                    getUnitTypeName(unit) +
                '`'
            );

        units[index] = unit;
        return new CompoundUnit({
            units,
        });

    }

    constructor(options: iCompoundUnitOptions) {
        this.subUnits = options.units || [];
        this.__name = options.name;
        this.__abbr = options.abbr;
    }

    /**
     * Check whether the UnitType of this unit matches the UnitType of the
     * given unit.
     * */
    matchesType(unit: iUnit) {
        if (unit.unitType !== UnitType.Compound)
            return false;

        let compound = <CompoundUnit>unit;
        return compound.subUnits.every((su, i) =>
            this.subUnits[i] && this.subUnits[i].matchesType(su));
    }

    protected __abbr?: string;

    /** The abbreviation for the unit: m/h, kg/min, etc. */
    get abbr() { return this.__abbr ?? this.toString(); }

    /** The name of the unit: meters per hour, kilograms per minute, etc. */
    get name() {
        return this.__name || this.toString(false);
    }

    /** Creates a clone of the current unit and returns it */
    clone(options?: iCompoundUnitOptions) {
        let baseOptions = {
            units: this.subUnits,
            name: this.__name,
        }

        if (options?.units) baseOptions.units = options.units;
        if (options?.name) baseOptions.name = options.name;

        return new CompoundUnit(baseOptions);
    }

    toString(useAbbreviation: boolean = true) {
        if (useAbbreviation && this.__abbr)
            return this.__abbr;

        return this.subUnits
            .map(su => su.toString(useAbbreviation))
            .join(useAbbreviation ? '/' : ' per ');
    }
}


