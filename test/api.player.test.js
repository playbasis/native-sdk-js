describe("Player API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = window.Playbasis.playerApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();

		done();
	});

	describe("Player info (public data only) test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, result is not null and able to validate matching of 'playerId'", function(done) {
			api.playerPublicInfo(mock.env.playerId)
				.then((result) => {
					expect(result).not.toBe(null);
					expect(result.response.player.username).toEqual(mock.env.playerId);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Player info (include private data) test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, has value for 'username' and 'email'", function(done) {
			api.playerInfo(mock.env.playerId)
				.then((result) => {
					expect(result).not.toBe(null);
					expect(result.response.player.username).toEqual(mock.env.playerId);
					expect(result.response.player.email).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("List player (basic information) test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, return 2 player info, and has correct value of 'username' for each player info returned", function(done) {
			api.listPlayer([mock.env.playerId, mock.env.playerId2])
				.then((result) => {
					expect(result).not.toBe(null);
					expect(result.response.player[0].username).toEqual(mock.env.playerId);
					expect(result.response.player[1].username).toEqual(mock.env.playerId2);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Detailed Player Info (public data only) test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, username matched, and has value for 'percent_of_level'", function(done) {
			api.playerDetailedPublicInfo(mock.env.playerId)
				.then((result) => {
					expect(result).not.toBe(null);
					expect(result.response.player.username).toEqual(mock.env.playerId);
					expect(result.response.player.percent_of_level).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Detailed Player Info (include private data) test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, username matched, and has value for 'percent_of_level'", function(done) {
			api.playerDetailedPublicInfo(mock.env.playerId)
				.then((result) => {
					expect(result).not.toBe(null);
					expect(result.response.player.username).toEqual(mock.env.playerId);
					expect(result.response.player.percent_of_level).not.toBe(null);
					expect(result.response.player.email).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("List custom fields of player test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, at least result is not null", function(done) {
			api.playerDetailedPublicInfo(mock.env.playerId)
				.then((result) => {
					expect(result).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Set custom field of player test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.playerDetailedPublicInfo(mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Register & Delete test", function() {

		var playerId = "testuser";
		var email = "test@gmail.com";
		var phoneNumber = "+66861111111";
		var firstName = "Test User";
		var lastName = "Userke";

		beforeAll(function(done) {
			done();
		});

		it("should return success, be able to register playerId, check its values, and remove it.", function(done) {
			api.register(playerId, email, {phone_number : phoneNumber, first_name : firstName, last_name : lastName})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, get playerId information to check for validaity of registered playerId", function(done) {
			api.playerInfo(playerId)
				.then((result) => {
					expect(result.response.player.username).toEqual(playerId);
					expect(result.response.player.email).toEqual(email);
					expect(result.response.player.phone_number).toEqual(phoneNumber);
					expect(result.response.player.first_name).toEqual(firstName);
					expect(result.response.player.last_name).toEqual(lastName);
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should be able to remove registered player", function(done) {
			api.delete(playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Update test", function() {
		var playerId = window.mock.env.playerId;
		var email = "test-updated-copy@gmail.com";
		var emailOriginal = "test-original-copy@gmail.com";

		beforeAll(function(done) {
			done();
		});

		it("should update player's info", function(done) {
			api.update(playerId, {email : email})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should have updated email field as it's updated", function(done) {
			api.playerInfo(playerId)
				.then((result) => {
					expect(result.response.player.email).toEqual(email);
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should be able to update player's email back to normal", function(done) {
			api.update(playerId, {email : emailOriginal})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should have updated email field back to original value", function(done) {
			api.playerInfo(playerId)
				.then((result) => {
					expect(result.response.player.email).toEqual(emailOriginal);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Verify player email test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should be able to send verfiying email to player", function(done) {
			api.verifyPlayerEmail(window.mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Login test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should be able to login for player", function(done) {
			api.login(window.mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Request OTP test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should be able to send one-time-password to player's mobile phone, or it's okay if 'Limit exceed'", function(done) {
			api.requestOTP(window.mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { 
					// allow 'Limit exceed' error type to be treated as success
					if (e.message.search('Limit Exceed') > -1) {
						done();
					}
					else { console.log(e.message); }
				});
		});
	});

	describe("Request OTP for setup phone test", function() {
		var phoneNumber;

		beforeAll(function(done) {
			done();
		});

		it("should get phone number from player info", function(done) {
			api.playerInfo(window.mock.env.playerId)
				.then((result) => {
					expect(result.response.player.phone_number).not.toBe(null);
					expect(result.response.player.phone_number).not.toBe("");

					// save phone number
					phoneNumber = result.response.player.phone_number;

					done();
				}, (e) => { console.log(e.message); });
		});

		it("should be able to send OTP to phone", function(done) {
			api.requestOTPforSetupPhone(window.mock.env.playerId, phoneNumber)
				.then((result) => {
					done();
				}, (e) => { 
					// allow 'Limit exceed' error type to be treated as success
					if (e.message.search('Limit Exceed') > -1) {
						done();
					}
					else { console.log(e.message); }
				});
		});
	});

	describe("Logout test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success indicating logging player out", function(done) {
			api.logout(window.mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("List Active Player Sessions test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success indicating that the operation is done", function(done) {
			api.listActivePlayerSessions(window.mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Points test", function() {
		beforeAll(function(done) {
			jasmine.addMatchers({
				toBePointBased: function() {
					return {
						compare: function (actual, expected) {
							return {
								pass: actual == "point" || actual == "exp"
							};
						}
					};
				}
			});
			done();
		});

		it("should return success, and there should be point and exp point-based for us to validate its existence", function(done) {
			api.points(window.mock.env.playerId)
				.then((result) => {
					expect(result.response.points[0].reward_name).toBePointBased();
					expect(result.response.points[1].reward_name).toBePointBased();
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Point test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should have 'reward_name' as 'point' for point", function(done) {
			api.point(window.mock.env.playerId, "point")
				.then((result) => {
					expect(result.response.point[0].reward_name).toEqual("point");
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should have 'reward_name' as 'exp' for exp", function(done) {
			api.point(window.mock.env.playerId, "exp")
				.then((result) => {
					expect(result.response.point[0].reward_name).toEqual("exp");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Point History test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, and request should not broken as it should understand options attached", function(done) {
			api.pointHistory(window.mock.env.playerId, {limit : 100, order : "desc", point_name : "point", offset : 0})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Action Time test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, and get time information", function(done) {
			api.actionTime(window.mock.env.playerId, "login")
				.then((result) => {
					expect(result.response.action.time).not.toBe(null);
					expect(result.response.action.action_name).toEqual("login");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Last Action test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.lastAction(window.mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Action count test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.actionCount(window.mock.env.playerId, "login")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Level test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, has value of 'level' the same as what specified", function(done) {
			api.level(1)
				.then((result) => {
					expect(result.response.level).toEqual(1);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Levels test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, has levels information of 100 elements", function(done) {
			api.levels()
				.then((result) => {
					expect(result.response.length).toEqual(100);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Badge test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.badge(window.mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Badges test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, and validate some of badges' name which matched", function(done) {
			api.allBadges(window.mock.env.playerId)
				.then((result) => {
					// note: someone should not remove these stuff from dashboard!
					expect(result.response[0].name).toEqual("badge_comment");
					expect(result.response[1].name).toEqual("badge_like");
					expect(result.response[2].name).toEqual("badge_master");
					expect(result.response[3].name).toEqual("badge_explorer");
					expect(result.response[4].name).toEqual("badge_pro");
					done();
				}, (e) => { console.log(e.message); });
		});
	});	

	describe("Rank test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, and has 2 elements", function(done) {
			api.rank("point", {limit : 2, mode : "all-time"})
				.then((result) => {
					expect(result.response.length).toEqual(2);
					expect(result.response[0].point).not.toBe(null);
					expect(result.response[1].point).not.toBe(null);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Ranks test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success, and ranks by each point-based type", function(done) {
			api.ranks(100, {mode: "weekly"})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Goods test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.goods(window.mock.env.playerId, {tags: "dummy", status: "all"})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Quest of Player test", function() {

		var questId = "57ee78dbb350cf03048c1ea9";
		var playerId = window.mock.env.playerId;

		beforeAll(function(done) {
			done();
		});

		it("should return success, and positive in validating some of its fields", function(done) {
			api.questOfPlayer(playerId, questId)
				.then((result) => {
					expect(result.response.quest.quest_name).toEqual("Test Quest 1");
					expect(result.response.quest.tags[0]).toEqual("test");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Quest List of Player test", function() {

		var playerId = window.mock.env.playerId;

		beforeAll(function(done) {
			jasmine.addMatchers({
				toBeMoreThanZero: function() {
					return {
						compare: function (actual, expected) {
							return {
								pass: actual > 0
							};
						}
					};
				}
			});
			done();
		});

		it("should return success, and got null at result", function(done) {
			api.questListOfPlayer(playerId, {tags: "something-odd-and-should-not-be-there"})
				.then((result) => {
					expect(result.response.quests).toBe(null);
					done();
				}, (e) => { console.log(e.message); }); 
		});

		it("should return success, and validated for some of its fields", function(done) {
			api.questListOfPlayer(playerId)
				.then((result) => {
					expect(result.response.quests.length).toBeMoreThanZero();
					expect(result.response.quests[0].quest_name).toEqual("Test Quest 1");
					expect(result.response.quests[0].quest_id).toEqual("57ee78dbb350cf03048c1ea9");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("All Quests of Player test", function() {

		var playerId = window.mock.env.playerId;

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.allQuestsOfPlayer(playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Quest Reward History test", function() {

		var playerId = window.mock.env.playerId;

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.questRewardHistory(playerId, {offset: 0, limit: 5})
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Deduct Reward test", function() {

		var playerId = window.mock.env.playerId;

		beforeAll(function(done) {
			done();
		});

		it("should return success on deduct with amount 0, its 'old_value' and 'new_value' should equal, and 'value_deducted' is 0", function(done) {
			api.deductReward(playerId, "point", 0)
				.then((result) => {
					expect(result.response.old_value).toEqual(result.response.new_value);
					expect(result.response.value_deducted).toEqual(0);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Player Referral Code test", function() {

		var playerId = window.mock.env.playerId;

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.playerReferralCode(playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});