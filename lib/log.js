/**
 * log.js
 */

module.exports = function(logger){

  if (typeof logger === "undefined") {
    logger = {
      error: function(){ process.stderr.write("Error: " + arguments[0] + "\n"); },
      warn: function(){ process.stdout.write("Warn: " + arguments[0] + "\n"); },
      info: function(){ process.stdout.write("Info: " + arguments[0] + "\n"); },
      log: function(){ process.stdout.write(arguments[0] + "\n"); }
    };
  }

  return {
    error: logger.error,
    warn: logger.warn,
    info: logger.info,
    log: logger.log
  };

};
