'use strict';

module.exports = function(Playbasis) {

	// Global Playbasis's helpers object for utility methods and classes
	var helpers = Playbasis.helpers = {};

	// -- convert json-string to json-object
	helpers.jsonStrToObj = function(jsonRawString)
	{
		return JSON.parse(jsonRawString);
	}

	// -- convert from json object to json string
	helpers.jsonObjToStr = function(jsonObj)
	{
		return JSON.stringify(jsonObj);
	}

	helpers.joinUrlComponent = function(a, b)
	{
		return a + "/" + b;
	}

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

	helpers.createApiUrl = function(method)
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

	helpers.objAdd = function(obj, key, value)
	{
		obj[key] = value;
		return obj;
	}

	helpers.createHttpLevelStatusObj = function(code, message)
	{
		return {"code":code, "message":message};
	}

	helpers.createApiLevelStatusObj = function(type, code, message)
	{
		return {"type": type, "code": code, "message": message};
	}

	// forward result from http level to Playbasis api level
	helpers.forwardApiCallback = function(callback, status, result)
	{
		// if both http, and Playbasis api are ok
		if (status.code == 200 && result != null && result.success == true)
		{
			if (callback != null) {

				// we will send Ok status as part of status-obj back via callback
				var scode = Playbasis.const.status.Ok;
				var type = Playbasis.const.statusType.PlaybasisApi;

				// create Playbasis api level status obj
				// use message from result of Playbasis api
				var fsObj = helpers.createApiLevelStatusObj(type, scode, result.message);

				// there's no error then send result text
				callback(fsObj, result.response);
			}
		}
		// it's Playbasis api error
		else if (status.code == 200)
		{
			if (callback != null) {

				// we will send back Playbasis's status obj back via callback
				var scode = parseInt(result.error_code);
				var type = Playbasis.const.statusType.PlaybasisApi;

				// create Playbasis api level status obj
				// use message from result of Playbasis api
				var fsObj = helpers.createApiLevelStatusObj(type, scode, result.message);

				// send null as result text as there's an error
				callback(fsObj, null);
			}
		}
		// it's http error
		else
		{
			if (callback != null) {

				var type = Playbasis.const.statusType.Http;

				// create Playbasis api level status obj
				// use message from result of http level status message
				var fsObj = helpers.createApiLevelStatusObj(type, status.code, status.message);

				// send null as result text as there's an error
				callback(fsObj, null); 
			}
		}
	}

	helpers.isOk = function(status)
	{
		// if either in http-level, or api-level then return true
		if ((status.code == 200 && status.type == Playbasis.const.statusType.Http) ||
			(status.code == 0 && status.type == Playbasis.const.statusType.PlaybasisApi)) {
			return true;
		}
		else {
			return false;
		}
	}

	helpers.throwIfNoToken = function()
	{
		if (Playbasis.env.global.token == null || Playbasis.env.global.token == "")
			throw "Token is not available. Check if token is already acquired prior to this call";
	}
}