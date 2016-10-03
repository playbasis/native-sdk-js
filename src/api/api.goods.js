'use strict';

/**
 * Playbasis Goods API
 * @namespace Playbasis.goodsApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// api base url
	var apiMethod = "Goods";

	// global object
	var api = Playbasis.goodsApi = {}

	/**
	 * Returns information about all available goods for the current site.
	 * @param  {Object} options (optional) options as object. It can include { player_id: #string, tags: #string = delimit by comma }.
	 * @return {Object}         promise object
	 */
	api.goodsListInfo = function(options)
	{
		var keys = ["player_id", "tags"];
		var defaultValues = [null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, defaultValues, options));
	}

	/**
	 * Returns information about the goods with the specified id.
	 * @param  {String} goodsId goods id
	 * @param  {Object} options (optional) options as object. It can include { player_id: #string }
	 * @return {Object}         promise object
	 */
	api.goodsInfo = function(goodsId, options)
	{
		var keys = ["player_id"];
		var dvalues = [null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, goodsId) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}	
}