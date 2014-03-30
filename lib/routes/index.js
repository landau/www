'use strict';

var _ = require('lodash');
var ghub = require('../ghub');
var is = require('is-predicate');
var moment = require('moment');

var BASE = '/';

module.exports = [
  {
    method: 'get',
    path: BASE,
    handler: function(req, res) {
      var ctx = {};
      var PAGE = 'index';

      ghub.getRepos(function(err, repos) {
        if (err) return res.render(PAGE, ctx);

        repos.sort(is.cmp(is.greater, 'watchers_count'));
        repos.sort(is.cmp(is.greater, 'stargazers_count'));

        // Make update_at a formated date for display
        repos = repos.map(function(r) {
          return _.extend({}, r, {
            /* jshint camelcase: false */
            updated_at: moment(r.updated_at).format('MM/DD/YYYY')
          });
        });

        res.render(PAGE, _.extend({
          repos: repos
        }, ctx));
      });
    }
  }
];
