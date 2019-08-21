'use strict';

/**
 * Playbasis Content Organize API
 * @namespace Playbasis.contentApi
 */
module.exports = function(Playbasis) {

    // utilize
    var http = Playbasis.http;
    var helpers = Playbasis.helpers;

    // base api method url
    var apiMethodUrl = "Content";

    // global object
    var api = Playbasis.contentApi = {};

    /**
     * Retrieve content(s) by specified filter fields
     * @param  {Object} options (**optional**) options as object.  
     * It can include  
     * {  
     * `node_id`: *String* = filter by node id of content  
     * `title`: *String* = filter title of content  
     * `category`: *String* = filter by category of content  
     * `date_check`: *String = "true" | "false" whether or not to return content that is available in this range  
     * `sort`: *String* = field to sort. It can be "title" | "date_start" | "date_end" | "date_added" | "date_modified" | "random" | "followup" | "action"  
     * `order`: *String* = direction of order results which can be "asc" | "desc". If sort is "random", then this field will be seed number.  
     * `offset`: *Number* = offset of starting returned records. Default is 0.  
     * `limit`: *Number* = Number of results to return. Default is 20.  
     * `full_html`: *String* = "true" | "false" whether or not to return full html  
     * `pin`: *String* = secret PIN given to content  
     * `tags: *String* = tags to filter content  
     * `status`: *String* = filter by status of content to find. Possible values are "true" | "false" | "all". Default value is "true".  
     * `player_id`: *String* = filter by player id associated with content  
     * `only_new_content`: *String* = "true" to display content which player does not provide any action (like/dislike) yet | "false" to display content which player has already provided an action (like/dislike)  
     * `only_new_feedback`: *String* = "true" to display content which player does not give feedback yet | "false" to display content which player has given the feedback  
     * }
     * @return {Object}         Promise object
     * @method  retrieveContent
     * @memberOf Playbasis.contentApi
     */
    api.retrieveContent = function(options) {
        var keys = ["node_id", "title", "category", "date_check", "sort", "order", "offset", "limit", "full_html", "pin", "tags", "status", "player_id", "only_new_content", "only_new_feedback"];
        var dvalues = [null, null, null, "true", "title", "asc", 0, 20, "false", null, null, null, null, null, null];

        return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
		}
		
		api.retrieveGameSetting = function(options) {
			var keys = ["node_id", "title", "category", "date_check", "sort", "order", "offset", "limit", "full_html", "pin", "tags", "status", "player_id", "only_new_content", "only_new_feedback"];
			var dvalues = [null, null, null, "true", "title", "asc", 0, 20, "false", null, null, null, null, null, null];

			function parseGameSettingConfig(data) {
				if (data.success) {
						const csv = data.response.result[0].summary
						const csvText = csv.split('\n')
						var obj = {}
						csvText.forEach((cell) => {
								const kv = cell.split('>')
								const varName = kv[0].trim()
								const varValue = kv[1].trim()
								if (varValue == 'true' || varValue == 'false') {
										obj[varName] = (varValue == 'true' ? true : false)
								} else {
										if (isNaN(varValue)) {
												obj[varName] = varValue
										} else {
												obj[varName] = Number(varValue)
										}
								}
						})
						return obj
				} else {
						return {}
				}
			}

			return new Playbasis.Promise( (resolve, reject) => {
				http
				.getJsonAsync(helpers.createApiUrl(apiMethodUrl) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options))
				.then((data) => {
					resolve(parseGameSettingConfig(data))
				})
				.catch(reject)
			})
			
		}

    /**
     * Count content(s) by specified filter fields.
     * @param  {Object} options (**optional**) options as object.  
     * It can include  
     * {  
     * `title`: *String* = filter title of content  
     * `category`: *String* = filter by category of content  
     * `date_check`: *String = "true" | "false" whether or not to return content that is available in this range  
     * `pin`: *String* = secret PIN given to content  
     * `tags: *String* = tags to filter content  
     * `status`: *String* = filter by status of content to find. Possible values are "true" | "false" | "all". Default value is "true".  
     * `player_id`: *String* = filter by player id associated with content  
     * `only_new_content`: *String* = "true" to display content which player does not provide any action (like/dislike) yet | "false" to display content which player has already provided an action (like/dislike)  
     * `only_new_feedback`: *String* = "true" to display content which player does not give feedback yet | "false" to display content which player has given the feedback  
     * }
     * @return {Object}         Promise object
     * @method  countContent
     * @memberOf  Playbasis.contentApi
     */
    api.countContent = function(options) {
        var keys = ["title", "category", "date_check", "pin", "tags", "status", "player_id", "only_new_content", "only_new_feedback"];
        var dvalues = [null, null, "false", null, null, null, null, null, null, null];

        return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "count") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
    }

    /**
     * Create content.
     * @param {String} title title of content
     * @param {String} summary summary of content
     * @param {String} detail detail of content
     * @param  {Object} options (**optional**) options as object.  
     * It can include  
     * {  
     * `node_id`: *String* = node id of content  
     * `category`: *String* = category of content to be in  
     * `image`: *String* = url to the content profile image  
     * `status`: *String* = content available status which can be "true" | "false"  
     * `date_start`: *String* = date start in format YYYY-MM-DD (ex.1982-09-29)  
     * `date_end`: *String* = date end in format YYYY-MM-DD (ex.1982-09-29)
     * `player_id`: *String* = player id who generated this content  
     * `pin`: *String* = secret PIN given to content  
     * `tags: *String* = tag(s) to add to this content  
     * `key`: *String* = custom keys separated by comma  
     * `value`: *String* = custom values separated by comma  
     * }
     * @return {Object}         Promise object
     * @method  createContent
     * @memberOf  Playbasis.contentApi
     */
    api.createContent = function(title, summary, detail, options) {
        var obj = { token: Playbasis.env.global.token, title: title, summary: summary, detail: detail };
        var selectedOptionsObj = helpers.createObjectFromTarget(options, ["node_id", "category", "image", "status", "date_start", "date_end", "player_id", "pin", "tags", "key", "value"]);
        var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

        return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "addContent"), combineObj);
    }

    /**
     * Update content by content id
     * @param  {String} nodeId  node id of content
     * @param  {Object} updates updates as object.  
     * It can include  
     * {  
     * `title`: *String* = title of content  
     * `summary`: *String* = summary of content  
     * `detail`: *String* = detail of content  
     * `category`: *String* = category of content to be in  
     * `image`: *String* = url to the content profile image  
     * `status`: *String* = content available status which can be "true" | "false"  
     * `date_start`: *String* = date start in format YYYY-MM-DD (ex.1982-09-29)  
     * `date_end`: *String* = date end in format YYYY-MM-DD (ex.1982-09-29)
     * `pin`: *String* = secret PIN given to content  
     * `tags: *String* = tag(s) to add to this content  
     * `key`: *String* = custom keys separated by comma  
     * `value`: *String* = custom values separated by comma  
     * }
     * @return {Object}         Promise object
     * @method  updateContent
     * @memberOf Playbasis.contentApi
     */
    api.updateContent = function(nodeId, updates) {
        var obj = { token: Playbasis.env.global.token };
        var selectedOptionsObj = helpers.createObjectFromTarget(updates, ["title", "summary", "detail", "category", "image", "status", "date_start", "date_end", "pin", "tags", "key", "value"]);
        var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

        return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, nodeId, "update"), obj);
    }

    /**
     * Delete existing content
     * @param  {String} nodeId node id of content
     * @return {Object}        Promise object
     * @method  deleteContent
     * @memberOf  Playbasis.contentApi
     */
    api.deleteContent = function(nodeId) {
        var obj = { token: Playbasis.env.global.token };

        return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, nodeId, "delete"), obj);
    }

    /**
     * Retrieve category by specified filter fields.
     * @param {Object} options (**optional**) options as object.  
     * It can include  
     * {  
     * `id`: *String* = specific id of category  
     * `name`: *String* = specific name of category  
     * `sort`: *String* = specific field to sort "_id" | "name" | "date_added" | "date_modified" 
     * `order`: *String* = direction of order "asc" | "desc"  
     * `offset`: *Number* = number of starting records
     * `limit`: *Number* = number of results to return  
     * }
     * @return {Object} Promise object
     * @method  retrieveCategory
     * @memberOf  Playbasis.contentApi
     */
    api.retrieveCategory = function(options) {
        var keys = ["id", "name", "sort", "order", "offset", "limit"];
        var dvalues = [null, null, null, null, null, null];

        return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "category") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
    }

    /**
     * Create content category.
     * @param  {String} name name of category
     * @return {Object}      Promise object
     * @method  createCategory
     * @memberOf Playbasis.contentApi
     */
    api.createCategory = function(name) {
        var obj = { token: Playbasis.env.global.token, name: name };

        return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "category", "create"), obj);
    }

    /**
     * Update content category.
     * @param  {String} id   category id
     * @param  {String} name category name to update
     * @return {Object}      Promise object
     * @method  updateCategory
     * @memberOf Playbasis.contentApi
     */
    api.updateCategory = function(id, name) {
        var obj = { token: Playbasis.env.global.token, id: id, name: name };

        return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "category", "update"), obj);
    }

    /**
     * Delete content category.
     * @param  {String} id category id
     * @return {Object}    Promise object
     * @method  deleteCategory
     * @memberOf Playbasis.contentApi
     */
    api.deleteCategory = function(id) {
        var obj = { token: Playbasis.env.global.token, id: id };

        return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "category", "delete"), obj);
    }

    /**
     * Send action like for player to content.
     * @param  {String} nodeId   node id of content
     * @param  {String} playerId player id to like content
     * @param {Object} options (**optional**) options as object.  
     * It can include  
     * {  
     * `key`: *String* = custom keys separated by comma  
     * `value`: *String* = custom values separated by comma  
     * }
     * @return {Object}          Promise object
     * @method  likeContent
     * @memberOf Playbasis.contentApi
     */
    api.likeContent = function(nodeId, playerId, options) {
        var obj = { token: Playbasis.env.global.token };
        var selectedOptionsObj = helpers.createObjectFromTarget(options, ["key", "value"]);
        var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

        return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, nodeId, "player", playerId, "like"), combineObj);
    }

    /**
     * Send action dislike for player to content.
     * @param  {String} nodeId   node id of content
     * @param  {String} playerId player id to like content
     * @param {Object} options (**optional**) options as object.  
     * It can include  
     * {  
     * `key`: *String* = custom keys separated by comma  
     * `value`: *String* = custom values separated by comma  
     * }
     * @return {Object}          Promise object
     * @method  dislikeContent
     * @memberOf Playbasis.contentApi
     */
    api.dislikeContent = function(nodeId, playerId, options) {
        var obj = { token: Playbasis.env.global.token };
        var selectedOptionsObj = helpers.createObjectFromTarget(options, ["key", "value"]);
        var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

        return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, nodeId, "player", playerId, "dislike"), combineObj);
    }

    /**
     * Give feedback to content for player.
     * @param  {String} nodeId   node id of content
     * @param  {String} playerId player id to like content
     * @param {String} feedback feedback to give to content
     * @param {Object} options (**optional**) options as object.  
     * It can include  
     * {  
     * `key`: *String* = custom keys separated by comma  
     * `value`: *String* = custom values separated by comma  
     * }
     * @return {Object}          Promise object
     * @method  giveFeedbackContent
     * @memberOf Playbasis.contentApi
     */
    api.giveFeedbackContent = function(nodeId, playerId, feedback, options) {
        var obj = { token: Playbasis.env.global.token, feedback: feedback };
        var selectedOptionsObj = helpers.createObjectFromTarget(options, ["key", "value"]);
        var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

        return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, nodeId, "player", playerId, "feedback"), combineObj);
    }
}