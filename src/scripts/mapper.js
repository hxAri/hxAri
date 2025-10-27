
/**
 * 
 * hxAri | mapper.js
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

import { Match } from "./matcher";
import { Typed } from "./types";

/**
 * Array, Object, and String Mapper.
 *
 * @param {Array<T>|Map<K,T>|Object|String} data
 * @param {Function} call
 *
 * @returns {Array<T>|Map<K,T>}
 * 
 */
function Mapper( data, call ) {
	
	var results = Match( data, [
		
		/**
		 * Array|String Mapper.
		 *
		 * @param {Array<T>|String} data
		 *
		 * @returns {Array<T>}
		 * 
		 */
		{
			case: [ Array, String ],
			call: () => {
				
				// Collected data.
				var stack = [];
				
				// For loop as much as the amount of data.
				for( let i = 0; i < data.length; i++ ) {
					stack[i] = call( i, data[i], data.length );
				}
				return stack;
			}
		},
		
		/**
		 * Object Mapper.
		 *
		 * @param {Map<K,T>} data
		 *
		 * @returns {Map<K,T>}
		 * 
		 */
		{
			case: Object,
			call: () => {
				
				// Collected data.
				var stack = {};
				
				// Get object keys and values.
				var keys = Object.keys( data );
				var vals = Object.values( data );
				
				// Repeat data until it runs out.
				for( let i in keys ) {
					stack[keys[i]] = call( i, keys[i], vals[i], vals.length );
				}
				return stack;
			}
		}
	]);
	if( Typed( this, [ Mapper, Object, Window ] ) ) {
		this.data = data;
		this.callback = call;
		this.results = results;
	}
	return results;
}

export { Mapper };
