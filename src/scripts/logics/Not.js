
// Importing application scripts.
import Type from "../Type.js";

/*
 * Not is the negation of the function is/Type.
 *
 * @params Mixed argv
 * @params Function type
 * @params Function handler
 * @params Function catcher
 *
 * @return Mixed
 */
export default function Not( argv, type, handler = () => true, catcher = () => false )
{
	return( Type( argv, type, catcher, handler ) );
};