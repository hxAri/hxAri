
/*
 * Text or string shortener.
 *
 * @params String string
 * @params Number max
 *
 * @return String
 *  Shorted string
 */
export default function Shorttext( string, max )
{
	// For avoid when value is not string.
	var string = String( string );
	var length = string.length;
	
	return( length >= max ? string.substring( 0, parseInt( max ) -3 ).trim() + "..." : string );
};