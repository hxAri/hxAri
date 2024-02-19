
// Import Scripts
import Author from "/src/scripts/Author.js";
import Banner from "/src/scripts/shells/Banner.js";
import Fmt from "/src/scripts/Fmt.js";
import Datime from "/src/scripts/Datime.js";
import Directory from "/src/scripts/shells/Directory.js";
import Helper from "/src/scripts/shells/Helper.js"
import Mapper from "/src/scripts/Mapper.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

/*
 * Virtual Terminal.
 *
 * @params Object binding
 * @params Object router
 *
 * @return Terminal
 */
function Terminal( binding, router ) {

	/*
	 * Terminal command builder.
	 *
	 * Before the program is executed, the program must be made
	 * like a component with this program or command being able
	 * to call or access methods from the Terminal and each
	 * variable that is defined will remain intact and be stored
	 * and can be reused when the program is run. Please note that
	 * other programs can also access all the variables that are set,
	 * each variable from various commands will be combined in
	 * one container just like one place.
	 *
	 * @params Array<Object>|Object shell
	 *  Array bind program/command prototypes.
	 *  Object The program/command to be executed.
	 * @params Object argv, args
	 *  argv Argument values.
	 *  args Argument parsed.
	 *
	 * @return Object
	 */
	Terminal.prototype.builder = function( shell, { argv, args }) {
		
		var built = {};
		
		/*
		 * Prototype setter.
		 *
		 * @params Object prototypes
		 *
		 * @return Void
		 */
		var map = function( prototypes ) {
			Mapper( prototypes,
				
				/*
				 * Set program/ command prototype.
				 *
				 * @params Number i
				 * @params String name
				 * @params Mixed value
				 *
				 * @return Void
				 */
				function( i, name, value ) {
					built.prototype[name] = value;
					if( Type( value, name ) ) {
						built.prototype[name].bind(
							built
						);
					}
				}
			);
		};
		
		if( Type( shell, Object ) ) {

			// Resolve shell data.
			shell.data = Type( shell.data, Object, () => shell.data, () => Object.create({}) );
			
			// Resolve shell methods.
			shell.methods = Type( shell.methods, Object, () => shell.methods, () => Object.create({}) );
			
			// Get shell mounted.
			built = shell.mounted;
			
			// Set up shell prototypes.
			built.prototype.$root = this;
			built.prototype.$name = this.aliases;
			built.prototype.$bind = this.binding;
			built.prototype.$envs = this.exports;
			built.prototype.$vars = this.declare;
			
			/*
			 * Allow program/ command for call another.
			 *
			 * @params String argument
			 *
			 * @return Mixed
			 */
			built.prototype.$exec = function( argument ) {

				// Find command line shell.
				var shell = this.$root.commands.find( shell => shell.name === this.$root.shell );
				var result = [];
				
				// If shell is available.
				if( shell ) {

					// Check if shell has previous instance.
					if( this.$root.built[shell.name] ) {
						var built = this.$root.builder( [ shell, this.$root.built[shell.name] ], { argv: null, args: null } );
					}
					else {
						var built = this.$root.builder( shell, { argv: null, args: null } );
					}
					var exec = new built({ argument });
						exec.forEach( output => 
							result.push( output.join( "\x20" ) )
						);
				}
				else {
					throw new Error( Fmt( "{}: Shells not available", this.$root.shell ) );
				}
				return( result.join( "\x20" ) );
			};
			
			/*
			 * @inherit /src/scripts/shells/Helper
			 */
			built.prototype.$help = function() { return( Helper( this, shell ) ); };
			
			// Mapping program/ command data and methods.
			map({ ...shell.data, ...shell.methods });
		}
		else {
			
			// Get shell mounted.
			built = shell[0].mounted;
			
			// Mapping previous prototypes from contructed program/command.
			map( Object.getPrototypeOf( shell[1] ) );
		}
		built.prototype.$argv = argv;
		built.prototype.$args = args;
		
		return( built );
	};
	
	/*
	 * Terminal command instances.
	 *
	 * @values Object
	 */
	Terminal.prototype.built = Terminal.prototype.built ?? {};
	
	/*
	 * Automatic colorize text, number, and symbols in the string.
	 *
	 * @params String string
	 *
	 * @return String
	 */
	Terminal.prototype.colorable = function( string ) {
		var patterns = {
			comment: {
				pattern: "(?<comment>(?:\\/\\/[^\\n]*)|(?:\\/\\*.*?\\*\\/))",
				styling: "var(--shell-c-38-240m)"
			},
			number: {
				pattern: "(?<number>\\b(?:\\d+)\\b)",
				styling: "var(--shell-c-38-61m)"
			},
			define: {
				pattern: "(?<define>(?:\\@|\\$)[a-zA-Z_](?:[a-zA-Z0-9_\\-\\.]*[a-zA-Z0-9_]{1})*)",
				styling: "var(--shell-c-38-111m)",
				rematch: [
					"symbol"
				]
			},
			symbol: {
				pattern: "(?<symbol>\\\\|\\:|\\*|\\-|\\+|\\/|\\&|\\%|\\=|\\;|\\,|\\.|\\?|\\!|\\||\\<|\\>|\\~)",
				styling: "var(--shell-c-38-69m)"
			},
			bracket: {
				pattern: "(?<bracket>\\{|\\}|\\[|\\]|\\(|\\))",
				styling: "var(--shell-c-38-214m)"
			},
			boolean: {
				pattern: "(?<boolean>\\b(?:[fF]alse|[tT]rue|[nN]ull|[uU]ndefined)\\b)",
				styling: "var(--shell-c-38-199m)"
			},
			hxari: {
				pattern: "(?<hxari>\\b(?:hx[aA]ri)\\b)",
				styling: "var(--shell-c-38-105m)"
			},
			type: {
				pattern: "(?<type>\\b(?:Array|Date|String|Number|Bigint|Boolean|Undefined|Null|Symbol|Object)\\b)",
				styling: "var(--shell-c-38-213m)"
			},
			version: {
				pattern: "(?<version>\\b[vV][\\d]+(?:[\\d\\.]+[\\d+])*\\b)",
				styling: "var(--shell-c-38-112m)",
				handler: {
					floating: {
						pattern: "(?<floating>[\\d\\.]+)",
						styling: "var(--shell-c-38-190m)"
					}
				}
			},
			string: {
				pattern: "(?<string>(?<!\\\\)(\\\".*?(?<!\\\\)\\\"|\\'.*?(?<!\\\\)\\'|\\`.*?(?<!\\\\)\\`))",
				styling: "var(--shell-c-38-220m)",
				handler: {
					curly: {
						pattern: "(?<curly>(?<!\\\\)\\{(?:(?:[^\\}\\\\]|\\.)*)\\})",
						styling: "var(--shell-c-38-214m)",
						handler: {
							chars: {
								pattern: "(?<chars>[a-zA-Z][a-zA-Z0-9\\_]*)",
								styling: "var(--shell-c-38-11m)",
							},
							define: {
								pattern: "(?<define>\\$[a-zA-Z_][a-zA-Z0-9_]*)",
								styling: "var(--shell-c-38-111m)",
							},
							number: {
								pattern: "(?<number>\\b(?:\\d+)\\b)",
								styling: "var(--shell-c-38-61m)"
							},
							symbol: {
								pattern: "(?<symbol>\\{|\\}|\\[|\\]|\\(|\\)|\\<|\\>|\\-)",
								styling: "var(--shell-c-38-214m)"
							},
							bracket: {
								pattern: "(?<bracket>\\{|\\}|\\[|\\]|\\(|\\))",
								styling: "var(--shell-c-38-214m)"
							},
							mismatch: {
								pattern: "(?<mismatch>.)",
								styling: "var(--shell-c-38-220m)"
							}
						}
					},
					bracket: {
						pattern: "(?<bracket>(?<!\\\\)\\[(?:(?:[^\\]\\\\]|\\.)*)\\])",
						styling: "var(--shell-c-38-214m)",
						handler: {
							chars: {
								pattern: "(?<chars>[a-zA-Z][a-zA-Z0-9\\_]*)",
								styling: "var(--shell-c-38-11m)",
							},
							define: {
								pattern: "(?<define>\\$[a-zA-Z_][a-zA-Z0-9_]*)",
								styling: "var(--shell-c-38-111m)",
							},
							number: {
								pattern: "(?<number>\\b(?:\\d+)\\b)",
								styling: "var(--shell-c-38-61m)"
							},
							symbol: {
								pattern: "(?<symbol>\\{|\\}|\\[|\\]|\\(|\\)|\\<|\\>|\\-)",
								styling: "var(--shell-c-38-214m)"
							},
							mismatch: {
								pattern: "(?<mismatch>.)",
								styling: "var(--shell-c-38-220m)"
							}
						}
					},
					hexadec: {
						pattern: "(?<hexadec>\\\\x[a-fA-F0-9]{2})",
						styling: "var(--shell-c-38-85m)"
					},
					escape: {
						pattern: "(?<escape>\\\\(?:040|40|7|11|011|0113|113|377|81|[aA]|[bB]|cx|[dD]|ddd|e|f|g|[hH]|k|n|[pP]|[rR]|[sS]|t|[vV]|[wW]|xhh|Z))",
						styling: "var(--shell-c-38-208m)"
					},
					define: {
						pattern: "(?<define>\\$[a-zA-Z_][a-zA-Z0-9_]*)",
						styling: "var(--shell-c-38-111m)",
					}
				}
			}
		};

		var handler = function( match, escape, patterns ) {

			// Check if match has groups.
			if( Type( match.groups, Object ) ) {

				// Get all group names.
				var groups = Object.keys( match.groups );
				var group = null;
				
				for( let i in groups ) {
					group = groups[i];
					if( Type( patterns[groups[i]], Object ) &&
						Type( match.groups[groups[i]], String ) ) {
						// escape = patterns[group].styling;
						break;
					}
				}
				var chars = match.groups[group];
				var color = patterns[group].styling;
				if( Type( patterns[group].handler, [ Function, "handler", Object ] ) ) {
					if( Type( patterns[group].handler, Object ) ) {
						var regexps = [];
						for( let i in patterns[group].handler ) {
							if( Type( patterns[group].handler[i], Window ) ) {
								chars = patterns[group].handler[i].call( chars );
							}
							else {
								regexps.push( patterns[group].handler[i] );
							}
						}
						if( regexps.length >= 1 ) {
							var result = "";
							var reindex = 0;
							var rematch = null;
							var pattern = new RegExp( Fmt( "(?:{})", regexps.map( r => r.pattern ).join( "|" ) ), "gms" );
							while( ( rematch = pattern.exec( chars ) ) !== null ) {
								result += chars.substring( reindex, pattern.lastIndex - rematch[0].length );
								result += Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", color, group, handler( rematch, color, patterns[group].handler ) );
								reindex = pattern.lastIndex;
							}
							chars = result + chars.substring( reindex );
						}
					}
					else {
						chars = patterns[group].handler( chars );
					}
				}

				if( Type( patterns[group].rematch, Array ) ) {
					var result = "";
					var reindex = 0;
					var rematch = null;
					var pattern = new RegExp( Fmt( "(?:{})", patterns[group].rematch.map( r => patterns[r].pattern ).join( "|" ) ), "gms" );
					while( ( rematch = pattern.exec( chars ) ) !== null ) {
						result += chars.substring( reindex, pattern.lastIndex - rematch[0].length );
						result += handler( rematch, color, patterns );
						reindex = pattern.lastIndex;
					}
					chars = result + chars.substring( reindex );
				}
				return( Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", color, group, chars ) );
			}
			return( "" );
		};

		// try {
			var index = 0;
			var match = null;
			var result = "";
			var escape = "var(--shell-c-0-37m)";
			var string = Type( string, String, () => string, () => "" );
			var pattern = new RegExp( Fmt( "(?:{})", Object.values( Mapper( patterns, ( i, k, val ) => val.pattern ) ).join( "|" ) ), "gms" );
			while( ( match = pattern.exec( string ) ) !== null ) {
				result += string.substring( index, pattern.lastIndex - match[0].length );
				result += Fmt( "<span style=\"color: {}\" data-group=\"{}\">{}</span>", escape, "captured", handler( match, escape, patterns ) );
				index = pattern.lastIndex;
			}
		// }
		// catch( error ) {
		// 	console.error( "error", error );
		// }
		return( result + string.substring( index ) );
	};
	
	/*
	 * Automatic colorize text, number, and symbols in the string with ansi color.
	 *
	 * @params String format
	 * @params String base
	 *  Base color.
	 *
	 * @return String
	 */
	Terminal.prototype.colorableAnsi = function( format, base ) {

		// Avoid empty base color.
		var basec = Type( base, String, () => base, () => "\x1b[37m" );
		
		// Current match index.
		var index = 0;
		
		// Matched symbol.
		var match = null;
		
		// Result.
		var result = "";
			format = Type( format, String, () => format, () => "" );
		
		// Patterns.
		var patterns = {
			number: {
				pattern: "(?<number>\\b(?<!\\\\(x1b|033)|\\;|\\[)(\\d+)\\b)",
				colorize: "\x1b[0;38;5;61m"
			},
			define: {
				pattern: "(?<define>(\\@|\\$)[a-zA-Z0-9_-]+)",
				colorize: "\x1b[0;38;5;111m"
			},
			symbol: {
				pattern: "(?<symbol>(\\\\(?<!x1b)|(\\\\(?<!033)))|\\:|\\*|\\-|\\+|\\/|\\&|\\%|\\=|((?<!\\d)\;(?<!\\d))|\\,|\\.|\\?|\\!|\\<|\\>|\\|)",
				colorize: "\x1b[0;38;5;69m"
			},
			bracket: {
				pattern: "(?<bracket>\\{|\\}|(((?<!\\\\\x1b|\x1b)\\[)|\\])|\\(|\\))",
				colorize: "\x1b[0;38;5;214m"
			},
			boolean: {
				pattern: "(?<boolean>\\b(False|True)\\b)",
				colorize: "\x1b[0;38;5;199m"
			},
			type: {
				pattern: "(?<type>\\b(?:Array|Date|String|Number|Bigint|Boolean|Undefined|Null|Symbol|Object)\\b)",
				colorize: "\x1b[0;38;5;213m"
			},
			string: {
				pattern: "(?<string>(?<!\\\\)(\"(.*?)(?<!\\\\)\")|(\'(.*?)(?<!\\\\)\')|(\`(.*?)(?<!\\\\)\`))",
				colorize: "\x1b[0;38;5;220m",
				handler: match => match[0].replaceAll( /(?<!\\)(\\"|\\'|\\`|\\r|\\t|\\n|\\s)/g, m => `\x1b[0;38;5;208m${m}\x1b[0;38;5;220m` )
			}
		};

		// /((?:\\e|\\x1b|\\033)\[[0-9\\;]+m)/g

		try {
			var regexp = new RegExp( "(?:" + Object.values( Mapper( patterns, ( i, k, val ) => val.pattern ) ).join( "|" ) + ")", "ig" );
			while( ( match = regexp.exec( format ) ) !== null ) {
				var color = "var(--shell-c-0-37m)";
				if( Type( match.groups, Object ) ) {
					var groups = Object.keys( match.groups );
					for( let i in groups ) {
						var group = groups[i];
						if( Type( patterns[group], Object ) &&
							Type( match.groups[group], String ) ) {
							color = patterns[group].colorize;
							break;
						}
					}
					if( Type( patterns[group].handler, [ Function, "handler" ] ) ) {
						//result += Fmt( "{}<span style=\"color: {}\">{}</span>", format.substring( index, regexp.lastIndex - match[0].length ), color, patterns[group].handler( match ) );
						result += format.substring( index, regexp.lastIndex - match[0].length );
						result += color;
						result += patterns[group].handler( match );
						result += basec;
						index = regexp.lastIndex;
						continue;
					}
				}
				//result += Fmt( "{}<span style=\"color: {}\">{}</span>", format.substring( index, regexp.lastIndex - match[0].length ), color, match[0] );
				result += format.substring( index, regexp.lastIndex - match[0].length );
				result += color;
				result += match[0];
				result += basec;
				index = regexp.lastIndex;
			}
		}
		catch( error ) {
			console.error( "error", error );
		}
		return( result + format.substring( index ) );
	};
	
	/*
	 * Container for the entire available commands.
	 *
	 * @values Array
	 */
	Terminal.prototype.commands = [];
	
	/*
	 * Date instance.
	 *
	 * @values Datime
	 */
	Terminal.prototype.date = new Datime();
	
	/*
	 * All declared variables.
	 *
	 * @values Object
	 */
	Terminal.prototype.declare = {};
	
	/*
	 * Container for the entire terminal directoies.
	 *
	 * @values Array
	 */
	Terminal.prototype.directory = Directory;
	
	/*
	 * Container for the entire environment names.
	 *
	 * @values Object
	 */
	Terminal.prototype.exports = {
		
		/*
		 * Terminal root directory.
		 *
		 * @values String
		 */
		ROOT: "/terminal",
		
		/*
		 * Terminal home directory.
		 *
		 * @values String
		 */
		HOME: "/root",
		
		/*
		 * Current terminal working directory info.
		 *
		 * @values Object
		 */
		PWD: {
			path: "/terminal"
		},
		
		/*
		 * Terminal prompt.
		 *
		 * @values String
		 */
		PS1: "\\[\\e[1;38;5;112m\\]\\u\\[\\e[1;38;5;190m\\]@\\h\\[\\e[1;38;5;214m\\]:\x20\\[\\e[1;32m\\]\\w\\[\\e[1;37m\\]\x20$\x20"
	};
	
	/*
	 * String formater.
	 *
	 * @params String format
	 *
	 * @return String
	 */
	Terminal.prototype.format = function( format ) {

		// Regex for match escape sequence.
		var regexp = /(?<format>\x1b|\\x1b|\\e|((\0|\\0)33))((?:\[|\\\[)(?<code>.*?)(?<type>m)(?<text>[^\n]*))/g;
		var string = format.replaceAll( /\!\[(bx|bxl|bxs)\]\(([a-zA-Z0-9\-\s]+)\)/g, `<i class="bx $1-$2"></i>` )
		var match = regexp.exec( string );
		
		if( match !== null ) {

			// Default text is blank for avoid error.
			var text = "";
			
			// Get format style.
			var style = this.formatStyle( match.groups.code );
			
			// If format has text will be 
			if( Type( match.groups.text, String ) ) {
				text = this.format( match.groups.text );
			}
			
			// Check if format has style.
			if( style ) {
				return( Fmt( "{}<span class=\"terminal-text text\" style=\"{}\">{}</span>", string.substring( 0, regexp.lastIndex - match[0].length ), style, text ) );
			}
			return( string.substring( 0, regexp.lastIndex - match[0].length ) + text );
		}
		return( string );
	};
	
	/*
	 * Terminal format styling.
	 *
	 * @params String code
	 *
	 * @return False|String
	 */
	Terminal.prototype.formatStyle = function( code ) {

		var self = this;
		var pattern = /^(?:\d{1,2}|[01]\d|2[0-4])(;(?:\d|[0-5]\d)(?:;(?:\d{1,3})){0,2})*$/;
		if( pattern.test( code ) ) {

			// Split code with semicolon symbol.
			var codes = code.split( ";" ).map( part => parseInt( part ) );
			var color = null;
			var format = null;
	
			switch( codes.length ) {
				case 1:
					if( codes[0] >= 0 && codes[0] <= 9 ) {
						format = self.formatStyleValue[codes[0]];
					}
					else if( codes[0] >= 30 && codes[0] <= 37 ) {
						format = self.formatStyleColorValue.e0gte30lte37[codes[0]]
					}
					else if( codes[0] >= 40 && codes[0] <= 47 ) {
						format = self.formatStyleColorValue.e0gte40lte47[codes[0]]
					}
					break
				case 2:
					if( codes[0] >= 0 && codes[0] <= 9 ) {
						format = self.formatStyleValue[codes[0]];
	
						if( codes[1] >= 30 && codes[1] <= 37 ) {
							color = self.formatStyleColorValue.e0gte30lte37[codes[1]]
						}
						else if( codes[1] >= 40 && codes[1] <= 47 ) {
							color = self.formatStyleColorValue.e0gte40lte47[codes[1]]
						}
					}
					break
				case 3:
					break
				case 4:
					if( codes[0] >= 0 && codes[0] <= 9 ) {
						format = self.formatStyleValue[codes[0]];
					}
					if( codes[1] === 38 ) {
						if( codes[2] >= 0 && codes[2] <= 7 ) {
							if( codes[2] === 5 ) {
								color = Fmt( self.formatStyleColorValue.e38e5, codes[3] );
							}
							else if( codes[2] === 7 ) {
								color = Fmt( self.formatStyleColorValue.e38e7, codes[3] );
							}
							else {
								format = self.formatStyleValue[codes[2]];
								color = Fmt( self.formatStyleColorValue.e38e5, codes[3] );
							}
						}
					}
					break
			}
			return(
				color !== null && color !== false &&
				format !== null && format !== false ?
					Fmt( "{}; {}", format, color ) :
					(
						color !== null && color !== false ?
							color :
						(
							format !== null && format !== false ?
							format :
							false
						)
					)
			);
		}
		return( false );
	};
	
	Terminal.prototype.formatStyleColorValue = {
		e0gte30lte37: {
			30: "color: var(--shell-c-0-30m)",
			31: "color: var(--shell-c-0-31m)",
			32: "color: var(--shell-c-0-32m)",
			33: "color: var(--shell-c-0-33m)",
			34: "color: var(--shell-c-0-34m)",
			35: "color: var(--shell-c-0-35m)",
			36: "color: var(--shell-c-0-36m)",
			37: "color: var(--shell-c-0-37m)"
		},
		e1gte30lte37: {
			30: "color: var(--shell-c-1-30m)",
			31: "color: var(--shell-c-1-31m)",
			32: "color: var(--shell-c-1-32m)",
			33: "color: var(--shell-c-1-33m)",
			34: "color: var(--shell-c-1-34m)",
			35: "color: var(--shell-c-1-35m)",
			36: "color: var(--shell-c-1-36m)",
			37: "color: var(--shell-c-1-37m)"
		},
		e0gte40lte47: {
			40: "background-color: var(--shell-c-0-30m)",
			41: "background-color: var(--shell-c-0-31m)",
			42: "background-color: var(--shell-c-0-32m)",
			43: "background-color: var(--shell-c-0-33m)",
			44: "background-color: var(--shell-c-0-34m)",
			45: "background-color: var(--shell-c-0-35m)",
			46: "background-color: var(--shell-c-0-36m)",
			47: "background-color: var(--shell-c-0-37m)"
		},
		e1gte40lte47: {
			40: "background-color: var(--shell-c-1-30m)",
			41: "background-color: var(--shell-c-1-31m)",
			42: "background-color: var(--shell-c-1-32m)",
			43: "background-color: var(--shell-c-1-33m)",
			44: "background-color: var(--shell-c-1-34m)",
			45: "background-color: var(--shell-c-1-35m)",
			46: "background-color: var(--shell-c-1-36m)",
			47: "background-color: var(--shell-c-1-37m)"
		},
		e38e5: "color: var(--shell-c-38-{}m)",
		e38e7: "background-color: var(--shell-c-38-{}m)"
	};
	
	Terminal.prototype.formatStyleValue = {
		0: "font-weight: normal; font-style: normal; text-decoration: none; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1",
		1: "font-weight: 550",
		2: "opacity: .8",
		3: "font-style: italic",
		4: "text-decoration-line: underline",
		5: "font-weight: 550",
		6: "font-weight: normal; font-style: normal; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1",
		7: "background-color: var(--shell-c-37m); color: var(--shell-c-30m)",
		8: "background-color: var(--shell-c-30m); color: var(--shell-c-30m)",
		9: "text-decoration-line: line-through",
	};
	
	/*
	 * Terminal History.
	 *
	 * @values Array
	 */
	Terminal.prototype.history = Terminal.prototype.history ?? [{
		output: [
			...Banner, "\x20", "Type \x1b[0;38;7;153m\x1b[1;38;5;32m help \x1b[0;40m \x1b[37mfor available commands", "\x20"
		]
	}];
	
	/*
	 * Terminal Hostname.
	 *
	 * @values String
	 */
	Terminal.prototype.hostname = Terminal.prototype.hostname ?? "hxari";
	
	/*
	 * Terminal Loading.
	 *
	 * @values Boolean
	 */
	Terminal.prototype.loading = false;
	
	/*
	 * Push new log.
	 *
	 * @params String level
	 * @params Mixed message
	 *
	 * @return Void
	 */
	Terminal.prototype.log = function( level, message ) {

		// If message is instance of Error.
		if( message instanceof Error ) {

			// Parse error stack traces.
			var stack = this.parseStackTrace( message );
			
			// Push error.
			for( let i in stack ) {
				this.logs.push({
					level: level,
					message: `${message}`,
					file: stack[i].file,
					line: stack[i].line,
					column: stack[i].column,
					function: stack[i].function
				});
			}
		}
		this.logs.push({
			level: level,
			message: message
		});
	};
	
	/*
	 * Container for the entire logs.
	 *
	 * @values Array<Object>
	 */
	Terminal.prototype.logs = [];
	
	/*
	 * Terminal directory scanner.
	 *
	 * @params String path
	 *
	 * @return Array<Object>|Object
	 *  Array list directory contents.
	 *  Object of file info.
	 *
	 * @throws Error
	 *  Throw when the directory not found.
	 */
	Terminal.prototype.ls = function( path ) {

		var npath = "";
		var index = 0;
		var match = null;
		var regex = /(?<repeat>\*)|(?<current>^\.\/)/g;
		
		// Get current directory working.
		var work = this.pwd();
		
		// Resolve pathname with special character.
		if( path.match( /^\*+$/ ) !== null ) {
			npath = work;
		}
		else {
			while( ( match = regex.exec( path ) ) !== null ) {
				if( Type( match.groups.repeat, String ) ) {
					var value = ".*";
				}
				else {
					var value = work;
				}
				npath += path.substring( index, regex.lastIndex - match[0].length ) + value;
				index = regex.lastIndex;
			}
			npath += path.substring( index );
		}
		
		// Check if pathname has no slash in prefix.
		if( npath[0] !== "/" ) {
			npath = work + "/" + npath;
		}
		
		// Split pathname.
		let parts = npath.split( "/" ).filter( part => Value.isNotEmpty( part ) );
		let dir = this.directory;
		
		// Mapping parts of pathname.
		for( let i in parts ) {

			// Get part name.
			var part = parts[i];
			
			// Check if part name is double dot (..)
			if( part === ".." ) {

				// If previous part name is available.
				if( Type( parts[( i -1 )], String ) ) {
					part = parts[( i -1 )];
				}
				else {
					continue;
				}
			}
			
			// Check if directory value is Object.
			if( Type( dir, Object ) ) {

				// Check if directory has children.
				if( Type( dir.child, Array ) ) {
					dir = dir.child;
				}
				
				// Check if directory is symlink.
				else if( dir.type === "symlink" ) {
					return( Fmt( "{}/{}", this.ls( dir.from ), part ) );
				}
				else {
					dir = false;
				}
			}
			
			// Check id directory value is Array.
			if( Type( dir, Array ) ) {
				var regexp = null;
				var special = /(?<!\\)((?<bracket>\[(?:[^\]\\]|\\.)*\](\+)*)|(?<wildcard>\*)|(?<or>\|))/g;
				
				// Check if part name have special caharacters.
				if( special.test( part ) ) {
					try {
						regexp = new RegExp( Fmt( "^{}$", part.replaceAll( /(?:\/)|(?:\.(?!\*))/g, m => m === "/" ? "\\/" : "\\." ) ) );
					}
					catch( error ) {
						this.log( "error", error );
					}
				}
				
				// Find directory part name.
				dir = dir.find(
					
					/*
					 * Find directory part name by regex or part name.
					 *
					 * @params Object d
					 *
					 * @return Boolean
					 */
					function( d ) {
						if( regexp !== null ) {
							return( regexp.test( d.name ) );
						}
						return( part === d.name );
					}
				);
				
				// Check if directory not found.
				if( Type( dir, [ Array, Object ] ) === false ) {
					throw Fmt( "{}: No such file or directory", path );
				}
			}
			else {
				throw Fmt( "{}: No such file or directory {}", path );
			}
		}
		
		// Check if directory is path.
		if( dir.type === "path" ) {
			return( dir.child );
		}
		return( dir.type === "symlink" ? this.ls( dir.from ) : dir );
	};
	
	/*
	 * Parses a stack trace from an Error object and returns an array of objects
	 * containing information about each function call in the stack trace.
	 *
	 * @params Error error
	 *
	 * @return Array<Object>
	 */
	Terminal.prototype.parseStackTrace = function( error ) {

		/*
		 * Split the stack trace string into an array of lines and
		 * remove the first line (which contains the error message).
		 *
		 */
		const lines = error.stack.split( "\n" ).slice( 1 );
	
		/*
		 * Map over the array of lines and extract information about
		 * each function call using a regular expression.
		 *
		 */
		return( lines.map( line => {
			const match = line.match( /^\s*at\s+(.*)\s+\((.*):(\d+):(\d+)\)$/ );
			
			if( match ) {
				/*
				 * If the line matches the regular expression, extract the function name,
				 * file name, line number, and column number into an object.
				 *
				 */
				return({
					function: match[1],
					file: match[2],
					line: parseInt( match[3], 10 ),
					column: parseInt( match[4], 10 ),
				});
			}
			
			// If the line does not match the regular expression.
			else {
				return( null );
			}
			
		// Filter out any null values from the array.
		}).filter( item => !!item ) );
	};

	/*
	 * Path destination name resolver.
	 *
	 * @params String path
	 * @params Boolean pwdold
	 * 
	 * @return String
	 */
	Terminal.prototype.pathResolver = function( path, pwdold = false ) {

		var path = Type( path, String, () => path.trim(), () => "" );
		var index = 0;
		var match = null;
		var results = "";
		var regexp = /(?<dpoint>\/*\.\.\/*)|(?:^(?:(?<alpha>[a-zA-Z0-9]+)|(?<squiggle>\~\/*)|(?<point>\.\/*)))|(?<hyphen>^\-$)/g;

		while( ( match = regexp.exec( path ) ) !== null ) {
			var replace = null;
			var keys = Object.keys( match.groups );
			for( let i in keys ) {
				var key = keys[i];
				var cap = match.groups[key];
				if( Type( cap, String ) ) {
					switch( key ) {
						case "squiggle":
							if( cap.length === 1 && path.substring( cap.length ) === "" ||
								cap.length === 2 ) {
								replace = this.exports['HOME'];
								replace += cap[1] === "/" ? "/" : "";
							}
							else {
								replace = cap;
							}
							break;
						case "hyphen":
							if( pwdold === true ) {
								if( Type( this.exports['PWD-OLD'], "Undefined" ) ) {
									throw new Error( "PWD-OLD not set" );
								}
								replace = this.exports['PWD-OLD'];
							}
							else {
								replace = "";
							}
							break;
						case "dpoint":
							if( index === 0 ) {
								var source = this.pwd();
							}
							else {
								var source = results;
							}
							var parts = source.split( "/" );
								parts = parts.filter( part => part.length >= 1 );
								parts.pop();
							results = "/" + parts.join( "/" );
							replace = "";
							break;
						case "alpha":
							replace = this.pwd() + "/";
							replace += cap;
							break;
						case "point":
							replace = this.pwd();
							break;
					}
				}
			}
			results += path.substring( index, regexp.lastIndex - match[0].length );
			results += replace.replace( /\/\/+/g, "/" );
			index = regexp.lastIndex;
		}
		return( results + path.substring( index ) );
	};
	
	/*
	 * Prompt formater.
	 *
	 * @params String format
	 *
	 * @return String
	 */
	Terminal.prototype.prompt = function( format ) {

		var index = 0;
		var match = null;
		var prompt = "";
		var regexp = /(?<backslash>\\)(?!(e|x1b|033))(?<format>[^\s]{0,1})/g;
		
		while( ( match = regexp.exec( format ) ) !== null ) {
			var value = "";
			switch( match.groups.format ) {
				// The date in "Weekday Month Date" format (e.g., "Tue May 26")
				case "d": value = this.date.format( "%a %b %d" ); break;
				
				// The hostname.
				case "h":
				case "H": value = this.hostname; break;
				
				// New line.
				case "n": value = "<br/>"; break;
				
				// The name of the shell.
				case "s": value = this.shell; break;
				
				// Current working directory.
				case "w": value = this.pwd() !== this.exports.HOME ? this.pwd() : "~"; break;
				
				// Basename current working directory.
				case "W": value = this.pwd( true ); break;
				
				// The username of current user.
				case "u": value = this.user; break;
				
				// The current time in 24-hour HH:MM:SS format.
				case "t": value = this.date.format( "%H:%M:%S" ); break;
				
				// The current time in 12-hour HH:MM:SS format.
				case "T": value = this.date.format( "%I:%M:%S" ); break;
				
				// The current time in 12-hour am/pm format.
				case "@": value = Fmt( "{} {}", this.date.format( "%I:%M" ), this.date.hours() >= 12 ? "PM" : "AM" ); break;
				
				// The current time in 24-hour HH:MM format.
				case "A": value = this.date.format( "%H:%M" ); break;
				
				default: break;
			}
			prompt += format.substring( index, regexp.lastIndex - match[0].length ) + value;
			index = regexp.lastIndex;
		}
		return( this.format( prompt + format.substring( index ) ) );
	};
	
	/*
	 * Return Terminal current working directory.
	 *
	 * @params Boolean base
	 *  Just get basename only.
	 *
	 * @return String
	 */
	Terminal.prototype.pwd = function( base = false ) {

		// Get current working directory.
		var path = this.exports.PWD.path;
		
		// If current path has no defined in vue router.
		if( Type( path, "Undefined" ) ) {
			path = this.exports.PWD._value.path;
		}
		
		// Create regular expression for remove root name in prefix path.
		var regexp = /^\/terminal/i;
		
		// Replace /terminal path.
		path = path.replace( regexp, "" );
		path = path === "" ? "/" : path;
		
		// Check if just get base pathname.
		if( base ) {
			return( path.split( "/" ) ).pop();
		}
		return( path );
	};
	
	/*
	 * Run terminal with command.
	 *
	 * @params String argument
	 *
	 * @return Promise
	 */
	Terminal.prototype.run = async function( argument ) {

		// Copy current object instance.
		var self = this;
		
		return( await new Promise(
			
			/*
			 * Command runner.
			 *
			 * @params Function resolve
			 * @params Function reject
			 *
			 * @return Void
			 */
			function( resolve, reject ) {
				self.loading = true;
				self.binding.model = "";
				self.history.push({
					prompt: self.prompt( self.exports.PS1 ),
					inputs: self.colorable( argument ),
					output: [],
					raw: argument
				});
				try {
					var shell = self.commands.find( shell => shell.name === self.shell );
					if( shell ) {
						if( self.built[self.shell] ) {
							var built = self.builder( [ shell, self.built[shell.name] ], { argv: null, args: null } );
						}
						else {
							var built = self.builder( shell, { argv: null, args: null } );
						}
						var exec = new built({ argument });
							exec.forEach( output => 
								self.history.push({
									output: output
								})
							);
					}
					else {
						throw new Error( Fmt( "{}: Shells not available", self.shell ) );
					}
				}
				catch( error ) {
					console.error( error );
					self.log( "error", error );
					self.history.push({ output: self.colorableAnsi( Fmt( "{}: {}", self.shell, error ) ) });
				}
				self.loading = false;
			}
		));
	};
	
	/*
	 * Terminal shell name.
	 *
	 * @values String
	 */
	Terminal.prototype.shell = "js";
	
	/*
	 * Terminal style.
	 *
	 * @values String
	 */
	Terminal.prototype.style = "font-weight: normal; font-style: normal; text-decoration: none; text-decoration-line: none; color: var(--shell-c-37m); opacity: 1";
	
	/*
	 * Terminal username.
	 *
	 * @values String
	 */
	Terminal.prototype.user = "root";
	
	/*
	 * Terminal version.
	 *
	 * @values String
	 */
	Terminal.prototype.version = "4.0";
	
	/*
	 * Terminal version release.
	 *
	 * @values String
	 */
	Terminal.prototype.versionRelease = "4.0.0";

	/*
	 * Container for the entire alias name.
	 *
	 * @values Array
	 */
	Terminal.prototype.aliases = {
		"\x63\x68\x69\x6e\x74\x79\x61": "\x65\x63\x68\x6f\x20\x2d\x65\x20\x22\x63\x68\x69\x6e\x74\x79\x61\x3a\x20\x59\x6f\x75\x20\x61\x72\x65\x20\x62\x65\x61\x75\x74\x69\x66\x75\x6c\x2c\x20\x63\x75\x74\x65\x2c\x20\x6b\x69\x6e\x64\x2c\x20\x77\x68\x69\x74\x65\x2c\x20\x72\x65\x64\x64\x69\x73\x68\x2c\x20\x73\x6d\x6f\x6f\x74\x68\x2c\x20\x73\x6f\x66\x74\x2c\x20\x62\x75\x74\x20\x61\x6c\x73\x6f\x20\x76\x65\x72\x79\x20\x61\x6e\x6e\x6f\x79\x69\x6e\x67\x3b\x20\x59\x6f\x75\x20\x6c\x69\x6b\x65\x20\x73\x6b\x79\x20\x62\x6c\x75\x65\x3b\x20\x41\x6e\x64\x20\x79\x6f\x75\x20\x6c\x69\x6b\x65\x20\x63\x6c\x65\x61\x72\x20\x73\x6f\x75\x70\x20\x77\x69\x74\x68\x20\x67\x72\x65\x65\x6e\x20\x73\x70\x69\x6e\x61\x63\x68\x22",
		"\x6c\x69\x61\x6e\x61\x72\x79": "\x65\x63\x68\x6f\x20\x2d\x65\x20\x22\x6c\x69\x61\x6e\x61\x3a\x20\x52\x65\x6d\x65\x6d\x62\x65\x72\x2c\x20\x66\x61\x6c\x6c\x69\x6e\x67\x20\x69\x6e\x20\x6c\x6f\x76\x65\x20\x62\x65\x63\x61\x75\x73\x65\x20\x6f\x66\x20\x66\x61\x69\x74\x68\x20\x69\x73\x20\x6d\x75\x63\x68\x20\x6d\x6f\x72\x65\x20\x62\x65\x61\x75\x74\x69\x66\x75\x6c\x20\x74\x68\x61\x6e\x20\x66\x61\x6c\x6c\x69\x6e\x67\x20\x69\x6e\x20\x6c\x6f\x76\x65\x20\x62\x65\x63\x61\x75\x73\x65\x20\x6f\x66\x20\x6c\x75\x73\x74\x3b\x20\x49\x20\x73\x68\x6f\x75\x6c\x64\x20\x68\x61\x76\x65\x20\x75\x6e\x64\x65\x72\x73\x74\x6f\x6f\x64\x20\x79\x6f\x75\x72\x20\x63\x6f\x64\x65\x20\x66\x72\x6f\x6d\x20\x74\x68\x65\x20\x73\x74\x61\x72\x74\x3b\x20\x4f\x6e\x65\x20\x6d\x6f\x72\x65\x20\x74\x68\x69\x6e\x67\x2c\x20\x49\x20\x6d\x69\x73\x73\x20\x79\x6f\x75\x72\x20\x76\x6f\x69\x63\x65\x22"
	};
	
	/*
	 * Terminal author info
	 *
	 * @values Object
	 */
	Terminal.prototype.author = Author;
	
	/*
	 * Set Terminal vue component instance.
	 *
	 * @values Object
	 */
	Terminal.prototype.binding = binding;
	
	/*
	 * Set Current working directory.
	 *
	 * @values Object
	 */
	Terminal.prototype.exports.PWD = router.currentRoute;
	
	/*
	 * Get Terminal commands.
	 *
	 * @values Array<Object>
	 */
	Terminal.prototype.commands = this.ls( "/bin" );
	
	/*
	 * Set Terminal router.
	 *
	 * @values Router
	 */
	Terminal.prototype.router = router;
	
	try {
		if( this.pwd() === "/" ) {
			this.router.push( Fmt( "/terminal{}", this.exports.HOME ) );
		}
		else {
			this.ls( this.pwd() );
		}
	}
	catch( error ) {
		this.history.push({ output: [ Fmt( "{}: {}", this.shell, error ) ] });
	}
};

export default Terminal;
