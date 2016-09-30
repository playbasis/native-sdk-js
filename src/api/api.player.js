'use strict';

/**
 * Player Api
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

	_api.playerPublicInfo = function(playerId, callback) 
	{	
		http.getJson(helpers.createApiUrl(apiMethod, playerId), 
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.playerInfo = function(playerId, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, playerId), {token : Playbasis.env.global.token},
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.listPlayer = function(playerIdArray, callback)
	{
		helpers.throwIfNoToken();

		var playerIds = playerIdArray.join(",");

		http.postJson(helpers.createApiUrl(apiMethod, "list"), {token : Playbasis.env.global.token, list_player_id : playerIds},
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	}

	_api.playerDetailedPublicInfo = function(playerId, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "data", "all"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.playerDetailedInfo = function(playerId, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, playerId, "data", "all"), {token : Playbasis.env.global.token},
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.listCustomFieldsOfPlayer = function(playerId, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "custom"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.setCustomFieldOfPlayer = function(playerId, key, value, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, playerId, "custom"), {token : Playbasis.env.global.token, key : key, value : value}, 
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	// options is the less of information used to register player
	_api.register = function(playerId, email, callback, options)
	{
		helpers.throwIfNoToken();

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

		http.postJson(helpers.createApiUrl(apiMethod, playerId, "register"), obj,
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.update = function(playerId, updates, callback)
	{
		helpers.throwIfNoToken();

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

		http.postJson(helpers.createApiUrl(apiMethod, playerId, "update"), obj,
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.verifyPlayerEmail = function(playerId, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, playerId, "email", "verify"), {token : Playbasis.env.global.token},
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.delete = function(playerId, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, playerId, "delete"), {token : Playbasis.env.global.token}, 
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.login = function(playerId, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, playerId, "login"), {token : Playbasis.env.global.token},
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.requestOTP = function(playerId, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, "auth", playerId, "requestOTPCode"), {token : Playbasis.env.global.token},
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.requestOTPforSetupPhone = function(playerId, phoneNumber, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, "auth", playerId, "setupPhone"), {token : Playbasis.env.global.token, phone_number : phoneNumber},
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.performOTPVerification = function(playerId, OTPcode, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, "auth", playerId, "verifyOTPCode"), {token : Playbasis.env.global.token, code : OTPcode},
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.logout = function(playerId, callback)
	{
		helpers.throwIfNoToken();

		http.postJson(helpers.createApiUrl(apiMethod, playerId, "logout"), {token : Playbasis.env.global.token}, 
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.listActivePlayerSessions = function(playerId, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "sessions"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.findPlayerBySession = function(sessionId, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, "session", sessionId),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.points = function(playerId, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "points"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.point = function(playerId, pointName, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "point", pointName),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.pointHistory = function(playerId, callback, options)
	{
		var paramsString = helpers.joinParams(options);

		http.getJson(helpers.createApiUrl(apiMethod, playerId, "point_history") + "&" + paramsString,
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.actionTime = function(playerId, actionName, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "action", actionName, "time"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.lastAction = function(playerId, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "action", "time"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.actionCount = function(playerId, actionName, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "action", actionName, "count"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.level = function(level, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, "level", level),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.levels = function(callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, "levels"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	/* Return information about all the badges that a player has earned. */
	_api.badge = function(playerId, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "badge"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	_api.allBadges = function(playerId, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, playerId, "badgeAll"),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	/* Return the list of players sorted by the specified point type. */
	_api.rank = function(rankBy, callback, options) {

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

		http.getJson(helpers.createApiUrl(apiMethod, "rank", rankBy, limit) + "&mode=" + mode,
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	/**
	 * Return list of players sorted by each point type.
	 * @param  {number}   limit    limit number of players returned in the list
	 * @param  {function} callback Callback function
	 * @param  {object}   options  Options. It can be mode="weekly", "monthly", or "all-time"
	 * @method  ranks
	 * @memberof Playbasis.playerApi
	 */	
	_api.ranks = function(limit, callback, options)
	{
		// default is all-time
		var mode = "all-time";

		// check if need to apply options
		if (options != null) {
			if (options.mode != null) {
				mode = options.mode;
			}
		}

		http.getJson(helpers.createApiUrl(apiMethod, "ranks", limit) + "&mode=" + mode,
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	/**
	 * Returns information about all the goods list that a player has redeem.
	 * @param  {string}   playerId player id
	 * @param  {function} callback callback function
	 * @param  {object}   options  options which can be tags={#string}, status={"all", "active", "expired", "used"}. This parameter can be ignored, or just set null.
	 * @method goods
	 * @memberof Playbasis.playerApi
	 */
	_api.goods = function(playerId, callback, options)
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

		http.getJson(helpers.createApiUrl(apiMethod, playerId, "goods") + "&" + helpers.joinIfNotNullAsUrlParam("tags", tags, "status", status),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	/**
	 * Return information about the specified quest that player has joined.
	 * @param  {string}   playerId player id
	 * @param {string} questId quest id that playered has joined, to get information from
	 * @param  {function} callback callback function
	 * @method  questOfPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.questOfPlayer = function(playerId, questId, callback)
	{
		http.getJson(helpers.createApiUrl(apiMethod, "quest", questId) + "&player_id=" + playerId,
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	};

	/**
	 * Return list of quests that player has joined.
	 * @param  {string}   playerId player id
	 * @param  {function} callback callback function
	 * @param  {object}   options  (optional) options which can be {tags:#string}
	 * @method questListOfPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.questListOfPlayer = function(playerId, callback, options)
	{
		// default value for options
		var tags = null;

		if (options != null) {
			if (options.tags != null) {
				tags = options.tags;
			}
		}

		http.getJson(helpers.createApiUrl(apiMethod, "quest") + "&" + helpers.joinIfNotNullAsUrlParam("player_id", playerId, "tags", tags),
			function(status, result) {
				helpers.forwardApiCallback(callback, status, result);
			}
		);
	}
}