describe("Quiz API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.quizApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("List Active Quizzes test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listOfActiveQuizzes()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message);})
		});
	});

	describe("Detail of Quiz test", function() {

		var quizId = "57f5d72ab350cf67308b81c6"; //pre-existing quiz 1

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.detailOfQuiz(quizId)
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result.quiz_id).toEqual(quizId);
					done();
				}, (e) => { console.log(e.message);});
		});
	});

	describe("Random Get a Quiz for Player test", function() {

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.randomQuizForPlayer(mock.env.playerId)
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result.quiz_id).not.toBe(null);
					done();
				}, (e) => { console.log(e.message);});
		});
	});

	describe("List Quiz Done by Player test", function() {

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listQuizDone(mock.env.playerId, 5)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message);});
		});
	});

	describe("List Pending Quiz by Player test", function() {

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listPendingQuiz(mock.env.playerId, 5)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message);});
		});
	});

	describe("Get Question from Quiz for Player test", function() {

		var quizId = "57f5d72ab350cf67308b81c6"; //pre-existing quiz 1

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.getQuestionFromQuiz(quizId, mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message);});
		});
	});

	describe("Get Question (with reset timestamp) from Quiz for Player test", function() {

		var quizId = "57f5d72ab350cf67308b81c6"; //pre-existing quiz 1

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.getQuestionFromQuiz_resetTimeStamp(quizId, mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message);});
		});
	});

	describe("Answer a Question for Quiz test", function() {

		var quizId = "57f5d72ab350cf67308b81c6";	// pre-existing quiz 1
		var optionId = "1521751f31748deab6333a87";	// pre-existing option 1 for quiz 1
		var questionId = "138003ef42931448ab4b02e2";	// pre-existing question for quiz 1

		beforeAll(function(done) {
			done();
		});

		// ensure to reset progress of quiz after answering question
		afterAll(function(done) {
			api.resetQuiz(mock.env.playerId, quizId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message);});
		});

		it("should return success", function(done) {
			api.answerQuestion(quizId, mock.env.playerId, questionId, optionId)
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result.score).toEqual(10); // pre-set
					done();
				}, (e) => { console.log(e.message);});
		});
	});

	describe("Rank Player by Score test", function() {

		var quizId = "57f5d72ab350cf67308b81c6";	// pre-existing quiz 1

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.rankPlayersByScore(quizId, 10)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message);});
		});
	});

	describe("Query for Quiz's Statistics test", function() {

		var quizId = "57f5d72ab350cf67308b81c6";	// pre-existing quiz 1

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.quizStatistics(quizId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message);});
		});
	});

	describe("Reset Quiz test", function() {

		var quizId = "57f5d72ab350cf67308b81c6";	// pre-existing quiz 1

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.resetQuiz(mock.env.playerId, quizId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message);});
		});
	});
});