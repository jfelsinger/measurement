"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const UnitType_1 = require("./UnitType");
const UnitBase_1 = require("./UnitBase");
const Unit_1 = require("./Unit");
describe('Unit', () => {
    it('should construct a base unit', () => {
        let meter = new Unit_1.Unit({
            base: new UnitBase_1.UnitBase({ abbr: 'm', name: 'meter' }),
            unitType: UnitType_1.UnitType.Length,
        });
        (0, chai_1.expect)(meter).to.have.property('name', 'meter');
        (0, chai_1.expect)(meter).to.have.property('abbr', 'm');
        (0, chai_1.expect)(meter).to.have.property('multiplier', 1);
        (0, chai_1.expect)(meter).to.have.property('unitType', UnitType_1.UnitType.Length);
    });
    it('should construct a prefixed unit', () => {
        let meter = new Unit_1.Unit({
            base: new UnitBase_1.UnitBase({ abbr: 'm', name: 'meter' }),
            prefix: new UnitBase_1.UnitBase({ abbr: 'k', name: 'kilo' }),
            unitType: UnitType_1.UnitType.Length,
            multiplier: 1000,
        });
        (0, chai_1.expect)(meter).to.have.property('name', 'kilometer');
        (0, chai_1.expect)(meter).to.have.property('abbr', 'km');
        (0, chai_1.expect)(meter).to.have.property('multiplier', 1000);
        (0, chai_1.expect)(meter).to.have.property('unitType', UnitType_1.UnitType.Length);
    });
});
