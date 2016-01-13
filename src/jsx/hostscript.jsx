
preferences.rulerUnits = Units.PIXELS;

function executor(args) {
  var idAdobeScriptAutomationScripts = stringIDToTypeID( "AdobeScriptAutomation Scripts" );
    var desc1 = new ActionDescriptor();
    var idjsCt = charIDToTypeID( "jsCt" );
    desc1.putPath( idjsCt, new File( args["path"] ) );
    var idjsMs = charIDToTypeID( "jsMs" );
    desc1.putString( idjsMs, "undefined" );
  executeAction( idAdobeScriptAutomationScripts, desc1, DialogModes.NO );
  return true;
}

function selectScriptDir(){
  var folder = Folder.selectDialog("Please select jsx folder...");
  if (folder) {
    return folder.fsName;
  } else {
    alert("Canceled.");
    return;
  }
}

function getFileList(args) {
  var scriptPath = args["scriptpath"];
  var folderObj = new Folder(scriptPath);
  var files = folderObj.getFiles("*.jsx");
  var filepaths = [];
  if (files.length > 0) {
    for(var i = 0; i < files.length; i ++) {
      filepaths.push(files[i].fsName);
    }
    var obj = {
      scriptPath: scriptPath,
      filepaths: filepaths
    };
    return JSON.stringify(obj);
  } else {
    // alert("jsx file not found.");
    return;
  }
}

function readFile(args) {
  var path = args["path"];
  var fileObj = new File(path);
  fileObj.encoding = "UTF-8";
  var flag = fileObj.open("r");
  if (flag === true) {
      var content = fileObj.read();
      return content;
  }
  return;
}


function writeToFile(args) {
  var path = args["path"];
  var txt = args["json"];

  var fileObj = new File(path);
  fileObj.encoding = "UTF-8";

  var flag = fileObj.open("r");
  var existText;
  if (flag === true) {
    if (fileObj) {
      // existText = fileObj.read();
    }
  }

  // overwrite
  flag = fileObj.open("w");
  if (flag === true) {
    var text;
    if (existText) {
      text = txt;
    } else {
      text = txt;
    }
    fileObj.writeln(text);
    fileObj.close();
    return fileObj.fsName;
  } else {
    alert("Error: can't create file.");
  }
  return false;
}

function jsxAlert(args) {
  var message = args["message"];
  alert(message);
  return;
}
