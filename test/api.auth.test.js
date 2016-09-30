describe("Auth Api Tests", function() {

	var api;

	beforeAll(function(done) {
		api = Playbasis.authApi;
		window.acquireBuiltPlaybasis();

		done();
	});

	describe("Auth Test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status of 0, token is not null, and have proper value", function(done) {
			api.auth(function(status, result) {
					expect(status.code).toEqual(0);
					expect(result).not.toBe(null);
					done();
				}
			);
		});
	});

	/*describe("Renew Test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status of 0, token is not null, and have proper value", function(done) {
			api.renew(function(status, result) {
					expect(status.code).toEqual(0);
					expect(result).not.toBe(null);
					done();
				}
			);
		});
	});*/
});