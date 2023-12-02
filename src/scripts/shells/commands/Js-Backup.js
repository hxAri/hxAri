
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

export default {
	name: "js",
	type: "binary",
	data: {
		patterns: {
			argument: {
				
				// @syntax command `command ...`
				backtick: {
					pattern: "(?<!\\\\)(?:\\`.*?(?<!\\\\)\\`)"
				},
				
				// @syntax $ENVIRONMENT
				// @syntax $VAR
				environment: {
					pattern: "(?<!\\\\)\\$(?<enviname>\\{[a-zA-Z_](?:[a-zA-Z0-9_])*\\}|[a-zA-Z_](?:[a-zA-Z0-9_]*))"
				},
				
				// @syntax string*string
				// @syntax string*
				// @syntax *string
				globbing: {
					pattern: "\\w*(?<!\\\\)[\\*|\\?]\\w*"
				},
				
				// @syntax ${expression}
				parameter: {
					pattern: "(?<!\\\\)\\$(?<!\\\\)\\{(?<expression>.*?)(?<!\\\\)[\\}]+"
				},
				
				// @syntax {expression}
				expansion: {
					pattern: "(?<!\\\\)\\{(?:.*?)(?<!\\\\)[\\}]+"
				},
				
				// @syntax $(command --flag)
				substitution: {
					pattern: "(?<!\\\\)\\$(?<!\\\\)\\((?:.*?)(?<!\\\\)[\\)]+"
				},
				
				// @syntax (command -x; command -y; ...)
				subshell: {
					pattern: "(?<!\\\\)\\((?:.*?)(?<!\\\\)[\\)]+"
				},
				
				// @syntax var=val
				// @syntax var="val"
				assignment: {
					pattern: "(?:[a-zA-Z\\_]+[a-zA-Z0-9\\_]*)(?:\\=(?:\\S+|(?<!\\\\)(?:(?:\\\".*?(?<!\\\\)\\\"|\\'.*?(?<!\\\\)\\'|\\`.*?(?<!\\\\)\\`)))*)"
				},
				
				// @syntax command > file
				//  regexp "(?<herestring_right>\\w+\\s*\\>\\s*(?:[^\\s]+|.*\"[^\"]*\".*))"
				// @syntax command < file > contents
				//  regexp "(?<herestring_left>\\w+\\s*\\<\\s*(?:[^\\s]+|.*\"[^\"]*\".*)\\s*\\>\\s*(?:[^\\s]+|.*\"[^\"]*\".*))"
				// @syntax command > file << DELIMITER contents DELIMITER
				// @syntax command > file <<- DELIMITER contents DELIMITER
				//  regexp "\\w+\\s*\\>\\s*\\w+\\s*\\<\\<(?:\\-{0,1}\\s+)*\\s*(?<delimiter>\"(?<delimiter_escaped>[^\"]+)\"|\\S+)\\s+(?:.*?)(?:(?:\\n|\\s)(?:\\k<delimiter_escaped>|\\k<delimiter>)\\b)"
				// @syntax command > fopen >> fsave
				//  regexp "\\w+\\s*\\>\\s*\\w+\\s*\\>\\>\\s*\\w+"
				// @syntax command >> fsave >> DELIMITER contents DELIMITER
				// @syntax command >> fsave >>- DELIMITER contents DELIMITER
				//  regexp "\\w+\\s*\\>\\>\\s*\\w+\\s*\\>\\>(?:\\-{0,1}\\s+)*(?<delimiter>\"(?<delimiter_escaped>[^\"]+)\"|\\S+)\\s+(?:.*?)(?:(?:\\n|\\s)(?:\\k<delimiter_escaped>|\\k<delimiter>)\\b)"
				// @syntax cat << DELIMITER contents DELIMITER
				//  regexp 
				herestring: {
					pattern: "\\w+\\s*\\<\\<\\s*(?<delimiter>\"(?<delimiter_escaped>[^\"]+\")|\\S+)\\s+(?:.*)(?:\\b(?:\\k<delimiter_escaped>|\\k<delimiter>)\\b)"
				},
				
				// heredoc: {
				// 	pattern: ``
				// },
				
				// @syntax if [[ expression ]]; then statement; fi
				// @syntax if expression; then statement; fi
				// @syntax ...; else if statement; fi
				// @syntax ...; elif statement; fi
				// @syntax ...; else statement; fi
				// branching: {
				// 	pattern: ""
				// },
				
				// @syntax for i in /path/to/file/*; do statement; done
				// syntax while expression; do statement; done
				// looping: {
				// 	pattern: ""
				// },
				
				// concatenation: {
				// 	pattern: ""
				// },
				
				// argexpand: {
				// 	pattern: ""
				// },
				
				// @syntax command ; command
				// @syntax command \
				// @syntax command &&
				// @syntax command &
				separator: {
					pattern: "(?<!\\\\)(?:\\&\\&|\\&|\\;|\\\\)"
				},
				
				// @syntax command | command
				piping: {
					pattern: "\\|"
				},
				
				optional: {
					pattern: "\\s(?:-{1,2})[a-zA-Z0-0\\-\\_\\.]+(?:\\=(?<optvalue>(?:\\S*|[\\w]*(?<!\\\\)(?:(?<optstring>[\\\"\\'])|(?<optbtick>\\`(?:(?:[^\\`\\\\]|\\.)*)\\`))[\\w]*)))*"
				},
				
				// positional: {
				// 	pattern: "\\S+"
				// },
				
				// @syntax "value"
				// @syntax 'value'
				string: {
					rematch: {
						left: "\\S+",
						right: "\\S+",
					},
					pattern: "(?<!\\\\)(?:(?:\\\".*?(?<!\\\\)\\\"|\\'.*?(?<!\\\\)\\'))"
				},
				
				// mismatch: {
				// 	pattern: "(?:.)"
				// }
			}
		}
	},
	author: Author,
	abouts: "A simple virtual shell command line",
	version: "1.0",
	release: "10, Apr 2023",
	options: {
		argument: {
			type: String,
			usage: "Execute JavaScript syntax",
			require: true
		},
		help: {
			type: Boolean,
			usage: "Display this help",
			require: false
		}
	},
	methods: {
		extract: function( argument )
		{
			var iter = 0;
			var index = 0;
			var stack = [];
			var match = null;
			var groups = Object.keys( this.patterns.argument );
			var compile = Object.values( this.patterns.argument ).map( p => Fmt( "(?<{}>{})", groups[( iter++ )], p.pattern.replace( /\s|\n|\t/gms, "" ) ) ).join( "|" );
			var pattern = new RegExp( compile, "gms" );
				// pattern = /(?<=\s|^)(?:"[^"]*?"|'[^']*?'|`[^`]*?`|\([^()]*\)|\{[^{}]*\}|\[[^\[\]]*\]|[^"|'`<{[(;&&])+(?=\s|$)/g
				// pattern = /[^|<>&;]+(?=(?:(?:[^`'"]*(?:(`|'|")[^`'"]*\1)[^`'"]*)*[^`'"]*$)(?![^{]*\}|\([^)]*\)|\[[^\]]*\]))/g
				// pattern = /(?<=[^"'`<{(\[;&&]|^)(?:"[^"]*(?:(?<=\\)"[^"]*)*"|'[^']*(?:(?<=\\)'[^']*)*'`[^`]*`|\([^()]*\)|\{[^{}]*\}|\[[^\[\]]*\]|[^\s"'`<{(\[;&&])+(?=[^"'`<{(\[;&&]|$)/g;
				// pattern = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\((?:[^()\\]|\\.)*\)|\{(?:[^{}\\]|\\.)*\}|\[(?:[^\[\]\\]|\\.)*\]|[^|<>&;]+|[|<>&;])/g;
				// pattern = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^()\\])*+\)|\{(?:\\.|[^{}\\])*+\}|\[(?:\\.|[^\[\]\\])*+\]|[^\s|<>&;]+|[|<>&;]/g;
				// pattern = /\w*(?:"(?:[^"\\]*(?:\\.[^"\\]*)*)"|'(?:[^'\\]*(?:\\.[^'\\]*)*)'|`(?:[^`\\]*(?:\\.[^`\\]*)*)`)\w*|\((?:[^()]|\([^)]*\))*\)|\{(?:[^{}]|(?:\{[^}]*\}))*\}|\[(?:[^\[\]]|\[[^\[\]]*\])*\]|[^\s|<>&;]+|[|<>&;]+/g;
				// pattern = /((?<=")[^"]*(?=")|(?<='[^']*(?='))|(?<=")[^"]*(?<=")|(?<='[^']*(?='))|(?<=\{)[^}]*(?=\})|(?<=\()[^)]*(?=\))|(?<={)[^}]*(?={)|(?<=\()[^)]*(?=\()|(?<=[^\\|<>&;]))[^\\|<>&;]+/g;

				// pattern = /(?<!\\)(?:(?<=[^{}()"''`])|(?<=[^{}()"''`]))(?!\\)(?:\||<|<<|<<<|>>>|>>|>|&|&&|;)/g;
				// pattern = /(?<![\\](["']|`|{|\[|\(\)|\"\}\)]|\\\"))(\\\\|[\|<>&\;])|(?<=[^\\]["']|`|{|\[|\(\)\s+)(\\\\|[\|<>&\;])|(?<=[^\\]["']|`|{|\[|\(\)\s+["']|`|{|\[|\(\)|\"\}\)\s+)(\\\\|[\|<>&\;])|(?<=[^\\]["']|`|{|\[|\(\)\s+["']|`|{|\[|\(\)|\"\}\)\s+["']|`|{|\[|\(\)|\"\}\)\s+)\s+`/;
				// pattern = /(?<!['"`{}\[\]()])\s*([|<]{1,3}|>[\|&]{1,2}|;)\s*(?![^'"]*[`'"])(?![^()\[\]{}]*\))/g;
				// pattern = /(?<!['"`{}\[\]()])\s*([|<]{1,3}|>[|&]{1,2}|;)\s*(?![^'"]*[`'"])(?![^()\[\]{}]*\))(?![^<]*<\/)/;
			
			// Resolve backslash
			argument = argument.replaceAll( /(?<!\\)\\(n|s|r)/gms, m => m === "\\n" ? "\n" : ( m === "\\r" ? "\r" : "\x20" ) );
			argument = argument.replaceAll( /[\\]+/gms, m => m.length );

			while( ( match = pattern.exec( argument ) ) !== null )
			{
				// Skip if value is empty.
				if( Value.isEmpty( match[0] ) ) continue;

				console.log( match.groups );

				// Check if match has groups.
				if( Type( match.groups, Object ) )
				{
					// Get all group names.
					var groups = Object.keys( match.groups );
					
					for( let i in groups )
					{
						// Get group name.
						var group = groups[i];
						
						// Check if group is available.
						if( Type( this.patterns.argument[group], Object ) &&
							Type( match.groups[group], String ) )
						{
							break;
						}
					}
					stack.push( this.$root.colorableAnsi( Fmt( "{}: {}", group, match[0] ) ) );
				}
				else {
				}
				index = pattern.lastIndex;
			}
			return( stack );
		}
	},
	mounted: function({ argument } = {})
	{
		return [ this.extract( argument ) ];
	}
};