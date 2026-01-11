const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const licensify = require('licensify');
const handleErrors = require('./handleErrors');
const config = require('../config');
const paths = config.path;

gulp.task('browserify', function () {
    return browserify({
        entries: [paths.src.js],
        transform: [],
        plugin: [licensify],
        debug: true,
        extensions: ['.js']
    })
        .bundle()
        .on('error', handleErrors)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.dest.js))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserifyWatch', gulp.series('browserify', 'deploy'));
