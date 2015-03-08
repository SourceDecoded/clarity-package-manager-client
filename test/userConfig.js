/**
 * test/userConfig.js
 * Test the user config manager
 */

var userConfig = require("../lib/userConfig.js");
var fs = require("fs");

var readConfig = function(){
    var config = userConfig.read();
    if (typeof config === "object") {
      return true;
    } else {
      return false;
    }
};

var writeConfig = function() {
  var config = userConfig.read();
  var testValue = "testValue";
  config.testKey = testValue;
  userConfig.write(config);
  var config2 = userConfig.read();
  return config2.testKey === testValue;
}

var writeConfigCleanup = function() {
  var config = userConfig.read();
  delete config.testKey;
  userConfig.write(config);
}

var purgeConfig = function(){
  var tempPath = "./userConfigTestConfig";
  var testValue = "testValue";
  var config = userConfig.read(tempPath);
  config.testKey = testValue;
  userConfig.write(config, tempPath);
  // verify that it was written
  var config2 = userConfig.read(tempPath);
  if (config2.testKey !== testValue) {
    console.error("Couldn't save and read the temp config file");
    return false;
  }

  userConfig.purge(tempPath);

  try {
    var data = fs.readFileSync(tempPath);
    console.error("The file wasn't purged!");
    return false;
  } catch (e) {
    return true;
  }

};


console.log("Read Config: " + readConfig());
console.log("Write Config: " + writeConfig());
writeConfigCleanup();
console.log("purgeConfig: " + purgeConfig());
