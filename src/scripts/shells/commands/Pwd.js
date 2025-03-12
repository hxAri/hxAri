
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";

export default {
	name: "pwd",
	type: "binary",
	author: Author,
	abouts: "Print the full filename of the current working directory",
	version: "1.0",
	options: {
		logical: {
			type: Boolean,
			alias: "L",
			usage: "Use PWD from environment, even if it contains symlinks",
			require: false
		},
		physical: {
			type: Boolean,
			alias: "P",
			usage: "Avoid all symlinks",
			require: false
		},
		version: {
			type: Boolean,
			alias: "v",
			usage: "Output version information and exit",
			require: false
		},
		help: {
			type: Boolean,
			usage: "Show this help",
			require: false
		}
	},
	methods: {
		
		/*
		 * Pathname normalizer.
		 *
		 * @params String pathname
		 * 
		 * @return String
		 */
		normalizer: function( pathname ) {
			var normalized = pathname.replace( this.$envs.ROOT, "" );
			if( normalized.length >= 1 ) {
				return normalized;
			}
			return "\x2f";
		}
	},
	mounted: function({ logical, physical, version, help } = {}) {
		if( this.$argv.length >= 3 ) {
			throw new Error( "pwd: to many arguments" );
		}
		else {
			
			var outputs = [];
			
			if( help === true ) {
				return this.$help();
			}
			
			if( version === true ) {
				outputs.push( Fmt( "pwd {}", this.$version ) );
			}
			else {
				outputs.push( this.normalizer( this.$root.router.currentRoute.path ) );
			}
			return {
				stdin: null,
				stderr: null,
				stdout: outputs,
				prompt: null
			};
		}
	}
};