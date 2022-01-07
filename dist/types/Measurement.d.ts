import { iUnitLibrary } from './UnitLibrary';
import { iUnit } from './Unit';
import { Scalar } from './Scalar';
export declare class Measurement {
    library: iUnitLibrary;
    units: {
        [key: string]: iUnit;
    };
    get unit(): {
        [key: string]: iUnit;
    };
    measurement(...args: [string] | [number, iUnit | string]): Scalar | undefined;
    measure(...args: [string] | [number, iUnit | string]): Scalar | undefined;
    parseUnit(unitString: string): Scalar | undefined;
    makeScalar(unit: iUnit | string): (value: number) => Scalar;
    constructor(library?: iUnitLibrary);
    addUnit(unit: iUnit): this;
    deleteUnit(unit: iUnit): this;
}
export declare const measurement: Measurement;
export default measurement;
