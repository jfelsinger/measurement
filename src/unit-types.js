﻿/**
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
