define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var _ = require('lodash');

    return Backbone.Model.extend({
        parse: function (data) {

            // Replace URL
            data.text = data.text.replace(/http(s)?:\/\/[\d\w_\.\/]+/g, function (text) {
                return "<a href='" + text + "' target='_blank'>" + text + "</a>";
            });

            // Replace hash tags
            data.text = data.text.replace(/#[\d\w_]+/g, function (text) {
                var component = window.encodeURIComponent(text);
                return "<a href='http://twitter.com/#!/search/?q=#{component}&src=hash' target='_blank'>" +
                    text + "</a>";
            });

            // Replace twitter hnales
            data.text = data.text.replace(/@[^\s]+/g, function (text) {
                return "<a href='http://twitter.com/'" + text + "' target='_blank'>" + text + "</a>";
            });

            if (data.date && _.isString(data.date)) {
                data.date = new Date(data.date);
            }

            return data;
        }
    });
});
