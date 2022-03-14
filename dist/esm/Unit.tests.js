import { expect } from 'chai';
import 'mocha';
import { UnitType } from './UnitType';
import { UnitBase } from './UnitBase';
import { Unit } from './Unit';
describe('Unit', () => {
    it('should construct a base unit', () => {
        let meter = new Unit({
            base: new UnitBase({ abbr: 'm', name: 'meter' }),
            unitType: UnitType.Length,
        });
        expect(meter).to.have.property('name', 'meter');
        expect(meter).to.have.property('abbr', 'm');
        expect(meter).to.have.property('multiplier', 1);
        expect(meter).to.have.property('unitType', UnitType.Length);
    });
    it('should construct a prefixed unit', () => {
        let meter = new Unit({
            base: new UnitBase({ abbr: 'm', name: 'meter' }),
            prefix: new UnitBase({ abbr: 'k', name: 'kilo' }),
            unitType: UnitType.Length,
            multiplier: 1000,
        });
        expect(meter).to.have.property('name', 'kilometer');
        expect(meter).to.have.property('abbr', 'km');
        expect(meter).to.have.property('multiplier', 1000);
        expect(meter).to.have.property('unitType', UnitType.Length);
    });
    it('should give correct string values', () => {
        var _a, _b;
        let km = new Unit({
            base: new UnitBase({ abbr: 'm', name: 'meter' }),
            prefix: new UnitBase({ abbr: 'k', name: 'kilo' }),
            unitType: UnitType.Length,
            multiplier: 1000,
        });
        expect(`${km}`).to.equal('km');
        expect(`${km.toString()}`).to.equal('km');
        expect(`${km.toString(false)}`).to.equal('kilometer');
        expect(`${km.base}`).to.equal('meter');
        expect(`${km.base.toString()}`).to.equal('meter');
        expect(`${km.base.toString(true)}`).to.equal('m');
        expect(`${km === null || km === void 0 ? void 0 : km.prefix}`).to.equal('kilo');
        expect(`${(_a = km === null || km === void 0 ? void 0 : km.prefix) === null || _a === void 0 ? void 0 : _a.toString()}`).to.equal('kilo');
        expect(`${(_b = km === null || km === void 0 ? void 0 : km.prefix) === null || _b === void 0 ? void 0 : _b.toString(true)}`).to.equal('k');
    });
    describe('clone', () => {
        it('should clone', () => {
            let km = new Unit({
                base: new UnitBase({ abbr: 'm', name: 'meter' }),
                prefix: new UnitBase({ abbr: 'k', name: 'kilo' }),
                unitType: UnitType.Length,
                multiplier: 1000,
            });
            let kmNew = km.clone();
            expect(km.multiplier).to.equal(1000);
            expect(kmNew.multiplier).to.equal(1000);
        });
        it('should clone with new values', () => {
            let km = new Unit({
                base: new UnitBase({ abbr: 'm', name: 'meter' }),
                prefix: new UnitBase({ abbr: 'k', name: 'kilo' }),
                unitType: UnitType.Length,
                multiplier: 1000,
            });
            let kmNew = km.clone({
                base: { abbr: 'kmn', name: 'newkometer' },
                multiplier: 800,
                name: 'heckn',
                aliases: ['x'],
                unitType: UnitType.Length,
            });
            expect(km.abbr).to.equal('km');
            expect(kmNew.abbr).to.equal('kkmn');
            expect(km.name).to.equal('kilometer');
            expect(kmNew.name).to.equal('heckn');
            expect(km.aliases.length).to.equal(0);
            expect(kmNew.aliases[0]).to.equal('x');
            expect(km.multiplier).to.equal(1000);
            expect(kmNew.multiplier).to.equal(800);
        });
    });
});
