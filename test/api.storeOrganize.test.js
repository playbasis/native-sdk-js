describe("Store Organize API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.storeOrganizeApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("List Organizations test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listOrganizations()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, and validate fields. Requested via options", function(done) {
			api.listOrganizations({search: "Organize 1"})
				.then((result) => {
					expect(result.response.results).not.toBe(null);
					expect(result.response.results.length == 1).toBe(true);
					expect(result.response.results[0].name).toEqual("Organize 1");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("List Nodes test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listNodes()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, and validate fields. Requested via options", function(done) {
			api.listNodes({search: "Node 1"})
				.then((result) => {
					expect(result.response.results).not.toBe(null);
					expect(result.response.results.length == 1).toBe(true);
					expect(result.response.results[0].name).toEqual("Node 1");
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});