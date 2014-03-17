'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var poet = require('poet');
var createDomain = require('domain').createDomain;
var configureRoutes = require('./routes');

var app = express();

var BLOG_DIR = path.join(__dirname, 'blog');

app.use(function(req, res, next) {
  var d = createDomain();
  d.add(req);
  d.add(res);

  d.on('error', function(req, res, err) {
    // log error
    process.exit(1);
  }.bind(d, req, res));

  d.run(next);
});

// Setup blog
var blog = poet(app, {
  posts: path.join(BLOG_DIR, '_posts'),
  postsPerPage: 5,
  metaFormat: 'json',
  routes: {
    '/posts/:page': 'page',
    '/posts/:post': 'post',
    '/tags/:tag': 'tag',
    '/categories/:category': 'category'
  }
});

blog.init();

// App configuration
app.set('view engine', 'jade');
app.set('views', path.join(BLOG_DIR, 'views'));

app.use(express.compress());
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, '..', '/public')));
app.use(express.static(path.join(BLOG_DIR, '/public')));
app.use('/life', express.static(path.join(__dirname, '/life')));
app.use(app.router);

configureRoutes(app, blog);

// More configuration - must be setup after routes
app.configure('production', function() {
  /* jshint unused: false */
  app.use(function(err, req, res, next) {
    console.error('Error Handler: ' + err.message);
    res.redirect(500, '/');
  });
});

app.configure('development', function() {
  app.use(express.logger('dev'));

  /* jshint unused: false */
  app.use(function(err, req, res, next) {
    console.error('Error Handler: ' + err.message);
    res.type('json');
    res.send(500, { error: err.message });
  });

  app.use(express.errorHandler, {
    showStack: true,
    dumpExceptions: true
  });
});

module.exports = {
  app: app,
  start: function(port) {
    port = process.env.PORT || 3000;
    http.createServer(app).listen(port, function() {
      console.log('Server listening on port ' + port);
    });
  }
};
