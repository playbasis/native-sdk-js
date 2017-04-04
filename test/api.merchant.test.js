describe("Merchant API Tests", function() {

	var api;
	var mock;
	var kGoodsGroup = "Goods Group Merchant";
	var kMerchantPINCode = "nY7XFR0";

	beforeAll(function(done) {
		api = Playbasis.merchantApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Available Branch for Goods Group", function() {
		it("should return branch and merchant information", function(done) {
			api.availableBranchForGoodsGroup(kGoodsGroup)
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.length > 0).toBeTruthy();
					expect(result.response[0].branch).not.toBe(null);
					expect(result.response[0].branch.length > 0).toBeTruthy();
					expect(result.response[0].branch[0].b_name).not.toBe(null);
					expect(result.response[0].merchant).not.toBe(null);
					expect(result.response[0].merchant.name).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Verify and Redeem Coupon", function() {

		var kRuleAction = "want";	// pre-set rule to get goods item from rule engine
		var returnedCouponCode;	// returned coupon code used in testcase

		beforeAll(function(done) {
			Playbasis.engineApi.rule(kRuleAction, mock.env.playerId)
				.then((result) => {
					expect(result.response.events).not.toBe(null);
					expect(result.response.events.length > 0).toBeTruthy();

					// get coupon code
					returnedCouponCode = result.response.events[0].reward_data.code;
					expect(returnedCouponCode).not.toBe(null);
					done();
				}, (e) => { console.log(e); });
		});

		it("should verify that coupon code is available to be redeemed, and able to redeem successfully", function(done) {
			api.verifyCoupon(kGoodsGroup, returnedCouponCode, { pin_code: kMerchantPINCode, player_id: mock.env.playerId })
				.then((result) => {
					expect(result.success).toBe(true);
					expect(result.response).not.toBe(undefined);
					expect(result.response).toBe("REDEEM_GOODS_IS_AVAILABLE_FROM_THIS_BRANCH");
					return api.redeemCoupon(kGoodsGroup, returnedCouponCode, { pin_code: kMerchantPINCode, player_id: mock.env.playerId });

				}, (e) => { console.log(e); })
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.success).toBe(true);
					done();
				}, (e) => { console.log(e); });
		});
	});

	describe("Redeem Goods", function() {
		it("should be able to redeem (default amount to 1, increased 'Goods B' to be enough to redeem)", function(done) {
			api.redeemGoods("Goods B", mock.env.playerId)
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.success).toBe(true);
					done();
				}, (e) => { console.log(e); });
		});
	});
});