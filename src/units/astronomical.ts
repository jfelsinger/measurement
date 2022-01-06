import { UnitBase } from '../UnitBase';
import { UnitType } from '../UnitType';
import { iUnit, Unit } from '../Unit';

import * as metric from './metric';

const bases = [
    { base: new UnitBase({ abbr: 'ly',  name: 'lightyear'         }), metricBase: metric.meter, multiplier:  9_460_730_472_580_800 },
    { base: new UnitBase({ abbr: 'Ls',  name: 'light-second'      }), metricBase: metric.meter, multiplier:            299_792_458 },
    { base: new UnitBase({ abbr: 'Lm',  name: 'light-minute'      }), metricBase: metric.meter, multiplier:         17_987_547_480 },
    { base: new UnitBase({ abbr: 'Lh',  name: 'light-hour'        }), metricBase: metric.meter, multiplier:      1_079_252_848_800 },
    { base: new UnitBase({ abbr: 'Ld',  name: 'light-day'         }), metricBase: metric.meter, multiplier:     25_902_068_371_200 },
    { base: new UnitBase({ abbr: 'Lw',  name: 'light-week'        }), metricBase: metric.meter, multiplier:    181_314_478_598_400 },
    { base: new UnitBase({ abbr: 'au',  name: 'astronomical unit' }), metricBase: metric.meter, multiplier:        149_597_870_700 },
    { base: new UnitBase({ abbr: 'pc',  name: 'parsec'            }), metricBase: metric.meter, multiplier: 30_856_775_814_913_673 },
];

export const unitsList: Set<iUnit> = new Set<iUnit>();
export const units: { [key:string]: iUnit } = {};

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
