"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mph = exports.units = exports.unitsList = void 0;
const UnitBase_1 = require("../UnitBase");
const Unit_1 = require("../Unit");
const CompoundUnit_1 = require("../CompoundUnit");
const metric = __importStar(require("./metric"));
const bases = [
    { base: new UnitBase_1.UnitBase({ abbr: 'in', name: 'inch' }), baseUnit: metric.meter, multiplier: 0.0254 },
    { base: new UnitBase_1.UnitBase({ abbr: 'h', name: 'hand' }), baseUnit: metric.meter, multiplier: 0.1016 },
    { base: new UnitBase_1.UnitBase({ abbr: 'ft', name: 'foot' }), aliases: ['feet'], baseUnit: metric.meter, multiplier: 0.3048 },
    { base: new UnitBase_1.UnitBase({ abbr: 'yd', name: 'yard' }), baseUnit: metric.meter, multiplier: 0.9144 },
    { base: new UnitBase_1.UnitBase({ abbr: 'ch', name: 'chain' }), baseUnit: metric.meter, multiplier: 20.1168 },
    { base: new UnitBase_1.UnitBase({ abbr: 'fur', name: 'furlong' }), baseUnit: metric.meter, multiplier: 201.168 },
    { base: new UnitBase_1.UnitBase({ abbr: 'mi', name: 'mile' }), baseUnit: metric.meter, multiplier: 1609.344 },
    { base: new UnitBase_1.UnitBase({ abbr: 'lea', name: 'league' }), baseUnit: metric.meter, multiplier: 4828.032 },
    { base: new UnitBase_1.UnitBase({ abbr: 'fl oz', name: 'fluid ounce' }), baseUnit: metric.units.ml, multiplier: 28.4130625 },
    { base: new UnitBase_1.UnitBase({ abbr: 'gi', name: 'gill' }), baseUnit: metric.units.ml, multiplier: 142.0653125 },
    { base: new UnitBase_1.UnitBase({ abbr: 'pt', name: 'pint' }), baseUnit: metric.units.ml, multiplier: 568.26125 },
    { base: new UnitBase_1.UnitBase({ abbr: 'qt', name: 'quart' }), baseUnit: metric.units.ml, multiplier: 1136.5225 },
    { base: new UnitBase_1.UnitBase({ abbr: 'gal', name: 'gallon' }), baseUnit: metric.units.ml, multiplier: 4546.09 },
    { base: new UnitBase_1.UnitBase({ abbr: 'cp', name: 'cup' }), baseUnit: metric.units.ml, multiplier: 240 },
    { base: new UnitBase_1.UnitBase({ abbr: 'Tbsp', name: 'tablespoon' }), baseUnit: metric.units.ml, multiplier: 15 },
    { base: new UnitBase_1.UnitBase({ abbr: 'tsp', name: 'teaspoon' }), baseUnit: metric.units.ml, multiplier: 5 },
    { base: new UnitBase_1.UnitBase({ abbr: 'oz', name: 'ounce' }), baseUnit: metric.gram, multiplier: 28.349523125 },
    { base: new UnitBase_1.UnitBase({ abbr: 'lb', name: 'pound' }), baseUnit: metric.gram, multiplier: 453.59237 },
    { base: new UnitBase_1.UnitBase({ abbr: 'st', name: 'stone' }), baseUnit: metric.gram, multiplier: 6350.29318 },
    { base: new UnitBase_1.UnitBase({ abbr: 't', name: 'ton' }), baseUnit: metric.units.kg, multiplier: 1016.0469088 },
];
exports.unitsList = new Set();
exports.units = {};
bases.forEach((unitBase) => {
    const unit = new Unit_1.Unit(unitBase);
    exports.unitsList.add(unit);
    exports.units[unit.name] = unit;
    exports.units[unit.abbr] = unit;
});
exports.mph = new CompoundUnit_1.CompoundUnit({
    units: [exports.units.mi, metric.units.h],
    abbr: 'mph',
});
exports.unitsList.add(exports.mph);
exports.units[exports.mph.name] = exports.mph;
exports.units[exports.mph.abbr] = exports.mph;
exports.default = exports.units;
