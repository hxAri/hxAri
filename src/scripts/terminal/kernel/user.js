
/**
 * 
 * hxAri | user.js
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
import { Password } from "/src/scripts/terminal/kernel/password";
import { Typed } from "/src/scripts/types";


class User {
	
	/** @type {Map<String,String>} */
	env;
	
	/** @type {String} */
	fullname;
	
	/** @type {Number} */
	gid;
	
	/** @type {String} */
	group;
	
	/** @type {String} */
	home;
	
	/** @type {Password} */
	password;
	
	/** @type {String} */
	privilege; // superuser|user
	
	/** @type {String} */
	shell;
	
	/** @type {Number} */
	uid;
	
	/** @type {String} */
	username;
	
	/**
	 * Construct method of class User
	 * 
	 * @param {Map<String,String>} env
	 * @param {String} fullname
	 * @param {Number} gid
	 * @param {String} group
	 * @param {String} home
	 * @param {?Password|String} password
	 * @param {String} privilege
	 * @param {String} shell
	 * @param {Number} uid
	 * @param {String} username
	 * 
	 */
	constructor( env, fullname, gid, group, home, password, privilege, shell, uid, username ) {
		this.env = new Map();
		const initial = Object.assign( {}, env || {}, {
			HOME: home,
			SHELL: shell,
			PATH: "/bin:/usr/bin",
			PWD: home,
			USER: username
		});
		for( const [ key, value ] of Object.entries( initial ) ) {
			this.env.set( key, value );
		}
		this.fullname = fullname;
		this.gid = gid;
		this.group = group;
		this.home = home;
		this.password = password;
		if( Typed( password, [ "Null", "String", "Undefined" ] ) ) {
			this.password = new Password( username, { chipertext: password } );
		}
		this.privilege = privilege;
		this.shell = shell;
		this.uid = uid;
		this.username = username;
	}
	
	/**
	 * Return whether user is allowed to execute virtual node
	 * 
	 * @param {VirtualNode} vnode
	 * 
	 * @returns {Boolean}
	 */
	executable( vnode ) {
		if( this.root() ) {
			return true;
		}
		if( vnode.uid === this.uid ) {
			return ( vnode.mode & 0o100 ) !== 0;
		}
		if( vnode.gid === this.gid ) {
			return ( vnode.mode & 0o010 ) !== 0;
		}
		return ( vnode.mode & 0o001 ) !== 0;
	}
	
	/**
	 * Return whether user is allowed to read virtual node
	 * 
	 * @param {VirtualNode} vnode
	 * 
	 * @returns {Boolean}
	 */
	readable( vnode ) {
		if( this.root() ) {
			return true;
		}
		if( vnode.uid === this.uid ) {
			return ( vnode.mode & 0o400 ) !== 0;
		}
		if( vnode.gid === this.gid ) {
			return ( vnode.mode & 0o040 ) !== 0;
		}
		return ( vnode.mode & 0o004 ) !== 0;
	}
	
	/**
	 * Return whether current user is root
	 * 
	 * @returns {Boolean}
	 * 
	 */
	root() {
		return this.privilege.match( /^superuser$/ ) && this.uid === 0;
	}
	
	/**
	 * Returns a string representation of a User
	 * 
	 * @returns {String}
	 * 
	 */
	toString() {
		return Fmt( "{username}:x:{gid}:{uid}:{fullname}:{home}:{shell}", this );
	}
	
	/**
	 * Return whether user is allowed to write content into virtual node
	 * 
	 * @param {VirtualNode} vnode
	 * 
	 * @returns {Boolean}
	 */
	writeable( vnode ) {
		if( this.root() ) {
			return true;
		}
		if( vnode.uid === this.uid ) {
			return ( vnode.mode & 0o200 ) !== 0;
		}
		if( vnode.gid === this.gid ) {
			return ( vnode.mode & 0o020 ) !== 0;
		}
		return ( vnode.mode & 0o002 ) !== 0;
	}
	
}

class Root extends User {
	
	/**
	 * Construct method of class User
	 * 
	 * @param {?String} home
	 * @param {?String} shell
	 * 
	 */
	constructor( home, shell ) {
		super( {}, "Root", 0, "root", home || "/root", "root", "superuser", shell || "/usr/bin/bash", 0, "root" );
	}
	
}

export {
	User, 
	Root
}
