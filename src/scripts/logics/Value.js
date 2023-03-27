
// Import application scripts.
import Not from "./Not.js";
import Null from "../types/Null.js";
import Type from "../Type.js";
import Undefined from "../types/Undefined.js";

/*
 * Check if value given is empty.
 *
 * @params Mixed value
 *
 * @return Boolean
 */
const isEmpty = function( value )
{
	if( Not( value, [ Undefined, Boolean, Null ] ) )
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
			return( value.length !== 0 ? ( value.match( /^([\s\t\n]*)$/ ) ? true : false ) : true );
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