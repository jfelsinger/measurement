import { UnitBase } from '../UnitBase';
import { Unit } from '../Unit';
import { CompoundUnit } from '../CompoundUnit';
import * as metric from './metric';
const bases = [
    { base: new UnitBase({ abbr: 'in', name: 'inch' }), metricBase: metric.meter, multiplier: 0.0254 },
    { base: new UnitBase({ abbr: 'h', name: 'hand' }), metricBase: metric.meter, multiplier: 0.1016 },
    { base: new UnitBase({ abbr: 'ft', name: 'foot' }), metricBase: metric.meter, multiplier: 0.3048 },
    { base: new UnitBase({ abbr: 'yd', name: 'yard' }), metricBase: metric.meter, multiplier: 0.9144 },
    { base: new UnitBase({ abbr: 'ch', name: 'chain' }), metricBase: metric.meter, multiplier: 20.1168 },
    { base: new UnitBase({ abbr: 'fur', name: 'furlong' }), metricBase: metric.meter, multiplier: 201.168 },
    { base: new UnitBase({ abbr: 'mi', name: 'mile' }), metricBase: metric.meter, multiplier: 1609.344 },
    { base: new UnitBase({ abbr: 'lea', name: 'league' }), metricBase: metric.meter, multiplier: 4828.032 },
    { base: new UnitBase({ abbr: 'fl oz', name: 'fluid ounce' }), metricBase: metric.units.ml, multiplier: 28.4130625 },
    { base: new UnitBase({ abbr: 'gi', name: 'gill' }), metricBase: metric.units.ml, multiplier: 142.0653125 },
    { base: new UnitBase({ abbr: 'pt', name: 'pint' }), metricBase: metric.units.ml, multiplier: 568.26125 },
    { base: new UnitBase({ abbr: 'qt', name: 'quart' }), metricBase: metric.units.ml, multiplier: 1136.5225 },
    { base: new UnitBase({ abbr: 'gal', name: 'gallon' }), metricBase: metric.units.ml, multiplier: 4546.09 },
    { base: new UnitBase({ abbr: 'cp', name: 'cup' }), metricBase: metric.units.ml, multiplier: 240 },
    { base: new UnitBase({ abbr: 'Tbsp', name: 'tablespoon' }), metricBase: metric.units.ml, multiplier: 15 },
    { base: new UnitBase({ abbr: 'tsp', name: 'teaspoon' }), metricBase: metric.units.ml, multiplier: 5 },
    { base: new UnitBase({ abbr: 'oz', name: 'ounce' }), metricBase: metric.gram, multiplier: 28.349523125 },
    { base: new UnitBase({ abbr: 'lb', name: 'pound' }), metricBase: metric.gram, multiplier: 453.59237 },
    { base: new UnitBase({ abbr: 'st', name: 'stone' }), metricBase: metric.gram, multiplier: 6350.29318 },
    { base: new UnitBase({ abbr: 't', name: 'ton' }), metricBase: metric.units.kg, multiplier: 1016.0469088 },
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
export const mph = new CompoundUnit({
    units: [units.mi, metric.units.h],
    abbr: 'mph',
});
unitsList.add(mph);
units[mph.name] = mph;
units[mph.abbr] = mph;
export default units;
