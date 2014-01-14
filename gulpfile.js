'use strict';

process.env.NODE_ENV = 'test';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
//var clean = require('gulp-clean');
//var ugly = require('gulp-uglify');
//var rename = require('gulp-rename');

gulp.task('pretest', function () {
  return gulp.src(['lib/**/*.js', 'index.js', 'test/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(jscs());
});

gulp.task('mocha', function () {
  var m = mocha({
    reporter : 'spec',
    timeout  : 5e4
  });

  return gulp.src(['test/**/*.js'])
    .pipe(m);
});

gulp.task('test', function () {
  gulp.run('pretest', 'mocha');
  gulp.on('error', function() {
    console.log(arguments);
  });
});

/*
gulp.task('ugly', function () {
  return gulp.src('src/is.js')
    .pipe(ugly({
      preserveComments : 'some',
      report           : 'gzip'
    }))
    .pipe(rename('is.min.js'))
    .pipe(gulp.dest('dist'));
});
*/


gulp.task('default', function () {
  gulp.watch([
    '**/*.js',
    '**/*.coffee'
  ], function () {
    gulp.run('pretest');
  });
});
