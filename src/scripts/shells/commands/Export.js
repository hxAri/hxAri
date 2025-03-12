
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Not from "/src/scripts/logics/Not.js";
import Type from "/src/scripts/Type.js";
import Value from "/src/scripts/logics/Value.js";

export default {
	name: "export",
	type: "binary",
	author: Author,
	abouts: "Command for create environment variable",
	options: {
		f: {
			type: Boolean,
			help: "Function",
			require: false
		},
		n: {
			type: Boolean,
			help: "Unset environment variable",
			require: false
		},
		h: {
			type: Boolean,
			alias: "help",
			usage: "Display this help",
			require: false
		}
	},
	methods: {
		
		/**
		 * Return all defined environment variables.
		 * 
		 * @return Array<String>
		 */
		prints: function() {
			var self = this;
			return Object
				.keys( self.$envs )
				.map( function( keyset ) {
					var value = self.$envs[keyset];
					if( [ "PS1", "ROOT" ].indexOf( keyset ) >= 0 ) {
						return;
					}
					if( Not( value, String ) ) {
						switch( keyset ) {
							case "PWD":
								value = value.path.replace( self.$envs.ROOT, "" );
								break;
						}
					}
					return Fmt( "declare -X {}=\"{}\"", keyset, value ).replaceAll( /\\/g, "\\\\" );
				})
				.filter( value => Type( value, String ) );
		},
		
		/**
		 * Environment variable setter.
		 * 
		 * @params String passed
		 * 
		 * @return Void
		 */
		setter: function( passed ) {
			var explode = passed.split( "\x3d" );
			var keyset = explode[0];
			var value = explode
				.slice( 1 )
				.join( "\x3d" );
			if( [ "PS1", "PWD", "ROOT" ].indexOf( keyset ) <= -1 ) {
				this.$envs[keyset] = value;
			}
		}
		
	},
	mounted: function({ f, n, h } = {}) {
		var self = this;
		var working = false;
		var argument = self.$argv.slice( 1 );
		if( f && h && n ) {
			throw new Error( "export: to many arguments" );
		}
		else if( f ) {
			working = true;
			argument.slice( 1 ).map( argument => self.setter( argument ) );
		}
		else if( n ) {
			working = true;
			argument.slice( 1 ).map( function( keyset ) {
				if( Type( self.$envs[keyset], String ) ) {
					if( [ "PS1", "PWD" ].indexOf( keyset ) <= -1 ) {
						delete self.$envs[keyset];
					}
				}
			});
		}
		else if( h ) {
			return self.$help();
		}
		else {
			if( Value.isNotEmpty( argument ) ) {
				working = true;
				argument.map( argument => self.setter( argument ) );
			}
		}
		return {
			stdout: working ? [] : self.prints()
		};
	}
};