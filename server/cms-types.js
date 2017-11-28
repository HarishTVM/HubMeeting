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

module.exports.results = {
    OK: "OK",
    KNOWN_ERROR: "KNOWN_ERROR",
    CUSTOM_ERROR: "CUSTOM_ERROR",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
};

module.exports.status = {
    SUCCESS: 200,
    BAD_REQUEST: 400,

    /** User Login Related Status **/
    UNKNOWN_USER: 1,
    PASSWORD_INCORRECT: 2,

    /** Meeting Related Status **/
    MEETING_NOT_EXISTS: 51,

    /** CMS API Related Status **/
    USERNAME_OR_PASSWORD_INCORRECT:100
};
