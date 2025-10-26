
/**
 * 
 * hxAri | types.js
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


/**
 * Callable is a function for callbacks so the program doesn't
 * have to write code over and over just to check if it's a
 * function and it also supports passed parameters.
 * 
 * @param {T} kwargs
 *
 * @returns {T}
 * 
 */
function Callable( ...kwargs ) {
	
	// Check if function has argument passed.
	if( kwargs.length > 0 ) {
		if( typeof kwargs[0] === "function" ) {
			
			// Get function passed.
			var func = kwargs[0];
			
			// Unset function from argument passed.
			delete kwargs[0];
			
			// Return callback function.
			return func( ...kwargs );
		}
		return kwargs[0];
	}
}

/**
 * Returns whether value is not undefined
 * 
 * @param {T} value
 * 
 * @returns {Boolean}
 * 
 */
function Defined( value ) {
	return typeof value !== "undefined";
}

/**
 * Mixed is PHP's default data type but
 * now I've created it in JavaScript Wkwkwk.
 *
 * @param {T} value
 *
 * @returns {T}
 * 
 */
function Mixed( value = false ) {
	
	/* Set the value as well as the value type to avoid
	 * returning errors if the function is called using
	 * the constructor.
	 */
	this.value = value;
	this.type = Typed( this.value );
	
	// Return value.
	return value;
}

/**
 * Returns whether value is null
 * 
 * @param {T} x 
 * 
 * @returns {Boolean}
 * 
 */
function Null( value ) {
	return typeof value === "null";
}

/**
 * Get value type.
 *
 * @param {Object} argv
 * @param {Function|Array<Function>} type
 *  The array of function identified if value type is optional
 * @param {Function} handler
 * @param {Function} catcher
 *
 * @returns {Object}
 * 
 */
function Typed( argv, type, handler, catcher ) {
	
	// // Get name type of type.
	var typeName = typeof type;
	var typeObjectName = Object.prototype.toString.call( type ).replace( /\[object\s*(.*?)\]/, `$1` );
	
	// // Get name type of argument value.
	var argvTypeName = typeof argv === "function" ? ( argv.name !== "" ? argv.name : "Window" ) : Object.prototype.toString.call( argv ).replace( /\[object\s*(.*?)\]/, `$1` );
	
	// // Callbacks.
	var callbackHandler = () => typeof handler === "function" ? handler( argv, type ) : true;
	var callbackCatcher = () => typeof catcher === "function" ? catcher( argv, type ) : false;
	
	if( typeName !== "undefined" ) {
		if( typeName === "function" ) {
			var functionTypeName = type.name;
				functionTypeName = functionTypeName === "" ? "Window" : functionTypeName;
			if( functionTypeName === argvTypeName ) {
				return callbackHandler();
			}
			return callbackCatcher();
		}
		if( typeName === "object" ) {
			if( typeObjectName === "Array" ) {
				for( let i in type ) {
					if( Typed( argv, type[i] ) ) {
						return callbackHandler();
					}
				}
				return callbackCatcher();
			}
			if( typeObjectName === argvTypeName ) {
				return callbackHandler();
			}
			return callbackCatcher();
		}
		if( typeName === "string" ) {
			if( type === argvTypeName ) {
				return callbackHandler();
			}
		}
		return callbackCatcher()
	}
	return argvTypeName;
}

/**
 * Returns whether value is undefined
 * 
 * @param {T} value
 * 
 * @returns {Boolean}
 * 
 */
function Undefined( value ) {
	return typeof value === "undefined";
}


export {
	Callable,
	Defined,
	Mixed,
	Null,
	Typed,
	Undefined
};
