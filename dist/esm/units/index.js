import * as astronomical from './astronomical';
import * as imperial from './imperial';
import * as metric from './metric';
export const unitsList = new Set();
export const units = {};
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
    });
});
