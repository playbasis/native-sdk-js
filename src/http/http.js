'use strict';

module.exports = function(Playbasis) {

	// use helpers
	var helpers = Playbasis.helpers;

	// Global Playbasis's helpers object for utility methods and classes
	var http = Playbasis.http = {};

	http.get = function(url, callback)
	{
		var xmlHttp = new XMLHttpRequest();
		if (callback != null)
		{
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == XMLHttpRequest.DONE) {
					callback(helpers.createHttpLevelStatusObj(xmlHttp.status, xmlHttp.statusText), xmlHttp.responseText);
				}
			}
		}
		xmlHttp.open("GET", url, true);
		xmlHttp.send(null);
	};

	http.geth = function(url, headersKvp, callback)
	{
		var xmlHttp = new XMLHttpRequest();
		if (callback != null)
		{
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == XMLHttpRequest.DONE) {
					callback(helpers.createHttpLevelStatusObj(xmlHttp.status, xmlHttp.statusText), xmlHttp.responseText);
				}
			}
		}
		xmlHttp.open("GET", url, true);
		if (headersKvp != null) {
			for (var key in headersKvp) {
				xmlHttp.setRequestHeader(key, headersKvp[key]);
			}
		}
		xmlHttp.send(null);
	};

	http.getJson = function(url, callback)
	{
		var xmlHttp = new XMLHttpRequest();
		if (callback != null)
		{
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == XMLHttpRequest.DONE) {
					callback(helpers.createHttpLevelStatusObj(xmlHttp.status, xmlHttp.statusText), helpers.jsonStrToObj(xmlHttp.responseText));
				}
			}
		}
		xmlHttp.open("GET", url, true);
		xmlHttp.send(null);
	};

	http.getJsonh = function(url, headersKvp, callback)
	{
		var xmlHttp = new XMLHttpRequest();
		if (callback != null)
		{
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == XMLHttpRequest.DONE) {
					callback(helpers.createHttpLevelStatusObj(xmlHttp.status, xmlHttp.statusText), helpers.jsonStrToObj(xmlHttp.responseText));
				}
			}
		}
		xmlHttp.open("GET", url, true);
		if (headersKvp != null) {
			for (var key in headersKvp) {
				xmlHttp.setRequestHeader(key, headersKvp[key]);
			}
		}
		xmlHttp.send(null);
	};

	http.post = function(url, postDataKvp, callback)
	{
		var xmlHttp = new XMLHttpRequest();
		if (callback != null) {
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == XMLHttpRequest.DONE) {
					callback(helpers.createHttpLevelStatusObj(xmlHttp.status, xmlHttp.statusText), xmlHttp.responseText);
				}
			}
		}
		xmlHttp.open("POST", url, true);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		var encodedDataParams = "";
		if (postDataKvp != null) {
			var keys = Object.keys(postDataKvp);
			var count = keys.length;

			for (var i=0; i<count; i++)
			{
				encodedDataParams += encodeURIComponent(keys[i]) + "=" + encodeURIComponent(postDataKvp[keys[i]]);

				if (i < count)
					encodedDataParams += "&";
			}
		}

		xmlHttp.send(encodedDataParams);
	}

	http.postJson = function(url, postDataKvp, callback)
	{
		var xmlHttp = new XMLHttpRequest();
		if (callback != null) {
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == XMLHttpRequest.DONE) {
					callback(helpers.createHttpLevelStatusObj(xmlHttp.status, xmlHttp.statusText), helpers.jsonStrToObj(xmlHttp.responseText));
				}
			}
		}
		xmlHttp.open("POST", url, true);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		var encodedDataParams = "";
		if (postDataKvp != null) {
			var keys = Object.keys(postDataKvp);
			var count = keys.length;

			for (var i=0; i<count; i++)
			{
				encodedDataParams += encodeURIComponent(keys[i]) + "=" + encodeURIComponent(postDataKvp[keys[i]]);

				if (i < count-1)
					encodedDataParams += "&";
			}
		}

		xmlHttp.send(encodedDataParams);
	}
}