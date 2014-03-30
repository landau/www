'use strict';

var LRU = require('lru-cache');
var _ = require('lodash');
var is = require('is-predicate');
var ghub = require('octonode');

var client = ghub.client();

var api = module.exports = {
  _load: function(cb) {
    client.get('/users/landau/repos', {}, function(err, status, body, headers) {
      console.log(arguments);
    });
  },

  load: function(cb) {
    api._load(cb);
  }
};
