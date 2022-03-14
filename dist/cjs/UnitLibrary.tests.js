"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const UnitLibrary_1 = require("./UnitLibrary");
const UnitType_1 = require("./UnitType");
const Unit_1 = require("./Unit");
describe('UnitLibrary', () => {
    it('should construct with default library', () => {
        let lib = new UnitLibrary_1.UnitLibrary();
        (0, chai_1.expect)(lib.units).to.have.property('meter');
    });
    it('should construct without default library', () => {
        let hands = new Unit_1.Unit({
            base: { abbr: 'hnd', name: 'hand' },
            unitType: UnitType_1.UnitType.Length,
        });
        let lib = new UnitLibrary_1.UnitLibrary([hands]);
        (0, chai_1.expect)(lib.units).to.have.property('hand');
        (0, chai_1.expect)(lib.units).to.not.have.property('meter');
    });
    describe('hasKey', () => {
        it('should return false when the key does not exist', () => {
            (0, chai_1.expect)(UnitLibrary_1.defaultLibrary.hasKey('SLDKFJSDSDSDFFFFFFFFFFFFDFJ')).to.be.false;
        });
        it('should allow checking if a unit exists', () => {
            (0, chai_1.expect)(UnitLibrary_1.defaultLibrary.hasKey('hr')).to.be.true;
            (0, chai_1.expect)(UnitLibrary_1.defaultLibrary.hasKey('mph')).to.be.true;
            const library = new UnitLibrary_1.UnitLibrary();
            (0, chai_1.expect)(library.hasKey('hr')).to.be.true;
            (0, chai_1.expect)(library.hasKey('mph')).to.be.true;
        });
        it('should work with compound units too', () => {
            (0, chai_1.expect)(UnitLibrary_1.defaultLibrary.hasKey('ft/s')).to.be.true;
        });
    });
    describe('getUnit', () => {
        it('should return a unit', () => {
            const unit = UnitLibrary_1.defaultLibrary.getUnit('hr');
            (0, chai_1.expect)(unit).to.have.property('unitType', UnitType_1.UnitType.Time);
            (0, chai_1.expect)(unit).to.have.property('name', 'hour');
        });
        it('should return a compound', () => {
            // hr/min - a useful unit for time travel
            const unit = UnitLibrary_1.defaultLibrary.getUnit('hr/min');
            (0, chai_1.expect)(unit).to.have.property('unitType', UnitType_1.UnitType.Compound);
            (0, chai_1.expect)(unit).to.have.property('name', 'hour per minute');
        });
    });
    describe('addUnit', () => {
        it('should add a new unit', () => {
            const myLength = new Unit_1.Unit({
                base: { abbr: 'jl', name: 'mylength' },
                baseUnit: UnitLibrary_1.defaultLibrary.getUnit('m'),
                multiplier: 1.88976,
                aliases: ['myl'],
            });
            const lib = new UnitLibrary_1.UnitLibrary();
            lib.addUnit(myLength);
            let jl = lib.getUnit('jl');
        });
    });
    describe('deleteUnit', () => {
        it('should add a new unit', () => {
            const myLength = new Unit_1.Unit({
                base: { abbr: 'jl', name: 'mylength' },
                baseUnit: UnitLibrary_1.defaultLibrary.getUnit('m'),
                multiplier: 1.88976,
                aliases: ['myl'],
            });
            const lib = new UnitLibrary_1.UnitLibrary();
            lib.addUnit(myLength);
            (0, chai_1.expect)(lib.hasKey('jl')).to.be.true;
            lib.deleteUnit(myLength);
            (0, chai_1.expect)(lib.hasKey('jl')).to.be.false;
        });
    });
});
