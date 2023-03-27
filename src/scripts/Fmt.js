
// Import Scripts.
import Type from "./Type.js";

/*
 * String formater.
 *
 * @params String format
 * @params Mixed ...values
 *
 * @return String
 */
export default function Fmt( format, ...values )
{
	var i = 0;
	var match = null;
	var regex = /(?:(?<format>(?<except>\\{0,})(\{[\s\t]*((?<key>[a-zA-Z_\x80-\xff]([a-zA-Z0-9_\x80-\xff]{0,}[a-zA-Z0-9_\x80-\xff]{1})*)|(?<index>[\d]+))*[\s\t]*\})))/igms;
	
	if( Type( format, String ) )
	{
		// [0] => Matched.
		// [2] => Backslash<Exception>
		// [3] => Format<MatchedWithoutBackslash>
		// [4] => Index/Key<Matched>
		while( ( match = regex.exec( format ) ) !== null )
		{
			// If backslash character exists.
			if( Type( match[2], String ) && match[2] !== "" )
			{
				// Get backslash lenght.
				var length = match[2].length;
				
				// If the number of backslashes is one.
				if( length === 1 )
				{
					format.replaceAll( match[0], match[3] ); continue;
				}
				
				// If number of backslash is odd.
				if( length % 2 !== 0 )
				{
					format = format.replaceAll( match[0], "\\".repeat( length -1 ) + match[3] ); continue;
				}
				
				// Make backslashes as much as the amount minus two.
				match[2] = "\\".repeat( length === 2 ? length -1 : length -2 );
			}
			
			// If element 4 on array match and element 1 on array args exists.
			if( typeof match[4] !== "undefined" &&
				typeof values[0] !== "undefined" )
			{
				// If value of element 1 on array args Object type.
				if( typeof values[0] === "object" )
				{
					// Check if value is only number.
					if( /^\d+$/.test( match[4] ) )
					{
						match[4] = parseInt( match[4] );
					}
					format = format.replace( match[0], typeof values[0][match[4]] !== "undefined" ? match[2] + values[0][match[4]] : match[2] + "" ); continue;
				}
			}
			
			// Only replace by iteration.
			format = format.replace( match[0], typeof values[i] !== "undefined" ? match[2] + values[i++] : match[2] + "" );
		}
		return( format );
	}
	console.log( Type( format, String ) );
	throw new TypeError( `Argument format must be type String, ${Type( format )} given` );
};