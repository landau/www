require.config({
    paths: {
        lodash:     'bower_components/lodash/dist/lodash',
        backbone:   'bower_components/backbone/backbone',
        jquery:     'bower_components/jquery/jquery',
        d3:         'bower_components/d3/d3',
        text:       'bower_components/requirejs-text/text'
    },

    shim: {
        backbone: {
            deps: ['jquery', 'lodash'],
            exports: 'Backbone'
        },

        lodash: {
            exports: '_'
        },

        jquery: {
            exports: 'jquery'
        },

        d3: {
            exports: 'd3'
        }
    }
});

require([
    'jquery',
    'router',
    'backbone',
    'util/util'
], function ($, Router, Backbone) {
    'use strict';

    $(function () {
        var router = new Router();
        Backbone.history.start();
    });
});
