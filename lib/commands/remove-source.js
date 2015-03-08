/**
 * remove-source.js
 * Remove a source from the configured sources
 */

var sources = require("../sources.js");

module.exports = function(env, source, options){
  return sources.remove(source, "all");
};
