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
let watch = require('gulp-watch');
var browserSync = require('browser-sync').create(); 

let paths = {
  template: ['./tpl/*.html'],
  less: ['./less/*.less'],
  dist: './dist'
};

gulp.task('less', function () {
  gulp.src(['./css/**'])
    .pipe(less())
    .pipe(gulp.dest('./css'));
});

gulp.task('html', function () {
  gulp.src(['./tpl/*.html'])
    .pipe(gulp.dest('dist/tpl/*.html'));
});

gulp.task('browser', function(){
  browserSync.init({
      server: './'    // 访问目录，自动指向该目录下的 index.html 文件
  });
});

gulp.task('watch', function () {
  w('./tpl/*.html', 'html');
  w('./css/*.less', 'less');

  function w(path, task){
      watch(path, function () {
          gulp.start(task);
          browserSync.reload();
      });
  }
});

gulp.task('default', function () {
  gulp.run('less');
  gulp.start(['html', 'browser', 'watch'])
  // gulp.watch(paths.template, ['templates']);
  // gulp.watch(paths.less, ['less']);
});
