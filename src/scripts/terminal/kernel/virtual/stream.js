
/**
 * 
 * hxAri | stream.js
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

import { Fmt } from "/src/scripts/formatter";
import { isNotEmpty } from "/src/scripts/logics";


class VirtualStream {
	
	/** @type {Array<String>} */
	buffer;
	
	/** @type {Boolean} */
	closed;
	
	/** @type {Map<String,Set<Function>>} */
	listeners;
	
	/** @type {String} */
	name;
	
	/**
	 * Construct method of class VirtualStream
	 * 
	 * @param {String} name
	 * @param {String} contents
	 * 
	 */
	constructor( name, contents ) {
		this.buffer = [];
		this.closed = false;
		this.listeners = new Map();
		this.listeners.set( "clear", new Set() );
		this.listeners.set( "read", new Set() );
		this.listeners.set( "write", new Set() );
		this.name = name;
		if( isNotEmpty( contents ) ) {
			this.buffer.push( contents );
		}
	}
	
	/**
	 * Close virtual stream
	 * 
	 * @throws {TypeError} Throws whether stream has been closed
	 * 
	 */
	close() {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: stream has been closed", this.name ) );
		}
		this.clear();
		this.closed = true;
		delete this.buffer;
	}
	
	/**
	 * Clear virtual stream buffer
	 * 
	 * @throws {TypeError} Throws whether stream has been closed
	 * 
	 */
	clear() {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: unable to clear buffer on closed stream", this.name ) );
		}
		this.buffer = [];
		for( const listener of this.listeners.get( "clear" ) ) {
			try {
				listener();
			}
			catch( e ) {
				console.error( e );
			}
		}
	}
	
	/**
	 * Read virtual stream buffer
	 * 
	 * @param {Number} max
	 * 
	 * @returns {String}
	 * 
	 * @throws {TypeError} Throws whether stream has been closed
	 * 
	 */
	read( max=-1 ) {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: unable to read buffer on closed stream", this.name ) );
		}
		let contents = this.buffer.slice( 0, max ).join( "" );
		this.buffer = this.buffer.slice( max, -1 );
		for( const listener of this.listeners.get( "read" ) ) {
			try {
				listener( contents );
			}
			catch( e ) {
				console.error( e );
			}
		}
		return contents;
	}
	
	/**
	 * Register stream listener
	 * 
	 * @param {String} event
	 * @param {Function} listener
	 * 
	 * @returns {never}
	 * 
	 * @throws {TypeError} Throws whether invalid event passed or stream has been closed
	 * 
	 */
	register( event, listener ) {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: unable to add listener on closed stream", this.name ) );
		}
		if( this.listeners.has( event ) ) {
			this.listeners.get( event ).add( listener );
			return;
		}
		throw new TypeError( Fmt( "{}: unsupported event listener", event ) );
	}
	
	/**
	 * Write virtual stream buffer
	 * 
	 * @param {String} content
	 * 
	 * @throws {TypeError} Throws whether stream has been closed
	 * 
	 */
	write( content ) {
		if( this.closed ) {
			throw new TypeError( Fmt( "{}: unable to write buffer on closed stream", this.name ) );
		}
		this.buffer.push( new String( content ) );
		for( const listener of this.listeners.get( "write" ) ) {
			try {
				listener( this.buffer.at( -1 ) );
			}
			catch( e ) {
				console.error( e );
			}
		}
	}
	
}

class Stderr extends VirtualStream {
	
	/**
	 * Construct method of class Stderr
	 * 
	 * @param {?String} contents
	 * 
	 */
	constructor( contents ) {
		super( "stderr", contents );
	}
	
}

class Stdin extends VirtualStream {
	
	/**
	 * Construct method of class Stdin
	 * 
	 * @param {?String} contents
	 * 
	 */
	constructor( contents ) {
		super( "stdin", contents );
	}
	
}

class Stdout extends VirtualStream {
	
	/**
	 * Construct method of class Stdout
	 * 
	 * @param {?String} contents
	 */
	constructor( contents ) {
		super( "stdout", contents );
	}
	
}

export {
	Stderr,
	Stdin,
	Stdout,
	VirtualStream
}
