'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('serve', ['browser-sync'], () => {
  nodemon({
    script: './src/server/app.js',
    watch: './src/server/',
    ignore: ['bundles.json'],
  });
});