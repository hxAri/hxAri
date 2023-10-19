
// Import Scripts
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Request from "/src/scripts/Request.js";
import Type from "/src/scripts/Type.js";

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
				if( Type( request, Object ) )
				{
					var url = Type( request.url, String, () => request.url, () => "" );
					var method = Type( request.method, String, () => request.method, () => "GET" );
					var options = Type( request.options, Object, () => request.options, () => Object.create({}) );
				}
				else {
					var url = request;
					var method = "GET";
					var options = {};
				}
				return( await Request( method, url, options ) );
			}
		);
		return( await Promise.all( requests ) );
	}
	else {
		throw new TypeError( Fmt( "Parameter $requests must be type Array, {} given", Type( requests ) ) );
	}
};
