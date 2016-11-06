describe("Communication API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.communicationApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Send Email test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, via 'message'", function(done) {
			api.sendEmail(mock.env.playerId, "Test Email", "Test message")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, via 'templateId'", function(done) {
			api.sendEmail(mock.env.playerId, "Test Email", null, "01")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, via 'message' and 'templateId'", function(done) {
			api.sendEmail(mock.env.playerId, "Test Email", "Test message", "01")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});		
	});

	describe("List Recent Email Sent to Player test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listRecentEmailSent(mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("List email template test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listEmailTemplate()
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.length > 0).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Get processed email template test", function() {

		var templateId = "01";

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.getProcessedEmailTemplate(templateId)
				.then((result) => {
					expect(result.response).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, with 'player_id' as option", function(done) {
			api.getProcessedEmailTemplate(templateId, {player_id: mock.env.playerId })
				.then((result) => {
					expect(result.response).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Send SMS test", function() {

		beforeAll(function(done) {
			done();
		});

		it("shoud return sms", function(done) {
			api.sendSMS(mock.env.playerId, "test")
				.then((result) => {
					done();
				}, (e) => {
					// also accept 'Limit Exceed' as success
					if (e.code == 3) {
						done();
					}
					else {
						console.log(e.message); 
					}
				});
		});
	});

	describe("List Recent SMS Sent to Player test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listRecentSMSSent(mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("List SMS Template test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listSMSTemplate()
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.length > 0).toBe(true); 
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Get Processed SMS Template test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.getProcessedSMSTemplate("01")
				.then((result) => {
					expect(result.response).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, with 'player_id' option", function(done) {
			api.getProcessedSMSTemplate("01", mock.env.playerId)
				.then((result) => {
					expect(result.response).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("List Recent Push Notification Sent to Player test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listRecentPushNotificationSent(mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("List Push Notification Template test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listPushNotificationTemplate()
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.length > 0).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Get Processed Push Notification Template test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.getProcessedPushNotificationTemplate("01")
				.then((result) => {
					expect(result.response).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success. With 'player_id' as option", function(done) {
			api.getProcessedPushNotificationTemplate("01", mock.env.playerId)
				.then((result) => {
					expect(result.response).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	// declaration section for device registration/deregistration
	// as long as we register with dummy, and delete it too, it's totally ok
	var deviceToken = "dummyDeviceToken";
	var deviceDescription = "dummyDeviceDescription";
	var deviceName = "dummyDeviceName";
	var osType = "IOS";

	describe("Register dummy device id test", function() {
		it("should register device token", function(done) {
			api.registerDevice(mock.env.playerId2, deviceToken, deviceDescription, deviceName, osType)
				.then((result) => {
					expect(result.message).toBe("Success");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Deregister dummy device id test", function() {
		it("should de-register device token", function(done) {
			api.deregisterDevice(mock.env.playerId2, deviceToken)
				.then((result) => {
					expect(result.message).toBe("Success");
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});