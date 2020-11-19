Measurement [![Build Status](https://secure.travis-ci.org/jfelsinger/measurement.png?branch=master)](https://travis-ci.org/jfelsinger/measurement) [![Analytics](https://ga-beacon.appspot.com/UA-46797352-2/measurement/index)](https://github.com/igrigorik/ga-beacon)
===========

A flexible library for handling unit conversions

## Installation

```
npm install measurement
```

or include it on your page.

```html
<script src="dist/measurement.min.js" type="text/javascript"></script>
```

## Basic Usage

To start initialize a new instance of the measurement factory.

```js
var measurement = require('measurement');
var mf = new measurement.Factory();

// Get a new measurement
var measurement = mf.km(25);

// from a string
measurement = mf.measure('25km');

// or
measurement = mf.measurement('25km');


// as a combination of a scalar value and a unit
measurement = mf.measure(25, 'km');
measurement = mf.measure(25, mf.units.km);

// or
measurement = mf.measurement(25, 'km');
measurement = mf.measurement(25, mf.units.km);


// Get the scalar value that represent the measurement
var value = measurement.getValue();

// Get the value in terms of another unit
var valueInMeters = measurement.getValue('m');  // or .getValue(mf.units.m);

```

## Converting Units

Measurements can be converted from one unit to another by calling
a unit method or by using the generic ``to()`` and ``as()`` methods.

```js
measurement = mf.km(8);

// convert to miles using the unit method
var miles = measurement.mi();

// using the as() method returns a copy with the converted unit
var miles = measurement.as('mi');
var miles = measurement.as(mf.units.mi);

// using to() converts the object itself to the given unit
measurement.to('mi');
measurement.to(mf.units.mi);
```

## Compound Units

Compound units can be built up from the base units of ``TIME``, ``LENGTH``, 
``VOLUME``, ``MEMORY``,  and ``MASS`` to represent values such as speed or
transfer rate.

```js
var distance = mf.km(25);

// The per() method adds another unit to the current, compounding it

var speed = distance.per('hr');  // or per(mf.units.hr)

// There isn't a hard limit to the amount of units you can compound on

// 25km/hr/s, acceleration at a pace of 25km/hr every second
var acceleration = speed.per('s'); // mf.km(25).per('hr').per('s')
```

## Converting Compound Units

Measurements with compound units are special and act as an array of different
units bunched together. The unit methods act on separate pieces of compound units, 
while the ``to()`` and ``as()`` methods act differently whether another compound
unit or a base unit is supplied.

```js
var speed = mf.km(25).per('hr'); // => 25km/h

// Using the unit method to convert to mi/h
var mph = speed.mi();

// Unit methods default to changing the first unit in the list,
// but they can also be supplied a zero-based index
var metersPerSecond = speed.m().s(1);  // => 6.9444m/s

// All of the functions that deal with units can take an index parameter to
// deal with the individual parts of compound units
var valueInKilometersPerSecond = speed.getValue('s', 1);
```
