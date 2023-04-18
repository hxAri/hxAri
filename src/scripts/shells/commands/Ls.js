
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
					case "black": return( Fmt( "\x1b[30m{}", name ) );
					case "red": return( Fmt( "\x1b[31m{}", name ) );
					case "green": return( Fmt( "\x1b[32m{}", name ) );
					case "yellow": return( Fmt( "\x1b[33m{}", name ) );
					case "blue": return( Fmt( "\x1b[34m{}", name ) );
					case "purple": return( Fmt( "\x1b[35m{}", name ) );
					case "cyan": return( Fmt( "\x1b[36m{}", name ) );
					case "white": return( Fmt( "\x1b[37m{}", name ) );
					
					// Throw for usupported color.
					default: throw Fmt( "{}: Unsupported color", this.$args.color );
				}
			}
			else {
				
				// Colorize filename based on filetype.
				switch( type )
				{
					case "binary": return( Fmt( "\x1b[32m{}", name ) );
					case "path": return( Fmt( "\x1b[34m{}", name ) );
					case "symlink": return( Fmt( "\x1b[36m{}", name ) );
				}
				return( Fmt( "\x1b[37m{}", name ) );
			}
		},
		
		/*
		 * Resolve pathname.
		 *
		 * @params String path
		 *
		 * @return String
		 */
		resolve: function( path )
		{
			// Split pathname with slash.
			var names = Fmt( "{}{}", path[0] !== "/" ? this.$root.pwd() + "/" : "", path ).split( "/" );
			var result = [];
			
			// Mapping path names.
			for( let i in names )
			{
				if( names[i] === "." ) continue;
				if( names[i] === ".." )
				{
					if( result[( i -1 )] )
					{
						delete result[( i -1 )];
					}
					continue;
				}
				result.push( names[i] );
			}
			return( result.length ? result : [ "/" ] ).join( "/" ).replace( /^\/\//, "" );
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
				var path = this.$args[0] ?? this.$root.pwd();
				
				// Get file list.
				var files = this.$root.ls( this.resolve( path ) );
			}
			
			// Display help.
			if( Type( help, Boolean ) ) return( this.$help() );
			
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
			return( files );
		}
		catch( error )
		{
			throw Fmt( "ls: {}", error );
		}
	}
};