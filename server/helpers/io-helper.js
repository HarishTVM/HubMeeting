#!/usr/bin/env node
"strict mode";
"esversion:6";

var fs = require('fs');
var config = require("../web-config");

function fileReadSync(filePath){
  return(fs.readFileSync(filePath));
}

function logError(errorData){
	fs.appendFile(config.errorLog.filePath, errorData, function(err){
		if(err){ console.error(err);}
	});
}

module.exports.fileReadSync = fileReadSync;
module.exports.logError = logError;