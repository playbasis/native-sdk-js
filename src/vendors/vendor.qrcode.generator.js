'use strict';

/**
 * Playbasis Vendors - QRCode Generator
 * @namespace Playbasis.qrCode
 */
module.exports = function(Playbasis) {

	// vendor qrcode-generator
	var _vendorQrCode = require('qrcode-generator');
	// Global wrapped qrcode functionality inside Playbasis
	var qr = Playbasis.qrCode = {};

	/**
	 * Generate QRcode from specified text, and return it as img HTML tag string.
	 * @param {String} targetContainer Target container as element id name i.e. "container" to add a result generated QR code as a child img HTML element.
	 * @param  {Object} text 			Text data to add into generated qrcode
	 * @param {Object} options (**optional**) option as Object.  
	 * It can include  
	 * {  
	 * `size`: *String* = 'small' | 'medium' | 'large'. Default is 'medium'.  
	 * `type`: *Number* = 1-40  It affects the pattern of QR code. Default is 4.  
	 * `error_correction_level`: *String* = 'L', 'M', 'Q', 'H'. Error correction level relates to how well QR code can restore data in case of damaged or dirty. Please refer [here](http://www.qrcode.com/en/about/error_correction.html) for more information. In most case, you don't need to modify this value. Default is 'L'.  
	 * }
	 * @method  generate
	 * @memberOf Playbasis.qrCode
	 */
	qr.generate = function(targetContainer, text, options)
	{
		var typeNumber = 4;	// default of type number, fall back to this if not set in options
		var errorCorrectionLevel = 'L';		// default of type number, fall back to this if not set in options
		var size = 'medium';	// default of qrcode size, fall back to this if not set in options

		// use values from options if possible
		if (options != null) {
			if (options.type != null) {
				if (typeof options.type === "number") {
					typeNumber = options.type;
				}
			}

			if (options.error_correction_level != null) {
				if (typeof options.error_correction_level === "string") {
					errorCorrectionLevel = options.error_correction_level;
				}
			}

			if (options.size != null) {
				if (typeof options.size === "string") {
					size = options.size;
				}
			}
		}

		var sizeNum = 4;
		if (size == 'small') {
			sizeNum = 2;
		}
		else if (size == 'large') {
			sizeNum = 7;
		} 

		var qr = _vendorQrCode(typeNumber, errorCorrectionLevel);
		qr.addData(text);
		qr.make();
		var imgTagStr = qr.createImgTag(sizeNum);

		// append as child to target container
		document.getElementById(targetContainer).innerHTML = imgTagStr;
	}
}