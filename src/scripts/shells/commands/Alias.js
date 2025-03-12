
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
		hidden: /^(?<naming>(?<c>\x63\x68\x69\x6e\x74\x79\x61)|(?<l>\x6c\x69\x61\x6e\x61))$/i,
		regexp: /^(?<define>(?<name>[a-zA-Z_\x7f-\xff][a-zA-Z0-9-_\x7f-\xff]*)\=(?<value>[^\n]*))/
	},
	methods: {
		
		/**
		 * Return all defined aliases.
		 *
		 * @return Array
		 */
		prints: function() {
			var aliases = {};
			try {
				for( let keyset of Object.keys( this.$name ) ) {
					if( this.hidden.test( keyset ) ) {
						continue;
					}
					aliases[keyset] = this.$name[keyset];
				}
			}
			catch( e ) {
				console.log( e )
			}
			return Object.values(
				Mapper( aliases, function( i, name, value ) {
					console.log( arguments );
					return Fmt( "{}='{}'", name, value.replace( /(?!\\)\'/g, "\\\'" ) );
				})
			);
		}
	},
	mounted: function({ h, p }) {
		
		if( h === true && p === true ) {
			throw new Error( "alias: To many arguments" );
		}
		if( h === true ) {
			return this.$help();
		}
		if( p === true ) {
			return {
				stdout: this.prints()
			};
		}
		
		var outputs = [];
		var defined = 0;
		var self = this;
		
		Mapper( self.$args, function( index, keyset, value ) {
			if( keyset.match( /^\d+$/i ) && Type( value, String ) ) {
				var match = self.regexp.exec( value );
				if( match === null ) {
					if( self.$name[value] ) {
						if( self.hidden.test( value ) === false ) {
							outputs.push( Fmt( "{}=\"{}\"", value, self.$name[value].replace( /(?!\\)\"/g, "\\\"" ) ) );
						}
					}
					else {
						outputs.push( Fmt( "alias: {}: Not found", value ) );
					}
				}
				else {
					if( self.hidden.test( match.groups.name ) === false ) {
						self.$name[match.groups.name] = match.groups.value ?? "\"\"";
					}
					defined++;
				}
			}
		});
		
		return {
			stdout: defined >= 1 ? outputs : ( outputs.length >= 1 ? outputs : this.prints() )
		};
	}
};