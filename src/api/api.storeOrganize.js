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

	/**
	 * Add player to specific node.
	 * @param {String} nodeId   node id to add player
	 * @param {String} playerId player id
	 * @return {Object} Promise object
	 * @method addPlayerToNode
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.addPlayerToNode = function(nodeId, playerId)
	{
		var obj = { token: Playbasis.env.global.token };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "addPlayer", playerId), obj);
	}

	/**
	 * Remove player from node.
	 * @param  {String} nodeId   node id to remove player from
	 * @param  {String} playerId player id
	 * @return {Object}          Promise object
	 * @method  removePlayerFromNode
	 * @memberOf  Playbasis.storeOrganizeApi
	 */
	api.removePlayerFromNode = function(nodeId, playerId)
	{
		var obj = { token: Playbasis.env.global.token };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "removePlayer", playerId), obj);
	}

	/**
	 * Set player's organization role to specific node.
	 * @param {String} nodeId   node id
	 * @param {String} playerId player id to set role
	 * @param {String} role     role name to set player's role
	 * @return {Object} Promise object
	 * @method  setPlayerRole
	 * @memberOf  Playbasis.storeOrganizeApi
	 */
	api.setPlayerRole = function(nodeId, playerId, role)
	{
		var obj = { token: Playbasis.env.global.token, role: role };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "setPlayerRole", playerId), obj);
	}

	/**
	 * Unset player's organization role from specific node.
	 * @param  {Strinh} nodeId   node id
	 * @param  {String} playerId player id to unset role from
	 * @param  {String} role     role name to unset player's role
	 * @return {Object}          Promise object
	 * @method  unsetPlayerRole
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.unsetPlayerRole = function(nodeId, playerId, role)
	{
		var obj = { token: Playbasis.env.global.token, role: role };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "unsetPlayerRole", playerId), obj);
	}

	/**
	 * Get player's list from specific node.
	 * @param  {String} nodeId  node id to get list of player from
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `role`: *String* = role name to query  
	 * }
	 * @return {Object}         Promise object
	 * @method  listPlayerFromNode
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.listPlayerFromNode = function(nodeId, options)
	{
		var keys = ["role"];
		var dvalues = [null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "players", nodeId) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Return leaderboard list for organization under given node id
	 * @param  {String} nodeId  node id to return leaderboard from
	 * @param  {String} rankBy  name of point-based reward to rank players by
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `page`: *Number* = select page to be reported, page 0 is the first page. Default is 0.  
	 * `limit`: *Number* = number of results to return. Default is 20.  
	 * `under_org`: *String* = "true" to return rank of organize under given node_id | "false" to rank associate with given node_id  
	 * `role`: *String* = role to be filtered  
	 * `player_id`: *String* = player id to return his/her own rank  
	 * `month`: *String* = month to rank players by which can be "01" | "02" | ... | "12"  
	 * `year`: *String* = year to rank players by i.e. "2015"  
	 * }
	 * @return {Object}         Promise object
	 * @method peerLeaderboard
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.peerLeaderboard = function(nodeId, rankBy, options)
	{
		var keys = ["page", "limit", "under_org", "role", "player_id", "month", "year"];
		var dvalues = [0, 20, "false", null, null, null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "rankPeer", nodeId, rankBy) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Return leaderboard list for organization under given node id ranking according to action name.
	 * @param  {String} nodeId    node id to return leaderboard from
	 * @param  {String} action    action name to rank players
	 * @param  {String} parameter name of parameter of action to rank players by
	 * @param  {Object} options   (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `page`: *Number* = select page to be reported, page 0 is the first page. Default is 0.  
	 * `limit`: *Number* = number of results to return. Default is 20.  
	 * `role`: *String* = role to be filtered  
	 * `player_id`: *String* = player id to return his/her own rank  
	 * `month`: *String* = month to rank players by which can be "01" | "02" | ... | "12"  
	 * `year`: *String* = year to rank players by i.e. "2015" 
	 * }
	 * @return {Object}           Promise object
	 * @method  peerLeaderboardByAction
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.peerLeaderboardByAction = function(nodeId, action, parameter, options)
	{
		var keys = ["role", "page", "limit", "player_id", "month", "year"];
		var dvalues = [null, 0, 20, null, null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "rankPeerByAccAction", nodeId, action, parameter) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Find all child nodes under specific node.
	 * @param  {String} nodeId node id to find child nodes
	 * @param  {Number} layer  layer of nodes under specific node to find. Set to 0 to find for all layers.
	 * @return {Object}        Promise object
	 * @method  findChildNodes
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.findChildNodes = function(nodeId, layer)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "getChildNode", layer));
	}

	/**
	 * Sale report of specific node in a month
	 * @param  {String} nodeId  node id to return sale report from
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `month`: *String* = month to get sale report ex. "01" | "02" | ... | "12". Default is current month.  
	 * `year`: *String* = year to get sale report ex. "2015"  
	 * `action`: *String* = action name to query from action log  
	 * `parameter`: *String* = parameter to report from action log  
	 * }
	 * @return {Object}         Promise object
	 * @method  saleReport
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.saleReport = function(nodeId, options)
	{
		var keys = ["month", "year", "action", "parameter"];
		var dvalues = [null, null, null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "saleReport") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Sale report of specific node.
	 * @param  {String} nodeId  node id to get sale report from
	 * @param  {Number} count   number of month to get report
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `month`: *String* = month to get sale report ex. "01" | "02" | ... | "12". Default is current month.  
	 * `year`: *String* = year to get sale report ex. "2015"  
	 * `action`: *String* = action name to query from action log  
	 * `parameter`: *String* = parameter to report from action log  
	 * }
	 * @return {Object}         Promise object
	 * @method  saleHistory
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.saleHistory = function(nodeId, count, options)
	{
		var keys = ["month", "year", "action", "parameter"];
		var dvalues = [null, null, null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "saleHistory", count) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Leaderboard by sale amount of all nodes under specific node.
	 * @param  {String} nodeId  node id to find child nodes
	 * @param  {Number} layer   layer of nodes under specific node to find. Set to 0 for finding all layers.
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `month`: *String* = month to get sale report ex. "01" | "02" | ... | "12". Default is current month.  
	 * `year`: *String* = year to get sale report ex. "2015"  
	 * `action`: *String* = action name to query from action log  
	 * `parameter`: *String* = parameter to report from action log  
	 * `page`: *Number* = select page to be reported, page 0 is the first page. Default is 0.  
	 * `limit`: *Number* = limit per page to be reported. Default is 20.  
	 * }
	 * @return {Object}         Promise object
	 * @method  saleBoard
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.saleBoard = function(nodeId, layer, options)
	{
		var keys = ["month", "year", "action", "parameter", "page", "limit"];
		var dvalues = [null, null, null, null, 0, 20];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "saleBoard", layer) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Add content to specific node
	 * @param {String} nodeId        node id
	 * @param {String} contentNodeId node id of content
	 * @return {Object} Promise object
	 * @method addContentToNode
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.addContentToNode = function(nodeId, contentNodeId)
	{
		var obj = { token: Playbasis.env.global.token };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "addContent", contentNodeId), obj);
	}

	/**
	 * Remove content from specific node
	 * @param {String} nodeId        node id
	 * @param {String} contentNodeId node id of content
	 * @return {Object} Promise object
	 * @method removeContentFromNode
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.removeContentFromNode = function(nodeId, contentNodeId)
	{
		var obj = { token: Playbasis.env.global.token };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "removeContent", contentNodeId), obj);
	}

	/**
	 * Set content's organization role to specific node.
	 * @param {String} nodeId        node id to set role
	 * @param {String} contentNodeId node id of content
	 * @param {String} role          role to set to content
	 * @return {Object} Promise object
	 * @method  setContentRole
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.setContentRole = function(nodeId, contentNodeId, role)
	{
		var obj = { token: Playbasis.env.global.token, role: role };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "setContentRole", contentNodeId), obj); 
	}

	/**
	 * Unset content's organization role to specific node.
	 * @param {String} nodeId        node id to set role
	 * @param {String} contentNodeId node id of content
	 * @param {String} role          role to set to content
	 * @return {Object} Promise object
	 * @method  unsetContentRole
	 * @memberOf Playbasis.storeOrganizeApi
	 */
	api.unsetContentRole = function(nodeId, contentNodeId, role)
	{
		var obj = { token: Playbasis.env.global.token, role: role };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "nodes", nodeId, "unsetContentRole", contentNodeId), obj);
	}
}