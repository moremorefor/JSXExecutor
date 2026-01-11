const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const config = require('../config');
const paths = config.path;

const webpackConfig = require('../../webpack.config');

gulp.task('webpack', function () {
    return webpackStream(webpackConfig, webpack)
        .on('error', function (e) {
            this.emit('end'); // Recover from errors
        })
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('webpackWatch', gulp.series('webpack', 'deploy'));
