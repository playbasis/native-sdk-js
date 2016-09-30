// Test http/http.js
describe("Helpers tests", function() {

	var helpers;
	var mock;

	beforeAll(function() {
		helpers = window.Playbasis.helpers;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
	});

	it("should join url component together", function() {
		var comp1 = "https://playbasis.com";
		var comp2 = "games";
		var joined = helpers.joinUrlComponent(comp1, comp2);
		expect(joined).toEqual(comp1 + "/" + comp2);
	});

	it("should return joined encoded params", function() {
		var params = {key1:"value1", key2:"value2"};
		var joinedEncodedParam = helpers.joinParams(params);
		expect(joinedEncodedParam).toEqual("key1=value1&key2=value2");
	});

	it("should create a proper api url", function() {
		expect(helpers.createApiUrl("Auth")).toEqual(Playbasis.env.global.baseUrl + "/Auth?api_key=" + mock.env.apiKey);
	});

	it("should create a combined api url with options", function() {
		expect(helpers.createApiUrl("Player", "jontestuser")).toEqual(Playbasis.env.global.baseUrl + "/Player/jontestuser?api_key=" + mock.env.apiKey);
	});

	it("should have a newly added key with proper corresponding value", function() {
		var obj = {key1:"value1"};
		helpers.objAdd(obj, "key2", "value2");
		expect(obj["key2"]).toBe("value2");
	});

	it("should create http-level status obj according to specified values", function() {
		var obj = helpers.createHttpLevelStatusObj(200, "ok");
		expect(obj).not.toBe(null);
		expect(obj.code).toEqual(200);
		expect(obj.message).toEqual("ok");
	});

	it("should create api-level status obj according to specified values", function() {
		var obj = helpers.createApiLevelStatusObj(0, 0, "ok");
		expect(obj).not.toBe(null);
		expect(obj.type).toEqual(0);
		expect(obj.code).toEqual(0);
		expect(obj.message).toEqual("ok");
	});

	it("should forward callback", function() {
		var status = 404;
		var result = "all not ok";
		var callback = function() { status = 200; result = "all ok"; }
		helpers.forwardApiCallback(callback, status, result);

		// if status and result are changed, then it's all good
		expect(status).toEqual(200);
		expect(result).toEqual("all ok");
	});

	it("should foward callack - test via spy", function() {
		var callback = jasmine.createSpy("callback");
		helpers.forwardApiCallback(callback, helpers.createApiLevelStatusObj(1,0,"all ok"), "something");
		expect(callback).toHaveBeenCalled();
	});
});