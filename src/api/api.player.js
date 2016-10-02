'use strict';

/**
 * Player Player API
 * @namespace Playbasis.playerApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// base url method
	var apiMethod = "Player";

	// global object
	var _api = Playbasis.playerApi = {}

	_api.playerPublicInfo = function(playerId) 
	{	
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId));
	};

	_api.playerInfo = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId), {token : Playbasis.env.global.token});
	};

	_api.listPlayer = function(playerIdArray)
	{
		var playerIds = playerIdArray.join(",");

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "list"), {token : Playbasis.env.global.token, list_player_id : playerIds});
	}

	_api.playerDetailedPublicInfo = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "data", "all"));
	};

	_api.playerDetailedInfo = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "data", "all"), {token : Playbasis.env.global.token});
	};

	_api.listCustomFieldsOfPlayer = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "custom"));
	};

	_api.setCustomFieldOfPlayer = function(playerId, key, value)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "custom"), {token : Playbasis.env.global.token, key : key, value : value});
	};

	/**
	 * Register player
	 * @param  {string} playerId player id
	 * @param  {string} email    email to register player with
	 * @param  {string} options  (optional) option as object, consult Playbasis's API explorer for all possible key-value options
	 * @return {object}          Promise object
	 * @memberOf Playbasis.playerApi
	 */
	_api.register = function(playerId, email, options)
	{
		// create post object with required info
		var obj = {token : Playbasis.env.global.token, username : playerId, email : email};

		// add more info from options
		if (options != null) {
			for (var k in options) {
				// avoid override required values
				if (k != "token" &&
					k != "username" &&
					k != "email") {
					obj[k] = options[k];
				}
			}
		}

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "register"), obj);
	};

	_api.update = function(playerId, updates)
	{
		// create post object with required info
		var obj = {token : Playbasis.env.global.token};

		// add more info from updates
		if (updates != null) {
			for (var k in updates) {
				// avoid override required values
				if (k != "token") {
					obj[k] = updates[k];
				}
			}
		}

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "update"), obj);
	};

	_api.verifyPlayerEmail = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "email", "verify"), {token : Playbasis.env.global.token});
	};

	_api.delete = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "delete"), {token : Playbasis.env.global.token});
	};

	_api.login = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "login"), {token : Playbasis.env.global.token});
	};

	_api.requestOTP = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "auth", playerId, "requestOTPCode"), {token : Playbasis.env.global.token});
	};

	_api.requestOTPforSetupPhone = function(playerId, phoneNumber)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "auth", playerId, "setupPhone"), {token : Playbasis.env.global.token, phone_number : phoneNumber});
	};

	_api.performOTPVerification = function(playerId, OTPcode)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "auth", playerId, "verifyOTPCode"), {token : Playbasis.env.global.token, code : OTPcode});
	};

	_api.logout = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "logout"), {token : Playbasis.env.global.token});
	};

	_api.listActivePlayerSessions = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "sessions"));
	};

	_api.findPlayerBySession = function(sessionId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "session", sessionId));
	};

	_api.points = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "points"));
	};

	_api.point = function(playerId, pointName)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "point", pointName));
	};

	/**
	 * Returns history points of player
	 * @param  {string} playerId player id
	 * @param  {object} options  (optional) options as object. It can include { point_name: "point" | "exp" | ..., offset: #number, limit: #number, order: "desc" | "asc" }
	 * @return {object}          promise object
	 */
	_api.pointHistory = function(playerId, options)
	{
		// will get empty stirng if options is null
		var paramsString = helpers.joinParams(options);

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "point_history") + "&" + paramsString);
	};

	_api.actionTime = function(playerId, actionName)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "action", actionName, "time"));
	};

	_api.lastAction = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "action", "time"));
	};

	_api.actionCount = function(playerId, actionName)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "action", actionName, "count"));
	};

	_api.level = function(level)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "level", level));
	};

	_api.levels = function()
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "levels"));
	};

	/* Return information about all the badges that a player has earned. */
	_api.badge = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "badge"));
	};

	_api.allBadges = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "badgeAll"));
	};

	/* Return the list of players sorted by the specified point type. */
	/**
	 * Return the list of players sorted by the specified point type.
	 * @param  {string} rankBy  point-based name to rank by ("exp" | "point", etc)
	 * @param  {object} options (optional) options as object { limit: #number, mode: "all-time" | "weekly" | "monthly" }.
	 * @return {object}         Promise object
	 * @method  rank
	 * @memberof Playbasis.playerApi
	 */
	_api.rank = function(rankBy, options) {

		var limit = 20;
		var mode = "all-time";

		if (options != null) {
			if (options.limit != null)
				limit = options.limit;

			if (options.mode != null && 
				(options.mode == "weekly" ||
				 options.mode == "monthly" ||
				 options.mode == "all-time")
				)
				mode = options.mode;
		}

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "rank", rankBy, limit) + "&mode=" + mode);
	};

	/**
	 * Return list of players sorted by each point type.
	 * @param  {number}   limit    limit number of players returned in the list
	 * @param  {object}   options  (optional) option as object. It can include { mode: "all-time" | "weekly" | "monthly" }.
	 * @method  ranks
	 * @memberof Playbasis.playerApi
	 */	
	_api.ranks = function(limit, options)
	{
		// default is all-time
		var mode = "all-time";

		// check if need to apply options
		if (options != null) {
			if (options.mode != null) {
				mode = options.mode;
			}
		}

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "ranks", limit) + "&mode=" + mode);
	};

	/**
	 * Returns information about all the goods list that a player has redeem.
	 * @param  {string}   playerId player id
	 * @param  {object}   options  (optional) options as object. It can include { tags: #string, status: "all" | "active" | "expired" | "used" }.
	 * @method goods
	 * @memberof Playbasis.playerApi
	 */
	_api.goods = function(playerId, options)
	{
		// defaults options
		var tags = null;
		var status = "active";

		// check if need to apply options to request
		if (options != null) {
			if (options.tags != null) {
				tags = options.tags;
			}

			if (options.status != null &&
				(options.status == "active" ||
				 options.status == "expired" ||
				 options.status == "used" ||
				 options.status == "all")) {
				status = options.status;
			}
		}

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "goods") + "&" + helpers.joinIfNotNullAsUrlParam("tags", tags, "status", status));
	};

	/**
	 * Return information about the specified quest that player has joined.
	 * @param  {string}   playerId player id
	 * @param {string} questId quest id that playered has joined, to get information from
	 * @method  questOfPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.questOfPlayer = function(playerId, questId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "quest", questId) + "&player_id=" + playerId);
	};

	/**
	 * Return list of quests that player has joined.
	 * @param  {string}   playerId player id
	 * @param  {object}   options  (optional) options as object. It can include { tags: #string }.
	 * @method questListOfPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.questListOfPlayer = function(playerId, options)
	{
		// default value for options
		var tags = null;

		if (options != null) {
			if (options.tags != null) {
				tags = options.tags;
			}
		}

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "quest") + "&" + helpers.joinIfNotNullAsUrlParam("player_id", playerId, "tags", tags));
	}
}