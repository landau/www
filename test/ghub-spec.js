'use strict';

var chai = require('chai');
var should = chai.should();
chai.use(require('sinon-chai'));
var sinon = require('sinon');

var repos = require('../lib/ghub/repos');

describe('ghub', function() {

  describe('repos', function() {

    describe('#_load', function() {
      it('should return ghub data', function(done) {
        repos._load(function(err, repos) {
          should.not.exist(err);
          repos.should.be.instanceof(Array);
          done();
        });
      });
    });

    describe('#load', function() {
      it('should call #_load', function(done) {
        var spy = sinon.spy(repos, '_load');

        repos.load(function(err) {
          spy.should.be.calledOnce;
          spy.restore();
          done(err);
        });
      });

      it('should get data from cache', function(done) {
        var spy = sinon.spy(repos, '_load');

        repos.load(function(err, repos) {
          spy.should.not.be.calledOnce;
          should.not.exist(err);
          repos.should.be.instanceof(Array);
          spy.restore();
          done();
        });
      });
    });
  });
});
