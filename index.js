'use strict';
//var cluster = require('cluster');
//var os = require('os');
var app = require('./lib');

//var env = process.env;

/*
if (!cluster.isMaster) return;

cluster.on('disconnect', function() {
  cluster.fork(env);
  console.error('Fork crashed! Booting new worker');
});

os.cpus().forEach(function() {
  cluster.fork(env);
});
*/

app.start();
