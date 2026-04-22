
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

import { Fmt } from "/src/scripts/formatter";
import { Router } from "/src/routing";
import { Alias } from "/src/scripts/terminal/shell/alias";
import { ANSI, ANSIColors, ANSIFormats, ANSIProperties } from "/src/scripts/terminal/shell/ansi";
import { History } from "/src/scripts/terminal/shell/history";
import { Kernel, Program, Stderr, Stdin, Stdout, User, VirtualNode } from "/src/scripts/terminal/kernel";
import { Lexer } from "/src/scripts/terminal/shell/lexer";
import { sleep } from "/src/scripts/terminal/shell/sleep";
import { Token, TokenGroup, TokenGrouped, TokenProcessSubtitution, TokenType } from "/src/scripts/terminal/shell/token";
import { UnixTime } from "/src/scripts/unixtime";


class Shell {
	
	/** @type {Map<String,Alias>} */
	aliases;
	
	/** @type {ANSI} */
	ansi;
	
	/** @type {Map<String,String>} */
	env;
	
	/** @type {Map<String,String>} */
	exports;
	
	/** @type {Array<History>} */
	history;
	
	/** @type {Kernel} */
	kernel;
	
	/** @type {Lexer} */
	lexer;
	
	/** @type {Stderr} */
	stderr;
	
	/** @type {Stdin} */
	stdin;
	
	/** @type {Stdout} */
	stdout;
	
	/** @type {User} */
	user;
	
	/**
	 * Construct method of class Shell
	 * 
	 * @param {Kernel} kernel
	 * @param {Object} options
	 * @param {Object} options.env
	 * @param {User} options.user
	 * 
	 */
	constructor( kernel, options={} ) {
		var user = options?.user ?? kernel.user();
		var object = Object.assign( {}, 
			{
				GROUPS: user.gid,
				HOME: user?.home ?? "/",
				HOSTNAME: kernel.hostname,
				OLDPWD: user.home,
				PATH: "/bin:/usr/bin",
				PWD: user.home,
				SHELL: user.shell,
				USER: user.username,
				PS1: "\\[\\e[1;38;5;112m\\]\\u\\[\\e[1;38;5;190m\\]@\\h\\[\\e[1;38;5;214m\\]:\x20\\[\\e[1;32m\\]\\w\\[\\e[1;37m\\]\x20$\x20"
			},
			options.env || {}, 
			user.env || {}
		);
		this.aliases = new Map();
		this.ansi = new ANSI();
		this.env = new Map();
		this.exports = new Map();
		this.history = [];
		this.historyIndex = -1;
		this.kernel = kernel;
		this.lexer = new Lexer( false );
		this.stderr = new Stderr();
		this.stdin = new Stdin();
		this.stdout = new Stdout();
		this.user = user;
		if( this.user ) {
			this.env = this.user.env;
		}
		for( let [ keyset, value ] of Object.entries( object ) ) {
			this.env.set( keyset, value );
		}
	}
	
	/**
	 * Completion for given command
	 * 
	 * @param {String} command
	 * 
	 * @returns {String}
	 */
	complete( command ) {
		const parts = command.split( /\s+/ );
		const lastPart = parts[parts.length - 1];
		if( parts.length <= 1 ) {
			// Complete from programs and aliases
			const candidates = [
				...this.kernel.programs.keys(),
				...this.aliases.keys()
			];
			const matches = candidates.filter( c => c.startsWith( lastPart ) );
			if( matches.length === 1 ) {
				return command.substring( 0, command.length - lastPart.length ) + matches[0] + " ";
			}
		} else {
			// Complete from files in CWD
			try {
				const entries = this.kernel.vfs.ls( ".", { user: this.user } );
				const names = Array.from( entries.contents.keys() );
				const matches = names.filter( n => n.startsWith( lastPart ) );
				if( matches.length === 1 ) {
					const isDir = entries.contents.get( matches[0] ).type === "path";
					return command.substring( 0, command.length - lastPart.length ) + matches[0] + ( isDir ? "/" : " " );
				}
			} catch( e ) {
			}
		}
		return command;
	}
	
	/**
	 * Execute given command.
	 * 
	 * @param {String} command
	 * 
	 * @returns {Promise<void>}
	 * 
	 */
	async execute( command ) {
		this.stdout.write( this.ps1().concat( this.ansi.colorize( command ) ) );
		this.stdout.write( "\x0a" );
		this.stdout.write( this.ps1().concat( this.ansi.colorize( command ) ) );
		if( this.history.length >= 40 ) {
			this.history = [];
		}
		const iterator = this.tokenize( command );
		while( true ) {
			const iterated = iterator.next();
			if( iterated.done ) {
				break;
			}
			console.clear();
			console.debug( Fmt( "Shell.execute: {}", JSON.stringify( iterated.value, null, 4 ) ) );
			const executables = await this.executables();
			console.debug( "Executables: {}", executables );
			if( executables.has( iterated.value[0].lexeme ) ) {
				const executable = executables.get( iterated.value[0].lexeme );
				if( this.user.executable( executable ) ) {
					// Spawn here!
					continue;
				}
				throw new Error( Fmt( "{}: permission denied", iterated.value[0].lexeme ) );
			}
			throw new Error( Fmt( "{}: command not found", iterated.value[0].lexeme ) );
		}
	}
	
