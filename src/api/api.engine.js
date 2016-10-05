'use strict';

/**
 * Playbasis Engine API
 * @namespace Playbasis.engineApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// api base url
	var apiMethod = "Engine";

	// global object
	var api = Playbasis.engineApi = {};

	/**
	 * Return list of active game rules defined for client's website.
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `action`: *String* = name of action performed,  
	 * `player_id`: *String* = player id as used in client's website  
	 * }
	 * @return {Object}         Promise object
	 * @method listRules
	 * @memberOf Playbasis.engineApi
	 */
	api.listRules = function(options)
	{
		var keys = ["action", "player_id"];
		var dvalues = [null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "rules") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Get the detail of rule.
	 * @param  {String} ruleId  rule id
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `player_id`: *String* = player id as used in client's website  
	 * }
	 * @return {Object}         Promise object
	 * @method listRules
	 * @memberOf Playbasis.engineApi
	 */
	api.ruleDetail = function(ruleId, options)
	{
		var keys = ["player_id"];
		var dvalues = [null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "rule", ruleId) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Process an action through all the game rules defined for a client's website.
	 * @param  {String} action   name of action performed
	 * @param  {String} playerId player id
	 * @param  {Object} options  (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `url`: *String* = URL of the page that trigger the action or any identifier string - Used for logging or URL specific rules and rules that trigger only when a specific identifier string is supplied,  
	 * `reward`: *String* = name of point-based reward to give to player - if the action trigger custom-point reward that doesn't specify reward name,  
	 * `quantity`: *Number* = amount of point-based reward to give to player,  
	 * `rule_id`: *String* = if needed then you can specifiy a rule id so that rule engine will only process against that rull,  
	 * `node_id`: *String* = if needed then you can also specify a node id so that rule engine will process with that rule,  
	 * `session_id`: *String* = you can specify a session id to extend expire session time for player  
	 * }
	 * @return {Object}          Promise object
	 * @method rule
	 * @memberOf Playbasis.engineApi
	 */
	api.rule = function(action, playerId, options)
	{
		var obj = { token: Playbasis.env.global.token, action: action, player_id: playerId };
		var selectedOptionsObj = helpers.createObjectFromTarget(options, ["url", "reward", "quantity", "rule_id", "node_id", "session_id"]);
		var combinedObj = helpers.combineObjects(obj, selectedOptionsObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "rule"), combinedObj);
	}
}