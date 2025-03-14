
// Import Scripts.
import Value from "/src/scripts/logics/Value.js";
import Not from "/src/scripts/logics/Not.js"
import Type from "/src/scripts/Type.js";

/**
 * Request
 *
 * Send asynchronous requests using XMLHttpRequest.
 *
 * @params String method
 * @params String url
 * @params Object options
 *
 * @return Promise
 */
const Request = async function( method, url, options = {} ) {
	return new Promise( await function( resolve, reject ) {
		
		// The constructor initializes.
		var xhr = new XMLHttpRequest();
		
		// Initializes a request.
		xhr.open( method, url );
		
		// If headers is Object type.
		if( Type( options.headers, Object ) ) {
			for( let header in options.headers ) {
				xhr.setRequestHeader( header, options.headers[header] );
			}
		}
		
		// If data is Object type.
		if( Type( options.data, Object ) ) {
			var data = [];
			for( let key in options.data ) {
				data.push( encodeURIComponent( key ) + "=" + encodeURIComponent( options.data[key] ) );
			}
			xhr.send( data.join( "&" ) );
		}
		else if( Type( options.data, FormData ) ) {
			xhr.send( options.data );
		}
		else {
			xhr.send();
		}
		
		// If request has events.
		if( Type( options.events, Object ) ) {
			for( let i in options.events ) {
				
				// Allow set events except loaded & error.
				if( i !== "loaded" && i !== "error" ) {
					
					// Sets up a function that will be called whenever
					// The specified event is delivered to the target.
					xhr.addEventListener( i, ( e ) => Callable( options.events[i], e, xhr ) );
				}
			}
		}
		
		// Fired when an XMLHttpRequest transaction completes successfully.
		xhr.onload = evt => {
			
			// If request is failed.
			if( xhr.status !== 200 ) {
				var message = null;
				try {
					
					// Trying to parse json response.
					// This only works if response is json type.
					var resp = xhr.response;
						resp = `${resp}`;
						resp = Json.decode( resp );
					
					// Check if response has message.
					if( Type( resp.message, String ) && Value.isNotEmpty( resp.message ) ) {
						message = resp.message;
					}
				}
				catch( e ) {
				}
				return reject( new Error( message ? message : Request.StatusText( xhr.status ) ), xhr );
			}
			return resolve( xhr );
		};
		
		// Fired when the request encountered an error.
		xhr.onerror = evt => reject( "Connection Error", xhr );
	});
};

/**
 * Returns the status text for a given HTTP status code.
 *
 * @params Number statusCode
 *  The HTTP status code to get the text for.
 *
 * @return String
 *  The corresponding status text for the given status code.
 */
Request.StatusText = function( statusCode ) {
	switch( statusCode ) {
		case 100:
			return "Continue";
		case 101:
			return "Switching Protocols";
		case 200:
			return "OK";
		case 201:
			return "Created";
		case 202:
			return "Accepted";
		case 204:
			return "No Content";
		case 300:
			return "Multiple Choices";
		case 301:
			return "Moved Permanently";
		case 302:
			return "Found";
		case 304:
			return "Not Modified";
		case 400:
			return "Bad Request";
		case 401:
			return "Unauthorized";
		case 403:
			return "Forbidden";
		case 404:
			return "Not Found";
		case 405:
			return "Method Not Allowed";
		case 500:
			return "Internal Server Error";
		case 501:
			return "Not Implemented";
		case 503:
			return "Service Unavailable";
		default:
			return "Unknown Status";
	}
}

/**
 * Header normalization.
 *
 * @params Array|String raw
 */
Request.Header = function( raw ) {
	
	// Copy object instance.
	var self = this;
		self.name = [];
		self.value = null;
	
	// Check if the raw header has not been split.
	if( Type( raw, String ) ) {
		raw = raw.split( ":\x20" );
	}
	
	// Normalization of header names.
	raw[0].split( "-" ).forEach( word => self.name.push( word.charAt( 0 ).toUpperCase() + word.slice( 1 ) ) );
	
	// Set header name.
	self.name = self.name.join( "" );
	
	// Set header value.
	self.value = decodeURIComponent( raw[1] );
};

/**
 * Response Content Type.
 *
 * @params Array|String content
 */
Request.ContentType = function( content ) {
	
	// Check if the raw is not undefined type.
	if( Not( content, "Undefined" ) ) {
		
		// Check if the raw type has not been split.
		if( Type( content, String ) ) {
			
			// Separate content type with charset.
			content = content.split( "; " );
		}
		
		// If response content type has charset.
		if( Type( content[1], String ) ) this.charset = content[1].split( "=" )[1];
		
		// Mapping content types.
		switch( content[0] ) {
			case "application/json": this.type = "json"; break;
			case "application/xml": this.type = "xml"; break;
			case "text/javascript": this.type = "js"; break;
			case "text/html": this.type = "html"; break;
			case "text/css": this.type = "css"; break;
			default: this.type = content[0]; break;
		}
	}
};

export default Request;