
// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";

/**
 * Return array diffecene values.
 * 
 * @params Array<Mixed> source
 * @params Array<Mixed> target
 * 
 * @return Array<Mixed>
 */
export default function( source, target ) {
	if( Not( source, Array ) ) {
		throw new Error( Fmt( "Invalid \"source\" parameter, value type must be Array, {} passed", Type( source ) ) );
	}
	if( Not( target, Array ) ) {
		throw new Error( Fmt( "Invalid \"target\" parameter, value type must be Array, {} passed", Type( target ) ) );
	}
	return source.filter( function( value ) {
		return target.indexOf( value ) <= -1;
	});
};