'use strict';

/**
 * Playbasis Vendors - Barcode Generator
 * @namespace Playbasis.barCode
 */
module.exports = function(Playbasis) {

	// vendor barcode-generator
	var _vendorJSBarCode = require('jsbarcode');
	// Global wrapped barcode functionality inside Playbasis
	var bc = Playbasis.barCode = {};

	/**
	 * Generate barcode and attach result to target element.
	 * Result from this call, target element will have barcode rendered.
	 * @param {String} targetElement Target element can either be "#elementname" or ".classname". Use the former to render barcode to specific element. Otherwise use the latter, so you can use that class name to apply to multiple of elements.
	 * @param  {Object} text 			Text data to add into generated qrcode
	 * @param {Object} options (**optional**) option as Object.  
	 * It can include  
	 * {  
	 * `format`: *String* = select which format to use to render barcode. It can be "UPC" | "EAN2" | "EAN5" | "EAN8" | "EAN13" | "CODE39" | "ITF14" | "MSI" | "PHARMACODE". Otherwise if not specify, it will be default to use code-128 style.  
	 * `width`: *Number* = width of single bar. Default is 2.  
	 * `height`: *Number* = height of the barcode. Default is 100.  
	 * `text`: *String* = override text that is displayed. Default is undefined.  
	 * `fontOptions`: *String* = you can add bold, and italic style to text. It can be "bold" | "italic" | "bold italic". Default is "".  
	 * `font`: *String* = define the font family used to display text. This can be any default font or a font defined by a @font-face rule. Default is "monospace".  
	 * `textAlign`: *String* = set horizontal alignment of text. It can be "left" | "center" | "right". Default is "center".  
	 * `textPosition`: *String* = set vertical position of text. It can be "bottom" | "top". Default is "bottom".  
	 * `textMargin`: *Number* = set the space between the barcode and text. Default is 2.  
	 * `fontSize`: *Number* = set size of text. Default is 20.  
	 * `background`: *String* = set background color of barcode. Default is "#ffffff".  
	 * `lineColor`: *String* = set line color of barcode. Default is "#000000".  
	 * `margin`: *Number* = set space margin around barcode. If nothing else is set, all side will inherit the margins property but can be replaced it you want to set them separately. Default is 10.  
	 * `marginLeft`: *Number* = set space margin left of barcode. Default is 10.  
	 * `marginRight`: *Number* = set space margin right of barcode. Default is 10.  
	 * `marginTop`: *Number* = set space margin top of barcode. Default is 10.  
	 * `marginBottom`: *Number* = set space margin bottom of barcode. Default is 10.   
	 * }
	 * @method  generate
	 * @memberOf Playbasis.barCode
	 */
	bc.generate = function(targetElement, text, options)
	{
		if (options == null) {
			_vendorJSBarCode(targetElement, text);
		}
		else {
			_vendorJSBarCode(targetElement, text, options);
		}
	}
}