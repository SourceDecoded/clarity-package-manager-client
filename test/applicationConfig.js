/**
 * test/applicationConfig.js
 */

var applicationConfig = require("../lib/applicationConfig");
var fs = require("fs");

var tempPath = "tempApplicationConfig.json";
var testValue = "value";

var writeConfig = function(){
  var config = {
    testKey: testValue
  };
  applicationConfig.write(config, tempPath);
  return true;
};

var readConfig = function(){
  var config = applicationConfig.read(tempPath);
  if (config.testKey === testValue) {
    return true;
  } else {
    return false;
  }
};

var cleanup = function(){
  fs.unlinkSync(tempPath);
};

console.log("Write config: " + writeConfig());
console.log("Read config: " + readConfig());
cleanup();
