
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Cookie from "/src/scripts/Cookie.js";
import Mapper from "/src/scripts/Mapper.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "cookie",
	type: "binary",
	data: {
		path: "/",
		value: null,
		comment: null,
		cookie: new Cookie()
	},
	author: Author,
	abouts: "Cookie utility",
	options: {
		g: {
			type: String,
			alias: "get",
			usage: "Get cookie by name",
			require: false
		},
		h: {
			type: Boolean,
			alias: "help",
			usage: "Show this help",
			require: false
		},
		r: {
			type: String,
			alias: "remove",
			usage: "Remove cookie by name",
			require: false
		},
		s: {
			type: String,
			alias: "set",
			usage: "Set or update cookie",
			require: false
		},
		comment: {
			type: String,
			usage: "Set or update cookie with comment",
			require: false
		},
		domain: {
			type: String,
			usage: "Set or update cookie with domain",
			require: false
		},
		expires: {
			type: Number,
			usage: "Set or update cookie with expires",
			require: false
		},
		httponly: {
			type: Boolean,
			usage: "Set or update cookie with httponly",
			require: false
		},
		maxage: {
			type: Number,
			usage: "Set or update cookie with maxage",
			require: false
		},
		path: {
			type: String,
			usage: "Set or update cookie with path",
			require: false
		},
		samesite: {
			type: String,
			usage: "Set or update cookie with samesite",
			require: false
		},
		secure: {
			type: Boolean,
			usage: "Set or update cookie with secure",
			require: false
		},
		value: {
			type: String,
			usage: "Set or update cookie with value",
			require: false
		},
	},
	version: "4.1.6",
	methods: {
		
		/**
		 * Print loaded cookies.
		 *
		 * @return Array
		 */
		print: function() {
			return Object.values( Mapper( this.cookie.load(), ( idx, name, value ) => Fmt( "{}={}", name, value ) ) );
		}
	},
	mounted: function({ g, h, r, s, comment, domain, expires, httponly, maxage, path, samesite, secure, value } = {}) {
		if( Type( g, String ) &&
			Type( r, String ) &&
			Type( s, String ) &&
			Type( h, Boolean ) ) {
			throw new Error( "cookie: to many arguments" );
		}
		else {
			
			// Display help.
			if( Type( h, Boolean ) ) {
				return this.$help();
			}
			
			var outputs = [];
			
			if( Type( g, String ) ) {
				if( this.cookie.get( g ) ) {
					outputs.push( this.cookie.get( g ) );
				}
				else {
					throw Fmt( "cookie: No cookie named {}", g );
				}
			}
			else if( Type( r, String ) ) {
				outputs.push( this.cookie.set( r, null, {
					comment: comment,
					domain: domain,
					expires: expires,
					httponly: httponly,
					maxage: maxage,
					path: path ?? this.path,
					samesite: samesite,
					secure: secure
				}));
			}
			else if( Type( s, String ) ) {
				outputs.push( this.cookie.set( s, value, {
					comment: comment,
					domain: domain,
					expires: expires,
					httponly: httponly,
					maxage: maxage,
					path: path ?? this.path,
					samesite: samesite,
					secure: secure
				}));
			}
			else {
				outputs.push( this.print() );
			}
			return {
				stdout: outputs
			};
		}
	}
};