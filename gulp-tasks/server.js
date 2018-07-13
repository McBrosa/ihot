'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const config = require('./config');

gulp.task('serve', ['browser-sync'], () => {
  nodemon({
    script: './src/server/app.js',
    env: {
      NODE_ENV: `${config.cloptions.local ? 'local' : 'atlas'}`,
      BROWSER_SYNC_PORT: `${config.cloptions.serverport}`,
      BLUEMIX_COMMON_API_VERSION: 'v5',
    },
    watch: './src/server/',
    ignore: ['bundles.json'],
  });
});