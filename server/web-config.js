#!/usr/bin/env node
"strict mode";
"esversion:6";

var path = require('path');
var env = "Development";

module.exports.envType = env;

module.exports.app = {
	enableSSL: false,
	port: 9001,
	appStage: true, // true for development and false for live
	httpsCert: {
		cert: './certificates/certificate.pem',
		key: './certificates/privatekey.pem',
	},
	supportedLangs:["en","es"]
};

module.exports.redirectLocation = {
	ERROR: 'http://192.168.0.82:3000/error.html',
	RESET_PASSWORD: 'http://192.168.0.82:3000/app/views/reset-password.html?userId=',
	TRACK_Ride_URL: 'http%3A%2F%2F192.168.0.82%3A3000%2Fapp%2F%23%2FwatchRide%3Fride_id%3D' //%3A --> :, %3F --> ?, %2F --> /, %23 --> #, %3D --> =, %21 --> !
};

module.exports.errorLog = {
	filePath: "./Errorlog/log.txt",
};