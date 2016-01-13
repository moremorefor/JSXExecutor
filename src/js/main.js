/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function() {
  'use strict';

  var JSXInterface = require('./jsxinterface');

  var csInterface, init, reloadPanel;

  csInterface = new CSInterface();

  var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION);
  var _configPath = extensionRoot + "/config.json";

  function init() {
    includeInJSX("/js/libs/json2.js");
    loadConfig(generateContent);
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
        .then(function(scriptpath) {
          console.log("scriptpath: ", scriptpath);

          return jsxInterface.evaluateJSX("getFileList", {scriptpath:scriptpath});
        })
        .then(function(filesObj) {
          filesObj = JSON.parse(filesObj);
          console.log("filesObj: ", filesObj);
          var scriptpath = filesObj["scriptPath"];
          var files = filesObj["filepaths"];
          return [scriptpath, files];
        })
        .spread(function(scriptPath, files) {
          console.log("files: ", files);
          if (files.length > 0) {
            for(var i = 0; i < files.length; i++) {
              console.log("FILE: ", files[i]);
              files[i] = getFileName(files[i]);
            }
            var data = {
              scriptPath:scriptPath,
              files:files
            };
            var json = JSON.stringify(data, null, "\t");
            var args = {path: _configPath, json: json};

            return jsxInterface.evaluateJSX("writeToFile", args);
          }
        })
        .then(function(path) {
          console.log("Save success.");
          loadConfig(generateContent);
        })
        .catch(function(err) {
          console.log("err: ", err);
        });

    });

    $("#btn_reload").click(function() {
      loadConfig(reloadConfigDirectory);
    });
  }

  function includeInJSX (file) {
    var filePath = extensionRoot + file;
    csInterface.evalScript('$.evalFile("' + filePath + '")');
  }

  function loadConfig(fn) {
    var jsxInterface = JSXInterface.getInstance();
    jsxInterface.evaluateJSX("readFile", {path:_configPath})
      .then(function(config) {
        if (config === "undefined") {
          console.log("Load config failed.");
        } else {
          console.log("ReadContent: ", config);
          fn(JSON.parse(config));
        }
      });
  }

  function reloadConfigDirectory(config) {
    var scriptpath = config["scriptPath"];
    var jsxInterface = JSXInterface.getInstance();
    jsxInterface.evaluateJSX("getFileList", {scriptpath:scriptpath})
      .then(function(filesObj) {
        filesObj = JSON.parse(filesObj);
        console.log("filesObj: ", filesObj);
        var scriptpath = filesObj["scriptPath"];
        var files = filesObj["filepaths"];
        return [scriptpath, files];
      })
      .spread(function(scriptPath, files) {
        console.log("files: ", files);
        if (files.length > 0) {
          for(var i = 0; i < files.length; i++) {
            console.log("FILE: ", files[i]);
            files[i] = getFileName(files[i]);
          }
          var data = {
            scriptPath:scriptPath,
            files:files
          };
          var json = JSON.stringify(data, null, "\t");
          var args = {path: _configPath, json: json};

          return jsxInterface.evaluateJSX("writeToFile", args);
        }
      })
      .then(function(configPath) {
        console.log("Save success.");
        loadConfig(generateContent);
      })
      .catch(function(err) {
        console.log("err: ", err);
      });
  }

  function generateContent(config){
    var dirpath = config["scriptPath"];
    var dirname = getFileName(dirpath);
    var files = config["files"];

    var content = "<li class='tab-header-and-content'>"+
    "<a href='#link_" + dirname + "' class='tab-link' id='link_" + dirname + "'>" + dirname + "</a>"+
    "<div class='tab-content'>"+
    "<ul class='tab-content-files'>";

    for (var i = 0; i < files.length; i++) {
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
    var jsxinterface = new JSXInterface();
    jsxinterface.evaluateJSX("executor", {path: filepath})
      .then(function(cb){
        console.log("Executor: ", cb);
      });
  }

  function getFileName(path) {
    var names = path.split("/");
    return names[names.length-1];
  }

  init();

})();
