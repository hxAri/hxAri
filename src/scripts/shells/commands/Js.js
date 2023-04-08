
// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

export default {
	name: "js",
	type: "file",
	data: {
		regexp: {
			numeric: /^-?\d+(\.\d+)?$/,
			datetime: /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/
		}
	},
	options: {
		argument: {
			type: String,
			usage: "",
			require: true
		}
	},
	methods: {
		
		/*
		 * Resolve backslash in the raw strings.
		 *
		 * @params String string
		 *
		 * @return String
		 */
		backslash: string => string.replaceAll( /(?:\\{1,})(?!(x|e|0))/g, match =>
		{
			// If the number of backslashes is one.
			if( match.length === 1 ) return( "" );
			
			// If number of backslash is odd.
			if( match.length % 2 !== 0 )
			{
				return( "\\".repeat( match.length -1 ) );
			}
			
			// Make backslashes as much as the amount minus two.
			return( "\\".repeat( match.length === 2 ? match.length -1 : match.length -2 ) );
		}),
		
		/*
		 * Subtitution command.
		 *
		 * @params String argument
		 *  Object groups from exec returns.
		 *
		 * @return Mixed
		 */
		command: function( argument )
		{
			let match;
			var $vars = this.$vars;
			
			// Check if subtitution is Arithmetic syntax.
			if( match = argument.match( /^\((([^\\)]|\\.)*)\)$/ ) )
			{
				// Split with comman separator.
				var syntax = match[1].split( "," );
				
				for( let i in syntax )
				{
					// Replace letters in rithmetic syntax,
					syntax[i] = syntax[i].replaceAll( /([a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*)/g, ( name ) =>
					{
						// Check if variable is not defined.
						if( Type( $vars[name], "Undefined" ) )
						{
							$vars[name] = 0;
						}
						return( `$vars.${name}` );
					});
					
					// Execute arithmetic syntax.
					var fun = new Function( `return ${syntax[i]}` );
					
					// Get aritmethic result.
					syntax[i] = fun() ?? "";
				}
				return( syntax.join( "\x20" ) );
			}
			return( this.$exec( argument ) );
		},
		
		/*
		 * Convert the string to the appropriate data value.
		 *
		 * @params Mixed value
		 *
		 * @return Mixed
		 */
		convert: function( value )
		{
			if( Not( value, [ "Null", "Undefined" ] ) )
			{
				if( Type( value, String ) )
				{
					// Remove whitespaces.
					value = value.trim();
					
					try
					{
						// Check if value is a boolean string
						if( value === "true" || value === "false" ) return( value === "true" );
						
						// Check if value is a numeric string
						if( this.regexp.numeric.test( value ) ) return( parseFloat( value ) );
						
						// Check if value is a JSON string
						if( value.startsWith( "{" ) &&
							value.endsWith( "}" ) )
						{
							return( JSON ).parse( value );
						}
						
						// Check if value is a date string
						if( this.regexp.datetime.test( value ) ) return( new Date( value ) );
					}
					catch( error )
					{}
				}
				return( value );
			}
			return( null );
		},
		
		/*
		 * Execute raw string javascript.
		 *
		 * @params String raw
		 *
		 * @return Mixed
		 */
		execute: function( argv )
		{
			var result = [];
			
			// Mapping argument values.
			for( let i in argv )
			{
				var func = new Function( `return(${argv[i]});` );
				var out = func();
				
				// Check if function has return values.
				if( Not( out, "Undefined" ) )
				{
					result.push( `${out}`.split( "\n" ) );
				}
			}
			return( result );
		},
		
		/*
		 * Subtitution expansion.
		 *
		 * @params String syntax
		 *  Subtitution syntax.
		 *
		 * @return Mixed
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
			var sregexp = /(?<!['"`])(?<!\\)((?<bracket>\[(?:[^\]\\]|\\.)*\])|(?<wildcard>\*)|(?<or>\|))(?<!['"`])/g;
			
			// Pattern for extract argument values.
			var eregexp = /(?<=\s|^)(--\w+(?:-\w+)*|-{1}(?=\w))(?:=(?:(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\$\((?:[^\)\\]|\\.)*\)|(?:(?<=\s|^|\\)[^=\s"'\`$]+(?:(?<!\\)(?:\s+|`(?:\\.|[^`\\])*`|[\$][\(](?:\\.|[^\(\)\\])*[\)]+)[^=\s"'\`$]*)*))|(\S+))*(?=\s|$)|(\S*)(?:\"(?:[^\"\\]|\\.)*\"|\'(?:[^\'\\]|\\.)*\'|\`(?:[^\`\\]|\\.)*\`|\$\((?:[^\)\\]|\\.)*\))(\S*)|(\S+)|(?:(?<=\s|^)[^-]\S*(?=\s|$))/g;
			
			// Extract argument values.
			var extract = Array.from( argument.matchAll( eregexp ), m => m );
			var argv = [];
			
			// Mapping extracted argument values.
			for( let i in extract )
			{
				if( Value.isEmpty( extract[i][0] ) ) continue;
				
				// Get matched value.
				var value = extract[i][0].trim();
				
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
				
				// Pattern for match flanked characters.
				var qregex = /(?!\\)(?:(?<quotes>(["'])(?<quoted>(?:[^\1\\]|\\.)*)\1)|(?<subtitution>(?<subtitution_command>\$\((?<command>(?:[^\)\\]|\\.)*)\))|(?<subtitution_expansion>\$\{(?<expansion>(?:[^\}\\]|\\.])*)\})|(?<subtitution_backticks>\`(?<backticks>(?:[^\`\\]|\\.)*)\`)))/gm;
				var result = "";
				var match = null;
				var index = 0;
				
				while( ( match = qregex.exec( value ) ) !== null )
				{
					result += this.backslash( value.substring( index, qregex.lastIndex - match[0].length ) );
					
					switch( true )
					{
						case Type( match.groups.subtitution_command, String ):
						case Type( match.groups.subtitution_backticks, String ):
							argv.push( result );
							argv.push( ...this.extract(
								this.command( 
									this.backslash(
										typeof match.groups.backticks === "string" ? match.groups.backticks : match.groups.command
									)
								)
							));
							result = "";
							break;
						case Type( match.groups.subtitution_expansion, String ):
							result += this.expansion( this.backslash( match.groups ) );
							break;
						default:
							result += this.backslash( match.groups.quotes.slice( 1, match[0].length -1 ) );
							break;
					}
					index = qregex.lastIndex;
				}
				
				// Append strings.
				value = result + this.backslash( value.substring( index ) );
				
				// Check if argument value is not empty.
				if( Value.isNotEmpty( value ) )
				{
					argv.push( value );
				}
			}
			return( argv.filter( arg => Value.isNotEmpty( arg ) ) );
		},
		
		/*
		 * Parameter builder for program/command.
		 *
		 * @params Object shell
		 * @params Object args
		 *
		 * @return Object
		 */
		params: function( shell, args )
		{
			var params = {};
			
			// Check if shell has options.
			if( Type( shell.options, Object ) )
			{
				// Mapping options.
				Mapper( shell.options, function( i, name, option )
				{
					// If option is available in arguments.
					if( Not( args[name], "Undefined" ) )
					{
						params[name] = args[name];
					}
					
					// If option has alias name,
					// And if alias name is available in arguments.
					if( Type( option.alias, String ) && Not( args[option.alias], "Undefined" ) )
					{
						params[name] = args[option.alias];
					}
					else {
						
						// Check if option is require.
						if( option.require === true )
						{
							throw Fmt( "{}: {}: Option required", shell.name, name );
						}
					}
					
					// Check if option has type.
					if( Not( params[name], "Undefined" ) &&
						Not( option.type, "Undefined" ) )
					{
						if( Not( params[name], option.type ) )
						{
							throw Fmt( "{}: {}: Option must be type {}, {} given", shell.name, name, option.type.name, Type( params[name] ) );
						}
					}
				});
			}
			return( params );
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
				
				// Copy argument values.
				argv = [ ...argv ];
				
				// Remove filename from argument values.
				delete argv[0];
				
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
									val = Value.isNotEmpty( val ) ? val.trim() : null;
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
								args[key] = this.convert( val = val !== null ? val : true );
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
								
								args[key] = this.convert( Value.isEmpty( val ) ? args[key] ?? true : val );
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
			return( args );
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
				if( splits[i] !== "&&" && splits[i] !== ";" && Value.isNotEmpty( splits[i] ) )
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
						
						var regexp = /(?<!['"`])\b(?:(?<name>[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)=(?<value>\S+))\b(?<!['"`])/g;
						var single = "";
						var index = 0;
						
						while( ( match = regexp.exec( splits[i] ) ) !== null )
						{
							// Set as global variable.
							this.$vars[match.groups.name] = match.groups.value;
							
							// Append string.
							single += splits[i].substring( index, regexp.lastIndex - match[0].length );
							index = regexp.lastIndex;
							
							// ...
							if( /^[\s\t]*$/.test( single ) )
							{
								continue;
							}
							single += match[0];
						}
						single += splits[i].substring( index );
						
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
		}
	},
	mounted: function({ argument } = {})
	{
		// Save current instance.
		this.$root.built.js = this;
		
		// Normalize argument passed.
		var resolved = this.replace( argument.trim() );
		var results = [];
		
		for( let i in resolved )
		{
			var argv = this.extract( resolved[i].trim() );
			var args = this.parser( argv );
			
			if( argv.length >= 1 )
			{
				// Find command line shell.
				var shell = this.$root.commands.find( shell => shell.name === argv[0] );
				
				// If shell is available.
				if( shell )
				{
					// Checks if command name is `js`.
					if( argv[0] === "js" )
					{
						results.push( ...this.execute( argv.slice( 1 ) ) );
					}
					else {
						
						// Checks if the command has a previous instance.
						if( this.$root.built[argv[0]] )
						{
							var built = this.$root.builder( [ shell, this.$root.built[argv[0]] ], { argv, args } );
						}
						else {
							var built = this.$root.builder( shell, { argv, args } );
						}
						
						// Instantiate program/command.
						var exec = new built(
							
							// Build program/command parameters.
							this.params( shell, args )
						);
						
						// If command return outputs.
						if( Type( exec, Array ) )
						{
							results.push( exec );
						}
						else {
							this.$root.built[argv[0]] = exec;
						}
					}
				}
				else {
					throw Fmt( "{}: Command not found", argv[0] );
				}
			}
		}
		return( results );
	}
};
