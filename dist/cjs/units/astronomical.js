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
exports.units = exports.unitsList = void 0;
const UnitBase_1 = require("../UnitBase");
const Unit_1 = require("../Unit");
const metric = __importStar(require("./metric"));
const bases = [
    { base: new UnitBase_1.UnitBase({ abbr: 'ly', name: 'lightyear' }), metricBase: metric.meter, multiplier: 9460730472580800 },
    { base: new UnitBase_1.UnitBase({ abbr: 'Ls', name: 'light-second' }), metricBase: metric.meter, multiplier: 299792458 },
    { base: new UnitBase_1.UnitBase({ abbr: 'Lm', name: 'light-minute' }), metricBase: metric.meter, multiplier: 17987547480 },
    { base: new UnitBase_1.UnitBase({ abbr: 'Lh', name: 'light-hour' }), metricBase: metric.meter, multiplier: 1079252848800 },
    { base: new UnitBase_1.UnitBase({ abbr: 'Ld', name: 'light-day' }), metricBase: metric.meter, multiplier: 25902068371200 },
    { base: new UnitBase_1.UnitBase({ abbr: 'Lw', name: 'light-week' }), metricBase: metric.meter, multiplier: 181314478598400 },
    { base: new UnitBase_1.UnitBase({ abbr: 'au', name: 'astronomical unit' }), metricBase: metric.meter, multiplier: 149597870700 },
    { base: new UnitBase_1.UnitBase({ abbr: 'pc', name: 'parsec' }), metricBase: metric.meter, multiplier: 30856775814913670 },
];
exports.unitsList = new Set();
exports.units = {};
bases.forEach((unitBase) => {
    const unit = new Unit_1.Unit({
        base: unitBase.base,
        baseUnit: unitBase.metricBase,
        multiplier: unitBase.multiplier,
    });
    exports.unitsList.add(unit);
    exports.units[unit.name] = unit;
    exports.units[unit.abbr] = unit;
});
exports.default = exports.units;
