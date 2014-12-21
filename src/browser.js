/* jslint browser: true */

(function (root, factory) {

    'use strict';

    root.measurement = factory();

}(window, function() {

    'use strict';

    return require('./measurement');

}));
