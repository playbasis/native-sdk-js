describe("Service API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.serviceApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Recent Point test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.recentPoint()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success; with options", function(done) {
			api.recentPoint({point_name: "exp", offset: 0, limit: 1})
				.then((result) => {
					expect(result.response.points).not.toBe(null);
					expect(result.response.points.length == 1).toBe(true);
					expect(result.response.points[0].reward_name).toEqual("exp");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Reset Point test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.resetPoint("point")
				.then((result) => {
					expect(result.response.reset).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});