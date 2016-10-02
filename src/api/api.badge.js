'use strict';

/**
 * Playbasis Badge API
 * @namespace Playbasis.badgeApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// global object
	var api = Playbasis.badgeApi = {}

	/**
	 * Returns information about all available badges from the current site.
	 * @param  {object} options (optional) options as object. It can include { tags: #string = tag string which can be multiple items joined via comma}
	 * @return {object}         promise object
	 * @memberOf  Playbasis.badgeApi
	 */
	api.badgesInfo = function(options)
	{
		// set default optoins
		var tags = null;

		if (options != null) {
			if (options.tags != null) {
				tags = options.tags;
			}
		}
		return http.getJsonAsync(helpers.createApiUrl("Badges") + "&" + helpers.joinIfNotNullAsUrlParam("tags", tags));
	}

	/**
	 * Returns information about the badge with the specified badge id.
	 * @param  {string} badgeId badge id to get information from
	 * @return {object}         promise object
	 */
	api.badgeInfo = function(badgeId)
	{
		return http.getJsonAsync(helpers.createApiUrl("Badge", badgeId));
	}
}