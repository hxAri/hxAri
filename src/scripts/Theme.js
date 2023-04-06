
// Import application scripts.
import Cookie from "./Cookie.js";
import Null from "./types/Null.js";
import Type from "./Type.js";

/*
 * Theme utility
 *
 * Preference themes that support
 * detection of theme colors on the device.
 *
 * @version 1.0.8
 */
const Theme = function({ set } = {})
{
	this.theme = {
		dark: {
			color: "#202521",
			token: "7a51da870ccc24c22518717d3cf56d29"
		},
		light: {
			color: "#eeeeee",
			token: "73fe8a55fee50b1e4b81af2e2446ea04"
		}
	};
	try
	{
		var self = this;
		var color = set;
			color = Type( color, "Undefined", () => self.get(), () => color );
		
		self.set( color );
	}
	catch( error )
	{
		console.warn( `Theme:\x20${error}` );
	}
};

/*
 * Theme alias name.
 *
 * @values String
 */
Theme.prototype.name = "dGhlbWU";

/*
 * Theme contructor results.
 *
 * @value Mixed
 */
Theme.prototype.result = null;

/*
 * Theme default color.
 *
 * @values String
 */
Theme.prototype.default = "light";

/*
 * Get current theme token.
 *
 * @return String
 */
Theme.prototype.get = function()
{
	try
	{
		// Get current theme color from cookie.
		var token = Cookie.prototype.get( this.name );
		
		// If token value is String type.
		if( Type( token, String ) )
		{
			// If token value equals with dark.
			if( token === this.theme.dark.token )
			{
				return( "dark" );
			}
		}
		else {
			
			// If device supported dark mode.
			if( window.matchMedia )
			{
				// Check if dark.mode is activated.
				if( window.matchMedia( "(prefers-color-scheme:dark)" ).matches )
				{
					return( "dark" );
				}
			}
		}
	}
	catch( error )
	{
		console.warn( `Theme.prototype.get:\x20${error}` );
	}
	return( "light" );
};

/*
 * Set theme color.
 *
 * @params String color
 *
 * @return Void
 */
Theme.prototype.set = function( color )
{
	try
	{
		// Get token value from cookie.
		var cookie = Cookie.prototype.get( this.name );
		var defaultColor = this.default;
		
		// Normalize color.
		color = Type( color, String, () => color, () => defaultColor );
		
		// If current cookie value does not equals.
		if( cookie !== this.theme[color].token )
		{
			Cookie.prototype.set( ...[
				this.name,
				this.theme[color].token, {
					path: "/",
					expires: 30
				}
			]);
		}
		this.setHtml( color );
		this.setMeta( color );
	}
	catch( error )
	{
		console.warn( `Theme.prototype.set:\x20${error}` );
	}
};

/*
 * Set theme color to HTMLHeadElement.
 *
 * @params String color
 *
 * @return Void
 */
Theme.prototype.setHtml = color => document.documentElement.dataset.theme = color;

/*
 * Set theme color to HTMLMetaElement.
 *
 * @params String color
 *
 * @return Void
 */
Theme.prototype.setMeta = function( color )
{
	var meta = null;
	
	// Check if HTMLMetaElement has been created.
	if( Type( meta = document.querySelector( "meta[name=\"theme-color\"]" ), Null ) )
	{
		// Create new HTMLMetaElement.
		meta = document.createElement( "meta" );
		
		// Set meta attribute.
		meta.setAttribute( "name", "theme-color" );
		
		// Append HTMLMetaElement to HTMLHeadElement.
		document.head.appendChild( meta );
	}
	
	// Set meta attribute content value.
	meta.setAttribute( "content", this.theme[color].color );
};

export default Theme;