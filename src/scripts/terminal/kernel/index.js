
/**
 * 
 * hxAri | index.js
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
import { bin2hex } from "../../common";
import { Fmt } from "../../formatter";
import { isAsyncronous, isEmpty, isNotEmpty } from "../../logics";
import { Router } from "../../../routing";
import { Typed } from "../../types";
import { UnixTime } from "../../unixtime";

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

class Kernel {
	
	/** @type {Number} */
	gic; // gid counter
	
	/** @type {Map<Number,Group>} */
	groups;
	
	/** @type {String} */
	hostname;
	
	/** @type {VirtualNodePasswd} */
	passwd;
	
	/** @type {Number} */
	pic; // pid /counter
	
	/** @type {Root} */
	root;
	
	/** @type {Router} */
	router;
	
	/** @type {VirtualNodeShadow} */
	shadow;
	
	/** @type {Map<Number,ProgramMetadata>} */
	table;
	
	/** @type {Number} */
	uic; // uid counter
	
	/** @type {Number} */
	uid;
	
	/** @type {Map<Number,User>} */
	users;
	
	/** @type {VirtualFileSystem} */
	vfs;
	
	/**
	 * Construct method of class Kernel
	 * 
	 * @param {Router} router
	 * 
	 */
	constructor( router ) {
		this.gic = 1000;
		this.groups = new Map();
		this.hostname = window?.location?.host?.split( "\x3a" )[0] ?? "hxari";
		this.pic = 100;
		this.root = new Root();
		this.groups.set( 0, new Group( 0, new Set([ this.root ]), "root" ) );
		this.group = new VirtualNodeGroup( this.groups );
		this.router = router;
		this.table = new Map();
		this.users = new Map();
		this.users.set( this.root.uid, this.root );
		this.passwd = new VirtualNodePasswd( this.users );
		this.shadow = new VirtualNodeShadow( this.users );
		this.uic = 1000;
		this.uid = this.root.uid;
		this.vfs = new VirtualFileSystem( this, this.hostname, this.router );
		this.vfs.mkdir( this.root.home, { mode: 0o700, user: this.root });
		if( this.vfs.isdir( "/etc" ) ) {
			if( this.vfs.isfile( "/etc/group" ) ) {
				var group = this.vfs.read( "/etc/group", { user: this.root } );
				for( let line of group.split( "\x0a" ) ) {
					var parts = line.split( "\x3a" );
					var gid = parseInt( parts[2] );
					this.groups.set( gid, new Group( gid, parts[3].split( "\x2c" ).filter( Boolean ), parts[0] ) );
				}
				this.group.refresh();
			}
			if( this.vfs.isfile( "/etc/passwd" ) ) {
				var passwd = this.vfs.read( "/etc/passwd", { user: this.root } );
				for( let line of passwd.split( "\x0a" ) ) {
					var parts = line.split( "\x3a" );
					var gid = parseInt( parts[2] );
					var uid = parseInt( parts[3] );
					if( gid !== 0 && uid !== 0 ) {
						this.users.set( uid, new User( {}, parts[4], gid, parts[0], parts[5] || null, null, "user", parts[6], uid, parts[0] ) );
					}
				}
				this.passwd.refresh();
			}
			if( this.vfs.isfile( "/etc/shadow" ) ) {
				var shadow = this.vfs.read( "/etc/shadow", { user: this.root } );
				for( let line of shadow.split( "\x0a" ) ) {
					var parts = line.split( "\x3a" );
					for( let [ _, user ] of this.users.entries() ) {
						if( user.username === parts[0] ) {
							user.password = new Password( parts[0], {
								chipertext: parts[1],
								expired: parts[7] || null,
								inactive: parts[6] || null,
								maximum: parts[4] || 0,
								minimum: parts[3] || 0,
								updated: parts[2] || 19743,
								warning: parts[5] || 7
							});
						}
					}
				}
				this.shadow.refresh();
			}
		}
		else {
			this.vfs.mkdir( "/etc", { mode: 0o755, user: this.root });
		}
		if( this.groups.has( this.groupres( "sudo" ) ) === false ) {
			this.groupadd( "sudo", { user: this.root } );
		}
		this.vfs.walk( "/etc" ).contents.set( "group", this.group );
		this.vfs.walk( "/etc" ).contents.set( "passwd", this.passwd );
		this.vfs.walk( "/etc" ).contents.set( "shadow", this.shadow );
	}
	
	/** 
	 * Returns allocate group id
	 * 
	 * @returns {Number}
	 * 
	 */
	allocateGID() {
		if( this.groups === null || typeof this.groups === "undefined" ) {
			this.groups = new Map();
		}
		while( this.groups.has( this.gic ) ) {
			this.gic++;
		}
		return this.gic;
	}
	
	/** 
	 * Returns allocate program id
	 * 
	 * @returns {Number}
	 * 
	 */
	allocatePID() {
		return ++this.pic;
	}
	
	/** 
	 * Returns allocate user id
	 * 
	 * @returns {Number}
	 * 
	 * @throws {TypeError} Throws whether uid space exhausted
	 * 
	 */
	allocateUID() {
		if( this.users === null || typeof this.users === "undefined" ) {
			this.users = new Map();
		}
		while( this.users.has( this.uic ) ) {
			this.uic++;
			if( this.uic >= 0xFFFF ) {
				throw new TypeError( "uid space exhausted" );
			}
		}
		return this.uic;
	}
	
	/**
	 * ...
	 * 
	 * @param {String} groupname 
	 * @param {Object} options 
	 * @param {?Number} options.gid 
	 * @param {User} [options.user]
	 * 
	 */
	groupadd( groupname, options={} ) {
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can add group" );
		}
		if( /^[a-z_][a-z0-9_-]{0,31}$/.test( groupname ) === false ) {
			throw new TypeError( Fmt( "{}: invalid groupname", groupname ) );
		}
		var gid = options?.gid;
		if( gid && Number.isFinite( gid ) ) {
			if( this.groups.has( gid ) ) {
				throw new TypeError( Fmt( "{}: gid exists", gid ) );
			}
		}
		else {
			gid = this.allocateGID();
		}
		for( let group of this.groups.values() ) {
			if( group.username === groupname ) {
				throw new TypeError( Fmt( "{}: group username exists", groupname ) );
			}
		}
		this.groups.set( gid, new Group( gid, new Set(), groupname ) );
		this.group.refresh();
		this.vfs.persist();
	}
	
	/**
	 * ...
	 * 
	 * @param {String} groupname 
	 * @param {Object} options 
	 * @param {?Boolean} [options.force]
	 * @param {User} [options.user]
	 * 
	 */
	groupdel( groupname, options={} ) {
		options.force = options.force ?? false;
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can delete group" );
		}
		for( let [ gid, group ] of this.groups.entries() ) {
			if( group.username === groupname ) {
				var procs = Array.from( this.table.values() ).filter( table => group.members.has( table.user ) );
				if( procs.length >= 1 ) {
					if( options.force ) {
						for( let process of procs ) {
							this.kill( process.pid, { user: options.user } );
						}
					}
					else {
						throw new TypeError( Fmt( "{}: group has running process", groupname ) );
					}
				}
				this.groups.delete( gid );
				this.group.refresh();
				this.vfs.persist();
				return;
			}
		}
		throw new TypeError( Fmt( "{}: group not found", groupname ) );
	}
	
	/**
	 * ...
	 * 
	 * @param {String} groupname 
	 * @param {Object} options 
	 * @param {?Number} [options.gid]
	 * @param {?String} [options.member]
	 * @param {?String} [options.memberadd]
	 * @param {?String} [options.username]
	 * @param {User} [options.user]
	 * 
	 */
	groupmod( groupname, options={} ) {
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can modify group" );
		}
		this.group.refresh();
		this.vfs.persist();
	}
	
	/**
	 * Return groupid by groupname
	 * 
	 * @param {String} groupname 
	 * 
	 * @returns {?Number}
	 * 
	 */
	groupres( groupname ) {
		for( let [ gid, group ] of this.groups.entries() ) {
			if( group.username === groupname ) {
				return gid;
			}
		}
	}
	
	/**
	 * Kill specific program by process id
	 * 
	 * @param {Number} pid
	 * @param {Object} options
	 * @param {User} [options.user]
	 * 
	 * @returns {void}
	 * 
	 * @throws {TypeError} Throws whether permission denied or pid not found
	 * 
	 */
	kill( pid, options={} ) {
		if( this.table.has( pid ) ) {
			var process = this.table.get( pid );
			if( process.user.uid !== options.user.uid && options.user.root() === false ) {
				throw TypeError( "{}: unallowed kill process", pid );
			}
			process.exit = 1;
			process.state = "killed";
			return;
		}
		throw TypeError( "{}: no such process id", pid );
	}
	
	/**
	 * Returns list of program metadata in the table
	 * 
	 * @returns {Array<ProgramMetadata>}
	 * 
	 */
	list() {
		return Object.values( this.table ).map( element => Object.assign( new Map(), element ) );
	}
	
	/**
	 * Register program into table before execute
	 * 
	 * @param {Program} program
	 * @param {Object} options
	 * @param {User} options.user
	 * 
	 * @returns {Number}
	 * 
	 */
	register( program, options={} ) {
		const pid = this.allocatePID();
		this.table.set( pid, 
			new ProgramMetadata( program, pid, {
				state: "running",
				start: new UnixTime(),
				user: options.user
			})
		);
		return pid;
	}
	
	/**
	 * Spawn new program
	 * 
	 * @param {Program} program
	 * @param {Object} options
	 * @param {User} options.user
	 * 
	 * @returns {Number}
	 * 
	 */
	async spawn( program, options={} ) {
	}
	
	/**
	 * Switch or change user previlege by username
	 * 
	 * @param {String} username
	 * 
	 * @returns {void}
	 * 
	 * @throws {TypeError} Thrown whether user not found
	 * 
	 */
	switch( username ) {
		for( const user of this.users.values() ) {
			if( user.username.match( username ) ) {
				this.uid = user.uid;
				this.vfs.cwd = user.home;
				return;
			}
		}
		throw new TypeError( Fmt( "user {} does not exist or the user entry does not contain all the required fields", username ) );
	}
	
	/**
	 * Unregister spawned program
	 * 
	 * @param {Number} pid
	 * @param {Number} exit
	 * 
	 * @returns {void}
	 * 
	 * @throws {TypeError} Throws whether unregistered pid passed
	 * 
	 */
	unregister( pid, exit ) {
		if( this.table.has( pid ) ) {
			const meta = this.table.get( pid );
			meta.exit = exit;
			meta.state = "exit";
			meta.end = new UnixTime();
			return;
		}
		throw TypeError( "{}: failed to unregister with unregistered pid", pid );
	}
	
	/**
	 * Return current user previlege
	 * 
	 * @returns {User}
	 * 
	 */
	user() {
		return this.users.get( this.uid );
	}
	
	/**
	 * 
	 * @param {String} username
	 * @param {Object} options
	 * @param {?String} [options.fullname]
	 * @param {?String} [options.home]
	 * @param {?Number} [options.gid]
	 * @param {?Password|String} [options.password]
	 * @param {?String} [options.shell]
	 * @param {?Number} [options.uid]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied, username exists, user id exists, homedir exists
	 * 
	 */
	useradd( username, options={} ) {
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can add user" );
		}
		username = new String( username || "" ).trim();
		if( /^[a-z_][a-z0-9_-]{0,31}$/.test( username ) === false ) {
			throw new TypeError( Fmt( "{}: invalid username", username ) );
		}
		for( let entry of this.users.entries() ) {
			if( entry[1].username === username ) {
				throw new TypeError( Fmt( "{}: username exists", username ) );
			}
		}
		var gid = options?.gid;
		if( gid && Number.isFinite( gid ) ) {
		}
		else {
			gid = this.allocateGID();
		}
		var uid = options?.uid;
		if( uid && Number.isFinite( uid ) ) {
			if( this.users.has( uid ) ) {
				throw new TypeError( Fmt( "{}: user id exists", uid ) );
			}
		}
		else {
			uid = this.allocateUID();
		}
		var name = options?.fullname || username;
		var home = options?.home;
		var passw = options?.password;
		var shell = options?.shell;
		var user = new User( new Map(), name, gid, username, home, passw, "user", shell, uid, username );
		if( this.groups.has( gid ) ) {
			this.groups.get( gid ).members.add( user );
		}
		else {
			this.groups.set( gid, new Group( gid, [ user ], username ) );
		}
		this.users.set( uid, user );
		if( home ) {
			if( this.vfs.exists( home ) ) {
				this.userdel( username );
				throw new TypeError( Fmt( "{}: home directory exists", home ) );
			}
			this.vfs.mkdir( home, { mode: 0o755, user: options.user } );
			this.vfs.chgrp( home, { group: user, recursive: true, user: options.user } );
			this.vfs.chown( home, { owner: user, recursive: true, user: options.user } );
			var maps = new Map([
				[ 
					"/.bashrc", {
						contents: "#!/usr/bin/env bash\n\nif [[ -f /home/${USER}/.bash_aliases ]]; then source /home/${USER}/.bash_aliases; fi", 
						type: "file" 
					} 
				],
				[ "/.bash_aliases", { contents: "#!/usr/bin/env bash\n", type: "file" } ],
				[ "/.bash_history", { contents: "", type: "file" } ],
				[ "/Desktop", { type: "path" } ],
				[ "/Documents", { type: "path" } ],
				[ "/Download", { type: "path" } ],
				[ "/Music", { type: "path" } ],
				[ "/Pictures", { type: "path" } ],
				[ "/Trash", { type: "path" } ],
				[ "/Videos", { type: "path" } ],
			]);
			for( let entry of maps ) {
				switch( entry[1].type ) {
					case "file":
					case "link":
						this.vfs.write( home.concat( entry[0] ), { user: user, contents: entry[1]?.contents } );
						break;
					case "path":
						this.vfs.mkdir( home.concat( entry[0] ), { user: user } );
						break;
				}
			}
		}
		this.group.refresh();
		this.passwd.refresh();
		this.shadow.refresh();
		this.vfs.persist();
	}
	
	/**
	 * Delete user account
	 * 
	 * @param {String} username
	 * @param {Object} options
	 * @param {?Boolean} [options.force]
	 * @param {?Boolean} [options.home]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} 
	 *  Throws whether permission denied, user not found or
	 *  whether user has running process and delete without force deletion
	 * 
	 */
	userdel( username, options={} ) {
		options.force = options.force ?? false;
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can delete user" );
		}
		var users = Array.from( this.users.values() ).filter( user => user.username === username );
		if( users.length <= 0 ) {
			throw new TypeError( Fmt( "{}: user not found", username ) );
		}
		var procs = Array.from( this.table.values() ).filter( table => table.state === "running" && table.user.username === username );
		if( procs >= 1 ) {
			if( options.force === false ) {
				throw new TypeError( Fmt( "{}: user has running process", username ) );
			}
			for( let process of procs ) {
				this.kill( process.pid, { user: options.user } );
			}
		}
		for( let group of this.groups.values() ) {
			if( group.members.has( users[0] ) ) {
				group.members.delete( users[0] );
			}
		}
		if( users[0].home && options?.home ) {
			this.vfs.remove( users[0].home );
		}
		this.users.delete( users[0].uid );
		this.group.refresh();
		this.passwd.refresh();
		this.shadow.refresh();
		this.vfs.persist();
	}
	
	/**
	 * Modify user account
	 * 
	 * @param {String} username
	 * @param {Object} options
	 * @param {?String} [options.fullname]
	 * @param {?Number} [options.gid]
	 * @param {?String} [options.group]
	 * @param {?String} [options.groupadd]
	 * @param {?String} [options.home]
	 * @param {?Password} [options.password]
	 * @param {?String} [options.privilege]
	 * @param {?String} [options.shell]
	 * @param {?Number} [options.uid]
	 * @param {?String} [options.username]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied, group not found, 
	 *  user not found, uid exists, home directory exists.
	 * 
	 */
	usermod( username, options={} ) {
		if( options.user.root() === false ) {
			throw new TypeError( "operation not permitted: only root can modify user" );
		}
		if(
			( options.fullname === null || typeof options.fullname === "undefined" ) &&
			( options.gid === null || typeof options.gid === "undefined" ) &&
			( options.group === null || typeof options.group === "undefined" ) &&
			( options.groupadd === null || typeof options.groupadd === "undefined" ) &&
			( options.home === null || typeof options.home === "undefined" ) &&
			( options.password === null || typeof options.password === "undefined" ) &&
			( options.privilege === null || typeof options.privilege === "undefined" ) &&
			( options.shell === null || typeof options.shell === "undefined" ) &&
			( options.uid === null || typeof options.uid === "undefined" ) &&
			( options.username === null || typeof options.username === "undefined" ) ) {
			throw new TypeError( Fmt( "{}: nothing changed", username ) );
		}
		var users = Array.from( this.users.values() ).filter( user => user.username === username );
		if( users.length <= 0 ) {
			throw new TypeError( Fmt( "{}: user not found", username ) );
		}
		var user = users.pop();
		if( options?.fullname ) {
			user.fullname = options.fullname;
		}
		if( options?.gid ) {
			user.gid = options.gid; // some file or directory with old gid keep not change
		}
		if( options?.group ) {
			for( let group of this.groups.values() ) {
				if( group.members.has( user ) ) {
					group.members.delete( user );
				}
			}
			options.groupadd = options.group;
		}
		if( options?.groupadd ) {
			var groups = Array.from( this.groups.values() ).filter( group => group.username === options.groupadd );
			if( groups <= 0 ) {
				throw new TypeError( Fmt( "{}: {}: group not found", username, options.groupadd ) );
			}
			groups[0].members.add( user );
		}
		if( options?.password ) {
			if( Typed( options.password, String ) ) {
				options.password = new Password( username, {
					chipertext: options.password,
					expired: user.expired,    // unhandled at this time!
					inactive: user.inactive,  // unhandled at this time!
					maximum: user.maximum,    // unhandled at this time!
					minimum: user.minimum,    // unhandled at this time!
					updated: user.updated,    // unhandled at this time!
					warning: user.warning     // unhandled at this time!
				});
			}
			user.password = options.password;
		}
		if( options?.privilege ) {
			user.privilege = options.privilege;
		}
		if( options?.shell ) {
			user.shell = options.shell;
		}
		if( options?.uid ) {
			if( this.users.has( options.uid ) ) {
				throw new TypeError( Fmt( "{}: {}: uid exists", username, uid ) );
			}
			user.uid = options.uid;
			this.users.delete( user.uid );
			this.users.set( options.uid, user );
		}
		if( options?.username ) {
			user.username = options.username;
		}
		if( options?.home ) {
			if( this.vfs.isdir( options.home ) ) {
				throw new TypeError( Fmt( "{}: {}: home directory exists", username, options.home ) );
			}
			this.vfs.mkdir( options.home, { mode: 0o755, user: this.root } );
			this.vfs.chgrp( options.home, { group: user.gid, recursive: true, user: this.root } );
			this.vfs.chown( options.home, { owner: user.uid, recursive: true, user: this.root } );
		}
		this.group.refresh();
		this.passwd.refresh();
		this.shadow.refresh();
		this.vfs.persist();
	}
	
}

