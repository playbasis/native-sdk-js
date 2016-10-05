describe("Store Organize API Tests", function() {

	var api;
	var mock;

	beforeAll(function(done) {
		api = Playbasis.storeOrganizeApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("List Organizations test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listOrganizations()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, and validate fields. Requested via options", function(done) {
			api.listOrganizations({search: "Organize 1"})
				.then((result) => {
					expect(result.response.results).not.toBe(null);
					expect(result.response.results.length == 1).toBe(true);
					expect(result.response.results[0].name).toEqual("Organize 1");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("List Nodes test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.listNodes()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success, and validate fields. Requested via options", function(done) {
			api.listNodes({search: "Node 1"})
				.then((result) => {
					expect(result.response.results).not.toBe(null);
					expect(result.response.results.length == 1).toBe(true);
					expect(result.response.results[0].name).toEqual("Node 1");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Add Player to Node test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865";	// "Node 1"

		// ensure that player has removed from node first
		beforeAll(function(done) {
			api.removePlayerFromNode(nodeId, mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { 
					// if player doesn't exist, then we take that as success
					if (e.code == 2403) {
						done();
					}
					else {
						console.log(e.message);
					} 
				});
		});

		it("should return success", function(done) {
			api.addPlayerToNode(nodeId, mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Remove Player from Node test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"

		beforeAll(function(done) {

			// we need to ensure player is already in the node
			api.addPlayerToNode(nodeId, mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { 
					// player already exists with current node, then we accept it as success
					if (e.code == 2402) {
						done();
					}
					else {
						console.log(e.message); 
					}
				});
		});

		it("should return success", function(done) {
			api.removePlayerFromNode(nodeId, mock.env.playerId)
				.then((result) => {
					done(); 
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Set Player Role test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"
		var role = "observer";

		beforeAll(function(done) {

			// we need to ensure player is already in the node
			api.addPlayerToNode(nodeId, mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { 
					// player already exists with current node, then we accept it as success
					if (e.code == 2402) {
						done();
					}
					else {
						console.log(e.message); 
					}
				});
		});

		it("should return success", function(done) {
			api.setPlayerRole(nodeId, mock.env.playerId, role)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Unset Player Role test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"
		var role = "observer";

		// ensure both adding to node, and setting role to player
		beforeAll(function(done) {
			// we need to ensure player is already in the node
			api.addPlayerToNode(nodeId, mock.env.playerId)
				.then((result) => {
					done();
					// now try to set role to player first
					return api.setPlayerRole(nodeId, mock.env.playerId, role);
				}, (e) => { 
					// player already exists with current node, then we accept it as success
					if (e.code == 2402) {
						done();
					}
					else {
						console.log(e.message); 
					}
				})
				.then((result) => {
					// successfully set role to player
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success", function(done) {
			api.unsetPlayerRole(nodeId, mock.env.playerId, role)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Get Player List from Node", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"
		var role = "observer";

		// ensure both adding player to node, and setting role to player
		beforeAll(function(done) {
			// we need to ensure player is already in the node
			api.addPlayerToNode(nodeId, mock.env.playerId)
				.then((result) => {
					done();
					// now try to set role to player first
					return api.setPlayerRole(nodeId, mock.env.playerId, role);
				}, (e) => { 
					// player already exists with current node, then we accept it as success
					if (e.code == 2402) {
						done();
						// now try to set role to player first
						return api.setPlayerRole(nodeId, mock.env.playerId, role);
					}
					else {
						console.log(e.message); 
					}
				})
				.then((result) => {
					// successfully set role to player
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return mocking player id", function(done) {
			api.listPlayerFromNode(nodeId)
				.then((result) => {
					expect(result.response).not.toBe(null);
					expect(result.response.length > 0).toBe(true);

					// at least player id returned should have our mocking player id
					var found = false;
					for (var i=0; i < result.response.length; i++) {
						var id = result.response[i].player_id;
						if (id == mock.env.playerId) {
							found = true;
							break;
						}
					}
					expect(found).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Peer Leaderboard test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.peerLeaderboard(nodeId, "point")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Peer Leaderboard by Action test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"
		var action = "click";
		var parameter = "url";

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.peerLeaderboardByAction(nodeId, action, parameter)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Find Child Nodes test", function() {

		var nodeId = "57f4ca1bb350cf2b048b5a03"; 	// node 2-1 has 2 childs

		beforeAll(function(done) {
			done();
		});

		it("should return success with 2 nodes", function(done) {
			api.findChildNodes(nodeId, 0)
				.then((result) => {
					expect(result.response.results).not.toBe(null);

					// at least 2 childs as we set, but for flexibility lessen its condition by using >=
					expect(result.response.results.length >= 2).toBe(true);
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Sale Report test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.saleReport(nodeId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Sale History test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.saleHistory(nodeId, 12)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Sale Board test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"

		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.saleBoard(nodeId, 0)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Add Content to Node test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"
		var contentNodeId = "001";

		// ensure that content node is removed first before adding
		beforeAll(function(done) {
			api.removeContentFromNode(nodeId, contentNodeId)
				.then((result) => {
					done();
				}, (e) => { 
					// content node doesn't exist, we take it as success
					if (e.code == 2421) {
						done();
					}
					else {
						console.log(e.message);
					}
				});
		});

		it("should return success", function(done) {
			api.addContentToNode(nodeId, contentNodeId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Remove Content to Node test", function() {

		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"
		var contentNodeId = "001";

		// ensure that content node is added first before removing
		beforeAll(function(done) {
			api.addContentToNode(nodeId, contentNodeId)
				.then((result) => {
					done();
				}, (e) => { 
					// content node already existed, we take it as success
					if (e.code == 2420) {
						done();
					}
					else {
						console.log(e.message);
					}
				});
		});

		it("should return success", function(done) {
			api.removeContentFromNode(nodeId, contentNodeId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Set Content Role test", function() {
		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"
		var contentNodeId = "001";
		var role = "firstContent";

		// ensure that content is added to node
		// no need to unset content role as we can override it
		beforeAll(function(done) {
			api.addContentToNode(nodeId, contentNodeId)
				.then((result) => {
					done();
				}, (e) => { 
					// if content does already existed, then it's ok too
					if (e.code == 2420) {
						done();
					}
					else {
						console.log(e.message);
					}
				});
		});

		it("should return success", function(done) {
			api.setContentRole(nodeId, contentNodeId, role)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Unset Content Role test", function() {
		var nodeId = "57f4c9e9b350cf49048b5865"; // "Node 1"
		var contentNodeId = "001";
		var role = "firstContent";

		// ensure that content is added to node
		// then ensure that content's role is set first
		beforeAll(function(done) {
			// add content to node first
			api.addContentToNode(nodeId, contentNodeId)
				.then((result) => {
					done();

					// set content role
					return api.setContentRole(nodeId, contentNodeId, role);
				}, (e) => { 
					// if content does already existed, then it's ok too
					if (e.code == 2420) {
						done();

						// set content role
						return api.setContentRole(nodeId, contentNodeId, role);
					}
					else {
						console.log(e.message);
					}
				}).
				then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success", function(done) {
			api.unsetContentRole(nodeId, contentNodeId, role)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});