'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var gulpNgConfig = require('gulp-ng-config');

/************************/
/**** GULP-NG-CONFIG ****/
/************************/

// We fetch the environment type. If it doesn't exist, we assign it as development
var ENV = process.env.APP_ENV || 'local';

// BUILD THE ENV - command line option of local/prod
gulp.task('make-env', function() {
    gulp.src('config/app.env-vars.json')
        .pipe(
            gulpNgConfig('app.env', {
                environment: ENV,
                createModule: true,
                pretty: 4
            })
        )
        .pipe(gulp.dest(path.join(conf.paths.src, '/app')))
});

// BUILD THE ENV - for dev
gulp.task('make-env-dev', function() {
    gulp.src('config/app.env-vars.json')
        .pipe(
            gulpNgConfig('app.env', {
                environment: 'local',
                createModule: true,
                pretty: 4
            })
        )
        .pipe(gulp.dest(path.join(conf.paths.src, '/app')))
});

// BUILD THE ENV - for prod
gulp.task('make-env-prod', function() {
    gulp.src('config/app.env-vars.json')
        .pipe(
            gulpNgConfig('app.env', {
                environment: 'production',
                createModule: true,
                pretty: 4
            })
        )
        .pipe(gulp.dest(path.join(conf.paths.src, '/app')))
});

// DOCS: https://github.com/ajwhite/gulp-ng-config

// command line:  
// BUILD ENV FOR LOCAL: gulp make-env
// BUILD ENV FOR PROD: APP_ENV=production gulp make-env
// SERVE ENV FOR LOCAL: gulp serve:dev
// SERVE ENV FOR PROD: gulp serve:prod
// BUILD ENV AND DEPLOY PROD TO S3: gulp deploy