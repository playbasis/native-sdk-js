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
	 * 'message' or 'templateId' is required. It's no need to submit both values. If submit both, 'templateId' will be used.
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
}