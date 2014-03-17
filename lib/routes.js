'use strict';

var assert = require('assert');
var _ = require('lodash');
var fs = require('fs');

var lifeHTML = fs.readFileSync(__dirname + '/life/index.html', 'utf8');

module.exports = function(app, blog) {
  assert(app, '`app` must be passed to routes function');
  assert(blog, '`blog` must be passed to routes function');

  var routes = [
    // RSS Feed
    {
      verb: 'GET',
      path: '/rss',
      handler: function(req, res) {
        var posts = blog.helpers.getPosts(0, 10);
        res.setHeader('Content-Type', 'application/rss+xml');
        res.render('rss', { posts: posts });
      }
    },

    // Index
    {
      verb: 'GET',
      path: '/',
      handler: function(req, res) {
        res.redirect('/posts/1');
      }
    }
  ];

  _.each(routes, function(r) {
    app[r.verb.toLowerCase()](r.path, r.handler);
  });
};
