import { expect } from 'chai';
import 'mocha';

import { UnitType } from './UnitType';
import { iUnitBase, UnitBase } from './UnitBase';
import { multiply } from './lib/safeMath';
import { Unit } from './Unit';
import { CompoundUnit } from './CompoundUnit';
import { Scalar } from './Scalar';
import library from './UnitLibrary';

describe('Scalar', () => {

    it('should construct', () => {
        const meter = new Unit({
            base: new UnitBase({ abbr: 'm', name: 'meter' }),
            unitType: UnitType.Length,
        });

        let scalar = new Scalar({ value: 5, unit: meter });

        expect(scalar).to.have.property('value', 5);
        expect(scalar).to.have.property('unit', meter);
        expect(`${scalar}`).to.equal('5m');
    });

    it('should construct from unit lookup', () => {
        let scalar = new Scalar({ value: 5, unit: 'm' });
        expect(scalar).to.have.property('value', 5);
        expect(`${scalar}`).to.equal('5m');
    });

    it('should construct from unit lookup', () => {
        let scalar = Scalar.get(5, 'km');
        expect(scalar).to.have.property('value', 5);
        expect(`${scalar}`).to.equal('5km');
        expect(scalar.toString(false)).to.equal('5 kilometers');
    });

    it('should convert to other units', () => {
        expect( Scalar.get(5, 'km').as('m').value ).to.equal(5000);
        expect( Math.round(Scalar.get(5, 'km').as('ft').value) ).to.equal(16404);

        expect( Scalar.get(5, 'km').to('m').value ).to.equal(5000);
        expect( Math.round(Scalar.get(5, 'km').to('ft').value) ).to.equal(16404);

        expect( Math.round(Scalar.get(50, 'mi').to('km').value) ).to.equal(80);
        expect( Math.round(Scalar.get(50, 'mi/h').to('km/h').value) ).to.equal(80);
        expect( Math.round(Scalar.get(50, 'mph').to('km/h').value) ).to.equal(80);

        expect( Math.round(Scalar.get(1, 'day').to('second').value) ).to.equal(86400);
    });

    it('should work with weird compound units', () => {
        const { mile, foot, hour, second } = library.units;
        const twoHour = new Unit({
            base: { abbr: '2h', name: 'two hours' },
            baseUnit: hour,
            multiplier: 2,
        });

        const mph = new CompoundUnit({ units: [mile, hour], abbr: 'mph' });
        const mp2h = new CompoundUnit({ units: [mile, twoHour], abbr: 'mp2h' });

        let oneMph = new Scalar({ value: 1, unit: mph });
        expect(oneMph.getValue()).to.equal(1);
        expect(oneMph.getValue(mp2h)).to.equal(2);
        expect(oneMph.as(mp2h).value).to.equal(2);
        expect(oneMph.as(mp2h).as(mph).value).to.equal(1);

        const fps = new CompoundUnit({ units: [foot, second] });
        let hundredMph = new Scalar({ value: 100, unit: mph });
        let converted = hundredMph.as(fps);
        // expect(Math.round( hundredMph.getValue(fps) )).to.equal(146);

        let oneMp2h = new Scalar({ value: 1, unit: mp2h });
        expect(oneMp2h.getValue()).to.equal(1);
        expect(oneMp2h.getValue(mph)).to.equal(0.5);
        expect(oneMp2h.as(mph).value).to.equal(0.5);
        expect(oneMp2h.as(mph).as(mp2h).value).to.equal(1);
    });

});
