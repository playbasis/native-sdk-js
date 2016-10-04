describe("Merchant API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.merchantApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Available Branch for Goods Group", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.availableBranchForGoodsGroup("Goods Group 1")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});