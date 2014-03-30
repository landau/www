'use strict';

var LRU = require('lru-cache');
var _ = require('lodash');
var is = require('is-predicate');
var ghub = require('octonode');
var cache = LRU({ max: 1, maxAge: 1e3 * 60 * 15 });

var client = ghub.client();

var repoFields = [
  'id', 'name', 'full_name',
  'html_url', 'description',
  'stargazers_count', 'watchers_count',
  'created_at', 'updated_at',
  'pushed_at'
];

var filterRepos = [
  'hubot-tapin',
  'learningfromlibraries',
  'requiredemo',
  'dotfiles',
  'cn-sinon-prezzo',
  'mta'
];

var api = module.exports = {
  _load: function(cb) {
    client.get('/users/landau/repos', {}, function(err, status, body) {
      if (err) return cb(err);

      var repos = body.filter(_.compose(is.falsey, _.property('fork')))
                      .filter(_.compose(
                        _.partial(is.not.contains, filterRepos),
                        _.property('name')
                      ))
                      .map(_.partialRight(_.pick, repoFields));

      cb(null, repos);
    });
  },

  load: function(cb) {
    var repos = cache.get('repos');

    if (repos) {
      return process.nextTick(function() {
        cb(null, repos);
      });
    }

    api._load(function(err, repos) {
      if (err) return cb(err);
      cache.set('repos', repos);
      cb(null, repos);
    });
  }
};
