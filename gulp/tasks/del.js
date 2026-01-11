const gulp = require('gulp');
const del = require('del');
const config = require('../config');
const paths = config.path;

gulp.task('del', function (cb) {
    del([paths.dest.dir]).then(() => cb());
});

gulp.task('del_deploy', function (cb) {
    del([paths.deploy.dest], { force: true }).then(() => cb());
});
