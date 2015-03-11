/**
 * install.js
 * Query
 */

var sources = require("../sources.js");
var cpkgAPI = require("../cpkgAPI.js");
var log = require("../log.js")();

var queryNextServer = function(packageName, hostList, done, fail){
  if (hostList.length === 0) {
    fail("Package not found");
  }
  var host = hostList.shift();
  var api = cpkgAPI(host);
  api.get(packageName, function(package){
    done(package);
  }, function(){
    queryNextServer(packageName, hostList, done, fail);
  });
};

var installPackage = function(package){
  
};

module.exports = function(env, package, version, options){
  var allSources = sources.list().all;
  // query configured services in turn to find requested package

  queryNextServer(package, allSources, function(package){
    installPackage(package);
  }, function(message){
    log.log(message);
  });


};
