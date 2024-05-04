
// Import Shlex
import { split as ShlexSplit } from "shlex"

// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

export default {
	name: "js",
	type: "binary",
	data: {
		patterns: {
			argument: /(?<backslash>\\{0,})(?<search>(?:\$((?<arithmeticOperation>[\(]{2})|(?<parameterExpansion>[\{]{1})|(?<subtitutionExpansion>[\(]{1}))))/gms,
			tokenizer: {
				arithmeticOperation: {
					name: "arithmetic",
					group: "expansion",
					terminator: {
						begin: "$((",
						end: "))"
					},
					handler: function() {
						// console.log( arguments[0] );
					}
				},
				parameterExpansion: {
					name: "parameter",
					group: "expansion",
					terminator: {
						begin: "${",
						end: "}"
					},
					handler: function() {
						// console.log( arguments[0] );
					}
				},
				subtitutionExpansion: {
					name: "subtitution",
					group: "expansion",
					terminator: {
						begin: "$(",
						end: ")"
					},
					handler: function() {
						// console.log( arguments[0] );
					}
				}
			}
		}
	},
	author: Author,
	abouts: "A simple virtual shell command line",
	version: "1.0",
	release: "10, Apr 2023",
	actions: [
		{
			gid: 0,
			uid: 0,
			oct: 7
		}
	],
	options: {
		argument: {
			type: String,
			usage: "Execute JavaScript syntax",
			require: true
		},
		file: {
			type: String,
			usage: "Execute JavaScript file",
			require: false
		},
		help: {
			type: Boolean,
			usage: "Display this help",
			require: false
		}
	},
	methods: {
		parser: function( stdin ) {
			var tokenizer = this.patterns.tokenizer;
			var pattern = this.patterns.argument;
			var matches = null;
			var results = "";
			var position = 0;
			var backslash = "";
			while( ( matches = pattern.exec( stdin ) ) !== null ) {
				var groups = Object.keys( matches.groups );
					results += stdin.substring( position, pattern.lastIndex - matches[0].length );
					position = pattern.lastIndex;
					backslash = "";
				if( Type( matches.groups.backslash, String ) && Value.isNotEmpty( matches.groups.backslash ) ) {
					var length = length = matches.groups.backslash.length;
					if( length !== 1 ) {
						if( length % 2 !== 0 ) {
							results += "\\".repeat( length -1 );
							results += matches.groups.search;
							continue;
						}
						results+= "\\".repeat( length === 2 ? length -1 : length -2 );
					}
					else {
						results += matches.groups.search;
						continue;
					}
				}
				var group = null;
				var token = null;
				for( let keyset of groups ) {
					if( [ "backslash", "search" ].indexOf( keyset ) >= 0 ) {
						continue;
					}
					if( Type( matches.groups[keyset], String ) && Type( tokenizer[keyset], Object ) ) {
						if( Type( tokenizer[keyset].terminator, Object ) === false ) {
							continue;
						}
						token = tokenizer[keyset];
						group = keyset;
						break;
					}
				}
				var terminatorBegin = token.terminator.begin;
				var terminatorBeginPost = pattern.lastIndex;
				var terminatorBeginIndex = -1;
				var terminatorBeginEscapedIndex = -1;
				var terminatorBeginEscapedLength = -1;
				var terminatorEnd = token.terminator.end;
				var terminatorEndIndex = -1;
				var terminatorExploded = null;
				var terminatorExplodedIndex = pattern.lastIndex;
				var terminatorExplodedLength = 0;
				var terminatorResult = null;
				var i = 0;
				while( terminatorExploded === null ) {
					if( i >= 10 ) {
						i = 0;
						break;
					}
					i++;
					console.log( i );
					if( ( terminatorEndIndex = stdin.indexOf( terminatorEnd, terminatorExplodedIndex +1 ) ) >= 0 ) {
						terminatorExploded = stdin.substring( terminatorBeginPost, terminatorEndIndex );
						terminatorExplodedLength = terminatorExploded.length;
						terminatorExplodedIndex = terminatorEndIndex;
						console.log( "index: " + terminatorEndIndex );
						terminatorBeginEscapedIndex = terminatorEndIndex;
						terminatorBeginEscapedLength = 0;
						while( stdin.substring( terminatorBeginEscapedIndex-1, terminatorBeginEscapedIndex ) === "\\" ) {
							terminatorBeginEscapedLength++;
							terminatorBeginEscapedIndex--;
						}
						if( terminatorBeginEscapedLength !== 1 ) {
							if( terminatorBeginEscapedLength % 2 !== 0 ) {
								console.log( "backslash: " + "\\".repeat( terminatorBeginEscapedLength ) );
								terminatorExploded = null;
								terminatorExplodedLength = 0;
							}
							else {
								console.log( "exploded: " + terminatorExploded );
							}
						}
						else {
							console.log( "backslash: \\" );
							terminatorExploded = null;
							terminatorExplodedLength = 0;
						}
					}
					else {
						console.log( "terminator-begin-post: " + terminatorBeginPost +1 );
						console.log( "terminator-begin-post-substr: " + stdin.substring( terminatorBeginPost +1 ) );
						throw new SyntaxError( Fmt( "Unterminated {0}, missing '{2}' after {1}", token.name, token.group, terminatorEnd ) );
					}
				}
				position+= terminatorExplodedLength;
				if( terminatorExploded.indexOf( terminatorBegin ) >= 0 ) {
					var terminatorBeginLength = 1;
					var terminatorEndLength = 1;
					var terminatorEndPost = position;
					console.log( "found: " + position );
					console.log( "terminator-begin-post: " + terminatorBeginPost );
					console.log( "terminator-begin-post-exploded: " + terminatorExploded );
					i = 0;
					while( ( terminatorBeginIndex = terminatorExploded.indexOf( terminatorBegin, terminatorBeginIndex + terminatorBegin.length ) ) >= 0 ) {
						if( i >= 10 ) {
							i = 0;
							break;
						}
						i++;
						console.log( i );
						terminatorBeginEscapedIndex = terminatorBeginIndex;
						terminatorBeginEscapedLength = 0;
						while( stdin.substring( terminatorBeginEscapedIndex-1, terminatorBeginEscapedIndex ) === "\\" ) {
							terminatorBeginEscapedLength++;
							terminatorBeginEscapedIndex--;
						}
						if( terminatorBeginEscapedLength !== 1 ) {
							if( terminatorBeginEscapedLength % 2 !== 0 ) {
								console.log( "backslash: " + "\\".repeat( terminatorBeginEscapedLength ) );
								continue;
							}
						}
						else {
							console.log( "backslash: \\" );
							continue;
						}
						terminatorBeginLength++;
					}
					console.log( "terminator-begin-length: " + terminatorBeginLength );
					i = 0;
					while( ( terminatorEndIndex = stdin.indexOf( terminatorEnd, terminatorEndPost + terminatorEnd.length ) ) >= 0 ) {
						if( i >= 10 ) {
							i = 0;
							break;
						}
						i++;
						console.log( i );
						var terminatorEndEscapedIndex = terminatorEndIndex;
						var terminatorEndEscapedLength = 0;
							terminatorEndPost = terminatorEndIndex;
						while( stdin.substring( terminatorEndEscapedIndex-1, terminatorEndEscapedIndex ) === "\\" ) {
							terminatorEndEscapedLength++;
							terminatorEndEscapedIndex--;
						}
						if( terminatorEndEscapedLength !== 1 ) {
							if( terminatorEndEscapedLength % 2 !== 0 ) {
								continue;
							}
						}
						else {
							continue;
						}
						terminatorEndLength++;
					}
					console.log( "terminator-end-length: " + terminatorEndLength );
					if( terminatorEndLength < terminatorBeginLength ) {
						throw new SyntaxError( Fmt( "Unterminated {0}, missing '{2}' after {1}", token.name, token.group, terminatorEnd ) );
					}
					position = terminatorEndPost
					position+= terminatorEnd.length;
				}
				else {
					terminatorResult = token.handler( terminatorExploded );
				}
				// token.handler( terminatorResult );
				console.log( "position: " + position );
			}
			return results + stdin.substring( position );
		}
	},
	mounted: function({ argument } = {}) {
		const results = [];
		try {
		}
		catch( e ) {
		}
		return [ this.parser( argument ) ];
	}
}