class Password {
	
	/** @type {String} */
	chipertext;
	
	/** @type {Number} */
	expired;
	
	/** @type {Number} */
	inactive;
	
	/** @type {Number} */
	maximum;
	
	/** @type {Number} */
	minimum;
	
	/** @type {Number} */
	updated;
	
	/** @type {String} */
	username;
	
	/** @type {Number} */
	warning;
	
	/**
	 * Construct method of class Password
	 * 
	 * @param {String} username
	 * @param {Object} options
	 * @param {String} [options.chipertext]
	 * @param {Number} [options.expired]
	 * @param {Number} [options.inactive]
	 * @param {Number} [options.maximum]
	 * @param {Number} [options.minimum]
	 * @param {Number} [options.updated]
	 * @param {Number} [options.warning]
	 * 
	 */
	constructor( username, options={ chipertext: "!", expired: null, inactive: null, maximum: 0, minimum: 0, updated: 19743, warning: 7 } ) {
		this.chipertext = options.chipertext;
		this.expired = options.expired;
		this.inactive = options.inactive;
		this.maximum = options.maximum;
		this.minimum = options.minimum;
		this.updated = options.updated;
		this.username = username;
		this.warning = options.warning;
	}
	
	/**
	 * Returns a string representation of a Password
	 * 
	 * @returns {String}
	 * 
	 */
	toString() {
		return Fmt( "{}:{}:{}:{}:{}:{}:{}:{}", ...[
			this.username,
			this.chipertext || "!",
			this.updated ?? 19743,
			this.minimum ?? 0,
			this.maximum ?? 0,
			this.warning ?? 7,
			this.inactive ?? "",
			this.expired ?? ""
		]);
	}
	
}

