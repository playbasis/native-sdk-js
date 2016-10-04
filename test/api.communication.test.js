describe("Communication API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.communicationApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Send Email test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, via 'message'", function(done) {
			api.sendEmail(mock.env.playerId, "Test Email", "Test message")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, via 'templateId'", function(done) {
			api.sendEmail(mock.env.playerId, "Test Email", null, "01")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, via 'message' and 'templateId'", function(done) {
			api.sendEmail(mock.env.playerId, "Test Email", "Test message", "01")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});		
	});
});