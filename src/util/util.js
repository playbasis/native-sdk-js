'use strict';

/**
 * Playbasis Util API
 * @namespace Playbasis.util
 */
module.exports = function(Playbasis) {

	// global object
	var util = Playbasis.util = {};

	// private function
	var _suffixUrl = function(url, favored) {
		var components = url.split(".");
		var fileName = components[0];
		if (favored == "80x80") {
			fileName += "-80x80";
		}
		else if (favored == "240x240") {
			fileName += "-240x240";
		}

		return fileName + "." + components[1];	
	}

	/**
	 * Return thumbnail url for different size from the specified original image url.
	 * @param {String} imageUrl original image url
	 * @param {String} favored size of image to get is url from. It can be "80x80" | "240x240".
	 * @return {Object}            Promise object
	 * @method auth
	 * @memberOf Playbasis.util
	 */
	util.getThumbnailURL = function(imageUrl, favored) 
	{
		var components = imageUrl.split("/");
		components[components.length-1] = _suffixUrl(components[components.length-1], favored);
		var finalUrl = components[0];
		var isUpdatedDataComponent = false;

		for (var i=1; i<components.length; i++) {
			// replace "data" with "cache" as early of traveral of array and only once
			if (!isUpdatedDataComponent && components[i] == "data") {
				isUpdatedDataComponent = true;
				components[i] = "cache/data";
			}
			finalUrl += "/" + components[i];
		}

		return finalUrl;
	}
}