	/**
	 * Returns executable files (based on environment `PATH`)
	 * 
	 * @returns {Map<String,VirtualNode>}
	 * 
	 */
	async executables() {
		const pathnames = this.env.get( "PATH" ).split( ":" );
		const executables = new Map();
		for( const pathname of pathnames ) {
			if( this.kernel.vfs.isdir( pathname ) ) {
				for( const vnode of this.kernel.vfs.ls( pathname, { user: this.user } ) ) {
					if( vnode.mode && 0o100 !== 0 ) {
						executables.set( vnode.name, vnode );
					}
				}
			}
		}
		return executables;
	}

	/**
	 * Expand environment variables in a string
	 * 
	 * @param {String} text
	 * 
	 * @returns {String}
	 */
	expand( text ) {
		return text.replace( /\$(\{)?([A-Za-z0-9_@*!#?$-]+)(\})?/g, ( match, brace, name, braceEnd ) => {
			if( this.exports.has( name ) ) {
				return this.exports.get( name );
			}
			if( this.env.has( name ) ) {
				return this.env.get( name );
			}
			return "";
		});
	}
	
	/**
	 * Get previous command from history
	 * 
	 * @returns {?String}
	 */
	historyPrev() {
		if( this.history.length === 0 ) return null;
		if( this.historyIndex === -1 ) {
			this.historyIndex = this.history.length - 1;
		} else if( this.historyIndex > 0 ) {
			this.historyIndex--;
		}
		return this.history[this.historyIndex];
	}
	
	/**
	 * Get next command from history
	 * 
	 * @returns {?String}
	 */
	historyNext() {
		if( this.history.length === 0 || this.historyIndex === -1 ) return null;
		if( this.historyIndex < this.history.length - 1 ) {
			this.historyIndex++;
			return this.history[this.historyIndex];
		} else {
			this.historyIndex = -1;
			return "";
		}
	}
	
	ps1() {
		var PS1 = this.exports.get( "PS1" ) ?? this.env.get( "PS1" );
		var index = 0;
		var match = null;
		var prompt = "";
		var regexp = /(?<backslash>\\)(?!(e|x1b|033))(?<format>[^\s]{0,1})/g;
		var datetime = new UnixTime();
		while( ( match = regexp.exec( PS1 ) ) !== null ) {
			var value = "";
			switch( match.groups.format ) {
				
				// The date in "Weekday Month Date" format (e.g., "Tue May 26")
				case "d": value = datetime.format( "%a %b %d" ); break;
				
				// The hostname.
				case "h":
				case "H": value = this.kernel.hostname; break;
				
				// New line.
				case "n": value = "<br/>"; break;
				
				// The name of the shell.
				case "s": value = this.user.shell; break;
				
				// Current working directory.
				// case "w": value = this.pwd() !== this.exports.HOME ? this.pwd() : "~"; break;
				
				// Basename current working directory.
				// case "W": value = this.pwd( true ); break;
				
				// The username of current user.
				case "u": value = this.user.username; break;
				
				// The current time in 24-hour HH:MM:SS format.
				case "t": value = datetime.format( "%H:%M:%S" ); break;
				
				// The current time in 12-hour HH:MM:SS format.
				case "T": value = datetime.format( "%I:%M:%S" ); break;
				
				// The current time in 12-hour am/pm format.
				case "@": value = Fmt( "{} {}", datetime.format( "%I:%M" ), datetime.hours() >= 12 ? "PM" : "AM" ); break;
				
				// The current time in 24-hour HH:MM format.
				case "A": value = datetime.format( "%H:%M" ); break;
				
				default:
					break;
			}
			prompt+= PS1.substring( index, regexp.lastIndex - match[0].length ) + value;
			index = regexp.lastIndex;
		}
		return prompt.concat( PS1.substring( index ) );
	}
	
	/**
	 * 
	 * @param {String} command
	 * 
	 * @returns {Iterator<Array<Token>>}
	 */
	*tokenize( command ) {
		var lexer = new Lexer( command, true );
		var tokenized = lexer.tokenize();
		var stacks = [];
		for( let token of tokenized ) {
			if( token.typed === TokenType.EOF ) {
				continue;
			}
			if( token.typed === TokenType.SEMICOLON ) {
				if( stacks.length >= 1 ) {
					yield stacks;
				}
				stacks = [];
				continue;
			}
			stacks.push( token );
		}
		yield stacks;
	}
	
}

export {
	Alias,
	ANSI,
	ANSIColors,
	ANSIFormats,
	ANSIProperties,
	History,
	Lexer,
	Shell,
	sleep,
	Token,
	TokenGroup,
	TokenGrouped,
	TokenProcessSubtitution,
	TokenType
};
