
// Import Scripts
import Type from "/src/scripts/Type.js";

export default {
	
	/*
	 * Extract argument value into array.
	 *
	 * This function requires an instance object of the Terminal
	 * function, do apply, bind or call first to call this function.
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
		var eregexp = /(?:^|\s)(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^'"\\\s]+(?:\\.[^'"\\\s]*)*))(?=\s|$)/g;
		
		// Extract argument values.
		var extract = Array.from( argument.matchAll( eregexp ), m => m );
		var argv = [];
		console.log( extract );
		// Mapping extracted argument values.
		for( let i in extract )
		{
			var value = extract[i][0].trim();
			
			// Check if input has regular expression.
			if( sregexp.test( value ) )
			{
				try
				{
					// Get file lists.
					var ls = this.ls( value );
					
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
					this.log( "error", error );
				}
			}
			argv.push( value );
		}
		return( argv );
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
			var push = 0;
			var len = argv.length;
			
			// Remove filename from argument values.
			result.file = argv.shift();
			
			// Counting argument based on argument values length.
			for( let i=0; i < len; i++ )
			{
				// Get argument value.
				var arg = argv[i] ?? null;
				
				// Index number.
				var idx = i +1;
				
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
						var eqPost = arg.indexOf( "=" );
						
						// If argument has equal symbol.
						if( eqPost >= 0 )
						{
							var key = arg.slice( 2, eqPost -2 );
							var val = arg.slice( eqPost +1 );
						}
						else {
							
							// Get key name.
							key = arg.slice( 2 );
							
							// Index value.
							val = argv[idx] ?? null;
							
							// If argument value is not enclosed empty string.
							if( val !== "" && val !== null )
							{
								// If doesn't minus symbol.
								if( idx < len && val.length !== 0 && val[0] !== "-" )
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
						if( key !== "" )
						{
							result.argument[key] = val !== null ? val : true;
						}
					}
					
					// If argument value is short option.
					else if( arg.slice( 0, 1 ) === "-" )
					{
						// If position 2 has equal symbol.
						if( arg.slice( 2, 1 ) === "=" )
						{
							var key = arg.slice( 1, 1 );
							var val = arg.slice( 3 );
							
							result.argument[key] = val;
						}
						else {
							
							// Split arg like -xyz into Array.
							var chars = arg.slice( 1 ).split( "" );
							
							// Mapping chars.
							for( let u in chars )
							{
								result.argument[chars[u]] = result.argument[chars[u]] ?? true;
							}
							
							// -a value1 -abc value2
							if( i +1 < len && argv[( i +1 )][0] !== "-" )
							{
								result.argument[chars[u]] = argv[( i +1 )];
								i++;
							}
						}
					}
					else {
						result.argument[push++] = arg;
					}
				}
				else {
					result.argument[push++] = arg;
				}
			}
		}
		return( result );
	}
};
