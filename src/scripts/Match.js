
// Importing application scripts.
import Callable from "./types/Callable.js";
import Not from "./logics/Not.js";
import Type from "./Type.js";

/*
 * Check if value is callable or function.
 *
 * @params Mixed $match
 *
 * @return Boolean
 */
const isCall = match => typeof match === "function" || Type( match, String ) && /^function/.test( match );

/*
 * Check if match case is default option.
 *
 * @params Array $cases
 *
 * @return Mixed
 */
const isDefault = cases =>
{
	for( let i in cases )
	{
		if( Type( cases[i].none, Boolean ) && cases[i].none )
		{
			return( i );
		}
	}
	return( false );
};

/*
 * Check if value is multiple match case.
 *
 * @params Mixed $match
 *
 * @return Boolean
 */
const isMultiple = match => Type( match, Object ) && Type( match.case, Array ) && Type( match.call ) !== "Undefined";

/*
 * Return match result.
 *
 * @params Mixed $match
 * @params Mixed $value
 *
 * @return Mixed
 */
const returns = ( match, value ) => isCall( value ) ? value( match ) : value;

/*
 * Match cases function.
 *
 * @params Mixed $match
 * @params Array $cases
 *
 * @return Mixed
 */
export default function Match( match, cases )
{
	// If cases value is Array type.
	if( Type( cases, Array ) )
	{
		// Get default case position.
		var post = isDefault( cases );
		
		// Mapping cases.
		for( let i in cases )
		{
			if( i !== post )
			{
				// Case has Multiple cases.
				if( Type( cases[i].case, Array ) )
				{
					// Re-mapping cases in case.
					for( let u in cases[i].case )
					{
						// If match type is equals or if match values equals with case values.
						if( Type( match, cases[i].case[u] ) || match === cases[i].case[u] )
						{
							return( Callable( cases[i].call ) );
						}
					}
				}
				
				// If match type is equals or if match values equals with case values.
				else if( Type( match, cases[i] ) || match === cases[i] )
				{
					return( Callable( cases[i].call ) );
				}
			}
		}
		
		// If match has default option.
		if( Not( post, Boolean ) )
		{
			return( Callable( cases[post].call ) );
		}
	}
};