describe("Wrapped Barcode Generator Test", function() {

	var barCode;

	beforeAll(function(done) {
		barCode = Playbasis.barCode;
		done();
	});

	describe("Generating Test", function() {
		beforeEach(function() {
			// create a new svg element before each test
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("id", "testbarcode");
			document.body.appendChild(svg);
		});

		afterEach(function() {
			// remove created svg element after we're done with it
			var svg = document.getElementById("testbarcode");
			document.body.removeChild(svg);
		});

		it("should not has any error", function(done) {
			var success = true;
			try {
				barCode.generate("#testbarcode", "dummy");
			}
			catch(e) {
				console.log(e);
				success = false;
			}

			expect(success).toBeTruthy();
			done();
		});

		it("should not has any error - with options", function(done) {
			var success = true;
			try {
				barCode.generate("#testbarcode", "123456789012", {
					textAlign: "left",
					textPosition: "top",
					margin: 10,
					format: "EAN13"
				});
			}
			catch(e) {
				console.log(e);
				success = false;
			}
			
			expect(success).toBeTruthy();
			done();
		});
	});

	describe("Generating Test - class as target element", function() {
		beforeEach(function() {
			// create a new svg element before each test
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("id", "testbarcode");
			svg.setAttribute("class", "testbarcode-class");
			document.body.appendChild(svg);
		});

		afterEach(function() {
			// remove created svg element after we're done with it
			var svg = document.getElementById("testbarcode");
			document.body.removeChild(svg);
		});

		it("should not has any error", function(done) {
			var success = true;
			try {
				barCode.generate(".testbarcode-class", "dummy");
			}
			catch(e) {
				console.log(e);
				success = false;
			}

			expect(success).toBeTruthy();
			done();
		});

		it("should not has any error - with options", function(done) {
			var success = true;
			try {
				barCode.generate(".testbarcode-class", "123456789012", {
					textAlign: "left",
					textPosition: "top",
					margin: 10,
					format: "EAN13"
				});
			}
			catch(e) {
				console.log(e);
				success = false;
			}
			
			expect(success).toBeTruthy();
			done();
		});
	});
});