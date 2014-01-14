define(function (require, exports, module) {
    'use strict';

    var renderer = require('renderer');
    var tmpl = require('text!./tmpl.html');

    module.exports = renderer.extend({
        tmpl: tmpl
    });
    
});
