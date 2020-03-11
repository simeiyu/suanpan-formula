"use strict";

let gulp = require('gulp');
let concat = require('gulp-concat');
let ngHtml2Js = require("gulp-ng-html2js");
let minifyHtml = require("gulp-minify-html");
let uglify = require("gulp-uglify-chylvina");
let gulpif = require('gulp-if');
let useref = require('gulp-useref');
let rev = require('gulp-rev');
let revReplace = require('gulp-rev-replace');
let del = require('del');
let less = require('gulp-less');
let cleanCSS = require('gulp-clean-css');

let paths = {
  template: ['./tpl/*.html'],
  less: ['./less/*.less'],
  dist: './dist'
};

gulp.task('less', function () {
  gulp.src(['./css/app.less'])
    .pipe(less())
    .pipe(gulp.dest('./css'));
});


gulp.task('default', function () {
  gulp.run('less');
  // gulp.watch(paths.template, ['templates']);
  gulp.watch(paths.less, ['less']);
});
