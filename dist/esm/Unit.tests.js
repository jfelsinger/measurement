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
});
