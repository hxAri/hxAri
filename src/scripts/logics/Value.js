
// Import application scripts.
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";

/*
 * Check if value given is empty.
 *
 * @params Mixed value
 *
 * @return Boolean
 */
const isEmpty = function( value )
{
	if( Not( value, [ "Undefined", Boolean, "Null" ] ) )
	{
		if( Type( value, Array ) )
		{
			return( value.length === 0 );
		}
		if( Type( value, Object ) )
		{
			return( Object.keys( value ).length === 0 );
		}
		if( Type( value, String ) )
		{
			return( value.length !== 0 ? value.trim().length === 0 : true );
		}
		return( false );
	}
	return( true );
};

/*
 * Check if value given is not empty.
 *
 * @params Mixed value
 *
 * @return Boolean
 */
const isNotEmpty = value => isEmpty( value ) === false;

export default {
	isEmpty,
	isNotEmpty
};