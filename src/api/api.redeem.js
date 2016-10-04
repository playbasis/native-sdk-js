'use strict';

/**
 * Playbasis Redeem API
 * @namespace Playbasis.redeemApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// api base url
	var apiMethod = "Redeem";

	// global object
	var api = Playbasis.redeemApi = {};

	/**
	 * Redeem goods for player.
	 * @param  {String} goodsId  goods id
	 * @param  {String} playerId player id
	 * @param  {Object} options  (optional) options as object. It can include { amount: #number = amount of goods to give to player }
	 * @return {Object}          Promise object
	 * @method redeem
	 * @memberof Playbasis.redeemApi
	 */
	api.redeem = function(goodsId, playerId, options)
	{
		var obj = { token: Playbasis.env.global.token, goods_id: goodsId, player_id: playerId };
		var selectedOptionsObj = helpers.createObjectFromTarget(options, ["amount"]);
		var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "goods"), combineObj);
	}

	/**
	 * Redeem Goods from given group.
	 * @param  {[type]} playerId [description]
	 * @param  {[type]} group    [description]
	 * @param  {[type]} options  [description]
	 * @return {[type]}          [description]
	 * @method  redeemGoodsGroup
	 * @memberOf Playbasis.redeemApi
	 */
	api.redeemGoodsGroup = function(playerId, group, options)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, group: group };
		var selectedOptionsObj = helpers.createObjectFromTarget(options, ["amount"]);
		var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "goodsGroup"), combineObj);
	}

	/**
	 * Redeem verification for merchant using PIN code.
	 * @param  {String} goodsGroup goods group
	 * @param  {String} couponCode coupon code
	 * @param  {String} pinCode    pin code
	 * @return {Object}            Promise object
	 * @method  redeemVerify
	 * @memberOf Playbasis.redeemApi
	 */
	api.redeemVerify = function(goodsGroup, couponCode, pinCode)
	{
		var obj = { token: Playbasis.env.global.token, goods_group: goodsGroup, coupon_code: couponCode, pin_code: pinCode };

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "goodsGroup", "verify"), obj);
	}

	/**
	 * Redeem sponsored Goods for player.
	 * @param  {String} goodsId  goods id
	 * @param  {String} playerId player id
	 * @param  {Object} options  (optional) options as object. It can include { amount: #number = amount of goods to give to player }
	 * @return {Object}          Promise object
	 * @method  redeemSponsor
	 * @memberOf  Playbasis.redeemApi
	 */
	api.redeemSponsor = function(goodsId, playerId, options)
	{
		var obj = { token: Playbasis.env.global.token, goods_id: goodsId, player_id: playerId };
		var selectedOptionsObj = helpers.createObjectFromTarget(options, ["amount"]);
		var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "sponsor"), combineObj);
	}

	/**
	 * Redeem sponsored goods given goods group.
	 * @param  {String} playerId player id
	 * @param  {String} group    goods group
	 * @param  {Object} options  (optional) options as object. It can include { amount: #number = amount of goods to give to player }
	 * @return {Object}          Promise object
	 * @method redeemSponsoredGoodsGroup
	 * @memberOf Playbasis.redeemApi
	 */
	api.redeemSponsoredGoodsGroup = function(playerId, group, options)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, group: group };
		var selectedOptionsObj = helpers.createObjectFromTarget(options, ["amount"]);
		var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "sponsorGroup"), combineObj);
	}
}