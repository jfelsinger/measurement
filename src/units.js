'use strict';

var UnitTypes = require('./unit-types');

/**
 * public constructor Unit(...)
 *
 * Represents a unit of measurement
 *
 * args:
 * (Unit base)
 * (Unit base, UnitType type)
 * (Unit base, string prefix, numeric multiplier)
 * (Unit base, string prefix, numeric multiplier, UnitType type)
 * @constructor
 */
var Unit = function unit() {
    this.base = arguments[0] || '';

    // Ordering logic changes when a third argument is introduced
    //
    // Is this a good solution? I like the argument ordering change,
    // but it's hard to say for sure if this is the best way.
    // #PoorBoyOverloading
    if (arguments.length >= 3) {

        this.prefix = arguments[1] || '';

        this.multiplier = isNaN(arguments[2]) ? 1 : +arguments[2];

        this.type = arguments[3] || UnitTypes.VOID;

    } else {

        this.prefix = '';

        this.multiplier = 1;

        this.type = arguments[1] || UnitTypes.VOID;

    }
};

/**
 * public numeric getMultiplier()
 *
 * returns a multiplier representatice of the unit, and
 * optionally any units this one is based off of
 */
Unit.prototype.getMultiplier = function() {
    var baseMultiplier = 1;

    // If the unit is based on another compound the multipliers
    if (this.baseUnit) {
        baseMultiplier = this.baseUnit.getMultiplier();
    }

    return this.multiplier * baseMultiplier;
};

/**
 * public Unit makeBase(Unit base, numeric multiplier=1, UnitType type)
 *
 * Creates a unit based off of the current one;
 * not as flexible as creating a unit on its own, base units have no
 * need for prefixes so that is also left out
 */
Unit.prototype.makeBase = function(base, multiplier, type) {
    // set default values for arguments if they are not supplied
    base = '' || base;
    multiplier = multiplier !== undefined ? multiplier : 1;
    type = type !== undefined ? type : this.type;

    // Create the new unit and set its base
    var newUnit = new Unit(base, '', multiplier, type);
    newUnit.baseUnit = this;

    return newUnit;
};

/**
 * public string toString()
 *
 * Does what you think it would do,
 * ex) 'km'
 */
Unit.prototype.toString = function() {
    return this.prefix + this.base || this.type;
};


module.exports = Unit;
