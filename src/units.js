'use strict';

var UnitTypes = require('./unit-types');

/**
 * Represents a unit of measurement
 *
 * args:
 * (base[0])
 * (base[0], type[1])
 * (base[0], prefix[1], multiplier[2])
 * (base[0], prefix[1], multiplier[2], type[3])
 * @constructor
 */
var Unit = function unit() {
    this.base = arguments[0] || '';

    // Ordering logic changes when a third argument is introduced
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

Unit.prototype.getMultiplier = function() {
    var baseMultiplier = 1;

    // If the unit is based on another compound the multipliers
    if (this.baseUnit) {
        baseMultiplier = this.baseUnit.getMultiplier();
    }

    return this.multiplier * baseMultiplier;
};

/**
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

Unit.prototype.toString = function() {
    return this.prefix + this.base || this.type;
};



module.exports = Unit;
