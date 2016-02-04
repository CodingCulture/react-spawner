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
gulp.task('default', function(){
    runSequence('build');
});

/**
 * Builds all assets.
 */
gulp.task('build', function(){
    runSequence('concatReact', function(){});
});

/**
 * Minifies and concatenates (React) JavaScript to one file.
 * This file will be written to web/dist/js/napoleon-react.js
 */
gulp.task('concatReact', function(){
    util.log('Minifying React JS');

    var bundler = browserify({
        entries: ["src/ComponentSpawner.react.js"],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    });

    bundler
        .transform(babelify, {presets: ['es2015', 'react', 'stage-0'], plugins: ['add-module-exports']})
        .bundle()
        .pipe(source('ComponentSpawner.js'))
        .pipe(gulp.dest('dist/'))
    ;

    var bundlerTestBed = browserify({
        entries: ["example/js/src/bootstrap.js"],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    });

    return bundlerTestBed
        .transform(babelify, {presets: ['es2015', 'react', 'stage-0'], plugins: ['add-module-exports']})
        .bundle()
        .pipe(source('ComponentFactory.js'))
        .pipe(gulp.dest('example/js/dist/'))
    ;
});
