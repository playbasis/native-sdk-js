'use strict';

module.exports = function(Playbasis) {

	// global builder object
	var builder = Playbasis.builder = {};

	var finalSettingObj = {
		baseUrl: Playbasis.static.defaults.global.baseUrl,
		baseAsyncUrl: Playbasis.static.defaults.global.baseAsyncUrl,
		apiKey: null,
		apiSecret: null
	}

	builder.setApiKey = function(apiKey)
	{
		finalSettingObj.apiKey = apiKey;
		return builder;
	}

	builder.setApiSecret = function(apiSecret)
	{
		finalSettingObj.apiSecret = apiSecret;
		return builder;
	}

	builder.setBaseUrl = function(baseUrl)
	{
		finalSettingObj.baseUrl = baseUrl;
		return builder;
	}

	builder.setBaseAsyncUrl = function(baseAsyncUrl)
	{
		finalSettingObj.baseAsyncUrl = baseAsyncUrl;
		return builder;
	}

	builder.build = function()
	{
		// finally set settings to Playbasis.env.global
		Playbasis.env.global.baseUrl = finalSettingObj.baseUrl;
		Playbasis.env.global.baseAsyncUrl = finalSettingObj.baseAsyncUrl;
		Playbasis.env.global.apiKey = finalSettingObj.apiKey;
		Playbasis.env.global.apiSecret = finalSettingObj.apiSecret;
	}
}