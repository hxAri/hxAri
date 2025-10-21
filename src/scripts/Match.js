
/**
 * 
 * hxAri | match.js
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

import { Not } from "/src/scripts/logics";
import { Callable, Typed } from "/src/scripts/types";

/**
 * Check if value is callable or function.
 *
 * @param {T} match
 *
 * @returns {Boolean}
 * 
 */
const isCall = match => typeof match === "function" || Typed( match, String ) && /^function/.test( match );

/**
 * Check if match case is default option.
 *
 * @param {Array<T>} cases
 *
 * @returns {T}
 * 
 */
const isDefault = cases => {
	for( let i in cases ) {
		if( Typed( cases[i].none, Boolean ) && cases[i].none ) {
			return i;
		}
	}
	return false;
};

/**
 * Check if value is multiple match case.
 *
 * @param {T} match
 *
 * @returns {Boolean}
 * 
 */
const isMultiple = match => Typed( match, Object ) && Typed( match.case, Array ) && Typed( match.call ) !== "Undefined";

/**
 * Return match result.
 *
 * @param {T} match
 * @param {T} value
 *
 * @returns {T}
 * 
 */
const returns = ( match, value ) => isCall( value ) ? value( match ) : value;

/**
 * Match cases function.
 *
 * @param {T} match
 * @param {Array<T>} cases
 *
 * @returns {T}
 * 
 */
export default function Match( match, cases ) {
	if( Typed( cases, Array ) ) {
		var post = isDefault( cases );
		for( let i in cases ) {
			if( i !== post ) {
				if( Typed( cases[i].case, Array ) ) {
					for( let u in cases[i].case ) {
						if( Typed( match, cases[i].case[u] ) || match === cases[i].case[u] ) {
							return Callable( cases[i].call );
						}
					}
				}
				else if( Typed( match, cases[i].case ) || match === cases[i].case ) {
					return Callable( cases[i].call );
				}
			}
		}
		if( Not( post, Boolean ) ) {
			return Callable( cases[post].call );
		}
	}
};
