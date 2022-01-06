import { expect } from 'chai';
import 'mocha';

import { UnitType } from './UnitType';
import { iUnitBase, UnitBase } from './UnitBase';
import { multiply } from './lib/safeMath';
import { Unit } from './Unit';
import { Scalar } from './Scalar';

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
    });

});
