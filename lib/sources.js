/**
 * sources.js
 * Tools for dealing with package sources
 */

var fs = require('fs');
var log = require("./log.js");
var applicationConfig = require("./applicationConfig.js");
var userConfig = require("./userConfig.js");

var getSources = function(){
  var matches = {
    app: [],
    user: [],
    static: ["http://registry.cpkg.org"]
  };
  // precedence:
  // 1 - application.json cpkg.sources
  // there may not be an accessible application.json file
  try {
    var ac = applicationConfig.read();
    if(typeof ac.cpkg !== "undefined" &&
         ac.cpkg.sources !== "undefined" &&
         ac.cpkg.sources.constructor === Array) {
       matches.app = ac.cpkg.sources;
     }
  } catch (e) {}

  // 2 - ~/.cpkg
  var uc = userConfig.read();
  if (typeof uc.sources !== "undefined" && uc.sources.constructor === Array) {
    matches.user = uc.sources;
  }

  // 3 - http://cpkg.org


  matches.all = matches.app.concat(matches.user.concat(matches.static));

  return matches;
};

var addSource = function(source, type) {
  type = type || "app";

  var configStorage = {
    "app": {
      "add": function(source){
        var appConfig = applicationConfig.read();

        if (typeof appConfig.cpkg === "undefined") {
          appConfig.cpkg = {};
        }

        if (typeof appConfig.cpkg.sources === "undefined") {
          appConfig.cpkg.sources = [];
        }

        if (appConfig.cpkg.sources.indexOf(source) === -1) {
          appConfig.cpkg.sources.push(source);
          applicationConfig.write()
        }
      }
    },
    "user": {
      "add": function(source) {
        var config = userConfig.read();
        if (typeof config.sources === "undefined") {
          config.sources = [];
        }

        if (config.sources.indexOf(source) === -1) {
          config.sources.push(source);
          userConfig.write(config);
        }
      }
    }
  };

  if (typeof configStorage[type] === "undefined") {
    throw new Error("Unknown storage type: " + type);
  }

  configStorage[type].add(source);

}

var removeSource = function(source, type) {
  type = type || "all";
  var configStorage = {
    "app": {
      "remove": function(source){
        var appConfig = applicationConfig.read();
        if (typeof appConfig.cpkg !== "undefined") {
          if (typeof appConfig.cpkg.sources !== "undefined") {
            var index = appConfig.cpkg.sources.indexOf(source);
            if (index > -1) {
              appConfig.cpkg.sources.splice(index, 1);
              applicationConfig.write()
            }
          }
        }
      }
    },
    "user": {
      "remove": function(source){
        var config = userConfig.read();
        if (typeof config.sources !== "undefined") {
          var index = config.sources.indexOf(source);
          if (index > -1) {
            config.sources.splice(index, 1);
            userConfig.write(config);
          }
        }
      }
    }
  };

  configStorage.all = {
    "remove": function(source){
      try {
        configStorage.app.remove(source);
      } catch (e) {}
      configStorage.user.remove(source);
    }
  };

  if (typeof configStorage[type] === "undefined") {
    throw new Error("Unknown storage type: " + type);
  }

  configStorage[type].remove(source);

}

module.exports = {
  list: getSources,
  add: addSource,
  remove: removeSource
};
