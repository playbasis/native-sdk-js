describe("Engine API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.engineApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("List Rules test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return sucess", function(done) {
			api.listRules()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success (with options)", function(done) {
			api.listRules({action: "login", player_id: mock.env.playerId})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Rule Detail test", function() {

		var ruleId;

		beforeAll(function(done) {
			done();
		});

		it("should get 'login' action rule for fetching rule detail later", function(done) {
			api.listRules({action: "login"})
				.then((result) => {
					expect(result.response.length > 0).toBe(true);
					// save rule id
					ruleId = result.response[0].id;
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success", function(done) {
			expect(ruleId).not.toBe(null);

			api.ruleDetail(ruleId)
				.then((result) => {
					expect(result.response).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Rule test", function() {

		var playerId;
		
		beforeAll(function(done) {
			playerId = mock.env.playerId;
			done();
		});

		it("should return success", function(done) {
			api.rule("login", playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should get 3 points as reward, requested with custom parameters", function(done) {
			var customParamsObj = { checkParamKey1: "checkParamValue1", checkParamKey2: "checkParamValue2" };
			api.rule("compare", playerId, {post_custom_params: customParamsObj})
				.then((result) => {
					expect(result.response.events).not.toBe(null);
					expect(result.response.events[0].reward_type).toBe("point");
					expect(result.response.events[0].value).toBe("3");
					done();
				}, (e) => { console.log(e); });
		});
	});
});