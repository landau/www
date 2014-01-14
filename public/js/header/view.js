define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var $ = require('jquery');
    
    return Backbone.View.extend({
        el: 'nav[role=navigation]',

        initialize: function (opts) {
            opts = opts || {};
            if (!opts.router) throw new Error('Router is required to instantiate this view');
            this.$menuItems = this.$('li[data-route]');

            this.listenTo(opts.router, 'route', function (route) {
                this.select(route)
            });
        },

        select: function (route) {
            this.$menuItems.removeClass('active');
            var $item = this.$menuItems.filter(function (i, el) {
                return $(el).data('route') == route;
            });
            $item.addClass('active');
        }

    });
});
