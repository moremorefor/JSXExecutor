const gulp = require('gulp');
const browserSync = require('browser-sync');
const config = require('../config');
const paths = config.path;

gulp.task('copy', function () {
    return gulp.src([
        paths.src.html,
        paths.src.css,
        paths.src.jslib,
        paths.src.jsx,
        paths.src.csxs,
        paths.src.debug
    ], { base: paths.src.dir, allowEmpty: true })
        .pipe(gulp.dest(paths.dest.dir))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('deploy', gulp.series('del_deploy', function () {
    return gulp.src([
        paths.deploy.src,
        paths.deploy.debug
    ], { base: paths.dest.dir })
        .pipe(gulp.dest(paths.deploy.dest));
}));

gulp.task('copyWatch', gulp.series('copy', 'deploy'));
