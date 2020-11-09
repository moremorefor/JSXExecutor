os = require 'os'
srcDir = 'src'
destDir = 'public'

path =
  src:
    dir    : srcDir
    html   : srcDir + '/*.html'
    css    : srcDir + '/css/*.min.css'
    sass   : srcDir + '/css/app.sass'
    img    : srcDir + '/img/*'
    js     : './' + srcDir + '/js/main.js'
    jslib  : './' + srcDir + '/js/libs/*.js'
    jsx    : srcDir + '/jsx/hostscript.jsx'
    csxs   : srcDir + '/CSXS/manifest.xml'
    debug  : srcDir + '/.debug'
    nodemodules : srcDir + '/node_modules/**/*'
  dest:
    dir    : destDir
    html   : destDir
    sass   : destDir + '/css'
    img    : destDir + '/img'
    js     : destDir + '/js/'
    jsx    : destDir + '/jsx/'
  watch:
    html   : srcDir + '/**/*.html'
    sass   : srcDir + '/**/*.sass'
    scss   : srcDir + '/**/*.scss'
    js     : srcDir + '/js/*.js'
    jsx    : srcDir + '/jsx/hostscript.jsx'
    png    : srcDir + '/**/*.png'
    jpg    : srcDir + '/**/*.jpg'
    gif    : srcDir + '/**/*.gif'
  deploy:
    src    : destDir + '/**/*'
    debug  : destDir + '/.debug'
    dest   : os.homedir() + '/Library/Application Support/Adobe/CEP/extensions/net.moremorefor.jsxexecutor'

module.exports =
  path: path
