'use strict';

module.exports = function() {

	// occupy the global variable of Playbasis, then create a simple base class
	var Playbasis = function() {
		var me = this;
		return me;
	};

	// default settings of Playbasis's calling to API
	Playbasis.static = {
		defaults: {
			global: {
				baseUrl: null,
				baseAsyncUrl: null,
			}
		}
	};

	// volatile options that can be set
	Playbasis.env = {
		global : {
			baseUrl: null,
			baseAsyncUrl: null,
			apiKey: null,			// TODO: secure this later
			apiSecret: null,		// TODO: secure this later
			token: null				// TODO: secure this later
		}
	};

	// utilize bluebird for promise
	Playbasis.Promise = require("bluebird");

	// set internal playbasis object
	Playbasis.Playbasis = new Playbasis();

	return Playbasis;
};