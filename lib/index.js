'use strict';

var path = require('path');
var fs = require('fs');
var createDomain = require('domain').createDomain;
var is = require('is-predicate');

var isProd = is.equal(process.env.NODE_ENV, 'production');
var express = require('express');
var app = express();

app.set('env', process.env.NODE_ENV);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (isProd) {
  app.set('view cache', true);
}

// --- Safety net
app.use(function(req, res, next) {
  var d = createDomain();

  d.add(req);
  d.add(res);
  d.on('error', function(req, res, err) {
    next(err);
  }.bind(d, req, res));

  d.run(next);
});

// caching
if (isProd) {
  app.use(function (req, res, next) {
    res.header('Cache-Control', 'public, max-age=' + (60 * 60 * 24)); // cache for a day
    next();
  });
}

app.use(express.compress());
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

if (is.falsey(isProd)) {
  app.use(express.logger('dev'));
}

// TODO when I move to DO use NGNIX
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/life', express.static(path.join(__dirname, 'life')));

// --- Register routes
var routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir)
  .filter(RegExp.prototype.test, /\.js$/)
  .map(function(f) {
    return require(path.join(routesDir, f));
  })
  .map(function(routes) {
    return routes.map(function(r) {
      return app[r.method](r.path, r.handler);
    });
  });

app.use(function(err, req, res, /*jshint unused: false */ next) {
  console.log(err);
  res.send(500);
});

module.exports = app;
