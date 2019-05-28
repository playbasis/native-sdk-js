'use strict';

module.exports = function() {
	if (!window.cfg_baseUrl) {
		console.error('cfg_baseUrl cannot be empty');
		alert('cfg_baseUrl cannot be empty');
	}

	if (!window.cfg_baseAsyncUrl) {
		console.error('cfg_baseAsyncUrl cannot be empty');
		alert('cfg_baseAsyncUrl cannot be empty');
	}

	if (!window.cfg_apiKey) {
		console.error('cfg_apiKey cannot be empty');
		alert('cfg_apiKey cannot be empty');
	}

	if (!window.cfg_apiSecret) {
		console.error('cfg_apiSecret cannot be empty');
		alert('cfg_apiSecret cannot be empty');
	}

	console.log('cfg_baseUrl', window.cfg_baseUrl);
	console.log('cfg_baseAsyncUrl', window.cfg_baseAsyncUrl);
	console.log('cfg_apiKey', window.cfg_apiKey);
	console.log('cfg_apiSecret', window.cfg_apiSecret);

	// occupy the global variable of Playbasis, then create a simple base class
	var Playbasis = function() {
		var me = this;
		return me;
	};

	// default settings of Playbasis's calling to API
	Playbasis.static = {
		defaults: {
			global: {
				baseUrl: window.cfg_baseUrl,
				baseAsyncUrl: window.cfg_baseAsyncUrl,
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

	// utilize bluebird for promise
	Playbasis.Promise = require("bluebird");

	// set internal playbasis object
	Playbasis.Playbasis = new Playbasis();

	return Playbasis;
};