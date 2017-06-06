'use strict';

/**
 * Playbasis Player API
 * @namespace Playbasis.playerApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// base url method
	var apiMethod = "Player";

	// global Object
	var _api = Playbasis.playerApi = {};

	/**
	 * Get public information about player.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  playerPublicInfo
	 * @memberof Playbasis.playerApi
	 */
	_api.playerPublicInfo = function(playerId) 
	{	
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId));
	};

	/**
	 * Get public and private information about a player.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  playerInfo
	 * @memberof Playbasis.playerApi
	 */
	_api.playerInfo = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId), {token : Playbasis.env.global.token});
	};

	/**
	 * Get basic information of players
	 * @param  {String} playerIdArray array of player id String
	 * @return {Object}               Promise Object
	 * @method  listPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.listPlayer = function(playerIdArray)
	{
		var playerIds = playerIdArray.join(",");

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "list"), {token : Playbasis.env.global.token, list_player_id : playerIds});
	}

	/**
	 * Get detailed public information about player, including points and badges.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  playerDetailedPublicInfo
	 * @memberof Playbasis.playerApi
	 */
	_api.playerDetailedPublicInfo = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "data", "all"));
	};

	/**
	 * Get detailed public and private information about player, including points and badges.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method playerDetailedInfo
	 * @memberof Playbasis.playerApi
	 */
	_api.playerDetailedInfo = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "data", "all"), {token : Playbasis.env.global.token});
	};

	/**
	 * Get custom fields information about a player.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  listCustomFieldsOfPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.listCustomFieldsOfPlayer = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "custom"));
	};

	/**
	 * Set custom field of player
	 * @param {String} playerId player id
	 * @param {String} key      key of custom field
	 * @param {String} value    value of custom field
	 * @method setCustomFieldOfPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.setCustomFieldOfPlayer = function(playerId, key, value)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "custom"), {token : Playbasis.env.global.token, key : key, value : value});
	};

	/**
	 * Register player
	 * @param  {String} playerId player id
	 * @param  {String} email    email to register player with
	 * @param  {String} options  (**optional**) option as Object.  
	 * It can include  
	 * {  
	 * `image`: *String* = url to the player profile image,  
	 * `phone_number`: *String* = phone number in format +66xxyyyzzzz,  
	 * `facebook_id`: *String* = facebook id of player,  
	 * `twitter_id`: *String* = twitter id of player,  
	 * `password`: *String* = password,  
	 * `first_name`: *String* = first name of player,  
	 * `last_name`: *String = last name of player,  
	 * `gender`: *Number = 1 for Male | 2 for Female,  
	 * `birth_date`: *String* = date of birth in the format YYYY-MM-DD (ex. 1982-09-29),  
	 * `code`: *String* = referral code of another player for invitation system,  
	 * `anonymous`: *Number* = 0 | 1,  
	 * `device_id`: *String* = device id to verify with SMS verification process,  
	 * `approve_status`: *String* = "approved" | "rejected" | "pending",  
	 * }
	 * @return {Object}          Promise Object
	 * @method  register
	 * @memberof Playbasis.playerApi
	 */
	_api.register = function(playerId, email, options)
	{
		// create post Object with required info
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

	/**
	 * Referral player
	 * @param  {String} playerId      player id
	 * @param  {String} referralCode  referral code of another player for invitation system
	 * @return {Object}               Promise Object
	 * @method  referral
	 * @memberof Playbasis.playerApi
	 */
	_api.referral = function(playerId, referralCode)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "referral"), {token : Playbasis.env.global.token, player_id : playerId, referral_code : referralCode});
	};

	/**
	 * Update player information
	 * @param  {String} playerId player id
	 * @param  {Object} updates  update values as Object.  
	 * It can include  
	 * {  
	 * `username`: *String* = username,  
	 * `email`: *String* = email,  
	 * `image`: *String* = image url of player,  
	 * `phone_number`: *String* = phone number in format +66xxyyzzz,  
	 * `exp`: *Number* = experience point,  
	 * `level`: *Number* = level,  
	 * `facebook_id`: *String* = facebook id of player,  
	 * `twitter_id`: *String* = twitter id of player,  
	 * `password`: *String* = password of player,  
	 * `first_name`: *String* = first name of player,  
	 * `last_name`: *String* = last name of player,  
	 * `gender`: *Number* = 1 for Male | 2 for Female,  
	 * `birth_date`: *String* = birth date in format YYYY-MM-DD (ex. 1982-09-29),  
	 * `device_id`: *String* = device id to verfiy with SMS verification process,  
	 * `approve_status`: *String* = "approved" | "rejected" | "pending"  
	 * }
	 * @return {Object}          Promise Object
	 * @method  update
	 * @memberof Playbasis.playerApi
	 */
	_api.update = function(playerId, updates)
	{
		// create post Object with required info
		var obj = {token : Playbasis.env.global.token};
		var selectiveUpdatesObj = helpers.createObjectFromTarget(updates, ["username", "email", "image", "phone_number", "exp", "level", "facebook_id", "twitter_id", "password", "first_name", "last_name", "gender", "birth_date", "device_id"]);
		var combinedObj = helpers.combineObjects(obj, selectiveUpdatesObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "update"), combinedObj);
	};

	/**
	 * Reset player password that store in Playbasis system.
	 * @param  {String} email email of player
	 * @return {Object}       Promise Object
	 * @method  resetPlayerPassword
	 * @memberof Playbasis.playerApi
	 */
	_api.resetPlayerPassword = function(email)
	{
		var postObj = { token: Playbasis.env.global.token, email: email };

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "password", "email"), postObj);
	}

	/**
	 * Verify player email that store in Playbasis system by sending verification email.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method verifyPlayerEmail
	 * @memberof Playbasis.playerApi
	 */
	_api.verifyPlayerEmail = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "email", "verify"), {token : Playbasis.env.global.token});
	};

	/**
	 * Permanently delete player from Playbasis database.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  delete
	 * @memberof Playbasis.playerApi
	 */
	_api.delete = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "delete"), {token : Playbasis.env.global.token});
	};

	/**
	 * Tell Playbasis system that a player has logged in.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  login
	 * @memberof Playbasis.playerApi
	 */
	_api.login = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "login"), {token : Playbasis.env.global.token});
	};

	/**
	 * Request one time password.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  requestOTP
	 * @memberof Playbasis.playerApi
	 */
	_api.requestOTP = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "auth", playerId, "requestOTPCode"), {token : Playbasis.env.global.token});
	};

	/**
	 * Request one time password for setup phone.
	 * @param  {String} playerId    player id
	 * @param  {String} phoneNumber phone number in format +66xxyyyzzzz
	 * @return {Object}             Promise Object
	 * @method  requestOTPforSetupPhone
	 * @memberof Playbasis.playerApi
	 */
	_api.requestOTPforSetupPhone = function(playerId, phoneNumber)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "auth", playerId, "setupPhone"), {token : Playbasis.env.global.token, phone_number : phoneNumber});
	};

	/**
	 * Perform OTP verification from code that has sent to player SMS.
	 * @param  {Stirng} playerId player id
	 * @param  {String} OTPcode  OTP code as sent to player
	 * @return {Object}          Promise Object
	 * @method  performOTPVerification
	 * @memberof Playbasis.playerApi
	 */
	_api.performOTPVerification = function(playerId, OTPcode)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, "auth", playerId, "verifyOTPCode"), {token : Playbasis.env.global.token, code : OTPcode});
	};

	/**
	 * Tell Playbasis system that a player has logged out.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  logout
	 * @memberof Playbasis.playerApi
	 */
	_api.logout = function(playerId)
	{
		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "logout"), {token : Playbasis.env.global.token});
	};

	/**
	 * List active sessions of a player in Playbasis system.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method listActivePlayerSessions
	 * @memberof Playbasis.playerApi
	 */
	_api.listActivePlayerSessions = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "sessions"));
	};

	/**
	 * Find a player by given session id.
	 * @param  {String} sessionId session id
	 * @return {Object}           Promise Object
	 * @method  findPlayerBySession
	 * @memberof Playbasis.playerApi
	 */
	_api.findPlayerBySession = function(sessionId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "session", sessionId));
	};

	/**
	 * Return information about all point-based rewards that a player currently has.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  points
	 * @memberof Playbasis.playerApi
	 */
	_api.points = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "points"));
	};

	/**
	 * Returns how much of specified the point-based reward a player currently has.
	 * @param  {String} playerId  player id
	 * @param  {String} pointName name of point-based reward to query
	 * @return {Object}           Promise Object
	 * @method  point
	 * @memberof Playbasis.playerApi
	 */
	_api.point = function(playerId, pointName)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "point", pointName));
	};

	/**
	 * Returns history points of player
	 * @param  {String} playerId player id
	 * @param  {Object} options  (**optional**) options as Object.  
	 * It can include  
	 * {  
	 * `point_name`: *String* = "point" | "exp" | ...,  
	 * `offset`: *Number* = offset of returned records,  
	 * `limit`: *Number* = number of returned records to return,  
	 * `order`: *String* = "desc" | "asc"  
	 * }
	 * @return {Object}          Promise Object
	 * @method  pointHistory
	 * @memberof Playbasis.playerApi
	 */
	_api.pointHistory = function(playerId, options)
	{
		// set default values
		var pointName = null;
		var offset = 0;
		var limit = 20;
		var order = "desc";

		var keys = ["point_name", "offset", "limit", "order"];
		var dvalues = [null, 0, 20, "desc"];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "point_history") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	};

	/**
	 * Return the last time that player has performed the specified action.
	 * @param  {String} playerId   player id
	 * @param  {String} actionName name of action to query
	 * @return {Object}            Promise Object
	 * @method  actionTime
	 * @memberof Playbasis.playerApi
	 */
	_api.actionTime = function(playerId, actionName)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "action", actionName, "time"));
	};

	/**
	 * Return the time and action that a player last performed.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  lastAction
	 * @memberof Playbasis.playerApi
	 */
	_api.lastAction = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "action", "time"));
	};

	/**
	 * Returns the number of times that a player has performed the specified action.
	 * @param  {String} playerId   player id
	 * @param  {String} actionName name of the action to query
	 * @return {Object}            Promise Object
	 * @method actionCount
	 * @memberof Playbasis.playerApi
	 */
	_api.actionCount = function(playerId, actionName)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "action", actionName, "count"));
	};

	/**
	 * Return detail of level
	 * @param  {Number} level numbe of level
	 * @return {Object}       Promise Object
	 * @method level
	 * @memberof Playbasis.playerApi
	 */
	_api.level = function(level)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "level", level));
	};

	/**
	 * Return all detail of level.
	 * @return {Object} Promise Object
	 * @method  levels
	 * @memberof Playbasis.playerApi
	 */
	_api.levels = function()
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "levels"));
	};

	/**
	 * Return information about all the badges that a player has earned.
	 * @param  {String} playerId player id
	 * @param {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `tags`: *String* = specific tags to find, each tag delimited by comma i.e. foo,bar  
	 * }
	 * @return {Object}          Promise Object
	 * @method  badge
	 * @memberof Playbasis.playerApi
	 */
	_api.badge = function(playerId, options)
	{
		var keys = ["tags"];
		var defaultValues = [null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "badge") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, defaultValues, options));
	};

	/**
	 * Return information about all the badges of the client as well as the amount that a player may earn.
	 * @param  {String} playerId player id
	 * @param {Object} options (**optional**) options as object.  
	 * It can include.  
	 * {
	 * `tags`: *String* = specific tags to find, each tag delimited by comma i.e. foo,bar    
	 * }
	 * @return {Object}          Promise Object
	 * @method allBadges
	 * @memberof Playbasis.playerApi
	 */
	_api.allBadges = function(playerId, options)
	{
		var keys = ["tags"];
		var defaultValues = [null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "badgeAll") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, defaultValues, options));
	};

	/* Return the list of players sorted by the specified point type. */
	/**
	 * Return the list of players sorted by the specified point type.
	 * @param  {String} rankBy  point-based name to rank by ("exp" | "point", etc)
	 * @param  {Number} limit amount of items to return
	 * @param  {Object} options (**optional**) options as Object. It can include  
	 * {  
	 * `mode`: *String* = "all-time" | "weekly" | "monthly"  
	 * }.
	 * @return {Object}         Promise Object
	 * @method  rank
	 * @memberof Playbasis.playerApi
	 */
	_api.rank = function(rankBy, limit, options) 
	{
		var keys = ["mode"];
		var dvalues = ["all-time"];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "rank", rankBy, limit) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	};

	/**
	 * Return list of players sorted by each point type.
	 * @param  {Number}   limit    limit number of players returned in the list
	 * @param  {Object}   options  (**optional**) option as Object. It can include  
	 * {  
	 * `mode`: *String* = "all-time" | "weekly" | "monthly"  
	 * }.
	 * @method  ranks
	 * @memberof Playbasis.playerApi
	 */	
	_api.ranks = function(limit, options)
	{
		var keys = ["mode"];
		var dvalues = ["all-tiome"];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "ranks", limit) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	};

	/**
	 * Returns information about all the goods list that a player has redeem.
	 * @param  {String}   playerId player id
	 * @param  {Object}   options  (**optional**) options as Object.  
	 * It can include  
	 * {  
	 * `tags`: *String* = tag to query separated by comma,  
	 * `status`: *String* = "all" | "active" | "expired" | "used". Default is "active".  
	 * }.
	 * @method goods
	 * @memberof Playbasis.playerApi
	 */
	_api.goods = function(playerId, options)
	{
		var keys = ["tags", "status"];
		var dvalues = [null, "active"];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "goods") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	};

	/**
	 * Return information about the specified quest that player has joined.
	 * @param  {String}   playerId player id
	 * @param {String} questId quest id that playered has joined, to get information from
	 * @method  questOfPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.questOfPlayer = function(playerId, questId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "quest", questId) + "&player_id=" + playerId);
	};

	/**
	 * Return list of quests that player has joined.
	 * @param  {String}   playerId player id
	 * @param  {Object}   options  (**optional**) options as Object.  
	 * It can include  
	 * {  
	 * `tags`: *String* = tag to query separated by comma  
	 * }.
	 * @method questListOfPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.questListOfPlayer = function(playerId, options)
	{
		var keys = ["player_id", "tags"];
		var dvalues = [playerId, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "quest") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Return list of all available quests of the client as well as the status of the player if joined.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  allQuestsOfPlayer
	 * @memberof Playbasis.playerApi
	 */
	_api.allQuestsOfPlayer = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, "questAll", playerId));
	}

	/**
	 * Return quest reward history of player.
	 * @param  {String} playerId player id
	 * @param  {Object} options  (**optional**) options as Object.  
	 * It can include  
	 * {  
	 * `offset`: *Number*,  
	 * `limit`: *Number*  
	 * }
	 * @return {Object}          Promise Object
	 * @method questRewardHistory
	 * @memberof Playbasis.playerApi
	 */
	_api.questRewardHistory = function(playerId, options)
	{
		var keys = ["offset", "limit"];
		var dvalues = [0, 50];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "quest_reward_history") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Deduct a reward from player
	 * @param  {String} playerId player id
	 * @param  {String} reward   reward name to deduct from player
	 * @param  {Number} amount   amount of reward to deduct
	 * @param  {Object} options  (**optional**) options as Object.  
	 * It can include  
	 * {  
	 * `force`: *Number* = 0 for not force if player has not enough reward to deduct | 1 = force to do the deduct (and player's reward becomes zero)  
	 * }. 
	 * @return {Object}          Promise Object
	 * @method  deductReward
	 * @memberof Playbasis.playerApi
	 */
	_api.deductReward = function(playerId, reward, amount, options)
	{
		var postObj = { token: Playbasis.env.global.token, reward: reward, amount: amount };
		var optionObj = helpers.createObjectFromTarget(options, ["force"]);
		var combinedObj = helpers.combineObjects(postObj, optionObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "deduct"), combinedObj);
	}

	/**
	 * Deduct a badge from a given player.
	 * @param  {String} playerId player id
	 * @param  {String} badge    name of badge to deduct
	 * @param  {Number} amount   amount to deduct
	 * @param  {Object} options  (**optional**) options as Object.  
	 * It can include  
	 * {  
	 * `force`: *Number* = 0 for not force if player has not enough badge to deduct | 1 = force to do the deduct (and player's badge becomes zero)  
	 * }
	 * @return {Object}          Promise Object
	 * @method deductBadge
	 * @memberOf  Playbasis.playerApi
	 */
	_api.deductBadge = function(playerId, badge, amount, options)
	{
		var postObj = { token: Playbasis.env.global.token, badge: badge, amount: amount };
		var optionObj = helpers.createObjectFromTarget(options, ["force"]);
		var combinedObj = helpers.combineObjects(postObj, optionObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "deduct", "badge"), combinedObj);
	}

	/**
	 * Give gift item from player to player.
	 * @param  {String} sentPlayerId       player id that send the gift
	 * @param  {String} receivedPlayerId   player id that received the gift
	 * @param  {String} giftId             gift id can be badge id, goods id , custom point id
	 * @param  {String} type               type of gift, the value can be "badge" | "custom_point" | "goods"
	 * @param  {Number} amount             amount of gift to be sent to received player
	 * @return {Object}          Promise Object
	 * @method giveGift
	 * @memberOf  Playbasis.playerApi
	 */
	_api.giveGift = function(sentPlayerId, receivedPlayerId, giftId, type, amount)
	{
		var postObj = { token: Playbasis.env.global.token, sent_player_id: sentPlayerId, received_player_id: receivedPlayerId, gift_id: giftId, type: type, amount: amount};

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, sentPlayerId, "giveGift", type), postObj);
	}

	/**
	 * Return generated referral code of player.
	 * @param  {String} playerId player id
	 * @return {Object}          Promise Object
	 * @method  playerReferralCode
	 * @memberof Playbasis.playerApi
	 */
	_api.playerReferralCode = function(playerId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "code"));
	}

	/**
	 * Returns information about number of goods that player has
	 * @param  {String}   playerId player id
	 * @param  {Object}   options  (**optional**) options as Object.  
	 * It can include  
	 * {  
	 * `tags`: *String* = goods tag to query separated by comma,  
	 * `status`: *String* = "all" | "active" | "expired" | "used". Default is "active".  
	 * }.
	 * @return {Object} Promise object
	 * @method goodsCount
	 * @memberof Playbasis.playerApi
	 */
	_api.goodsCount = function(playerId, options)
	{
		var keys = ["tags", "status"];
		var dvalues = [null, "active"];

		return http.getJsonAsync(helpers.createApiUrl(apiMethod, playerId, "goods/count") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Set specific goods in player's inventory as favorite
	 * @param  {String} playerId player id
	 * @param  {String} goodsId  goods id to set favorite status
	 * @param  {Boolean} status   status to set. It can be either `true` or `false` 
	 * @return {Object}          Promise object
	 * @method  favoriteGoods
	 * @memberOf  Playbasis.playerApi
	 */
	_api.favoriteGoods = function(playerId, goodsId, status)
	{
		var postObj = { token: Playbasis.env.global.token, goods_id: goodsId, status: status ? "true" : "false" };

		return http.postJsonAsync(helpers.createApiUrl(apiMethod, playerId, "goods", "favorite"), postObj);
	}
}