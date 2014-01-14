define(function (require, exports, module) {
    'use strict';

    var d3 = require('d3');
    var _ = require('lodash');

    module.exports = function forceViz(opts) {
        opts = _.defaults(_.clone(opts) || {}, {
            w: 500,
            h: 500,
            nodes: []
        });

        function forceViz(selection) {
            var color = d3.scale.category20c();

            var root = opts.nodes[0];
            root.radius = 0;
            root.fixed = true;

            var links = opts.nodes.map(function (v, i) {
                return {
                    target: 0,
                    source: i,
                    value: _.random(20) + 5
                };
            });

            var force =  d3.layout.force()
                .gravity(0.3)
                .charge(function (d, i) {
                    return -500;
                })
                .nodes(opts.nodes)
                .links(links)
                .linkDistance(100)
                .size([opts.w, opts.h]);

            force.start();

            selection.each(function (d, i) {
                var sel = d3.select(this);
                sel.attr({
                    height: opts.h,
                    width: opts.w
                });

                sel.selectAll('circle')
                    .data(opts.nodes.slice(1))
                    .enter().append('circle')
                    .attr('r', function (d) {
                        return d.radius - 2;
                    })
                    .style('fill', function (d, i) {
                        return color(i % (opts.nodes.length / 4));
                    });

                force.on('tick', function (e) {

                    sel.selectAll('circle')
                        .attr('cx', function (d) {
                            return d.x;
                        })
                        .attr('cy', function (d) {
                            return d.y;
                        })
                });

                //sel.on('mousemove', function () {
                d3.select('body').on('mousemove', function () {
                    var pos = d3.mouse(this);
                    root.px = pos[0] % opts.w;
                    root.py = pos[1] % opts.h;
                    force.resume();
                });

            });            
        };

        Object.defineProperties(forceViz, {
            width: {
                value: function (val) {
                    if (!arguments.length) return opts.w;
                    opts.w = val;
                    return forceViz;
                }
            },

            height: {
                value: function (val) {
                    if (!arguments.length) return opts.h;
                    opts.h = val;
                    return forceViz;
                }

            }
        });

        return forceViz;
    };

});
