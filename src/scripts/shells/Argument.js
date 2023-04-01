
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
		var sregexp = /(?<!\\)((?<bracket>\[(?:[^\]\\]|\\.)*\])|(?<wildcard>\*)|(?<dot>\.))/g;
		
		// Pattern for extract argument values.
		var eregexp = /(?:^|\s)(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^'"\\\s]+(?:\\.[^'"\\\s]*)*))(?=\s|$)/g;
		
		// Extract argument values.
		var extract = Array.from( argument.matchAll( eregexp ), m => m );
		var argv = [];
		
		// Get current directory contents.
		var ls = this.ls( this.pwd() );
		
		// Mapping extracted argument values.
		for( let i in extract )
		{
			// Check if input has regular expression.
			if( sregexp.test( extract[i][0] ) )
			{
				console.log( ls );
			}
			console.log( extract[i][0] );
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
