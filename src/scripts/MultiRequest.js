
// Import Scripts
import Fmt from "./Fmt.js";
import Mapper from "./Mapper.js";
import Request from "./Request.js";
import Type from "./Type.js";

/*
 * Send multiple requests.
 *
 * @params Array requests
 *
 * @return Promise
 *
 * @throws TypeError
 */
export default async function MultiRequest( requests )
{
	if( Type( requests, Array ) )
	{
		// Mapping all requests.
		requests = Mapper( requests,
			
			/*
			 * Handle mapping.
			 *
			 * @params Number i
			 * @params Object request
			 *
			 * @return Void
			 */
			async function( i, request )
			{
				var url = Type( request.url, String, () => request.url, () => "" );
				var method = Type( request.method, String, () => request.method, () => "GET" );
				var options = Type( request.options, Object, () => request.options, () => Object.create({}) );
				
				return( await Request( method, url, options ) );
			}
		);
		return( await Promise.all( requests ) );
	}
	else {
		throw new TypeError( Fmt( "Parameter $requests must be type Array, {} given", Type( requests ) ) );
	}
};
