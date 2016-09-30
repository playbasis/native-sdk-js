// Test core/core.js
// Its file name is prefixed with "_" in order to make it processed first.
describe("Core's static defaults tests", function() {

	it("shoud have proper default settings", function() {
		var defaults = Playbasis.static.defaults.global;

		expect(defaults.baseUrl).toEqual("https://api.pbapp.net");
		expect(defaults.baseAsyncUrl).toEqual("https://api.pbapp.net/async/call");
	});

	it("should have proper initial environment values", function() {
		var env = Playbasis.env.global;

		expect(env.baseUrl).toEqual("https://api.pbapp.net");
		expect(env.baseAsyncUrl).toEqual("https://api.pbapp.net/async/call");
		expect(env.apiKey).toBe(null);
		expect(env.apiSecret).toBe(null);
		expect(env.token).toBe(null);
	});
});