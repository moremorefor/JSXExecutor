const gulp = require('gulp');
const browserSync = require('browser-sync');
const config = require('../config');
const paths = config.path;

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: paths.dest.dir
        },
        ghostMode: {
            location: true
        }
    });
});
