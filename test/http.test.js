// Test http/http.js
describe("http/http.js tests", function() {

	var http;
	var mock;

	beforeAll(function(done) {
		http = window.Playbasis.http;
		mock = window.mock;
		done();
	});

	describe("http.get test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status of 200, and returned text not null", function(done) {
			http.get("https://api.pbapp.net/Player/jontestuser?api_key=" + mock.env.apiKey,
				function(status, text) {
					expect(status.code).toEqual(200);
					expect(text).not.toBe(null);
					done();
				}
			);
		});
	});

	describe("http.getJson test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status of 200, and returned json object not be bull", function(done) {
			http.getJson("https://api.pbapp.net/Player/jontestuser?api_key=" + mock.env.apiKey,
				function(status, jsonObj) {
					expect(status.code).toEqual(200);
					expect(jsonObj.success).toEqual(true);
					expect(jsonObj.response.player.username).toEqual("jontestuser");
					done();
				}
			);
		});
	});

	describe("http.post test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status of 200, returned non-null json result string, be able to parse json string with proper token result", function(done) {
			http.post("https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey, { api_key : mock.env.apiKey, api_secret : mock.env.apiSecret }, function(status, result) {
				expect(status.code).toEqual(200);
				expect(result).not.toBe(null);

				var obj = JSON.parse(result);
				expect(obj).not.toBe(null);
				expect(obj.response.token).not.toBe(null);
				done();
			})
		});
	});

	describe("http.postJson test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status of 200, and returned non-null json result object", function(done) {
			http.postJson("https://api.pbapp.net/Auth?api_key=" + mock.env.apiKey, { api_key : mock.env.apiKey, api_secret : mock.env.apiSecret }, function(status, result) {
				expect(status.code).toEqual(200);
				expect(result).not.toBe(null);
				expect(result.response.token).not.toBe(null);
				done();
			})
		});
	});

});