/**
 * Clairty Package Manager
 */

var cpkg = {};

cpkg.commands = {};

// Package management
cpkg.commands["install"] = require("./commands/install.js");
cpkg.commands["remove"] = require("./commands/remove.js");

// Source management
cpkg.commands["add-source"] = require("./commands/add-source.js");
cpkg.commands["remove-source"] = require("./commands/remove-source.js");
cpkg.commands["list-sources"] = require("./commands/list-sources.js");

// Development tools
cpkg.commands["server"] = require("./commands/server.js");
cpkg.commands["bundle"] = require("./commands/bundle.js");
cpkg.commands["init-app"] = require("./commands/init-app.js");

cpkg.env = {};

cpkg.command = function(name, args, options) {
  var argsArray = [cpkg.env];

  if (typeof cpkg.commands[name] === "undefined") {
    throw new Error("Comand unavailable: " + name);
  }

  if (typeof args !== "undefined") {
    if (args.constructor === Array) {
      argsArray = argsArray.concat(args);
    } else {
      argsArray.push(args);
    }
  }

  if (typeof options !== "undefined") {
    argsArray.push(options);
  }

  return cpkg.commands[name].apply(this, argsArray);

};

module.exports = cpkg;
