
// Import Scripts
import Author from "/src/scripts/Author.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "echo",
	type: "binary",
	data: {
		regexp: /(?:(?<backslash>\\\\)|\\(?<escaped>b|n|r|s|t|v|033|x))/g
	},
	author: Author,
	abouts: "Display text on the terminal",
	options: {
		e: {
			type: Boolean,
			usage: "Enable interpretation of backslash escapes",
			require: false
		},
		E: {
			type: Boolean,
			usage: "Enable interpretation of backslash escapes",
			require: false
		},
		n: {
			type: Boolean,
			usage: "Do not print the trailing newline",
			require: false
		}
	},
	methods: {
		
		/*
		 * Parse argument values into string.
		 *
		 * @return String
		 */
		toString: function() {
			return this.$argv.slice( this.$args.e === true || this.$args.n === true ? 2 : 1 ).join( "\x20" );
		}
	},
	mounted: function({ e, n, E } = {}) {
		
		var result = "";
		
		if( e && n && E ) {
			throw new Error( "echo: To many arguments" );
		}
		if( e === true ) {
			var string = this.toString();
			var match = null;
			var index = 0;
			while( Type( match = this.regexp.exec( string ), Object ) ) {
				result += string.substring( index, this.regexp.lastIndex - match[0].length );
				index = this.regexp.lastIndex;
				switch( true ) {
					case match[0] === "\x5c\x72":
						result = ""; break;
					case match[0] === "\x5c\x6e":
						result += "\x0a"; break;
					case match[0] === "\x5c\x73":
						result += "\x20"; break;
					case match[0] === "\x5c\x74":
						result += "\x20\x20\x20\x20"; break;
					case match[0] === "\x5c\x76":
						result += "\x0a\x20\x20\x20\x20"; break;
					case match[0] === "\x5c\x62":
						result = result.replace( /\s*$/, "" ); break;
					default:
						result += "\x5c"; break;
				}
			}
			result+= string.substring( index );
		}
		else {
			result+= this.toString();
		}
		return {
			stdout: result.split( "\x0a" )
		};
	}
};