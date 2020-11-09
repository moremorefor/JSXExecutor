gulp        = require 'gulp'
browserify  = require 'browserify'
source      = require 'vinyl-source-stream'
browserSync = require 'browser-sync'
licensify   = require 'licensify'
handleErrors= require './handleErrors'
config      = require '../config'
paths       = config.path

gulp.task 'browserify', ->
  browserify (
    entries: ["#{paths.src.js}"]
    transform: [
    ]
    plugin: [
      licensify
    ]
    debug: true
    extensions: ['.js']
  )
    .bundle()
    .on 'error', handleErrors
    .pipe source('bundle.js')
    .pipe(gulp.dest("#{paths.dest.js}"))
    .pipe browserSync.reload({stream:true});

gulp.task 'browserifyWatch', gulp.series(
    'browserify',
    'deploy'
)