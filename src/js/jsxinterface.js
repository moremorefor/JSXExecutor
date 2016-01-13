(function() {

  'use strict';

  var instance;

  function JSXInterface() {
    this.csInterface = new CSInterface();
  }

  JSXInterface.getInstance = function() {
    if(!instance) {
      instance = new JSXInterface();
    }
    return instance;
  };

  JSXInterface.prototype._sendJSXString = function(f, args, deferred) {
    var self = this;
    console.log("【DEBUG】_sendJSXString: ", f, args, deferred);

    deferred = deferred || Q.defer();

    self.csInterface.evalScript( f + '(' + args + ')', function(cb){
      // if (cb == 'undefined') {
      //   console.log("【DEBUG】csInterface failed.");
      //   deferred.reject(new Error());
      // } else {
        console.log("【DEBUG】csInterface ", cb);
        deferred.resolve(cb);
      // }
    });

    return deferred;
  };

  JSXInterface.prototype._sendJSX = function(f, params) {
    var self = this,
      deferred = Q.defer();

    var stringifyParams = function(params) {
      var paramsString = "null";
      if (params) {
        try {
          console.log("【DEBUG】params: ", params);
          paramsString = JSON.stringify(params);
          console.log("【DEBUG】paramsString: ", paramsString);
        } catch (jsonError) {
          return Q.reject(jsonError);
        }
      }
      return Q.fulfill(paramsString);
    };

    Q.spread([stringifyParams(params)], function(paramsString) {
      self._sendJSXString(f, paramsString, deferred);
    })
    .fail(function(err) {
      deferred.reject(err);
    });

    return deferred;
  };

  JSXInterface.prototype.evaluateJSX = function(f, params) {
    var self = this,
      deferred = self._sendJSX(f, params);

    deferred.promise.progress(function(message) {
      deferred.resolve(message);
    });

    return deferred.promise;
  };

  JSXInterface.prototype.alert = function(message) {
    var self = this;
    console.log(message);
    self.evaluateJSX("jsxAlert", {message:message})
      .then(function(cb){
      });
  };

  module.exports = JSXInterface;

}());
