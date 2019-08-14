'use strict';

/**
 * Playbasis Quest API
 * @namespace Playbasis.questApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// api base url
	var apiMethod = "Quest";

	// global object
	var api = Playbasis.questApi = {};

	/**
	 * Return information about all quest for the current site.
	 * @param  {Object} options (**optional**) options as object.
	 * It can include
	 * {
	 * `tags`: *String* = tag to query separated by comma
	 * }
	 * @return {Object}         Promise object
	 * @method  questListInfo
	 * @memberOf Playbasis.questApi
	 */
	api.questListInfo = function(options)
	{
		var keys = ["tags"];
		var dvalues = [null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Return information about the quest with the specified id.
	 * @param  {String} questId quest id
	 * @return {Object}         Promise object
	 * @method  questInfo
	 * @memberOf Playbasis.questApi
	 */
	api.questInfo = function(questId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, questId));
	}

	/**
	 * Return information about the mission with the specified id.
	 * @param  {String} questId   quest id
	 * @param  {String} missionId mission id
	 * @return {Object}
	 * @method  missionInfo
	 * @memberOf Playbasis.questApi
	 */
	api.missionInfo = function(questId, missionId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, questId, "mission", missionId));
	}

	/**
	 * Return information about list of quest which is available for player.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise object
	 * @method  questListAvailableForPlayer
	 * @memberOf Playbasis.questApi
	 */
	api.questListAvailableForPlayer = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "available") + helpers.appendAndJoinIfNotNullAsUrlParam("player_id", playerId))
	}

	/**
	 * Return information about the quest which is available for player.
	 * @param  {String} questId  quest id
	 * @param  {String} playerId player id
	 * @return {Object}          Promise object
	 * @method  questAvailableForPlayer
	 * @memberOf Playbasis.questApi
	 */
	api.questAvailableForPlayer = function(questId, playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, questId, "available") + helpers.appendAndJoinIfNotNullAsUrlParam("player_id", playerId));
	}

	/**
	 * Join quest for player.
	 * @param  {String} questId  quest id
	 * @param  {String} playerId player id
	 * @return {Object}          Promise object
	 * @method  joinQuest
	 * @memberOf Playbasis.questApi
	 */
	api.joinQuest = function(questId, playerId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId };

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, questId, "join"), obj);
	}

	/**
	 * Join all quests for player
	 * @param  {String} playerId player id
	 * @return {Object}          Promise object
	 * @method  joinAllQuests
	 * @memberOf Playbasis.questApi
	 */
	api.joinAllQuests = function(playerId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId };

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "joinAll"), obj);
	}

	/**
	 * Cancel an already joined quest for player
	 * @param  {String} questId  quest id
	 * @param  {String} playerId player id
	 * @return {Object}          Promise object
	 * @method  cancelQuest
	 * @memberOf Playbasis.questApi
	 */
	api.cancelQuest = function(questId, playerId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId };

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, questId, "cancel"), obj);
	}

	/**
	 * Reset progress of quests for player.
	 * If options is null, then it will reset all progress for all quests that player has joined.
	 * @param  {String} playerId player id
	 * @param  {Object} options  (**optional**) options as object.
	 * It can include
	 * {
	 * `quest_id`: *String* = quest id to reset progress
	 * }
	 * @return {Object}          Promise object
	 * @method  resetQuest
	 * @memberOf Playbasis.questApi
	 */
	api.resetQuest = function(playerId, options)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId };
		var selectedOptionsObj = helpers.createObjectFromTarget(options, ["quest_id"]);
		var combinedObj = helpers.combineObjects(obj, selectedOptionsObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "reset"), combinedObj);
	}

	/**
	 * Return quest leaderboard
	 * @param  {String} questId quest id
	 * @param  {Object} options (**optional**) options as object.
	 * It can include
	 * {
	 * `completion_element_id`: *String* = quest complete element id,
	 * `player_id`: *String* = player id,
	 * `offset`: *Number* = number of records starting,
	 * `limit`: *Number* = amount of results to return,
	 * `status`: *String* = status of quest which can be "finish" | "join", default is "all"
	 * }
	 * @return {Object}         Promise object
	 * @method  questLeaderboard
	 * @memberOf Playbasis.questLeaderboard
	 */
	api.questLeaderboard = function(questId, options)
	{
		var keys = ["quest_id", "completion_element_id", "player_id", "offset", "limit", "status"];
		var dvalues = [questId, null, null, 0, 20, "all"];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "leader") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}
}