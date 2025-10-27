
/**
 * 
 * hxAri | common.js
 * 
 * @author hxAri
 * @github https://github.com/hxAri/hxAri
 * @license MIT
 * 
 * Copyright (c) 2022 Ari Setiawan | hxAri
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

import { Not } from "./logics";
import { Typed } from "./types";


/**
 * Binary to hexadecimal.
 *
 * @param {String} string
 * @param {String} separator
 *
 * @returns {String}
 * 
 */
const bin2hex = function( string, separator ) {
	var results = [];
	for( let i=0; i<string.length; i++ ) {
		results.push( string.charCodeAt( i ).toString( 16 ) );
	}
	if( Not( separator, String ) ) {
		separator = "";
	}
	return results.join( separator );
};

/**
 * Choice
 *
 * Return a random pick from an Array or Object.
 *
 * @param {Array<T>} values
 *
 * @returns {T}
 * 
 * @throws {TypeError} Throws whether empty array passed
 * 
 */
const choice = function( values ) {
	if( Typed( values, Array ) ) {
		if( values.length > 0 ) {
			return values[Math.floor( Math.random() * values.length )];
		}
		throw new TypeError( "Cannot return value from an empty array" );
	}
	return Choice( Object.values( values ) );
};

/**
 * Return array difference values.
 * 
 * @param {Array<T>} source
 * @param {Array<T>} target
 * 
 * @returns {Array<T>}
 * 
 */
const difference = function( source, target ) {
	if( Not( source, Array ) ) {
		throw new Error( Fmt( "Invalid \"source\" parameter, value type must be Array, {} passed", Typed( source ) ) );
	}
	if( Not( target, Array ) ) {
		throw new Error( Fmt( "Invalid \"target\" parameter, value type must be Array, {} passed", Typed( target ) ) );
	}
	return source.filter( function( value ) {
		return target.indexOf( value ) <= -1;
	});
};
	
/**
 * Return if device is mobile.
 *
 * @param {Boolean} optional
 *
 * @returns {Boolean}
 * 
 */
const isMobile = function( optional ) {
	const maxTouchPoints = "ontouchstart" in window && navigator.maxTouchPoints >= 1;
	return Typed( optional, Boolean ) ? isMobile() === optional && isMobileUserAgent( optional ) : isMobileUserAgent() || maxTouchPoints;
};
	
/**
 * Returns whether current browser is mobile browser
 * 
 * @params {?Boolean} optional
 * 
 * @returns {Boolean}
 * 
 */
const isMobileUserAgent = function( optional ) {
	const searchs = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];
	return Typed( optional, Boolean ) ? isMobileUserAgent() === optional : searchs.some( device => navigator.userAgent.match( device ) );
}

/**
 * Text or string shortener.
 *
 * @param {String} string
 * @param {Number} max
 *
 * @returns {String}
 *  Shorted string
 * 
 */
const shorttext = function( string, max ) {
	var string = String( string );
	var length = string.length;
	return length >= max ? string.substring( 0, parseInt( max ) -3 ).trim() + "..." : string;
};

export {
	bin2hex,
	choice,
	difference,
	isMobile,
	isMobileUserAgent,
	shorttext
};
