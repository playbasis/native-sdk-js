// Test http/http.js
describe("Helpers tests", function() {

	var helpers;
	var mock;

	beforeAll(function() {
		helpers = window.Playbasis.helpers;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
	});

	it("should create a proper api url", function() {
		expect(helpers.createApiUrl("Auth")).toEqual(Playbasis.env.global.baseUrl + "/Auth?api_key=" + mock.env.apiKey);
	});

	it("should create a combined api url with options", function() {
		expect(helpers.createApiUrl("Player", "jontestuser")).toEqual(Playbasis.env.global.baseUrl + "/Player/jontestuser?api_key=" + mock.env.apiKey);
	});

	it("should catch a throw statement", function() {
		expect(function(){ helpers.joinIfNotNullAsUrlParam(); }).toThrow();
		expect(function(){ helpers.joinIfNotNullAsUrlParam("one"); }).toThrow();
		expect(function(){ helpers.joinIfNotNullAsUrlParam("one", "two", "three"); }).toThrow();
	});

	it("should return a proper joined string param", function() {
		expect(helpers.joinIfNotNullAsUrlParam("key1", "value1")).toEqual("key1=value1");
		expect(helpers.joinIfNotNullAsUrlParam("key1", "value1", "key2", "value2")).toEqual("key1=value1&key2=value2");
		expect(helpers.joinIfNotNullAsUrlParam("key1", "value1", "key2", "value2", "key3", "value3")).toEqual("key1=value1&key2=value2&key3=value3");
		expect(helpers.joinIfNotNullAsUrlParam("key1", "value1", null, "value2")).toEqual("key1=value1");
		expect(helpers.joinIfNotNullAsUrlParam("key1", "value1", null, "value2", "key3", "value3")).toEqual("key1=value1&key3=value3");
		expect(helpers.joinIfNotNullAsUrlParam("key1", "value1", "key2", null, null, "value3", "key4", "value4", "key5", null, "key6", "value6")).toEqual("key1=value1&key4=value4&key6=value6");
	});
});