'use strict';

/**
 * Playbasis Builder
 * @namespace Playbasis.buider
 */
module.exports = function(Playbasis) {

	// global builder object
	var builder = Playbasis.builder = {};

	var finalSettingObj = {
		baseUrl: Playbasis.static.defaults.global.baseUrl,
		baseAsyncUrl: Playbasis.static.defaults.global.baseAsyncUrl,
		apiKey: null,
		apiSecret: null
	}

	/**
	 * Set api key
	 * @param {String} apiKey api key
	 * @return {Object} Playbasis.builder object. You can chain setting other properties further.
	 * @method  setApiKey
	 * @memberOf Playbasis.builder
	 */
	builder.setApiKey = function(apiKey)
	{
		finalSettingObj.apiKey = apiKey;
		return builder;
	}

	/**
	 * Set api secret
	 * @param {String} apiSecret api secret
	 * @return {Object} Playbasis.builder object. You can chain setting other properties further.
	 * @method  setApiSecret
	 * @memberOf Playbasis.builder
	 */
	builder.setApiSecret = function(apiSecret)
	{
		finalSettingObj.apiSecret = apiSecret;
		return builder;
	}

	/**
	 * Set base url
	 * @param {String} baseUrl base url
	 * @return {Object} Playbasis.builder object. You can chain setting other properties further.
	 * @method  setBaseUrl
	 * @memberOf Playbasis.builder
	 */
	builder.setBaseUrl = function(baseUrl)
	{
		finalSettingObj.baseUrl = baseUrl;
		return builder;
	}

	/**
	 * Set base async url
	 * @param {String} baseAsyncUrl base async url
	 * @return {Object} Playbasis.builder object. You can chain setting other properties further.
	 * @method  setBaseAsyncUrl
	 * @memberOf Playbasis.builder
	 */
	builder.setBaseAsyncUrl = function(baseAsyncUrl)
	{
		finalSettingObj.baseAsyncUrl = baseAsyncUrl;
		return builder;
	}

	/**
	 * Build
	 * @method build
	 * @memberOf Playbasis.builder
	 */
	builder.build = function()
	{
		// finally set settings to Playbasis.env.global
		Playbasis.env.global.baseUrl = finalSettingObj.baseUrl;
		Playbasis.env.global.baseAsyncUrl = finalSettingObj.baseAsyncUrl;
		Playbasis.env.global.apiKey = finalSettingObj.apiKey;
		Playbasis.env.global.apiSecret = finalSettingObj.apiSecret;
	}
}