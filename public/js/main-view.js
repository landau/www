define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var d3 = require('d3');
    var _ = require('lodash');
    
    function MainView(opts) {
        opts = opts || {};
        this.$el = $('#content');
        if (this.$el.length !== 1) throw new Error('#content el not found');

        this.el = this.$el[0];
        this.cont = d3.select(this.el);
        this.divs = this.cont.selectAll('div');

        this.data = opts.data || [];
    }
    
    MainView.prototype = {
        get data () {
            return this._data;
        },
        
        set data (d) {
            this._data = d;
        },

        render: function (renderer) {
            var self = this;

            if (!_.isObject(renderer)) throw new Error('Expected a renderer to be passed in');

            var ids = this.data.map(function (d) { return d.cid; });

            var divs = this.cont.selectAll('.g')
                .data(ids, function (d) {
                    return d;
                });

            var entered = divs.enter().append('div')
                .attr('class', 'well well-sm g exit');

            entered.html(function (d) {
                var model = self.data.get(d);
                return renderer.html(model.toJSON());
            });

            setTimeout(function () {
                entered.classed('exit', false);
            }, 300);

            var exited = divs.exit().classed('exit', true);
            if (exited.length > 0) {
                setTimeout(function () {
                    exited.remove()
                }, 300);
            }

            /* Testing removeal of elements
            var self = this;
            setTimeout(function () {
                self.data.splice(_.random(0, self.data.length), _.random(1, self.data.length / 2));
                self.render(renderer)
            }, 1e3);
            */

            return this;
        }
    }; 

    module.exports = MainView;
});
