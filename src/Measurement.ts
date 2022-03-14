import { defaultLibrary, iUnitLibrary } from './UnitLibrary';
import { iUnit } from './Unit';
import { Scalar } from './Scalar';

/**
 *  (?<value>[-+]?[0-9.]*)
 *  Gets the value, allowing decimals, plus, and minus
 *
 *  \s*
 *  Allows any amount of white-space (or not) between the value and unit
 *
 *  (?<unit>.*)
 *  Capture the value of the unit
 */
export const measurementRegex = /^(?<value>[-+]?[0-9.]*)\s*(?<unit>.*)$/ig;

export class Measurement {
    library: iUnitLibrary = defaultLibrary;
    units: { [key:string]: iUnit } = {};
    get unit() { return this.units; }

    measurement(...args: [string]|[number, iUnit|string]) { return this.measure(...args); }

    measure(...args: [string]|[number, iUnit|string]) {
        if (args.length === 1) {
            return this.parseUnit(args[0]);
        }

        let value = args[0];
        let unit = args[1];

        if (!unit) {
            throw new Error('The unit argument provided is null or invalid');
        }

        return this.makeScalar(args[1])(args[0]);
    }

    parseUnit(unitString: string) {
        unitString = unitString.trim();
        let results = measurementRegex.exec(unitString);
        let resultUnit: iUnit|null = null;
        let resultValue: number|null = null;

        if (results?.groups) {
            if (results?.groups?.unit && this.library.hasKey(results.groups.unit)) {
                resultUnit = this.library.getUnit(results.groups.unit);
            }

            if (results?.groups?.value) {
                resultValue = parseFloat(results.groups.value);
            }
        }

        if (resultUnit === null || !resultValue) {
            throw new Error(
                'Unable to parse the given unit string: `' +
                unitString +
                '`'
            )
        }

        return this.makeScalar(resultUnit)(resultValue);
    }

    makeScalar(unit: iUnit|string) {
        let library = this.library;
        return (value: number) => new Scalar({
            unit,
            value,
            library,
        });
    }

    constructor(library: iUnitLibrary = defaultLibrary) {
        if (library) this.registerLibrary(library);
    }

    registerLibrary(library: iUnitLibrary) {
        this.library = library;
        library.unitsList.forEach((unit) => this.addUnit(unit));
    }

    addUnit(unit: iUnit) {
        this.library.addUnit(unit);

        let self = (<any>this);
        if (!self[unit.name]) self[unit.name] = this.makeScalar(unit);
        if (!self[unit.abbr]) self[unit.abbr] = this.makeScalar(unit);

        this.units[unit.name] = unit;
        this.units[unit.abbr] = unit;
        return this;
    }

    deleteUnit(unit: iUnit) {
        this.library.deleteUnit(unit);

        let self = (<any>this);
        if (self[unit.name]?.name === unit.name) delete self[unit.name];
        if (self[unit.abbr]?.name === unit.name) delete self[unit.abbr];

        delete this.units[unit.name];
        delete this.units[unit.abbr];
        return this;
    }
}

export type ScalarUnitHelper = { [key:string]: (value:number) => Scalar };
export function MeasurementFactory(library: iUnitLibrary = defaultLibrary) {
    return new Measurement(library) as Measurement & ScalarUnitHelper;
}

export const measurement = new Measurement() as Measurement & ScalarUnitHelper;
export default measurement;
