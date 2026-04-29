
/**
 * 
 * hxAri | program.js
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

import { User } from "/src/scripts/terminal/kernel/user";
import { Stderr, Stdin, Stdout } from "/src/scripts/terminal/kernel/virtual/stream";
import { UnixTime } from "/src/scripts/unixtime";


/**
 * Program interface
 * 
 * @example
 * >>> class Echo extends Program {
 * >>>     async run() {
 * >>>         this.stdout.write( ...argv );
 * >>>     }
 * >>> }
 */
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
	
	async help() {
		throw new TypeError( "not implemented error" );
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

export {
	Program,
	ProgramMetadata
}
