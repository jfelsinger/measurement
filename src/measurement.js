'use strict';

var CompoundUnit = require('./compound-units'),
    UnitTypes = require('./unit-types');

var Measurement = function(value, unit) {
    this.value = value;
    this.unit = unit;
};

function convertCompoundUnit(compoundUnit, unit, index) {
    // Default to the root unit.
    if (index == undefined)
        index = 0;

    // Get array of sub units from current unit
    var subUnits = compoundUnit.subUnits.slice(0);

    // Check if the unit at the given index matches type
    // with the new unit
    if ((unit.type != subUnits[index].type))
        throw new Error('Invalid Units: a unit of type `' + subUnits[index].type
                        + '` cannot be converted to a unit of type `'
                        + unit.type + '`');

    // adjust the copy of the subunits array to create
    // a new compound unit based off of the original
    subUnits[index] = unit;
    return new CompoundUnit(subUnits);
}

Measurement.prototype.getValue = function(unit, index) {
    if (typeof unit === 'string')
        unit = this.units[unit];

    if (unit !== undefined && this.unit.type === UnitTypes.COMPOUND) {
        unit = convertCompoundUnit(this.unit, unit, index);
    }

    if (unit === undefined)
        unit = this.unit;

    return this.value * (this.unit.getMultiplier() / unit.getMultiplier());
};

// Returns an equivalent measurement with a new unit
Measurement.prototype.as = function(unit, index) {
    if (typeof unit === 'string')
        unit = this.units[unit];

    var newValue = this.getValue(unit, index);

    // Change directly one of the units inside a compound unit
    if (this.unit.type == UnitTypes.COMPOUND) {
        unit = convertCompoundUnit(this.unit, unit, index);
    }

    if ((unit.type != this.unit.type))
        throw new Error('Invalid Units: a unit of type `' + this.unit
                        + '` cannot be converted to a unit of type `'
                        + unit + '`');

    return new Measurement(newValue, unit);
};

// Converts a measurement to another unit of measure
Measurement.prototype.to = function(unit, index) {
    if (typeof unit === 'string')
        unit = this.units[unit];

    var convertedMeasurement = this.as(unit, index);

    this.value = convertedMeasurement.value;
    this.unit = convertedMeasurement.unit;

    return this;
};

Measurement.prototype.per = function(unit) {
    if (typeof unit === 'string')
        unit = this.units[unit];

    if (this.unit.type != UnitTypes.COMPOUND) {
        var compoundUnit = new CompoundUnit();
        compoundUnit.addUnit(this.unit);
        this.unit = compoundUnit;
    }

    this.unit.addUnit(unit);

    return this;
};

Measurement.prototype.toString = function() {
    return this.value + this.unit;
};

module.exports = Measurement;
