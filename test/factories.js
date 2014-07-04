'use strict';

var UnitTypes = require('../src/unit-types'),
    Unit = require('../src/units'),
    CompoundUnit = require('../src/compound-units'),
    Measurement = require('../src/measurement'),
    MeasurementFactory = require('../src/factory');

var should = require('should');

describe('MeasurementFactory', function() {

    it('should construct', function(done) {
        var mf = new MeasurementFactory();
        done();
    });

    it('should construct with units', function(done) {
        var mf = new MeasurementFactory();

        mf.should.have.property('units').which.is.an.Object;

        done();
    });

    describe('#measure()', function() {
        it('should return a measurement', function(done) {
            var mf = new MeasurementFactory();
            var measurement = mf.measure(1, 'in');

            measurement.should.be.an.instanceOf(Measurement);

            done();
        });

        it('should return the correct unit', function(done) {
            var mf = new MeasurementFactory();
            var unit = mf.units['in'];
            var measurement = mf.measure(1, 'in');

            measurement.unit.should.match(unit);

            done();
        });
    });

    describe('#measurement()', function() {
        it('should return a measurement', function(done) {
            var mf = new MeasurementFactory();
            var measurement = mf.measurement(1, 'in');

            measurement.should.be.an.instanceOf(Measurement);

            done();
        });

        it('should return the correct unit', function(done) {
            var mf = new MeasurementFactory();
            var unit = mf.units['in'];
            var measurement = mf.measurement(1, 'in');

            measurement.unit.should.match(unit);

            done();
        });
    });

    describe('#addUnit()', function() {
        it('should add unit to factory', function(done) {
            var mf = new MeasurementFactory();
            var hand = new Unit('hh', '', 9.84251969, UnitTypes.LENGTH);

            mf.units.should.not.have.key('hh');
            should(mf.units.hh).not.be.ok;

            mf.addUnit(hand);

            mf.units.hh.should.match(hand);

            done();
        });
    });

    describe('#newUnit()', function() {
        it('should add a new unit', function(done) {
            var mf = new MeasurementFactory();

            mf.units.should.not.have.key('hh');
            should(mf.units.hh).not.be.ok;

            var unit = mf.newUnit('hh', '', 9.84251969, UnitTypes.LENGTH);

            unit.should.be.an.instanceOf(Unit);
            mf.units.hh.should.match(unit);

            done();
        });
    });

});
