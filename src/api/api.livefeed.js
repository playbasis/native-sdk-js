'use strict';

/**
 * Playbasis Livefeed API
 * @namespace Playbasis.livefeedApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// base api method url
	var apiMethodUrl = "Service";

	// global object
	var api = Playbasis.livefeedApi = {};

	/**
	 * Return recent activities.
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `player_id`: *String* = required when 'mode'='player',  
	 * `offset`: *Number* = index of record to start,  
	 * `limit`: *Number* = amount of records returned,  
	 * `last_read_activity_id`: *String* = last activity id that you have read,  
	 * `mode`: *String* = "all" | "player",  
	 * `event_type`: *String* = event type i.e. "reward", "redeem", "action", "level"  
	 * }
	 * @return {Object}         Promise object
	 * @method  recentActivities
	 * @memberOf Playbasis.livefeedApi
	 */
	api.recentActivities = function(options)
	{
		var keys = ["player_id", "offset", "limit", "last_read_activity_id", "mode", "event_type"];
		var dvalues = [null, 0, 20, null, "all", null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "recentActivities") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Get detail activity.
	 * @param  {String} activityId activity id
	 * @return {Object}            Promise object
	 * @method  detailActivity
	 * @memberOf Playbasis.livefeedApi
	 */
	api.detailActivity = function(activityId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "detailActivityFeed", activityId));
	}

	/**
	 * Like activity
	 * @param  {String} activityId activity id
	 * @param  {String} playerId   player id
	 * @return {Object}            Promise object
	 * @method  likeActivity
	 * @memberOf Playbasis.livefeedApi
	 */
	api.likeActivity = function(activityId, playerId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "likeActivityFeed", activityId), obj);
	}

	/**
	 * Comment acvitity
	 * @param  {String} activityId activity id
	 * @param  {String} playerId   player id
	 * @param  {String} message    message
	 * @return {Object}            Promise object
	 * @method  commentActivity
	 * @memberOf Playbasis.livefeedApi
	 */
	api.commentActivity = function(activityId, playerId, message)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, message: message };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "commentActivityFeed", activityId), obj);
	}
}