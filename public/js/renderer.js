define(function (require, exports, module) {
    'use strict';

    var _ = require('lodash');

    var api = module.exports = {
        _cache: {},
        tmpl: '',

        set _tmpl (t) {
            this.tmpl = t;
        },

        get _tmpl () {
            if (!_.isString(this.tmpl)) throw new TypeError('this.tmpl is not of type string');

            if (this._cache[this.tmpl]) return this._cache[this.tmpl];
            return this._cache[this.tmpl] = _.template(this.tmpl);
        },

        html: function (data) {
            var t = this._tmpl;
            return t(data); 
        },
        
        extend: function (obj) {
            return Object.create(this, {
                tmpl: {
                    value: obj.tmpl,
                    writable: false,
                    configurable: false,
                    enumerable: true
                }
            });
        }
    };
});
