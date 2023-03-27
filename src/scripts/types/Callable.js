
/*
 * Callable is a function for callbacks so the program doesn't
 * have to write code over and over just to check if it's a
 * function and it also supports passed parameters.
 *
 * @params Mixed kwargs
 *
 * @return Mixed
 */
export default function Callable( ...kwargs )
{
	// Check if function has argument passed.
	if( kwargs.length > 0 )
	{
		// Check if first argument passed is Function type.
		if( typeof kwargs[0] === "function" )
		{
			// Get function passed.
			var func = kwargs[0];
			
			// Unset function from argument passed.
			delete kwargs[0];
			
			// Return callback function.
			return( func( ...kwargs ) );
		}
		return( kwargs[0] );
	}
};