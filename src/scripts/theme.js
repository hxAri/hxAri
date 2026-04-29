
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

import { choice } from "/src/scripts/common";
import { Cookie } from "/src/scripts/cookie";
import { Fmt } from "/src/scripts/formatter";
import { Null, Typed } from "/src/scripts/types";

/**
 * Theme utility
 *
 * Preference themes that support
 * detection of theme colors on the device.
 *
 */

class Palette {
	
	/**
	 * HTML Meta color code
	 * 
	 * @type {String}
	 * 
	 */
	color;
	
	/**
	 * Color palete name
	 * 
	 * @type {String}
	 * 
	 */
	name;
	
	/**
	 * Cookie token value
	 * 
	 * @type {String}
	 * 
	 */
	token;
	
	/**
	 * Construct method of class Palette
	 * 
	 * @param {String} color 
	 * @param {String} name 
	 * @param {String} token 
	 * 
	 */
	constructor( color,name, token ) {
		this.color = color;
		this.name = name;
		this.token = token;
	}
	
}

class Theme {
	
	/** @type {Cookie} */
	cookie;
	
	/**
	 * Theme current color
	 * 
	 * @type {String}
	 * 
	 */
	current;
	
	/**
	 * Theme default color
	 * 
	 * @type {String}
	 * 
	 */
	default;
	
	/** @type {String} */
	keyset;
	
	/** @type {Map<String,Palette>} */
	palettes;
	
	/**
	 * Themes default color only dark and light
	 * 
	 * @type {Map<String,Palette>}
	 * 
	 */
	themes;
	
	/**
	 * Construct method of class Theme
	 * 
	 * @param cookie {Cookie}
	 * 
	 */
	constructor( cookie ) {
		this.cookie = cookie;
		this.current = "\x6c\x69\x67\x68\x74";
		this.default = "\x6c\x69\x67\x68\x74";
		this.keyset = "\x64\x47\x68\x6c\x62\x57\x55";
		this.palettes = new Map([
			[ "adelia", new Palette( "#db7093", "adelia", "ad3Lia1Pnk927W" ) ],
			[ "liana", new Palette( "#ba55d3", "liana", "li4NaPurp818X" ) ],
			[ "periwinkle", new Palette( "#ccccff", "periwinkle", "pe4RiWnk1e818X" ) ],
			[ "peach", new Palette( "#ffdab9", "peach", "pe4ChPnk927W" ) ],
			[ "navicoral", new Palette( "#f08080", "navicoral", "na4ViCor1818X" ) ],
			[ "greensage", new Palette( "#b2ac88", "greensage", "gr4EEnSge927W" ) ],
			[ "stromi", new Palette( "#4a8db7", "stromi", "ab7ErM0B7Cgfdy9F" ) ],
			[ "turtles", new Palette( "#6bbd99", "turtles", "a7B7b9041FIPg27W" ) ]
		]);
		this.themes = new Map([
			[ "dark", new Palette( "#202521", "dark", "f5eoTwvPngzrw5ax"  ) ],
			[ "light", new Palette( "#eeeeee", "light", "dfI4Afn2sGMcMaeh" ) ]
		])
		this.set( this.get() );
	}
	
	/**
	 * Get current theme token.
	 *
	 * @returns {String}
	 * 
	 */
	get() {
		try {
			var token = this.cookie.get( this.keyset );
			if( Typed( token, String ) ) {
				for( let [ keyset, palete ] of this.palettes.entries() ) {
					if( palete.token === token ) {
						return keyset;
					}
				}
				for( let [ keyset, palete ] of this.themes.entries() ) {
					if( palete.token === token ) {
						return keyset;
					}
				}
			}
			if( window.matchMedia ) {
				if( window.matchMedia( "(prefers-color-scheme:dark)" ).matches ) {
					return "\x64\x61\x72\x6b";
				}
			}
		}
		catch( error ) {
			console.warn( `Theme.prototype.get:\x20${error}` );
		}
		return this.default;
	};
	
	/**
	 * Set theme color.
	 *
	 * @param {String} color
	 * 
	 * @throws {TypeError} Throws when invalid color passed
	 * 
	 */
	set( color ) {
		var color = Typed( color, String ) ? color : this.default;
		var palete = null;
		if( this.palettes.has( color ) ) {
			palete = this.palettes.get( color );
		}
		else if( this.themes.has( color ) ) {
			palete = this.themes.get( color );
		}
		else {
			throw new TypeError( Fmt( "{}: Unsupported theme color or palette", color ) );
		}
		this.current = color;
		this.cookie.set( this.keyset, palete.token, { path: "/", expires: 30 } );
		this.setHTML( color );
		this.setHTMLMeta( palete );
	}
	
	/**
	 * Set theme color to HTMLHeadElement.
	 *
	 * @param {String} color
	 *
	 */
	setHTML( color ) {
		if( Typed( color, String ) &&
			Typed( document, HTMLDocument ) &&
			Typed( document.documentElement, HTMLHtmlElement ) ) {
			document.documentElement.dataset.theme = color;
		}
	}
	
	/**
	 * Set theme color to HTMLMetaElement.
	 *
	 * @param {Palette} palete
	 * 
	 */
	setHTMLMeta( palete ) {
		if( Typed( document, HTMLDocument ) ) {
			var meta = document.querySelector( "meta[name=\"theme-color\"]" );
			if( Typed( meta, Null ) ) {
				meta = document.createElement( "meta" );
				document.head.appendChild( meta );
			}
			meta.setAttribute( "name", "theme-color" );
			meta.setAttribute( "content", palete.color );
		}
	}
	
	setPalette( color ) {
		var palettes = [ ...this.palettes.keys() ];
		if( Typed( color, [ "Null", "Undefined" ] ) ) {
			color = this.get();
		}
		while( color === this.current && palettes.length >= 2 ) {
			color = choice( palettes );
		}
		this.set( color );
	}
	
}

export {
	Theme
};
