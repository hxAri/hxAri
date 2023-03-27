
// Import Scripts
import Type from "./Type.js";

/*
 * Choice
 *
 * Return a random pick from an Array or Object.
 *
 * @params Array|Object $values
 *
 * @throws TypeError
 *
 * @return Mixed
 */
export default function Choice( values )
{
	// Check if values is Array type.
	if( Type( values, Array ) )
	{
		// Check if array values is not empty.
		if( values.length > 0 )
		{
			return( values[Math.floor( Math.random() * values.length )] );
		}
		throw new TypeError( "Cannot return value from an empty array" );
	}
	return( Choice( Object.values( values ) ) );
};