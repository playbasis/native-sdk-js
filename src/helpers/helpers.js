'use strict';

/**
 * Playbasis Helpers
 * @namespace Playbasis.helpers
 */
module.exports = function(Playbasis) {

	// Global Playbasis's helpers object for utility methods and classes
	var helpers = Playbasis.helpers = {};

	/**
	 * Join each key of object into querystring and return it.
	 * It will iterate for all keys of its object, and process each pair of KVP making into final querystring.
	 * @param  {object} paramKvp options object
	 * @return {string}          query string
	 * @memberOf Playbasis.helpers
	 */
	helpers.joinParams = function(paramKvp)
	{
		if (paramKvp == null)
			return "";

		var encodedParams = "";
		var params = Object.keys(paramKvp);
		var count = params.length;

		for (var i=0; i<count; i++)
		{
			encodedParams += encodeURIComponent(params[i]) + "=" + encodeURIComponent(paramKvp[params[i]]);

			if (i < count-1)
				encodedParams += "&";
		}

		return encodedParams;
	}

	/**
	 * Join variable url param together as query string.
	 * @param {...param} param url param as part of url
	 * @return {string} query string
	 * @memberOf Playbasis.helpers
	 */
	helpers.joinIfNotNullAsUrlParam = function(param)
	{
		// if number of arguments is 0, or not multiple of 2 then we throw 
		if (arguments.length == 0 || arguments.length % 2 != 0)
			throw "number of argument cannot be 0, and must be multiple of 2";

		var result = "";

		// process on two consecutives
		for (var i=0; i<arguments.length; i+=2) {
			var key = arguments[i];
			var value = arguments[i+1];

			// if both are not null then we add them into result string
			if (key != null && value != null) {

				// prefix "&" as it needs to check first if the current element has value or not
				if (i != 0) {
					result += "&";
				}

				result += encodeURIComponent(key) + "=" + encodeURIComponent(value);
			}
		}

		return result;
	}

	/**
	 * Create api url for used with Playbasis's API modules.
	 * If you use this, make sure you know what you're doing.
	 * @param  {string} method method url for target API
	 * @param {...param} param url param as part of url
	 * @return {string}        url ready to be used to make a qurey for Playbasis's API modules
	 */
	helpers.createApiUrl = function(method, param)
	{
		var options = [];
		// collect from 2nd argument till he end
		for (var i=1; i<arguments.length; i++) {
			options.push(arguments[i]);
		}

		if (options && options.length > 0) {
			var optionsString = options.join("/");
			return Playbasis.env.global.baseUrl + "/" + method + "/" + optionsString + "?api_key=" + Playbasis.env.global.apiKey;
		}
		else {
			return Playbasis.env.global.baseUrl + "/" + method + "?api_key=" + Playbasis.env.global.apiKey;
		}
	}
}