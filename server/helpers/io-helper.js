#!/usr/bin/env node
"strict mode";
"esversion:6";

var fs = require('fs');
// BEGIN UPDATED HELPER FUNCTIONS
const request = require('request');
const Promise = require('promise');
const config = require('../web-config');
const cmsTypes = require('../cms-types.js');
const parseString = require('xml2js').parseString;
const errors = require('restify-errors');
// END UPDATED HELPER FUNCTIONS


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

// BEGIN UPDATED HELPER FUNCTIONS
getAuth = () => {
	if (config.cmsAuth.apiUser != null)
		return config.cmsAuth.base64Encode = "Basic" + new Buffer(config.cmsAuth.apiUser + ':' + config.cmsAuth.apiPassword).toString('base64');
	else
		return null;
}

module.exports.getRequest = (url) => {
	let options = {
		method: 'GET',
		uri: config.cmsAuth.apiUrl + url,
		timeout: 10000,
		headers: {'Authorization': getAuth(), 'content-type': 'text/plain'}
	};

	return new Promise((resolve, reject)=> resolve())
		.then(()=> getResponse(options))
};


module.exports.postRequestWithHeaders = (url, parameter) => {
	let options = {
		method: 'POST',
		uri: config.cmsAuth.apiUrl + url,
		timeout: 10000,
		headers: {'Authorization': getAuth(), 'content-type': 'text/plain'},
		body: paramter.toString()
	};
	return new Promise((resolve, reject) => resolve())
		.then(()=> getHeaderResponse(options));
};

module.exports.postRequest = (url, parameter) => {
	let options = {
		method: 'POST',
		uri: config.cmsAuth.apiUrl + url,
		timeout: 10000,
		headers: {'Authorization': getAuth(), 'content-type': 'text/plain'},
		body: parameter.toString()
	};
	return new Promise((resolve, reject)=>(resolve()))
		.then(()=>getResponse(options))
};

module.exports.putRequest = (url, paramter) => {
	let options = {
		method: 'PUT',
		uri: config.cmsAuth.apiUrl + url,
		timeout: 10000,
		headers: {'Authorization': getAuth(), 'content-type': 'text/plain'},
		body: paramter.toString()
	};
	return new Promise((resolve, reject)=>resolve())
		.then(()=>getResponse(options))
};

module.exports.deleteRequest = (url, parameter) => {
	let options = {
		method: 'DELETE',
		uri: config.cmsAuth.apiUrl + url,
		timeout: 10000,
		headers: {'Authorization': getAuth(), "content-type": "text/plain"},
		body: parameter.toString()
	};
	return new Promise((resolve, reject) => resolve())
		.then(()=>getResponse(optons))
};


var getResponse = (options) =>{
	return new Promise((resolve, reject) => {
		request(options, (error, response, body)=>{
			if(error) reject(new Error(error))
			else{
				if(response.statusCode >= 200 && response.statusCode < 400){
					if(typeof body != 'undefined' && body != null){
						parseString(body, (err, jsonData)=>{
							if(err) reject(new Error(err))
							resolve(jsonData, response);
						});
					}
					else
						resolve(body);
				}
				else{
					if(response.statusCode == 401)
						reject(new errors.UnauthorizedError({message: "Unauthorized to access API", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.USERNAME_OR_PASSWORD_INCORRECT}}));
					if(response.statusCode == 401)
						reject(new errors.BadRequestError({message: body.toString(), context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.BAD_REQUEST}}));
					parseString(body, (err, jsonData)=>{
						if(err) reject(new Error(err))
						reject(new Error(jsonData));
					});
				}
			}
		});
	});
};

var getHeaderResponse = (options) => {
	return new Promise((resolve, reject) => {
		request(options, (error, response, body) => {
			if(error) reject(new Error(error));
			else {
				if(response.statusCode >= 200 && response.statusCode <400)
					resolve({"response": response, "data": body});
				else{
					if(response.statusCode == 401)
						reject(new error.UnauthorizedError({message: "Unauthorized to access API", context: {errorType: cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.USERNAME_OR_PASSWORD_INCORRECT}}));
					if(response.statusCode == 400)
						reject(new errors.BadRequestError({message: body.toString(), context: {errorType: cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.BAD_REQUEST}}));
					parseString(body, (err, jsonData) => {
						if(err) reject(new Error(err))
						reject(new Error(jsonData));
					});
				}
			}
		});
	});
};
// END UPDATED HELPER FUNCTIONS
