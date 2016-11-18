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
	 * @param  {Object} text 			Text data to add into generated qrcode
	 * @param {Object} options (**optional**) option as Object.  
	 * It can include  
	 * {  
	 * `size`: *String* = 'small' | 'medium' | 'large'. Default is 'medium'  
	 * `type`: *Number* = 1-40  
	 * `error_correction_level`: *String* = 'L', 'M', 'Q', 'H'  
	 * }
	 * @return {String}          img tag string containing embedded Qr Code image.
	 * @method  generate
	 * @memberOf Playbasis.qrCode
	 */
	qr.generate = function(text, options)
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
		return qr.createImgTag(sizeNum);
	}
}