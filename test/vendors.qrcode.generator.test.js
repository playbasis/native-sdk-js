describe("Wrapped QRCode Generator Test", function() {

	var qrCode;

	beforeAll(function(done) {
		qrCode = Playbasis.qrCode;
		done();
	});

	describe("Generating Test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should generate non-null img tag string from pre-define text", function(done) {
			var imgTagStr = qrCode.generate("AABB");
			expect(typeof imgTagStr).toEqual('string');
			expect(imgTagStr).not.toBe(null);
			done();
		});

		it("should generate non-null img tag string from pre-define text (via custom parameters)", function(done) {
			var imgTagStr = qrCode.generate("AABB", {size: 'small', type: 5, errorCorrectionLevel: 'H'});
			expect(typeof imgTagStr).toEqual('string');
			expect(imgTagStr).not.toBe(null);
			done();
		});
	});
});