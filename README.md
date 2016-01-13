# JSXExecutor
JSXExecutor is Creative Cloud Extension. Execute jsx files easily from panel.

![preview](https://cloud.githubusercontent.com/assets/966109/12298895/baf90764-ba57-11e5-9593-cbd35d2ee2f1.png)

## Support Application
- Photoshop

#### Tested environment
- Mac OSX Yosemite
- Photoshop CC, CC2014, CC2015

## Install
1. Download JSXExecutor.zxp
2. Install
  - CC, CC2014 : Install with [Adobe Extension Manager](https://www.adobe.com/jp/products/extension-manager.html).
  - CC2015 : Install with [ZXPInstaller](http://zxpinstaller.com/).


## Build

1. Install packages.
```
$ npm install
$ bundle install --path vendor/bundle
$ gulp install
```

1. Edit `gulp/config.coffee`.
```
dest: '/Users/<USER>/Library/Application Support/Adobe/<CEP>/extensions/net.moremorefor.jsxexecutor'
```

  `<CEP>` is these folder name:

  - CC : `CEPServiceManager4`
  - CC2014, CC2015 : `CEP`

1. Build & Run
```
$ gulp
```

1. Open [http://localhost:8088/](http://localhost:8088/) for debug.

## 3rd party libraries
- [json2.js](https://github.com/douglascrockford/JSON-js)
- [jquery](https://github.com/jquery/jquery)
- [q](https://github.com/kriskowal/q)

## To-do
- [ ] Support multiple directories.
- [ ] Support other application.

## LICENSE
PSExecutor is available under the MIT license. See the LICENSE file for more info.
