
/**
 * 
 * hxAri | cookie.js
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

// Import Scripts.
import { Fmt } from "/src/scripts/formatter";
import { Not, isEmpty, isNotEmpty } from "/src/scripts/logics";
import { Typed } from "/src/scripts/types";

/**
 * Cookie utility
 *
 * A utility that provides various APIs for managing cookies.
 *
 * @param {Array<Array<String>>} set
 * @param {String} del
 * 
 */
const Cookie = function( set, del ) {
	var self = this;
	if( Typed( document, "Undefined" ) ) {
		throw new TypeError( "Object Document is not defined." );
	}
	if( Typed( set, Array ) ) {
		self.set.apply( self, set );
	}
	Typed( del, Array, () => {
		del.forEach( cookie => {
			self.del( cookie );
		})
	});
	this.load();
};

/**
 * Get cookie value.
 *
 * @param {String} name
 *
 * @returns {Boolean|String}
 * 
 */
Cookie.prototype.get = function( name ) {
	if( Typed( name, String ) ) {
		if( isNotEmpty( document.cookie ) ) {
			
			// Reload cookies.
			this.load();
			
			if( Not( this.loaded[name], "Undefined" ) ) {
				return this.loaded[name];
			}
			// Parse cookies.
			//var result = document.cookie.split( ";" ).find( r => r.replace( /\s/g, "" ).startsWith( encodeURIComponent( name ) + "=" ) );
			
			// If cookie is available.
			//if( Not( result, "Undefined" ) ) {
			//	return decodeURIComponent( result.split( "=" )[1] );
			//}
		}
		return false;
	}
	throw new TypeError( "Invalid cookie name." );
};

/**
 * Load all the cookies that have been set.
 *
 * @returns {Object}
 * 
 */
Cookie.prototype.load = function() {
	
	// Clone self.
	var self = this;
		self.loaded = {};
	
	// Explode all cookies.
	document.cookie.split( ";" ).map( part => {
		self.loaded[decodeURIComponent( part.split( "=" )[0].replace( /\s/g, "" ) )] = decodeURIComponent( part.split( "=" )[1] );
	});
	return self.loaded;
};

/**
 * List of cookies that have been set.
 *
 * @values Object
 */
Cookie.prototype.loaded = {};

/**
 * Set one or more than one cookie.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 *
 * @returns {String}
 * 
 */
Cookie.prototype.set = function( name, value, { comment, domain, expires, maxage, httponly, path = "/", samesite, secure, version = "4.1.6" } = {} ) {
	
	// Clone self.
	var self = this;
	
	// If cookies are multiple, all
	// arguments will be ignored except name.
	if( Typed( name, Array ) ) {
		
		// Set cookies by order.
		name.forEach( group => {
			
			// If the group values do not match.
			if( Typed( group ) !== "Array" ) {
				throw new TypeError( Fmt( "Multiple cookie group value must be Typed Object, \"{}\" given.", Typed( group ) ) );
			}
			self.set.apply( self, group );
		});
		
	}
	else {
		
		// If name is String type.
		if( Typed( name, String ) ) {
			
			// Raw Cookie Header.
			var header = "";
			
			// Check if the cookie name is valid.
			if( /^(?:([a-z\_])([a-z0-9\_]*))$/i.test( name ) ) {
				if( Typed( value, String ) ) {
					header = Fmt( "{}={}", encodeURIComponent( name ), encodeURIComponent( value ) );
				}
				else {
					header = Fmt( "{}=None", encodeURIComponent( name ) );
					expires = -1;
				}
			}
			else {
				throw new TypeError( "Invalid cookie name." );
			}
			
			// If the cookie has a comment.
			if( Typed( comment, String ) ) {
				header += Fmt( "; Comment=\"{}\"", comment );
			}
			
			// If the cookie has a domain name.
			if( Typed( domain, String ) ) {
				header += Fmt( "; Domain={}", domain );
			}
			
			// If the cookie has an expiration date.
			if( Typed( expires, Number ) ) {
				header += Fmt( "; expires={}", new Date( Date.now() + expires * 864e5 ).toUTCString() );
			}
			
			// If the cookie is read only the server.
			if( Typed( httponly, Boolean ) ) {
				header += httponly ? "; HttpOnly" : "";
			}
			
			// ....
			if( Typed( maxage, Number ) ) {
				header += Fmt( "; Max-Age={}", maxage );
			}
			
			// If cookies are only set in certain locations.
			if( Typed( path, String ) ) {
				
				// If the location path name is valid.
				if( /(?:^(\/\w+){0,}\/?)$/g.test( path ) ) {
					header += Fmt( "; Path={}", path );;
				}
				else {
					throw new TypeError( "Invalid path name." );
				}
			}
			
			if( Typed( samesite, String ) ) {
				switch( samesite ) {
					case "Lax":
						header += "; SameSite=Lax"; break;
					case "None":
						header += "; SameSite=None"; break;
					case "Strict":
						header += "; SameSite=Strict"; break;
					default:
						throw new TypeError( "Invalid cookie SameSite." );
				}
			}
			
			// Otherwise the cookie is only sent
			// to the server when a request is made.
			if( Typed( secure, Boolean ) ) {
				header += secure ? "; Secure" : "";
			}
			
			// If cookie has a version.
			if( Typed( version, String ) ) {
				header += Fmt( "; Version={}", version );
			}
			
			// Set cookie header.
			document.cookie = header;
			
			// Load all available cookies.
			this.load();
			
			// Returns the cookie's raw header value.
			return Fmt( "Set-Cookie: {}", header );
		}
		else {
			throw new TypeError( "Cookie name cannot be empty or null." );
		}
	}
};

export {Cookie};
