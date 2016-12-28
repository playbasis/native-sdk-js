'use strict';

/**
 * Playbasis Constants
 * @namespace Playbasis.const
 */
module.exports = function (Playbasis) {

	Playbasis.const = {};

	/**
	 * Error code.
	 * @type {Object}
	 * @property {Number} internetConnectionIssue - Suspect to be a problem about Internet connection. User might not be able to connect to the Internet.
	 * @memberof Playbasis.const
	 */
	Playbasis.const.errorCode = {
		internetConnectionIssue: 99999,

		// following codes are not used
		// TODO: To be cleaned up.
		/** Invalid token key */
		InvalidToken: 900,

		/** Request exceeded. Too much request */
		RequestExceeded: 901,

		/** Token key required */
		TokenRequired: 902,

		/** Invalid parameter, must not be blank and special character. */
		ParameterMissing: 903,

		/** There is an internal server error */
		InternalError: 800,

		/** Email error, canot send email */
		CannotSentEmail: 801,

		/** Email error, all designated recipients are in black list */
		AllEmailsInBlacklist: 802,

		/** Email is already in black list */
		EmailAlreadyInBlacklist: 803,

		/** Email is not in black list */
		EmailNotInBlacklist: 804,

		/** This Amazon SNS message type is not supported */
		UnknownSNSMessageType: 805,

		/** Unknown notification message */
		UnknownNotificationMessage: 806,

		/** Cannot verify the authenticity of PayPal IPN message */
		CannotVerifyPaypalIPN: 807,

		/** Invalid PayPal IPN */
		InvalidPaypalIPN: 808,

		/** Invalid API-KEY or API-SECRET */
		InvalidApiKeyOrSecret: 1,

		/** Can't access, permission denied */
		AccessDenied: 2,

		/** Limit exceeded, contact admin */
		LimitExceeded: 3,

		/** User doesn't exist */
		UserNotExist: 200,

		/** User already exist */
		UserAlreadyExist: 201,

		/** User registration limit exceeded */
		TooManyUsers: 202,

		/** The user or reward type doesn't exceed */
		UserOrRewardNotExist: 203,

		/** cl_player_id format should be 0-9a-zA-Z_- */
		UserIdInvalid: 204,

		/** Phone number format should be +[countrycode][number] example +66861234567 */
		UserPhoneInvalid: 205,

		/** The user has no such reward */
		RewardForUserNotExist: 206,

		/** The user has not enough reward */
		RewardForUserNotEnough: 207,

		/** Email is already used in registration */
		EmailIsAlreadyUsed: 216,

		/** Action not available */
		ActionNotFound: 301,

		/** Reward not available */
		RewardNotFound: 401,

		/** Goods not available */
		GoodsNotFound: 501,

		/** User has exceeded redeem limit */
		OverLimitRedeem: 601,

		/** User has already joined this quest */
		QuestAlreadyJoined: 701,

		/** User has finished this quest */
		QuestAlreadyFinished: 702,

		/** User has no permission to join this quest */
		QuestNotEnoughPermissionToJoinQuest: 703,

		/** User has not yet joined this quest */
		NotYetJoinQuest: 704,

		/** Quest not found */
		QuestJoinOrCancelNotFound: 705,

		/** Quiz not found */
		QuizNotFound: 1001,

		/** Qustion not found */
		QuizQuestionNotFound: 1002,

		/** Option not found */
		QuizOptionNotFound: 1003,

		/** Question has already been completed by player */
		QuizQuestionAlreadyCompleted: 1004
	};
};