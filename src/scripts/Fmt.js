
// Import Scripts
import Type from "/src/scripts/Type.js";

/**
 * String formater.
 *
 * @params String format
 * @params Mixed ...values
 *
 * @return String
 */
export default function Fmt( format, ...values ) {

	var i = 0;
	var index = 0;
	var match = null;
	var slash = "";
	var result = "";
	var regexp = /(?:(?<except>\\{0,})(?<format>(\{[\s\t]*((?<key>[a-zA-Z_\x80-\xff]([a-zA-Z0-9_\x80-\xff]{0,}[a-zA-Z0-9_\x80-\xff]{1})*)|(?<index>[\d]+))*[\s\t]*\})))/igms;
	
	// If format value is String type.
	if( Type( format, String ) ) {
		while( ( match = regexp.exec( format ) ) !== null ) {
			
			slash = "";
			result += format.substring( index, regexp.lastIndex - match[0].length );
			index = regexp.lastIndex;
			
			// If backslash character exists.
			if( Type( match.groups.backslash, String ) ) {
				
				// Get backslash length.
				var length = length = match.groups.backslash.length;
				
				// If the number of backslashes is more than one.
				if( length !== 1 ) {
					
					// If number of backslash is odd.
					if( length % 2 !== 0 ) {
						result += "\\".repeat( length -1 );
						result += match.groups.format;
						continue;
					}
					
					// Make backslashes as much as the amount minus two.
					slash = "\\".repeat( length === 2 ? length -1 : length -2 );
				}
				else {
					result += match.groups.format;
					continue;
				}
			}
			
			// Append backslash characters.
			result += slash;
			
			// If Index or Key is exists in groups.
			if( Type( match.groups.key, String ) || Type( match.groups.index, String ) ) {
				
					// If format by key name.
				if( Type( match.groups.key, String ) ) {
					// If value of element 1 on array args Object type.
					if( Type( values[0], Object ) ) {
						result += values[0][match.groups.key] ?? "";
					}
				}
				else {
					result += values[match.groups.index] ?? "";
				}
				continue;
			}
			
			// Get value by index iteration.
			result += values[i++] ?? "";
		}
		return result + format.substring( index );
	}
	throw new TypeError( `Argument format must be type String, ${Type( format )} given` );
};