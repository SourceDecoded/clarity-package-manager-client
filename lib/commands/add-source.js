/**
 * add-source.js
 * Add a source to the configured sources
 */

var sources = require("../sources.js");

module.exports = function(env, source, options){
  var type = options.type || "app";
  return sources.add(source, type);
};
