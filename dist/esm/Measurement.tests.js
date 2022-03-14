import { expect } from 'chai';
import 'mocha';
import library from './UnitLibrary';
import { MeasurementFactory, measurement } from './Measurement';
describe('Measurement', () => {
    it('should construct', () => {
        let measure = MeasurementFactory();
    });
    it('should provide units from default library', () => {
        let m = MeasurementFactory();
        expect(m).to.have.property('km');
        expect(m).to.have.property('lb');
        expect(m).to.have.property('litre');
        expect(m).to.have.property('mile');
        expect(m).to.have.property('kilogram');
        expect(m.units).to.have.property('km');
        expect(m.units).to.have.property('lb');
        expect(m.units).to.have.property('litre');
        expect(m.units).to.have.property('mile');
        expect(m.units).to.have.property('kilogram');
        expect(measurement).to.have.property('km');
        expect(measurement).to.have.property('lb');
        expect(measurement).to.have.property('litre');
        expect(measurement).to.have.property('mile');
        expect(measurement).to.have.property('kilogram');
        expect(measurement.units).to.have.property('km');
        expect(measurement.units).to.have.property('lb');
        expect(measurement.units).to.have.property('litre');
        expect(measurement.units).to.have.property('mile');
        expect(measurement.units).to.have.property('kilogram');
    });
    it('should populate library units as globals', () => {
        let measure = MeasurementFactory();
        expect(measure).to.have.property('km');
    });
    describe('measure', () => {
        it('should give a measurement from a string', () => {
            let m = MeasurementFactory();
            let fiveKm = m.measure('5km');
        });
        it('should give a measurement from values', () => {
            let m = MeasurementFactory();
            let fiveKm = m.measure(5, m.units.km);
        });
        it('should give a measurement from values, with accurate conversions', () => {
            let m = MeasurementFactory();
            let fiveMi = m.measure(5, m.units.mile);
            let km = fiveMi.to(m.units.km);
            expect(km.getValue()).to.equal(8.04672);
        });
    });
    describe('parseUnit', () => {
    });
    describe('makeScalar', () => {
        it('should give a measurement', () => {
            let fiveKm = measurement.km(5);
        });
        it('should give a measurement from values, with accurate conversions', () => {
            let fiveMi = measurement.mile(5);
            let km = fiveMi.to(measurement.unit.km);
            expect(km.getValue()).to.equal(8.04672);
        });
    });
    describe('deleteUnit', () => {
        it('should remove the unit from the units selection', () => {
            let m = MeasurementFactory(library.clone());
            let km = m.unit.km;
            m.deleteUnit(km);
            expect(m.unit).to.not.have.property('km');
            expect(m.units).to.not.have.property('km');
            expect(m.unit).to.not.have.property('kilometer');
            expect(m.units).to.not.have.property('kilometer');
        });
    });
    describe('addUnit', () => {
    });
});
