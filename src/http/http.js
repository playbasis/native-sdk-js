'use strict';

/**
 * Playbasis Http Module
 * @namespace Playbasis.http
 */
module.exports = function(Playbasis) {

	// use helpers
	var helpers = Playbasis.helpers;

	// Global Playbasis's helpers object for utility methods and classes
	var http = Playbasis.http = {};

	// .error() will catch only OperationalError of Bluebird
	var OperationalError = Playbasis.Promise.OperationalError;

	// private object holds private variables, and functions
	var _priv = {};

	// private function to check if 
	_priv.isRelateToInternetConnectionIssue = function(errorMsg) {
		// as tested on Safari, Chrome, and Firefox we got 2 possible messages to check
		if (errorMsg.search("XHR error") > -1 || errorMsg.search("Failed to fetch") > -1) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * Make a GET request
	 * @param  {string} url target url to send request to
	 * @return {object}     Promise object
	 * @method  getJsonAsync
	 * @memberOf Playbasis.http
	 */
	http.getJsonAsync = function(url) 
	{
		return new Playbasis.Promise( (resolve, reject) => {
			// load proper library
			// load from reference if it's already loaded
			const lib = url.search('https') != -1 ? require('https') : require('http');
			// make a GET request
			const request = lib.get(url, (response) => {
				// handle http errors
				if (response.statusCode != 200) {
					// create error object
					var error = new OperationalError("Failed to load page, status code: " + response.statusCode)
					// piggy back error code
					error.code = response.statusCode;
					error.isApiLevel = false;
					return reject(error);
				}

				// on every content chunk, push it to the data array
				response.on('data', (d) => {

					// check if data is null
					if (d == null) {
						return reject(new OperationalError("Failed on api response. Response is null"));
					}

					// parse into json, and validate for error-free
					let json = null;
					try {
						// parse data resposne to json
						json = JSON.parse(d);
					}
					catch(e) {
						return reject(new OperationalError("Failed on parsing JSON response message. Error: " + e.message));
					}

					// check api level error
					let errorCode = parseInt(json.error_code);
					if (errorCode == 0) {
						// all ok
						return resolve(json);
					}
					else {
						// reject with error code as error
						var error = new OperationalError("Failed on response message. Error code: " + errorCode + " with " + json.message);
						// piggy back error code
						error.code = errorCode;
						error.isApiLevel = true;
						return reject(error);
					}
				});
				response.on('error', (e) => { return reject(new OperationalError(e.message)); });
			});

			request.on('error', (e) => {
				// if it relates to internet connection issue, then mark its code
				if (_priv.isRelateToInternetConnectionIssue(e.message)) {
					var error = new OperationalError("Request error. " + e.message);
					error.code = Playbasis.const.errorCode.internetConnectionIssue;
					return reject(error);
				}
				else {
					return reject(new OperationalError("Request error. " + e.message));
				}
			});
		});
	}

	/**
	 * Make a POST request
	 * @param {String} url url target to send request to
	 * @param {Object} postDataKvp Post data as object key-value pair.
	 * @return {object}     Promise object
	 * @method  postJsonAsync
	 * @memberOf Playbasis.http
	 */
	http.postJsonAsync = function(url, postDataKvp) 
	{
		return new Playbasis.Promise( (resolve, reject) => {
			// load proper library
			// load from reference if it's already loaded
			var lib = null;
			var isHttps = true;
			if (url.search('https') != -1) {
				lib = require('https');
				isHttps = true;
			}
			else {
				lib = require('http');
				isHttps = false;
			}

			// form query string of post data
			var encodedDataParams = "";
			if (postDataKvp != null) {
				var keys = Object.keys(postDataKvp);
				var count = keys.length;

				for (var i=0; i<count; i++)
				{
					// get key and value
					var key = keys[i];
					var value = postDataKvp[keys[i]];

					// if both are not null then we add them into result string
					if (key != null && value != null) {

						// prefix "&" as it needs to check first if the current element has value or not
						if (i != 0) {
							encodedDataParams += "&";
						}

						encodedDataParams += encodeURIComponent(key) + "=" + encodeURIComponent(value);
					}
				}
			}

			// cut out prefixed protocal
			var noPrefixUrl = isHttps ? url.substring(8) : url.substring(7);
			// get base url, and the less
			const firstSlashPos = noPrefixUrl.indexOf("/");
			const baseUrl = noPrefixUrl.substring(0, firstSlashPos);
			const pathUrl = "/" + noPrefixUrl.substring(firstSlashPos+1);

			// form options for reqeust
			// we also need to calculate byte-lenth of post data to send too
			var postOptions = {
				hostname: baseUrl,	// cut out protocal string, and get only host name string
				path: pathUrl,
				port: isHttps ? 443 : 80,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': Buffer.byteLength(encodedDataParams)
				}
			};

			// make a POST request
			const request = lib.request(postOptions, (response) => {
				// handle http errors
				if (response.statusCode != 200) {
					// create error object
					var error = new OperationalError("Failed to load page, status code: " + response.statusCode)
					// piggy back error code
					error.code = response.statusCode;
					error.isApiLevel = false;
					return reject(error);
				}

				response.setEncoding('utf8');

				// on every content chunk, push it to the data array
				response.on('data', (d) => {

					// check if data is null
					if (d == null) {
						return reject(new OperationalError("Failed on api response. Response is null"));
					}

					// parse into json, and validate for error-free
					let json = null;
					try {
						// parse data resposne to json
						json = JSON.parse(d);
					}
					catch(e) {
						return reject(new OperationalError("Failed on parsing JSON response message. Error: " + e.message));
					}

					// check api level error
					let errorCode = parseInt(json.error_code);
					if (errorCode == 0) {
						// all ok
						return resolve(json);
					}
					else {
						// check if it's token-related error
						// either it's error code 900 (INVALID_TOKEN) or 902 (TOKEN_REQUEST)
						// then it's safe for us to help developers ease the need to manually get a token via either auth() or renew()
						// by automatically send a request
						if (errorCode == 900 || errorCode == 902) {
							// make an auth() request automatically
							// it's not totally clean at this case, at the code is duplicated from api.auth.js's auth() function
							// this solution is applied to avoid cyclic dependency
							http.postJsonAsync(helpers.createApiUrl("Auth"), {api_key : Playbasis.env.global.apiKey, api_secret : Playbasis.env.global.apiSecret})
								.then((result) => {
									// intercept token first, then return promise object back to user
									Playbasis.env.global.token = result.response.token;

									// make an original request, but update its "token" key
									postDataKvp.token = Playbasis.env.global.token;
									http.postJsonAsync(url, postDataKvp)
										.then((_r) => {
											return resolve(_r);
										}, (_e) => {
											return reject(_e);
										});
								}, (e) => { 
									// just propagate the error object
									return reject(e);
								});
						}
						// or else just reject it as normal operational error
						else {
							// reject with error code as error
							var error = new OperationalError("Failed on response message. Error code: " + errorCode + " with " + json.message);
							// piggy back error code
							error.code = errorCode;
							error.isApiLevel = true;
							return reject(error);
						}
					}
				});
				response.on('error', (e) => { return reject(new OperationalError(e.message)); });
			});

			request.on('error', (e) => {

				// if it relates to internet connection issue, then mark its code
				if (_priv.isRelateToInternetConnectionIssue(e.message)) {
					var error = new OperationalError("Request error. " + e.message);
					error.code = Playbasis.const.errorCode.internetConnectionIssue;
					return reject(error);
				}
				else {
					return reject(new OperationalError("Request error. " + e.message));
				}
			});

			// write post data
			request.write(encodedDataParams);
			request.end();
		});
	}
}