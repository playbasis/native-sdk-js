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

		afterAll(function() {
			spy.probe.calls.reset();
		});

		it("success callback should be called", function(done) {
			http.getJsonAsync("https://api.pbapp.net/Player/jontestuser?api_key=" + mock.env.apiKey)
				.then((result) => { 
					spy.probe(result);
					expect(spy.probe).toHaveBeenCalled();
					done();
				}, (e) => { console.log("error caught: " + e.message); });
		});
	});

	describe("http.postJsonAsync test", function() {
		beforeAll(function(done) {
			done();
		});

		afterAll(function() {
			spy.probe.calls.reset();
		});

		it("should have called success callback", function(done) {
			http.postJsonAsync("https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey, { api_key : mock.env.apiKey, api_secret : mock.env.apiSecret })
				.then((result) => {
					spy.probe(result);
					expect(spy.probe).toHaveBeenCalled();
					done();
				}, (e) => { console.log("error caught: " + e.message); });
		});
	});

	describe("http.postJsonAsync Promise Chain test", function() {
		beforeAll(function(done) {
			done();
		});

		afterAll(function() {
			spy.probe.calls.reset();
		});

		it("should have called success callback, intercepted access token, then reached final flow", function(done) {
			var chain = http.postJsonAsync("https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey, { api_key : mock.env.apiKey, api_secret : mock.env.apiSecret })
				.then((result) => {
					spy.probe(result);
					expect(spy.probe).toHaveBeenCalled();
				}, (e) => { console.log("error caught: " + e.message); });
			chain.then((result) => {
				done();
			});
		});

		it("should chain successfully promise call", function(done) {
			var paramUrl = "https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey;
			var postObj = { api_key : mock.env.apiKey, api_secret : mock.env.apiSecret };
			http.postJsonAsync(paramUrl, postObj)
				.then((result) => { return http.postJsonAsync(paramUrl, postObj); })
				.then((result) => { return http.postJsonAsync(paramUrl, postObj); })
				.then((result) => { return done(); })
				.error((e) => { console.log("error " + e.code + ", " + e.message); });
		});

		it("should chain successfully promise call and catch error in 3rd promise call", function(done) {
			var paramUrl = "https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey;
			var postWrongObj = { api_key : mock.env.apiKey };
			var postObj = { api_key : mock.env.apiKey, api_secret : mock.env.apiSecret };
			var check = 0;
			http.postJsonAsync(paramUrl, postObj)
				.then((result) => { check = 1; return http.postJsonAsync(paramUrl, postObj); })
				.then((result) => { check = 2; return http.postJsonAsync(paramUrl, postWrongObj); })
				.then((result) => { check = 3; return http.postJsonAsync(paramUrl, postObj); })
				.then((result) => { check = 4; return done(); })
				.error((e) => { console.log("error from check[" + check + "], " + e.code + ", " + e.message); expect(check).toBe(2); done(); });
		});

		it("should catch error()", function(done) {
			http.postJsonAsync("https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey, { api_key : mock.env.apiKey })
				.then((result) => {
				})
				.error((e) => {
					console.log("error: " + e.code + ", " + e.message);
					done();
				});
		});
	});

	describe("error code, and error type", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return proper error code, and type", function(done) {
			http.postJsonAsync("https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey, { api_key : null, api_secret : null })
				.then((result) => {
					// should not go here
					// this statement will definitely linger error
					expect(result).toBe(null);
				}, (e) => {
					expect(e.isApiLevel).toBe(true);
					expect(e.code).toEqual(903);
					done();
				});
		});
	});
});