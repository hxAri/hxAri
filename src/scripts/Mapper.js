
// Import Scripts.
import { readonly } from "vue";
import Match from "/src/scripts/Match.js";
import Type from "/src/scripts/Type.js";

/**
 * Array, Object, and String Mapper.
 *
 * @param {Array<T>|Map<K,T>|String} data
 * @param {Function} call
 *
 * @return {Array<T>|Map<K,T>}
 */
export default function Mapper( data, call ) {
	
	var results = Match( data, [
		
		/**
		 * Array|String Mapper.
		 *
		 * @param {Array<T>|String} data
		 *
		 * @return {Array<T>}
		 */
		{
			case: [ Array, String ],
			call: () => {
				
				// Collected data.
				var stack = [];
				
				// For loop as much as the amount of data.
				for( let i = 0; i < data.length; i++ ) {
					stack[i] = call( i, data[i], data.length );
				}
				return stack;
			}
		},
		
		/**
		 * Object Mapper.
		 *
		 * @param {Map<K,T>} data
		 *
		 * @return {Map<K,T>}
		 */
		{
			case: Object,
			call: () => {
				
				// Collected data.
				var stack = {};
				
				// Get object keys and values.
				var keys = Object.keys( data );
				var vals = Object.values( data );
				
				// Repeat data until it runs out.
				for( let i in keys ) {
					stack[keys[i]] = call( i, keys[i], vals[i], vals.length );
				}
				return stack;
			}
		}
	]);
	if( Type( this, [ Mapper, Object, Window ] ) ) {
		this.data = data;
		this.callback = call;
		this.results = results;
	}
	return results;
};
