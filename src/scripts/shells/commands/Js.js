
// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

export default {
	name: "js",
	type: "file",
	data: {},
	options: {},
	methods: {
		
		/*
		 * Subtitution command.
		 *
		 * @params Object groups
		 *  Object groups from exec returns.
		 *
		 * @return Mixed
		 */
		backticks: function( groups )
		{
			// ...
			return( "" );
		},
		
		/*
		 * Subtitution expansion.
		 *
		 * @params String syntax
		 *  Subtitution syntax.
		 *
		 * @return Mixed
		 *
		 * @throws TypeError
		 */
		expansion: function( syntax )
		{
			// var regexp = /^(?<name>[a-zA-Z0-9]+)()(?<>[^\n]+)$/;
			return( "" );
		},
		
		/*
		 * Extract argument value into array.
		 *
		 * @params String argument
		 *
		 * @return Array
		 */
		extract: function( argument )
		{
			// Pattern for check if string containing special characters.
			var sregexp = /(?<!\\)((?<bracket>\[(?:[^\]\\]|\\.)*\])|(?<wildcard>\*)|(?<or>\|))/g;
			
			// Pattern for extract argument values.
			var eregexp = /(?<=\s|^)(--\w+(?:-\w+)*|-{1}(?=\w))(?:=(?:(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\$\((?:[^\)\\]|\\.)*\)|(?:(?<=\s|^|\\)[^=\s"'\`$]+(?:(?<!\\)(?:\s+|`(?:\\.|[^`\\])*`|[\$][\(](?:\\.|[^\(\)\\])*[\)]+)[^=\s"'\`$]*)*))|(\S+))*(?=\s|$)|(\S*)(?:\"(?:[^\"\\]|\\.)*\"|\'(?:[^\'\\]|\\.)*\'|\`(?:[^\`\\]|\\.)*\`|\$\((?:[^\)\\]|\\.)*\))(\S*)|(\S+)|(?:(?<=\s|^)[^-]\S*(?=\s|$))/g;
			
			// Extract argument values.
			var extract = Array.from( argument.matchAll( eregexp ), m => m );
			var argv = [];
			
			// Mapping extracted argument values.
			for( let i in extract )
			{
				// Get matched value.
				var value = extract[i][0].trim();
				
				// Pattern for match flanked characters.
				var qregex = /(?!\\)(?:(?<quotes>(["'])(?<quoted>(?:[^\1\\]|\\.)*)\1)|(?<subtitution>(?<subtitution_command>\$\((?<command>(?:[^\)\\]|\\.)*)\))|(?<subtitution_expansion>\$\{(?<expansion>(?:[^\}\\]|\\.])*)\})|(?<subtitution_backticks>\`(?<backticks>(?:[^\`\\]|\\.)*)\`)))/gm;
				var result = "";
				var match = null;
				var index = 0;
				
				while( ( match = qregex.exec( value ) ) !== null )
				{
					result += value.substring( index, qregex.lastIndex - match[0].length );
					
					switch( true )
					{
						case Type( match.groups.subtitution_command, String ):
						case Type( match.groups.subtitution_backticks, String ):
							result += this.backticks( match.groups );
							break;
						case Type( match.groups.subtitution_expansion, String ):
							result += this.expansion( match.groups );
							break;
						default:
							result += match.groups.quotes.slice( 1, match[0].length -1 );
							break;
					}
					index = qregex.lastIndex;
				}
				
				// Append strings.
				value = result + value.substring( index );
				
				// Check if input has regular expression.
				if( sregexp.test( value ) )
				{
					try
					{
						// Get file lists.
						var ls = this.$root.ls( value );
						
						// If file or directory exists.
						if( Type( ls, [ Array, Object ] ) )
						{
							if( ls.length > 0 )
							{
								for( let i in ls )
								{
									argv.push( ls[i].name );
								}
								continue;
							}
							argv.push( ls.name );
							continue;
						}
					}
					catch( error )
					{
						this.$root.log( "error", error );
					}
				}
				argv.push( value );
			}
			return( argv );
		},
		
		/*
		 * Replace variable names in the arguments.
		 *
		 * @params String argument
		 *
		 * @return Array
		 */
		replace: function( argument )
		{
			var self = this;
			var result = [];
			var splits = argument.split( /(?<=^|[^"'`\\\\])\s*&&\s*(?=[^"'`\\\\]|$)/g );
			
			// Mapping splited arguments.
			for( let i in splits )
			{
				// If argument is not && symbols.
				if( splits[i] !== "&&" )
				{
					var value = "";
					var regex = /(?<!\\)(?<variable>\$(?<name>[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*))/g;
					var match = regex.exec( splits[i] );
					
					// If argument has variable.
					if( match !== null )
					{
						// Check if variable is declared.
						if( Not( this.$vars[match.groups.name], "Undefined" ) )
						{
							value = this.$vars[match.groups.name];
						}
						
						// Check if environment is available.
						else if( Not( this.$envs[match.groups.name], "Undefined" ) )
						{
							// If environment name is PWD.
							if( match.groups.name === "PWD" )
							{
								value = this.$envs.PWD.path ?? "";
							}
							else {
								value = this.$envs[match.groups.name];
							}
						}
						splits[i] = this.replace( splits[i].substring( 0, regex.lastIndex - match[0].length ) + value + splits[i].substring( regex.lastIndex ) );
					}
					
					// If split value is not Array.
					if( Type( splits[i], Array ) )
					{
						result.push( ...splits[i] );
					}
					else {
						
						// Find and remove defined variable syntax.
						var single = splits[i].replace( /(?<!['"`])\b(?:[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)=(\S+)\b(?<!['"`])/g, match =>
						{
							// Set variable into containers.
							return([ "", self.$vars[match.substring( 0, match.indexOf( "=" ) )] = match.substring( match.indexOf( "=" ) +1 ) ][0]);
						});
						
						// Check if value is not empty.
						if( Value.isNotEmpty( single ) )
						{
							// Split argument with whitespace.
							var spaces = single.split( "\x20" );
							
							// Check if alias name is available.
							if( Type( this.$name[spaces[0]], String ) )
							{
								// Resolve alias name.
								var replace = this.replace( this.$name[spaces[0]] );
								
								// Get first splited argument.
								var prefix = replace[0] + "\x20" + spaces.slice( 1 ).join( "\x20" );
								
								result.push( ...[ prefix, ...replace.slice( 1 ) ] );
							}
							else {
								result.push( single );
							}
						}
					}
				}
			}
			return( result );
		},
		
		/*
		 * Parse argument value into object.
		 *
		 * @params Array argv
		 *
		 * @return Object
		 */
		parser: function( argv )
		{
			var args = {};
			
			// Check if argument value is Array.
			if( Type( argv, Array ) )
			{
				var post = 0;
				var length = argv.length;
				
				// Remove filename from argument values.
				//result.file = argv.shift();
				
				// Counting argument based on argument values length.
				for( let i = 0; i < length; i++ )
				{
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
					if( arg !== "" )
					{
						// If argument value is long option.
						if( arg.slice( 0, 2 ) === "--" )
						{
							// Get position equal symbol position.
							var index = arg.indexOf( "=" );
							
							// If argument has equal symbol.
							if( index >= 0 )
							{
								var key = arg.slice( 2, index );
								var val = arg.slice( index +2 );
									val = Value.isNotEmpty( val ) ? val : null;
							}
							else {
								
								var key = arg.slice( 2 );
								var val = argv[idx] ?? null;
								
								// If argument value is not enclosed empty string.
								if( val !== null )
								{
									// If doesn't minus symbol.
									if( idx < length && val.length !== 0 && val[0] !== "-" )
									{
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
							if( Value.isNotEmpty( key ) )
							{
								args[key] = val = val !== null ? val : true;
							}
							continue;
						}
						
						// If argument value is short option.
						else if( arg.slice( 0, 1 ) === "-" )
						{
							// If position 2 has equal symbol.
							if( arg.slice( 2, 3 ) === "=" )
							{
								var key = arg.slice( 1, 2 );
								var val = arg.slice( 3 );
								
								args[key] = Value.isEmpty( val ) ? args[key] ?? true: val;
							}
							else {
								
								// Split arg like -xyz into Array.
								var chars = arg.slice( 1 );
									chars = chars.split( "" );
								
								// Mapping chars.
								for( let u in chars )
								{
									// If option has value.
									if( u >= 1 && chars[u] === "=" )
									{
										var key = chars[( u -1 )];
										var val = arg.slice( arg.indexOf( "=" ) +1 );
										
										args[key] = Value.isEmpty( val ) ? args[key] ?? true: val;
										break;
									}
									args[chars[u]] = args[chars[u]] ?? true;
								}
							}
							continue;
						}
					}
					args[post++] = arg;
				}
			}
			return( args );
		}
	},
	mounted: function({ argument })
	{
		// Normalize argument passed.
		var resolved = this.replace( argument );
		var results = [];
		
		// Mapping resolved arguments.
		for( let i in resolved )
		{
			var argv = this.extract( resolved[i] );
			var args = this.parser( argv );
			
			// Find command line shell.
			var shell = this.$root.commands.find( shell => shell.name === argv[0] );
			
			// If shell is available.
			if( shell )
			{
				// Checks if the command has a previous instance.
				if( this.$root.built[argv[0]] )
				{
					var built = this.$root.builder( [ shell, this.$root.built[argv[0]] ], { argv, args } );
				}
				else {
					var built = this.$root.builder( shell, { argv, args } );
				}
				
				// Instantiate program/command.
				var exec = new built({ e: args.e });
				
				// If command return outputs.
				if( Type( exec, Array ) )
				{
					results.push( exec );
				}
				else {
					this.$root.built[argv[0]] = exec;
				}
			}
			else {
				throw Fmt( "{}: Command not found", argv[0] );
			}
		}
		return( results );
	}
};
