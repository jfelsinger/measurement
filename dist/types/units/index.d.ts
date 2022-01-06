import { iUnit } from '../Unit';
import * as astronomical from './astronomical';
import * as imperial from './imperial';
import * as metric from './metric';
export declare const unitsList: Set<iUnit>;
export declare const units: {
    [key: string]: iUnit;
};
export declare const systems: {
    imperial: typeof imperial;
    astronomical: typeof astronomical;
    metric: typeof metric;
};
