
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "unalias",
	type: "binary",
	data: {
		hidden: /^(?<naming>(?<c>\x63\x68\x69\x6e\x74\x79\x61)|(?<l>\x6c\x69\x61\x6e\x61))$/i
	},
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
	mounted: function({ a, h }) {
		if( h === true && a === true ) {
			throw new Error( "unalias: To many arguments" );
		}
		if( h === true ) {
			return this.$help();
		}
		if( a === true ) {
			var keys = Object.keys( this.$name );
			for( let i in keys ) {
				delete this.$name[keys[i]];
			}
			return;
		}
		var keys = Object.keys( this.$args );
		var vals = Object.values( this.$args );
		var outs = [];
		let iter = 0;
		
		for( let i in keys ) {
		
			// If argument is position argument,
			// And if argument value is String.
			if( keys[i].match( /^\d+$/i ) && Type( vals[i], String ) ) {
				if( Type( this.$name[vals[i]], String ) ) {
					if( this.hidden.test( vals[i] ) ) {
						iter++;
						continue;
					}
					delete this.$name[vals[i]];
					iter++;
				}
				else {
					outs.push( Fmt( "{}: unalias: {}: Not found", this.$root.shell, vals[i] ) );
				}
			}
		}
		return iter >= 1 ? outs : ( outs.length >= 1 ? outs : this.$help() );
	}
};