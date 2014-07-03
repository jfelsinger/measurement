'use strict';

var UnitTypes = require('../src/unit-types'),
    Unit = require('../src/units');

var should = require('should');

describe('Unit', function() {

    it('should construct a base unit', function(done) {
        var meter = new Unit('m', UnitTypes.LENGTH);

        meter.should.have.property('base', 'm');
        meter.prefix.should.not.be.ok;
        meter.should.have.property('prefix', '');
        meter.should.have.property('multiplier', '1');
        meter.should.have.property('type', UnitTypes.LENGTH);

        done();
    });

    it('should construct a prefixed unit', function(done) {
        var kilometer = new Unit('m', 'k', 1000, UnitTypes.LENGTH);

        kilometer.should.have.property('base', 'm');
        kilometer.should.have.property('prefix', 'k');
        kilometer.should.have.property('multiplier', 1000);
        kilometer.should.have.property('type', UnitTypes.LENGTH);

        done();
    });

    it('should construct a void unit', function(done) {
        var voidUnit = new Unit();

        voidUnit.base.should.not.be.ok;
        voidUnit.prefix.should.not.be.ok;
        voidUnit.should.have.property('multiplier', 1);
        voidUnit.should.have.property('type', UnitTypes.VOID);

        done();
    });

    describe('#getMultiplier', function() {

        it('should return the correct multiplier from base units', function(done) {
            var meter = new Unit('m', UnitTypes.LENGTH);
            var kilometer = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var voidUnit = new Unit();

            meter.getMultiplier().should.be.exactly(1);
            kilometer.getMultiplier().should.be.exactly(1000);
            voidUnit.getMultiplier().should.be.exactly(1);

            done();
        });

    });

    describe('#makeBase', function() {
        // I can't remember what this function was for, so I can't really test it.
    });

    describe('#tostring()', function() {
        it('should convert to a string', function(done) {
            var meter = new Unit('m', UnitTypes.LENGTH);
            var kiloMeter = new Unit('m', 'k', 1000, UnitTypes.LENGTH);
            var voidUnit = new Unit();

            meter.toString().should.be.exactly('m');
            kiloMeter.toString().should.be.exactly('km');
            should(voidUnit.toString()).not.be.ok;

            done();
        });
    });

});
