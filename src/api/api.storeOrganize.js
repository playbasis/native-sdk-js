'use strict';

/**
 * Playbasis Store Organize API
 * @namespace Playbasis.storeOrganizeApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// base api method url
	var apiMethodUrl = "StoreOrg";

	// global object
	var api = Playbasis.storeOrganizeApi = {};

	/**
	 * List organizations as set from admin dashboard.
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `id`: *String* = organize id to retrieve,  
	 * `search`: *String* = organize name to search,  
	 * `sort`: *String* = field to be sorted "name" | "status" | "description" | "date_added" | "date_modified",  
	 * `order`: *String* = "asc" | "desc",  
	 * `offset`: *Number* = offset of returned records,  
	 * `limit`: *Number* = number of returned records  
	 * }
	 * @return {Object}         Promise object
	 * @method  listOrganizations
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.listOrganizations = function(options)
	{
		var keys = ["id", "search", "sort", "order", "offset", "limit"];
		var dvalues = [null, null, "name", "asc", 0, 20];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "organizes") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * List nodes as set from admin dashboard.
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `id`: *String* = node id to retrieve,  
	 * `organize_id`: *String* = organize id,  
	 * `search`: *String* = organize name to search,  
	 * `sort`: *String* = field to be sorted "name" | "status" | "description" | "date_added" | "date_modified",  
	 * `order`: *String* = "asc" | "desc",  
	 * `offset`: *Number* = offset of returned records,  
	 * `limit`: *Number* = number of returned records  
	 * }
	 * @return {Object}         Promise object
	 * @method  listNodes
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.listNodes = function(options)
	{
		var keys = ["id", "organize_id", "parent_id", "search", "sort", "order", "offset", "limit"];
		var dvalues = [null, null, null, null, "name", "asc", 0, 20];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}
}