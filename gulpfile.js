'use strict';

process.env.NODE_ENV = 'test';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var csso = require('gulp-csso');
var clean = require('gulp-clean');
//var ugly = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('pretest', function () {
  return gulp.src(['lib/**/*.js', 'index.js', 'test/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(jscs());
});

gulp.task('clean', function() {
  gulp.src('lib/blog/public/css/blog.min.css')
    .pipe(clean({ force: true }));
});

gulp.task('cssmin', ['clean'], function() {
  gulp.src([
    'lib/blog/public/css/bower_components/pure/pure.css',
    'lib/blog/public/css/blog.css'
  ])
    .pipe(csso())
    .pipe(rename('blog.min.css'))
    .pipe(gulp.dest('lib/blog/public/css'));
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

gulp.task('build', function() {
  gulp.run('cssmin');
});

gulp.task('default', function () {
  gulp.watch([
    '**/*.js',
    '**/*.coffee'
  ], function () {
    gulp.run('pretest');
  });
});
