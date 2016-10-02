describe("Http tests", function() {

	var http;
	var mock;
	var spy;	// global spy used to probe whether callback function is called; for success callback

	beforeAll(function(done) {
		http = window.Playbasis.http;
		mock = window.mock;
		spy = {
			probe: function() {
				// do nothing
			}
		};

		spyOn(spy, "probe");
		done();
	});

	describe("http.getJsonAsync test", function() {

		beforeAll(function(done) {
			done();
		});

		it("success callback should be called", function(done) {
			http.getJsonAsync("https://api.pbapp.net/Player/jontestuser?api_key=" + mock.env.apiKey)
				.then((result) => { 
					spy.probe(result);
					expect(spy.probe).toHaveBeenCalled();
					done();

					spy.probe.calls.reset();
				}, (e) => { console.log("error caught: " + e.message); });
		});
	});

	describe("http.postJsonAsync test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should have called success callback", function(done) {
			http.postJsonAsync("https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey, { api_key : mock.env.apiKey, api_secret : mock.env.apiSecret })
				.then((result) => {
					spy.probe(result);
					expect(spy.probe).toHaveBeenCalled();
					done();
					spy.probe.calls.reset();
				}, (e) => { console.log("error caught: " + e.message); });
		});
	});

	describe("http.postJsonAsync Promise Chain test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should have called success callback, intercepted access token, then reached final flow", function(done) {
			var chain = http.postJsonAsync("https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey, { api_key : mock.env.apiKey, api_secret : mock.env.apiSecret })
				.then((result) => {
					spy.probe(result);
					expect(spy.probe).toHaveBeenCalled();
				}, (e) => { console.log("error caught: " + e.message); });
			chain.then((result) => {
				done();
				spy.probe.calls.reset();
			});
		});
	});

});