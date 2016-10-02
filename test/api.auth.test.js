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

		it("should successfully returned and have value in 'token', and 'date_expire' fields", function(done) {
			api.auth()
				.then((result) => {
					expect(result.success).toEqual(true);
					expect(result.response.token).not.toBe(null);
					expect(result.response.date_expire).not.toBe(null);
					done();
				}, (e) => {console.log(e.message); });
		});
	});

	describe("Renew Test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should successfully returned and have value in 'token', and 'date_expire' fields", function(done) {
			api.renew()
				.then((result) => {
					expect(result.success).toEqual(true);
					expect(result.response.token).not.toBe(null);
					expect(result.response.date_expire).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});