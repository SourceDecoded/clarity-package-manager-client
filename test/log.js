/**
 * test/log.js
 */

var log = require("../lib/log.js");
var defaultLog = log();

defaultLog.info("This is information");
defaultLog.warn("This is a warning");
defaultLog.error("Something has gone badly!");
defaultLog.log("Just a log.");

var alternateHandler = console;

var alternateLog = log(alternateHandler);

alternateLog.info("Alt information");
alternateLog.warn("Alt warn");
alternateLog.error("Alt error");
alternateLog.log("Alt log");
