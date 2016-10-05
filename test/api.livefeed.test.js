describe("Livefeed API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.livefeedApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Recent Activities test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.recentActivities()
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.activities).not.toBe(null);
					expect(result.response.activities.length > 0).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, with 'limit' options", function(done) {
			api.recentActivities({limit: 1})
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.activities).not.toBe(null);
					expect(result.response.activities.length == 1).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Detail Activity test", function() {

		var activityId = "57f4a315b350cf45798b56fc";	// this is REWARD event for "earned 10 point"

		beforeAll(function(done) {
			done();
		});

		it("should return success, and validate some fields", function(done) {
			api.detailActivity(activityId)
				.then((result) => {
					expect(result.response.activity).not.toBe(null);
					expect(result.response.activity.event_type).toEqual("REWARD");
					expect(result.response.activity.message).toEqual("earned 10 point");
					expect(result.response.activity.id).toEqual(activityId);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Like Activity test", function() {

		var activityId = "57f4a315b350cf45798b56fc";

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.likeActivity(activityId, mock.env.playerId)
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Comment Activity test", function() {

		var activityId = "57f4a315b350cf45798b56fc";

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.commentActivity(activityId, mock.env.playerId, "I like this activity")
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});