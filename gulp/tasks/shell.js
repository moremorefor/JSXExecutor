const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('install', shell.task([
    'bundle exec bourbon install',
    'bundle exec neat install',
    'bundle exec bitters install'
], { cwd: './src/css/plugin/' }
));
