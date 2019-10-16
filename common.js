var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var configFile = require("./config.json");

var common = {};
common.express = express;
common.path = path;
common.bodyParser = bodyParser;
common.dbConfig = configFile.dbConfig;
common.configFile = configFile;

module.exports = common;
