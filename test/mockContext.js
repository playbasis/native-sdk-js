(function () {

	// -- playbasis object -- //
	function acquirePlaybasis() {
		var playbasis;

		playbasis = new Playbasis();

		return playbasis;
	}

	window.acquirePlaybasis = acquirePlaybasis;

	// -- environment -- //
	var mockApiKey = "2043203153";
	var mockApiSecret = "144da4c8df85b94dcdf1f228ced27a32";
	var playerId = "jontestuser";
	var playerId2 = "jontestuser2";

	var mock = {};
	mock.env = {
		apiKey : mockApiKey,
		apiSecret : mockApiSecret,
		playerId: playerId,
		playerId2: playerId2
	};

	// build Playabsis for entire test suite
	function buildPlaybasis() {
		Playbasis.builder
			.setApiKey(mock.env.apiKey)
			.setApiSecret(mock.env.apiSecret)
			.build();
	}

	window.mock = mock;
	window.acquireBuiltPlaybasis = buildPlaybasis;
})();