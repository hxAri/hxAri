
// Import Scripts
import Type from "/src/scripts/Type.js";

/**
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
export default function Choice( values ) {
	if( Type( values, Array ) ) {
		if( values.length > 0 ) {
			return values[Math.floor( Math.random() * values.length )];
		}
		throw new TypeError( "Cannot return value from an empty array" );
	}
	return Choice( Object.values( values ) );
};