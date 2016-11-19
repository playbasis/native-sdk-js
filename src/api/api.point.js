'use strict';

/**
 * Playbasis Point API
 * @namespace Playbasis.pointApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// api base url
	var apiMethod = "Point";

	// global object
	var api = Playbasis.pointApi = {};

	/**
	 * Return list of custom points' status. So user can review, approve or reject them later one by one.
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `player_list`: *String* = list of player delimitted by comma i.e. john,max,robert    
	 * `status`: *String* = status of custom point to include in the returned list. It can be "all" | "approve" | "pending" | "reject".    
	 * `from`: *String* = starting date of custom point in format YYYY-MM-DD (i.e. 1982-09-29)    
	 * `to`: *String* = ending date of custom point in format YYYY-MM-DD (i.e. 1982-09-29)  
	 * `offset`: *String* = paging offset, The start of item to returned in index-based. Default is 0.  
	 * `limit`: *Number* = paging limit. Default is 20.  
	 * }
	 * @return {Object}         Promise object
	 * @method  listCustomStatus
	 * @memberOf Playbasis.pointApi
	 */
	api.listCustomStatus = function(options)
	{
		var keys = ["player_list", "status", "from", "to", "offset", "limit"];
		var defaultValues = [null, null, null, null, "0", "20"];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "custom", "list") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, defaultValues, options));
	}

	/**
	 * Retrieve transaction information of custom point.
	 * @param  {String} txnId transaction id
	 * @return {Object}       Promise object
	 * @method retrieveTransactionCustomPoint
	 * @memberOf Playbasis.pointApi
	 */
	api.retrieveTransactionCustomPoint = function(txnId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "custom", "transaction") + helpers.appendAndJoinIfNotNullAsUrlParam("transaction_id", txnId));
	}

	/**
	 * Approve or reject custom point for bulk of transactions ids. If not specify `approve` in options parameter, then it will try to approve them.
	 * @param  {String} txnList list of transaction id of custom point delimited by comma i.e. xxxx,xxxx,xxxx
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `approve`: *String* = approve status. It can be "true" | "false". Default is "true".  
	 * }
	 * @return {Object}         Promise object
	 * @method  approveTransactionCustomPoint
	 * @memberOf  Playbasis.pointApi
	 */
	api.approveTransactionCustomPoint = function(txnList, options)
	{
		var obj = { token: Playbasis.env.global.token, transaction_list: txnList, approve: "true"};

		// if need to override approve value
		if (options != null) {
			if (options.approve != null) {
				obj.approve = options.approve;
			}
		}

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "custom", "approval"), obj);
	}

	/**
	 * Retrieve remaining for point-based name.
	 * @param  {Object} options		(**optional**) options as object.  
	 * It can include  
	 * {  
	 * `name`: *String* = name of point-based to get remaining from  
	 * }
	 * @return {Object}           Promise object
	 * @method  retrieveRemainingPoints
	 * @memberOf  Playbasis.pointApi
	 */
	api.retrieveRemainingPoints = function(options)
	{
		var keys = ["name"];
		var defaultValues = [null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "custom", "remaining") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, defaultValues, options));
	}
}