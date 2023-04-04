
// Import Scripts
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

export default {
	name: "js",
	type: "file",
	data: {
		syntax: [
			{
				pattern: /()/g
			}
		]
	},
	options: {},
	methods: {
		
		/*
		 * Extract argument value into array.
		 *
		 * @params String argument
		 *
		 * @return Array
		 */
		extract: function( argument )
		{
			// ...
		},
		
		/*
		 * Replace alias and variable names in the arguments.
		 *
		 * @params String argument
		 *
		 * @return String
		 */
		replace: function( argument )
		{
			// ...
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
			var result = {
				file: null,
				command: null,
				argument: {}
			};
			
			// Check if argument value is Array.
			if( Type( argv, Array ) )
			{
				var post = 0;
				var length = argv.length;
				
				// Remove filename from argument values.
				result.file = argv.shift();
				
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
										if( Type( result.argument[key], [ "Null", "Undefined" ] ) ) val = true;
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
								result.argument[key] = val = val !== null ? val : true;
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
								
								result.argument[key] = Value.isEmpty( val ) ? result.argument[key] ?? true: val;
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
										
										result.argument[key] = Value.isEmpty( val ) ? result.argument[key] ?? true: val;
										break;
									}
									result.argument[chars[u]] = result.argument[chars[u]] ?? true;
								}
							}
							continue;
						}
					}
					result.argument[post++] = arg;
				}
			}
			return( result );
		}
	},
	mounted: function({ argument })
	{
		alert();
	}
};