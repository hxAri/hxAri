
// Importing application scripts.
import Callable from "/src/scripts/types/Callable.js";
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";

/**
 * Check if value is callable or function.
 *
 * @params Mixed $match
 *
 * @return Boolean
 */
const isCall = match => typeof match === "function" || Type( match, String ) && /^function/.test( match );

/**
 * Check if match case is default option.
 *
 * @params Array $cases
 *
 * @return Mixed
 */
const isDefault = cases => {
	for( let i in cases ) {
		if( Type( cases[i].none, Boolean ) && cases[i].none ) {
			return i;
		}
	}
	return false;
};

/**
 * Check if value is multiple match case.
 *
 * @params Mixed $match
 *
 * @return Boolean
 */
const isMultiple = match => Type( match, Object ) && Type( match.case, Array ) && Type( match.call ) !== "Undefined";

/**
 * Return match result.
 *
 * @params Mixed $match
 * @params Mixed $value
 *
 * @return Mixed
 */
const returns = ( match, value ) => isCall( value ) ? value( match ) : value;

/**
 * Match cases function.
 *
 * @params Mixed $match
 * @params Array $cases
 *
 * @return Mixed
 */
export default function Match( match, cases ) {
	if( Type( cases, Array ) ) {
		var post = isDefault( cases );
		for( let i in cases ) {
			if( i !== post ) {
				if( Type( cases[i].case, Array ) ) {
					for( let u in cases[i].case ) {
						if( Type( match, cases[i].case[u] ) || match === cases[i].case[u] ) {
							return Callable( cases[i].call );
						}
					}
				}
				else if( Type( match, cases[i].case ) || match === cases[i].case ) {
					return Callable( cases[i].call );
				}
			}
		}
		if( Not( post, Boolean ) ) {
			return Callable( cases[post].call );
		}
	}
};