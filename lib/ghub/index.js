'use strict';

var repos = require('./repos');

module.exports = {
  getRepos: repos.load
};
