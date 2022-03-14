import { iUnitLibrary } from './UnitLibrary';
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
export declare const measurementRegex: RegExp;
export declare class Measurement {
    library: iUnitLibrary;
    units: {
        [key: string]: iUnit;
    };
    get unit(): {
        [key: string]: iUnit;
    };
    measurement(...args: [string] | [number, iUnit | string]): Scalar;
    measure(...args: [string] | [number, iUnit | string]): Scalar;
    parseUnit(unitString: string): Scalar;
    makeScalar(unit: iUnit | string): (value: number) => Scalar;
    constructor(library?: iUnitLibrary);
    registerLibrary(library: iUnitLibrary): void;
    addUnit(unit: iUnit): this;
    deleteUnit(unit: iUnit): this;
}
export declare type ScalarUnitHelper = {
    [key: string]: (value: number) => Scalar;
};
export declare function MeasurementFactory(library?: iUnitLibrary): Measurement & ScalarUnitHelper;
export declare const measurement: Measurement & ScalarUnitHelper;
export default measurement;
