"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const UnitType_1 = require("./UnitType");
const UnitBase_1 = require("./UnitBase");
const Unit_1 = require("./Unit");
const CompoundUnit_1 = require("./CompoundUnit");
const Scalar_1 = require("./Scalar");
const UnitLibrary_1 = __importDefault(require("./UnitLibrary"));
describe('Scalar', () => {
    it('should construct', () => {
        const meter = new Unit_1.Unit({
            base: new UnitBase_1.UnitBase({ abbr: 'm', name: 'meter' }),
            unitType: UnitType_1.UnitType.Length,
        });
        let scalar = new Scalar_1.Scalar({ value: 5, unit: meter });
        (0, chai_1.expect)(scalar).to.have.property('value', 5);
        (0, chai_1.expect)(scalar).to.have.property('unit', meter);
        (0, chai_1.expect)(`${scalar}`).to.equal('5m');
    });
    it('should construct from unit lookup', () => {
        let scalar = new Scalar_1.Scalar({ value: 5, unit: 'm' });
        (0, chai_1.expect)(scalar).to.have.property('value', 5);
        (0, chai_1.expect)(`${scalar}`).to.equal('5m');
    });
    it('should construct from unit lookup', () => {
        let scalar = Scalar_1.Scalar.get(5, 'km');
        (0, chai_1.expect)(scalar).to.have.property('value', 5);
        (0, chai_1.expect)(`${scalar}`).to.equal('5km');
        (0, chai_1.expect)(scalar.toString(false)).to.equal('5 kilometers');
    });
    it('should convert to other units', () => {
        (0, chai_1.expect)(Scalar_1.Scalar.get(5, 'km').as('m').value).to.equal(5000);
        (0, chai_1.expect)(Math.round(Scalar_1.Scalar.get(5, 'km').as('ft').value)).to.equal(16404);
        (0, chai_1.expect)(Scalar_1.Scalar.get(5, 'km').to('m').value).to.equal(5000);
        (0, chai_1.expect)(Math.round(Scalar_1.Scalar.get(5, 'km').to('ft').value)).to.equal(16404);
        (0, chai_1.expect)(Math.round(Scalar_1.Scalar.get(50, 'mi').to('km').value)).to.equal(80);
        (0, chai_1.expect)(Math.round(Scalar_1.Scalar.get(50, 'mi/h').to('km/h').value)).to.equal(80);
        (0, chai_1.expect)(Math.round(Scalar_1.Scalar.get(50, 'mph').to('km/h').value)).to.equal(80);
        (0, chai_1.expect)(Math.round(Scalar_1.Scalar.get(1, 'day').to('second').value)).to.equal(86400);
    });
    it('should work with weird compound units', () => {
        const { mile, foot, hour, second } = UnitLibrary_1.default.units;
        const twoHour = new Unit_1.Unit({
            base: { abbr: '2h', name: 'two hours' },
            baseUnit: hour,
            multiplier: 2,
        });
        const mph = new CompoundUnit_1.CompoundUnit({ units: [mile, hour], abbr: 'mph' });
        const mp2h = new CompoundUnit_1.CompoundUnit({ units: [mile, twoHour], abbr: 'mp2h' });
        let oneMph = new Scalar_1.Scalar({ value: 1, unit: mph });
        (0, chai_1.expect)(oneMph.getValue()).to.equal(1);
        (0, chai_1.expect)(oneMph.getValue(mp2h)).to.equal(2);
        (0, chai_1.expect)(oneMph.as(mp2h).value).to.equal(2);
        (0, chai_1.expect)(oneMph.as(mp2h).as(mph).value).to.equal(1);
        const fps = new CompoundUnit_1.CompoundUnit({ units: [foot, second] });
        let hundredMph = new Scalar_1.Scalar({ value: 100, unit: mph });
        let converted = hundredMph.as(fps);
        // expect(Math.round( hundredMph.getValue(fps) )).to.equal(146);
        let oneMp2h = new Scalar_1.Scalar({ value: 1, unit: mp2h });
        (0, chai_1.expect)(oneMp2h.getValue()).to.equal(1);
        (0, chai_1.expect)(oneMp2h.getValue(mph)).to.equal(0.5);
        (0, chai_1.expect)(oneMp2h.as(mph).value).to.equal(0.5);
        (0, chai_1.expect)(oneMp2h.as(mph).as(mp2h).value).to.equal(1);
    });
    describe('per', () => {
        it('should create a new compound scalar', () => {
            let { feet, second } = UnitLibrary_1.default.units;
            let distance = new Scalar_1.Scalar({ value: 1, unit: feet });
            let fps = distance.per(second);
            (0, chai_1.expect)(fps.unit.unitType).to.equal(UnitType_1.UnitType.Compound);
            let fps2 = fps.clone();
            let fpm = distance.per.minute();
            (0, chai_1.expect)(fps.unit.unitType).to.equal(UnitType_1.UnitType.Compound);
        });
    });
});
