define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Info = require('./model');

    module.exports = Backbone.Collection.extend({
        model: Info,
        comparator: function (info) {
            return -info.get('date');
        }
    });

});
