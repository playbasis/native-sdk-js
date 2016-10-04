'use strict';

/**
 * Playbasis Merchant API
 * @namespace Playbasis.merchantApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// base url method
	var apiMethod = "Merchant";

	// global Object
	var _api = Playbasis.merchantApi = {};

	/**
	 * Return list of available branch of goods group.
	 * @param  {String} goodsGroup name of goods group
	 * @return {Object}            Promise object
	 * @method  availableBranchForGoodsGroup
	 * @memberOf Playbasis.merchantApi
	 */
	_api.availableBranchForGoodsGroup = function(goodsGroup)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "availableBranchGoodsGroup") + helpers.appendAndJoinIfNotNullAsUrlParam("goods_group", goodsGroup));
	}
}