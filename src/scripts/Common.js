
// Import Scripts.
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";

export default {
	
	/**
	 * Binary to hexadecimal.
	 *
	 * @params String string
	 * @params String separator
	 *
	 * @return String
	 */
	bin2hex: function( string, separator ) {
		var results = [];
		for( let i=0; i<string.length; i++ ) {
			results.push( string.charCodeAt( i ).toString( 16 ) );
		}
		if( Not( separator, String ) ) {
			separator = "";
		}
		return results.join( separator );
	},
	
	/**
	 * Return if device is mobile.
	 *
	 * @param {Boolean} optional
	 *
	 * @return Boolean
	 */
	isMobile: function( optional ) {
		const maxTouchPoints = "ontouchstart" in window && navigator.maxTouchPoints >= 1;
		return Type( optional, Boolean ) ? this.isMobile() === optional && this.isMobileUserAgent( optional ) : this.isMobileUserAgent() || maxTouchPoints;
	},
	
	isMobileUserAgent: function( optional ) {
		const searchs = [
			/Android/i,
			/webOS/i,
			/iPhone/i,
			/iPad/i,
			/iPod/i,
			/BlackBerry/i,
			/Windows Phone/i
		];
		return Type( optional, Boolean ) ? this.isMobileUserAgent() === optional : searchs.some( device => navigator.userAgent.match( device ) );
	}
	
};