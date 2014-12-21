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
