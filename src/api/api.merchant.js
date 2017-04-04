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

	/**
	 * Verify coupon code available to be redeemed.
	 * @param  {String} goodsGroup goods group name
	 * @param  {String} couponCode coupon code of goods to verify
	 * @param {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `pin_code`: *String* = merchant PIN code generated from admin dashboard  
	 * `player_id`: *String* = player id  
	 * }
	 * @return {Object}            Promise object
	 * @method  verifyCoupon
	 * @memberOf Playbasis.merchantApi
	 */
	_api.verifyCoupon = function(goodsGroup, couponCode, options)
	{
		var keys = ["goods_group", "coupon_code", "pin_code", "player_id"];
		var dvalues = [goodsGroup, couponCode, null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "goodsGroup", "verify") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Merchant redeems couple from player.
	 * @param  {String} goodsGroup goods group name.
	 * @param  {String} couponCode coupon code of goods to redeem
	 * @param  {Object} options    (**optional**) options as object.  
	 * It can include.  
	 * {  
	 * `pin_code`: *String* = merchant PIN code generated from admin dashboard  
	 * `player_id`: *String* = player id  
	 * }
	 * @return {Object}            Promise object
	 * @method redeemCoupon
	 * @memberOf Playbasis.merchantApi
	 */
	_api.redeemCoupon = function(goodsGroup, couponCode, options)
	{
		var postObj = { token: Playbasis.env.global.token, goods_group: goodsGroup, coupon_code: couponCode };
		var optionObj = helpers.createObjectFromTarget(options, ["pin_code", "player_id"]);
		var combinedObj = helpers.combineObjects(postObj, optionObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "goodsGroup", "redeem"), combinedObj);
	}

	/**
	 * Merchant redeems normal goods from player
	 * @param  {String} goodsName goods name
	 * @param  {String} playerId  player id
	 * @param  {Object} options   options as object. It can include  
	 * `amount`: *Number* = amount of goods to redeem from player (default = 1)  
	 * @return {Object}           Promise object
	 * @method  redeemGoods
	 * @memberOf  Playbasis.merchantApi
	 */
	_api.redeemGoods = function(goodsName, playerId, options)
	{
		var postObj = { token: Playbasis.env.global.token, goods_name: goodsName, player_id: playerId };
		var optionObj = helpers.createObjectFromTarget(options, ["amount"]);
		var combinedObj = helpers.combineObjects(postObj, optionObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "goods", "redeem"), combinedObj);
	}
}