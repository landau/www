define(function (require, exports, module) {
    'use strict';

    var _ = require('lodash');
    var forceViz = require('viz/force-viz');
    var $ = require('jquery');

    function BgView(opts) {
        this.opts = opts = _.extend(opts || {}, {
            w: $(window).width(),
            h: $(window).height()
        });

        this.$el = $('#svg');
        this.el = this.$el[0];

        this.nodes = opts.nodes = _.range(_.random(50, 100)).map(function () {
            return {
                radius: _.random(10) + 4
            };
        });

        this.viz = forceViz(opts);
        var self = this;
        $(window).on('resize', function () {
            //self.render();
        });
    }

    BgView.prototype = {
        render: function () {
            var svg = this.svg = d3.select(this.el).append('svg');
            svg.call(this.viz);
        }
    };

    module.exports = BgView;
});
