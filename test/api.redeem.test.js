describe("Redeem API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.redeemApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Redeem Goods test", function() {

		var goodsId = "57f1ed08b350cf4f328b5a49";

		beforeAll(function(done) {
			done();
		});

		it("should return sucess (increased 'point' to be enough to redeem)", function(done) {
			// increase point by 10 first
			Playbasis.engineApi.rule("buy", mock.env.playerId)
				.then((result) => {
					expect(result.response.events).not.toBe(null);
					expect(result.response.events.length == 1).toBe(true);
					expect(result.response.events[0].event_type).toEqual("REWARD_RECEIVED");
					// now time to redeem, redeem for only 1 (without amount: option)
					return api.redeem(goodsId, mock.env.playerId);
				}, (e) => { console.log(e.message); })
				.then((result) => {
					expect(result.response.events).not.toBe(null);
					expect(result.response.events.length > 0).toBe(true);
					expect(result.response.events[0].event_type).toEqual("GOODS_RECEIVED");
					expect(result.response.events[0].value).toEqual(1);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Redeem Goods Group test", function() {

		var group = "Goods Group 1";

		beforeAll(function(done) {
			done();
		});

		it("should return sucess (increased 'point' to be enough to redeem)", function(done) {
			// increase point by 10 first
			Playbasis.engineApi.rule("buy", mock.env.playerId)
				.then((result) => {
					expect(result.response.events).not.toBe(null);
					expect(result.response.events.length == 1).toBe(true);
					expect(result.response.events[0].event_type).toEqual("REWARD_RECEIVED");
					// now time to redeem, redeem for only 1 (without amount: option)
					return api.redeemGoodsGroup(mock.env.playerId, group);
				}, (e) => { console.log(e.message); })
				.then((result) => {
					expect(result.response.events).not.toBe(null);
					expect(result.response.events.length > 0).toBe(true);
					expect(result.response.events[0].event_type).toEqual("GOODS_RECEIVED");
					expect(result.response.events[0].value).toEqual(1);
					expect(result.response.events[0].goods_data.group).toEqual(group);
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});