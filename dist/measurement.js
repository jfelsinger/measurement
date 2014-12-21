(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Unit = require('./units'),
    UnitTypes = require('./unit-types');

/**
 * public constructor CompoundUnit([Unit,Array] ...)
 *
 * Create a new instance of a compound unit, possibly with
 * included sub-units.
 *
 * @constructor
 */
var CompoundUnit = function compoundUnit() {
    this.subUnits = arguments.length ? Array.prototype.slice.call(arguments) : [];

    // If the first argument is an array assume that it is the
    // intended value and base subUnits off of it.
    if (Object.prototype.toString.call(this.subUnits[0]) === '[object Array]')
        this.subUnits = this.subUnits[0];

    this.type = UnitTypes.COMPOUND;
};

/**
 * private numeric combineUnitMultipliers(Array<Unit> units)
 *
 * Returns a multiplier representative of multipliers of all the
 * combined units
 */
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

/**
 * public void addUnit(Unit unit)
 *
 * Adds a unit to the list of units that are compounded together
 */
CompoundUnit.prototype.addUnit = function(unit) {
    this.subUnits.push(unit);
    return this;
};

/**
 * public numeric getMultiplier()
 *
 * Returns a multiplier that is representative of all units in 
 * the combined unit system.
 */
CompoundUnit.prototype.getMultiplier = function() {
    return combineUnitMultipliers(this.subUnits);
};

/**
 * public string toString()
 *
 * Does what you think it would do,
 * ex) 'km/h'
 */
CompoundUnit.prototype.toString = function() {
    var result = '';
    result += this.subUnits.join('/');
    return result;
};

// Copy functionality so new units can be based off coupound units
CompoundUnit.prototype.makeBase = Unit.prototype.makeBase;


module.exports = CompoundUnit;

},{"./unit-types":6,"./units":7}],2:[function(require,module,exports){
'use strict';

var Scalar = require('./scalar'),
    UnitTypes = require('./unit-types'),
    Unit = require('./units');

/**
 * public constructor ScalarFactory()
 *
 * creates a new instance of a scalar measurement factory, setup
 * with all the fixins
 *
 * @constructor
 */
var ScalarFactory = function SF() {
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

    // Set the units variable in the scalars prototype to match
    Scalar.prototype.units = this.units;
};

/**
 * public Scalar measure(...)
 *
 * Returns a scalar object
 *
 * args:
 * (string valueString)
 * (numeric value, string unitString)
 * (numeric value, Unit unit)
 */
ScalarFactory.prototype.measure = 
ScalarFactory.prototype.measurement = 
ScalarFactory.prototype.scalar = 
function() {
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

    return new Scalar(value, unit);
};

/**
 * public this<ScalarFactory> addUnit(Unit unit, string index)
 *
 * Add a unit to the factory
 */
ScalarFactory.prototype.addUnit = function(unit, index) {
    if (index === undefined)
        index = unit + '';

    // Add unit to units array
    if (this.units[index] === undefined)
        this.units[index] = unit;

    // Add conversion functions to scalar prototype
    if (Scalar.prototype[index] === undefined)
        Scalar.prototype[index] = (function(unit) {

            return function(index) {
                return this.as(unit, index);
            };

        })(unit);

    // Add methods for getting scalars
    if (this[index] === undefined)
        this[index] = (function(unit) {

            return function(value) {
                if (value === undefined)
                    value = 1;

                return new Scalar(value, unit);
            };

        })(unit);

    return this;
};

/**
 * public Unit newUnit(...)
 *
 * Create a unit and add it to the factory
 *
 * see unit.js:Unit() comments
 */
ScalarFactory.prototype.createUnit = 
ScalarFactory.prototype.newUnit = 
function() {
    var U = function(args) {
        return Unit.apply(this, args);
    };
    U.prototype = Unit.prototype;

    var newUnit = new U(arguments);
    this.addUnit(newUnit);

    return newUnit;
};


module.exports = ScalarFactory;

},{"./scalar":5,"./unit-types":6,"./units":7}],3:[function(require,module,exports){
/* jslint browser: true */

(function (root, factory) {

    'use strict';

    console.log('Build', root);

    root.measurement = factory();

}(window, function() {

    'use strict';

    var measurement = require('./measurement');
    console.log(measurement);

    return measurement;

}));

},{"./measurement":4}],4:[function(require,module,exports){
'use strict';

var measurement = exports;

measurement.Factory         = require('./factory');
measurement.Scalar          = require('./scalar');
measurement.UnitTypes       = require('./unit-types');
measurement.Unit            = require('./units');
measurement.CompoundUnit    = require('./compound-units');

},{"./compound-units":1,"./factory":2,"./scalar":5,"./unit-types":6,"./units":7}],5:[function(require,module,exports){
'use strict';

var CompoundUnit = require('./compound-units'),
    UnitTypes = require('./unit-types');



/**
 * public constructor Scalar(numeric value, Unit unit)
 *
 * create a new instance of a scalar measurement.
 *
 * @constructor
 */
var Scalar = function(value, unit) {
    this.value = value;
    this.unit = unit;
};



/**
 * private CompoundUnit convertCompoundUnit(
 *      CompoundUnit compoundUnit,
 *      Unit unit,
 *      int index
 *
 * converts one of the units, default to first unit, in a
 * compound unit to another. Similar to converting a regular Unit
 */
function convertCompoundUnit(compoundUnit, unit, index) {
    // Default to the root unit.
    if (index == undefined)
        index = 0;

    // Get array of sub units from current unit
    var subUnits = compoundUnit.subUnits.slice(0);

    // Check if the unit at the given index matches type
    // with the new unit
    if ((unit.type != subUnits[index].type))
        throw new Error('Invalid Units: a unit of type `' + 
                        subUnits[index].type + 
                        '` cannot be converted to a unit of type `' + 
                        unit.type + '`');

    // adjust the copy of the subunits array to create
    // a new compound unit based off of the original
    subUnits[index] = unit;
    return new CompoundUnit(subUnits);
}



/**
 * public numeric getValue(Unit unit, int index)
 *
 * Returns a numeric value representative of the scalar value,
 * optionally a value of the scalar based on a seperate unit.
 *
 * 25km -> 25
 */
Scalar.prototype.getValue = function(unit, index) {
    if (typeof unit === 'string')
        unit = this.units[unit];

    if (unit !== undefined && this.unit.type === UnitTypes.COMPOUND) {
        unit = convertCompoundUnit(this.unit, unit, index);
    }

    if (unit === undefined)
        unit = this.unit;

    return this.value * (this.unit.getMultiplier() / unit.getMultiplier());
};



/**
 * public Unit as(Unit unit, int index)
 *
 * Returns an equivalent scalar with a new unit
 */
Scalar.prototype.as = function(unit, index) {
    if (typeof unit === 'string')
        unit = this.units[unit];

    var newValue = this.getValue(unit, index);

    // Change directly one of the units inside a compound unit
    if (this.unit.type == UnitTypes.COMPOUND) {
        unit = convertCompoundUnit(this.unit, unit, index);
    }

    if ((unit.type != this.unit.type))
        throw new Error('Invalid Units: a unit of type `' + this.unit +
                        '` cannot be converted to a unit of type `' +
                        unit + '`');

    return new Scalar(newValue, unit);
};



/**
 * public this<Unit> to(Unit unit, int index)
 *
 * Converts a scalar to another unit of measure
 */
Scalar.prototype.to = function(unit, index) {
    if (typeof unit === 'string')
        unit = this.units[unit];

    var convertedScalar = this.as(unit, index);

    this.value = convertedScalar.value;
    this.unit = convertedScalar.unit;

    return this;
};



/**
 * public this<Unit> as(Unit unit)
 *
 * Makes a compund unit representing the current unit
 * per the given unit.
 *
 * km.per(hr) -> km/hr
 */
Scalar.prototype.per = function(unit) {
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



/**
 * public string toString()
 *
 * Does what you think it would do,
 * ex) '2km'
 * ex) '2km/hr'
 */
Scalar.prototype.toString = function() {
    return this.value + this.unit;
};



module.exports = Scalar;

},{"./compound-units":1,"./unit-types":6}],6:[function(require,module,exports){
/**
 * Represents a type of base physical property that a unit can refer to
 * @enum {string}
 */
var UnitTypes = {
    MASS: 'MASS',
    LENGTH: 'LENGTH',
    VOLUME: 'VOLUME',
    MEMORY: 'MEMORY',
    TIME: 'TIME',

    // Compound units represent any generic combination of the above
    COMPOUND: 'COMPOUND',
    VOID: undefined
};

module.exports = UnitTypes;

},{}],7:[function(require,module,exports){
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

},{"./unit-types":6}]},{},[3])