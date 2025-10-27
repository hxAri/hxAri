
/**
 * 
 * hxAri | logics.js
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

import { Typed } from "./types";


/**
 * Returns whether function is asyncronous function
 * 
 * @param {Function} func 
 * @param {?Boolean} optional
 * 
 * @returns {Boolean}
 * 
 */
function isAsyncronous( func, optional ) {
	if( Typed( optional, Boolean ) ) {
		return isAsyncronous( func ) === optional;
	}
	return func?.constructor?.name === "AsyncFunction";
}

/**
 * Check if value given is empty.
 *
 * @param {T} value
 *
 * @returns {Boolean}
 * 
 */
function isEmpty( value ) {
	if( Not( value, [ "Undefined", Boolean, "Null" ] ) ) {
		if( Typed( value, Array ) ) {
			return value.length === 0;
		}
		if( Typed( value, Object ) ) {
			return Object.keys( value ).length === 0;
		}
		if( Typed( value, String ) ) {
			return value.length !== 0 ? value.trim().length === 0 : true;
		}
		return false;
	}
	return true;
};

/**
 * Check if value given is not empty.
 *
 * @param {T} value
 *
 * @returns {Boolean}
 * 
 */
function isNotEmpty( value ) {
	return isEmpty( value ) === false;
}

/**
 * Not is the negation of the function is/Typed.
 *
 * @param {*} argv
 * @param {Function} Typed
 * @param {Function} handler
 * @param {Function} catcher
 *
 * @returns {*}
 * 
 */
function Not( argv, type, handler = () => true, catcher = () => false ) {
	return Typed( argv, type, catcher, handler );
}


export {
	isAsyncronous,
	isEmpty,
	isNotEmpty,
	Not,
	Typed as Is
};
