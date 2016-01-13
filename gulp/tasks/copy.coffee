gulp        = require 'gulp'
browserSync = require 'browser-sync'
config      = require '../config'
paths        = config.path

gulp.task 'copy', ->
  gulp
    .src [ "#{paths.src.html}", "#{paths.src.css}", "#{paths.src.jslib}", "#{paths.src.jsx}", "#{paths.src.csxs}", "#{paths.src.debug}", "#{paths.src.nodemodules}" ], { base: "#{paths.src.dir}" }
    .pipe gulp.dest( "#{paths.dest.dir}" )
    .pipe browserSync.reload({stream:true})

gulp.task 'copyWatch', ['copy'], ->
  gulp.start 'deploy'

gulp.task 'deploy', ["del_deploy"], ->
  gulp
    .src [ "#{paths.deploy.src}", "#{paths.deploy.debug}" ], { base: "#{paths.dest.dir}" }
    .pipe gulp.dest( "#{paths.deploy.dest}" )
