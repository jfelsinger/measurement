'use strict';

var UnitTypes = require('../src/unit-types'),
    Unit = require('../src/units'),
    CompoundUnit = require('../src/compound-units'),
    Measurement = require('../src/measurement');

var should = require('should');

describe('Measurement', function() {

    it('should construct', function(done) {
        var m = new Unit('m', '', 1, UnitTypes.LENGTH);
        var measurement = new Measurement(5, m);

        measurement.should.have.property('unit', m);
        measurement.should.have.property('value', 5);

        done();
    });

    it('should construct with compound units', function(done) {
        var m = new Unit('m', '', 1, UnitTypes.LENGTH);
        var s = new Unit('s', '', 1, UnitTypes.TIME);
        var metersPerSecond = new CompoundUnit(m,s);

        var measurement = new Measurement(5, metersPerSecond);

        measurement.should.have.property('unit', metersPerSecond);
        measurement.should.have.property('value', 5);

        done();
    });

    describe('#getValue()', function() {
        it('should return correct values', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var s = new Unit('s', '', 1, UnitTypes.TIME);
            var min = new Unit('s', '', 60, UnitTypes.TIME);
            var mPerS = new CompoundUnit(m,s);
            var measurement = new Measurement(12.5, mPerS);

            measurement.getValue().should.be.exactly(12.5);
            measurement.getValue(km).should.be.exactly(0.0125);
            measurement.getValue(min,1).should.be.exactly(750);

            done();
        });

        it('should return correct values from compound units', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var measurement = new Measurement(12.5, m);

            measurement.getValue().should.be.exactly(12.5);
            measurement.getValue(km).should.be.exactly(0.0125);

            done();
        });
    });

    describe('#as()', function() {
        it('should return a measurement with a new unit', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var measurement = new Measurement(12.5, m).as(km);

            measurement.unit.should.be.exactly(km);

            done();
        });

        it('should convert value to match new unit', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var measurement = new Measurement(12.5, m);

            measurement.value.should.be.exactly(12.5);
            measurement.getValue().should.be.exactly(12.5);

            measurement = measurement.as(km);

            measurement.value.should.be.exactly(0.0125);
            measurement.getValue().should.be.exactly(0.0125);

            done();
        });

        it('should chain conversions to new units', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var feet = new Unit('ft', '', 0.3048, UnitTypes.LENGTH);
            var measurement = new Measurement(12.5, m);

            measurement.value.should.be.exactly(12.5);
            measurement.getValue().should.be.exactly(12.5);

            // As feet
            measurement = measurement.as(feet);

            measurement.value.should.be.approximately(41.0105, 0.0001);
            measurement.getValue().should.be.approximately(41.0105, 0.0001);

            // As km
            measurement = measurement.as(km);

            measurement.value.should.be.approximately(0.0125, 0.0001);
            measurement.getValue().should.be.approximately(0.0125, 0.0001);

            // As feet
            measurement = measurement.as(feet);

            measurement.value.should.be.approximately(41.0105, 0.0001);
            measurement.getValue().should.be.approximately(41.0105, 0.0001);

            // As meters
            measurement = measurement.as(m);

            measurement.value.should.be.approximately(12.5, 0.0001);
            measurement.getValue().should.be.approximately(12.5, 0.0001);

            done();
        });

        it('should not affect original measurement', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);

            var measurementOne = new Measurement(12.5, m);
            var measurementTwo = new Measurement(12.5, m);

            measurementOne.should.match(measurementTwo);

            measurementOne.as(km);

            measurementOne.should.match(measurementTwo);

            done();
        });
    });

    describe('#to()', function() {
        it('should convert to a measurement with a new unit', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);

            var measurement = new Measurement(12.5, m);
            measurement.to(km);

            measurement.unit.should.be.exactly(km);

            done();
        });

        it('should convert value to match new unit', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var measurement = new Measurement(12.5, m);

            measurement.value.should.be.exactly(12.5);
            measurement.getValue().should.be.exactly(12.5);

            measurement.to(km);

            measurement.value.should.be.exactly(0.0125);
            measurement.getValue().should.be.exactly(0.0125);

            done();
        });

        it('should chain conversions to new units', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var feet = new Unit('ft', '', 0.3048, UnitTypes.LENGTH);
            var measurement = new Measurement(12.5, m);

            measurement.value.should.be.exactly(12.5);
            measurement.getValue().should.be.exactly(12.5);

            // As feet
            measurement.to(feet);

            measurement.value.should.be.approximately(41.0105, 0.0001);
            measurement.getValue().should.be.approximately(41.0105, 0.0001);

            // As km
            measurement.to(km);

            measurement.value.should.be.approximately(0.0125, 0.0001);
            measurement.getValue().should.be.approximately(0.0125, 0.0001);

            // As feet
            measurement.to(feet);

            measurement.value.should.be.approximately(41.0105, 0.0001);
            measurement.getValue().should.be.approximately(41.0105, 0.0001);

            // As meters
            measurement.to(m);

            measurement.value.should.be.approximately(12.5, 0.0001);
            measurement.getValue().should.be.approximately(12.5, 0.0001);

            done();
        });

        it('should affect original measurement', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);

            var measurementOne = new Measurement(12.5, m);
            var measurementTwo = new Measurement(12.5, m);

            measurementOne.should.match(measurementTwo);

            measurementOne.to(km);

            measurementOne.should.not.match(measurementTwo);

            done();
        });
    });

    describe('#per()', function() {
        it('should create a compound unit from a measurement', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var s = new Unit('s', '', 1, UnitTypes.TIME);
            var measurement = new Measurement(12.5, m);

            measurement.unit.should.be.exactly(m);

            measurement = measurement.per(s);
            measurement.unit.type.should.be.exactly(UnitTypes.COMPOUND);

            done();
        });

        it('should affect original measurements', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var s = new Unit('s', '', 1, UnitTypes.TIME);
            var measurementOne = new Measurement(12.5, m);
            var measurementTwo = new Measurement(12.5, m);

            measurementOne.should.match(measurementTwo);

            measurementOne.per(s);

            measurementOne.should.not.match(measurementTwo);

            done();
        });

        it('should not affect values', function(done) {
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var hr = new Unit('hr', '', 3600, UnitTypes.TIME);
            var measurement = new Measurement(12.5, km);

            measurement.getValue().should.be.exactly(12.5);

            measurement.per(hr);

            measurement.getValue().should.be.exactly(12.5);

            done();
        });
    });

    describe('#toString()', function() {
        it('should convert to a string', function(done) {
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var measurement = new Measurement(12.5, km);

            measurement.toString().should.be.a.String;

            done();
        });

        it('should convert to a formatted string', function(done) {
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var measurement = new Measurement(12.5, km);

            measurement.toString().should.be.exactly('12.5km');

            done();
        });

        it('should handle compound measurements', function(done) {
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var s = new Unit('s', '', 1, UnitTypes.TIME);
            var measurement = new Measurement(12.5, km).per(s);

            measurement.toString().should.be.exactly('12.5km/s');

            done();
        });
    });

});
