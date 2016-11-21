describe("Wrapped QRCode Generator Test", function() {

	var qrCode;
	var kContainerId = "container";

	beforeAll(function(done) {
		qrCode = Playbasis.qrCode;
		done();
	});

	describe("Generating Test", function() {
		beforeEach(function() {
			var container = document.createElement("div");
			container.setAttribute("id", kContainerId);
			document.body.appendChild(container);
		});

		afterEach(function() {
			var container = document.getElementById(kContainerId);
			document.body.removeChild(container);
		});

		it("should generate successfully and append as a child to target element container", function(done) {
			qrCode.generate(kContainerId, "AABB");
			var imgNode = document.getElementById(kContainerId).firstChild;
			expect(imgNode).not.toBe(null);
			expect(imgNode.tagName.toLowerCase()).toBe("img");
			done();
		});

		it("should generate successfully and append as a child to target element container (via custom parameters)", function(done) {
			qrCode.generate(kContainerId, "AABB", {size: 'small', type: 5, errorCorrectionLevel: 'H'});
			var imgNode = document.getElementById(kContainerId).firstChild;
			expect(imgNode).not.toBe(null);
			expect(imgNode.tagName.toLowerCase()).toBe("img");
			done();
		});
	});
});