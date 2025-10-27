
/**
 * 
 * hxAri | theme.js
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

import { Cookie } from "/src/scripts/cookie.js";
import { Null, Typed } from "/src/scripts/types";

/**
 * Theme utility
 *
 * Preference themes that support
 * detection of theme colors on the device.
 *
 * @version 1.0.8
 */
const Theme = function({ set } = {}) {
	this.theme = {
		dark: {
			color: "#202521",
			token: "\x37\x61\x35\x31\x64\x61\x38\x37\x30\x63\x63\x63\x32\x34\x63\x32\x32\x35\x31\x38\x37\x31\x37\x64\x33\x63\x66\x35\x36\x64\x32\x39"
		},
		light: {
			color: "#eeeeee",
			token: "\x37\x33\x66\x65\x38\x61\x35\x35\x66\x65\x65\x35\x30\x62\x31\x65\x34\x62\x38\x31\x61\x66\x32\x65\x32\x34\x34\x36\x65\x61\x30\x34"
		}
	};
	try {
		var self = this;
		var color = set;
			color = Typed( color, "Undefined", () => self.get(), () => color );
		
		self.set( color );
	}
	catch( error ) {
		console.warn( `Theme:\x20${error}` );
	}
};

/**
 * Theme alias name.
 *
 * @values String
 */
Theme.prototype.name = "\x64\x47\x68\x6c\x62\x57\x55";

/**
 * Theme contructor results.
 *
 * @value Mixed
 */
Theme.prototype.result = null;

/**
 * Theme default color.
 *
 * @values String
 */
Theme.prototype.default = "\x6c\x69\x67\x68\x74";

/**
 * Current theme color.
 *
 * @values String
 */
Theme.prototype.color = "\x6c\x69\x67\x68\x74";

/**
 * Get current theme token.
 *
 * @returns {String}
 * 
 */
Theme.prototype.get = function() {
	try {
		
		// Get current theme color from cookie.
		var token = Cookie.prototype.get( this.name );
		
		// If token value is String type.
		if( Typed( token, String ) ) {
			
			// If token value equals with dark.
			if( token === this.theme.dark.token ) {
				return "\x64\x61\x72\x6b";
			}
		}
		else {
			
			// If device supported dark mode.
			if( window.matchMedia ) {
				
				// Check if dark.mode is activated.
				if( window.matchMedia( "(prefers-color-scheme:dark)" ).matches ) {
					return "\x64\x61\x72\x6b";
				}
			}
		}
	}
	catch( error ) {
		console.warn( `Theme.prototype.get:\x20${error}` );
	}
	return "\x6c\x69\x67\x68\x74";
};

/**
 * Set theme color.
 *
 * @param {String} color
 * 
 */
Theme.prototype.set = function( color ) {
	try {
		
		// Get token value from cookie.
		var cookie = Cookie.prototype.get( this.name );
		var defaultColor = this.default;
		
		// Normalize color.
		color = Typed( color, String, () => color, () => defaultColor );
		
		// If current cookie value does not equals.
		if( cookie !== this.theme[color].token ) {
			
			// Set current color.
			this.color = color;
			
			Cookie.prototype.set( ...[
				this.name,
				this.theme[color].token, {
					path: "/",
					expires: 30
				}
			]);
		}
		this.setHtml( color );
		this.setMeta( color );
	}
	catch( error ) {
		console.warn( `Theme.prototype.set:\x20${error}` );
	}
};

/**
 * Set theme color to HTMLHeadElement.
 *
 * @param {String} color
 *
 */
Theme.prototype.setHtml = color => document.documentElement.dataset.theme = color;

/**
 * Set theme color to HTMLMetaElement.
 *
 * @param {String} color
 * 
 */
Theme.prototype.setMeta = function( color ) {
	
	var meta = null;
	
	// Check if HTMLMetaElement has been created.
	if( Typed( meta = document.querySelector( "meta[name=\"theme-color\"]" ), Null ) ) {
		
		// Create new HTMLMetaElement.
		meta = document.createElement( "meta" );
		meta.setAttribute( "name", "theme-color" );
		
		// Append HTMLMetaElement to HTMLHeadElement.
		document.head.appendChild( meta );
	}
	meta.setAttribute( "content", this.theme[color].color );
};

export {
	Theme
};
