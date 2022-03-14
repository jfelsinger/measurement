import { expect } from 'chai';
import 'mocha';
import getUnitTypeName from './getUnitTypeName';
import library from '../UnitLibrary';
describe('getUnitTypeName', () => {
    it('should give a named unit type for a unit', () => {
        let { mile } = library.units;
        let name = getUnitTypeName(mile);
        expect(name).to.equal('Length');
        console.log(name);
    });
    it('should give a named unit type for a compound unit', () => {
        let { mph } = library.units;
        let name = getUnitTypeName(mph);
        expect(name).to.equal('Compound:Length.Time');
        console.log(name);
    });
});
