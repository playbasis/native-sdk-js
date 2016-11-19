describe("Point API Tests", function() {

	var api;
	var mock;
	var kApprovedTxnId = "582f4a808f161c00138b456b";

	beforeAll(function(done) {
		api = Playbasis.pointApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("List Custom Status", function() {
		it("should return at least some data", function(done) {
			// should return some data as there're already some transaction id that have been approved
			api.listCustomStatus()
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.length > 0).toBeTruthy();
					done();
				}, (e) => { console.log(e); });
		});
	});

	describe("Retrieve transaction custom point", function() {
		it("should return transaction information", function(done) {
			api.retrieveTransactionCustomPoint(kApprovedTxnId)
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.transaction_id).toBe(kApprovedTxnId);
					done();
				}, (e) => { console.log(e); });
		});
	});

	describe("Approve transaction custom point", function() {
		// for this case, we have no choice but to
		// - call engine rule to get custom point
		// - call to approve (this test)
		// thus custom point can be depleted in the long future
		// but we set it with very high point 10M, thus it should be
		// very long while unless test cases has been executed frequently
		it("should return success", function(done) {
			var postParams = { amount: 1 };
			var tnxId; // to be set

			Playbasis.engineApi.rule('order', mock.env.playerId, { post_custom_params: postParams })
				// callback: call engine rule
				.then((result) => {
					expect(result.response.events).not.toBe(null);
					expect(result.response.events.length > 0).toBeTruthy();
					// get tnx id
					tnxId = result.response.events[0].transaction_id;
					// approve it
					return api.approveTransactionCustomPoint(tnxId);
				}, (e) => { console.log(e); })
				// callback: try to approve it
				.then((result) => {
					expect(result.response.length > 0).toBeTruthy();
					expect(result.response[0].transaction_id).toBe(tnxId);
					expect(result.response[0].status).toBe("success");
					done();
				}, (e) => { console.log(e); });
		});
	});

	describe("Retrieve remaining points", function() {
		it("should return information", function(done) {
			api.retrieveRemainingPoints()
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.length > 0).toBeTruthy();
					done();
				}, (e) => { console.log(e); });
		});

		it("should return information only for 'token'", function(done) {
			api.retrieveRemainingPoints({name: "token"})
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.length == 1).toBeTruthy();
					expect(result.response[0].name).toBe("token");
					done();
				}, (e) => { console.log(e); });
		});
	});
});