/* globals define */

(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.measurement = factory();
    }
})(this, function() {

    'use strict';

    return {
        Factory:        require('./factory'),
        Scalar:         require('./scalar'),
        UnitTypes:      require('./unit-types'),
        Unit:           require('./units'),
        CompoundUnit:   require('./compound-units'),
    };

});
