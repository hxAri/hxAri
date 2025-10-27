
/**
 * 
 * hxAri | formatter.js
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

import { Typed } from "/src/scripts/types";

/**
 * String formater.
 *
 * @param {String} format
 * @param {T} values
 *
 * @returns {String}
 * 
 */
function Fmt( format, ...values ) {

	var i = 0;
	var index = 0;
	var match = null;
	var slash = "";
	var result = "";
	var regexp = /(?:(?<except>\\{0,})(?<format>(\{[\s\t]*((?<key>[a-zA-Z_\x80-\xff]([a-zA-Z0-9_\x80-\xff]{0,}[a-zA-Z0-9_\x80-\xff]{1})*)|(?<index>[\d]+))*[\s\t]*\})))/igms;
	
	// If format value is String type.
	if( Typed( format, String ) ) {
		while( ( match = regexp.exec( format ) ) !== null ) {
			
			slash = "";
			result += format.substring( index, regexp.lastIndex - match[0].length );
			index = regexp.lastIndex;
			
			// If backslash character exists.
			if( Typed( match.groups.backslash, String ) ) {
				
				// Get backslash length.
				var length = length = match.groups.backslash.length;
				
				// If the number of backslashes is more than one.
				if( length !== 1 ) {
					
					// If number of backslash is odd.
					if( length % 2 !== 0 ) {
						result += "\\".repeat( length -1 );
						result += match.groups.format;
						continue;
					}
					
					// Make backslashes as much as the amount minus two.
					slash = "\\".repeat( length === 2 ? length -1 : length -2 );
				}
				else {
					result += match.groups.format;
					continue;
				}
			}
			
			// Append backslash characters.
			result += slash;
			
			// If Index or Key is exists in groups.
			if( Typed( match.groups.key, String ) || Typed( match.groups.index, String ) ) {
				
					// If format by key name.
				if( Typed( match.groups.key, String ) ) {
					// If value of element 1 on array args Object type.
					if( Typed( values[0], Object ) ) {
						result += values[0][match.groups.key] ?? "";
					}
				}
				else {
					result += values[match.groups.index] ?? "";
				}
				continue;
			}
			
			// Get value by index iteration.
			result += values[i++] ?? "";
		}
		return result + format.substring( index );
	}
	throw new TypeError( `Argument format must be type String, ${Typed( format )} given` );
}

export { Fmt };
