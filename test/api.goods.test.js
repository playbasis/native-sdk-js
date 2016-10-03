describe("Goods API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.goodsApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Goods List Info test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.goodsListInfo()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success. Requested with options object (no 'tags' option).", function(done) {
			api.goodsListInfo({player_id: mock.env.playerId})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success. Requested with options object (included all options).", function(done) {
			api.goodsListInfo({player_id: mock.env.playerId, tags: "goods"})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Goods Info test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, and its 'goods_id' can be validated.", function(done) {
			api.goodsInfo("57f1ed4bb350cf4f328b5a9f")
				.then((result) => {
					expect(result.response.goods.goods_id).toEqual("57f1ed4bb350cf4f328b5a9f");
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success. Requested with option with 'player_id', and must have 'amount' field, and 'goods_id' can be validated.", function(done) {
			api.goodsInfo("57f1ed4bb350cf4f328b5a9f", {player_id: mock.env.playerId})
				.then((result) => {
					expect(result.response.amount).not.toBe(null);
					expect(result.response.goods.goods_id).toEqual("57f1ed4bb350cf4f328b5a9f");
					done();
				}, (e) => {console.log(e.message); });
		});
	});
});