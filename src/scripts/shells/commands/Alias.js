
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Mapper from "/src/scripts/Mapper.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "alias",
	type: "binary",
	author: Author,
	abouts: "Define terminal command alias name",
	options: {
		h: {
			type: Boolean,
			alias: "help",
			usage: "Show this help",
			require: false
		},
		p: {
			type: Boolean,
			alias: "print",
			usage: "Print all defined aliases",
			require: false
		}
	},
	data: {
		regexp: /^(?<define>(?<name>[a-zA-Z_\x7f-\xff][a-zA-Z0-9-_\x7f-\xff]*)\=(?<value>[^\n]*))/
	},
	methods: {
		
		/*
		 * Print all defined aliases.
		 *
		 * @return Array
		 */
		print: function()
		{
			return( Object.values( Mapper( this.$name, ( i, name, value ) => Fmt( "{}='{}'", name, value.replace( /(?!\\)\'/g, "\\\'" ) ) ) ) );
		}
	},
	mounted: function({ h, p })
	{
		// Throw if multiple argument passed.
		if( h === true && p === true ) throw "alias: To many arguments";
		
		// Display help.
		if( h === true ) return( this.$help() );
		
		// Print alias by name.
		if( p === true )
		{
			return( this.print() );
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
				// Match alias syntax.
				var match = this.regexp.exec( vals[i] );
				
				// If alias syntax is invalid.
				if( match === null )
				{
					// Check if alias is exists.
					if( this.$name[vals[i]] )
					{
						outs.push( Fmt( "{}='{}'", vals[i], this.$name[vals[i]].replace( /(?!\\)\'/g, "\\\'" ) ) );
					}
					else {
						outs.push( Fmt( "{}: alias: {}: Not found", this.$root.shell, vals[i] ) );
					}
					continue;
				}
				
				// Set or replace alias.
				this.$name[match.groups.name] = match.groups.value ?? "\"\""; iter++;
			}
		}
		return( iter >= 1 ? outs : ( outs.length >= 1 ? outs : this.print() ) );
	}
};