class Program {
	
	/** @type {Array<String>} */
	argv;
	
	/** @type {String} */
	cwd;
	
	/** @type {Map<String,String>} */
	env;
	
	/** @type {Number} */
	gid;
	
	/** @type {Number} */
	pid;
	
	/** @type {Number} */
	ppid;
	
	/** @type {Number} */
	sid;
	
	/** @type {Stderr} */
	stderr;
	
	/** @type {Stdin} */
	stdin;
	
	/** @type {Stdout} */
	stdout;
	
	/** @type {Number} */
	uid;
	
	/** @type {Number} */
	umask;
	
	/** @type {User} */
	user;
	
	/**
	 * 
	 * Construct method of class Program
	 * 
	 * @param {Number} pid
	 * @param {Object} options
	 * @param {Array<String>} options.argv
	 * @param {String} options.cwd
	 * @param {Map<String,String>} options.env
	 * @param {Number} options.gid
	 * @param {Number} options.ppid
	 * @param {Number} options.sid
	 * @param {Stderr} options.stderr
	 * @param {Stdin} options.stdin
	 * @param {Stdout} options.stdout
	 * @param {Number} options.uid
	 * @param {Number} options.umask
	 * @param {User} options.user
	 * 
	 */
	constructor( pid, options ) {
		this.argv = options.argv;
		this.cwd = options.cwd;
		this.env = options.env;
		this.gid = options.gid;
		this.pid = pid;
		this.ppid = options.ppid;
		this.sid = options.sid;
		this.stderr = options.stderr;
		this.stdin = options.stdin;
		this.stdout = options.stdout;
		this.uid = options.uid;
		this.umask = options.umask;
		this.user = options.user;
	}
	
