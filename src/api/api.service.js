'use strict';

/**
 * Playbasis Service API
 * @namespace Playbasis.serviceApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// base api method url
	var apiMethodUrl = "Service";

	// global object
	var api = Playbasis.serviceApi = {};

	/**
	 * Return recent points
	 * @param  {Object} options (optional) options as object. It can include { point_name: #string = name of point-based reward to query, offset: #number = offset of return records; default is 0, limit: #number = number of returned records; default is 20 }
	 * @return {Object}         Promise object
	 * @method  recentPoint
	 * @memberOf Playbasis.serviceApi
	 */
	api.recentPoint = function(options)
	{
		var keys = ["point_name", "offset", "limit"];
		var dvalues = [null, 0, 20];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "recent_point") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Reset point of all players
	 * @param  {String} pointName name of point-based reward
	 * @return {Object}           Promise object
	 * @method  resetPoint
	 * @memberOf  Playbasis.resetPoint
	 */
	api.resetPoint = function(pointName)
	{
		var obj = { token: Playbasis.env.global.token, point_name: pointName };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "reset_point"), obj);
	}
}