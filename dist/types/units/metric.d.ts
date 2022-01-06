import { iUnit, Unit } from '../Unit';
export declare const unitsList: Set<iUnit>;
export declare const units: {
    [key: string]: iUnit;
};
export default units;
export declare const second: Unit;
export declare const minute: Unit;
export declare const hour: Unit;
export declare const day: Unit;
export declare const week: Unit;
export declare const year: Unit;
export declare const meter: Unit;
export declare const gram: Unit;
export declare const litre: Unit;
export declare const bit: Unit;
export declare const byte: Unit;
export declare const siPrefixes: {
    prefix: {
        abbr: string;
        name: string;
    };
    multiplier: number;
}[];
