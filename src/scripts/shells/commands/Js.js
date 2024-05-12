
// 720 Hours wasted here!

// Import Shlex
import { split as ShlexSplit, quote } from "shlex"

// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Not from "/src/scripts/logics/Not.js"
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

export default {
	name: "js",
	type: "binary",
	data: {
		patterns: {
			argument: "(?<backslash>\\\\{0,})(?<search>(?<backticks>[\\`]{1})|(?:(?<doubleQuote>[\"]{1})|(?<singleQuote>[']{1}))|(?:\\$((?<arithmeticOperation>[\\(]{2})|(?<parameterExpansion>[\\{]{1})|(?<subtitutionExpansion>[\\(]{1})|(?<variable>[a-zA-Z_\\x7f-\\xff][a-zA-Z0-9_\\x7f-\\xff]*))|(?<bracket>\\()|(?<curlyBracket>\\[)))",
			options: "gms",
			tokenizer: {
				arithmeticOperation: {
					name: "arithmetic",
					group: "expansion",
					nested: true,
					terminator: {
						begin: "$((",
						end: "))"
					},
					handler: function( self, expression ) {
						console.log( "arithmatic-expression: " + expression );
					}
				},
				backticks: {
					name: "backticks",
					group: "backticks",
					nested: false,
					terminator: {
						begin: "`",
						end: "`"
					},
					handler: function( self, backticks ) {
						console.log( "backticks: " + backticks );
					}
				},
				bracket: {
					name: "bracket",
					group: "bracket",
					nested: true,
					terminator: {
						begin: "(",
						end: ")"
					},
					handler: function( self, bracket ) {
						console.log( "bracket: " + bracket );
					}
				},
				curlyBracket: {
					name: "curly bracket",
					group: "bracket",
					nested: true,
					terminator: {
						begin: "{",
						end: "}"
					},
					handler: function( self, bracket ) {
						console.log( "curly-bracket: " + bracket );
					}
				},
				doubleCurlyBracket: {
					name: "double curly bracket",
					group: "bracket",
					nested: true,
					terminator: {
						begin: "{",
						end: "}"
					},
					handler: function( self, bracket ) {
						console.log( "double-curly-bracket: " + bracket );
					}
				},
				squareBracket: {
					name: "square bracket",
					group: "bracket",
					nested: false,
					terminator: {
						begin: "[",
						end: "]"
					},
					handler: function( self, bracket ) {
						console.log( "square-bracket: " + bracket );
					}
				},
				doubleSquareBracket: {
					name: "double square bracket",
					group: "bracket",
					nested: false,
					terminator: {
						begin: "[[",
						end: "]]"
					},
					handler: function( self, bracket ) {
						console.log( "double-square-bracket: " + bracket );
					}
				},
				parameterExpansion: {
					name: "parameter",
					group: "expansion",
					nested: true,
					terminator: {
						begin: "${",
						end: "}"
					},
					handler: function( self, expansion ) { /** https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html */
						if( Value.isNotEmpty( expansion ) ) {
							var pattern = /^(?<prefix>\!|\#)?(?<name>(?:[a-zA-Z0-9]+|\?|\@))(?:(?:\-(?<unsetOrNull>unset))|(?:\:\=(?<unsetOrNullAndSet>[^\n]+))|(?:\:\?(?<unsetOrNullAndErrorWhenUnset>[^\n]+))|(?:\:\+(?<definedAndNotNull>[^\n]+))|(?<substringExpansion>(?<array>\[(?:(?<count>\#)|(?<join>\@)|(?<index>[0-9]+)|(?<keyset>[a-zA-Z0-9]+))\])))?$/i;
							console.log( pattern.exec( expansion ) );
							return expansion;
						}
						return "";
					}
				},
				doubleQuote: {
					name: "double quote",
					group: "quote",
					nested: false,
					terminator: {
						begin: "\"",
						end: "\""
					},
					handler: function( self, quoted ) {
						console.log( "double-quoted: " + quoted );
					}
				},
				singleQuote: {
					name: "single quote",
					group: "quote",
					nested: false,
					terminator: {
						begin: "'",
						end: "'"
					},
					handler: function( self, quoted ) {
						console.log( "single-quoted: " + quoted );
					}
				},
				subtitutionExpansion: {
					name: "subtitution",
					group: "expansion",
					nested: true,
					terminator: {
						begin: "$(",
						end: ")"
					},
					handler: function( self, expansion ) {
						console.log( "subtitution-expansion: " + expansion );
					}
				},
				variable: {
					terminator: null,
					handler: function( self, variable ) {
						if( Value.isNotEmpty( variable ) ) {
							if( variable.charAt( 0 ) === "\x24" ) {
								variable = variable.slice( 1 );
							}
							if( Not( self.$vars[variable], "Undefined" ) ) {
								return self.$vars[variable];
							}
							else if( Not( self.$envs[variable], "Undefined" ) ) {
								if( variable === "PWD" ) {
									return self.$envs.PWD.path ?? "";
								}
								return self.$envs[variable];
							}
						}
						console.log( "variable: " + variable );
						return "";
					}
				}
			},
			skipable: [
				
				/*
				 * skip when the character of terminator-end
				 * esacped  with this patterns.
				 */
				"backticks",
				"doubleQuote",
				"singleQuote"
			]
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
		matcher: function( content, terminator, start ) {
			var i = 0;
			var results = null;
			var position = 0;
			var character = terminator.begin;
			if( Type( start, Number ) ) {
				position = start;
				character = terminator.end;
			}
			while( results === null ) {
				if( i >= 10 ) {
					i = 0;
					console.warn( "Maximum depth recursion" );
					break;
				}
				i++;
				if( ( position = content.indexOf( character, position ) ) >= 0 ) {
					var escapedIndex = position;
					var escapedLength = 0;
					while( content.substring( escapedIndex-1, escapedIndex ) === "\\" ) {
						escapedIndex--;
						escapedLength++;
					}
					if( escapedLength !== 1 ) {
						if( escapedLength % 2 === 0 ) {
							if( Type( start, Number ) ) {
								results = content.substring( start, position+character.length );
								break;
							}
							else {
								i = 0;
								start = position;
								position+= character.length;
								character = terminator.end;
							}
						}
					}
					continue;
				}
				break;
			}
			return results;
		},
		parser: function( stdin ) {
			var self = this;
			var tokenizer = this.patterns.tokenizer;
			var prototypes = this.prototypes;
			var pattern = new RegExp( this.patterns.argument, this.patterns.options );
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
				var handler = null;
				for( let keyset of groups ) {
					if( [ "backslash", "search" ].indexOf( keyset ) >= 0 ) {
						continue;
					}
					if( Type( matches.groups[keyset], String ) && Type( tokenizer[keyset], Object ) ) {
						handler = param => tokenizer[keyset].handler( self, param );
						token = tokenizer[keyset];
						group = keyset;
						break;
					}
				}
				console.log( matches.groups );
				console.log( "matched-group: " + group );
				console.log( "matched-value: " + matches.groups[group] );
				if( Type( token.terminator, Object ) === false ) {
					results+= handler( matches.groups[group] );
					console.log( matches.groups[group] );
					continue;
				}
				var terminatorBegin = token.terminator.begin;
				var terminatorBeginPost = pattern.lastIndex;
				var terminatorBeginIndex = -1;
				var terminatorBeginEscapedIndex = -1;
				var terminatorBeginEscapedLength = -1;
				var terminatorEnd = token.terminator.end;
				var terminatorEndIndex = -1;
				var terminatorExploded = null;
				var terminatorExplodedParts = [];
				var terminatorExplodedIndex = pattern.lastIndex;
				var terminatorExplodedLength = 0;
				var terminatorResult = null;
				var i = 0;
				while( terminatorExploded === null ) {
					if( i >= 10 ) {
						i = 0;
						console.warn( "Maximum depth recursion" );
						break;
					}
					i++;
					console.log( i );
					if( ( terminatorEndIndex = stdin.indexOf( terminatorEnd, terminatorExplodedIndex ) ) >= 0 ) {
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
								console.log( "terminator-exploded: " + terminatorExploded );
								console.log( "terminator-exploded-length: " + terminatorExplodedLength );
								if( this.patterns.skipable.indexOf( group ) <= -1 ) {
									var skipableEndTerminatorPosition = terminatorBeginPost;
									var skipableEndTerminatorPositionFound = -1;
									for( let skipableEndTerminatorKeyset of this.patterns.skipable ) {
										const skipableEndTerminator = tokenizer[skipableEndTerminatorKeyset];
										if( ( skipableEndTerminatorPositionFound = stdin.indexOf( skipableEndTerminator.terminator.begin, skipableEndTerminatorPosition ) ) >= 0 ) {
											if( skipableEndTerminatorPositionFound <= position ) {
												var skipableEndTerminatorMatched = this.matcher( terminatorExploded, skipableEndTerminator.terminator );
												if( skipableEndTerminatorMatched === null ) {
													terminatorExploded = null;
													terminatorExplodedLength = null;
													terminatorExplodedIndex++;
													console.log( "Pelir" );
													break;
												}
												else if( skipableEndTerminatorMatched.indexOf( terminatorEnd ) >= 0 ) {
													// terminatorExplodedIndex = position;
													// terminatorExplodedIndex+= skipableEndTerminatorMatched.length;
													// terminatorExplodedIndex+= terminatorExploded.indexOf( skipableEndTerminatorMatched );
													terminatorExplodedIndex++;
													terminatorExploded = null;
													terminatorExplodedLength = null;
													console.log( "Iyaiyain" );
													break;
												}
												else {
													// console.log( "Pelir" );
													// console.log( terminatorExploded );
													// console.log( skipableEndTerminatorMatched );
													// console.log( position + terminatorExploded.indexOf( skipableEndTerminatorMatched ) + skipableEndTerminatorMatched.length );
													// console.log( position + terminatorExplodedLength );
												}
											}
										}
									}
								}
							}
						}
						else {
							console.log( "backslash: \\" );
							terminatorExploded = null;
							terminatorExplodedLength = 0;
						}
					}
					else {
						console.log( "terminator-begin-post: " + ( terminatorBeginPost + terminatorEnd.length ) );
						console.log( "terminator-begin-post-substr: " + stdin.substring( terminatorBeginPost + terminatorBegin.length ) );
						throw new SyntaxError( Fmt( "Unterminated {0}, missing '{2}' after {1}", token.name, token.group, terminatorEnd ) );
					}
				}
				position+= terminatorExplodedLength;
				if( terminatorExploded === null ) {
					throw new SyntaxError( Fmt( "Unterminated {0}, missing '{2}' after {1}", token.name, token.group, terminatorEnd ) );
				}
				if( token.nested === true ) {
					if( terminatorExploded.indexOf( terminatorBegin ) >= 0 ) {
						var terminatorBeginIndexPrev = [ 0, 0 ];
						var terminatorBeginLength = 1;
						var terminatorEndLength = 1;
						var terminatorEndPost = position;
							console.log( "terminator-begin-index-prev: " + JSON.stringify( terminatorBeginIndexPrev, null, 4 ) );
						console.log( "found: " + position );
						console.log( "terminator-begin-post: " + terminatorBeginPost );
						console.log( "terminator-begin-post-exploded: " + terminatorExploded.substring( terminatorExploded.indexOf( terminatorBegin ) + terminatorBegin.length ) );
						console.log( "terminator-begin-post-exploded-length: " + ( terminatorExploded.length + terminatorBegin.length ) );
						i = 0;
						while( ( terminatorBeginIndex = terminatorExploded.indexOf( terminatorBegin, terminatorBeginIndex ) ) >= 0 ) {
							if( i >= 10 ) {
								i = 0;
								console.warn( "Maximum depth recursion" );
								break;
							}
							i++;
							console.log( "begin: " + i );
							console.log( "terminator-begin-post-exploded: " + terminatorExploded.substring( terminatorBeginIndex + terminatorBegin.length ) );
							terminatorBeginEscapedIndex = terminatorBeginIndex;
							terminatorBeginEscapedLength = 0;
							terminatorBeginIndex+= terminatorBegin.length;
							while( stdin.substring( terminatorBeginEscapedIndex-1, terminatorBeginEscapedIndex ) === "\\" ) {
								terminatorBeginEscapedLength++;
								terminatorBeginEscapedIndex--;
							}
							if( terminatorBeginEscapedLength !== 1 ) {
								if( terminatorBeginEscapedLength % 2 !== 0 ) {
									console.log( "backslash: " + "\\".repeat( terminatorBeginEscapedLength ) );
									continue;
								}
								terminatorBeginIndexPrev = [ terminatorBeginIndexPrev[0], terminatorBeginIndex-terminatorBegin.length ];
								console.log( "terminator-begin-index-prev-" + i + ": " + JSON.stringify( terminatorBeginIndexPrev, null, 4 ) );
								terminatorExplodedParts.push( terminatorExploded.substring( terminatorBeginIndexPrev[0], terminatorBeginIndexPrev[1] ) );
								terminatorBeginIndexPrev[0] = terminatorBeginIndexPrev[1];
								terminatorBeginIndexPrev[0]+= terminatorBegin.length;
								terminatorBeginIndexPrev[1] = terminatorBeginIndexPrev[0];
								terminatorBeginLength++;
							}
							else {
								console.log( "backslash: \\" );
								continue;
							}
						}
						console.log( "terminator-begin-index-prev: " + JSON.stringify( terminatorBeginIndexPrev, null, 4 ) );
						terminatorExplodedParts.push( terminatorExploded.substring( terminatorBeginIndexPrev[0] ) );
						console.log( "terminator-begin-length: " + terminatorBeginLength );
						i = 0;
						var terminatorParameters = [];
						var terminatorEndExplodedParts = [];
						var terminatorResultExecution = "";
						while( ( terminatorEndIndex = stdin.indexOf( terminatorEnd, terminatorEndPost + terminatorEnd.length ) ) >= 0 ) {
							if( i >= 10 ) {
								i = 0;
								console.warn( "Maximum depth recursion" );
								break;
							}
							i++;
							console.log( "end: " + i );
							var terminatorEndEscapedIndex = terminatorEndIndex;
							var terminatorEndEscapedLength = 0;
							while( stdin.substring( terminatorEndEscapedIndex-1, terminatorEndEscapedIndex ) === "\\" ) {
								terminatorEndEscapedLength++;
								terminatorEndEscapedIndex--;
							}
							if( terminatorEndEscapedLength !== 1 ) {
								if( terminatorEndEscapedLength % 2 !== 0 ) {
									console.log( "backslash: " + "\\".repeat( terminatorEndEscapedLength ) );
									terminatorEndPost = terminatorEndIndex;
									continue;
								}
								terminatorEndExplodedParts.push( stdin.substring( terminatorEndPost + terminatorEnd.length, terminatorEndIndex ) );
								terminatorEndLength++;
								terminatorEndPost = terminatorEndIndex;
							}
							else {
								console.log( "backslash: \\" );
								terminatorEndPost = terminatorEndIndex;
								continue;
							}
						}
						for( let u in terminatorExplodedParts ) {
							var index = terminatorEndExplodedParts.length - u - 1;
							if( Type( terminatorEndExplodedParts[index], String ) ) {
								terminatorParameters.push([ terminatorExplodedParts[u], terminatorEndExplodedParts[index] ]);
							}
							else {
								terminatorParameters.push([ terminatorExplodedParts[u] ]);
							}
						}
						for( let parameters of terminatorParameters.reverse() ) {
							terminatorResultExecution = handler( [ parameters[0], terminatorResultExecution ?? "", parameters[1] ?? "" ].join( "" ) );
						}
						console.log( "terminator-end-length: " + terminatorEndLength );
						console.log( "parameters: " + JSON.stringify( terminatorParameters, null, 4 ) );
						console.log( "execution: " + terminatorResultExecution );
						if( terminatorEndLength !== terminatorBeginLength ) {
							throw new SyntaxError( Fmt( "Unterminated {0}, missing '{2}' after {1}", token.name, token.group, terminatorEnd ) );
						}
						position = terminatorEndPost
					}
					else {
						terminatorExplodedParts.push( terminatorExploded.substring( 0, terminatorBeginIndexPrev ) );
					}
					// ....
				}
				else {
					results+= handler( terminatorExploded );
				}
				console.log( "terminator-exploded-parts: " + JSON.stringify( terminatorExplodedParts, null, 4 ) );
				position+= terminatorEnd.length;
				pattern.lastIndex = position;
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