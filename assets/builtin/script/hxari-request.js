const $Request = async function( method, url, options = {} )
{
	return( new Promise( await function( resolve, reject )
	{
		// The constructor initializes.
		var xhr = new XMLHttpRequest();
		
		// Initializes a request.
		xhr.open( method, url );
		
		if( $Is( options.headers, Object ) )
		{
			for( let header in options.headers )
			{
				// Sets the value of an HTTP request header.
				xhr.setRequestHeader( header, options.headers[header] );
			}
		}
		
		if( $Is( options.data, Object ) )
		{
			// Data pairs.
			var data = [];
			
			for( let key in options.data )
			{
				// Encode URI Commponent.
				data.push( encodeURIComponent( key ) + "=" + encodeURIComponent( options.data[key] ) );
			}
			
			// Sends the request with data.
			xhr.send( data.join( "&" ) );
		} else {
			
			// Sends the request without data.
			xhr.send();
		}
		
		if( $Is( options.events, Object ) )
		{
			for( let i in options.events )
			{
				// Allow set events except loaded & error.
				if( i !== "loaded" && i !== "error" )
				{
					// Sets up a function that will be called whenever
					// The specified event is delivered to the target.
					xhr.addEventListener( i, ( e ) => 
					{
						var handler = options.events[i];
							
							// Call handler function.
							handler( e, xhr );
					});
				}
			}
		}
		
		// Fired when an XMLHttpRequest transaction completes successfully.
		xhr.onload = evt => resolve( xhr );
		
		// Fired when the request encountered an error.
		xhr.onerror = evt => reject( xhr );
		
	}));
};