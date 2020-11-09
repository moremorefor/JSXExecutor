gulp        = require 'gulp'

gulp.task 'default', gulp.series(
  'del',
  'sass',
  # 'browserify',
  'webpack',
  'copy'
  'deploy',
  # 'browser-sync',
  'watch'
)
