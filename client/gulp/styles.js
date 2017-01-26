'use strict';

var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles-reload', ['styles'], function() {
    return buildStyles()
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return buildStyles();
});

var buildStyles = function() {
    var sassOptions = {
        options: [
            'bower_components',
            path.join(conf.paths.src, '/app')
        ]
    };

    var injectFiles = gulp.src([
        path.join(conf.paths.src, '/assets/**/*.scss'),
        path.join('!' + conf.paths.src, '/assets/scss/app.scss'),
        path.join('!' + conf.paths.src, '/assets/scss/vendor.scss')
    ], {
        read: false
    });

    var injectOptions = {
        transform: function(filePath) {
            filePath = filePath.replace(conf.paths.src + '/app/', '');
            return '@import "' + filePath + '";';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

    var indexFilter = $.filter('app.scss', {
        restore: true
    });

    return gulp.src([
            path.join(conf.paths.src, '/assets/scss/app.scss'),
            path.join(conf.paths.src, '/assets/scss/vendor.scss')
        ])
        .pipe(indexFilter)
        .pipe($.inject(injectFiles, injectOptions))
        .pipe(indexFilter.restore)
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe($.sourcemaps.init())
        .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
        .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};
