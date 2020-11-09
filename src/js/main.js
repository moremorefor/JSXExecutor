/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function() {
  'use strict';

  var fs = require('fs-extra');
  var JSXInterface = require('./jsxinterface');
  var jsxInterface = JSXInterface.getInstance();

  var csInterface = new CSInterface();
  var extensionRootPath = getDataPath();
  createDataDirectory(extensionRootPath);
  var appName = getApplicationName();
  var configFilePath = extensionRootPath + "/" + appName + ".json";

  // OS
  var OSInformation = csInterface.getOSInformation();
  var OSVersion = 'Mac'
  if (OSInformation.includes('Windows')) {
    OSVersion = 'Windows'
  }

  function getDataPath () {
      var extensionPathArr = csInterface
          .getSystemPath('extension')
          .split('/');
      var extensionName = extensionPathArr[extensionPathArr.length - 1];
      var dataPath = csInterface.getSystemPath('userData');
      var savePath;
      if (OSVersion === 'Windows') {
          savePath = dataPath.replace('Roaming', 'LocalLow');
      }
      else {
          savePath = dataPath;
      }
      return savePath + '/Adobe/CEP/extensions/' + extensionName;
  };

  function createDataDirectory(dataPath) {
    fs.mkdirsSync(dataPath)
  }

  function registerInclude(filepath) {
    const filePath = csInterface
    .getSystemPath('extension') + filepath
    if (!isExistFile(filePath)) {
      console.error('registerInclude result: file not found.\n', filePath)
      return
    }
    console.log('registerInclude: ', filePath)
    csInterface.evalScript(
      '$.evalFile("' + filePath + '")',
      (result) => {
        console.log('registerInclude result: ', result, '\n', filePath)
      }
    )
  }

  function isExistFile(filepath) {
    try {
      fs.statSync(filepath)
      return true
    } catch (err) {
      return false
    }
  }

  function init() {
    registerInclude("/js/libs/json2.js");

    loadConfig().then(function(config) {
      generateContent(config);
    });
    themeManager.init();

    $('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
      if (!$(this).hasClass('is-active')) {
        // event.preventDefault();
        var accordionTabs = $(this).closest('.accordion-tabs-minimal');
        accordionTabs.find('.is-open').removeClass('is-open').hide();

        $(this).next().toggleClass('is-open').toggle();
        accordionTabs.find('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
      } else {
        var accordionTabs = $(this).closest('.accordion-tabs-minimal');
        $(this).next().toggleClass('is-open').toggle();
        accordionTabs.find('.is-active').removeClass('is-active');
        event.preventDefault();
      }
    });

    $("#btn_select").click(function() {
      var jsxInterface = JSXInterface.getInstance();
      jsxInterface.evaluateJSX("selectScriptDir", {})
        .then(function(folderPath) {
          console.log("folderPath: ", folderPath);
          loadScriptFiles(folderPath);
        });
    });

    $("#btn_reload").click(function() {
      loadConfig().then(function (config) {
        if ("folderPath" in config) {
          console.log("btn_reload folderPath: ", config["folderPath"]);
          loadScriptFiles(config["folderPath"]);
        } else {
          console.log("config not found");
        }
      });
    });
  }

  function loadConfig() {
    var jsxInterface = JSXInterface.getInstance();
    return jsxInterface.evaluateJSX("readFile", {path:configFilePath})
      .then(function(config) {
        if (config === "undefined") {
          console.log("Load config failed.");
          return {};
        } else {
          console.log("loadConfig Content: ", config);
          return JSON.parse(config);
        }
      });
  }

  function loadScriptFiles(folderPath) {
    var jsxInterface = JSXInterface.getInstance();
    jsxInterface.evaluateJSX("getFileList", {
        folderPath:folderPath,
        ext: "*.jsx"
      })
      .then(function(filesObj) {
        filesObj = JSON.parse(filesObj);
        console.log("filesObj: ", filesObj);
        var folderPath = filesObj["folderPath"];
        var files = filesObj["filepaths"];
        return [folderPath, files];
      })
      .spread(function(folderPath, files) {
        console.log("files: ", files);
        if (files.length > 0) {
          for(var i = 0; i < files.length; i++) {
            // console.log("FILE: ", files[i]);
            var fileName = getFileName(files[i]);
            console.log('FILE: ', fileName)
            if (fileName) {
              files[i] = fileName
            }
          }
          var data = {
            folderPath:folderPath,
            files:files
          };
          var json = JSON.stringify(data, null, "\t");
          var args = {path: configFilePath, json: json};

          return jsxInterface.evaluateJSX("writeToFile", args);
        }
      })
      .then(function(configPath) {
        console.log("Save success.");
        loadConfig().then(function (config) {
          generateContent(config);
        });
      })
      .catch(function(err) {
        console.log("err: ", err);
      });
  }

  function sortASC(a, b) {
    if (a.match(/^_/) && !b.match(/^_/)) return 1;
    if (!a.match(/^_/) && b.match(/^_/)) return 1;
    a = a.toString().toLowerCase();
    b = b.toString().toLowerCase();
    if(a < b) return 1;
    else if(a > b) return -1;
    return 0;
  }

  function generateContent(config){
    var dirpath = config["folderPath"];
    var dirname = getFileName(dirpath);
    var files = config["files"];
    files.sort(sortASC);

    var content = "<li class='tab-header-and-content'>"+
    "<a href='#link_" + dirname + "' class='tab-link' id='link_" + dirname + "'>" + dirname + "</a>"+
    "<div class='tab-content'>"+
    "<ul class='tab-content-files'>";

    for (var i = files.length-1; i >= 0; i--) {
      content += "<li class='tab-content-files-item' dirpath='" + dirpath + "'>" + files[i] + "</li>";
    }

    content += "</ul></div></li>";

    $("#accordion-tabs").html(content);

    $(".tab-content-files-item").click(executeJSX);

    $('.accordion-tabs-minimal').each(function(index) {
      $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
    });
  }

  function executeJSX(dirpath) {
    var dirpath = $(this).attr('dirpath');
    var filename = $(this).text();

    var filepath = dirpath + "/" + filename;
    if (OSVersion === 'Windows') {
      filepath = filepath.replace('\\', '/');
    }
    console.log('executeJSX filepath: ', filepath)
    var jsxinterface = new JSXInterface();
    jsxinterface.evaluateJSX("executor", {path: filepath})
      .then(function(cb){
        console.log("Executor: ", cb);
      });
  }

  function getFileName(path) {
    if (OSVersion === 'Windows') {
      var names = path.split("\\");
      return names[names.length-1];
    } else {
      var names = path.split("/");
      return names[names.length-1];
    }
  }

  function getApplicationName() {
    var appID = csInterface.getApplicationID();
    switch(appID) {
      case "PHXS":
        return "Photoshop";
        break;
      case "PHSP":
        return "Photoshop";
        break;
      case "ILST":
        return "Illustrator";
        break;
      default:
        return "Other";
        break;
    }
  }

  init();

})();
