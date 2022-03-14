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
        var _a;
        unitsList.add(unit);
        units[unit.name] = unit;
        units[unit.abbr] = unit;
        (_a = unit.aliases) === null || _a === void 0 ? void 0 : _a.forEach((alias) => {
            units[alias] = unit;
        });
    });
    Object.keys(system.units).forEach((key) => {
        units[key] = system.units[key];
    });
});
