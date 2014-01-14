'use strict';

var request = require('supertest');
var http = require('http');
var app = require('../lib').app;

function createTestObj(method, url) {
  return {
    method: method,
    url: url
  };
}

function createGETTest(url) {
  return createTestObj('GET', url);
}

// fake route to ensure an error route is setup
app.get('/error', function(req, res, next) {
  next(new Error('test'));
});

// Test registered routes return proper status code
var tests = {
  404: [
    createGETTest('/foo')
  ],
  302: [
    createGETTest('/')
  ],
  200: [
    createGETTest('/posts/1'),
    createGETTest('/posts/is-js'),
    createGETTest('/tags/javascript'),
    createGETTest('/categories/predicate'),
    createGETTest('/css/blog.css')
  ],
  500: [
    createGETTest('/error')
  ]
};

Object.keys(tests).forEach(function(code) {
  var testArr = tests[code];

  testArr.forEach(function(test) {
    describe(test.url, function() {
      before(function(done) {
        this.server = http.createServer(app);
        this.req = request(this.server)[test.method.toLowerCase()](test.url);

        // Poet is a little slow to load sometimes, introduce a delay
        setTimeout(done, 35);
      });

      after(function() {
        this.server.close();
        delete this.serever;
        delete this.req;
      });

      it('should respond with status code ' + code, function(done) {
        this.req.expect(parseInt(code, 10))
          .end(done);
      });
    });
  });
});
