
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "unalias",
	type: "file",
	author: Author,
	abouts: "Remove terminal command alias",
	options: {
		a: {
			type: Boolean,
			alias: "all",
			usage: "Remove all defined aliases",
			require: false
		},
		h: {
			type: Boolean,
			alias: "help",
			usage: "Show this help",
			require: false
		}
	},
	mounted: function({ a, h })
	{
		// Throw if multiple argument passed.
		if( h === true && a === true ) throw "unalias: To many arguments";
		
		// Display help.
		if( h === true ) return( this.$help() );
		
		// Remove all aliases.
		if( a === true )
		{
			// Get all alias names.
			var keys = Object.keys( this.$name );
			
			// Mapping alias names.
			for( let i in keys )
			{
				delete this.$name[keys[i]];
			}
			return;
		}
		
		var keys = Object.keys( this.$args );
		var vals = Object.values( this.$args );
		var outs = [];
		let iter = 0;
		
		// Mapping arguments.
		for( let i in keys )
		{
			// If argument is position argument,
			// And if argument value is String.
			if( keys[i].match( /^\d+$/i ) && Type( vals[i], String ) )
			{
				// If alias name is exists.
				if( Type( this.$name[vals[i]], String ) )
				{
					delete this.$name[vals[i]];
					iter++;
				}
				else {
					outs.push( Fmt( "{}: unalias: {}: Not found", this.$root.shell, vals[i] ) );
				}
			}
		}
		return( iter >= 1 ? outs : ( outs.length >= 1 ? outs : this.$help() ) );
	}
};