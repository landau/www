define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Tweet = require('./tweet-model');

    return Backbone.Collection.extend({
        url: '/twitter.json',
        model: Tweet,

        comparator: function (model) {
            return -model.get('date');
        }

    });
});
