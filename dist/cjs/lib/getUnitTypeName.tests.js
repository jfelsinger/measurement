"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const getUnitTypeName_1 = __importDefault(require("./getUnitTypeName"));
const UnitLibrary_1 = __importDefault(require("../UnitLibrary"));
describe('getUnitTypeName', () => {
    it('should give a named unit type for a unit', () => {
        let { mile } = UnitLibrary_1.default.units;
        let name = (0, getUnitTypeName_1.default)(mile);
        (0, chai_1.expect)(name).to.equal('Length');
        console.log(name);
    });
    it('should give a named unit type for a compound unit', () => {
        let { mph } = UnitLibrary_1.default.units;
        let name = (0, getUnitTypeName_1.default)(mph);
        (0, chai_1.expect)(name).to.equal('Compound:Length.Time');
        console.log(name);
    });
});
