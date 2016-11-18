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

		it("should return success. Requested with options object (included player_id and tags options).", function(done) {
			api.goodsListInfo({player_id: mock.env.playerId, tags: "goods"})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success. Requested with options object (included all options).", function(done) {
			api.goodsListInfo({player_id: mock.env.playerId, tags: "goods", date_start: "2016-11-06", date_end: "2016_12-31", limit: 5})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Goods List Info With Selected Fields Test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return only selected fields", function(done) {
			api.goodsListInfoWithSelectedFields({selected_field: "name,date_start"})
				.then((result) => {
					expect(result.response.goods_list).not.toBe(null);
					expect(result.response.goods_list.length > 0).toBeTruthy();
					// selected fields should exist
					expect(result.response.goods_list[0].name).not.toBe(null);
					expect(result.response.goods_list[0].date_start).not.toBe(null);
					// filtered out fields should not exist
					expect(result.response.goods_list[0].date_end).toBe(undefined);
					done();
				}, (e) => { console.log(e); });
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

	describe("Goods Group Available test", function() {

		var playerId = window.mock.env.playerId;
		var goodsGroupId = "57f26e4cb350cf9f4b8b9a72";	// actually it's 'goods_id'

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.goodsGroupAvailable(playerId, goodsGroupId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Sponsored Goods List Info test", function() {

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.sponsoredGoodsListInfo()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});	

	describe("Sponsored Goods Info test", function() {

		var goodsId = "57f26e4cb350cf9f4b8b9a72";	// actually it's 'goods_id'

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.sponsoredGoodsInfo(goodsId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Sponsored Goods Group Available test", function() {

		var playerId = window.mock.env.playerId;
		var goodsId = "57f26e4cb350cf9f4b8b9a72";	// actually it's 'goods_id'

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.sponsoredGoodsGroupAvailable(playerId, goodsId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	/**
	 * TODO: Add test cases for
	 * - Coupon code verification
	 * - Coupon code verification with redeem
	 */
});