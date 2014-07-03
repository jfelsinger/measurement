'use strict';

var Unit = require('./units'),
    UnitTypes = require('./unit-types');

var CompoundUnit = function compoundUnit() {
    this.subUnits = arguments.length ? Array.prototype.slice.call(arguments) : [];

    // If the first argument is an array assume that it is the
    // intended value and base subUnits off of it.
    if (Object.prototype.toString.call(this.subUnits[0]) === '[object Array]')
        this.subUnits = this.subUnits[0];

    this.type = UnitTypes.COMPOUND;
};

// void addUnit(Unit unit)
//
// Adds a unit to the list of units that are compounded together
CompoundUnit.prototype.addUnit = function(unit) {
    this.subUnits.push(unit);
    return this;
};

// numeric getMultiplier()
//
// Returns a multiplier that is representative of all units in 
// the combined unit system.
CompoundUnit.prototype.getMultiplier = function() {
    return combineUnitMultipliers(this.subUnits);
};

// Copy functionality so new units can be based off coupound units
CompoundUnit.prototype.makeBase = Unit.prototype.makeBase;

CompoundUnit.prototype.toString = function() {
    var result = '';
    result += this.subUnits.join('/');
    return result;
};

function combineUnitMultipliers(units) {
    var result = 1;

    if (units.length) {
        result = units[0].getMultiplier();

        for(var i=1; i < units.length; ++i)
        {
            result /= units[i].getMultiplier();
        }
    }

    return result;
}

module.exports = CompoundUnit;
