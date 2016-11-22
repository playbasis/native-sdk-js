describe("Util Tests", function() {

	var util;

	beforeAll(function(done) {
		util = Playbasis.util;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Get Thumbnail Url", function() {

		var kTestImageUrl = "https://images.pbapp.net/data/11c3b78963ddb3d5ed5a7c18d65009fa.jpg";

		it("should return the proper thumbnail url for 80x80", function() {
			var chck = util.getThumbnailURL(kTestImageUrl, "80x80");
			expect(chck).toBe("https://images.pbapp.net/cache/data/11c3b78963ddb3d5ed5a7c18d65009fa-80x80.jpg");
		});

		it("should return the proper thumbnail url for 240x240", function() {
			var chck = util.getThumbnailURL(kTestImageUrl, "240x240");
			expect(chck).toBe("https://images.pbapp.net/cache/data/11c3b78963ddb3d5ed5a7c18d65009fa-240x240.jpg");
		});
	});
});