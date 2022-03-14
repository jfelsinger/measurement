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
    it('should give correct string values', () => {
        var _a, _b;
        let km = new Unit_1.Unit({
            base: new UnitBase_1.UnitBase({ abbr: 'm', name: 'meter' }),
            prefix: new UnitBase_1.UnitBase({ abbr: 'k', name: 'kilo' }),
            unitType: UnitType_1.UnitType.Length,
            multiplier: 1000,
        });
        (0, chai_1.expect)(`${km}`).to.equal('km');
        (0, chai_1.expect)(`${km.toString()}`).to.equal('km');
        (0, chai_1.expect)(`${km.toString(false)}`).to.equal('kilometer');
        (0, chai_1.expect)(`${km.base}`).to.equal('meter');
        (0, chai_1.expect)(`${km.base.toString()}`).to.equal('meter');
        (0, chai_1.expect)(`${km.base.toString(true)}`).to.equal('m');
        (0, chai_1.expect)(`${km === null || km === void 0 ? void 0 : km.prefix}`).to.equal('kilo');
        (0, chai_1.expect)(`${(_a = km === null || km === void 0 ? void 0 : km.prefix) === null || _a === void 0 ? void 0 : _a.toString()}`).to.equal('kilo');
        (0, chai_1.expect)(`${(_b = km === null || km === void 0 ? void 0 : km.prefix) === null || _b === void 0 ? void 0 : _b.toString(true)}`).to.equal('k');
    });
    describe('clone', () => {
        it('should clone', () => {
            let km = new Unit_1.Unit({
                base: new UnitBase_1.UnitBase({ abbr: 'm', name: 'meter' }),
                prefix: new UnitBase_1.UnitBase({ abbr: 'k', name: 'kilo' }),
                unitType: UnitType_1.UnitType.Length,
                multiplier: 1000,
            });
            let kmNew = km.clone();
            (0, chai_1.expect)(km.multiplier).to.equal(1000);
            (0, chai_1.expect)(kmNew.multiplier).to.equal(1000);
        });
        it('should clone with new values', () => {
            let km = new Unit_1.Unit({
                base: new UnitBase_1.UnitBase({ abbr: 'm', name: 'meter' }),
                prefix: new UnitBase_1.UnitBase({ abbr: 'k', name: 'kilo' }),
                unitType: UnitType_1.UnitType.Length,
                multiplier: 1000,
            });
            let kmNew = km.clone({
                base: { abbr: 'kmn', name: 'newkometer' },
                multiplier: 800,
                name: 'heckn',
                aliases: ['x'],
                unitType: UnitType_1.UnitType.Length,
            });
            (0, chai_1.expect)(km.abbr).to.equal('km');
            (0, chai_1.expect)(kmNew.abbr).to.equal('kkmn');
            (0, chai_1.expect)(km.name).to.equal('kilometer');
            (0, chai_1.expect)(kmNew.name).to.equal('heckn');
            (0, chai_1.expect)(km.aliases.length).to.equal(0);
            (0, chai_1.expect)(kmNew.aliases[0]).to.equal('x');
            (0, chai_1.expect)(km.multiplier).to.equal(1000);
            (0, chai_1.expect)(kmNew.multiplier).to.equal(800);
        });
    });
});
