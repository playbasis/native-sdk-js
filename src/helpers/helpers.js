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
	 * Join variable url param together as query string, then prefix it with "&" if there's at least one non-null key-value pair.
	 * @param {...param} param url param as part of url
	 * @return {string} query string
	 * @memberOf Playbasis.helpers
	 */
	helpers.appendAndJoinIfNotNullAsUrlParam = function(param)
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
				result += "&";
				result += encodeURIComponent(key) + "=" + encodeURIComponent(value);
			}
		}

		return result;
	}

	/**
	 * Join variable url param together as query string, then prefix it with "&" if there's at least one non-null key-value pair.
	 * @param {Array} keys Array containing all keys string
	 * @param {Array} defaultValues Array containing all default values string
	 * @param {Object} inputObj Input optional object parameter, inside there're key-value pairs according to key and values of final query string
	 * @return {String} query string
	 * @memberOf Playbasis.helpers
	 */
	helpers.appendAndJoinIfNotNullAsUrlParam2 = function(keys, defaultValues, inputObj)
	{
		var result = "";

		for (var i=0; i<keys.length; i++) {
			var key = keys[i];
			var value = defaultValues[i];

			// use input object value for this key
			if (inputObj != null) {
				if (inputObj[key] != null) {
					value = inputObj[key];
				}
			}

			if (key != null && value != null) {
				result += "&";
				result += encodeURIComponent(key) + "=" + encodeURIComponent(value);
			}
		}

		return result;
	}

	/**
	 * Create object with keys and values from specified object.
	 * It will ignore and skip key-value pair whose either key or value is null.
	 * It specified object is null, then it will create an empty object.
	 * @param  {Object} obj target object to get keys and values from in order to create a new object
	 * @return {Object}     new object created with non-null keys and values from specified object
	 * @memberOf Playbasis.helpers
	 */
	helpers.createObjectFromTarget = function(obj)
	{
		// if specified object is null then return empty object
		if (obj == null)
			return {};

		var retObj = {};
		var keys = Object.keys(obj);

		for (var i=0; i<keys.length; i++) {
			var key = keys[i];
			var value = obj[key];

			// if key and value is not null then add it into new object
			if (key != null && value != null) {
				retObj[key] = value;
			}
		}

		return retObj;
	}

	/**
	 * Combine two objects together but skip key-value pair whose either key or value is null.
	 * If both of objects are null, then return empty object.
	 * If object B has same keys as in object A, object A's values will be replaced by values of object B.
	 * @param  {Object} objA object A to combine
	 * @param  {Object} objB object B to combine
	 * @return {Object}      Combined object A and B but skipped key-value pair whose either key or value is null
	 */
	helpers.combineObjects = function(objA, objB)
	{
		var retObj = {};

		// if both objects are null then return empty object
		if (objA == null && objB == null)
			return retObj;

		// swap to base on non-null object
		if (objA == null) {
			retObj = objB;
			return retObj;
		}
		else if (objB == null) {
			retObj = objA;
			return retObj;
		}

		// copy key-value from object B to A
		var keys = Object.keys(objB);
		retObj = objA;

		for (var i=0; i<keys.length; i++) {
			var key = keys[i];
			var value = objB[key];

			if (key != null && value != null) {
				retObj[key] = value;
			}
		}

		return retObj;
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