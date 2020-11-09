gulp   = require 'gulp'
config = require '../config'
paths  = config.path

gulp.task 'watch', ->
  gulp.watch ["#{paths.watch.sass}", "#{paths.watch.scss}"], gulp.task('sassWatch')
  gulp.watch ["#{paths.watch.js}"], gulp.task('webpackWatch')
  gulp.watch [
    "#{paths.watch.html}",
    "#{paths.watch.jsx}",
    "#{paths.watch.png}",
    "#{paths.watch.jpg}",
    "#{paths.watch.gif}"
  ], gulp.task('copyWatch')
