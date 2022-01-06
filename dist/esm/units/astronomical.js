import { UnitBase } from '../UnitBase';
import { Unit } from '../Unit';
import * as metric from './metric';
const bases = [
    { base: new UnitBase({ abbr: 'ly', name: 'lightyear' }), metricBase: metric.meter, multiplier: 9460730472580800 },
    { base: new UnitBase({ abbr: 'Ls', name: 'light-second' }), metricBase: metric.meter, multiplier: 299792458 },
    { base: new UnitBase({ abbr: 'Lm', name: 'light-minute' }), metricBase: metric.meter, multiplier: 17987547480 },
    { base: new UnitBase({ abbr: 'Lh', name: 'light-hour' }), metricBase: metric.meter, multiplier: 1079252848800 },
    { base: new UnitBase({ abbr: 'Ld', name: 'light-day' }), metricBase: metric.meter, multiplier: 25902068371200 },
    { base: new UnitBase({ abbr: 'Lw', name: 'light-week' }), metricBase: metric.meter, multiplier: 181314478598400 },
    { base: new UnitBase({ abbr: 'au', name: 'astronomical unit' }), metricBase: metric.meter, multiplier: 149597870700 },
    { base: new UnitBase({ abbr: 'pc', name: 'parsec' }), metricBase: metric.meter, multiplier: 30856775814913670 },
];
export const unitsList = new Set();
export const units = {};
bases.forEach((unitBase) => {
    const unit = new Unit({
        base: unitBase.base,
        baseUnit: unitBase.metricBase,
        multiplier: unitBase.multiplier,
    });
    unitsList.add(unit);
    units[unit.name] = unit;
    units[unit.abbr] = unit;
});
export default units;
