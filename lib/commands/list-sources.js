/**
 * list-sources.js
 */

var sources = require("../sources.js");
var log = require("../log.js")();

module.exports = function(env, options) {
  log.log(JSON.stringify(sources.list(), null, "\t"));
}
