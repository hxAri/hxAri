
// Import application scripts.
import Type from "/src/scripts/Type.js";

/*
 * Mixed is PHP's default data type but
 * now I've created it in JavaScript Wkwkwk.
 *
 * @params Mixed value
 *
 * @return Mixed
 */
export default function Mixed( value = false ) {
	
	/* Set the value as well as the value type to avoid
	 * returning errors if the function is called using
	 * the constructor.
	 */
	this.value = value;
	this.type = Type( this.value );
	
	// Return value.
	return( value );
};