"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const UnitLibrary_1 = __importDefault(require("./UnitLibrary"));
const Measurement_1 = require("./Measurement");
describe('Measurement', () => {
    it('should construct', () => {
        let measure = (0, Measurement_1.MeasurementFactory)();
    });
    it('should provide units from default library', () => {
        let m = (0, Measurement_1.MeasurementFactory)();
        (0, chai_1.expect)(m).to.have.property('km');
        (0, chai_1.expect)(m).to.have.property('lb');
        (0, chai_1.expect)(m).to.have.property('litre');
        (0, chai_1.expect)(m).to.have.property('mile');
        (0, chai_1.expect)(m).to.have.property('kilogram');
        (0, chai_1.expect)(m.units).to.have.property('km');
        (0, chai_1.expect)(m.units).to.have.property('lb');
        (0, chai_1.expect)(m.units).to.have.property('litre');
        (0, chai_1.expect)(m.units).to.have.property('mile');
        (0, chai_1.expect)(m.units).to.have.property('kilogram');
        (0, chai_1.expect)(Measurement_1.measurement).to.have.property('km');
        (0, chai_1.expect)(Measurement_1.measurement).to.have.property('lb');
        (0, chai_1.expect)(Measurement_1.measurement).to.have.property('litre');
        (0, chai_1.expect)(Measurement_1.measurement).to.have.property('mile');
        (0, chai_1.expect)(Measurement_1.measurement).to.have.property('kilogram');
        (0, chai_1.expect)(Measurement_1.measurement.units).to.have.property('km');
        (0, chai_1.expect)(Measurement_1.measurement.units).to.have.property('lb');
        (0, chai_1.expect)(Measurement_1.measurement.units).to.have.property('litre');
        (0, chai_1.expect)(Measurement_1.measurement.units).to.have.property('mile');
        (0, chai_1.expect)(Measurement_1.measurement.units).to.have.property('kilogram');
    });
    it('should populate library units as globals', () => {
        let measure = (0, Measurement_1.MeasurementFactory)();
        (0, chai_1.expect)(measure).to.have.property('km');
    });
    describe('measure', () => {
        it('should give a measurement from a string', () => {
            let m = (0, Measurement_1.MeasurementFactory)();
            let fiveKm = m.measure('5km');
        });
        it('should give a measurement from values', () => {
            let m = (0, Measurement_1.MeasurementFactory)();
            let fiveKm = m.measure(5, m.units.km);
        });
        it('should give a measurement from values, with accurate conversions', () => {
            let m = (0, Measurement_1.MeasurementFactory)();
            let fiveMi = m.measure(5, m.units.mile);
            let km = fiveMi.to(m.units.km);
            (0, chai_1.expect)(km.getValue()).to.equal(8.04672);
        });
    });
    describe('parseUnit', () => {
    });
    describe('makeScalar', () => {
        it('should give a measurement', () => {
            let fiveKm = Measurement_1.measurement.km(5);
        });
        it('should give a measurement from values, with accurate conversions', () => {
            let fiveMi = Measurement_1.measurement.mile(5);
            let km = fiveMi.to(Measurement_1.measurement.unit.km);
            (0, chai_1.expect)(km.getValue()).to.equal(8.04672);
        });
    });
    describe('deleteUnit', () => {
        it('should remove the unit from the units selection', () => {
            let m = (0, Measurement_1.MeasurementFactory)(UnitLibrary_1.default.clone());
            let km = m.unit.km;
            m.deleteUnit(km);
            (0, chai_1.expect)(m.unit).to.not.have.property('km');
            (0, chai_1.expect)(m.units).to.not.have.property('km');
            (0, chai_1.expect)(m.unit).to.not.have.property('kilometer');
            (0, chai_1.expect)(m.units).to.not.have.property('kilometer');
        });
    });
    describe('addUnit', () => {
    });
});
