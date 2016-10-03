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
	 * @return {Object}         Promise object
	 * @method  goodsListInfo
	 * @memberOf Playbasis.goodsApi
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
	 * @return {Object}         Promise object
	 * @method  goodsInfo
	 * @memberOf Playbasis.goodsApi
	 */
	api.goodsInfo = function(goodsId, options)
	{
		var keys = ["player_id"];
		var dvalues = [null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, goodsId) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Find number of available Goods given group.
	 * @param  {String} playerId player id
	 * @param  {String} group    goods group
	 * @param  {Object} options  (optional) options as object. It can include { amount: #number = amount of the goods to redeem }
	 * @return {Object}          Promise object
	 * @method  goodsGroupAvailable
	 * @memberOf  Playbasis.goodsApi
	 */
	api.goodsGroupAvailable = function(playerId, group, options)
	{
		var keys = ["player_id", "group", "amount"];
		var dvalues = [playerId, group, null];

		return http.getJsonAsync(helpers.createApiUrl("Redeem", "goodsGroup") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Return information about all available sponsored goods.
	 * @return {Object} Promise object
	 * @method  sponsoredGoodsListInfo
	 * @memberOf  Playbasis.sponsoredGoodsListInfo
	 */
	api.sponsoredGoodsListInfo = function()
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "sponsor"));
	}

	/**
	 * Returns information about the sponsored goods with the specified id.
	 * @param  {String} goodsId goods id
	 * @return {Object}         Promise object
	 * @method sponsoredGoodsInfo
	 * @memberOf Playbasis.sponsoredGoodsInfo
	 */
	api.sponsoredGoodsInfo = function(goodsId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "sponsor", goodsId));
	}

	/**
	 * Find number of available sponsored Goods given group.
	 * @param  {String} playerId player id
	 * @param  {String} group    goods group
	 * @param  {Object} options  (optional) options as object. It can include { amount: #number = amount of goods to redeem }
	 * @return {Object}          Promise object
	 * @method  sponsoredGoodsGroupAvailable
	 * @memberOf Playbasis.sponsoredGoodsGroupAvailable
	 */
	api.sponsoredGoodsGroupAvailable = function(playerId, group, options)
	{
		var keys = ["player_id", "group", "amount"];
		var dvalues = [playerId, group, null];

		console.log(helpers.createApiUrl(apiMethod, "couponVerify") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));

		return http.getJsonAsync(helpers.createApiUrl("Redeem", "sponsorGroup") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Verify coupon code available.
	 * @param  {String} goodsId    goods id
	 * @param  {String} couponCode coupon code of goods to verify
	 * @param  {Object} options    (optional) options as object. It can include { player_id: #string = player id }
	 * @return {Object}            Promise object
	 * @method  verifyCoupon
	 * @memberOf  Playbasis.verfiyCoupon
	 */
	api.verifyCoupon = function(goodsId, couponCode, options)
	{
		var keys = ["goods_id", "coupon_code", "player_id"];
		var dvalues = [goodsId, couponCode, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "couponVerify") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Verify coupon code available and redeem.
	 * @param  {String} goodsId    goods id
	 * @param  {String} couponCode coupon code
	 * @param  {String} playerId   player id
	 * @return {Object}            Promise object
	 * @method  verifyCouponWithRedeem
	 * @memberOf  Playbasis.verifyCouponWithRedeem
	 */
	api.verifyCouponWithRedeem = function(goodsId, couponCode, playerId)
	{
		var postObj = { token: Playbasis.env.global.token, goods_id: goodsId, coupon_code: couponCode, player_id: playerId };

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "couponVerify"), postObj);
	}
}