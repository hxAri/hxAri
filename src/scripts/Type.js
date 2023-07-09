
// Import Scripts.
import Callable from "/src/scripts/types/Callable.js";

/*
 * Get value type.
 *
 * @params Mixed argv
 * @params Function type
 * @params Function handler
 * @params Function catcher
 *
 * @return Mixed
 */
export default function Type( argv, type, handler, catcher )
{
	// Get name type of type.
	var typeName = typeof type;
	
	// Get name type of argument value.
	var argvName = typeof argv === "function" ? ( argv.name !== "" ? argv.name : "Window" ) : Object.prototype.toString.call( argv ).replace( /\[object\s*(.*?)\]/, `$1` );
	
	// Callbacks.
	var callbackHandler = () => typeof handler === "function" ? handler() : true;
	var callbackCatcher = () => typeof catcher === "function" ? catcher() : false;
	
	// If `type` is Function type.
	if( typeName === "function" )
	{
		// Get function name.
		var funcName = type.name !== "" ? type.name : "Window";
		
		// If `argv` is equal Function name.
		return( Callable( argvName === funcName ? callbackHandler : callbackCatcher, argv ) );
	}
	
	// If `type` is Object type.
	else if( typeName === "object" )
	{
		// Get object name.
		var objName = Object.prototype.toString.call( type ).replace( /\[object\s*(.*?)\]/, `$1` );
		
		// If object type is Array.
		if( objName === "Array" )
		{
			for( let i in type )
			{
				// If `argv` is equals `type[i]`.
				if( Type( argv, type[i] ) )
				{
					return( Callable( callbackHandler, argv ) );
				}
			}
		}
		return( Callable( argvName === objName ? callbackHandler : callbackCatcher, argv ) );
	}
	
	// If `object` is String type.
	else if( typeName === "string" )
	{
		// If `argv` is equal String value.
		return( Callable( argvName === type ? callbackHandler : callbackCatcher, argv ) );
	}
	return( argvName );
};