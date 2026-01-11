const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const filter = require('gulp-filter');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const config = require('../config');
const paths = config.path;

gulp.task('sass', function () {
    const sassOptions = {
        outputStyle: 'expanded',
        sourceMap: true,
        silenceDeprecations: ['import', 'global-builtin', 'slash-div', 'elseif', 'legacy-js-api', 'if-function', 'color-functions'],
        // bundleExec not needed for Dart Sass
    };

    return gulp.src(paths.src.sass, { sourcemaps: true })
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.dest.sass, { sourcemaps: '.' }))
        .pipe(filter('**/*.css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('sassWatch', gulp.series('sass', 'deploy'));
