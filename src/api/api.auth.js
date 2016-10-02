'use strict';

/**
 * Playbasis Auth API
 * @namespace Playbasis.authApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// base url method
	var apiMethod = "Auth";

	// global object
	var _api = Playbasis.authApi = {}

	/**
	 * Authenticate the application to get token
	 * @return {object}            Promise object
	 * @memberOf Playbasis.authApi
	 */
	_api.auth = function() 
	{
		return new Playbasis.Promise( (resolve, reject) => {
			http.postJsonAsync(helpers.createApiUrl(apiMethod), {api_key : Playbasis.env.global.apiKey, api_secret : Playbasis.env.global.apiSecret})
				.then((result) => {
					// intercept token first, then return promise object back to user
					Playbasis.env.global.token = result.response.token;

					resolve(result);
				}, (e) => { reject(e); });
		});
	};

	/**
	 * Renew token
	 * @return {object}            Promise object
	 * @memberOf Playbasis.authApi
	 */
	_api.renew = function()
	{
		return new Playbasis.Promise( (resolve, reject) => {
			http.postJsonAsync(helpers.createApiUrl(apiMethod + "/renew"), {api_key : Playbasis.env.global.apiKey, api_secret : Playbasis.env.global.apiSecret})
				.then((result) => {
					// intercept token first, then return promise object back to user
					Playbasis.env.global.token = result.response.token;

					resolve(result);
				}, (e) => { reject(e); });
		});
	};
}