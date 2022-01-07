import { defaultLibrary, iUnitLibrary } from './UnitLibrary';
import { iUnit } from './Unit';
import { Scalar } from './Scalar';

const measurementRegex = /^(?<value>[0-9.]*)(?<unit>.*)$/ig;

export class Measurement {
    library: iUnitLibrary = defaultLibrary;
    units: { [key:string]: iUnit } = {};
    get unit() { return this.units; }

    measurement(...args: [string]|[number, iUnit|string]) { return this.measure(...args); }

    measure(...args: [string]|[number, iUnit|string]) {
        if (args.length === 1) {
            return this.parseUnit(args[0]);
        }

        return new Scalar({ value: args[0], unit: args[1] });
    }

    parseUnit(unitString: string) {
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

        if (resultUnit !== null && resultValue !== null) {
            return new Scalar({ value: resultValue, unit: resultUnit });
        }
    }

    makeScalar(unit: iUnit|string) {
        return (value: number) => new Scalar({ unit, value });
    }

    constructor(library: iUnitLibrary = defaultLibrary) {
        if (library) this.library = library;

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

export const measurement = new Measurement();
export default measurement;
