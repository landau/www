define(function (require, exports, module) {
    'use strict';

    var lodash = require('lodash');
    var Backbone = require('backbone');

    module.exports = Backbone.Model.extend({
        parse: function (data, xhr) {
            if (data.date) {
                var spl = data.date.split('/');
                data.date = new Date(spl[2], spl[0] - 1, spl[1]);
            }

            if (!Array.isArray(data.links)) data.links = [];
            data.id = _.uniqueId();

            return data;
        }

    });
});
