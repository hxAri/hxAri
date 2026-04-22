
/**
 * 
 * hxAri | node.js
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

import { Buffer } from "buffer";

import { UnixTime } from "/src/scripts/unixtime";
import { Group } from "/src/scripts/terminal/kernel/group";
import { User } from "/src/scripts/terminal/kernel/user";


class VirtualNode {
	
	/** @type {Buffer|Function|Map<String,VirtualNode>|String} */
	contents;
	
	/** @type {UnixTime} */
	ctime;
	
	/** @type {Number} */
	gid;
	
	/** @type {Number} */
	mode;
	
	/** @type {String} */
	name;
	
	/** @type {String} */
	type; // file|link|path
	
	/** @type {Number} */
	uid;
	
	/** @type {UnixTime} */
	utime;
	
	/**
	 * Construct method of class VirtualNode
	 * 
	 * @param {?UnixTime} ctime
	 * @param {Number} gid
	 * @param {Number} mode
	 * @param {String} name
	 * @param {String} type
	 * @param {Number} uid
	 * @param {?UnixTime} utime
	 * @param {Object} options
	 * @param {?Buffer|Function|Map<String,VirtualNode>|String} [options.contents]
	 * 
	 */
	constructor( ctime, gid, mode, name, type, uid, utime, options={} ) {
		this.contents = typeof options.contents !== "undefined" ? options.contents : ( type === "file" ? "" : ( type === "link" ? "" : {} ) );
		this.ctime = ctime || new UnixTime();
		this.gid = gid;
		this.mode = mode;
		this.name = name;
		this.type = type;
		this.uid = uid;
		this.utime = utime || new UnixTime();
	}
	
	/**
	 * Returns copied instance
	 * 
	 * This will include all content that is under the parent
	 * 
	 * @returns {VirtualNode}
	 * 
	 */
	copy() {
		var contents = this.contents;
		if( this.type === "path" ) {
			contents = new Map();
			for( let keyset of this.contents.keys() ) {
				contents.set( keyset, this.contents.get( keyset ).copy() );
			}
		}
		return new VirtualNode( this.ctime, this.gid, this.mode, this.name, this.type, this.uid, this.utime, { contents: contents } );
	}
	
	/**
	 * Returns object representation
	 * 
	 * @returns {Object}
	 * 
	 */
	object() {
		var contents = this.contents;
		var scripting = false;
		if( this.type === "file" ) {
			if( contents instanceof Buffer ) {
			}
			if( contents instanceof Function ) {
				contents = contents.toString();
				scripting = true;
			}
		}
		if( this.type === "path" ) {
			contents = {};
			for( let keyset of this.contents.keys() ) {
				contents[keyset] = this.contents.get( keyset ).object();
			}
		}
		return {
			contents: contents,
			ctime: this.ctime,
			gid: this.gid,
			mode: this.mode,
			name: this.name,
			scripting: scripting,
			type: this.type,
			uid: this.uid,
			utime: this.utime
		};
	}
	
	/**
	 * Returns pathname
	 * 
	 * @returns {String}
	 * 
	 */
	qualified() {
		return this.name === "/" ? "/" : this.name;
	}
	
}

class VirtualNodeGroup extends VirtualNode {
	
	/** @type {Map<Number,Group>} */
	groups;
	
	/**
	 * Construct method of class VirtualNodePasswd
	 * 
	 * @param {Map<Number,Group>} groups
	 * 
	 * @throws {TypeError} Throws whether root group not found
	 * 
	 */
	constructor( groups ) {
		if( groups.has( 0 ) ) {
			super( null, 0, 0o644, "group", "file", 0, null, { contents: "" } );
			this.groups = groups;
			this.refresh();
		}
		else {
			throw new TypeError( "unable to instantiate group" );
		}
	}
	
	/** Refresh saved group information */
	refresh() {
		this.contents = Array.from( this.groups.values() ).join( "\x0a" );
		this.utime = new UnixTime();
	}
	
}

class VirtualNodePasswd extends VirtualNode {
	
	/** @type {Map<Number,User>} */
	users;
	
	/**
	 * Construct method of class VirtualNodePasswd
	 * 
	 * @param {Map<Number,User>} users
	 * 
	 * @throws {TypeError} Throws whether root user not found
	 * 
	 */
	constructor( users ) {
		if( users.has( 0 ) ) {
			var user = users.get( 0 );
			super( null, user.gid, 0o644, "passwd", "file", user.uid, null, { contents: "" } );
			this.users = users;
			this.refresh();
		}
		else {
			throw new TypeError( "unable to instantiate passwd" );
		}
	}
	
	/** Refresh saved user account information */
	refresh() {
		this.contents = Array.from( this.users.values() ).join( "\x0a" );
		this.utime = new UnixTime();
	}
	
}

class VirtualNodeShadow extends VirtualNode {
	
	/** @type {Map<Number,User>} */
	users;
	
	/**
	 * Construct method of class VirtualNodeShadow
	 * 
	 * @param {Map<Number,User>} users
	 * 
	 * @throws {TypeError} Throws whether root user not found
	 * 
	 */
	constructor( users ) {
		if( users.has( 0 ) ) {
			var user = users.get( 0 );
			super( null, user.gid, 0o640, "shadow", "file", user.uid, null, { contents: "" } );
			this.users = users;
			this.refresh();
		}
		else {
			throw new TypeError( "unable to instantiate shadow" );
		}
	}
	
	/** Refresh saved sensitive user account information */
	refresh() {
		this.contents = Array.from( this.users.values() ).map( user => user.password ).join( "\x0a" );
		this.utime = new UnixTime();
	}
	
}

export {
	VirtualNode,
	VirtualNodeGroup,
	VirtualNodePasswd,
	VirtualNodeShadow
}
