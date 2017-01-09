describe("Auto Request for Auth Token for POST request", function() {

	var http;
	var mock;

	beforeAll(function(done) {
		http = Playbasis.http;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Auto Auth Token Test", function() {
		beforeAll(function(done) {
			// make sure token is null at this case
			// so to trigger automatically auth() for POST request
			Playbasis.env.global.token = null;
			spyOn(http, "postJsonAsync").and.callThrough();
			done();
		});

		it("should automatically send request for new token, before sending an original request", function(done) {
			// expect to have null token first
			expect(Playbasis.env.global.token).toBe(null);

			Playbasis.playerApi.playerDetailedInfo(mock.env.playerId)
				.then((result) => {
					// token is set by now
					expect(Playbasis.env.global.token).not.toBe(null);
					// 3 calls: one for initial try, one for token, and another for player request (original request)
					expect(http.postJsonAsync.calls.count()).toBe(3);
					expect(result.response).not.toBe(null);
					expect(result.response.player.username).toBe(mock.env.playerId);
					// make another POST request
					// to ensure that there's no additional auto auth() request
					Playbasis.playerApi.playerDetailedInfo(mock.env.playerId2)
						.then((result2) => {
							// no more additional call should be added
							expect(http.postJsonAsync.calls.count()).toBe(4);
							expect(result2.response).not.toBe(null);
							expect(result2.response.player.username).toBe(mock.env.playerId2);
							done();
						}, (e) => {
							console.log(e);
						});
				}, (e) => {
					console.log(e);
				});
		});
	});

	describe("Auto Auth Token Ignore Test", function() {
		beforeAll(function(done) {
			spyOn(http, "postJsonAsync").and.callThrough();
			done();
		});

		it("should not make a request to auth() token again", function(done) {

			// get token first
			Playbasis.authApi.auth()
				.then((result) => {

					expect(result.response).not.toBe(null);
					expect(result.response.token).not.toBe(null);

					Playbasis.playerApi.playerDetailedInfo(mock.env.playerId)
						.then((result) => {
							// token is set by now
							expect(Playbasis.env.global.token).not.toBe(null);
							// 2 calls: one for token, and another for player request (original request)
							expect(http.postJsonAsync.calls.count()).toBe(2);
							expect(result.response).not.toBe(null);
							expect(result.response.player.username).toBe(mock.env.playerId);
							// make another POST request
							// to ensure that there's no additional auto auth() request
							Playbasis.playerApi.playerDetailedInfo(mock.env.playerId2)
								.then((result2) => {
									// no more additional call should be added
									expect(http.postJsonAsync.calls.count()).toBe(3);
									expect(result2.response).not.toBe(null);
									expect(result2.response.player.username).toBe(mock.env.playerId2);
									done();
								}, (e) => {
									console.log(e);
								});
						}, (e) => {
							console.log(e);
						});
				}, (e) => {
					console.log(e);
				});
		});
	});
});