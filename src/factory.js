'use strict';

var Measurement = require('./measurement'),
    UnitTypes = require('./unit-types'),
    Unit = require('./units');

var MeasurementFactory = function m() {
    this.units = {};

    var siPrefixes = [
        {prefix: 'Y',  factor:  24},
        {prefix: 'Z',  factor:  21},
        {prefix: 'E',  factor:  18},
        {prefix: 'P',  factor:  15},
        {prefix: 'T',  factor:  12},
        {prefix: 'G',  factor:   9},
        {prefix: 'M',  factor:   6},
        {prefix: 'k',  factor:   3},
        {prefix: 'h',  factor:   2},
        {prefix: 'da', factor:   1},
        {prefix: '',   factor:   0},
        {prefix: 'd',  factor:  -1},
        {prefix: 'c',  factor:  -2},
        {prefix: 'm',  factor:  -3},
        {prefix: 'u',  factor:  -6},
        {prefix: 'n',  factor:  -9},
        {prefix: 'p',  factor: -12},
        {prefix: 'f',  factor: -15},
        {prefix: 'a',  factor: -18},
        {prefix: 'z',  factor: -21},
        {prefix: 'y',  factor: -24}
    ];

    var siBases = [
        {base: 'g', type: UnitTypes.MASS },
        {base: 'm', type: UnitTypes.LENGTH },
        {base: 'l', type: UnitTypes.VOLUME },
        {base: 'b', type: UnitTypes.MEMORY },
        {base: 's', type: UnitTypes.TIME }
    ];

    // Add si units to unit object so they can be received later
    for (var i = 0; i < siBases.length; i++) {
        var siBase = siBases[i];
        for (var j = 0; j < siPrefixes.length; j++) {
            var siPrefix = siPrefixes[j];
            var unit = new Unit(siBase.base, siPrefix.prefix, Math.pow(10, siPrefix.factor), siBase.type);

            this.addUnit(unit);
        }
    }

    // Add extra units that don't fit into the si scheme.
    //
    // each units factor has to be based off of the base length unit, the meter

    // length
    //
    var inch = new Unit('in', '', 0.0254, UnitTypes.LENGTH);
    this.addUnit(inch);

    var foot = new Unit('ft', '', 0.3048, UnitTypes.LENGTH);
    this.addUnit(foot);

    var yard = new Unit('yd', '', 0.9144, UnitTypes.LENGTH);
    this.addUnit(yard);

    var mile = new Unit('mi', '', 1609.34, UnitTypes.LENGTH);
    this.addUnit(mile);

    var astronomical = new Unit('au', '', 149597870700, UnitTypes.LENGTH);
    this.addUnit(astronomical);

    var lightyear = new Unit('ly', '', 9460730472580800, UnitTypes.LENGTH);
    this.addUnit(lightyear);

    // volume
    //
    var ounce = new Unit('oz', '', 0.0295735, UnitTypes.VOLUME);
    this.addUnit(ounce);

    var cup = new Unit('c', '', 0.236588, UnitTypes.VOLUME);
    this.addUnit(cup);

    var pint = new Unit('pt', '', 0.473176, UnitTypes.VOLUME);
    this.addUnit(pint);

    var quart = new Unit('qt', '', 0.946353, UnitTypes.VOLUME);
    this.addUnit(quart);

    var gallon = new Unit('gal', '', 3.78541, UnitTypes.VOLUME);
    this.addUnit(gallon);

    // time
    //
    var minute = new Unit('min', '', 60, UnitTypes.TIME);
    this.addUnit(minute);

    var hour = new Unit('h', '', 3600, UnitTypes.TIME);
    this.addUnit(hour);
    this.addUnit(hour, 'hr');

    var day = new Unit('d', '', 86400, UnitTypes.TIME);
    this.addUnit(day);

    // Set the units variable in the measurements prototype to match
    Measurement.prototype.units = this.units;
};

// Returns a measurement object
//
// (valueString)
// (value, unitString)
// (value, unit)
MeasurementFactory.prototype.measure = MeasurementFactory.prototype.measurement = function() {
    var value = arguments[0];
    var unit = arguments[1];

    if (arguments.length == 1) {
        var regex = /[a-z]+/gi;
        var index = value.search(regex);

        unit = value.substring(index);
        value = value.substring(0, index);
    }

    if (typeof unit === 'string')
        unit = this.units[unit];

    return new Measurement(value, unit);
};

// Add a unit to the factory
MeasurementFactory.prototype.addUnit = function(unit, index) {
    if (index === undefined)
        index = unit + '';

    // Add unit to units array
    if (this.units[index] === undefined)
        this.units[index] = unit;

    // Add conversion functions to measurement prototype
    if (Measurement.prototype[index] === undefined)
        Measurement.prototype[index] = (function(unit) {

            return function(index) {
                return this.as(unit, index);
            };

        })(unit);

    // Add methods for getting measurements
    if (this[index] === undefined)
        this[index] = (function(unit) {

            return function(value) {
                if (value === undefined)
                    value = 1;

                return new Measurement(value, unit);
            };

        })(unit);

    return this;
};

// Create a unit and add it to the factory
MeasurementFactory.prototype.newUnit = function() {
    var U = function(args) {
        return Unit.apply(this, args);
    };
    U.prototype = Unit.prototype;

    var newUnit = new U(arguments);
    this.addUnit(newUnit);

    return newUnit;
};



module.exports = MeasurementFactory;
