describe("Content API Tests", function() {

	var api;
	var mock;
	var contentTitle = "Test2-fortest";

	beforeAll(function(done) {
		api = Playbasis.contentApi;
		mock = window.mock;
		window.acquireBuiltPlaybasis();
		done();
	});

	describe("Retrieve Content test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.retrieveContent()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Count Content test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.countContent()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Create Content test", function() {

		var createdNodeId;

		// ensure that content is deleted first
		beforeAll(function(done) {

			var chain = api.retrieveContent({title: contentTitle})
				.then((result) => {
					if (result.response.result != null) {
						if (result.response.result.length == 1) {
							// save node id
							var nodeId = result.response.result[0].node_id;
							return api.deleteContent(nodeId);
						}
					}
					else {
						// not existing yet
						done();
						return null;
					}
				}, (e) => { console.log(e.message); return null; });

			// chained result of deleting content
			if (chain != null) {
				chain.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
			}
		});

		// ensure that we delete content after we are done with it
		afterAll(function(done) {
			api.deleteContent(createdNodeId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success", function(done) {
			api.createContent("Test2-fortest", "Test2-summary", "Test2-detail")
				.then((result) => {
					expect(result.response.node_id).not.toBe(null);
					// save node id for delete it after finish this test case
					createdNodeId = result.response.node_id;
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Update Content test", function() {

		var nodeId = "001"; // pre-existing content
		var summary;
		var summaryNew = "Welcome to node 1 - updated";

		// get summary field from content first
		// thus we can change it back later
		beforeAll(function(done) {
			api.retrieveContent(nodeId)
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result.length == 1).toBe(true);
					expect(result.response.result[0].node_id).toEqual(nodeId);

					// save summary
					summary = result.response.result[0].summary;
					done();
				}, (e) => { console.log(e.message); });
		});

		// update summary field back to original
		afterAll(function(done) {
			api.updateContent(nodeId, {summary: summary})
				.then((result) => { 
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success and validate updated field", function(done) {
			api.updateContent(nodeId, {summary: summaryNew})
				.then((result) => {
					return api.retrieveContent(nodeId);
				})
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result.length == 1).toBe(true);
					expect(result.response.result[0].node_id).toEqual(nodeId);
					expect(result.response.result[0].summary).toEqual(summaryNew);
					return done();
				})
				.error((e) => { console.log(e.message); });
		});
	});

	describe("Delete Content test", function() {

		var createdNodeId;

		// ensure that content is created first
		beforeAll(function(done) {

			var chain = api.retrieveContent({title: contentTitle})
				.then((result) => {
					if (result.response.result != null) {
						if (result.response.result.length == 1) {
							done();
							return null;
						}
						else if (result.response.result.length == 0) {
							return api.createContent("Test2-fortest", "Test2-summary", "Test2-detail");
						}
					}
				}, (e) => { console.log(e.message); return null; });

			// chained result of creating content
			if (chain != null) {
				chain.then((result) => {
					expect(result.response.node_id).not.toBe(null);
					// save node id for delete it after finish this test case
					createdNodeId = result.response.node_id;
					done();
				}, (e) => { console.log(e.message); });
			}
		});

		it("should return success", function(done) {
			api.deleteContent(createdNodeId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Retrieve Category test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.retrieveCategory()
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success and validate 'name' field. Requested with options 'name'.", function(done) {
			api.retrieveCategory({name: "Promotion"})
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result.length == 1).toBe(true);
					expect(result.response.result[0].name).toEqual("Promotion");
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Create / Delete Category test", function() {

		var categoryName = "TestCategory";

		// ensure that target category is deleted first
		// note: we need to retrieve it from the list, and get its id for later deleting
		beforeAll(function(done) {
			var chain = api.retrieveCategory({name: categoryName})
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result.length == 1).toBe(true);
					expect(result.response.result[0].name).toEqual(categoryName);
					var id = result.response.result[0]._id;
					return api.deleteCategory(id);
				}, (e) => { 
					// cannot found, then it's ok
					if (e.code == 2002) {
						done();
						return null;
					}
					else {
						console.log(e.message); 
						return null;
					}
				});

			// chained result to delete category
			if (chain != null) {
				chain.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
			}
		});

		// ensure we delete category
		afterAll(function(done) {
			var chain = api.retrieveCategory({name: categoryName})
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result.length == 1).toBe(true);
					expect(result.response.result[0].name).toEqual(categoryName);
					var id = result.response.result[0]._id;
					return api.deleteCategory(id);
				}, (e) => { 
					console.log(e.message); 
					return null;
				});

			// chained result to delete category
			if (chain != null) {
				chain.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
			}
		});

		it("should return success", function(done) {
			api.createCategory(categoryName)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Update Category test", function() {

		var categoryId;
		var categoryName = "Promotion"; // pre-existing category name
		var categoryNewName = "Promotion-updated";

		// ensure that we have pre-existing category
		// then get its id for later updating
		beforeAll(function(done) {
			var chain = api.retrieveCategory({name: categoryName})
				.then((result) => {
					expect(result.response.result).not.toBe(null);
					expect(result.response.result.length == 1).toBe(true);
					expect(result.response.result[0].name).toEqual(categoryName);
					categoryId = result.response.result[0]._id;
					done();
				}, (e) => { 
					console.log(e.message); 
				});
		});

		// ensure that we update category name back to original
		afterAll(function(done) {
			api.updateCategory(categoryId, categoryName)
				.then((result) => { 
					done();
				}, (e) => { console.log(e.message); });
		});

		it("should return success", function(done) {
			api.updateCategory(categoryId, categoryNewName)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	describe("Like Content test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.likeContent("001", mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});

	// TODO: Action is still unavailable, we cannot test it now
	/*describe("Dislike Content test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.dislikeContent("001", mock.env.playerId)
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});*/

	describe("Give Content Feedback test", function() {
		beforeAll(function(done) {
			done();
		});

		it("should return success", function(done) {
			api.giveFeedbackContent("001", mock.env.playerId, "This content is awesome!")
				.then((result) => {
					done();
				}, (e) => { console.log(e.message); });
		});
	});
});