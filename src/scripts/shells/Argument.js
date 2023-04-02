
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
				{ console.error( error ); }
			}
			else {
				console.info( value );
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
		
	}
};
