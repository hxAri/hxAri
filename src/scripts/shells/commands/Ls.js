
// Import Scripts
import Author from "/src/scripts/Author.js";
import Fmt from "/src/scripts/Fmt.js";
import Type from "/src/scripts/Type.js";

export default {
	name: "ls",
	type: "binary",
	author: Author,
	abouts: "List about information the FILEs",
	version: "1.0",
	options: {
		color: {
			type: String,
			usage: "Colorize file by type",
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
		 * Colorize filename.
		 *
		 * @params String name
		 *  Filename.
		 * @params String type
		 *  Filetype.
		 *
		 * @return String
		 */
		colorize: function( name, type )
		{
			// Check if color not automate.
			if( this.$args.color !== "auto" )
			{
				switch( this.$args.color )
				{
					case "black": return( Fmt( "\x1b[1;30m{}", name ) );
					case "red": return( Fmt( "\x1b[1;31m{}", name ) );
					case "green": return( Fmt( "\x1b[1;32m{}", name ) );
					case "yellow": return( Fmt( "\x1b[1;33m{}", name ) );
					case "blue": return( Fmt( "\x1b[1;34m{}", name ) );
					case "purple": return( Fmt( "\x1b[1;35m{}", name ) );
					case "cyan": return( Fmt( "\x1b[1;36m{}", name ) );
					case "white": return( Fmt( "\x1b[1;37m{}", name ) );
					
					// Throw for usupported color.
					default: throw Fmt( "{}: Unsupported color", this.$args.color );
				}
			}
			else {
				
				// Colorize filename based on filetype.
				switch( type )
				{
					case "binary": return( Fmt( "\x1b[1;32m{}", name ) );
					case "path": return( Fmt( "\x1b[1;34m{}", name ) );
					case "symlink": return( Fmt( "\x1b[1;36m{}", name ) );
				}
				return( Fmt( "\x1b[37m{}", name ) );
			}
		}
	},
	mounted: function({ color, help } = {})
	{
		try
		{
			// Check for aoid to many arguments passed.
			if( this.$args[1] ?? false )
			{
				throw "To many arguments";
			}
			else {
				
				// Get pathname.
				var path = this.$root.pathResolver( this.$args[0] ?? this.$root.pwd(), false );
				
				// Get file list.
				var files = this.$root.ls( path );
			}
			
			// Display help.
			if( Type( help, Boolean ) ) return this.$help();
			
			// Check if file is file.
			if( Type( files, Object ) )
			{
				// Avoid change file info.
				files = [
					{
						...files,
						...{
							name: path
						}
					}
				];
			}
			
			// Avoid change directory value.
			files = [ ...files ];
			
			// Mapping files.
			for( let i in files )
			{
				// If colorize enabled.
				if( color )
				{
					files[i] = this.colorize( files[i].name, files[i].type );
				}
				else {
					files[i] = files[i].name;
				}
			}
			return {
				stdin: null,
				stderr: null,
				stdout: files,
				prompt: null
			};
		}
		catch( error ) {
			throw new Error( Fmt( "ls: {}", error ) );
		}
	}
};