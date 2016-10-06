'use strict';

/**
 * Playbasis Quiz Organize API
 * @namespace Playbasis.quizApi
 */
module.exports = function(Playbasis) {

	// utilize
	var http = Playbasis.http;
	var helpers = Playbasis.helpers;

	// base api method url
	var apiMethodUrl = "Quiz";

	// global object
	var api = Playbasis.quizApi = {};

	/**
	 * Return list of active quizzes
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `player_id`: *String* = player id as used in client's website  
	 * `type`: *String* = type of quiz which can be "quiz" | "poll"  
	 * `tags`: *String* = tag(s) to find i.e. "foo,bar"  
	 * }
	 * @return {Object}         Promise object
	 * @method  listOfActiveQuizzes
	 * @memberOf Playbasis.quizApi
	 */
	api.listOfActiveQuizzes = function(options)
	{
		var keys = ["player_id", "type", "tags"];
		var dvalues = [null, null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "list") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Get detail of quiz.
	 * @param  {String} quizId  quiz id to get detail from
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `player_id`: *String* = player id as used in client's website  
	 * }
	 * @return {Object}         Promise object
	 * @method  detailOfQuiz
	 * @memberOf Playbasis.quizApi
	 */
	api.detailOfQuiz = function(quizId, options)
	{
		var keys = ["player_id"];
		var dvalues = [null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, quizId, "detail") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Randomly get one quiz from a list of active quizzes for player.
	 * @param  {String} playerId player id
	 * @param  {Object} options  (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `type`: *String* = type of quiz. It can be "quiz" | "poll"  
	 * `tags`: *String* = tag(s) to find i.e. "foo,bar"  
	 * }
	 * @return {Object}          Promise object
	 * @method  randomQuizForPlayer
	 * @memberOf Playbasis.quizApi
	 */
	api.randomQuizForPlayer = function(playerId, options)
	{
		var keys = ["player_id", "type", "tags"];
		var dvalues = [playerId, null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "random") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * List quiz done by player
	 * @param  {String} playerId player id
	 * @param  {Number} limit    number of returned result
	 * @return {Object}          Promise object
	 * @method  listQuizDone
	 * @memberOf Playbasis.quizApi
	 */
	api.listQuizDone = function(playerId, limit)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "player", playerId, limit));
	}

	/**
	 * List pending quiz by player
	 * @param  {String} playerId player id
	 * @param  {Number} limit    number of returned result
	 * @return {Object}          Promise object
	 * @method  listPendingQuiz
	 * @memberOf Playbasis.quizApi
	 */
	api.listPendingQuiz = function(playerId, limit)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, "player", playerId, "pending", limit));
	}

	/**
	 * Get a question with a list of options from a given quiz.
	 * @param  {String} quizId   quiz id to get a question from
	 * @param  {String} playerId player id
	 * @param  {Object} options  (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `question_id`: *String* = question id in quiz, if you need to get a specific question  
	 * `random`: *Number* = 1 for Random | 2 for Not Random  
	 * }
	 * @return {Object}          Promise object
	 * @method  getQuestionFromQuiz
	 * @memberOf Playbasis.quizApi
	 */
	api.getQuestionFromQuiz = function(quizId, playerId, options)
	{
		var keys = ["player_id", "question_id", "random"];
		var dvalues = [playerId, null, null];

		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, quizId, "question") + helpers.appendAndJoinIfNotNullAsUrlParam2(keys, dvalues, options));
	}

	/**
	 * Get a question with a list of options from a given quiz, but with a reset timestamp of question that has timeout to answer.
	 * @param  {String} quizId   quiz id to get a question from
	 * @param  {String} playerId player id
	 * @param  {Object} options  (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `question_id`: *String* = question id in quiz, if you need to get a specific question  
	 * `random`: *Number* = 1 for Random | 2 for Not Random  
	 * }
	 * @return {Object}          Promise object
	 * @method  getQuestionFromQuiz
	 * @memberOf Playbasis.quizApi
	 */
	api.getQuestionFromQuiz_resetTimeStamp = function(quizId, playerId, options)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId };
		var selectedOptionsObj = helpers.createObjectFromTarget(options, ["question_id", "random"]);
		var combineObj = helpers.combineObjects(obj, selectedOptionsObj);

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, quizId, "question"), combineObj);
	}

	/**
	 * Answer question with option for quiz.
	 * @param  {String} quizId     quiz id to answer to question
	 * @param  {String} playerId   player id
	 * @param  {String} questionId question id to answer
	 * @param  {String} optionId   option id of question selected as answer
	 * @return {Object}            Promise object
	 * @method answerQuestion
	 * @memberOf Playbasis.quizApi
	 */
	api.answerQuestion = function(quizId, playerId, questionId, optionId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, question_id: questionId, option_id: optionId };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, quizId, "answer"), obj);
	}

	/**
	 * Rank players by their score for given quiz.
	 * @param  {String} quizId quiz id to rank score for players
	 * @param  {Number} limit  number of returned result
	 * @return {Object}        Promise object
	 * @method rankPlayersByScore
	 * @memberOf Playbasis.quizApi
	 */
	api.rankPlayersByScore = function(quizId, limit)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, quizId, "rank", limit));
	}

	/**
	 * Query a statistics of quiz done by all players
	 * @param  {String} quizId quiz id to query statistics from
	 * @return {Object}        Promise object
	 * @method quizStatistics
	 * @memberOf Playbasis.quizApi
	 */
	api.quizStatistics = function(quizId)
	{
		return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl, quizId, "stat"));
	}

	/**
	 * Reset a quiz done by player.
	 * @param  {String} playerId player id
	 * @param  {String} quizId   quiz id to reset
	 * @return {Object}          Promise object
	 * @method  resetQuiz
	 * @memberOf Playbasis.quizApi
	 */
	api.resetQuiz = function(playerId, quizId)
	{
		var obj = { token: Playbasis.env.global.token, player_id: playerId, quiz_id: quizId };

		return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl, "reset"), obj);
	}
}