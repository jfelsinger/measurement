Measurement [![Build Status](https://secure.travis-ci.org/jfelsinger/measurement.png?branch=master)](https://travis-ci.org/jfelsinger/measurement) [![Analytics](https://ga-beacon.appspot.com/UA-46797352-2/measurement/index)](https://github.com/igrigorik/ga-beacon)
===========

A flexible library for handling unit conversions

Measurements and conversions between most common units of measurements, as well
as some uncommon ones, are supported right out of the box.

This library should work in a NodeJs environment, in the browser, and also in
TypeScript.



## Installation

```
npm install measurement
```

or include it on your page.

```
<script src="dist/measurement.min.js" type="text/javascript"></script>
```

## Basic Usage

To start initialize a new instance of the measurement factory.


*TypeScript*

```
import { measurement } from 'measurement';

// Get a new measurement
let myMeasurement = measurement.km(25);

// from a string
myMeasurement = measurement.measure('25km');


// as a combination of a scalar value and a unit
myMeasurement = measurement.measure(25, 'km');
myMeasurement = measurement.measure(25, measurement.units.km);



// Get the raw value that represent the measurement
let value = myMeasurement.getValue(); // => 25

// or
let value = myMeasurement.value; // => 25



// Get the value in terms of another base unit
// a.k.a. convert the number to another unit
let valueInMeters = myMeasurement.getValue('m');  // => 2500

// or
let valueInMeters = myMeasurement.getValue(measurement.units.m); // => 2500

```

*JavaScript*

```
let m = require('measurement').measurement;

// Get a new measurement
let measurement = m.km(25);

// from a string
measurement = m.measure('25km');

// or
measurement = m.measurement('25km');


// as a combination of a scalar value and a unit
measurement = m.measure(25, 'km');
measurement = m.measure(25, m.units.km);

// or
measurement = m.measurement(25, 'km');
measurement = m.measurement(25, m.units.km);



// Get the scalar value that represent the measurement
let value = measurement.getValue(); // => 25

// or
let value = measurement.value; // => 25



// Get the value in terms of another base unit
let valueInMeters = measurement.getValue('m');  // => 2500

// or
let valueInMeters = measurement.getValue(m.units.m); // => 2500

```

## Converting Units

Measurements can be converted from one unit to another by calling
a unit method or by using the generic ``to()`` and ``as()`` methods.

```
measurement = mf.km(8);

// convert to miles using the unit method
let miles = measurement.mi();

// equivalent to using the as() method,
// which returns a copy with the converted unit
let miles = measurement.as('mi');
let miles = measurement.as(mf.units.mi);




// using to() converts the initial object itself to the given unit
measurement.to('mi');
measurement.to(mf.units.mi);
```

## Compound Units

Compound units can be built up from the base units of ``TIME``, ``LENGTH``,
``VOLUME``, ``MEMORY``,  and ``MASS`` to represent values such as speed or
transfer rate.

```
let distance = mf.km(25);

// The per() method adds another unit to the current, compounding it

let speed = distance.per('hr');  // or per(mf.units.hr)

// There isn't a hard limit to the amount of units you can compound on

// 25km/hr/s, acceleration at a pace of 25km/hr every second
let acceleration = speed.per('s'); // mf.km(25).per('hr').per('s')
```

## Converting Compound Units

Measurements with compound units are special and act as an array of different
units bunched together. The unit methods act on separate pieces of compound units,
while the ``to()`` and ``as()`` methods act differently whether another compound
unit or a base unit is supplied.

```
let speed = mf.km(25).per('hr'); // => 25km/h

// Using the unit method to convert to mi/h
let mph = speed.mi();

// Unit methods default to changing the first unit in the list,
// but they can also be supplied a zero-based index
let metersPerSecond = speed.m().s(1);  // => 6.9444m/s

// All of the functions that deal with units can take an index parameter to
// deal with the individual parts of compound units
let valueInKilometersPerSecond = speed.getValue('s', 1);
```


## Accessing Units and Measurements

Units are available on the `.units` property, the top-level has helper functions
for getting a scalar measurement for a given unit. Properties and keys are
created by default for most common units.

```
import { measurement } from 'measurement';

// Create a measurement...
let foo = measurement.km(10);
let foo = measurement.kilometer(10);
let foo = measurement.meter(10); // etc...

// Get an instance of a unit...
let unit = measurement.units.km;
let unit = measurement.units.kilometer;
let unit = measurement.units.meter; // etc...
```
