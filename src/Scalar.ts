import UnitType from './UnitType';
import { iUnit } from './Unit';
import { iCompoundUnit, CompoundUnit } from './CompoundUnit';
import { iUnitLibrary, defaultLibrary } from './UnitLibrary';
import { multiply, divide } from './lib/safeMath';

interface iConvertTo {
    (unitArg: iUnit|string, index?: number): iScalar,
    [name:string]: (index?: number) => iScalar,
}

interface iConvertPer {
    (unitArg: iUnit|string): iScalar,
    [name:string]: () => iScalar,
}


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
    as: iConvertTo;

    /** Converts the current instance of scalar to another unit of measure */
    to: iConvertTo;

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

    value: number,
    unit: iUnit,
}

export interface iScalarOptions {
    value: number,
    unit: iUnit|string,
    library?: iUnitLibrary
}

export class Scalar implements iScalar {
    protected __value: number;
    unit: iUnit;
    library:iUnitLibrary;


    constructor(options: iScalarOptions) {
        const library = options.library ?? defaultLibrary;
        this.library = library;

        if (typeof(options.unit) === 'string')
            this.unit = library.getUnit(options.unit);
        else
            this.unit = options.unit;

        this.__value = options.value;

        const as = this.as = (<any>this).convertAs.bind(this);
        const to = this.to = (<any>this).convertTo.bind(this);
        const per = this.per = (<any>this).convertPer.bind(this);

        this.library.unitsList.forEach((unit) => {
            this.as[unit.name] = (index?: number) => as(unit, index);
            // this.as[unit.abbr] = (index?: number) => this.as(unit, index);

            this.to[unit.name] = (index?: number) => this.to(unit, index);
            // this.to[unit.abbr] = (index?: number) => this.to(unit, index);

            this.per[unit.name] = () => per(unit);
            // this.per[unit.abbr] = () => this.per(unit);
        });
    }

    get value(): number { return this.getValue(); }

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
            return this.__value;
        // else:

        const currentUnit = this.unit;
        let unit = this.getConvertedUnit(unitArg, index);
        return multiply(this.__value, divide(currentUnit.multiplier, unit.multiplier));
    }

    /**
     * Returns an equivalent scalar based on a different unit
     */
    as: iConvertTo;
    protected convertAs(unitArg: iUnit|string, index: number = 0) {
        let unit = this.getConvertedUnit(unitArg, index);
        let value = this.getValue(unitArg, index);
        return this.clone({ unit, value })
    }

    /**
     * Converts the current instance of scalar to another unit of measure
     */
    to: iConvertTo;
    protected convertTo(unitArg: iUnit|string, index: number = 0) {
        let converted = this.as(unitArg, index);
        this.__value = converted.value;
        this.unit = converted.unit;
        return this;
    }

    /**
     * Make a compound unit representing the current unit per the given one.
     *
     * km.per(hr); // km/hr
     * someAmountOfKm.per(hr); // km/hr
     */
    per: iConvertPer;
    protected convertPer(unitArg: iUnit|string) {
        let resultUnit: iCompoundUnit;
        let currentUnit = this.unit.clone();
        let currentUnit2 = this.unit;
        let unit = this.getUnitFromLibrary(unitArg);

        if (currentUnit.unitType === UnitType.Compound) {
            resultUnit = <CompoundUnit>currentUnit;
        } else {
            resultUnit = new CompoundUnit({ units: [currentUnit] });
        }

        resultUnit.addUnit(unit);

        return this.clone({
            value: this.__value,
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
                this.unit.toString(false) +
                '` cannot be converted to a unit of type `' +
                unit.toString(false) + '`'
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
            value: options?.value ?? this.__value,
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

        if (tryToPluralize && this.__value != 1)
            return `${this.value} ${this.unit.toString(useAbbreviation)}s`;

        return `${this.value} ${this.unit.toString(useAbbreviation)}`;
    }
}
