import { UnitBase } from '../UnitBase';
import { UnitType } from '../UnitType';
import { iUnit, Unit } from '../Unit';
import { CompoundUnit } from '../CompoundUnit';

import * as metric from './metric';

const bases = [
    { base: new UnitBase({ abbr: 'in',  name: 'inch'    }), baseUnit: metric.meter, multiplier: 0.0254 },
    { base: new UnitBase({ abbr: 'h',   name: 'hand'    }), baseUnit: metric.meter, multiplier: 0.1016 },
    { base: new UnitBase({ abbr: 'ft',  name: 'foot'    }), aliases: ['feet'], baseUnit: metric.meter, multiplier: 0.3048 },
    { base: new UnitBase({ abbr: 'yd',  name: 'yard'    }), baseUnit: metric.meter, multiplier: 0.9144 },
    { base: new UnitBase({ abbr: 'ch',  name: 'chain'   }), baseUnit: metric.meter, multiplier: 20.1168 },
    { base: new UnitBase({ abbr: 'fur', name: 'furlong' }), baseUnit: metric.meter, multiplier: 201.168 },
    { base: new UnitBase({ abbr: 'mi',  name: 'mile'    }), baseUnit: metric.meter, multiplier: 1609.344 },
    { base: new UnitBase({ abbr: 'lea', name: 'league'  }), baseUnit: metric.meter, multiplier: 4828.032 },

    { base: new UnitBase({ abbr: 'fl oz', name: 'fluid ounce'  }), baseUnit: metric.units.ml, multiplier: 28.4130625 },
    { base: new UnitBase({ abbr: 'gi',    name: 'gill'  }), baseUnit: metric.units.ml, multiplier: 142.0653125 },
    { base: new UnitBase({ abbr: 'pt',    name: 'pint'  }), baseUnit: metric.units.ml, multiplier: 568.26125 },
    { base: new UnitBase({ abbr: 'qt',    name: 'quart'  }), baseUnit: metric.units.ml, multiplier: 1136.5225 },
    { base: new UnitBase({ abbr: 'gal',   name: 'gallon'  }), baseUnit: metric.units.ml, multiplier: 4546.09 },
    { base: new UnitBase({ abbr: 'cp',    name: 'cup'  }), baseUnit: metric.units.ml, multiplier: 240 },

    { base: new UnitBase({ abbr: 'Tbsp', name: 'tablespoon'  }), baseUnit: metric.units.ml, multiplier: 15 },
    { base: new UnitBase({ abbr: 'tsp',  name: 'teaspoon'  }), baseUnit: metric.units.ml, multiplier: 5 },

    { base: new UnitBase({ abbr: 'oz', name: 'ounce'  }), baseUnit: metric.gram, multiplier: 28.349_523_125 },
    { base: new UnitBase({ abbr: 'lb', name: 'pound'  }), baseUnit: metric.gram, multiplier: 453.592_37 },
    { base: new UnitBase({ abbr: 'st', name: 'stone'  }), baseUnit: metric.gram, multiplier: 6350.293_18 },
    { base: new UnitBase({ abbr: 't',  name: 'ton'  }), baseUnit: metric.units.kg, multiplier: 1016.046_9088 },
];

export const unitsList: Set<iUnit> = new Set<iUnit>();
export const units: { [key:string]: iUnit } = {};

bases.forEach((unitBase) => {
    const unit = new Unit(unitBase);
    unitsList.add(unit);
    units[unit.name] = unit;
    units[unit.abbr] = unit;
});

export const mph = new CompoundUnit({
    units: [units.mi, metric.units.h],
    abbr: 'mph',
});
unitsList.add(mph);
units[mph.name] = mph;
units[mph.abbr] = mph;

export default units;
