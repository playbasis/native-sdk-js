describe("Badge API Tests", function() {

	var api;

	beforeAll(function(done) {
		api = Playbasis.badgeApi;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Badges Info test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, and have at least one badge", function(done) {
			api.badgesInfo()
				.then((result) => {
					expect(result.response.badges).not.toBe(null);
					expect(result.response.badges.length).not.toEqual(0);
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, and have one badge with tags of 'like'", function(done) {
			api.badgesInfo({tags: "like"})
				.then((result) => {
					expect(result.response.badges).not.toBe(null);
					expect(result.response.badges.length).not.toEqual(0);
					expect(result.response.badges[0].tags.find((str) => { return str == "like"; })).toEqual("like");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Badge Info test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, and has matching badge id from what we specified", function(done) {
			api.badgeInfo("56406faabe120b1f2d8b4569")
				.then((result) => {
					expect(result.response.badge).not.toBe(null);
					expect(result.response.badge.badge_id).toEqual("56406faabe120b1f2d8b4569");
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});