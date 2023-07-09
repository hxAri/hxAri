
// Import Scripts.
import Match from "/src/scripts/Match.js";
import Type from "/src/scripts/Type.js";

/*
 * Array, Object, and String Mapper.
 *
 * @params Array|Object|String $data
 * @params Function $call
 *
 * @return Array|Object
 */
export default function Mapper( data, call )
{
	// Starting matching.
	var results = Match( data, [
		
		/*
		 * Array|String Mapper.
		 *
		 * @params Array|String $data
		 *
		 * @return Array
		 */
		{
			case: [ Array, String ],
			call: () =>
			{
				// Collected data.
				var stack = [];
				
				// For loop as much as the amount of data.
				for( let i = 0; i < data.length; i++ )
				{
					stack[i] = call( i, data[i], data.length );
				}
				
				// Return data stack.
				return( stack );
			}
		},
		
		/*
		 * Object Mapper.
		 *
		 * @params Object $data
		 *
		 * @return Object
		 */
		{
			case: Object,
			call: () =>
			{
				// Collected data.
				var stack = {};
				
				// Get object keys and values.
				var keys = Object.keys( data );
				var vals = Object.values( data );
				
				// Repeat data until it runs out.
				for( let i in keys )
				{
					stack[keys[i]] = call( i, keys[i], vals[i], vals.length );
				}
				
				// Return data stack.
				return( stack );
			}
		}
	]);
	
	// Resolve for constructor.
	if( Type( this, [ Mapper, Object, Window ] ) )
	{
		this.data = data;
		this.callback = call;
		this.results = results;
	}
	return( results );
};