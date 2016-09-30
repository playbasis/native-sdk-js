describe("Player Api Tests", function() {

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

		it("should get status code of 0, and has proper values of player info", function(done) {
			api.playerPublicInfo(mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result).not.toBe(null);
				done();
			});
		});
	});

	describe("Player info (include private data) test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, has value for 'username' and 'email'", function(done) {
			api.playerInfo(mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result).not.toBe(null);
				expect(result.player.username).toEqual(mock.env.playerId);
				expect(result.player.email).not.toBe(null);
				done();
			});
		});
	});

	describe("List player (basic information) test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, return 2 player info, and has correct value of 'username' for each player info returned", function(done) {
			api.listPlayer([mock.env.playerId, mock.env.playerId2], function(status, result) {
				expect(status.code).toEqual(0);
				expect(result).not.toBe(null);
				expect(result.player[0].username).toEqual(mock.env.playerId);
				expect(result.player[1].username).toEqual(mock.env.playerId2);
				done();
			});
		});
	});

	describe("Detailed Player Info (public data only) test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, username matched, and has value for 'percent_of_level'", function(done) {
			api.playerDetailedPublicInfo(mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result).not.toBe(null);
				expect(result.player.username).toEqual(mock.env.playerId);
				expect(result.player.percent_of_level).not.toBe(null);
				done();
			});
		});
	});

	describe("Detailed Player Info (include private data) test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, username matched, and has value for 'percent_of_level'", function(done) {
			api.playerDetailedPublicInfo(mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result).not.toBe(null);
				expect(result.player.username).toEqual(mock.env.playerId);
				expect(result.player.percent_of_level).not.toBe(null);
				expect(result.player.email).not.toBe(null);
				done();
			});
		});
	});

	describe("List custom fields of player test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, at least result is not null", function(done) {
			api.playerDetailedPublicInfo(mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result).not.toBe(null);
				done();
			});
		});
	});

	describe("Set custom field of player test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0", function(done) {
			api.playerDetailedPublicInfo(mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
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

		it("should get status code of 0, be able to register playerId, check its values, and remove it.", function(done) {
			api.register(playerId, email, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			}, {phone_number : phoneNumber, first_name : firstName, last_name : lastName});
		});

		it("should get status code of 0, get playerId information to check for validaity of registered playerId", function(done) {
			api.playerInfo(playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.player.username).toEqual(playerId);
				expect(result.player.email).toEqual(email);
				expect(result.player.phone_number).toEqual(phoneNumber);
				expect(result.player.first_name).toEqual(firstName);
				expect(result.player.last_name).toEqual(lastName);
				done();
			});
		});

		it("should be able to remove registered player", function(done) {
			api.delete(playerId, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
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
			api.update(playerId, {email : email}, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
		});

		it("should have updated email field as it's updated", function(done) {
			api.playerInfo(playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.player.email).toEqual(email);
				done();
			});
		});

		it("should be able to update player's email back to normal", function(done) {
			api.update(playerId, {email : emailOriginal}, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
		});

		it("should have updated email field back to original value", function(done) {
			api.playerInfo(playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.player.email).toEqual(emailOriginal);
				done();
			});
		});
	});

	describe("Verify player email test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should be able to send verfiying email to player", function(done) {
			api.verifyPlayerEmail(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
		});
	});

	describe("Login test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should be able to login for player", function(done) {
			api.login(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
		});
	});

	describe("Request OTP test", function() {
		beforeAll(function(done) {
			jasmine.addMatchers({
				toBeZeroOrThree: function() {
					return {
						compare: function (actual, expected) {
							return {
								pass: actual == 0 || actual == 3
							};
						}
					};
				}
			});
			done();
		});

		it("should be able to send one-time-password to player's mobile phone, or it's okay if 'Limit exceed'", function(done) {
			api.requestOTP(window.mock.env.playerId, function(status, result) {
				expect(status.code).toBeZeroOrThree();
				done();
			});
		});
	});

	describe("Request OTP for setup phone test", function() {
		var phoneNumber;

		beforeAll(function(done) {
			jasmine.addMatchers({
				toBeZeroOrThree: function() {
					return {
						compare: function (actual, expected) {
							return {
								pass: actual == 0 || actual == 3
							};
						}
					};
				}
			});
			done();
		});

		it("should get phone number from player info", function(done) {
			api.playerInfo(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.player.phone_number).not.toBe(null);
				expect(result.player.phone_number).not.toBe("");

				// save phone number
				phoneNumber = result.player.phone_number;

				done();
			});
		});

		it("should be able to send OTP to phone", function(done) {
			api.requestOTPforSetupPhone(window.mock.env.playerId, phoneNumber, function(status, result) {
				expect(status.code).toBeZeroOrThree();
				done();
			});
		});
	});

	describe("Logout test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0 indicating logging player out", function(done) {
			api.logout(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
		});
	});

	describe("List Active Player Sessions test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0 indicating that the operation is done", function(done) {
			api.listActivePlayerSessions(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
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

		it("should get status code of 0, and there should be point and exp point-based for us to validate its existence", function(done) {
			api.points(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.points[0].reward_name).toBePointBased();
				expect(result.points[1].reward_name).toBePointBased();
				done();
			});
		});
	});

	describe("Point test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should have 'reward_name' as 'point' for point", function(done) {
			api.point(window.mock.env.playerId, "point", function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.point[0].reward_name).toEqual("point");
				done();
			});
		});

		it("should have 'reward_name' as 'exp' for exp", function(done) {
			api.point(window.mock.env.playerId, "exp", function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.point[0].reward_name).toEqual("exp");
				done();
			});
		});
	});

	describe("Point History test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, and request should not broken as it should understand options attached", function(done) {
			api.pointHistory(window.mock.env.playerId, function(status, text) {
				expect(status.code).toEqual(0);
				done();
			}, {limit : 100, order : "desc", point_name : "point", offset : 0});
		});
	});

	describe("Action Time test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, and get time information", function(done) {
			api.actionTime(window.mock.env.playerId, "login", function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.action.time).not.toBe(null);
				expect(result.action.action_name).toEqual("login");
				done();
			});
		});
	});

	describe("Last Action test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0", function(done) {
			api.lastAction(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
		});
	});

	describe("Action count test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0", function(done) {
			api.actionCount(window.mock.env.playerId, "login", function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
		});
	});

	describe("Level test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, has value of 'level' the same as what specified", function(done) {
			api.level(1, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.level).toEqual(1);
				done();
			});
		});
	});

	describe("Levels test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, has levels information of 100 elements", function(done) {
			api.levels(function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.length).toEqual(100);
				done();
			});
		});
	});

	describe("Badge test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0", function(done) {
			api.badge(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			});
		});
	});

	describe("Badges test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, and validate some of badges' name which matched", function(done) {
			api.allBadges(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);

				// note: someone should not remove these stuff from dashboard!
				expect(result[0].name).toEqual("badge_comment");
				expect(result[1].name).toEqual("badge_like");
				expect(result[2].name).toEqual("badge_master");
				expect(result[3].name).toEqual("badge_explorer");
				expect(result[4].name).toEqual("badge_pro");
				done();
			});
		});
	});	

	describe("Rank test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code of 0, and has 2 elements", function(done) {
			api.rank("point", function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.length).toEqual(2);
				expect(result[0].point).not.toBe(null);
				expect(result[1].point).not.toBe(null);
				done();
			}, {limit : 2, mode : "all-time"});
		});
	});

	describe("Ranks test", function() {
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

		it("should get status code 0, and ranks by each point-based type", function(done) {
			api.ranks(100, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.exp).not.toBe(null);
				expect(result.exp.length).toBeMoreThanZero();
				expect(result.point).not.toBe(null);
				expect(result.point.length).toBeMoreThanZero();
				done();
			}, {mode: "weekly"});
		});
	});

	describe("Goods test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should get status code 0", function(done) {
			api.goods(window.mock.env.playerId, function(status, result) {
				expect(status.code).toEqual(0);
				done();
			}, {tags: "dummy", status: "all"});
		});
	});

	describe("Quest of Player test", function() {

		var questId = "57ee78dbb350cf03048c1ea9";
		var playerId = window.mock.env.playerId;

		beforeAll(function(done) {
			done();
		});

		it("should get status code 0, and positive in validating some of its fields", function(done) {
			api.questOfPlayer(playerId, questId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.quest.quest_name).toEqual("Test Quest 1");
				expect(result.quest.tags[0]).toEqual("test");
				done();
			});
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

		it("should get status code 0, and got null at result", function(done) {
			api.questListOfPlayer(playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.quests).toBe(null);
				done();
			}, {tags: "something"});
		});

		it("should get status code 0, and validated for some of its fields", function(done) {
			api.questListOfPlayer(playerId, function(status, result) {
				expect(status.code).toEqual(0);
				expect(result.quests.length).toBeMoreThanZero();
				expect(result.quests[0].quest_name).toEqual("Test Quest 1");
				expect(result.quests[0].quest_id).toEqual("57ee78dbb350cf03048c1ea9");
				done();
			}, null );
		});
	});
});