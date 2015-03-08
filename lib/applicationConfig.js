/**
 * applicationConfig.js
 * Tools for dealing with the application.json file
 */

var fs = require("fs");

var getConfigPath = function(path) {
  if (typeof path === "undefined") {
    path = "./application.json";
  }

  return path;
};

var read = function(path){
  path = getConfigPath(path);
  var data = null;

  try {
    data = fs.readFileSync(path);
  } catch (e) {
    throw new Error("Couldn't read file at " + path);
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    throw new Error("Application config unparseable at " + path);
  }

};

var write = function(config, path) {
  path = getConfigPath(path);
  var data = JSON.stringify(config);

  try {
    fs.writeFileSync(path, data);
  } catch(e) {
    throw new Error("Could not write application config to " + path);
  }
}

module.exports = {
  read: read,
  write: write
};
