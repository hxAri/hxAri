
// Import Scripts.
import Fmt from "/src/scripts/Fmt.js";
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

/*
 * Cookie utility
 *
 * A utility that provides various APIs for managing cookies.
 *
 * @params Array set
 * @params String del
 */
const Cookie = function( set, del )
{
	// Clone self.
	var self = this;
	
	if( Type( document, "Undefined" ) )
	{
		throw new TypeError( "Object Document is not defined." );
	}
	
	// Set cookies.
	if( Type( set, Array ) )
	{
		self.set.apply( self, set );
	}
	
	// Delete cookies.
	if( Type( del, Array ) )
	{
		del.forEach( cookie =>
		{
			self.del( cookie );
		});
	}
	
	// Load all available cookies.
	this.load();
};

/*
 * Get cookie value.
 *
 * @params String name
 *
 * @return String|False
 */
Cookie.prototype.get = function( name )
{
	if( Type( name, String ) )
	{
		if( Value.isNotEmpty( document.cookie ) )
		{
			// Parse cookies.
			var result = document.cookie.split( ";" ).find( r => r.replace( /\s/g, "" ).startsWith( encodeURIComponent( name ) + "=" ) );
			
			// If cookie is available.
			if( Not( result, "Undefined" ) )
			{
				// Return cookie values.
				return( decodeURIComponent( result.split( "=" )[1] ) );
			}
		}
		return( false );
	}
	throw new TypeError( "Invalid cookie name." );
};

/*
 * Load all the cookies that have been set.
 *
 * @return Object
 */
Cookie.prototype.load = function()
{
	// Clone self.
	var self = this;
		self.loaded = {};
	
	// Explode all cookies.
	document.cookie.split( ";" ).map( part =>
	{
		// Set cookie orders.
		self.loaded[decodeURIComponent( part.split( "=" )[0].replace( /\s/g, "" ) )] = decodeURIComponent( part.split( "=" )[1] );
	});
	return( self.loaded );
};

/*
 * List of cookies that have been set.
 *
 * @values Object
 */
Cookie.prototype.loaded = {};

/*
 * Set one or more than one cookie.
 *
 * @params String name
 * @params String value
 * @params Object options
 *
 * @return String
 */
Cookie.prototype.set = function( name, value, { comment, domain, expires, maxage, httponly, path = "/", samesite, secure, version = "4.1.6" } = {} )
{
	// Clone self.
	var self = this;
	
	// If cookies are multiple, all
	// arguments will be ignored except name.
	if( Type( name, Array ) )
	{
		// Set cookies by order.
		name.forEach( group =>
		{
			// If the group values do not match.
			if( Type( group ) !== "Array" )
			{
				throw new TypeError( Fmt( "Multiple cookie group value must be type Object, \"{}\" given.", Type( group ) ) );
			}
			self.set.apply( self, group );
		});
		
	}
	else {
		
		// If name is String type.
		if( Type( name, String ) )
		{
			// Raw Cookie Header.
			var header = "";
			
			// Check if the cookie name is valid.
			if( /^(?:([a-z\_])([a-z0-9\_]*))$/i.test( name ) )
			{
				if( Type( value, String ) )
				{
					header = Fmt( "{}={}", encodeURIComponent( name ), encodeURIComponent( value ) );
				}
				else {
					header = Fmt( "{}=None", encodeURIComponent( name ) );
					expires = -1;
				}
			}
			else {
				throw new TypeError( "Invalid cookie name." );
			}
			
			// If the cookie has a comment.
			if( Type( comment, String ) )
			{
				header += Fmt( "; Comment=\"{}\"", comment );
			}
			
			// If the cookie has a domain name.
			if( Type( domain, String ) )
			{
				header += Fmt( "; Domain={}", domain );
			}
			
			// If the cookie has an expiration date.
			if( Type( expires, Number ) )
			{
				// Parse date to UTCString.
				header += Fmt( "; expires={}", new Date( Date.now() + expires * 864e5 ).toUTCString() );
			}
			
			// If the cookie is read only the server.
			if( Type( httponly, Boolean ) )
			{
				header += httponly ? "; HttpOnly" : "";
			}
			
			// ....
			if( Type( maxage, Number ) )
			{
				header += Fmt( "; Max-Age={}", maxage );
			}
			
			// If cookies are only set in certain locations.
			if( Type( path, String ) )
			{
				// If the location path name is valid.
				if( /(?:^(\/\w+){0,}\/?)$/g.test( path ) )
				{
					header += Fmt( "; Path={}", path );;
				}
				else {
					throw new TypeError( "Invalid path name." );
				}
			}
			
			if( Type( samesite, String ) )
			{
				switch( samesite )
				{
					case "Lax":
						header += "; SameSite=Lax"; break;
					case "None":
						header += "; SameSite=None"; break;
					case "Strict":
						header += "; SameSite=Strict"; break;
					default:
						throw new TypeError( "Invalid cookie SameSite." );
				}
			}
			
			// Otherwise the cookie is only sent
			// to the server when a request is made.
			if( Type( secure, Boolean ) )
			{
				header += secure ? "; Secure" : "";
			}
			
			// If cookie has a version.
			if( Type( version, String ) )
			{
				header += Fmt( "; Version={}", version );
			}
			
			// Set cookie header.
			document.cookie = header;
			
			// Load all available cookies.
			this.load();
			
			// Returns the cookie's raw header value.
			return( Fmt( "Set-Cookie: {}", header ) );
		}
		else {
			throw new TypeError( "Cookie name cannot be empty or null." );
		}
	}
};

export default Cookie;