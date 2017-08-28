#!/usr/bin/env node
"strict mode";
"esversion:6";

module.exports.result = {
	SUCCESS: 0,      

	/*** 500 Server Error ***/
	SERVER_ERROR: 500

};

// Structures
module.exports.Response = function (result, data) {
	this.result = result;
	this.data = data;
};