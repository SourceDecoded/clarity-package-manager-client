#!/usr/bin/env node
/**
 * cli.js
 * Command Line Interface for cpkg
 */

process.title = "cpkg";

var path = require("path");
var cpkg = require("../lib/main.js");
var nopt = require("nopt");

var command = process.argv[2];

var options = nopt({}, {}, process.argv, 3);
var args = options.argv.remain;

cpkg.command(command, args, options);
