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
exports.systems = exports.units = exports.unitsList = void 0;
const astronomical = __importStar(require("./astronomical"));
const imperial = __importStar(require("./imperial"));
const metric = __importStar(require("./metric"));
exports.unitsList = new Set();
exports.units = {};
exports.systems = {
    imperial,
    astronomical,
    metric,
};
[imperial, astronomical, metric].forEach((system) => {
    system.unitsList.forEach((unit) => {
        var _a;
        exports.unitsList.add(unit);
        exports.units[unit.name] = unit;
        exports.units[unit.abbr] = unit;
        (_a = unit.aliases) === null || _a === void 0 ? void 0 : _a.forEach((alias) => {
            exports.units[alias] = unit;
        });
    });
    Object.keys(system.units).forEach((key) => {
        exports.units[key] = system.units[key];
    });
});