	async run() {
		throw new TypeError( "not implemented error" );
	}
	
}

class ProgramMetadata {
	
	/** @type {?UnixTime} */
	end;
	
	/** @type {?Number} */
	exit;
	
	/** @type {Number} */
	pid;
	
	/** @type {Program} */
	program;
	
	/** @type {UnixTime} */
	start;
	
	/** @type {String} */
	state; // exit|killed|running
	
	/** @type {User} */
	user;
	
	/**
	 * 
	 * Construct method of class ProgramMetadata
	 * 
	 * @param {Program} program
	 * @param {Number} pid
	 * @param {Object} options
	 * @param {UnixTime} options.start
	 * @param {String} options.state
	 * @param {User} options.user
	 * 
	 */
	constructor( program, pid, options ) {
		this.end = null;
		this.exit = null;
		this.pid = pid;
		this.program = program;
		this.start = options?.start ?? new UnixTime();
		this.state = options?.state ?? "running";
		this.user = options.user;
	}
	
}

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
		this.env = Object.assign( new Map(), env || {}, {
			HOME: home,
			SHELL: shell,
			PATH: "/bin:/usr/bin",
			PWD: home,
			USER: username
		});
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
		if (this.root()) return true;
		if (vnode.uid === this.uid) return (vnode.mode & 0o100) !== 0;
		if (vnode.gid === this.gid) return (vnode.mode & 0o010) !== 0;
		return (vnode.mode & 0o001) !== 0;
	}
	
	/**
	 * Return whether user is allowed to read virtual node
	 * 
	 * @param {VirtualNode} vnode
	 * 
	 * @returns {Boolean}
	 */
	readable( vnode ) {
		if( this.root()) return true;
		if( vnode.uid === this.uid) return (vnode.mode & 0o400) !== 0;
		if( vnode.gid === this.gid) return (vnode.mode & 0o040) !== 0;
		return (vnode.mode & 0o004) !== 0;
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
		if (this.root()) return true;
		if (vnode.uid === this.uid) return (vnode.mode & 0o200) !== 0;
		if (vnode.gid === this.gid) return (vnode.mode & 0o020) !== 0;
		return (vnode.mode & 0o002) !== 0;
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

class VirtualFileSystem {
	
	/** @type {String} */
	cwd;
	
	/** @type {Kernel} */
	kernel;
	
	/** @type {?String} */
	pk; // persist key
	
	/** @type {VirtualNode} */
	root;
	
	/** @type {Router} */
	router;
	
	/** @type {UnixTime} */
	time;
	
	/**
	 * Construct method of class VirtualFileSystem
	 * 
	 * @param {Kernel} kernel
	 * @param {?String} pk
	 * @param {?Router} router
	 * 
	 */
	constructor( kernel, pk, router ) {
		var structs = [
			"/bin>>/usr/bin",
			"/boot",
			"/data",
			"/dev",
			"/etc",
			"/etc/alternatives",
			"/etc/profile.d",
			"/home",
			"/media",
			"/proc",
			"/run",
			"/run/lock",
			"/sbin>>/usr/sbin",
			"/self",
			"/self/personal",
			"/tmp",
			"/usr",
			"/usr/bin",
			"/usr/lib",
			"/usr/lib32",
			"/usr/lib64",
			"/usr/local",
			"/usr/local/bin",
			"/usr/local/sbin",
			"/usr/local/share",
			"/usr/sbin",
			"/usr/share",
			"/var",
			"/var/lib",
			"/var/lock>>/run/lock",
			"/var/log",
			"/var/run>>/run"
		];
		var user = kernel.user();
		this.cwd = "/";
		this.kernel = kernel;
		this.pk = pk;
		this.router = router;
		this.time = new UnixTime();
		try {
			this.root = this.revive();
		}
		catch( e ) {
			this.root = new VirtualNode( this.time, user.gid, 0o755, "/", "path", user.uid, this.time, { contents: new Map() } );
			for( let struct of structs ) {
				var paths = struct.split( ">>" );
				this.mkdir( paths[0], { mode: 0o755, user: user } );
				if( paths.length >= 2 ) {
					var walk = this.walk( paths[0] );
					walk.contents = paths[1];
					walk.type = "link";
				}
			}
		}
	}
	
	/**
	 * 
	 * @param {String} filename
	 * @param {Object} options
	 * @param {Buffer|String} [options.contents]
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied or no such file or directory
	 * 
	 */
	append( filename, options={ contents: "", user: null } ) {
		var normalized = this.normalize( filename );
		var basename = this.basename( filename );
		var basepath = "/".concat( this.split( normalized ).slice( 0, -1 ).join( "/" ) );
		var contents = options.contents || "";
		var parent = this.walk( basepath );
		var user = options.user;
		if( user.writeable( parent ) ) {
			if( parent.type === "file" ) {
				throw new TypeError( Fmt( "{}: not a directory", basepath ) );
			}
			var file = parent.contents.get( basename );
			if( file ) {
				if( user.writeable( file ) === false ) {
					throw new TypeError( Fmt( "{}: permission denied", filename ) );
				}
				if( file.type !== "file" ) {
					throw new TypeError( Fmt( "{}: is a directory", filename ) );
				}
				if( Typed( file.contents, String ) ) {
					if( Typed( contents, String ) === false ) {
						contents = contents.toString( "utf-8" );
					}
					file.contents+= contents;
				}
				else {
					if( Typed( contents, String ) === false ) {
						contents = Buffer.from( contents );
					}
					file.contents = Buffer.concat([ file.contents, contents ]);
				}
				file.utime = new UnixTime();
			}
			else {
				file = new VirtualNode( null, user.gid, options.mode ?? parent.mode ?? 0o666, basename, "file", user.uid, null, { contents: contents } );
				parent.contents.set( basename, file );
			}
			this.persist();
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", basepath ) );
		}
	}
	
	/**
	 * Returns basename of pathname
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {String}
	 * 
	 */
	basename( pathname ) {
		return pathname.split( "/" ).at( -1 );
	}
	
	/**
	 * 
	 * @param {Object} object
	 * @param {Map<String,Object>|Function|String} [object.contents]
	 * @param {UnixTime} [object.ctime]
	 * @param {Number} [object.gid]
	 * @param {Number} [object.mode]
	 * @param {String} [object.name]
	 * @param {Object} [object.options]
	 * @param {Boolean} [object.scripting]
	 * @param {String} [object.type]
	 * @param {Number} [object.uid]
	 * @param {UnixTime} [object.utime]
	 * 
	 * @returns {VirtualNode}
	 * 
	 */
	builder( object={} ) {
		var contents = object.contents;
		if( object.scripting ?? false ) {
			console.warn( "unallowed to transform JavaScript contents into executable code" );
		}
		if( Typed( contents, Object ) ) {
			if( contents?.type === "Buffer" && contents?.data ) {
				contents = Buffer.from( contents.data );
			}
			else {
				contents = new Map();
				for( let keyset of Object.keys( object.contents ) ) {
					contents.set( keyset, this.builder( object.contents[keyset] ) );
				}
			}
		}
		var ctime = new UnixTime();
		if( object?.ctime?.date ) {
			ctime = new UnixTime( Date.parse( object.ctime.date ) );
		}
		var utime = new UnixTime();
		if( object?.utime?.date ) {
			utime = new UnixTime( Date.parse( object.utime.date ) );
		}
		return new VirtualNode( ctime, object.gid, object.mode, object.name, object.type, object.uid, utime, { contents: contents } );
	}
	
	/**
	 * Change the current working directory to DIR
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied not pathname is not directory or link
	 * 
	 */
	cd( pathname, options={ user: null } ) {
		var real = this.normalize( pathname, this.cwd );
		var path = this.walk( pathname, this.cwd );
		if( path.type === "file" ) {
			throw new TypeError( Fmt( "{}: not a directory", real ) );
		}
		var user = options.user;
		if( user.readable( path ) ) {
			if( this.router ) {
				this.router.push( "/terminal".concat( real ) );
			}
			this.cwd = real;
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", real ) );
		}
	}
	
	/**
	 * ...
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {Number|String|User} [options.group]
	 * @param {Boolean} [options.recursive]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} Throws whether group not found or permission denied
	 * 
	 */
	chgrp( pathname, options={ group: null, recursive: false, user: null } ) {
		var path = this.walk( pathname );
		var user = null;
		if( Typed( options.group, [ Number, String ] ) ) {
			for( let element of this.kernel.users.values() ) {
				if( ( Typed( options.group, Number ) && element.gid === options.group ) ||
					( Typed( options.group, String ) && element.username === options.group ) ) {
					user = element;
					break;
				}
			}
			if( user === null ) {
				throw new TypeError( Fmt( "{}: group not found", options.group ) );
			}
		}
		else {
			user = options.group;
		}
		if( options.user.root() === false ||
			options.user.gid === user.gid ) {
			throw new TypeError( Fmt( "{}: user is not member of group {}", pathname, options.group ) );
		}
		path.gid = user.gid;
		if( path.type !== "file" && options?.recursive ) {
			for( let element of path.contents.values() ) {
				this.chgrp( pathname.concat( "/".concat( element.name ) ), options );
			}
		}
		this.persist();
	}
	
	/**
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {Number|String} [options.modes]
	 * @param {Boolean} [options.recursive]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} Throws whether permission denied
	 * 
	 */
	chmod( pathname, options={ modes: null, recursive: false, user: null } ) {
		var path = this.walk( pathname );
		var mode = this.mode( options.modes, path.mode );
		if( options.user.root() === false ||
			options.user.uid !== path.uid ) {
			throw new TypeError( Fmt( "{}: permission denied", pathname ) );
		}
		path.mode = mode;
		if( path.type !== "file" && options?.recursive ) {
			for( let element of path.contents.values() ) {
				this.chmod( pathname.concat( "/".concat( element.name ) ), options );
			}
		}
		this.persist();
	}
	
	/**
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {Number} [options.owner]
	 * @param {Boolean} [options.recursive]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} Throws whether owner not found or permission denied
	 * 
	 */
	chown( pathname, options={ owner: null, recursive: false, user: null } ) {
		var path = this.walk( pathname );
		var user = null;
		if( Typed( options.owner, [ Number, String ] ) ) {
			for( let element of this.kernel.users.values() ) {
				if( ( Typed( options.owner, Number ) && element.uid === options.owner ) ||
					( Typed( options.owner, String ) && element.username === options.owner ) ) {
					user = element;
					break;
				}
			}
			if( user === null ) {
				throw new TypeError( Fmt( "{}: owner not found", options.owner ) );
			}
		}
		else {
			user = options.owner;
		}
		if( options.user.root() === false ) {
			throw new TypeError( Fmt( "{}: permission denied", pathname ) );
		}
		path.uid = user.uid;
		if( path.type !== "file" && options?.recursive ) {
			for( let element of path.contents.values() ) {
				this.chown( pathname.concat( "/".concat( element.name ) ), options );
			}
		}
		this.persist();
	}
	
	/**
	 * Returns whether pathname is exists
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Boolean}
	 * 
	 */
	exists( pathname ) {
		try {
			this.walk( pathname );
		}
		catch( e ) {
			return false;
		}
		return true;
	}
	
	/**
	 * Returns whether pathname is directory type
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isdir( pathname ) {
		try {
			return this.walk( pathname, this.cwd ).type === "path";
		}
		catch( e ) {
		}
		return false;
	}
	
	/**
	 * Returns whether pathname is file type
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Boolean}
	 * 
	 */
	isfile( pathname ) {
		try {
			return this.walk( pathname, this.cwd ).type === "file";
		}
		catch( e ) {
		}
		return false;
	}
	
	/**
	 * Returns whether pathname is link
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Boolean}
	 * 
	 */
	islink( pathname ) {
		try {
			return this.walk( pathname, this.cwd, { follow: false } ).type === "link";
		}
		catch( e ) {
		}
		return false;
	}
	
	/**
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {User} [options.user]
	 * 
	 * @returns {Array<VirtualNode>|VirtualNode}
	 * 
	 * @throws {TypeError} Throws whether permission denied
	 * 
	 */
	ls( pathname, options={ user: null } ) {
		var path = this.walk( pathname );
		var user = options.user;
		if( user.readable( path ) ) {
			if( path.type !== "file" &&
				pathname.endsWith( "/" ) ) {
				return Array.from( path.contents.values() ).map( entry => entry.copy() );
			}
			return path.copy();
		}
		throw new TypeError( Fmt( "{}: permission denied", this.normalize( pathname ) ) );
	}
	
	/**
	 * Creates a new directory at the specified path
	 * 
	 * This method is used to create directories recursively if needed,
	 * with additional options to specify the user context to be
	 * used when creating the directory.
	 * 
	 * @param {String} pathname
	 *  Full path of the directory to be created
	 * @param {Object} options
	 *  Additional options for directory configuration
	 * @param {Number} [options.mode]
	 *  Directory permission mode
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @throws {TypeError}
	 *  Throws whether directory creation fails due to
	 *  permissions or other system errors
	 * 
	 */
	mkdir( pathname, options={} ) {
		var normalized = this.normalize( pathname );
		if( normalized !== "/" ) {
			var passed = "";
			var parent = this.root;
			var parts = this.split( normalized );
			var time = new UnixTime();
			var user = options.user;
			for( let i=0; i<parts.length; i++ ) {
				var part = parts[i];
				if( parent.type === "file" ) {
					throw new TypeError( Fmt( "{}: not a directory", passed || "/" ) );
				}
				if( parent.type === "link" ) {
					passed+= "/".concat( part );
					parent = this.root();
					parts = [ ...this.split( parent.contents, passed ), ...parts.slice( i ) ];
					i = 0;
				}
				else {
					if( parent.contents.has( part ) === false ) {
						if( user.writeable( parent ) ) {
							parent.contents.set( part, new VirtualNode( time, user.gid, options.mode ?? 0o700, part, "path", user.uid, time, { contents: new Map() } ) );
						}
						else {
							throw new TypeError( Fmt( "{}: permission denied", passed || "/" ) );
						}
					}
					passed+= "/".concat( part );
					parent = parent.contents.get( part );
				}
			}
		}
		this.persist();
	}
	
	/**
	 * Returns new mode which is the result of applying the change
	 * if baseMode is provided, or absoluteMode if mode is octal.
	 * 
	 * @param {Number|String} mode
	 *  Accepts octal string or symbolic numbers (u,g,o,a +/- rwx [, ...])
	 * @param {Number} base
	 * 
	 * @returns {Number}
	 * 
	 * @throws {TypeError}
	 *  Throws whether mode is null, or symbolic mode require base mode,
	 *  and whether invalid symbolic mode passed.
	 * 
	 */
	mode( mode, base=null ) {
		if( mode === null ) throw new TypeError( "mode required" );
		if( Typed( mode, String ) ) {
			var normalized = String( mode ).trim();
			if( base === null ) {
				throw new TypeError( Fmt( "{}: symbolic mode requires baseMode", normalized ) );
			}
			
			// oktal: ^0?[0-7]{3,4}$
			if( /^0?[0-7]{3,4}$/.test( normalized ) ) {
				
				// parse as absolute octal
				return parseInt( normalized, 8 ) & 0o7777;
			}
			
			// symbolic: comma separated operations
			// example: u+r,g-w,o+x, a=rw
			let octal = base & 0o7777;
			
			const whoMap = { u: 0o700, g: 0o070, o: 0o007, a: 0o777 };
			const permMap = { r: 4, w: 2, x: 1 };
			
			const ops = normalized.split(",");
			for (const op of ops) {
				const m = op.match(/^([ugoa]*)([+=-])([rwx]+)$/);
				if (!m) throw new TypeError("invalid symbolic mode: " + op);
				let [, who, operator, perms] = m;
				if (!who) who = "a";
				// compute permission bits to affect (for u/g/o)
				let mask = 0;
				for (const c of who) {
					if (c === "u") mask |= 0o700;
					if (c === "g") mask |= 0o070;
					if (c === "o") mask |= 0o007;
					if (c === "a") mask |= 0o777;
				}
				// compute perm bits relative positions
				let permBits = 0;
				for (const p of perms) {
					const v = permMap[p]; // 4/2/1
					if (!v) continue;
					// apply for u/g/o: shift into positions
					// r: 0o400,0o040,0o004 -> pattern: base 0o444 => distributed by who mask
					// We'll apply by mapping each who to respective shifted bits.
					if (mask & 0o700) permBits |= ((v) << 6); // u
					if (mask & 0o070) permBits |= ((v) << 3); // g
					if (mask & 0o007) permBits |= (v);				// o
				}
				
				// But above double-counts if who includes multiple; instead compute per who separately:
				// Simpler approach: compute per who token
				let applied = 0;
				const whos = who.split("");
				for (const w of whos) {
					if (w === "u") {
						for (const p of perms) {
							const v = permMap[p];
							if (v === 4) applied |= 0o400;
							if (v === 2) applied |= 0o200;
							if (v === 1) applied |= 0o100;
						}
					} else if (w === "g") {
						for (const p of perms) {
							const v = permMap[p];
							if (v === 4) applied |= 0o040;
							if (v === 2) applied |= 0o020;
							if (v === 1) applied |= 0o010;
						}
					} else if (w === "o") {
						for (const p of perms) {
							const v = permMap[p];
							if (v === 4) applied |= 0o004;
							if (v === 2) applied |= 0o002;
							if (v === 1) applied |= 0o001;
						}
					} else if (w === "a") {
						for (const p of perms) {
							const v = permMap[p];
							if (v === 4) applied |= 0o444;
							if (v === 2) applied |= 0o222;
							if (v === 1) applied |= 0o111;
						}
					}
				}
				
				if (operator === "+") {
					octal = octal | applied;
				} else if (operator === "-") {
					octal = octal & (~applied);
				} else if (operator === "=") {
					// For '=' we need to clear previous for those who, then set
					// Build clear mask for selected who
					let clearMask = 0;
					const whos2 = who.split("");
					for (const w of whos2) {
						if (w === "u") clearMask |= 0o700;
						if (w === "g") clearMask |= 0o070;
						if (w === "o") clearMask |= 0o007;
						if (w === "a") clearMask |= 0o777;
					}
					// clear r/w/x bits under clearMask
					// compute bits representing r/w/x for those who
					let rwxClear = 0;
					if (clearMask & 0o700) rwxClear |= 0o700;
					if (clearMask & 0o070) rwxClear |= 0o070;
					if (clearMask & 0o007) rwxClear |= 0o007;
					octal = (octal & (~rwxClear)) | applied;
				}
			}
			return octal & 0o7777;
		}
		return mode & 0o7777;
	}	
	
	/**
	 * Normalize pathname
	 * 
	 * @param {String} pathname
	 * @param {?String} cwd
	 * 
	 * @returns {String}
	 * 
	 */
	normalize( pathname, cwd ) {
		if( isEmpty( cwd ) ) {
			cwd = this.cwd;
		}
		if( pathname.startsWith( "/" ) === false ) {
			pathname = cwd.concat( "/".concat( pathname ) );
		}
		var parts = this.split( pathname );
		var value = [];
		for( let part of parts ) {
			if( part === "." ) continue;
			if( part === ".." ) {
				value.pop();
				continue;
			}
			value.push( part );
		}
		return "/".concat( value.join( "/" ) );
	}
	
	persist() {
		if( this.pk ) {
			localStorage.setItem( bin2hex( this.pk ), JSON.stringify( this.root.object(), null , 4 ) );
		}
	}
	
	/**
	 * 
	 * @param {String} filename
	 * @param {Object} options
	 * @param {String} [options.encode]
	 *  Content encoding (Buffer only)
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @returns {String}
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied or no such file or directory
	 * 
	 */
	read( filename, options={ encode: "utf-8", user: null } ) {
		var normalized = this.normalize( filename );
		var file = this.walk( normalized );
		var user = options.user;
		if( user.readable( file ) ) {
			if( file.type === "file" ) {
				if( Typed( file.contents, String ) ) {
					return new String( file.contents );
				}
				return file.contents.toString( options.encode || "utf-8" );
			}
			throw new TypeError( Fmt( "{}: not a file", normalized ) );
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", basepath ) );
		}
	}
	
	/**
	 * Returns resolved symbolic links or cannonical file names
	 * 
	 * @param {String} pathname
	 * @param {Object} options
	 * @param {User} [options.user]
	 * 
	 * @returns {?String}
	 * 
	 */
	readlink( pathname, options={} ) {
		var normalize = this.normalize( pathname, this.cwd );
		if( this.islink( pathname ) ) {
			var path = this.walk( pathname, this.cwd, { follow: false } );
			if( options.user.readable( path ) === false ) {
				throw new TypeError( Fmt( "{}: permission denied", normalize ) );
			}
			return this.normalize( path.contents, normalize );
		}
	}
	
	/**
	 * 
	 * @param {String} pathname 
	 * @param {Object} options
	 * @param {Boolean} [options.dir]
	 * @param {Boolean} [options.file]
	 * @param {Boolean} [options.recursive]
	 * @param {User} [options.user]
	 * 
	 * @throws {TypeError} Throws whether permission denied or directory is not empty
	 * 
	 */
	remove( pathname, options={} ) {
		var normalize = this.normalize( pathname, this.cwd );
		var filepath = this.walk( pathname );
		var basepath = this.walk( "/".concat( this.split( normalize ).slice( 0, -1 ).join( "/" ) ) );
		if( options.user.writeable( filepath ) ) {
			if( options?.dir && filepath.type !== "path" ) {
				throw new TypeError( Fmt( "{}: is not a directory", normalize ) );
			}
			if( options?.file && filepath.type === "path" ) {
				throw new TypeError( Fmt( "{}: is not a file", normalize ) );
			}
			if( filepath.type === "path" && filepath.contents.size >= 1 ) {
				if( options.recursive ?? false ) {
				}
				else {
					throw new TypeError( Fmt( "{}: directory is not empty", normalize ) );
				}
			}
			basepath.contents.delete( this.basename( normalize ) );
			this.persist();
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", normalize ) );
		}
	}
	
	revive() {
		if( this.pk ) {
			try {
				var item = localStorage.getItem( bin2hex( this.pk ) );
				if( item ) {
					return this.builder( JSON.parse( item ) );
				}
			}
			catch( e ) {
				console.error( e );
			}
		}
		throw new TypeError( "Failed revive root node" );
	}
	
	/**
	 * Split pathname
	 * 
	 * @param {String} pathname
	 * 
	 * @returns {Array<String>}
	 * 
	 */
	split( pathname ) {
		return pathname.split( "/" ).filter( Boolean );
	}
	
	/**
	 * 
	 * @param {String} pathname
	 * 
	 */
	stat( pathname ) {
		var walk = this.walk( pathname );
		return {
			ctime: walk.ctime,
			gid: walk.gid,
			mode: walk.mode,
			type: walk.type,
			uid: walk.uid,
			utime: walk.utime
		};
	}
	
	/**
	 * 
	 * @param {String} filename
	 * @param {Object} options
	 * @param {Number} [options.mode]
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied or no such file or directory
	 * 
	 */
	touch( filename, options={ user: null } ) {
		var normalized = this.normalize( filename );
		var basename = this.basename( filename );
		var basepath = "/".concat( this.split( normalized ).slice( 0, -1 ).join( "/" ) );
		var parent = this.walk( basepath );
		var user = options.user;
		if( user.writeable( parent ) ) {
			if( parent.type === "file" ) {
				throw new TypeError( Fmt( "{}: not a directory", basepath ) );
			}
			var file = parent.contents.get( basename );
			if( file ) {
				// Nothing happed here!
			}
			else {
				file = new VirtualNode( null, user.gid, options.mode ?? 0o666, basename, "file", user.uid, null, { contents: "" } );
				parent.contents.set( basename, file );
			}
			this.persist();
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", basepath ) );
		}
	}
	
	/**
	 * Returns VirtualNode by pathname
	 * 
	 * @param {String} pathname
	 * @param {String} cwd
	 * @param {Object} options
	 * @param {?Boolean} [options.follow]
	 *  Follow whether VirtualNode is symlink (default: true)
	 * 
	 * @returns {VirtualNode}
	 * 
	 */
	walk( pathname, cwd, options={} ) {
		if( isEmpty( cwd ) ) {
			cwd = this.cwd;
		}
		if( pathname === "/" ) {
			return this.root;
		}
		var follow = options.follow ?? true;
		var passed = "";
		var parts = this.split( this.normalize( pathname, cwd ) );
		var root = this.root;
		for( let i=0; i<parts.length; i++ ) {
			var part = parts[i];
			var path = root.contents.get( part );
			passed+= "/".concat( part );
			if( path ) {
				if( path.type === "file" ) {
					if( parts[i+1] ) {
						throw new TypeError( Fmt( "{}: not a directory", passed ) );
					}
				}
				if( path.type === "link" ) {
					if( follow ) {
						root = this.walk( path.contents, passed );
						continue;
					}
				}
				root = path;
				continue;
			}
			throw new TypeError( Fmt( "{}: no such file or directory", passed ) );
		}
		return root;
	}
	
	/**
	 * 
	 * @param {String} filename
	 * @param {Object} options
	 * @param {Buffer|String} [options.contents]
	 * @param {Number} [options.mode]
	 * @param {User} [options.user]
	 *  Current user previlege
	 * 
	 * @throws {TypeError}
	 *  Throws whether permission denied or no such file or directory
	 * 
	 */
	write( filename, options={ contents: "", mode: 0o666, user: null } ) {
		var normalized = this.normalize( filename );
		var basename = this.basename( filename );
		var basepath = "/".concat( this.split( normalized ).slice( 0, -1 ).join( "/" ) );
		var contents = options.contents || "";
		var parent = this.walk( basepath );
		var user = options.user;
		if( user.writeable( parent ) ) {
			if( parent.type === "file" ) {
				throw new TypeError( Fmt( "{}: not a directory", basepath ) );
			}
			var file = parent.contents.get( basename );
			if( file ) {
				if( user.writeable( file ) === false ) {
					throw new TypeError( Fmt( "{}: permission denied", filename ) );
				}
				if( file.type !== "file" ) {
					throw new TypeError( Fmt( "{}: is a directory", filename ) );
				}
				file.contents = contents;
				file.utime = new UnixTime();
			}
			else {
				file = new VirtualNode( null, user.gid, options.mode ?? parent.mode ?? 0o666, basename, "file", user.uid, null, { contents: contents } );
				parent.contents.set( basename, file );
			}
			this.persist();
		}
		else {
			throw new TypeError( Fmt( "{}: permission denied", basepath ) );
		}
	}
	
}

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
	Group,
	Kernel,
	Password,
	Program,
	ProgramMetadata,
	Root,
	Stderr,
	Stdin,
	Stdout,
	User,
	VirtualFileSystem,
	VirtualNode,
	VirtualNodeGroup,
	VirtualNodePasswd,
	VirtualNodeShadow,
	VirtualStream
};
