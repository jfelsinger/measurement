import { expect } from 'chai';
import 'mocha';
import { defaultLibrary, UnitLibrary } from './UnitLibrary';
import { UnitType } from './UnitType';
import { Unit } from './Unit';
import { CompoundUnit } from './CompoundUnit';

describe('UnitLibrary', () => {

    it('should construct with default library', () => {
        let lib = new UnitLibrary();
        expect(lib.units).to.have.property('meter');
    });

    it('should construct without default library', () => {
        let hands = new Unit({
            base: { abbr: 'hnd', name: 'hand' },
            unitType: UnitType.Length,
        });

        let lib = new UnitLibrary([hands]);
        expect(lib.units).to.have.property('hand');
        expect(lib.units).to.not.have.property('meter');
    });

    describe('hasKey', () => {
        it('should return false when the key does not exist', () => {
            expect(defaultLibrary.hasKey('SLDKFJSDSDSDFFFFFFFFFFFFDFJ')).to.be.false;
        });

        it('should allow checking if a unit exists', () => {
            expect(defaultLibrary.hasKey('hr')).to.be.true;
            expect(defaultLibrary.hasKey('mph')).to.be.true;

            const library = new UnitLibrary();
            expect(library.hasKey('hr')).to.be.true;
            expect(library.hasKey('mph')).to.be.true;
        });

        it('should work with compound units too', () => {
            expect(defaultLibrary.hasKey('ft/s')).to.be.true;
        });
    });

    describe('getUnit', () => {
        it('should return a unit', () => {
            const unit = defaultLibrary.getUnit('hr');
            expect(unit).to.have.property('unitType', UnitType.Time);
            expect(unit).to.have.property('name', 'hour');
        });

        it('should return a compound', () => {
            // hr/min - a useful unit for time travel
            const unit = defaultLibrary.getUnit('hr/min');
            expect(unit).to.have.property('unitType', UnitType.Compound);
            expect(unit).to.have.property('name', 'hour per minute');
        });
    });

    describe('addUnit', () => {
        it('should add a new unit', () => {
            const myLength = new Unit({
                base: { abbr: 'jl', name: 'mylength' },
                baseUnit: defaultLibrary.getUnit('m'),
                multiplier: 1.88976,
                aliases: ['myl'],
            });

            const lib = new UnitLibrary();
            lib.addUnit(myLength);

            let jl = lib.getUnit('jl');
        });
    });

    describe('deleteUnit', () => {
        it('should add a new unit', () => {
            const myLength = new Unit({
                base: { abbr: 'jl', name: 'mylength' },
                baseUnit: defaultLibrary.getUnit('m'),
                multiplier: 1.88976,
                aliases: ['myl'],
            });

            const lib = new UnitLibrary();
            lib.addUnit(myLength);
            expect(lib.hasKey('jl')).to.be.true;

            lib.deleteUnit(myLength);
            expect(lib.hasKey('jl')).to.be.false;
        });
    });

});


