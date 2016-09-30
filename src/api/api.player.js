'use strict';

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
	}
}