import { iUnit } from '../Unit';

import * as astronomical from './astronomical';
import * as imperial from './imperial';
import * as metric from './metric';

export const unitsList: Set<iUnit> = new Set<iUnit>();
export const units: { [key:string]: iUnit } = {};
export const systems = {
    imperial,
    astronomical,
    metric,
};

[imperial, astronomical, metric].forEach((system) => {
    system.unitsList.forEach((unit) => {
        unitsList.add(unit);
        units[unit.name] = unit;
        units[unit.abbr] = unit;
        unit.aliases?.forEach((alias) => {
            units[alias] = unit;
        });
    });

    Object.keys(system.units).forEach((key) => {
        units[key] = system.units[key];
    });
});
