'use strict';

module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// base url method
	var apiMethod = "Auth";

	// global object
	var _api = Playbasis.authApi = {}

	_api.auth = function(callback) 
	{
		http.postJson(helpers.createApiUrl(apiMethod), {api_key : Playbasis.env.global.apiKey, api_secret : Playbasis.env.global.apiSecret}, function(status, result) {
			// just intercept and save token value before forwarding callback
			if (status.code == 200 && result.success == true) {
				Playbasis.env.global.token = result.response.token;
			}

			// forward callback
			helpers.forwardApiCallback(callback, status, result);
		});
	};

	_api.renew = function(callback)
	{
		http.postJson(helpers.createApiUrl(apiMethod + "/renew"), {api_key : Playbasis.env.global.apiKey, api_secret : Playbasis.env.global.apiSecret}, function(status, result) {
			// intercept and save token value before forwarding callback
			if (status.code == 200 && result.success == true) {
				// update token
				Playbasis.env.global.token = result.response.token;
			}
			
			// forward callback
			helpers.forwardApiCallback(callback, status, result);
		});
	};
}