
/**
 * 
 * hxAri | group.js
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
import { User } from "/src/scripts/terminal/kernel/user";
import { Typed } from "/src/scripts/types";


class Group {
	
	/** @type {Number} */
	gid;
	
	/** @type {Set<User>} */
	members;
	
	/** @type {String} */
	username;
	
	/**
	 * Construct method of class Group
	 * 
	 * @param {Number} gid
	 * @param {Array<User>|Set<User>} members
	 * @param {String} username
	 * 
	 */
	constructor( gid, members, username ) {
		this.gid = gid;
		this.members = members;
		if( Typed( members, Array ) ) {
			this.members = new Set( members );
		}
		this.username = username;
	}
	
	/**
	 * Returns a string representation of a Group
	 * 
	 * @returns {String}
	 * 
	 */
	toString() {
		return Fmt( "{}:x:{}:{}", ...[ this.username, this.gid, Array.from( this.members.entries() ).map( member => member[0].username ).join( "\x0a" ) ] );
	}
	
}

export {
	Group
};
