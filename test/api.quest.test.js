describe("Quest API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.questApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Quest List Info test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return sucess", function(done) {
			api.questListInfo()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success (with 'tags' options), and all items have 'tags' as 'test'", function(done) {
			api.questListInfo({tags: "test"})
				.then((result) => {
					expect(result.response.quests.length > 0).toBe(true);
					for (var i=0; i<result.response.quests.length; i++) {
						expect(result.response.quests[i].tags.indexOf("test") > -1).toBe(true);	
					}
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Quest Info test", function() {
		var questId = "57ee78dbb350cf03048c1ea9";

		beforeAll(function(done) {
			done();
		});

		it("should return success, and can validate its quest name to match 'Test Quest 1'", function(done) {
			api.questInfo(questId)
				.then((result) => {
					expect(result.response.quest.quest_name).toEqual("Test Quest 1");
					expect(result.response.quest.quest_id).toEqual(questId);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Mission Info test", function() {

		var questId = "57ee78dbb350cf03048c1ea9";
		var missionId = "57ee78dbb350cf03048c1ea7";

		beforeAll(function(done) {
			done();
		});

		it("should return success, and validate 'mission_name' and 'mission_id' fields", function(done) {
			api.missionInfo(questId, missionId)
				.then((result) => {
					expect(result.response.mission_name).toEqual("Login");
					expect(result.response.mission_id).toEqual(missionId);
					expect(result.response.quest_id).toEqual(questId);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Quest List Available for Player", function() {

		var playerId;

		beforeAll(function(done) {
			playerId = mock.env.playerId;
			done();
		});

		it("should return success", function(done) {
			api.questListAvailableForPlayer(playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Quest Available for Player", function() {

		var playerId;
		var questId = "57ee78dbb350cf03048c1ea9";

		beforeAll(function(done) {
			playerId = mock.env.playerId;
			done();
		});

		it("should return success", function(done) {
			api.questAvailableForPlayer(questId, playerId)
				.then((result) => {
					expect(result.response.event_type).toEqual("QUEST_AVAILABLE");
					expect(result.response.event_status).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Join Quest test", function() {

		var playerId;
		var questId = "57ee78dbb350cf03048c1ea9";

		beforeAll(function(done) {
			playerId = mock.env.playerId;

			api.cancelQuest(questId, playerId)
				.then((result) => {
					expect(result.response.events.event_type).toEqual("QUEST_UNJOIN");
					expect(result.response.events.quest_id).toEqual(questId);
					done();
				}, (e) => { 
					// not yet join quest, it's ok
					if (e.code == 704) {
						done();
					}
					else {
						console.log(e.message); 
					}
				});
		});

		afterAll(function(done) {
			api.cancelQuest(questId, playerId)
				.then((result) => {
					expect(result.response.events.event_type).toEqual("QUEST_UNJOIN");
					expect(result.response.events.quest_id).toEqual(questId);
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, join quest or (if need) to cancel quest first before join", function(done) {
			api.joinQuest(questId, playerId)
				.then((result) => {
					expect(result.response.events.event_type).toEqual("QUEST_JOIN");
					expect(result.response.events.quest_id).toEqual(questId);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Cancel Quest test", function() {

		var playerId;
		var questId = "57ee78dbb350cf03048c1ea9";

		beforeAll(function(done) {
			playerId = mock.env.playerId;

			// join quest first
			api.joinQuest(questId, playerId)
				.then((result) => {
					done();
				}, (e) => { 
					// if user already joined, then success
					if (e.code == 701) {
						done();
					}
					else {
						console.log(e.message); 
					}
				});
		});

		it("should return success, cancel first or (if need) to join quest first before cancel", function(done) {
			api.cancelQuest(questId, playerId)
				.then((result) => {
					// no need to join quest first, as it's already joined
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Join All Quests test", function() {

		var playerId;

		beforeAll(function(done) {
			playerId = mock.env.playerId;
			done();
		});

		it("should return success", function(done) {
			api.joinAllQuests(playerId)
				.then((result) => {
					expect(result.response.join_all).toEqual("finish");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Quest Leaderboard test", function() {

		var playerId;
		var questId = "57f0c857b350cf292d8bd765";

		beforeAll(function(done) {
			playerId = mock.env.playerId;
			done();
		});

		it("should return success", function(done) {
			api.questLeaderboard(questId, playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});