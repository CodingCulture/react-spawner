var gulp = require('gulp');
var util = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var path = require('path');
var browserify = require('browserify');
var babelify = require('babelify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

/**
 * Sets the defaults Gulp Task.
 */
gulp.task('default', function () {
    runSequence('build');
});

/**
 * Builds all assets.
 */
gulp.task('build', function () {
    runSequence('concatReact', function () {});
});

/**
 * Minifies and concatenates (React) JavaScript to one file.
 * This file will be written to web/dist/js/napoleon-react.js
 */
gulp.task('concatReact', function () {
    util.log('Minifying React JS');

    var bundler = browserify({
        entries: [config.js.es6.entry],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    });

    return bundler.transform(babelify, { presets: ['es2015', 'react'] }).bundle().pipe(source('napoleon-react.js')).pipe(gulp.dest(config.global.build + 'js/')).pipe(notify({ message: 'react compiled' }));
});

//# sourceMappingURL=gulpfile-compiled.js.map