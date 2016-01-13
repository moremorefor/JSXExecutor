gulp   = require 'gulp'
config = require '../config'
paths  = config.path

gulp.task 'watch', ->
  gulp.watch ["#{paths.watch.sass}", "#{paths.watch.scss}"], ['sassWatch']
  gulp.watch ["#{paths.watch.js}"], ['browserifyWatch']
  gulp.watch [
    "#{paths.watch.html}",
    "#{paths.watch.jsx}",
    "#{paths.watch.png}",
    "#{paths.watch.jpg}",
    "#{paths.watch.gif}"
  ], ['copyWatch']
