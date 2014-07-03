'use strict';

var UnitTypes = require('../src/unit-types'),
    Unit = require('../src/units'),
    CompoundUnit = require('../src/compound-units');

var should = require('should');

describe('CompoundUnit', function() {

    it('should construct', function(done) {
        var unit = new CompoundUnit();

        unit.should.have.property('type', UnitTypes.COMPOUND);
        unit.should.have.property('subUnits', []);

        // Methods
        unit.should.have.property('addUnit');
        unit.should.have.property('getMultiplier');
        unit.should.have.property('makeBase');

        done();
    });

    it('should construct with units', function(done) {
        var m = new Unit('m', '', 1, UnitTypes.LENGTH);
        var s = new Unit('s', '', 1, UnitTypes.TIME);
        var unit = new CompoundUnit(m,s);

        unit.should.have.property('type', UnitTypes.COMPOUND);
        unit.should.have.property('subUnits').with.lengthOf(2);

        done();
    });

    describe('#addUnit()', function() {
        it('should add from a new unit', function(done) {
            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var s = new Unit('s', '', 1, UnitTypes.TIME);
            var unit = new CompoundUnit();

            unit.should.have.property('subUnits').with.lengthOf(0);

            unit.addUnit(m);
            unit.should.have.property('subUnits').with.lengthOf(1);
            unit.subUnits[0].should.be.exactly(m);

            unit.addUnit(s);
            unit.should.have.property('subUnits').with.lengthOf(2);
            unit.subUnits[0].should.be.exactly(m);
            unit.subUnits[1].should.be.exactly(s);

            // Try from a different type of new unit
            unit = new CompoundUnit(m);
            unit.should.have.property('subUnits').with.lengthOf(1);
            unit.subUnits[0].should.be.exactly(m);

            unit.addUnit(s);
            unit.should.have.property('subUnits').with.lengthOf(2);
            unit.subUnits[0].should.be.exactly(m);
            unit.subUnits[1].should.be.exactly(s);

            done();
        });
    });

    describe('#getMultiplier()', function() {
        it('should return corrent multiplier', function(done) {
            var unit = new CompoundUnit();

            unit.getMultiplier().should.be.exactly(1);

            var m = new Unit('m', '', 1, UnitTypes.LENGTH);
            var min = new Unit('min', '', 60, UnitTypes.TIME);
            unit = new CompoundUnit(m,min);

            unit.getMultiplier().should.be.exactly(1/60);
            unit.addUnit(min).getMultiplier().should.be.exactly(1/60/60);

            unit = new CompoundUnit(min,min);
            unit.getMultiplier().should.be.exactly(60/60);

            done();
        });
    });
});
