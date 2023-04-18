
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Theme from "/src/scripts/Theme.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "theme",
	type: "file",
	data: {
		theme: new Theme()
	},
	author: Author,
	abouts: "Change theme color",
	options: {
		c: {
			type: String,
			alias: "color",
			usage: "Set theme color",
			require: false
		},
		h: {
			type: Boolean,
			alias: "help",
			usage: "Show this help",
			require: false
		}
	},
	mounted: function({ c, h } = {})
	{
		// Throw if multiple argument passed.
		if( Type( c, String ) && h === true ) throw "theme: To many arguments";
		
		// Check if set option is available 
		if( Type( c, String ) )
		{
			// Check if set value is available.
			if( c === "dark" ||
				c === "light" )
			{
				this.theme.set( c );
			}
			else {
				throw Fmt( "theme: {}: Invalid theme color", c );
			}
		}
		
		// Display help.
		if( h === true )
		{
			return( this.$help() );
		}
		return([ Fmt( "{}={}", this.theme.get(), this.theme.theme[this.theme.get()].token ) ]);
	}
};