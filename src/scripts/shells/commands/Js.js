
/*
 * 
 * Not all implemented here, you can see this complex official documentation,
 * I'm very tired working this, 720 hours wasted here, thankyou! I love Linux :)
 * 
 * @see subtitution parameter
 *  https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
 * 
 */

// Import Shlex
import { split as ShlexSplit, quote } from "shlex"

// Import Scripts
import Author from "/src/scripts/Author.js";
import Difference from "/src/scripts/Difference";
import Fmt from "/src/scripts/Fmt.js";
import Match from "/src/scripts/Match.js";
import Mapper from "/src/scripts/Mapper.js";
import Not from "/src/scripts/logics/Not.js"
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

export default {
	name: "js",
	type: "binary",
	data: {
		patterns: {
			datetime: /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/,
			numeric: /^-?\d+(\.\d+)?$/,
			filename: "^(\\/?([^\\/\\\:\\*\\?\"<>\\|]+\\/)*[^\\/\\\:\*\\?\"<>\\|]+)$",
			argument: "(?<backslash>\\\\{0,})(?<search>(?<backticks>[\\`]{1})|(?:(?<doubleQuote>[\"]{1})|(?<singleQuote>[']{1}))|(?:\\$((?<arithmeticOperation>[\\(]{2})|(?<parameterExpansion>[\\{]{1})|(?<subtitutionExpansion>[\\(]{1})|(?<variable>[a-zA-Z_\\x7f-\\xff][a-zA-Z0-9_\\x7f-\\xff]*))|(?<bracket>\\()|(?<curlyBracket>\\{))|(?<doubleSquareBracket>\\[{2})|(?<squareBracket>\\[))",
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
					handler: function( self, expansion ) {
						if( Value.isNotEmpty( expansion ) ) {
							var keysets = [
								"unsetOrNull",
								"unsetOrNullAndSet",
								"unsetOrNullAndErrorWhenUnset",
								"definedAndNotNull",
								"substringExpansion"
							];
							var pattern = /^(?<prefix>\!|\#)?(?<name>(?:[a-zA-Z0-9_]+)|(?:\?|\@))(?:(?:\-(?<unsetOrNull>[^\n]+))|(?:\:\=(?<unsetOrNullAndSet>[^\n]+))|(?:\:\?(?<unsetOrNullAndErrorWhenUnset>[^\n]+))|(?:\:\+(?<definedAndNotNull>[^\n]+))|(?<substringExpansion>(?:\[(?<array>[^\n]+)\])?(?:\:(?<substring>[0-9]+))?))$/i;
							var matches = pattern.exec( expansion );
							console.log( matches );
							if( Type( matches, Array ) && Value.isNotEmpty( matches.groups.name ) ) {
								var variable = matches.groups.name;
								var variablePrefix = matches.groups.prefix;
								var variableValue = self.patterns.tokenizer.variable.handler( self, variable );
								var variableValueMod = variableValue;
								for( let keyset of keysets ) {
									if( Value.isNotEmpty( matches.groups[keyset] ) ) {
										switch( keyset ) {
											case "unsetOrNull":
												if( variableValue === null ) {
													variableValueMod = matches.groups[keyset];
												}
												else if( variablePrefix === "\x21" ) {
													throw new SyntaxError( Fmt( "{}: invalid indirect expansion", variable ) );
												}
												break;
											case "unsetOrNullAndSet":
												if( variableValue === null ) {
													self.$vars[variable] = matches.groups[keyset];
												}
												else if( variablePrefix === "\x21" ) {
													throw new SyntaxError( Fmt( "{}: invalid indirect expansion", variable ) );
												}
												break;
											case "unsetOrNullAndErrorWhenUnset":
												break;
											case "definedAndNotNull":
												break;
											case "substringExpansion":
												break;
										}
									}
								}
								if( Value.isNotEmpty( variablePrefix ) ) {
									if( variablePrefix === "\x21" ) {
										if( variableValue === variableValueMod ) {
											return "";
										}
									}
									if( variablePrefix === "\x23" ) {
										if( variableValue !== variableValueMod ) {
											variableValue = variableValueMod;
										}
										return new String( variableValue ?? "" ).length;
									}
								}
								return variableValue;
							}
							throw new SyntaxError( "Bad subtitution" );
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
						return Fmt( "\"{}\"", quoted );
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
						return self.$exec( expansion );
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
						return null;
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
		
		/**
		 * Parse argument value into object.
		 *
		 * @params Array argv
		 *
		 * @return Object
		 */
		argparse: function( argv ) {
			
			var args = {};
			
			// Check if argument value is Array.
			if( Type( argv, Array ) ) {
				
				var post = 0;
				var length = argv.length;
				
				// Copy argument values.
				argv = [ ...argv ];
				
				// Remove filename from argument values.
				delete argv[0];
				
				// Counting argument based on argument values length.
				for( let i = 0; i < length; i++ ) {
					
					// Get argument value.
					var arg = argv[i] ?? null;
					
					// Index number.
					let idx = i +1;
					
					// Skip if argument value has unset.
					if( arg === null ) continue;
					
					/*
					 * Check if the option of the argument is
					 * not an empty string enclosed in single
					 * or double quotes.
					 *
					 */
					if( Value.isNotEmpty( arg ) ) {
						
						// If argument value is long option.
						if( arg.slice( 0, 2 ) === "--" ) {
							
							// Get position equal symbol position.
							var index = arg.indexOf( "=" );
							
							// If argument has equal symbol.
							if( index >= 0 ) {
								var key = arg.slice( 2, index );
								var val = arg.slice( index +2 );
									val = Value.isNotEmpty( val ) ? val.trim() : null;
							}
							else {
								
								var key = arg.slice( 2 );
								var val = argv[idx] ?? null;
								
								// If argument value is not enclosed empty string.
								if( val !== null ) {

									// If doesn't minus symbol.
									if( idx < length && val.length !== 0 && val[0] !== "-" ) {
										i++;
									}
									else {
										
										// If argument is not exists.
										if( Type( args[key], [ "Null", "Undefined" ] ) ) val = true;
									}
								}
								else {
									
									/*
									 * Since empty values will still be added to
									 * named options so that empty strings enclosed
									 * by single or double quotes are not registered
									 * again to the argument we unset them
									 * from the $argv list.
									 *
									 */
									delete argv[idx];
								}
							}
							
							/*
							 * If the argument option is given like
							 * this --= then it will not be considered.
							 *
							 */
							if( Value.isNotEmpty( key ) ) {
								args[key] = this.convert( val = val !== null ? val : true );
							}
							continue;
						}
						
						// If argument value is short option.
						else if( arg.slice( 0, 1 ) === "-" ) {

							// If position 2 has equal symbol.
							if( arg.slice( 2, 3 ) === "=" ) {
								var key = arg.slice( 1, 2 );
								var val = arg.slice( 3 );
								
								args[key] = this.convert( Value.isEmpty( val ) ? args[key] ?? true : val );
							}
							else {
								
								// Split arg like -xyz into Array.
								var chars = arg.slice( 1 );
									chars = chars.split( "" );
								
								// Mapping chars.
								for( let u in chars ) {

									// If option has value.
									if( u >= 1 && chars[u] === "=" ) {
										var key = chars[( u -1 )];
										var val = arg.slice( arg.indexOf( "=" ) +1 );
										
										args[key] = this.convert( Value.isEmpty( val ) ? args[key] ?? true: val );
										break;
									}
									args[chars[u]] = this.convert( args[chars[u]] ?? true );
								}
							}
							continue;
						}
					}
					args[post++] = this.convert( arg.trim() );
				}
			}
			return args;
		},
		
		/**
		 * Convert the string to the appropriate data value.
		 *
		 * @params Mixed value
		 *
		 * @return Mixed
		 */
		convert: function( value ) {
			if( Not( value, [ "Null", "Undefined" ] ) ) {
				if( Type( value, String ) ) {
					value = value.trim();
					try {
						if( [ "true", "false" ].indexOf( value ) >= 0 ) {
							return value === "true"
						};
						if( this.patterns.numeric.test( value ) ) {
							return parseFloat( value )
						};
						if( value.startsWith( "{" ) &&
							value.endsWith( "}" ) ) {
							return JSON.parse( value );
						}
						if( this.patterns.datetime.test( value ) ) {
							return new Date( value );
						}
					}
					catch( error ) {
					}
				}
				return value;
			}
			return null;
		},
		
		/**
		 * Execute raw string javascript.
		 *
		 * @params String raw
		 *
		 * @return Object
		 */
		execute: function( argv ) {
			var stdout = [];
			for( let i in argv ) {
				var argc = [
					"const func = new Function( \"",
						"this.root = arguments[0];",
						"this.name = arguments[1];",
						"this.envs = arguments[2];",
						"this.vars = arguments[3];",
						"this.func = new Function( \\\"",
							"const root = this.root;",
							"const envs = this.envs;",
							"const name = this.name;",
							"const vars = this.vars;",
							"{}",
						"\\\" );",
						"this.func.bind( this );",
						"return this.func();",
					"\");",
					"return func( ...arguments );"
				];
				if( argv[i].match( /^\/\/[^\n]*$/ ) ) {
					throw new SyntaxError( "Un-Terminate comment" );
				}
				var func = Fmt( argc.join( "" ), argv[i].startsWith( "return" ) ? argv : Fmt( "return {};", argv[i] ) );
					func = new Function( func );
					func = func( this.$root, this.$name, this.$envs, this.$vars );
				if( Not( func, "Undefined" ) ) {
					stdout.push( `${func}`.split( "\n" ) );
				}
			}
			return {
				stdin: null,
				stderr: null,
				stdout: stdout,
				prompt: null
			};
		},
		
		/**
		 * Escaped character matcher.
		 * 
		 * @params String content
		 * @params Object terminator
		 * @params Number start
		 * 
		 * @return String
		 */
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
		
		/**
		 * Parameter builder for program/command.
		 *
		 * @params Object command
		 * @params Object argparse
		 *
		 * @return Object
		 */
		params: function( command, argparse ) {
			var params = {};
			var keysets = [];
			if( Type( command.options, Object ) ) {
				Mapper( command.options, function( i, name, option ) {
					keysets.push( name );
					if( Not( argparse[name], "Undefined" ) ) {
						params[name] = argparse[name];
					}
					if( Type( option.alias, String ) ) {
						keysets.push( option.alias );
						if ( Not( argparse[option.alias], "Undefined" ) ) {
							params[name] = argparse[option.alias];
						}
					}
					else {
						if( option.require === true ) {
							throw Fmt( "{}: {}: option required", command.name, name );
						}
					}
					if( Not( params[name], "Undefined" ) &&
						Not( option.type, "Undefined" ) ) {
						if( Not( params[name], option.type ) ) {
							throw Fmt( "{}: {}: option must be type {}, {} given", command.name, name, option.type.name, Type( params[name] ) );
						}
					}
				});
			}
			var differences = [];
			var argumentKeysets = Object.keys( argparse );
			for( let index in argumentKeysets ) {
				if( `${index}` !== argumentKeysets[index] ) {
					differences.push( argumentKeysets[index] );
				}
			}
			var difference = Difference( differences, keysets );
			if( Value.isEmpty( difference ) ) {
				return params;
			}
			throw new Error( Fmt( "{0}: {2}{1}: option or flag doest not exists", command.name, difference[0], "\x2d".repeat( difference[0].length >= 2 ? 2 : 1 ) ) );
		},
		
		/**
		 * Command line argument parser
		 * 
		 * @params String stdin
		 * 
		 * @return String
		 */
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
							if( Type( terminatorResultExecution, [ "Null", "Undefined" ] ) ) {
								terminatorResultExecution = "";
							}
						}
						console.log( "terminator-end-length: " + terminatorEndLength );
						console.log( "parameters: " + JSON.stringify( terminatorParameters, null, 4 ) );
						console.log( "execution: " + terminatorResultExecution );
						if( terminatorEndLength !== terminatorBeginLength ) {
							throw new SyntaxError( Fmt( "Unterminated {0}, missing '{2}' after {1}", token.name, token.group, terminatorEnd ) );
						}
						position = terminatorEndPost
						results+= terminatorResultExecution ?? "";
					}
					else {
						results+= handler( terminatorExploded.substring( 0, terminatorBeginIndexPrev ) ) ?? "";
					}
					// ....
				}
				else {
					results+= handler( terminatorExploded ) ?? "";
				}
				console.log( "terminator-exploded-parts: " + JSON.stringify( terminatorExplodedParts, null, 4 ) );
				position+= terminatorEnd.length;
				pattern.lastIndex = position;
				console.log( "position: " + position );
			}
			return results + stdin.substring( position );
		},
		
		/**
		 * Command line argument spliter.
		 * 
		 * @params String stdin
		 * 
		 * @return Array<String> 
		 */
		split: function( stdin ) {
			var results = [];
			let current = "";
			let insideSingleQuotes = false;
			let insideDoubleQuotes = false;
			let escapeNext = false;
			for( let i=0; i<stdin.length; i++ ) {
				const char = stdin[i];
				if( escapeNext ) {
					current+= char;
					escapeNext = false;
				}
				else if( char === "\\" ) {
					current+= char;
					escapeNext = true;
				}
				else if( char === "\"" && !insideSingleQuotes ) {
					current+= char;
					insideDoubleQuotes = !insideDoubleQuotes;
				}
				else if( char === "'" && !insideDoubleQuotes ) {
					current += char;
					insideSingleQuotes = !insideSingleQuotes;
				}
				else if( char === "|" && !insideSingleQuotes && !insideDoubleQuotes ) {
					if( results.length >= 1 ) {
						results.push( "|" );
					}
					results.push( current.trim() );
					current = "";
				}
				else {
					current+= char;
				}
			}
			if( results.length >= 1 ) {
				results.push( "|" );
			}
			return Value.isNotEmpty( current ) ? [ ...results, current.trim() ] : results;
		}
	},
	mounted: function({ argument } = {}) {
		if( this.$root.built.js !== this ) {
			this.$root.built.js = this;
		}
		var results = [];
		try {
			if( Value.isNotEmpty( argument.length ) ) {
				var self = this;
				var pattern = new RegExp( this.patterns.filename );
				var splited = this.split( argument );
					splited = splited.map( part => {
						var parts = part.split( "\x20" );
						var alias = parts[0];
						if( Value.isNotEmpty( self.$name[alias] ) ) {
							return self.parser( [ self.$name[alias], parts.slice( 1 ).join( "\x20" ) ].join( "\x20" ) );
						}
						return self.parser( part );
					});
				Mapper( splited, function( position ) {
					if( Value.isEmpty( arguments[1] ) ) {
						return;
					}
					var exploded = arguments[1];
					var argvalue = ShlexSplit( exploded );
					if( argvalue.length >= 1 ) {
						var name = null;
						for( let i in argvalue ) {
							if( Value.isEmpty( argvalue[i] ) ) {
								continue;
							}
							name = argvalue[i];
							argvalue = argvalue.slice( i );
							break;
						}
						if( Value.isNotEmpty( name ) ) {
							var argparse = self.argparse( argvalue );
							Match( name, [
								{
									case: "\x7c",
									call: () => {
										if( exploded.length === 1 && results.length === 0 || position === splited.length ) {
											throw new SyntaxError( "syntax error near unexpected token '|'" );
										}
										var execution = results.pop();
										// passed as buffer here!
									}
								},
								{
									case: "js",
									call: () => {
										results.push( argparse.help ? self.$help() : self.execute( argvalue.slice( 1 ) ) );
									}
								},
								{
									case: name,
									call: () => {
										var command = self.$root.commands.find( command => command.name === name );
										if( Not( command, Object ) ) {
											throw new Error( Fmt( "{}: command not found", name ) );
										}
										if( self.$root.built[argvalue[0]] ) {
											var built = self.$root.builder( [ command, self.$root.built[argvalue[0]] ], { argv: argvalue, args: argparse } );
										}
										else {
											var built = self.$root.builder( command, { argv: argvalue, args: argparse } );
										}
										var execute = new built(
											self.params( command, argparse )
										);
										if( Type( execute, Array ) ) {
											results.push( ...execute );
										}
										else if( Type( execute, Object ) ) {
											results.push( execute );
										}
										else {
											self.$root.built[argvalue[0]] = execute;
										}
									}
								}
							]);
						}
					}
				});
			}
		}
		catch( e ) {
			console.log( e );
			results.push({
				stdin: {
					handler: e => {
						return {
							closed: Boolean,
							prompt: String
						};
					}
				},
				stderr: Fmt( "js: {}", e.message ?? e ),
				stdout: [
				],
				prompt: null //<= this must be normalized
			});
		}
		console.log( JSON.stringify( results, null, 4 ) );
		return results;
	}
}