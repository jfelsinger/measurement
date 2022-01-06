import UnitType from './UnitType';
import { iUnit } from './Unit';
import { iCompoundUnit, CompoundUnit } from './CompoundUnit';
import { iUnitLibrary, defaultLibrary } from './UnitLibrary';
import { multiply, divide } from './lib/safeMath';

export default iScalar
export interface iScalar {
    /**
     * Returns a numeric value representative of the scalar value.
     * optionally, get the value converted from another base unit.
     *
     * 25km -> 25
     * 25km -> 2500(m)
     */
    getValue(unitArg?: iUnit|string, index?: number): number;

    /** Returns an equivalent scalar based on a different unit */
    as(unitArg: iUnit|string, index?: number): iScalar;

    /** Converts the current instance of scalar to another unit of measure */
    to(unitArg: iUnit|string, index?: number): iScalar;

    /**
     * Make a compound unit representing the current unit per the given one.
     *
     * km.per(hr); // km/hr
     * someAmountOfKm.per(hr); // km/hr
     */
    per(unitArg: iUnit|string): iScalar;

    /** Return a clone of the current scalar instance */
    clone(options?: { value?: number, unit?: iUnit, library?: iUnitLibrary }): iScalar;

    /**
     * Get a string representation of the scalar value.
     *
     * - '25km'
     * - '25 kilometers'
     */
    toString(useAbbreviation?: boolean): string;
}

export interface iScalarOptions {
    value: number,
    unit: iUnit|string,
    library?: iUnitLibrary
}

export class Scalar implements iScalar {
    value: number;
    unit: iUnit;
    library:iUnitLibrary;

    constructor(options: iScalarOptions) {
        const library = options.library ?? defaultLibrary;
        this.library = library;

        if (typeof(options.unit) === 'string')
            this.unit = library.getUnit(options.unit);
        else
            this.unit = options.unit;

        this.value = options.value;
    }

    static get(value: number, unit: iUnit|string, library?: iUnitLibrary) {
        return new Scalar({
            value,
            unit,
            library,
        });
    }

    /**
     * Returns a numeric value representative of the scalar value.
     * optionally, get the value converted from another base unit.
     *
     * 25km -> 25
     * 25km -> 2500(m)
     */
    getValue(unitArg?: iUnit|string, index: number = 0) {
        if (!unitArg)
            return this.value;
        // else:

        const currentUnit = this.unit;
        let unit = this.getConvertedUnit(unitArg, index);
        return multiply(this.value, divide(currentUnit.multiplier, unit.multiplier));
    }

    /**
     * Returns an equivalent scalar based on a different unit
     */
    as(unitArg: iUnit|string, index: number = 0) {
        const currentUnit = this.unit;
        let unit = this.getConvertedUnit(unitArg, index);
        let value = this.getValue(unitArg, index);
        return this.clone({ unit, value })
    }

    /**
     * Converts the current instance of scalar to another unit of measure
     */
    to(unitArg: iUnit|string, index: number = 0) {
        let converted = this.as(unitArg, index);
        this.value = converted.value;
        this.unit = converted.unit;
        return this;
    }

    /**
     * Make a compound unit representing the current unit per the given one.
     *
     * km.per(hr); // km/hr
     * someAmountOfKm.per(hr); // km/hr
     */
    per(unitArg: iUnit|string) {
        let resultUnit: iCompoundUnit;
        let currentUnit = this.unit.clone();
        let unit = this.getUnitFromLibrary(unitArg);

        if (currentUnit.unitType === UnitType.Compound) {
            resultUnit = <CompoundUnit>currentUnit;
        } else {
            resultUnit = new CompoundUnit({ units: [currentUnit] });
        }

        resultUnit.addUnit(unit);

        return this.clone({
            value: this.value,
            unit: resultUnit,
        });
    }

    /**
     * Convert the unit of the scalar to another and return it.
     */
    protected getConvertedUnit(unitArg: iUnit|string, index: number = 0): iUnit {
        const currentUnit = this.unit;
        let unit = this.getUnitFromLibrary(unitArg);

        if (unit && currentUnit.unitType === UnitType.Compound) {
            let compound = <CompoundUnit>currentUnit;
            unit = compound.convert(unit, index);
        }

        if (!unit.matchesType(currentUnit))
            throw new Error(
                'Invalid Units: a unit of type `' +
                this.unit +
                '` cannot be converted to a unit of type `' +
                unit + '`'
            );

        return unit;
    }

    /**
     * Grabs a unit from the internal unit library
     */
    protected getUnitFromLibrary(unitArg: iUnit|string) {
        let unit: iUnit;
        if (typeof(unitArg) === 'string')
            unit = this.library.getUnit(unitArg);
        else
            unit = unitArg;

        return unit;
    }

    /** Return a clone of the current scalar instance */
    clone(options?: { value?: number, unit?: iUnit, library?: iUnitLibrary }) {
        return new Scalar({
            value: options?.value ?? this.value,
            unit: options?.unit ?? this.unit.clone(),
            library: options?.library ?? this.library,
        });
    }

    /**
     * Get a string representation of the scalar value.
     *
     * - '25km'
     * - '25 kilometers'
     */
    toString(useAbbreviation: boolean = true, tryToPluralize: boolean = true) {
        if (useAbbreviation)
            return `${this.value}${this.unit.toString(useAbbreviation)}`;

        if (tryToPluralize && this.value != 1)
            return `${this.value} ${this.unit.toString(useAbbreviation)}s`;

        return `${this.value} ${this.unit.toString(useAbbreviation)}`;
    }
}
