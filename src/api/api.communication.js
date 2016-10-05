'use strict';

/**
 * Playbasis Communication API
 * @namespace Playbasis.communicationApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// global object
	var api = Playbasis.communicationApi = {};

	/**
	 * Send email to player.
	 *
	 * 'message' or 'templateId' is required. There's no need to submit both values. If submit both, 'templateId' will be taken into effect but 'message'.
	 * @param  {String} playerId player id
	 * @param  {String} subject  email subject
	 * @param  {String} message email message (either message or templateId is required)
	 * @param  {String} templateId template message (either message or templateId is required)
	 * @return {Object}          Promise object
	 * @method sendEmail
	 * @memberOf Playbasis.communicationApi
	 */
	api.sendEmail = function(playerId, subject, message, templateId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, subject: subject, message: message, template_id: templateId};

		return http.postJsonAsync(helpers.createApiUrl("Email/send"), obj);
	}

	/**
	 * Send coupon to player via email.
	 *
	 * 'message' or 'templateId' is required. There's no need to submit both values. If submit both, 'templateId' will be taken into effect but 'message'.
	 * @param  {String} playerId   player id
	 * @param  {String} refId      reference transaction id for redeption
	 * @param  {String} subject    email subject
	 * @param  {String} message    email message, you can use {{coupon}} for the actual coupon. Either 'message' or 'templateId' is required.
	 * @param  {String} templateId template message. Either 'message' or 'templateId' is required.
	 * @return {Object}            Promise object
	 * @method  sendEmailCoupon
	 * @memberOf Playbasis.communicationApi
	 */
	api.sendEmailCoupon = function(playerId, refId, subject, message, templateId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, ref_id: refId, subject: subject, message: message, template_id: templateId };

		return http.postJsonAsync(helpers.createApiUrl("Email/goods"), obj);
	}

	/**
	 * List recent email sent to player
	 * @param  {String} playerId player id
	 * @param  {Object} options (optional) options as object. It can inclue { since: #string = 'datetime' format supported by any English textual datetimee description }
	 * @return {Object}          Promise object
	 * @method  listRecentSentEmail
	 * @memberOf Playbasis.communicationApi
	 */
	api.listRecentEmailSent = function(playerId, options)
	{
		var keys = ["player_id", "since"];
		var dvalues = [playerId, null];

		return http.getJsonAsync(helpers.createApiUrl("Email/recent") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * List email template
	 * @return {Object} Promise template
	 * @method  listRecentSentEmail
	 * @memberOf Playbasis.communicationApi
	 */
	api.listEmailTemplate = function()
	{
		return http.getJsonAsync(helpers.createApiUrl("Email/template"));
	}

	/**
	 * Get processed email template.
	 * @param  {String} templateId email template id
	 * @param  {Object} options    (optional) options as object. It can include { player_id: #string }
	 * @return {Object}            Promise object
	 * @method  getProcessedEmailTemplate
	 * @memberOf Playbasis.communicationApi
	 */
	api.getProcessedEmailTemplate = function(templateId, options)
	{
		var keys = ["player_id"];
		var dvalues = [null];

		return http.getJsonAsync(helpers.createApiUrl("Email/template", templateId) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Send SMS to player.
	 *
	 * If submit both 'message', and 'templateId', then 'templateId' will be used.
	 * @param  {String} playerId   player id
	 * @param  {String} message    message. Either 'message' or 'templateId' is required.
	 * @param  {String} templateId message template id. Either 'message' or 'templateId' is required.
	 * @return {Object}            Promise object
	 */
	api.sendSMS = function(playerId, message, templateId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, message: message, template_id: templateId };

		return http.postJsonAsync(helpers.createApiUrl("Sms/send"), obj);
	}

	/**
	 * Send coupon to player via SMS.
	 * @param  {String} playerId   player id
	 * @param  {String} refId      reference transaction id for redemption
	 * @param  {String} message    SMS message. Either 'message' or 'templateId' is required.
	 * @param  {String} templateId template id. Either 'message' or 'templateId' is required.
	 * @return {Object}            Promise object
	 */
	api.sendSMSCoupon = function(playerId, refId, message, templateId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, ref_id: refId, message: message, template_id: templateId };

		return http.postJsonAsync(helpers.createApiUrl("Sms/goods"), obj);
	}

	/**
	 * List recent SMS sent to player
	 * @param  {String} playerId player id
	 * @param  {Object} options (optional) options as object. It can inclue { since: #string = 'datetime' format supported by any English textual datetimee description }
	 * @return {Object}          Promise object
	 * @method  listRecentSMSSent
	 * @memberOf Playbasis.communicationApi
	 */
	api.listRecentSMSSent = function(playerId, options)
	{
		var keys = ["player_id", "since"];
		var dvalues = [playerId, null];

		return http.getJsonAsync(helpers.createApiUrl("Sms/recent") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * List SMS template
	 * @return {Object} Promise object
	 * @method  listSMSTemplate
	 * @memberOf Playbasis.communicationApi
	 */
	api.listSMSTemplate = function()
	{
		return http.getJsonAsync(helpers.createApiUrl("Sms/template"));
	}

	/**
	 * Get processes SMS template
	 * @param  {String} templateId template id
	 * @param  {Object} options    (optional) options as object. It can include { player_id: #string }
	 * @return {Object}            Promise object
	 * @method  getProcessedSMSTemplate
	 * @memberOf Playbasis.communicationApi
	 */
	api.getProcessedSMSTemplate = function(templateId, options)
	{
		var keys = ["player_id"];
		var dvalues = [null];

		return http.getJsonAsync(helpers.createApiUrl("Sms/template", templateId) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Register device for push notification
	 * @param  {String} deviceToken       device token
	 * @param  {String} deviceDescription device model description
	 * @param  {String} deviceName        device model name
	 * @param  {String} osType            os type. It can be "IOS" | "Android"
	 * @return {Object}                   Promise object
	 * @method  registerDevice
	 * @memberOf Playbasis.communicationApi
	 */
	api.registerDevice = function(deviceToken, deviceDescription, deviceName, osType)
	{
		var obj = { token: Playbasis.env.global.token, device_token: deviceToken, device_description: deviceDescription, device_name: deviceName, os_type: osType };

		return http.postJsonAsync(helpers.createApiUrl("Push/deviceRegistration"), obj);
	}

	/**
	 * Deregister device for push notification.
	 * Either 'playerId' or 'deviceToken' is required.
	 * 
	 * @param  {String} playerId    player id. Either 'playerId' or 'deviceToken' is required.
	 * @param  {String} deviceToken device token. Either 'playerId' or 'deviceToken' is required.
	 * @return {Object}             Promise object
	 * @method  deregisterDevice
	 * @memberOf Playbasis.communicationApi
	 */
	api.deregisterDevice = function(playerId, deviceToken)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, device_token: deviceToken };

		return http.postJsonAsync(helpers.createApiUrl("Push/deviceDeRegistration"), obj);
	}

	/**
	 * Send push notification to player.
	 * @param  {String} playerId   player id.
	 * @param  {String} message    push notification message. Either 'message' or 'templateId' is required.
	 * @param  {String} templateId template id for message. Either 'message' or 'templateId' is required.
	 * @return {Object}            Promise object
	 * @method  sendPushNotification
	 * @memberOf Playbasis.communicationApi
	 */
	api.sendPushNotification = function(playerId, message, templateId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, message: message, template_id: templateId };

		return http.postJsonAsync(helpers.createApiUrl("Push/send"), obj);
	}

	/**
	 * Send coupon to player via push notification.
	 * @param  {String} playerId   player id
	 * @param  {String} refId      reference transaction id for redemption
	 * @param  {String} message    SMS message. It can use variable {{coupon}} for the actual code. Either 'message' or 'templateId' is required.
	 * @param  {String} templateId template message. Either 'message' or 'templateId' is required.
	 * @return {Object}            Promise object
	 * @method  sendPushNotificationCoupon
	 * @memberOf Playbasis.communicationApi
	 */
	api.sendPushNotificationCoupon = function(playerId, refId, message, templateId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, message: message, template_id: templateId };

		return http.postJsonAsync(helpers.createApiUrl("Push/goods"), obj);
	}

	/**
	 * List recent push notification sent to player
	 * @param  {String} playerId player id
	 * @param  {Object} options  (optional) options as object. It can inclue { since: #string = 'datetime' format supported by any English textual datetimee description }
	 * @return {Object}          Promise object
	 * @method  listRecentPushNotificationSent
	 * @memberOf Playbasis.communicationApi
	 */
	api.listRecentPushNotificationSent = function(playerId, options)
	{
		var keys = ["player_id", "since"];
		var dvalues = [playerId, null];

		return http.getJsonAsync(helpers.createApiUrl("Push/recent") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * List push notification template
	 * @return {Object} Promise object
	 * @method  listPushNotificationTemplate
	 * @memberOf Playbasis.communicationApi
	 */
	api.listPushNotificationTemplate = function()
	{
		return http.getJsonAsync(helpers.createApiUrl("Push/template"));
	}

	/**
	 * Get processed push notification template
	 * @param  {String} templateId push notification template id
	 * @param  {Object} options    (optional) options as object. It can include { player_id: #string }
	 * @return {Object}            Promise object
	 * @method  getProcessedPushNotificationTemplate
	 * @memberOf Playbasis.communicationApi
	 */
	api.getProcessedPushNotificationTemplate = function(templateId, options)
	{
		var keys = ["player_id"];
		var dvalues = [null];

		return http.getJsonAsync(helpers.createApiUrl("Push/template", templateId) + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}
}