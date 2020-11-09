gulp          = require 'gulp'
webpack       = require 'webpack'
webpackStream = require 'webpack-stream'
config        = require '../config'
paths         = config.path

webpackConfig = require("../../webpack.config")

gulp.task "webpack", ->
  webpackStream(webpackConfig, webpack).on('error', (e) ->
      this.emit('end') # Recover from errors
    )
    .pipe(gulp.dest("#{paths.dest.js}"))

gulp.task 'webpackWatch', gulp.series(
  'webpack',
  'deploy'
)
