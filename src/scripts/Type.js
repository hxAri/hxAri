
// Import Scripts.
import { registerRuntimeCompiler } from "vue";
import Callable from "/src/scripts/types/Callable.js";

/*
 * Get value type.
 *
 * @params Mixed argv
 * @params Function|Array<Function> type
 *  The array of function identified if value type is optional
 * @params Function handler
 * @params Function catcher
 *
 * @return Mixed
 */
export default function Type( argv, type, handler, catcher ) {
	
	// // Get name type of type.
	var typeName = typeof type;
	var typeObjectName = Object.prototype.toString.call( type ).replace( /\[object\s*(.*?)\]/, `$1` );
	
	// // Get name type of argument value.
	var argvTypeName = typeof argv === "function" ? ( argv.name !== "" ? argv.name : "Window" ) : Object.prototype.toString.call( argv ).replace( /\[object\s*(.*?)\]/, `$1` );
	
	// // Callbacks.
	var callbackHandler = () => typeof handler === "function" ? handler( argv, type ) : true;
	var callbackCatcher = () => typeof catcher === "function" ? catcher( argv, type ) : false;
	
	if( typeName !== "undefined" ) {
		if( typeName === "function" ) {
			var functionTypeName = type.name;
				functionTypeName = functionTypeName === "" ? "Window" : functionTypeName;
			if( functionTypeName === argvTypeName ) {
				return callbackHandler();
			}
			return callbackCatcher();
		}
		if( typeName === "object" ) {
			if( typeObjectName === "Array" ) {
				for( let i in type ) {
					if( Type( argv, type[i] ) ) {
						return callbackHandler();
					}
				}
				return callbackCatcher();
			}
			if( typeObjectName === argvTypeName ) {
				return callbackHandler();
			}
			return callbackCatcher();
		}
		if( typeName === "string" ) {
			if( type === argvTypeName ) {
				return callbackHandler();
			}
		}
		return callbackCatcher()
	}
	return argvTypeName;
};