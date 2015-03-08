/**
 * userConfig.js
 * Tools for dealing with the ~/.cpkg file
 */

var fs = require("fs");
var log = require("./log.js");

var getConfigPath = function(path) {
  if (typeof path === "undefined") {
    var dir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    path = dir + "/.cpkg";
  }

  return path;
};


var read = function(path){
  path = getConfigPath(path);

  var config = {};
  var data = null;

  try {
    data = fs.readFileSync(path);
  } catch (e) {
    console.warn("Couldn't find user config at " + path);
  }

  if (data) {
    try {
      config = JSON.parse(data);
    } catch (e) {
      throw new Error("user config is unparseable at " + path);
    }
  }

  return config;

};


var write = function(config, path){
  path = getConfigPath(path);

  var data = JSON.stringify(config);

  try {
    fs.writeFileSync(path, data);
  } catch (e) {
    throw new Error("Could not write user config to " + path);
  }
};


var purge = function(path) {
  path = getConfigPath(path);
  try {
    fs.unlinkSync(path);
  } catch (e) {
    throw new Error("Could not unlink file at " + path);
  }
};


module.exports = {
  read: read,
  write: write,
  purge: purge
};
