
// Import Scripts
import Author from "/src/scripts/Author.js";

export default {
	name: "echo",
	type: "file",
	data: {
		regexp: /(?:(?<backslash>\\\\)|\\(?<escaped>b|n|r|s|t|v))/g
	},
	author: Author,
	abouts: "Display text on the terminal",
	options: {
		e: {
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
		toString: function()
		{
			return( this ).$argv.slice( this.$args.e === true || this.$args.n === true ? 2 : 1 ).join( "\x20" );
		}
	},
	mounted: function({ e, n } = {})
	{
		if( e === true && n === true ) throw "echo: To many arguments";
		if( e === true )
		{
			var string = this.toString();
			var result = "";
			var match = null;
			var index = 0;
			
			while( ( match = this.regexp.exec( string ) ) !== null )
			{
				result += string.substring( index, this.regexp.lastIndex - match[0].length );
				index = this.regexp.lastIndex;
				
				switch( true )
				{
					case match[0] === "\\r":
						result = ""; break;
					case match[0] === "\\n":
						result += "\n"; break;
					case match[0] === "\\s":
						result += "\x20"; break;
					case match[0] === "\\t":
						result += "\x20\x20\x20\x20"; break;
					case match[0] === "\\v":
						result += "\n\x20\x20\x20\x20"; break;
					case match[0] === "\\b":
						result = result.replace( /\s*$/, "" ); break;
					default:
						result += "\\"; break;
				}
			}
			return( result + string.substring( index ) ).split( "\n" );
		}
		else {
			return([ this.toString() ]);
		}
	}
};