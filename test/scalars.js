'use strict';

var UnitTypes = require('../src/unit-types'),
    Unit = require('../src/units'),
    CompoundUnit = require('../src/compound-units'),
    Scalar = require('../src/scalar');

var should = require('should');

describe('Scalar', function() {

    it('should construct', function(done) {
        var m = new Unit('m', '', 1, UnitTypes.LENGTH);
        var scalar = new Scalar(5, m);

        scalar.should.have.property('unit', m);
        scalar.should.have.property('value', 5);

        done();
    });

    it('should construct with compound units', function(done) {
        var m = new Unit('m', '', 1, UnitTypes.LENGTH);
        var s = new Unit('s', '', 1, UnitTypes.TIME);
        var metersPerSecond = new CompoundUnit(m,s);

        var scalar = new Scalar(5, metersPerSecond);

        scalar.should.have.property('unit', metersPerSecond);
        scalar.should.have.property('value', 5);

        done();
    });

    describe('#getValue()', function() {
        it('should return correct values', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var s = new Unit('s', '', 1, UnitTypes.TIME);
            var min = new Unit('s', '', 60, UnitTypes.TIME);
            var mPerS = new CompoundUnit(m,s);
            var scalar = new Scalar(12.5, mPerS);

            scalar.getValue().should.be.exactly(12.5);
            scalar.getValue(km).should.be.exactly(0.0125);
            scalar.getValue(min,1).should.be.exactly(750);

            done();
        });

        it('should return correct values from compound units', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var scalar = new Scalar(12.5, m);

            scalar.getValue().should.be.exactly(12.5);
            scalar.getValue(km).should.be.exactly(0.0125);

            done();
        });
    });

    describe('#as()', function() {
        it('should return a scalar with a new unit', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var scalar = new Scalar(12.5, m).as(km);

            scalar.unit.should.be.exactly(km);

            done();
        });

        it('should convert value to match new unit', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var scalar = new Scalar(12.5, m);

            scalar.value.should.be.exactly(12.5);
            scalar.getValue().should.be.exactly(12.5);

            scalar = scalar.as(km);

            scalar.value.should.be.exactly(0.0125);
            scalar.getValue().should.be.exactly(0.0125);

            done();
        });

        it('should chain conversions to new units', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var feet = new Unit('ft', '', 0.3048, UnitTypes.LENGTH);
            var scalar = new Scalar(12.5, m);

            scalar.value.should.be.exactly(12.5);
            scalar.getValue().should.be.exactly(12.5);

            // As feet
            scalar = scalar.as(feet);

            scalar.value.should.be.approximately(41.0105, 0.0001);
            scalar.getValue().should.be.approximately(41.0105, 0.0001);

            // As km
            scalar = scalar.as(km);

            scalar.value.should.be.approximately(0.0125, 0.0001);
            scalar.getValue().should.be.approximately(0.0125, 0.0001);

            // As feet
            scalar = scalar.as(feet);

            scalar.value.should.be.approximately(41.0105, 0.0001);
            scalar.getValue().should.be.approximately(41.0105, 0.0001);

            // As meters
            scalar = scalar.as(m);

            scalar.value.should.be.approximately(12.5, 0.0001);
            scalar.getValue().should.be.approximately(12.5, 0.0001);

            done();
        });

        it('should not affect original scalar', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);

            var scalarOne = new Scalar(12.5, m);
            var scalarTwo = new Scalar(12.5, m);

            scalarOne.should.match(scalarTwo);

            scalarOne.as(km);

            scalarOne.should.match(scalarTwo);

            done();
        });
    });

    describe('#to()', function() {
        it('should convert to a scalar with a new unit', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);

            var scalar = new Scalar(12.5, m);
            scalar.to(km);

            scalar.unit.should.be.exactly(km);

            done();
        });

        it('should convert value to match new unit', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var scalar = new Scalar(12.5, m);

            scalar.value.should.be.exactly(12.5);
            scalar.getValue().should.be.exactly(12.5);

            scalar.to(km);

            scalar.value.should.be.exactly(0.0125);
            scalar.getValue().should.be.exactly(0.0125);

            done();
        });

        it('should chain conversions to new units', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var feet = new Unit('ft', '', 0.3048, UnitTypes.LENGTH);
            var scalar = new Scalar(12.5, m);

            scalar.value.should.be.exactly(12.5);
            scalar.getValue().should.be.exactly(12.5);

            // As feet
            scalar.to(feet);

            scalar.value.should.be.approximately(41.0105, 0.0001);
            scalar.getValue().should.be.approximately(41.0105, 0.0001);

            // As km
            scalar.to(km);

            scalar.value.should.be.approximately(0.0125, 0.0001);
            scalar.getValue().should.be.approximately(0.0125, 0.0001);

            // As feet
            scalar.to(feet);

            scalar.value.should.be.approximately(41.0105, 0.0001);
            scalar.getValue().should.be.approximately(41.0105, 0.0001);

            // As meters
            scalar.to(m);

            scalar.value.should.be.approximately(12.5, 0.0001);
            scalar.getValue().should.be.approximately(12.5, 0.0001);

            done();
        });

        it('should affect original scalar', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);

            var scalarOne = new Scalar(12.5, m);
            var scalarTwo = new Scalar(12.5, m);

            scalarOne.should.match(scalarTwo);

            scalarOne.to(km);

            scalarOne.should.not.match(scalarTwo);

            done();
        });
    });

    describe('#per()', function() {
        it('should create a compound unit from a scalar', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var s = new Unit('s', '', 1, UnitTypes.TIME);
            var scalar = new Scalar(12.5, m);

            scalar.unit.should.be.exactly(m);

            scalar = scalar.per(s);
            scalar.unit.type.should.be.exactly(UnitTypes.COMPOUND);

            done();
        });

        it('should affect original scalars', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var s = new Unit('s', '', 1, UnitTypes.TIME);
            var scalarOne = new Scalar(12.5, m);
            var scalarTwo = new Scalar(12.5, m);

            scalarOne.should.match(scalarTwo);

            scalarOne.per(s);

            scalarOne.should.not.match(scalarTwo);

            done();
        });

        it('should not affect values', function(done) {
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var hr = new Unit('hr', '', 3600, UnitTypes.TIME);
            var scalar = new Scalar(12.5, km);

            scalar.getValue().should.be.exactly(12.5);

            scalar.per(hr);

            scalar.getValue().should.be.exactly(12.5);

            done();
        });
    });

    describe('#toString()', function() {
        it('should convert to a string', function(done) {
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var scalar = new Scalar(12.5, km);

            scalar.toString().should.be.a.String;

            done();
        });

        it('should convert to a formatted string', function(done) {
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var scalar = new Scalar(12.5, km);

            scalar.toString().should.be.exactly('12.5km');

            done();
        });

        it('should handle compound scalars', function(done) {
            var km = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var s = new Unit('s', '', 1, UnitTypes.TIME);
            var scalar = new Scalar(12.5, km).per(s);

            scalar.toString().should.be.exactly('12.5km/s');

            done();
        });
    });

});
