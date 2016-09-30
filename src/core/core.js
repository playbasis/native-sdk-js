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
				baseUrl: "https://api.pbapp.net",
				baseAsyncUrl: "https://api.pbapp.net/async/call",
			}
		}
	};

	// volatile options that can be set
	Playbasis.env = {
		global : {
			baseUrl: Playbasis.static.defaults.global.baseUrl,
			baseAsyncUrl: Playbasis.static.defaults.global.baseAsyncUrl,
			apiKey: null,			// TODO: secure this later
			apiSecret: null,		// TODO: secure this later
			token: null				// TODO: secure this later
		}
	};

	Playbasis.Playbasis = new Playbasis();

	return Playbasis;
};