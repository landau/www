define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Tweets = require('twitter/tweet-coll');
    var Prezzos = require('prezzos/coll');
    var Tweets = require('twitter/tweet-coll')
    var MainView = require('main-view');

    var twitterRenderer = require('twitter/renderer');
    var infoRenderer = require('info/renderer');

    var BgView = require('background/view');
    var HeaderView = require('header/view');

    var isMobile = require('util/is-mobile');

    module.exports = Backbone.Router.extend({
        routes: {
            prezzos: 'prezzos',
            presentations: 'presentations',
            '': 'default'
        },

        initialize: function (opts) {
            this.view = new MainView({
            });

            this.twitter = new Tweets();
            this.prezzos = new Prezzos();

            if (!isMobile) {
                this.bgView = new BgView();
                this.bgView.render();
            }

            this.headerView = new HeaderView({ router: this });
        },

        _call: function (coll, renderer) {
            var view = this.view;

            if (coll.length) {
                view.data = coll;
                view.render(renderer);
                return;
            }

            var self = this;
            var args = arguments;
            coll.fetch({
                reset: true,
                success: function () {
                    self._call.apply(self, args);
                }
            });
        },
        
        default: function () {
            this._call(this.twitter, twitterRenderer);
        },

        prezzos: function () {
            this._call(this.prezzos, infoRenderer);
        },

        presentations: function () {
            this.navigate('prezzos');
        }
    });

});
