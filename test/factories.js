'use strict';

var UnitTypes = require('../src/unit-types'),
    Unit = require('../src/units'),
    CompoundUnit = require('../src/compound-units'),
    Scalar = require('../src/scalar'),
    ScalarFactory = require('../src/factory');

var should = require('should');

describe('ScalarFactory', function() {

    it('should construct', function(done) {
        var mf = new ScalarFactory();
        done();
    });

    it('should construct with units', function(done) {
        var mf = new ScalarFactory();

        mf.should.have.property('units').which.is.an.Object;

        done();
    });

    describe('#measure()', function() {
        it('should return a scalar', function(done) {
            var mf = new ScalarFactory();
            var measurement = mf.measure(1, 'in');

            measurement.should.be.an.instanceOf(Scalar);

            done();
        });

        it('should return the correct unit', function(done) {
            var mf = new ScalarFactory();
            var unit = mf.units['in'];
            var measurement = mf.measure(1, 'in');

            measurement.unit.should.match(unit);

            done();
        });

        it('should have correct unit values', function(done) {
            var mf = new ScalarFactory();
            var measurement = mf.m(12.5); // 12.5m

            measurement.value.should.be.exactly(12.5);
            measurement.getValue().should.be.exactly(12.5);

            // As feet
            measurement = measurement.ft();

            measurement.value.should.be.approximately(41.0105, 0.0001);
            measurement.getValue().should.be.approximately(41.0105, 0.0001);

            // As km
            measurement = measurement.km();

            measurement.value.should.be.approximately(0.0125, 0.0001);
            measurement.getValue().should.be.approximately(0.0125, 0.0001);

            // As feet
            measurement = measurement.ft();

            measurement.value.should.be.approximately(41.0105, 0.0001);
            measurement.getValue().should.be.approximately(41.0105, 0.0001);

            // As inches
            measurement = measurement.in();

            measurement.value.should.be.approximately(492.126, 0.0001);
            measurement.getValue().should.be.approximately(492.126, 0.0001);

            // As meters
            measurement = measurement.m();

            measurement.value.should.be.approximately(12.5, 0.0001);
            measurement.getValue().should.be.approximately(12.5, 0.0001);

            done();
        });
    });

    describe('#measurement()', function() {
        it('should return a scalar', function(done) {
            var mf = new ScalarFactory();
            var measurement = mf.measurement(1, 'in');

            measurement.should.be.an.instanceOf(Scalar);

            done();
        });

        it('should return the correct unit', function(done) {
            var mf = new ScalarFactory();
            var unit = mf.units['in'];
            var measurement = mf.measurement(1, 'in');

            measurement.unit.should.match(unit);

            done();
        });
    });

    describe('#addUnit()', function() {
        it('should add unit to factory', function(done) {
            var mf = new ScalarFactory();
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
            var mf = new ScalarFactory();

            mf.units.should.not.have.key('hh');
            should(mf.units.hh).not.be.ok;

            var unit = mf.newUnit('hh', '', 9.84251969, UnitTypes.LENGTH);

            unit.should.be.an.instanceOf(Unit);
            mf.units.hh.should.match(unit);

            done();
        });
    });

});
